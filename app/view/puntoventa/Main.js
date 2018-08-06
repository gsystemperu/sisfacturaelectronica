Ext.define('sisfacturaelectronica.view.puntoventa.Main', {
    extend: 'Ext.form.Panel',
    alias: 'wPdv',
    xtype: 'wPdv',
    itemId: 'wPdv',
    requires: [
        'sisfacturaelectronica.view.puntoventa.Listado',
        'sisfacturaelectronica.view.puntoventa.MainController',
        'Ext.grid.plugin.*',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.view.Table',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
    ],
    controller: 'puntoventa-main',
    layout: 'border',
    url: '',
    initComponent: function () {
        me = this;
        var _storeDetalle = Ext.create('sisfacturaelectronica.store.CajaDetalleVenta');
        Ext.apply(me, {
            items: me.getItems(_storeDetalle, 1),

        });
        this.callParent(arguments);
    },
    getItems: function (_storeDetalle, _numeromesa) {
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        var _obj = [{
                xtype: 'panel',
                flex: 1.3,
                region: 'west',
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'center'
                },

                items: [{
                        xtype: 'panel',
                        flex: 2,
                        layout: 'fit',
                        items: [{
                            xtype: 'gridpanel',
                            itemId: 'dgvDetalleCaja',
                            store: _storeDetalle,
                            plugins: [rowEditing],
                            selModel: 'cellmodel',
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 1
                            },
                            columns: [{
                                    dataIndex: 'producto',
                                    text: 'Producto',
                                    flex: 3,

                                },
                                {
                                    dataIndex: 'cantidad',
                                    text: 'Cantidad',
                                    flex: 0.7,
                                    align: 'center',
                                    editor: {
                                        xtype: 'numberfield',
                                        value: 0,
                                        maxValue: 1000,
                                        minValue: 0,
                                        itemId: 'txtCantidadUnidad'

                                    },
                                    hidden:false
                                },
                                {
                                    dataIndex: 'blister',
                                    text: 'Blister',
                                    flex: 0.7,
                                    align: 'center',
                                    hidden:false,
                                    editor: {
                                        xtype: 'numberfield',
                                        value: 0,
                                        maxValue: 1000,
                                        minValue: 0,
                                        itemId: 'txtCantidadBlister'

                                    },
                                },
                                {
                                    dataIndex: 'dosis',
                                    text: 'Pastilla',
                                    flex: 0.7,
                                    hidden: false,
                                    align: 'center',
                                    editor: {
                                        xtype: 'numberfield',
                                        value: 0,
                                        maxValue: 1000,
                                        minValue: 0,
                                        itemId: 'txtCantidadDosis'

                                    },
                                },



                                {
                                    dataIndex: 'kilos',
                                    text: 'Kilos',
                                    hidden: true,
                                    flex: 0.7,
                                    align: 'center',
                                    editor: {
                                        xtype: 'numberfield',
                                        value: 0,
                                        maxValue: 1000,
                                        minValue: 0,
                                        itemId: 'txtCantidadDosis'

                                    },
                                },
                                {
                                    dataIndex: 'gramos',
                                    text: 'Gramos',
                                    hidden: true,
                                    flex: 0.7,
                                    align: 'center',
                                    editor: {
                                        xtype: 'numberfield',
                                        value: 0,
                                        maxValue: 1000,
                                        minValue: 0,
                                        itemId: 'txtCantidadDosis'

                                    },
                                },
                                {
                                    xtype: 'numbercolumn',
                                    dataIndex: 'precio',
                                    text: 'Precio',
                                    flex: 1,
                                    align: 'right'
                                },
                                {
                                    xtype: 'numbercolumn',
                                    dataIndex: 'total',
                                    text: 'Total',
                                    flex: 1.5,
                                    align: 'right',

                                },
                                {
                                    xtype: 'widgetcolumn',
                                    flex: 0.5,
                                    widget: {
                                        xtype: 'button',
                                        flex: 1,
                                        glyph: 0xf014,
                                        handler: 'onClickEliminarItem'
                                    }
                                }
                            ],
                            listeners: {
                                edit: 'onEditorCalcularTotal'
                            }
                        }],

                        bbar: [
                            '->',
                            {
                                xtype: 'numberfield',
                                fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Total </div></b>',
                                itemId: 'txtTotalVentaCaja',
                                decimalSeparator: '.',
                                readOnly: true,
                                fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',

                            }
                        ],
                    },

                ]
            },
            {
                xtype: 'panel',
                flex: 1,
                region: 'center',
                layout: {
                    type: 'vbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [{
                        xtype: 'wListadoProducto',
                        flex: 3
                    },
                    /*{
                          xtype:'wListadoGenericos',
                          flex: 1
                    }*/
                ]

            }


        ];

        return _obj;


    }

});