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
  margin: 30,
  autoScroll: true,
  controller: 'acciones-producto',
  submitEmptyText: false,
  url: sisfacturaelectronica.util.Rutas.productoGuardar,
  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },
  initComponent: function () {
    me = this;
    var storeColores = Ext.create('sisfacturaelectronica.store.Colores');
    var storeMedida = Ext.create('sisfacturaelectronica.store.Medidas');
    var storeUnidadMedida = Ext.create('sisfacturaelectronica.store.UnidadDeMedidas');
    var storeTipoProd = Ext.create('sisfacturaelectronica.store.TipoDeProductos');
    var storeProveedores = Ext.create('sisfacturaelectronica.store.Proveedores');
    var storePresentacion = Ext.create('sisfacturaelectronica.store.Presentacion');
    var storeModelos = Ext.create('sisfacturaelectronica.store.Modelos');
    var storeMarcas = Ext.create('sisfacturaelectronica.store.Marcas');
    storeAlma = Ext.create('sisfacturaelectronica.store.Almacenes');
    storeFF  = Ext.create('sisfacturaelectronica.store.FormaFarmaceutica');
    
    Ext.apply(me,
      {
        items: me.getFormularioProducto(storeColores, storeMedida, storeUnidadMedida, storeTipoProd, storeProveedores, storePresentacion, storeModelos, storeMarcas),
        bbar: [
          {
            xtype: 'button',
            text: 'Actualizar Cantidad Disponible',
            scale: 'medium',
            handler: 'onClickActStockMa'
          },{
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
                //src: 'resources/images/imagen.png',
                itemId: 'imgprod',
                height: 90,
                width: 100
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
            flex: 2,
            layout: {
              type: 'vbox',
              pack: 'start',
              align: 'stretch'
            },
            defaults :{ 
              labelWidth : 120
            },
            padding: '10 10 10 10',
            items: [
              {
                xtype: 'textfield',
                fieldLabel: 'Codigo Producto',
                name: 'codigoproducto',
                itemId: 'codigoserie'
              },
              {
                xtype: 'textfield',
                fieldLabel: 'Codigo Barras',
                name: 'codigobarras'
              },
              {
                xtype: 'textfield',
                fieldLabel: 'Nombre Comercial',
                name: 'nombre',
                itemId : 'nombre',
                allowBlank: false,
                fieldStyle: 'font-size:20px;text-transform: uppercase;background-color:#F9F7D8'
              },
              {
                xtype: 'textfield',
                fieldLabel: 'Nombre Generico',
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
            editable: false,
            flex: 1,
            store: storeTipoProd,
            emptyText: '---- Seleccionar -----',
            allowBlank: true
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
            editable: false,
            flex: 1,
            labelAlign : 'right',
            store: storeFF,
            emptyText: '---- Seleccionar -----',
            allowBlank: true
          },
          { xtype: 'button', glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'), handler: 'onClickNuevoTipoProducto' },
          {
            xtype: 'button', glyph: sisfacturaelectronica.util.Glyphs.getGlyph('refrescar'),handler: 'onClickRefrescarForma'
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

            itemId: 'idmarca'

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
            labelWidth : 124,
            name: 'idunidadmedida',
            itemId: 'idunidadmedida',
            flex: 1,
            store: storeUnidadMedida,
            displayField: 'descripcion',
            valueField: 'id',
            queryMode: 'local',
            editable: true,
            emptyText: '---- Seleccionar -----',
            hidden:true,
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
            labelWidth:130
          }
          //{ xtype: 'button', glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'), handler: 'onClickNuevoUnidadMedida' },
          //{ xtype: 'button', glyph: sisfacturaelectronica.util.Glyphs.getGlyph('refrescar'), handler: 'onClickRefrescarUnidadMedida' },
         
        ]
      },
     /* {
        xtype: 'container',
        layout: {
          type: 'hbox',
        },
        defaultType: 'combo',
        defaults: {
          labelAlign: 'right'
        },
        padding: '0 0 0 0',
        items: [
           {
            fieldLabel: 'Presentación',
            labelAlign: 'left',
            name: 'idpresentacion',
            itemId: 'idpresentacion',
            flex: 1,
            store: storePresentacion,
            displayField: 'despres',
            valueField: 'idpres',
            queryMode: 'local',
            editable: false,
            emptyText: '---- Seleccionar -----',
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
            labelWidth:130
          }
        ]
      },*/
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
        hidden: true,
        padding: '0 0 10 0',
        defaultType: 'numberfield',
        items: [
          {
            fieldLabel: 'Precio Venta',
            //  name: 'precioventa',
            flex: 1,
            hidden: true
          },
          {
            fieldLabel: 'Precio Venta Unidad ',
            name: 'precioventafraccion',
            labelWidth: 150,
            flex: 1,
            labelAlign: 'left',
            hidden: false
          }
        ]

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
            title: '..: Venta :..',
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
                xtype: 'fieldset',
                title : 'PRESENTACIÓN CAJA',
                layout: {
                  type: 'hbox',
                  align: 'stretch',
                  pack: 'start'
                },
                padding: '5 0 5 0',
                defaultType: 'numberfield',
                defaults: {
                  labelAlign: 'right',
                  
                },
                items: [
                  {
                    xtype: 'label',
                    text: 'Se Vende por Unidad',
                    padding: '5px 0 0 0',
                    border: true,
                    height: 25,
                    flex: 1.95,
                    style: {
                      //background: '#007C7B',
                      color: '#bf0000',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '13px',
                      padding:'10px'
                      
                    },
                    
                  },
                  {
                    xtype: 'checkbox',
                    name: 'ventaunidad',
                    boxLabelAlign: 'before',
                    bodyPadding: 5,
                    flex: 0.5,
                    listeners : {
                      change :'onChangeVentaUnidad'
                    }


                  },

                  {
                    fieldLabel: 'Precio Unidad',
                    name: 'preciounidad',
                    labelWidth: 130,
                    labelAlign: 'right',
                    disabled:true,
                    value: 0,
                    flex: 3
                  },
                ]
              },
              {
                xtype: 'fieldset',
                title : 'PRESENTACIÓN CAJA',
                layout: {
                  type: 'hbox',
                  align: 'stretch',
                  pack: 'start'
                },
                padding: '5 0 5 0',
                hidden: false,
                defaultType: 'numberfield',
                defaults: {
                  labelAlign: 'right'
                
                },
                items: [
                  {
                    xtype: 'label',
                    text: 'Se vende por Blister (Capsulas, pastillas, comprimidos etc..)',
                    padding: '5px 0 0 0',
                    border: true,
                    height: 25,
                    flex: 2.5,
                    style: {
                     // background: '#007C7B',
                      color: '#bf0000',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '13px',
                      padding:'10px'
                    }
                  },
                  {
                    xtype: 'checkbox',
                    name: 'ventablister',
                    boxLabelAlign: 'before',
                    flex: 0.5,
                    listeners : {
                      change :'onChangeVentaBlister'
                    }
                  },
                  {
                    fieldLabel: 'Cantidad x Blister',
                    name: 'cantidadblister',
                    disabled:true,
                    labelWidth: 130,
                    labelAlign: 'right',
                    value: 0,
                    flex: 2
                  }, 
                  {
                    fieldLabel: 'Precio Blister',
                    name: 'precioblister',
                    disabled:true,
                    labelWidth: 130,
                    labelAlign: 'right',
                    value: 0,
                    flex: 2
                  }

                ]
              },
              {
                xtype: 'container',
                layout: {
                  type: 'hbox',
                  align: 'stretch',
                  pack: 'start'
                },
                padding: '5 0 5 0',
                hidden: false,
                defaultType: 'numberfield',
                defaults: {
                  labelAlign: 'right',
                },
                items: [
                  {
                    xtype: 'label',
                    text: '** Venta con Receta Médica',
                    padding: '5px 0 0 0',
                    border: true,
                    height: 25,
                    flex :1,
                    style: {
                     // background: '#007C7B',
                      color: '#bf0000',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '13px',
                      padding:'10px'
                    }
                  },
                  {
                    xtype: 'checkbox',
                    name: 'ventaconreceta',
                    boxLabelAlign: 'before',
                    flex: 3
                  }
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
                defaultType: 'numberfield',
                items: [{
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
                  flex: 1,
                  labelAlign: 'right',
                  value: 0
                },
                ]
              },
              {
                xtype: 'container',
                padding: '5 5 5 5',
                layout: {
                  type: 'hbox',
                  flex: 1,
                },
                items: [
                  {

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Publico Lima',
                    name: 'precioventa',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 5,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0,
                    allowBlank: false,
                    fieldStyle: 'font-size:20px;text-transform: uppercase;background-color:#F9F7D8'

                  },
                  {

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Especial Lima 1',
                    name: 'precioprodlocalespecial',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 5,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0,
                    labelAlign: 'right',
                    hidden: true
                  },
                  {

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Especial Lima 2',
                    name: 'precioprodlocalespecial2',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 5,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0,
                    labelAlign: 'right',
                    hidden: true


                  },
                  {
                    xtype: 'numberfield',
                    fieldLabel: 'Precio Especial Lima 3',
                    name: 'precioprodlocalespecial3',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 5,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0,
                    labelAlign: 'right',
                    hidden: true
                  },

                ]
              },
              {
                xtype: 'container',
                hidden: true,
                layout: {
                  type: 'hbox',
                },
                padding: '5 5 5 5',
                defaults: {
                  flex: 1
                },
                items: [
                  {

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Provincia',
                    name: 'precioprodprovincia',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 2,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0
                  },
                  {

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Especial Provincia 1',
                    name: 'precioprodprovinciaespecial',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 2,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0,
                    labelAlign: 'right'
                  },
                  {

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Especial Provincia 2',
                    name: 'precioprodprovinciaespecial2',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 2,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0,
                    labelAlign: 'right'
                  },
                  {

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Especial Provincia 3',
                    name: 'precioprodprovinciaespecial3',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 2,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0,
                    labelAlign: 'right'
                  }

                ]
              },

              {
                xtype: 'container',
                hidden: true,
                layout: {
                  type: 'hbox',
                },
                padding: '5 5 5 5',
                items: [
                  {

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Distribuidor Lima',
                    name: 'precioproddistribuidorlima',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 2,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0
                  },
                  {

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Distribuidor Provincia',
                    name: 'precioproddistribuidorprovincia',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 2,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0,
                    labelAlign: 'right'
                  }
                ]
              }



            ]
          },
          {
            title: ':: Almacen ::',
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
                    width : 400,
                    listeners: {
                      select: 'onSelectedAlmacen'
                    },
                    name : 'idalmacen'
                  },
                  {
                    xtype: 'combo',
                    fieldLabel: 'Sección',
                    reference : 'almacenseccion',
                    store: storeSec,
                    displayField: 'descripcion',
                    valueField: 'id',
                    flex: 1,
                    editable: true,
                    queryMode: 'local',
                    width : 400,
                    name : 'idalmacenseccion'
                  }
                ]
              }

            ]
          },
          {
            title: '..:: Proveedores Laboratorio::..',
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
          },
          {
            title: '..: Acción Farmacológica :..',
            layout: {
              type: 'fit',
              align: 'stretch',
              pack: 'start'
            },
            bodyPadding: 10,
            items:[
              {xtype:'textarea',name:'accionfarmacologica'}
            ]
          }

        ]

      }






    ];
    return obj;
  }



});
