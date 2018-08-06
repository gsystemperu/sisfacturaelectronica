Ext.define('sisfacturaelectronica.view.compras.EditarOrdenCompra', {
    extend: 'Ext.panel.Panel',
    xtype: 'weditarordencompra',
    requires: [
        'Ext.grid.plugin.*',
        'sisfacturaelectronica.view.compras.AccionesOrdenCompraEditar',
        'sisfacturaelectronica.util.Rutas'
    ],
    itemId: 'weditarordencompra',
    padding: 10,
    controller: 'acciones-ordencompraeditar',
    initComponent: function () {
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        var storeProveedores = Ext.create('sisfacturaelectronica.store.Proveedores');
        var storeDetalle = Ext.create('sisfacturaelectronica.store.DetalleOrdenCompra');
        var storeMonedas = Ext.create('sisfacturaelectronica.store.Monedas');
        me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: "form",
                    itemId: 'frmOrdenCompraEditar',
                    reference: 'frmOrdenCompraEditar',
                    url: sisfacturaelectronica.util.Rutas.ordenCompraEditar,
                    items: [{
                        xtype: 'panel',
                        flex: 1,
                        frame: false,
                        border: false,
                        items: [{
                            xtype: 'hiddenfield',
                            itemId: 'txtJsonDetalleOCEditar',
                            name: 'vjsondetalle'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'id',
                            itemId: 'id',
                            value: 0
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'usuario',
                            itemId: 'usuario',
                            value: ''
                        },
                        {
                            xtype: 'fieldset',
                            defaultType: 'textfield',
                            title: 'Datos Principales',
                            layout: 'fit',
                            items: [{
                                xtype: 'container',
                                layout: 'hbox',
                                margin: '0 0 5 6',
                                columnWidth: 0.5,
                                defaults: {
                                    allowBlank: false
                                },
                                items: [
                                    {
                                        xtype: 'combo',
                                        fieldLabel: 'Razon Social',
                                        itemId: 'cboProveedoresfEditar',
                                        store: storeProveedores,
                                        valueField: 'id',
                                        displayField: 'razonsocial',
                                        queryMode: 'local',
                                        flex: 2,
                                        editable: false,
                                        name: 'idprov'


                                    },
                                    {
                                        xtype: 'button',
                                        glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                                        handler: 'onClickFormularioProveedor',
                                        control: 'cboProveedoresfEditar'
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Fecha Pedido',
                                        value: new Date(),
                                        labelAlign: 'right',
                                        flex: 1,
                                        name: 'fecha',

                                    },
                                    {
                                        xtype: 'combo',
                                        fieldLabel: 'Forma Pago',
                                        labelAlign: 'right',
                                        store: sfpag,
                                        queryMode: 'local',
                                        valueField: 'idfopag',
                                        displayField: 'descripcion',
                                        flex: 1.5,
                                        editable: false,
                                        name: 'idformapago',
                                        allowBlank: false
                                    }
                                 ]
                            },

                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '0 0 5 6',
                            columnWidth: 0.5,
                            defaults: {
                                allowBlank: false
                            },
                            items: [
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Moneda',
                                    labelAlign: 'left',
                                    store: storeMonedas,
                                    queryMode: 'local',
                                    valueField: 'id',
                                    displayField: 'descripcion',
                                    value: 1,
                                    editable: false,
                                    name: 'idmoneda'
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Documento',
                                    store: stdoc,
                                    displayField: 'descripcion',
                                    valueField: 'id',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    name: 'documentoventa',
                                    labelAlign: 'right',
                                    editable: false,
                                    value: 1,
                                    flex: 1

                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Serie/Número',
                                    labelAlign: 'right',
                                    name: 'serie',
                                    value: '001',
                                    flex: 1,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    labelAlign: 'right',
                                    name: 'numerodoc',
                                    flex: 0.5,
                                    allowBlank: false,
                                    value: ''
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '0 0 5 6',
                            columnWidth: 0.5,
                            defaults: {
                                allowBlank: false
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: '<b>Precios Incluye I.g.v. </b>',
                                    name: 'flagestadoigv',
                                    itemId: 'ckbAplicarIgvEditar',
                                    value: true,
                                    listeners: {
                                        change: 'onChangeInIgv'
                                    }

                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Almacen Destino',
                                    margin: '0 0 5 6',
                                    itemId: 'cboAlmacen',
                                    labelAlign: 'right',
                                    store: sAlam,
                                    valueField: 'id',
                                    displayField: 'descripcion',
                                    queryMode: 'local',
                                    flex: 1,
                                    editable: false,
                                    name: 'idalmacen',
                                    allowBlank: false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            columnWidth: 0.1,
                            padding: 10,
                            defaultType: 'textfield',
                            items: [{
                                xtype: 'container',
                                margin: '0 0 0 -5',
                                layout: 'fit',
                                frame: true,
                                border: false,
                                items: [{
                                    xtype: 'container',
                                    layout: 'vbox',
                                    columnWidth: 0.5,
                                    margin: '0 0 10 6',
                                    items: [


                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            padding: '0 0 0 0',
                                            items: [{
                                                xtype: 'label',
                                                text: 'Producto',
                                                width: 80,
                                                height: 23,
                                                style: {
                                                    paddingTop: '3px',
                                                    background: '#6a4b5a',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',
                                                    fontSize: '13px'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                glyph: sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                                                handler: 'onClickBuscarProductoEditar'

                                            },
                                            {
                                                xtype: 'container',
                                                width: 20
                                            },

                                            {
                                                xtype: 'label',
                                                text: 'NRO° ORDEN COMPRA ',
                                                width: 210,
                                                height: 23,
                                                style: {
                                                    paddingTop: '3px',
                                                    background: '#6a4b5a',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',
                                                    fontSize: '15px'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'txtNumeroPedido',
                                                name: 'occodigo',
                                                readOnly: true
                                            }
                                            

                                            ]
                                        }
                                    ]
                                },

                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: 'fit',
                                margin: '0 0 5 0',
                                items: [{
                                    xtype: 'grid',
                                    flex: 1,
                                    itemId: 'dgvDetalleOrdenCompraEditar',
                                    reference: 'dgvDetalleOrdenCompraEditar',
                                    store: storeDetalle,
                                    plugins: [rowEditing],
                                    selModel: 'cellmodel',
                                    plugins: {
                                        ptype: 'cellediting',
                                        clicksToEdit: 1
                                    },
                                    columns: [{
                                        text: 'Producto',
                                        dataIndex: 'producto',
                                        flex: 1.8
                                    },

                                    {
                                        xtype: 'numbercolumn',
                                        text: 'Cant.',
                                        dataIndex: 'cantidad',
                                        flex: 0.3,
                                        align: 'center',
                                        editor: {
                                            xtype: 'numberfield',
                                            value: 0,
                                            //  maxValue: 1000,
                                            minValue: 0,
                                            itemId: 'txtCantidadUnidad'

                                        }
                                    },
                                    {

                                        xtype: 'numbercolumn',
                                        text: 'Precio Compra',
                                        dataIndex: 'precio',
                                        flex: 0.6,
                                        align: 'right',
                                        editor: {
                                            xtype: 'numberfield',
                                            format: '0.00',
                                            decimalPrecision: 2,
                                            decimalSeparator: '.'
                                        }
                                    },
                                    {

                                        xtype: 'numbercolumn',
                                        text: 'Total',
                                        dataIndex: 'total',
                                        flex: 0.6,
                                        align: 'right'

                                    },

                                    {
                                        xtype: 'widgetcolumn',
                                        flex: 0.2,
                                        widget: {
                                            xtype: 'button',
                                            width: 24,
                                            glyph: 0xf014,
                                            listeners: {
                                                click: 'onClickEliminarDetalleEditar'
                                            }
                                        }

                                    }


                                    ],
                                    cls: '',
                                    height: 300,
                                    listeners: {
                                        edit: 'onEditorCalcularTotalOrdenCompraEditar'
                                    }

                                }]

                            }
                            ]

                        }, // fin fieldset Detalle
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [{
                                xtype: 'panel',
                                flex: 1.8
                            },
                            {
                                xtype: 'panel',
                                flex: 1,
                                padding: '0 0 15 0',
                                items: [{
                                    xtype: 'textfield',
                                    itemId: 'txtSubtotalOrdenCompraEditar',
                                    name: 'subtotal',
                                    value: "0.00",
                                    fieldLabel: '<b>Sub Total</b>',
                                    decimalPrecision: 2,
                                    minValue: 0,
                                    step: 0.01,
                                    readOnly: true,
                                    width: 280,
                                    labelWidth: 120,
                                    fieldStyle: 'text-align: right;font-size:16px;',
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '<b>I.g.v.  </b>',
                                    itemId: 'txtIgvOrdenCompraEditar',
                                    name: 'igv',
                                    value: "0.00",
                                    minValue: 0,
                                    readOnly: true,
                                    width: 280,
                                    labelWidth: 120,
                                    fieldStyle: 'text-align: right;font-size:16px;',
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '<b>Total General </b>',
                                    itemId: 'txtTotalGeneralOrdenCompraEditar',
                                    value: "0.00",
                                    name: 'totalgeneral',
                                    readOnly: true,
                                    width: 280,
                                    labelWidth: 120,
                                    fieldStyle: 'text-align: right;font-size:16px;',
                                    labelAlign: 'right'
                                }
                                ]
                            }

                            ]

                        },
                        {
                            xtype: 'panel',
                            buttons: [

                                {
                                    xytpe: 'button',
                                    text: 'Cancelar',
                                    scale: 'medium',
                                    handler: 'onClickSalirOrdenCompra'
                                }, '-',

                                {
                                    xytpe: 'button',
                                    text: 'Guardar',
                                    scale: 'medium',
                                    itemId: 'btnGuardarVenta',
                                    handler: 'onClickGuardarOrdenCompra'
                                }


                            ]


                        }
                        ]

                    }

                    ]
                }


            ]
        });

        me.callParent(arguments);



    }
});
