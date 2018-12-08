Ext.define('sisfacturaelectronica.view.almacen.FormProducto', {
  extend: 'Ext.form.Panel',
  alias: 'widget.wFormProducto',
  xtype: 'wFormProducto',
  itemId: 'wFormProducto',
  requires: [
    'Ext.form.field.*',
    'sisfacturaelectronica.util.Rutas',
    'sisfacturaelectronica.view.almacen.AccionesProducto',

  ],
  reference: 'myFrmProducto',
  padding : 10,
  controller: 'acciones-producto',
  url: sisfacturaelectronica.util.Rutas.productoGuardar,
  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },
  initComponent: function () {
    me = this;
    storeColores = Ext.create('sisfacturaelectronica.store.Colores');
    storeMedida = Ext.create('sisfacturaelectronica.store.Medidas');
    storeUnidadMedida = Ext.create('sisfacturaelectronica.store.UnidadDeMedidas');
    storeTipoProd = Ext.create('sisfacturaelectronica.store.TipoDeProductos');
    storeProveedores = Ext.create('sisfacturaelectronica.store.Proveedores');
    storePresentacion = Ext.create('sisfacturaelectronica.store.Presentacion');
    storeModelos = Ext.create('sisfacturaelectronica.store.Modelos');
    storeMarcas = Ext.create('sisfacturaelectronica.store.Marcas');
    storeAlma = Ext.create('sisfacturaelectronica.store.Almacenes');
    storeFF = Ext.create('sisfacturaelectronica.store.FormaFarmaceutica');

    Ext.apply(me,
      {
        items: me.getFormularioProducto(storeColores, storeMedida, storeUnidadMedida, storeTipoProd, storeProveedores, storePresentacion, storeModelos, storeMarcas),
        bbar: [
          {
            xtype: 'button',
            text: 'Actualizar Cantidad Disponible',
            scale: 'medium',
            handler: 'onClickActStockMa',
            hidden: true
          }, {
            xtype: 'button',
            text: 'Copiar',
            scale: 'medium',
            handler: 'onClickCopiar'
          },
          '->',
          {
            xtype: 'button',
            text: 'Cancelar',
            scale: 'medium',
            handler: 'onClickCancelarProducto'
          },
          {
            xtype: 'button',
            text: 'Grabar',
            scale: 'medium',
            handler: 'onClickGuardarProducto'
          }

        ]
      });
    me.callParent(arguments);
  },
  getFormularioProducto: function (storeColores, storeMedida,
    storeUnidadMedida, storeTipoProd, storeProveedores, storePresentacion,
    storeModelos, storeMarcas) {
    _storeDetProvProd = Ext.create('sisfacturaelectronica.store.DetProductoProveedor', {});
    storeSec = Ext.create('sisfacturaelectronica.store.AlmacenSecciones');
    storeSec.load();
    var obj = [
      {
        xtype: 'hiddenfield',
        name: 'id',
        value: 0
      },
      {
        xtype: 'hiddenfield',
        name: 'jsondetalle',
        itemId: 'jsondetalle'
      },
      {
        xtype: 'hiddenfield',
        name: 'imagen',
        itemId: 'imagen'
      },
      {
        xtype: 'hiddenfield',
        name: 'imagenguardar',
        itemId: 'imagenguardar',
        value: 0
      },
      {
        xtype: 'hiddenfield',
        name: 'usuario',
        value: ''
      },
      {
        xtype: 'container',
        layout: 'hbox',
        items: [
          {
            xytpe: 'panel',
            flex: 1,
            bodyPadding: 10,
            items: [
              {
                xtype: 'image',
                name: 'fotoprod',
                itemId: 'imgprod',
                height: 120,
                width: 130
              }
            ],
            tbar: [
              '->',
              {
                xtype: 'filebutton',
                itemId: 'fileimg',
                glyph: 0xf1c5,
                listeners: {
                  change: 'onChangeCargarImagenBase64'
                }
              },
              {
                xtype: 'button',
                glyph: 0xf014,
                tooltip: 'Quitar imagen',
                handler: 'onClickRemoverImagen'
              }
            ]
          },
          {
            xytpe: 'container',
            flex: 4,
            layout: {
              type: 'vbox',
              pack: 'start',
              align: 'stretch'
            },
            defaults: {
              labelWidth: 120
            },
            padding: '10 10 10 10',
            items: [
              {
                xtype:'container',
                flex:1,
                layout:{
                  type:'hbox',
                  align : 'stretch'
                },
                padding : '0 0 5 0',
                defaults:{
                  labelWidth : 120
                },
                items:[
                  {
                    xtype: 'textfield',
                    fieldLabel: 'Código Producto',
                    name: 'codigoproducto',
                    itemId: 'codigoserie',
                    flex:1
                  },
                  {
                    xtype: 'textfield',
                    fieldLabel: 'Código Barras',
                    name: 'codigobarras',
                    flex:1,
                    labelAlign : 'right'
                  }
                ]
              },
              {
                xtype: 'textfield',
                fieldLabel: 'Nombre Comercial',
                name: 'nombre',
                itemId: 'nombre',
                allowBlank: false,
                fieldStyle: 'font-size:20px;text-transform: uppercase;background-color:#F9F7D8'
              },
              {
                xtype: 'textfield',
                fieldLabel: 'Nombre Corto',
                name: 'nombregenerico',
                allowBlank: true,
                fieldStyle: 'font-size:20px;text-transform: uppercase;background-color:#F9F7D8'
              },

            ]
          }
        ]
      },

      {
        xtype: 'container',
        layout: {
          type: 'hbox',
          anchor: '100%'
        },
        padding: '0 0 5 0',
        items: [
          {
            xtype: 'combo',
            fieldLabel: 'Categoría',
            name: 'idtipoproducto',
            itemId: 'tipoproducto',
            displayField: 'descripcion',
            valueField: 'id',
            queryMode: 'local',
            editable: true,
            flex: 1,
            store: storeTipoProd,
            emptyText: '---- Seleccionar -----',
            allowBlank: true,
            padding: '0 5 0 0'
          },
          { xtype: 'button', glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'), handler: 'onClickNuevoTipoProducto' },
          {
            xtype: 'button', glyph: sisfacturaelectronica.util.Glyphs.getGlyph('refrescar'),
            handler: 'onClickRefrescarTipoProducto'
          },
          {
            xtype: 'combo',
            fieldLabel: 'Forma',
            name: 'idformafarmaceutica',
            displayField: 'descripcion',
            valueField: 'id',
            queryMode: 'local',
            editable: true,
            flex: 1,
            labelAlign: 'right',
            store: storeFF,
            emptyText: '---- Seleccionar -----',
            allowBlank: true,
            padding: '0 5 0 0'
          },
          { xtype: 'button', glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'), handler: 'onClickNuevoTipoProducto' },
          {
            xtype: 'button', glyph: sisfacturaelectronica.util.Glyphs.getGlyph('refrescar'), handler: 'onClickRefrescarForma'
          }
        ]

      },

      {
        xtype: 'textfield',
        fieldLabel: 'Talla',
        name: 'talla',
        hidden: true
      },
      {
        xtype: 'container',
        layout: {
          type: 'hbox',
        },
        hidden: true,
        padding: '0 0 10 0',
        defaultType: 'combo',
        items: [{
          fieldLabel: 'Color',
          name: 'idcolor',
          flex: 1,
          store: storeColores,
          valueField: 'id',
          displayField: 'descripcion',
          queryMode: 'local',
          editable: false,

          emptyText: '---- Seleccionar -----',
        },
        {
          fieldLabel: 'Medida',
          name: 'idmedida',
          flex: 1,
          labelAlign: 'right',
          store: storeMedida,
          valueField: 'id',
          displayField: 'descripcion',
          queryMode: 'local',
          editable: false,

          emptyText: '---- Seleccionar -----',
        }
        ]

      },

      {
        xtype: 'container',
        layout: {
          type: 'hbox',
        },
        defaultType: 'combo',
        defaults: {
          labelAlign: 'left'
        },
        padding: '0 0 10 0',
        items: [
          {
            fieldLabel: 'Modelo',
            store: storeModelos,
            displayField: 'descripcion',
            valueField: 'id',
            queryMode: 'local',
            emptyText: '---- Seleccionar -----',
            flex: 1,
            name: 'idmodelo',
            itemId: 'idmodelo',
            padding: '0 5 0 0'

          },
          { xtype: 'button', glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'), handler: 'onClickNuevoUnidadMedida', hidden: false },
          { xtype: 'button', glyph: sisfacturaelectronica.util.Glyphs.getGlyph('refrescar'), handler: 'onClickRefrescarModelo', hidden: false },

          {
            fieldLabel: 'Marca',
            flex: 1,
            store: storeMarcas,
            name: 'idmarca',
            displayField: 'descripcion',
            valueField: 'id',
            queryMode: 'local',
            labelAlign: 'right',
            emptyText: '---- Seleccionar -----',
            itemId: 'idmarca',
            padding: '0 5 0 0'

          },
          { xtype: 'button', glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'), handler: 'onClickNuevoUnidadMedida' },
          { xtype: 'button', glyph: sisfacturaelectronica.util.Glyphs.getGlyph('refrescar'), handler: 'onClickRefrescarMarca' },

        ]
      },
      {
        xtype: 'container',
        layout: {
          type: 'hbox',
        },
        defaultType: 'combo',
        defaults: {
          labelAlign: 'right'
        },
        padding: '0 0 10 0',
        items: [
          {
            xtype: 'numberfield',
            fieldLabel: 'Precio Compra',
            name: 'preciocompra',
            fieldStyle: 'font-size:15px;',
            labelAlign: 'left',
            value: 0,
            flex: 1,
            decimalPrecision: 5,
            allowDecimals: true,

          },

          {
            fieldLabel: 'Unidad Medida',
            labelWidth: 124,
            name: 'idunidadmedida',
            itemId: 'idunidadmedida',
            flex: 1,
            store: storeUnidadMedida,
            displayField: 'descripcion',
            valueField: 'id',
            queryMode: 'local',
            editable: true,
            emptyText: '---- Seleccionar -----',
            hidden: true,
          },
          {
            fieldLabel: 'Unidad Medida',
            labelAlign: 'right',
            name: 'idpresentacion',
            itemId: 'idpresentacion',
            flex: 1,
            store: storePresentacion,
            displayField: 'despres',
            valueField: 'idpres',
            queryMode: 'local',
            editable: false,
            emptyText: '---- Seleccionar -----',
            padding: '0 5 0 0'
          },
          {
            xtype: 'button', glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
            handler: 'onClickNuevoPresentacion'
          },
          {
            xtype: 'button', glyph: sisfacturaelectronica.util.Glyphs.getGlyph('refrescar'),
            handler: 'onClickRefrescarPresentacion'
          },
          {
            xtype: 'numberfield',
            fieldLabel: 'Cant. Presentación',
            name: 'cantidadunidadmedida',
            fieldStyle: 'font-size:15px;',
            value: 0,
            flex: 1,
            labelWidth: 130
          }
        ]
      },

      {
        xtype: 'container',
        layout: {
          type: 'hbox',
        },
        padding: '0 0 10 0',
        defaultType: 'combo',
        hidden: true,
        items: [

          {
            fieldLabel: 'U.M. Fraccion',
            name: 'idunidadmedidafraccion',
            flex: 1,
            labelAlign: 'right',
            store: storeUnidadMedida,
            displayField: 'descripcion',
            valueField: 'id',
            queryMode: 'local',
            editable: false,
            hidden: true,
            emptyText: '---- Seleccionar -----',
          }
        ]

      },
      {
        xtype: 'textfield',
        fieldLabel: 'Composicion Items',
        name: 'composicion',
        hidden: true
      },
      {
        xtype: 'container',
        layout: {
          type: 'hbox',
        },
        padding: '0 0 10 0',
        defaultType: 'numberfield',
        items: [{
          fieldLabel: 'Precio Dolares',
          name: 'preciodolares',
          flex: 1,
          hidden: true
        },
        {
          xtype: 'datefield',
          value: new Date(),
          fieldLabel: 'Fecha Caducidad',
          name: 'fechacaducidad',
          flex: 1,
          labelAlign: 'left',
          format: 'd/m/Y',
          altFormats: 'Y-m-d',
          hidden: true
        }
        ]

      },
      {
        xtype: 'tabpanel',
        itemId: 'tabDetalleProducto',
        height: 350,
        items: [
          {
            title: ' Venta ',
            layout: {
              type: 'vbox',
              align: 'stretch',
              pack: 'start'
            },
            bodyPadding: 10,
            items: [
              {
                xtype: 'container',
                layout: {
                  type: 'hbox',
                  align: 'stretch',
                  pack: 'start'
                },
                hidden: true,
                defaultType: 'numberfield',
                defaults: {
                  labelAlign: 'right',
                  flex: 1,
                },
                items: [
                  {
                    xtype: 'checkbox',
                    boxLabel: '<b>Venta por dosis</b>',
                    name: 'sevendepordosis',
                    boxLabelAlign: 'before',
                    flex: 0.5

                  },
                  {
                    fieldLabel: '<b>Número de dosis</b>',
                    name: 'numerodosis',
                    labelWidth: 130,
                    labelAlign: 'right',
                    value: 0
                  },
                  {
                    fieldLabel: '<b>Precio Dosis</b>',
                    name: 'preciodosis',
                    labelWidth: 100,
                    labelAlign: 'right',
                    value: 0
                  },
                ]
              },
              {
                xtype: 'container',
                padding: '5 0 5 0',
                layout: {
                  type: 'hbox',
                  align: 'stretch',
                  pack: 'start'
                },
                hidden: true,
                defaultType: 'numberfield',
                defaults: {
                  labelAlign: 'right',
                  flex: 2
                },
                items: [
                  {
                    xtype: 'checkbox',
                    boxLabel: '<b>Venta por Kilos</b>',
                    name: 'ventakilos',
                    boxLabelAlign: 'before',
                    flex: 0.5

                  },

                  {
                    fieldLabel: '<b>Precio Kilo</b>',
                    name: 'preciokilo',
                    labelWidth: 130,
                    labelAlign: 'right',
                    value: 0
                  },
                ]
              },
              {
                xtype: 'container',
                layout: {
                  type: 'hbox',
                  align: 'stretch',
                  pack: 'start'
                },
                hidden: true,
                defaultType: 'numberfield',
                defaults: {
                  labelAlign: 'right',
                  flex: 2
                },
                items: [
                  {
                    xtype: 'checkbox',
                    boxLabel: '<b>Venta por Gramos</b>',
                    name: 'ventagramos',
                    boxLabelAlign: 'before',
                    flex: 0.5

                  },

                  {
                    fieldLabel: '<b>Precio Gramo</b>',
                    name: 'preciogramo',
                    labelWidth: 130,
                    labelAlign: 'right',
                    value: 0
                  },
                ]
              },
              {
                xtype: 'container',
                layout: {
                  type: 'hbox',
                  flex: 1,
                  labelAlign: 'right'
                },
                hidden: false,
                padding: '5 0 5 0',
                defaults : {
                  labelWidth : 150,
                  labelAlign: 'right',
                },
                defaultType: 'numberfield',
                items: [
                  {
                    xtype: 'checkbox',
                    boxLabel: 'Maneja Stock',
                    name: 'manejastock',
                    flex: 1,
                    value: true
                  },
                  {
                    xtype: 'numberfield',
                    fieldLabel: 'Stock Minimo',
                    name: 'stockminimo',
                    flex: 1.5,
                    labelAlign: 'right',
                    value: 0
                  },
                  {
                    xtype: 'numberfield',
                    fieldLabel: 'Precio Minorista',
                    name: 'precioventafraccion',
                    flex: 2,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 5,
                    step: '0.1',
                    value: 0,
                    allowBlank: false,
                    fieldStyle: 'font-size:20px;text-transform: uppercase;background-color:#F9F7D8;text-align:right;'
                    
                  },
                  {

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Mayorista',
                    name: 'precioventa',
                    preventMark: true,
                    flex: 2,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 5,
                    step: '0.1',
                    value: 0,
                    labelAlign: 'right',
                    fieldStyle: 'font-size:20px;text-transform: uppercase;background-color:#F9F7D8;text-align:right;'

                  }
                ]
              },

            ]
          },
          {
            title: ' Almacen ',
            hidden: false,
            layout: {
              type: 'fit',
            },
            bodyPadding: 10,
            items: [
              {
                xtype: 'container',
                items: [
                  {
                    xtype: 'combo',
                    fieldLabel: 'Almacen',
                    store: storeAlma,
                    displayField: 'descripcion',
                    valueField: 'id',
                    flex: 1,
                    editable: false,
                    queryMode: 'local',
                    width: 400,
                    listeners: {
                      select: 'onSelectedAlmacen'
                    },
                    name: 'idalmacen'
                  },
                  {
                    xtype: 'combo',
                    fieldLabel: 'Sección',
                    reference: 'almacenseccion',
                    store: storeSec,
                    displayField: 'descripcion',
                    valueField: 'id',
                    flex: 1,
                    editable: true,
                    queryMode: 'local',
                    width: 400,
                    name: 'idalmacenseccion'
                  }
                ]
              }

            ]
          },
          {
            title: 'Proveedores',
            hidden: false,
            layout: 'fit',
            tbar: [
              { xtype: 'button', text: 'nuevo', handler: 'onClickAddProveedorProducto' },
              { xtype: 'button', text: 'Nuevo Proveedor', handler: 'onClickNuevoProveedor' },
              { xtype: 'button', text: 'Refrescar', handler: 'onClickRefrescarProveedor' },
            ],
            items: [
              {
                xtype: 'gridpanel',
                store: _storeDetProvProd,
                itemId: 'dgvDetProvProd',
                selModel: 'rowmodel',
                plugins: {
                  ptype: 'cellediting',
                  clicksToEdit: 1
                },
                columns: [
                  {
                    text: 'Nombre/Razón Social',
                    dataIndex: 'razonsocial',
                    flex: 3,
                    editor: {
                      xtype: 'combo',
                      //typeAhead: true,
                      //triggerAction: 'all',
                      store: storeProveedores,
                      valueField: 'razonsocial',
                      displayField: 'razonsocial',
                      editable: false,
                      itemId: 'cboProveedorGrid'
                    }
                  },
                  {
                    xtype: 'numbercolumn', text: 'Precio Compra',
                    dataIndex: 'precio', flex: 1,
                    editor: {
                      xtype: 'numberfield',
                      value: 0
                    }
                  },

                  {
                    xtype: 'widgetcolumn',
                    flex: 0.5,
                    widget: {
                      xtype: 'button',
                      flex: 1,
                      glyph: 0xf014,
                      handler: 'onClickEliminarProveedorProducto'

                    }

                  }
                ],
              }
            ]
          }
        ]
      }
    ];
    return obj;
  }
});
