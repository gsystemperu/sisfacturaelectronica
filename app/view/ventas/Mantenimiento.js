Ext.define('sisfacturaelectronica.view.ventas.Mantenimiento', {
    extend: 'Ext.window.Window',
    alias: 'widget.wMantenimiento',
    xtype: 'wMantenimiento',
    requires: [
        'Ext.tab.Tab',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.view.Table',
        'Ext.toolbar.Toolbar',
        'Ext.form.Panel',
        'sisfacturaelectronica.view.ventas.AccionesMantenimiento'
    ],
    autoShow: true,
    width: 900,
    height: 400,
    title: ' :: Mantenimiento :: ',
    iconCls: 'fa fa-address-card-o fa-2x',
    controller: 'acciones-mantenimiento',
    bodyPadding: 5,
    modal: true,
    layout: {
        type: 'fit',
        align: 'stretch',
        pack: 'start'
    },
    initComponent: function () {
        me = this;
        Ext.apply(me, {
            items: me.getItems()
        });
        me.callParent();
    },
    getItems: function () {
        var storeUM = Ext.create('sisfacturaelectronica.store.UnidadMedida');
        var storeME = Ext.create('sisfacturaelectronica.store.ModoEntrega');
        var storeFP = Ext.create('sisfacturaelectronica.store.FormaPago');
        var storeVE = Ext.create('sisfacturaelectronica.store.Vendedores');
        var storePR = Ext.create('sisfacturaelectronica.store.Presentacion');
        var storeCA = Ext.create('sisfacturaelectronica.store.Categoria');

        var _obj = [{
            xtype: 'tabpanel',
            activeTab: 0,
            items: [{
                    xtype: 'panel',
                    hidden:false,
                    title: 'Unidad de Medida',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                            xtype: 'form',
                            reference: 'frmUnidadMedida',
                            flex: 1,
                            padding: 10,
                            layout: 'anchor',
                            url: sisfacturaelectronica.util.Rutas.unidadMedidaGuardar,
                            items: [{
                                    xtype: 'hiddenfield',
                                    name: 'idumed',
                                    itemd: 'idumed',
                                    value: 0
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    fieldLabel: 'Descripcion',
                                    name: 'descripcion',
                                    itemId: 'txtDesUMed',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    fieldLabel: 'Abreviatura',
                                    name: 'abreviatura'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: 'fit',
                            items: [{
                                xtype: 'gridpanel',
                                reference: 'dgvUnidadMedida',
                                store: storeUM,
                                columns: [{
                                        text: 'Descripcion',
                                        dataIndex: 'descripcion',
                                        flex: 1
                                    },
                                    {
                                        text: 'Abreviatura',
                                        dataIndex: 'abreviatura',
                                        flex: 0.5
                                    }

                                ],
                                dockedItems: [{
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [{
                                            xtype: 'button',
                                            text: 'Nuevo',
                                            handler: 'onClickNuevaUnidadMedida'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Guardar',
                                            handler: 'onClickGuardarUnidadMedida'
                                        }
                                    ]
                                }]
                            }]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Forma de Pago',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                            xtype: 'form',
                            url: sisfacturaelectronica.util.Rutas.formaPagoGuardar,
                            flex: 1,
                            reference: 'frmFormaPago',
                            padding: 10,
                            layout: 'anchor',
                            items: [{
                                    xtype: 'hiddenfield',
                                    name: 'idfopag',
                                    reference: 'idfopag',
                                    value: 0
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    fieldLabel: 'Descripcion',
                                    name: 'descripcion',
                                    reference: 'descripcion',
                                    allowBlank: false
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: 'fit',
                            items: [{
                                xtype: 'gridpanel',
                                reference: 'dgvFormaPago',
                                store: storeFP,
                                columns: [{
                                        dataIndex: 'descripcion',
                                        text: 'Descripcion',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'widgetcolumn',
                                        flex: 0.3,
                                        widget: {
                                            xtype: 'button',
                                            glyph: 0xf014,
                                            handler: 'onClickEliminarFormaPago'

                                        }

                                    }

                                ],
                                listeners :{
                                    cellclick :'onSelectedFormaPago'
                                },
                                dockedItems: [{
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [{
                                            xtype: 'button',
                                            text: 'Nuevo',
                                            handler:'onClickNuevaFormaPago'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Guardar',
                                            handler:'onClickGuardarFormaPago'
                                        }
                                    ]
                                }]
                            }]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyPadding: 5,
                    title: 'Modo de Entrega',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                            xtype: 'form',
                            url: sisfacturaelectronica.util.Rutas.modoEntregaGuardar,
                            reference: 'frmModoEntrega',
                            flex: 1,
                            padding: 10,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [{
                                    xtype: 'hiddenfield',
                                    name: 'idmodo',
                                    reference: 'idmodo',
                                    value: 0
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Descripcion',
                                    name : 'descripcion',
                                    reference: 'txtDescripcionModo',
                                    allowBlank: false
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: 'fit',

                            items: [{
                                xtype: 'gridpanel',
                                reference: 'dgvModoEntrega',
                                store: storeME,
                                columns: [{
                                        xtype: 'gridcolumn',
                                        dataIndex: 'descripcion',
                                        text: 'Descripcion',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'widgetcolumn',
                                        flex: 0.3,
                                        widget: {
                                            xtype: 'button',
                                            glyph: 0xf014,
                                            handler: 'onClickEliminarModoEntrega'
                                        }

                                    }

                                ],
                                listeners :{
                                    cellclick :'onSelectedModoEntrega'
                                },
                                dockedItems: [{
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [{
                                            xtype: 'button',
                                            text: 'Nuevo',
                                            handler:'onClickNuevoModoEntrega'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Guardar',
                                            handler:'onClickGuardarModoEntrega'
                                        }
                                    ]
                                }]
                            }]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyPadding: 5,
                    title: 'Vendedores',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                            xtype: 'form',
                            url: sisfacturaelectronica.util.Rutas.vendedorGuardar,
                            reference: 'frmVendedores',
                            flex: 0.7,
                            padding: 10,
                            flex: 0.5,
                            layout: 'anchor',
                            defaults: {
                                xtype: 'textfield',
                                anchor: '100%'
                            },
                            items: [{
                                    xtype: 'hiddenfield',
                                    name: 'idvend',
                                    reference: 'idvend',
                                    value: 0
                                },
                                {
                                    fieldLabel: 'Nombres',
                                    name: 'nomvend',
                                    reference: 'nomvend',
                                    allowBlank: false
                                },
                                {
                                    fieldLabel: 'Apellidos',
                                    name: 'apevend',
                                    allowBlank: false
                                },
                                {
                                    vtype: 'email',
                                    fieldLabel: 'Email',
                                    name: 'emailvend'
                                },
                                {
                                    fieldLabel: 'Celular',
                                    name: 'celvend'
                                },
                                {
                                    fieldLabel: 'Cargo',
                                    name : 'cargo'

                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: 'fit',
                            items: [{
                                xtype: 'gridpanel',
                                reference: 'dgvVendedor',
                                store: storeVE,
                                columns: [{
                                        text: 'Nombres y Apellidos',
                                        dataIndex: 'completo',
                                        flex: 1

                                    },
                                    {
                                        dataIndex: 'emailvend',
                                        text: 'Correo',
                                        flex: 0.5
                                    },
                                    {
                                        dataIndex: 'televend',
                                        text: 'Telefono',
                                        flex: 0.5
                                    },
                                    {
                                        dataIndex: 'celvend',
                                        text: 'Celular',
                                        flex: 0.5
                                    },
                                    {
                                        xtype: 'widgetcolumn',
                                        flex: 0.3,
                                        widget: {
                                            xtype: 'button',
                                            glyph: 0xf014,
                                            handler: 'onClickEliminarVendedor'

                                        }

                                    }

                                ],
                                listeners :{
                                    cellclick :'onSelectedVendedor'
                                },
                                dockedItems: [{
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [{
                                            xtype: 'button',
                                            text: 'Nuevo',
                                            handler:'onClickNuevoVendedor'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Guardar',
                                            handler:'onClickGuardarVendedor'
                                        }
                                    ]
                                }]
                            }]
                        }
                    ]
                },
                {   //@ Panel Presentacion
                    xtype: 'panel',
                    bodyPadding: 5,
                    title: 'Presentacion',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                            xtype: 'form',
                            url: sisfacturaelectronica.util.Rutas.presentacionGuardar,
                            reference: 'frmPresentacion',
                            flex: 1,
                            padding: 10,
                            layout: 'anchor',
                            defaults: {
                                xtype: 'textfield',
                                anchor: '100%'
                            },
                            items: [{
                                    xtype: 'hiddenfield',
                                    name: 'idpres',
                                    reference: 'idpres',
                                    value: 0
                                },
                                {
                                    fieldLabel: 'Descripcion',
                                    name: 'despres',
                                    reference: 'despres',
                                    allowBlank: false
                                },
                                {
                                    fieldLabel: 'Abreviatura',
                                    name: 'abrepres',
                                    reference: 'abrepres',
                                    allowBlank: true
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: 'fit',
                            items: [{
                                xtype: 'gridpanel',
                                reference: 'dgvPresentacion',
                                store: storePR,
                                columns: [
                                    {
                                        text: 'Descripcion',
                                        dataIndex: 'despres',
                                        flex: 1

                                    },
                                    {
                                        xtype: 'widgetcolumn',
                                        flex: 0.3,
                                        widget: {
                                            xtype: 'button',
                                            glyph: 0xf014,
                                            handler: 'onClickEliminarPresentacion'

                                        }

                                    }

                                ],
                                listeners :{
                                    cellclick :'onSelectedPresentacion'
                                },
                                dockedItems: [{
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [{
                                            xtype: 'button',
                                            text: 'Nuevo',
                                            handler:'onClickNuevaPresentacion'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Guardar',
                                            handler:'onClickGuardarPresentacion'
                                        }

                                    ]
                                }]
                            }]
                        }
                    ]
                },
                {   //@ Panel Categoria
                    xtype: 'panel',
                    bodyPadding: 5,
                    title: 'Categoria',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                            xtype: 'form',
                            url: sisfacturaelectronica.util.Rutas.categoriaGuardar,
                            reference: 'frmCategoria',
                            flex: 1,
                            padding: 10,
                            layout: 'anchor',
                            defaults: {
                                xtype: 'textfield',
                                anchor: '100%'
                            },
                            items: [{
                                    xtype: 'hiddenfield',
                                    name: 'idcate',
                                    reference: 'idcate',
                                    value: 0
                                },
                                {
                                    fieldLabel: 'Descripcion',
                                    name: 'descate',
                                    reference: 'descate',
                                    allowBlank: false
                                },
                                {
                                    fieldLabel: 'Abreviatura',
                                    name: 'abrecate',
                                    reference: 'abrecate'

                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: 'fit',
                            items: [{
                                xtype: 'gridpanel',
                                reference: 'dgvCategoria',
                                store: storeCA,
                                columns: [
                                    {
                                        text: 'Descripcion',
                                        dataIndex: 'descate',
                                        flex: 1

                                    },
                                    {
                                        xtype: 'widgetcolumn',
                                        flex: 0.3,
                                        widget: {
                                            xtype: 'button',
                                            glyph: 0xf014,
                                            handler: 'onClickEliminarCategoria'

                                        }

                                    }

                                ],
                                listeners :{
                                    cellclick :'onSelectedCategoria'
                                },
                                dockedItems: [{
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [{
                                            xtype: 'button',
                                            text: 'Nuevo',
                                            handler:'onClickNuevaCategoria'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Guardar',
                                            handler:'onClickGuardarCategoria'
                                        }
                                    ]
                                }]
                            }]
                        }
                    ]
                }


            ]


        }];
        return _obj;
    }

});
