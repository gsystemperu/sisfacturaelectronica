Ext.define('sisfacturaelectronica.view.ventas.VisorVendedorCotizacion', {
    extend: 'Ext.window.Window',
    alias: 'widget.wVisorVendedorCotizacion',
    xtype: 'wVisorVendedorCotizacion',
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
    height: 500,
    title: ' :: Vendedor - Andina Laboratorio :: ',
    iconCls: 'fa fa-address-card-o fa-2x',
    controller: 'acciones-regcotizacion',
    modal: true,
    layout: {
        type: 'fit',
        align: 'stretch',
        pack: 'start'
    },
    config: {
        cli: 0,
        nombre: '',
        dire: ''
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    controller: 'acciones-mantenimiento',
    initComponent: function () {
        me = this;

        Ext.apply(me, {
            items: me.getItems()
        });
        this.callParent();
    },
    getItems: function () {
        var storeVendedor = Ext.create('sisfacturaelectronica.store.Vendedores');
        var storeEstadistica = Ext.create('sisfacturaelectronica.store.CotizacionesEstadisticaVendedor');
        var obj = [{
                xtype: 'container',
                flex: 0.8,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                padding: '5 10 5 10',
                items: [{
                        xtype: 'combobox',
                        reference: 'cboVendedor',
                        fieldLabel: 'Nombre del Vendedor',
                        fieldStyle: 'text-transform:uppercase',
                        labelWidth: 150,
                        allowBlank: false,
                        editable: false,
                        store: storeVendedor,
                        queryMode: 'local',
                        displayField: 'completo',
                        valueField: 'idvend',
                        /*enableKeyEvents: true,
                        minChars: 3,
                        typeAhead: true,
                        forceSelection: true,
                        hideTrigger: true,*/
                    },
                    {
                        xtype: 'container',
                        flex: 1,
                        bodyPadding: 5,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [{
                                xtype: 'datefield',
                                flex: 1,
                                fieldLabel: 'Desde',
                                value: new Date(),
                                editable: false,
                                reference: 'dfDesde'
                            },
                            {
                                xtype: 'datefield',
                                flex: 1,
                                fieldLabel: 'Hasta',
                                labelAlign: 'right',
                                value: new Date(),
                                editable: false,
                                reference: 'dfHasta'
                            },
                            {
                                xtype: 'button',
                                glyph: sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                                handler: 'onClickCotizacionesPorVendedor'

                            }
                        ]
                    }
                ]
            },
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
                            title: 'Estadisticas',
                            reference: 'dgvEstFechas',
                            store: storeEstadistica,
                            columns: [{
                                    xtype: 'gridcolumn',
                                    dataIndex: 'fechacoti',
                                    text: 'Fecha',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'vendedor',
                                    text: 'Vendedor',
                                    flex: 1.5
                                },

                                {
                                    xtype: 'numbercolumn',
                                    dataIndex: 'totalcoti',
                                    text: 'Total Cotizacion',
                                    flex: 1,
                                    align: 'right'
                                }

                            ],

                            bbar: [{
                                    xtype: 'textfield',
                                    reference: 'txtConteoCoti',
                                    fieldLabel: '<b>Conteo :</b>',
                                    fieldStyle: {
                                        backgroundColor: '#F0F4C3',
                                        textAlign: 'right',
                                        fontSize: '15px'
                                    },
                                    width: 200
                                },
                                {
                                    xtype: 'numberfield',
                                    reference: 'txtSumaCoti',
                                    fieldLabel: '<b>Total  :</b>',
                                    fieldStyle: {
                                        backgroundColor: '#F0F4C3',
                                        textAlign: 'right',
                                        fontSize: '15px'
                                    },
                                    width: 300
                                }
                            ]
                        }]
                    }
                    /* ,
                     {
                         xtype: 'container',
                         flex: 1,
                         layout: 'fit',
                         padding: '5 5 10 5',
                         items: [{
                             xtype: 'gridpanel',
                             title: 'Cotizaciones',
                             columns: [{
                                     xtype: 'gridcolumn',
                                     dataIndex: 'string',
                                     text: 'Numero',
                                     flex: 2
                                 },
                                 {
                                     xtype: 'numbercolumn',
                                     dataIndex: 'number',
                                     text: 'Total',
                                     flex: 2
                                 },

                             ]
                         }]
                     }*/
                ]
            }
        ];

        return obj;
    }




});