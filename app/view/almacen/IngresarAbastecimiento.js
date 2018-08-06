Ext.define('sisfacturaelectronica.view.almacen.IngresarAbastecimiento', {
    extend: 'Ext.window.Window',
    xtype: 'wingresarabastecimiento',
    requires: [
        'Ext.grid.plugin.*',
        'sisfacturaelectronica.view.almacen.AccionesReglasAbastecimiento',
        'sisfacturaelectronica.util.Rutas'
    ],
    itemId: 'wingresarabastecimiento',
    width: 950,
    height: 600,
    resizable: false,
    modal: true,
    floating: true,
    title: '.:. Registrar Abastecimiento .:.',
    bodyPadding: 5,
    autoShow: true,
    controller: 'acciones-abastecimiento',
    initComponent: function () {
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        
        var storeTipoDoc      = Ext.create('sisfacturaelectronica.store.TipoDocumento');
        var storeProveedores = Ext.create('sisfacturaelectronica.store.Proveedores');
        var storeDetalle      = Ext.create('sisfacturaelectronica.store.DetalleAbastecimiento');
        me = this;
        Ext.applyIf(me, {
            items: [{
                    xtype: "form",
                    itemId: 'frmAbastecimiento',
                    reference :'frmAbastecimiento',
                    url: sisfacturaelectronica.util.Rutas.abastecimientoGuardar,
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
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    title: 'Proveedor',
                                    layout: 'fit',
                                    items: [{
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '0 0 5 6',
                                            columnWidth: 0.5,
                                            defaults:{
                                                allowBlank:false
                                            },
                                            items: [
                                                /*{
                                                    xtype: 'hiddenfield',
                                                    itemId: 'txtProveedorId',
                                                    name: 'vidProveedor'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Razon Social',
                                                    itemId: 'txtDatosProveedor',
                                                    flex: 2,
                                                    fieldStyle: 'text-transform:uppercase',
                                                    labelWidth: 100,
                                                    allowBlank: false,
                                                    editable: false

                                                },*/
                                                {
                                                    xtype:'combo',
                                                    fieldLabel:'Razon Social',
                                                    itemId : 'cboProveedoresf',
                                                    store : storeProveedores,
                                                    valueField:'id',
                                                    displayField:'razonsocial',
                                                    queryMode : 'local',
                                                    flex: 2,
                                                    editable :false,
                                                    name : 'vidproveedor'
                                                   
                                                
                                                },
                                                {
                                                    xtype: 'button',
                                                    glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                                                    handler: 'onClickFormularioProveedor',
                                                    control : 'cboProveedoresf'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Fecha Venta',
                                                    value: new Date(),
                                                    labelAlign: 'right',
                                                    flex: 1,
                                                    name: 'vfecha',
                                                    format: 'd/m/Y'

                                                },


                                            ]
                                        },

                                    ]

                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    bodyPadding: '30 0 0 0',
                                    columnWidth: 5,
                                    defaults: {
                                        labelAlign: 'right',
                                        labelWidth: 105,
                                        allowBlank:false
                                    },
                                    
                                    items: [{
                                            xtype: 'combobox',
                                            fieldLabel: 'Tipo Documento',
                                            store: storeTipoDoc,
                                            displayField: 'descripcion',
                                            valueField: 'id',
                                            editable: false,
                                            itemId: 'cboTipoDocumento',
                                            value: 'F',
                                            flex: 1.5,
                                            name: 'vtipodoc'
                                        }, {
                                            xtype: 'button',
                                            reference: 'btnNuevoTipoDocumento',
                                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo')
                                        }, {
                                            xtype: "textfield",
                                            itemId: "txtSerieDoc",
                                            fieldLabel: 'Nro. Documento',
                                            name: "seriedoc",
                                            flex: 1,
                                            allowBlank: false,
                                            hideTrigger: true,
                                            keyNavEnabled: false,
                                            mouseWheelEnabled: false,
                                            name: 'vserie'

                                        },
                                        {
                                            xtype: "textfield",
                                            itemId: 'txtNroDoc',
                                            name: "numerodoc",
                                            flex: 1,
                                            allowBlank: false,
                                            hideTrigger: true,
                                            keyNavEnabled: false,
                                            mouseWheelEnabled: false,
                                            name: 'vnumero'

                                        },

                                        {
                                            xtype: 'textfield',
                                            fieldLabel: '<b>Lote</b>',
                                            name: 'lote',
                                            flex: 1,
                                            name :'vlote'

                                        }



                                    ]
                                },


                                {
                                    xtype: 'fieldset',
                                    columnWidth: 0.1,
                                    title: 'Detalle',
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
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Producto',
                                                                    width: 80,
                                                                    height: 23,
                                                                    style: {
                                                                        paddingTop: '3px',
                                                                        background: '#775c80',
                                                                        color: 'white',
                                                                        textAlign: 'center',
                                                                        fontWeight: 'bold',
                                                                        fontSize: '13px'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    // text: 'Buscar Producto',
                                                                    glyph: sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                                                                    handler: 'onClickBuscarProducto'

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
                                                itemId: 'dgvDetalleAbastecimiento',
                                                reference: 'dgvDetalleAbastecimiento',
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
                                                        text: 'Cant.',
                                                        dataIndex: 'cantidad',
                                                        flex: 0.3,
                                                        align: 'center',
                                                        editor: {
                                                            xtype: 'numberfield',
                                                            value: 0,
                                                            maxValue: 1000,
                                                            minValue: 0,
                                                            itemId: 'txtCantidadUnidad'

                                                        }
                                                    },
                                                    {
                                                        text: 'Precio Compra',
                                                        dataIndex: 'precio',
                                                        flex: 0.6,
                                                        align: 'center',
                                                        editor: {
                                                            xtype: 'numberfield',
                                                            format: '0.00',
                                                            decimalPrecision: 2,
                                                            decimalSeparator: '.'
                                                        }
                                                    },
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'total',
                                                        flex: 0.6,
                                                        align: 'center'

                                                    },
                                                    {
                                                        xtype: 'datecolumn',
                                                        text: 'Vencimiento',
                                                        dataIndex: 'vencimiento',
                                                        flex: 0.5,
                                                        align: 'center',
                                                        format : 'd/m/Y',
                                                        editor: {
                                                            xtype: 'datefield',
                                                            value: new Date(),
                                                            format: 'd/m/Y'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'checkcolumn',
                                                        text: 'Gen. Serie',
                                                        dataIndex: 'genserie',
                                                        flex: 0.5,
                                                        align: 'center',
                                                        editor : {
                                                            xtype:'checkbox',
                                                        
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
                                                height: 255,
                                                listeners: {
                                                    edit: 'onEditorCalcularTotalAbastecimiento'
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
                                            flex: 1.2
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            padding: '0 0 15 0',
                                            items: [{
                                                    xtype: 'numberfield',
                                                    itemId: 'txtSubtotal',
                                                    name: 'subtotal',
                                                    value: "0.00",
                                                    fieldLabel: '<b>Sub Total</b>',
                                                    decimalPrecision: 2,
                                                    minValue: 0,
                                                    step: 0.01,
                                                    decimalSeparator: '.',
                                                    readOnly: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    fieldStyle: 'text-align: right;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: '<b>I.g.v.  </b>',
                                                    itemId: 'txtIgv',
                                                    name: 'igv',
                                                    value: "0.00",
                                                    fieldStyle: 'text-align: right;',
                                                    //     decimalPrecision: 3,
                                                    // maxValue: 9999,
                                                    minValue: 0,
                                                    //                                            step: 0.01,
                                                    //                                            decimalSeparator: '.',
                                                    readOnly: true,
                                                    enableKeyEvents: true,
                                                    width: 280,
                                                    labelWidth: 120
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: '<b>Total General </b>',
                                                    itemId: 'txtTotalGeneral',
                                                    value: "0.00",
                                                    name: 'totalgeneral',
                                                    //   decimalPrecision: 3,
                                                    //  maxValue: 9999,
                                                    minValue: 0,
                                                    //                                            step: 0.01,
                                                    //                                            decimalSeparator: '.',
                                                    readOnly: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    fieldStyle: 'text-align: right;'
                                                }
                                            ]
                                        }

                                    ]

                                },
                                {
                                    xtype: 'panel',
                                    buttons: [
                                         {
                                            xtype: 'checkboxfield',
                                            boxLabel: '<b>El Precio incluye I.G.V</b>',
                                             name:"flagestadoigv",
                                            //       inputValue: 1,
                                            itemId: 'ckbAplicarIgv'

                                        }, '-',
                                        {
                                            xytpe: 'button',
                                            text: 'Cancelar',
                                            scale: 'medium',
                                            handler: 'onClickSalirAbastecimiento'
                                        }, '-',
                                       
                                        {
                                            xytpe: 'button',
                                            text: 'Guardar',
                                            scale: 'medium',
                                            itemId: 'btnGuardarVenta',
                                            handler: 'onClickGuardarAbastecimiento'
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