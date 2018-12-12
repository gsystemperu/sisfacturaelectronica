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
                            xtype: 'container',
                            layout: 'hbox',
                            padding : 0,
                            flex: 1,
                            items: [
                               {
                                    xtype: 'textfield',
                                    flex: 3,
                                    labelAlign: 'right',
                                    itemId:'txtQueryBuscar',
                                    enableKeyEvents: true,
                                    padding : '0 5 0 0',
                                    listeners:{
                                       //focus:'onFocusTextoDeBusquedaCliente'
                                        keypress: 'onKeyPressTextoNombreCliente'
                                    },
                                    emptyText: 'Razón Social : Proveedor S.A.',
                                    fieldStyle: 'font-size:20px;height:35px;',
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    labelAlign: 'right',
                                    itemId:'txtRucBuscar',
                                    emptyText: 'Número R.U.C. : 20448667010',
                                    fieldStyle: 'font-size:20px;height:35px;',
                                    enableKeyEvents :true,
                                    listeners : {
                                        keypress: 'onKeyPressTextoRuc'
                                    }
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
