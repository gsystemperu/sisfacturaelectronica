Ext.define('sisfacturaelectronica.view.ventas.ListadoClientes', {
    extend: 'Ext.panel.Panel',
    xtype: 'wRegCliente',
    alias: 'widget.wRegCliente',
    requires: [
        'Ext.layout.container.HBox',
        'sisfacturaelectronica.view.ventas.AccionesRegCotizacion',
        'Ext.grid.*',
        'Ext.grid.column.*',
        'Ext.form.field.*',

    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    defaults: {
        frame: false,
        bodyPadding: 0
    },
    controller:'acciones-regcotizacion',
    initComponent: function () {
        var storeClientes = Ext.create('sisfacturaelectronica.store.Clientes');
        var storeTipoDoc = Ext.create('sisfacturaelectronica.store.TipoDocumentos');
        Ext.apply(this, {
            items: [{
                    //title: 'Registros',
                    flex: 3,
                    margin: '0 3 0 0',
                    layout: 'fit',
                    items: [{
                        xtype: 'grid',
                        itemId: 'dgvClientes',
                        store: storeClientes,
                        sortableColumns: false,
                        columns: [{
                                text: 'Razon Social',
                                dataIndex: 'nombreper',
                                flex: 1
                            },
                            {
                                text: 'R.u.c.',
                                dataIndex: 'numrucper',
                                flex: 0.5
                            },
                            {
                                text: 'Telefono',
                                dataIndex: 'telefper',
                                flex: 0.5
                            },
                            {
                                text: 'Celular',
                                dataIndex: 'celper',
                                flex: 0.5
                            },
                          /*  {
                                text: 'Direccion',
                                dataIndex: 'domiciper',
                                flex: 1
                            },*/
                            {
                                xtype: 'widgetcolumn',
                                flex: 0.3,
                                widget: {
                                    xtype: 'button',
                                    glyph: 0xf014,
                                    handler: 'onClickEliminarCliente'

                                }

                            }
                        ],
                        tbar: [{
                            xtype: 'fieldset',
                            layout: 'hbox',
                            flex: 1,
                            padding: '0 5 10 5',
                            items: [

                                {
                                    xtype: 'label',
                                    text: 'Nombre/Razon Social',
                                    padding: '5px 0 0 0',
                                    border: false,
                                    width: 150,
                                    height: 25,
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
                                    flex: 3,
                                    labelAlign: 'right',
                                    itemId:'txtQueryBuscar',
                                    enableKeyEvents: true,
                                    listeners:{
                                      //focus:'onFocusTextoDeBusquedaCliente'
                                        keypress: 'onKeyPressTextoNombreCliente'
                                     
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'R.U.C.',
                                    padding: '5px 0 0 0',
                                    border: false,
                                    width: 50,
                                    height: 25,
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
                                    flex: 1,
                                    labelAlign: 'right',
                                    reference:'txtRucBuscar',
                                }

                            ]
                        }],
                        listeners :{
                            itemclick :'onSelectedClienteERP',
                            itemdblclick :'onSelectedCliente'
                        }

                    }]
                }
            ]
        });
        this.callParent();
    }
});
