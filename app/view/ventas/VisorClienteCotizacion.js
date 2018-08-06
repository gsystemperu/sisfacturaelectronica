Ext.define('sisfacturaelectronica.view.ventas.VisorClienteCotizacion', {
    extend: 'Ext.window.Window',
    alias: 'widget.wVisorClienteCotizacion',
    xtype: 'wVisorClienteCotizacion',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.view.Table',
        'sisfacturaelectronica.view.ventas.AccionesRegCotizacion',
        'sisfacturaelectronica.view.ventas.AccionesMantenimiento'
    ],

    autoShow: true,
    width: 700,
    height: 500,
    title: ' :: Cliente - Andina Laboratorio :: ',
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
    controller:'acciones-mantenimiento',
    initComponent: function () {
        me = this;

        Ext.apply(me, {
            items: me.getItems()
        });
        this.callParent();
    },
    getItems: function () {
        var storeClientes = Ext.create('sisfacturaelectronica.store.Clientes');
        storeClientes.load();
        var storeEstadistica=Ext.create('sisfacturaelectronica.store.CotizacionesEstadistica');
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
                        reference: 'cboDatosCliente',
                        fieldLabel: 'Nombre / Razon Social',
                        flex: 1,
                        fieldStyle: 'text-transform:uppercase',
                        labelWidth: 150,
                        allowBlank: false,
                        editable: false,
                        store: storeClientes,
                        queryMode: 'local',
                        displayField: 'nomcompleto',
                        valueField: 'idper',
                        /*enableKeyEvents: true,
                        minChars: 2,
                        typeAhead: true,
                        forceSelection: true,
                        hideTrigger: true,*/
                        name: 'vidcliente',
                        //empyText: '--- Digitar Datos del Cliente ---'
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
                                editable:false,
                                reference:'dfDesde'
                            },
                            {
                                xtype: 'datefield',
                                flex: 1,
                                fieldLabel: 'Hasta',
                                labelAlign: 'right',
                                value: new Date(),
                                editable:false,
                                reference:'dfHasta'
                            },
                            {
                                xtype: 'button',
                                glyph: sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                                handler:'onClickCotizacionesPorCliente'

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
                            store : storeEstadistica,
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
                                    align:'right'
                                }

                            ],
                            
                            bbar:[
                                '->',
                                {
                                    xtype:'textfield',
                                    reference:'txtConteoCoti',
                                    fieldLabel:'<b>Conteo :</b>',
                                    fieldStyle: {
                                        backgroundColor:'#F0F4C3',
                                        textAlign:'right',
                                        fontSize:'15px'
                                    },
                                    width:200
                                },
                                {
                                    xtype:'numberfield',
                                    reference:'txtSumaCoti',
                                    fieldLabel:'<b>Total  :</b>',
                                    fieldStyle: {
                                        backgroundColor:'#F0F4C3',
                                        textAlign:'right',
                                        fontSize:'15px'
                                    },
                                    width:300
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