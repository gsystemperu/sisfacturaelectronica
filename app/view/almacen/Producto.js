Ext.define('sisfacturaelectronica.view.almacen.Producto', {
  extend: 'Ext.panel.Panel',
  xtype: 'wRegProducto',
  alias: 'widget.wRegProducto',
  requires: [
    'Ext.layout.container.HBox',
    'sisfacturaelectronica.view.almacen.AccionesProducto',
    'Ext.grid.*',
    'Ext.form.field.Number'
  ],
  layout: {
    type: 'hbox',
    pack: 'start',
    align: 'stretch'
  },
  bodyPadding: 2,
  defaults: {
    frame: false,
    bodyPadding: 5
  },
  controller: 'acciones-producto',
  initComponent: function () {
    var storeProducto = Ext.create('sisfacturaelectronica.store.Productos');
    var storeTipoProd = Ext.create('sisfacturaelectronica.store.TipoDeProductos');
    storeProducto.load();
    me = this;
    Ext.apply(this, {
      items: [{
        flex: 3,
        margin: '0 3 0 0',
        layout: 'fit',
        items: [
          {
            xtype: 'grid',
            itemId: 'dgvProductos',
            reference: 'dgvProductos',
            store: storeProducto,
            sortableColumns: false,
            viewConfig : 
            {
              loadMask:true
            },
            columns: [
              {
                text: 'Nombre',
                dataIndex: 'nombre',
                flex: 2.5,
                align: 'left'
              },
              {
                text: 'Unidad Medida',
                dataIndex: 'unidadmedida',
                flex: 1,
                align: 'left',
                hidden: true,
              }, {
                text: 'Presentacion',
                dataIndex: 'presentacion',
                flex: 1,
                align: 'left',
                renderer: function (value, metaData, record) {
                  if(record.data.cantidadunidadmedida>1)
                    return record.data.presentacion + ' DE ' +record.data.cantidadunidadmedida.toString();
                  else
                    return record.data.presentacion.toString();
                }
              },
              {
                text: 'Forma',
                dataIndex: 'forma',
                flex: 1,
                align: 'left'
              },
              {
                text: 'Marca',
                dataIndex: 'marca',
                flex: 1,
                align: 'left'
              },
              {
                text: 'A Mano',
                dataIndex: 'existencias',
                flex: 1,
                align: 'right',
                renderer: function (value, metaData, record) {
                  if (record.data._cajas<=0)
                    metaData.style = "color:red;font-Size:15px";
                  else
                    metaData.style = "font-Size:15px";
                  if(record.data.ventaunidad==true && record.data.ventablister==true){
                    return '<div style="width:100%">'+ record.data._cajas.toString() + ' cajas y ' +record.data._unidades.toString() +' unidades' +'</div>';
                  }else{
                    return '<div style="width:100%">'+record.data._cajas + ' cajas '+'</div>';
                  }
                }
              },
              {
                //xtype:'numbercolumn',
                text: 'Precio Venta',
                dataIndex: 'precioventa',
                flex: 1,
                align: 'right',
                renderer: Ext.util.Format.numberRenderer('0.00')
              }
              , {
                xtype: 'widgetcolumn',
                flex: 0.5,
                widget: {
                  xtype: 'button',
                  flex: 1,
                  glyph: 0xf014,
                  handler: 'onClickEliminarProducto'

                }

              }
            ],
            tbar: [{
              xtype: 'fieldset',
              layout: 'hbox',
              flex: 1,
              padding: '0 5 10 5',
              defaults: {
                labelWidth: 50,
                xtype: 'label'
              },
              items: [
                {
                  text: 'Descripcion',
                  padding: '5px 0 0 0',
                  border: false,
                  width: 110, height: 26,
                  style: {
                    background: '#6a4b5a',
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '13px'
                  }
                },
                {
                  xtype: 'textfield',
                  reference: 'txtBuscarNombreProducto',
                  fieldStyle: 'font-size:15px;height:20px;background-color:#F9F7D8;',
                  flex: 2,
                  enableKeyEvents: true,
                  listeners: {
                    keypress: 'onKeyPressTextoDeBusquedaProducto'
                  }
                },
                {
                  text: 'Marca',
                  padding: '5px 0 0 0',
                  border: false,
                  width: 60, height: 25,
                  style: {
                    background: '#6a4b5a',
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '13px'
                  },
                  hidden: false
                },
                {
                  xtype: 'textfield',
                  reference: 'txtBuscarMarcaProd',
                  fieldStyle: 'font-size:15px;height:20px;background-color:#F9F7D8;',
                  flex: 1,
                  enableKeyEvents: true,
                  hidden: false,
                  listeners: {
                    keypress: 'onKeyPressTextoMarca'
                  }
                },
                
                {
                  xtype: 'button',
                  text  :'Filtros',
                  tooltip: 'Filtros de la vista producto',
                  flex: 1,
                  menu: [{
                      text:'Solo Analgesicos',
                      handler: 'onClickImprimirListado'
                  }]
              }
              ]
            },

            ],
            listeners: {
              itemclick: 'onClickItemProductoERP',
              itemdblclick: 'onClickItemProducto'
            }

          }]
      }
      ]
    });
    this.callParent();
  },
  getFormularioProducto: function (storeColores, storeMedida, storeUnidadMedida, storeTipoProd) {
    var obj = [
      {
        xtype: 'hiddenfield',
        name: 'id',
        value: 0
      },

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
        xtype: 'textarea',
        fieldLabel: 'Nombre',
        name: 'nombre'
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
            fieldLabel: 'Tipo Producto',
            name: 'idtipoproducto',
            itemId: 'tipoproducto',
            displayField: 'descripcion',
            valueField: 'id',
            queryMode: 'local',
            editable: false,
            flex: 1,
            store: storeTipoProd,
            emptyText: '---- Seleccionar -----',
          },
          {
            xtype: 'button', glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo')
          },
          {
            xtype: 'button', glyph: sisfacturaelectronica.util.Glyphs.getGlyph('refrescar'),

          },
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
        xtype: 'numberfield',
        fieldLabel: 'Precio Compra',
        name: 'preciocompra'
      },
      {
        xtype: 'container',
        layout: {
          type: 'hbox',
        },
        padding: '0 0 10 0',
        defaultType: 'combo',
        items: [{
          fieldLabel: 'Unidad Medida',
          name: 'idunidadmedida',
          flex: 1,
          store: storeUnidadMedida,
          displayField: 'descripcion',
          valueField: 'id',
          queryMode: 'local',
          editable: false,

          emptyText: '---- Seleccionar -----',
        },
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
            flex: 1
          },
          {
            fieldLabel: 'P.V. Fraccion',
            name: 'precioventafraccion',
            flex: 1,
            labelAlign: 'right',
            hidden: true
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
          hidden: false
        }
        ]

      },
      {
        xtype: 'container',
        layout: {
          type: 'hbox',
        },
        hidden: true,
        padding: '0 0 10 0',
        defaultType: 'numberfield',
        items: [{
          xtype: 'checkbox',
          boxLabel: 'Maneja Stock',
          name: 'manejastock',
          flex: 1,
        },
        {
          xtype: 'numberfield',
          fieldLabel: 'Stock Minimo',
          name: 'stockminimo',
          flex: 1,
          labelAlign: 'right'
        },
        ]
      },
      //**************

      {
        xtype: 'container',
        layout: 'hbox',
        flex: 1,
        padding: '0 0 5 0',
        items: [
          {

            xtype: 'numberfield',
            fieldLabel: 'Precio Publico Lima',
            name: 'precioventa',
            flex: 1,
            allowDecimals: true,
            decimalSeparator: '.',
            decimalPrecision: 2,
            step: '0.1',
            labelWidth: 170,
            value: 0

          }, {
            xtype: 'numberfield',
            name: 'stockprod',
            fieldLabel: 'Stock',
            labelAlign: 'right',
            flex: 1,
            align: 'right',
            value: 0,
            allowNegative: true,
            hideTrigger: true,
            hidden: true

          }
        ]
      },
      {

        xtype: 'numberfield',
        fieldLabel: 'Precio Especial Lima 1',
        name: 'precioprodlocalespecial',
        flex: 1,
        allowDecimals: true,
        decimalSeparator: '.',
        decimalPrecision: 2,
        step: '0.1',
        labelWidth: 170,
        value: 0,


      },
      {

        xtype: 'numberfield',
        fieldLabel: 'Precio Especial Lima 2',
        name: 'precioprodlocalespecial2',
        flex: 1,
        allowDecimals: true,
        decimalSeparator: '.',
        decimalPrecision: 2,
        step: '0.1',
        labelWidth: 170,
        value: 0,


      },
      {
        xtype: 'numberfield',
        fieldLabel: 'Precio Especial Lima 3',
        name: 'precioprodlocalespecial3',
        flex: 1,
        allowDecimals: true,
        decimalSeparator: '.',
        decimalPrecision: 2,
        step: '0.1',
        labelWidth: 170,
        value: 0,
      },
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
        value: 0
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
        value: 0
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
        value: 0
      },
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
        value: 0
      }


    ];
    return obj;
  }

});
