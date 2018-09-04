Ext.define('sisfacturaelectronica.view.ventas.RegistrarCotizacion', {
    extend: 'Ext.panel.Panel',
    xtype: 'wRegistrarCotizacion',
    alias: 'widget.wRegistrarCotizacion',
    requires: [
        'Ext.grid.plugin.*',
        'Ext.form.field.*',
        'sisfacturaelectronica.util.Rutas',
        'Ext.grid.plugin.RowEditing'
    ],
    itemId: 'wRegistrarCotizacion',
    bodyPadding: 10,
    controller: 'acciones-regcotizacion',
    initComponent: function () {
        rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        storeClientes = Ext.create('sisfacturaelectronica.store.Clientes');
        storeProductos = Ext.create('sisfacturaelectronica.store.Productos');
        storeDetCotizacion = Ext.create('sisfacturaelectronica.store.DetalleCotizacion');
        storeFormaPago = Ext.create('sisfacturaelectronica.store.FormaPago');
        storeModoEntrega = Ext.create('sisfacturaelectronica.store.ModoEntrega');
        storeVendedores = Ext.create('sisfacturaelectronica.store.Vendedores');
        storeMonedas = Ext.create('sisfacturaelectronica.store.Monedas');

        me = this;
        Ext.applyIf(me, {
            items: [{
                xtype: "form",
                itemId: 'frmRegCotizacion',
                reference: 'frmRegCotizacion',
                padding: 10,
                url: sisfacturaelectronica.util.Rutas.cotizacionGuardar,
                items: [{
                    xtype: 'panel',
                    flex: 1,
                    frame: false,
                    border: false,
                    items: [{
                        xtype: 'hiddenfield',
                        itemId: 'txtJsonDetalle',
                        name: 'vjsondetalle'
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'vid',
                        itemId: 'vid',
                        value: 0
                    },
                    {
                        xtype: 'hiddenfield',
                        itemId: 'posicion',
                        value: 0
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'plantilla',
                        value: 0
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        margin: '5 0 5 0',
                        columnWidth: 0.5,
                        items: [{
                            xtype: 'combobox',
                            itemId: 'cboDatosCliente',
                            name: 'idper',
                            fieldLabel: 'Nombre / Razon Social',
                            flex: 2,
                            fieldStyle: 'text-transform:uppercase',
                            labelWidth: 150,
                            allowBlank: false,
                            editable: true,
                            forceSelection: true,
                            store: storeClientes,
                            queryMode: 'local',
                            displayField: 'nombreper',
                            valueField: 'idper'
                        },
                        {
                            xtype: 'button',
                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                            handler: 'onClickNuevoCliente'
                        },

                        {

                            xtype: 'textfield',
                            fieldLabel: 'Referencia',
                            labelAlign: 'right',
                            flex: 1,
                            itemId: 'txtReferencia',
                            name: 'vreferencia',
                            hidden: true

                        }


                        ]


                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            anchor: 'strech'
                        },
                        paddingTop: 10,
                        paddingBotton: 10,
                        defaults: {
                            labelWidth: 120,
                        },
                        items: [{
                            xtype: 'combo',
                            fieldLabel: 'Forma Pago',
                            store: storeFormaPago,
                            displayField: 'descripcion',
                            valueField: 'idfopag',
                            queryMode: 'local',
                            allowBlank: false,
                            name: 'vformapago',
                            editable: false,
                            itemId: 'idfopag',
                            flex: 1

                        },
                        {
                            xtype: 'button',
                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                            handler: 'onClickMantenimiento'
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Modo de Entrega',
                            store: storeModoEntrega,
                            displayField: 'descripcion',
                            valueField: 'idmodo',
                            queryMode: 'local',
                            allowBlank: false,
                            name: 'vmodoentrega',
                            labelAlign: 'right',
                            editable: false,
                            itemId: 'vmodoentrega',
                            value: 1,
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                            handler: 'onClickMantenimiento'
                        },

                        ]


                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            anchor: 'strech'
                        },
                        defaults: {
                            labelWidth: 120,
                            padding: '5 0 5 0'
                        },
                        items: [
                            {

                                xtype: 'datefield',
                                fieldLabel: 'Fecha Venta',
                                value: new Date(),
                                labelAlign: 'left',
                                flex: 1,
                                itemId: 'dtFechaVenta',
                                name: 'vfecha'

                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Válido Hasta',
                                labelAlign: 'right',
                                editable: false,
                                name: 'fechavalidohasta',
                                value: new Date(),
                                flex: 1
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Moneda',
                                store: storeMonedas,
                                displayField: 'descripcion',
                                valueField: 'id',
                                queryMode: 'local',
                                allowBlank: true,
                                name: 'idmoneda',
                                labelAlign: 'right',
                                editable: false,
                                flex: 1,
                                value: 1,
                                labelWidth: 128
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Asignar a Vendedor',
                                store: storeVendedores,
                                displayField: 'completo',
                                valueField: 'idvend',
                                queryMode: 'local',
                                allowBlank: true,
                                name: 'vvendedor',
                                labelAlign: 'right',
                                editable: false,
                                itemId: 'vvendedor',
                                hidden: true

                            },
                            {
                                xtype: 'button',
                                glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                                handler: 'onClickMantenimiento'
                            },
                            {
                                xtype: 'checkboxfield',
                                boxLabel: 'Precio incluye el I.G.V.',
                                labelAlign: 'right',
                                name: 'incluyeigv',
                                reference: 'incluyeigv',
                                itemId: 'incluyeigv',
                                readOnly: false,
                                value: 1,
                                flex: 1,
                                listeners: {
                                    change: {
                                        fn: 'onSelectedIncluyeIGV'
                                    }
                                }
                            }

                        ]


                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            anchor: 'strech'
                        },
                        defaults: {
                            labelWidth: 120,
                            padding: '4 0 4 0'
                        },
                        items: [
                            {
                                xtype: 'textarea',
                                fieldLabel: 'Lugar de entrega',
                                name: 'lugarentrega',
                                flex: 1
                            },
                            {
                                xtype: 'textarea',
                                fieldLabel: 'Creditos y cobranzas',
                                labelAlign: 'right',
                                name: 'creditoscobranzas',
                                flex: 1
                            }
                        ]


                    },


                    {
                        xtype: 'fieldset',
                        columnWidth: 0.1,
                        defaultType: 'textfield',
                        padding: 5,
                        items: [{
                            xtype: 'container',
                            margin: '0 0 0 -5',
                            layout: 'fit',
                            frame: true,
                            border: false,
                            items: [


                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    padding: '0 5 5 0',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Buscar Producto',
                                            width: 120,
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
                                            handler: 'onClickBuscarProducto',
                                            tooltip: 'Accion para buscar los productos ingresados'
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            padding: '0 10 0 0',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Nro. Cotizacion :',
                                                    width: 120,
                                                    height: 23,
                                                    style: {
                                                        paddingTop: '3px',
                                                        background: '#6A4B5A',
                                                        color: 'white',
                                                        textAlign: 'center',
                                                        fontWeight: 'bold',
                                                        fontSize: '13px'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'text-align: center;font-size:15px;font-weight:bold; ',
                                                    value: 'CT000000000000',
                                                    name: 'ctcodigo'
                                                }
                                            ]
                                        }
                                      

                                    ]
                                }


                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'fit',
                            margin: '0 0 5 0',
                            items: [{
                                xtype: 'grid',
                                flex: 1,
                                reference: 'dgvDetalleVenta',
                                itemId: 'dgvDetalleVenta',
                                store: storeDetCotizacion,
                                plugins: [rowEditing],
                                selModel: 'cellmodel',
                                plugins: {
                                    ptype: 'cellediting',
                                    clicksToEdit: 1
                                },
                                scrollable: true,
                                columns: [{
                                    text: 'Descripción',
                                    dataIndex: 'descripcion',
                                    flex: 3
                                },
                                {
                                    xtype: 'numbercolumn',
                                    text: 'Cantidad',
                                    dataIndex: 'cantidad',
                                    flex: 0.5,
                                    align: 'center',
                                    editor: {
                                        xtype: 'numberfield',
                                        value: 0,
                                        //maxValue: 1000,
                                        minValue: 0,
                                        itemId: 'txtCantidadUnidad'

                                    }
                                },
                                {
                                    //xtype:'numbercolumn',
                                    text: 'Precio',
                                    dataIndex: 'precio',
                                    flex: 0.6,
                                    align: 'right',
                                    renderer: Ext.util.Format.numberRenderer('0.00'),
                                    editor: {
                                        xtype: 'numberfield',
                                        format: '0.00',
                                        decimalPrecision: 5,
                                        decimalSeparator: '.'
                                    }
                                },
                                {
                                    //xtype:'numbercolumn',
                                    text: 'Total',
                                    dataIndex: 'total',
                                    flex: 0.5,
                                    align: 'right',
                                    renderer: Ext.util.Format.numberRenderer('0.00')

                                },
                                {
                                    xtype: 'datecolumn',
                                    dataIndex: 'vencimiento',
                                    flex: 0.5,
                                    format: 'd/m/Y',
                                    text: 'Vencimiento',
                                    editor: {
                                        xtype: 'datefield',
                                        format: 'd/m/Y',
                                        value: new Date()
                                    }
                                },
                                {
                                    xtype: 'widgetcolumn',
                                    flex: 0.2,
                                    widget: {
                                        xtype: 'button',
                                        width: 24,
                                        glyph: 0xf014,
                                        listeners: {
                                            click: 'onClickEliminarDetalle'
                                        }
                                    }

                                }


                                ],
                                cls: '',
                                height: 300,
                                listeners: {
                                    edit: 'onEditorCalcularTotal'
                                }

                            }]

                        }
                        ]

                    }, // fin fieldset Detalle
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'textarea',
                                flex: 1.5,
                                height: 100,
                                name: 'comentario',
                                fieldStyle: 'font-size:12px;text-transform:uppercase;',
                                //emptyText : 'Comentario Cotizacion :'
                            },
                            {
                                xtype: 'panel',
                                flex: 1,
                                padding: '0 0 0 0',
                                items: [{
                                    xtype: 'textfield',
                                    reference: 'Subtotalventas',
                                    itemId: 'Subtotalventas',
                                    name: 'valventacont',
                                    fieldLabel: 'Sub Total',
                                    readOnly: true,
                                    width: 280,
                                    labelWidth: 120,
                                    fieldStyle: 'text-align: right;font-size:16px;',
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Igv',
                                    reference: 'igvventas',
                                    itemId: 'igvventas',
                                    name: 'valigvcont',
                                    minValue: 0,
                                    readOnly: true,
                                    width: 280,
                                    labelWidth: 120,
                                    fieldStyle: 'text-align: right;font-size:16px;',
                                    labelAlign: 'right'

                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Total General ',
                                    labelAlign: 'right',
                                    reference: 'TotalGeneral',
                                    itemId: 'TotalGeneral',
                                    name: 'valtotalcont',
                                    minValue: 0,
                                    readOnly: true,
                                    width: 280,
                                    labelWidth: 120,
                                    fieldStyle: 'text-align: right;font-size:16px;'
                                }
                                ]
                            }

                        ]

                    },
                    {
                        xtype: 'panel',
                        buttons: [
                            '->',
                            {
                                text: 'Cancelar',
                                scale: 'medium',
                                handler: 'onClickSalirCotizacion'
                            },
                            {
                                text: 'Guardar',
                                scale: 'medium',
                                handler: 'onClickGuardarCotizacion'
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
