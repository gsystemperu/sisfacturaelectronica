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
    storeProducto = Ext.create('sisfacturaelectronica.store.Productos');
    storeTipoProd = Ext.create('sisfacturaelectronica.store.TipoDeProductos');
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
                flex: 3,
                align: 'left'
              },
              {
                text: 'Categoria',
                dataIndex: 'tipoproducto',
                flex: 1.5,
                align: 'left',
                
              },
              {
                text: 'Unidad Medida',
                dataIndex: 'presentacion',
                flex: 1,
                align: 'left',
                
              }, 
              {
                text: 'Marca',
                dataIndex: 'marca',
                flex: 1.5,
                align: 'left'
              },
              {
                text: 'P. Mayorista',
                dataIndex: 'precioventa',
                flex: 1,
                align: 'right',
                renderer: Ext.util.Format.numberRenderer('0.00')
              },
              {
                text: 'P. Minorista',
                dataIndex: 'precioventafraccion',
                flex: 1,
                align: 'right',
                renderer: Ext.util.Format.numberRenderer('0.00')
              },
               {
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
              xtype: 'container',
              layout: 'hbox',
              flex: 1,
              defaults: {
                labelWidth: 50,
                xtype: 'label'
              },
              items: [
                {
                  text: 'Descripcion',
                  padding: '5px 0 0 0',
                  border: false,
                  width: 110, height: 31,
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
                  fieldStyle: 'font-size:18px;height:30px;',
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
                  width: 60, height: 31,
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
                  fieldStyle: 'font-size:18px;height:30px;',
                  flex: 1,
                  enableKeyEvents: true,
                  hidden: false,
                  listeners: {
                    keypress: 'onKeyPressTextoMarca'
                  }
                }
            
              ]
            },

            ],
            listeners: {
              itemdblclick: 'onClickItemProducto'
            }

          }]
      }
      ]
    });
    this.callParent();
  }
});
