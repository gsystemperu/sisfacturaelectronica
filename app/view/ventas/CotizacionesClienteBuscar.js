Ext.define('sisfacturaelectronica.view.ventas.CotizacionesClienteBuscar', {
    extend: 'Ext.window.Window',
    alias: 'widget.wCotizacionesClienteBuscar',
    xtype: 'wCotizacionesClienteBuscar',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.view.Table',
        'sisfacturaelectronica.view.ventas.AccionesMantenimiento'
    ],

    autoShow: true,
    width: 700,
    height: 300,
    title: ' :: Cotizaciones del Cliente :: ',
    iconCls: 'fa fa-address-card-o fa-2x',
    controller: 'acciones-mantenimiento',
    modal: true,
    layout: {
        type: 'fit',
        align: 'stretch',
        pack: 'start'
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    config:{
        codigo : 0
    },
    controller:'acciones-mantenimiento',
    initComponent: function () {
        me = this;

        Ext.apply(me, {
            items: me.getItems()
        });
        this.callParent();
    },
    getItems: function () {
        var store = Ext.create('sisfacturaelectronica.store.CotizacionesDelCliente');
        me = this;
        store.getProxy().extraParams ={vCodigo : me.getCodigo()};
        store.load();
        var obj = [
            {
                xtype: 'container',
                flex: 5,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                        xtype: 'container',
                        flex: 2,
                        layout: 'fit',
                        bodyPadding: 5,
                        padding: '5 5 5 10',
                        items: [{
                            xtype: 'gridpanel',
                            reference: 'dgvCotizacionesPasadas',
                            store : store,
                            columns: [{
                                    xtype: 'gridcolumn',
                                    dataIndex: 'fechacoti',
                                    text: 'Fecha',
                                    flex: 1
                                },
                                {
                                  xtype: 'gridcolumn',
                                  dataIndex: 'tidcoti',
                                  text: 'Cotizacion',
                                  flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'vendedor',
                                    text: 'Vendedor Asignado',
                                    flex: 1.5
                                },

                                {
                                    xtype: 'numbercolumn',
                                    dataIndex: 'totalcoti',
                                    text: 'Total Cotizacion',
                                    flex: 1,
                                    align:'right'
                                }

                            ]
                        }]
                    }
                ]
            }
        ];

        return obj;
    }




});
