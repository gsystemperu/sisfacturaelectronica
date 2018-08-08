Ext.define('sisfacturaelectronica.view.ventas.BuscarProductoFB', {
    extend: 'Ext.window.Window',
    alias: 'widget.wBuscarProductoFB',
    xtype: 'wBuscarProductoFB',
    requires: [
      'sisfacturaelectronica.view.ventas.AccionesRegFacturaBoleta'
    ],
    config : {
      cliente : 0,
      detalle : null
    },
    autoShow: true,
    width: 1200,
    height: 600,
    title: ' :: Buscar Producto :: ',
    iconCls: 'fa fa-address-card-o fa-2x',
    controller: 'acciones-regfacturaboleta',
    bodyPadding: 5,
    modal: true,
    layout: {
        type: 'fit',
        align: 'stretch',
        pack: 'start'
    },

    initComponent: function () {
        var store = Ext.create('sisfacturaelectronica.store.ProductosPorPrecioPersona');
        me        = this;
        store.getProxy().extraParams={vIdCliente : me.getCliente()};
        store.load();
        me = this;
        Ext.apply(me, {
            items: [
                  {
                    xtype:'hiddenfield',
                    itemId:'tipopreciopersona',
                    reference :'tipopreciopersona',
                    value : me.getCliente()
                  },
                  {
                    xtype: 'grid',
                    reference: 'dgvBuscarProducto',
                    store:store,
                    columns: [
                         {
                            text:'Producto',
                            flex: 2,
                            dataIndex:'nombre',
                        },
                       {
                            text:'Unida Medida',
                            flex: 1,
                            dataIndex:'unidadmedida',
                        },
                        {
                             text:'Presentacion',
                             flex: 1,
                             dataIndex:'presentacion',
                         },
                         {
                             xtype :'numbercolumn',
                              text:'Stock',
                              flex: 0.5,
                              dataIndex:'existencias',
                              align :'center',
                              renderer: function (value, metaData, record) {
                                if(value == 0){
                                  metaData.style = ";color:red;fontSize:13px;";
                                  return value;
                                }else{
                                  metaData.style = "color:#0404B4;fontSize:15px;";
                                  return value;
                                }


                              }
                          },
                        {
                            xtype :'numbercolumn',
                            text:'Precio',
                            flex: 0.5,
                            dataIndex:'precioprod',
                            align :'right',
                            renderer: Ext.util.Format.numberRenderer('0.00')
                        }

                    ],
                     listeners: {
                            cellclick: 'onClickRowProducto'
                    }
                }

            ],
            tbar:[
                {
                    xtype:'textfield',
                    fieldLabel :'<b>Producto</b>',
                    reference : 'txtProductoNombre',
                    flex: 1,
                    selectOnFocus:true,
                    enableKeyEvents : true,
                    listeners:{
                      keypress:'onKeyPressTextoDeBusquedaProducto2'
                    }
                },
                {
                    xtype:'button',
                    glyph: sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                    handler :'onClickBuscarProductoPorNombre'
                },
                {
                    xtype: 'button',
                    glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                    handler: 'onClickNuevoProductoPopup'
                }
            ]

        });
        me.callParent();
    }
});
