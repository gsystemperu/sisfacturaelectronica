
 
  Ext.define('sisfacturaelectronica.view.almacen.ReportesProducto', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.wrptproducto',
    xtype: 'wrptproducto',
    itemId: 'wrptproducto',
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
                  align: 'left'
                },
                {
                  xtype: 'numbercolumn',
                  text: 'Presentacion por',
                  dataIndex: 'cantidadunidadmedida',
                  flex: 1,
                  align: 'right'
                },
                {
                  text: 'Modelo',
                  dataIndex: 'modelo',
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
                  flex: 0.5,
                  align: 'right',
                  renderer: function (value, metaData, record) {
                    if (value <= 0)
                      metaData.style = "color:red;font-Size:15px";
                    else
                      metaData.style = "font-Size:15px";
    
                    return value;
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
              dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [
                  {
                    xtype: 'button',
                    text  :'Filtros',
                    tooltip: 'Filtros de la vista producto',
                    flex: 1,
                    menu: [{
                        text:'Productos por vencer',
                      //  handler: 'onClickImprimirListado'
                    }]
                  },
                  {
                    text : 'Imprimir'
                  },
                  {
                    xtype:'numberfield',
                    fieldLabel:'<b>Filtrar productos menos (<) de :</b>',
                    flex: 2,
                    labelWidth : 200
                  },
                  {
                    xtype: 'button',
                    glyph: sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                    tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
                   // handler: 'onClickBuscarOrdenCompraPorFechas'
                  },
                  {
                    text : 'Imprimir'
                  }
                 
                ]
              }]
              
              /*tbar: [{
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
  
              ],*/
              /*listeners: {
                itemclick: 'onClickItemProductoERP',
                itemdblclick: 'onClickItemProducto'
              }*/
  
            }]
        }
        ]
      });
      this.callParent();
    }
  
  });
  