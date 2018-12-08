Ext.define('sisfacturaelectronica.view.conf.Maestros', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.wRegMaestros',
    xtype: 'wRegMaestros',
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
        'sisfacturaelectronica.view.conf.AccionesRegConfig',

    ],
    bodyPadding: 0,
    layout: {
        type: 'fit',
        align: 'stretch',
        pack: 'start'
    },
    controller: 'acciones-config',
    initComponent: function () {
        me = this;
        Ext.apply(me, {
            items: me.getItems()
        });
        me.callParent();
    },
    getPanelEstados: function (storeEstado) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Estado Generales',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvEstados',
                    store: storeEstado,
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    }],
                    listeners: {
                        select: 'onSelectedEstado'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmEstados',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.estadoGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    reference: 'idestado',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionEstado',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        handler: 'onClickNuevoEstado'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        handler: 'onClickGuardarEstado'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelEstadosInventario: function (storeEstado) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Estados Inventario',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvEstados',
                    store: storeEstado,
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    }],
                    listeners: {
                        select: 'onSelectedEstado'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmEstados',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.estadoGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    reference: 'idestado',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionEstado',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        handler: 'onClickNuevoEstado'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        handler: 'onClickGuardarEstado'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelEstadosCompras: function (storeEstado) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Estados Compras',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvEstados',
                    store: storeEstado,
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    }],
                    listeners: {
                        select: 'onSelectedEstado'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmEstados',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.estadoGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    reference: 'idestado',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionEstado',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        handler: 'onClickNuevoEstado'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        handler: 'onClickGuardarEstado'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelEstadosVentas: function (storeEstado) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Estados Ventas',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvEstados',
                    store: storeEstado,
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    }],
                    listeners: {
                        select: 'onSelectedEstado'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmEstados',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.estadoGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    reference: 'idestado',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionEstado',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        handler: 'onClickNuevoEstado'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        handler: 'onClickGuardarEstado'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelBancos: function (storeBanco) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Bancos',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvBancos',
                    store: storeBanco,
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    },
                    {
                        xtype: 'widgetcolumn',
                        flex: 0.5,
                        widget: {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            handler: 'onClickEliminarBanco'

                        }
                    }
                    ],
                    listeners: {
                        select: 'onSelectedBanco'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmBancos',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.bancoGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    reference: 'idbanco',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionBanco',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        handler: 'onClickNuevoBanco'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        handler: 'onClickGuardarBanco'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelCategorias: function (storeCategoria) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Categoria',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvCategoria',
                    store: storeCategoria,
                    tbar: [
                        '->',
                        {
                            text: 'Refrescar',
                            handler: 'onClickCateRefrescar'
                        }
                    ],
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    },
                    {
                        xtype: 'widgetcolumn',
                        flex: 0.5,
                        widget: {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            handler: 'onClickEliminarCategoria'

                        }
                    }

                    ],
                    listeners: {
                        select: 'onSelectedCategoria'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmCategoria',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.categoriaGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    reference: 'idCategoria',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionCategoria',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        handler: 'onClickNuevoCategoria'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        handler: 'onClickGuardarCategoria'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelColores: function (storeColores) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Colores',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvColores',
                    store: storeColores,
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    },
                    {
                        xtype: 'widgetcolumn',
                        flex: 0.5,
                        widget: {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            handler: 'onClickEliminarColor'

                        }
                    }
                    ],
                    listeners: {
                        select: 'onSelectedColor'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmColores',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.colorGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    reference: 'idColor',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionColor',
                    allowBlank: false
                },
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        handler: 'onClickNuevoColor'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        handler: 'onClickGuardarColor'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelMedidas: function (storeMedidas) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Medidas',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvMedidas',
                    store: storeMedidas,
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    },
                    {
                        xtype: 'widgetcolumn',
                        flex: 0.5,
                        widget:
                        {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            handler: 'onClickEliminarMedida'
                        }
                    }
                    ],
                    listeners: {
                        select: 'onSelecteMedida'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmMedidas',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.medidaGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    reference: 'idMedidas',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionMedidas',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        handler: 'onClickNuevoMedida'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        handler: 'onClickGuardarMedida'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelUnidadMedida: function (storeUnidadMedidas) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Unidad Medida',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvUnidadMedida',
                    store: storeUnidadMedidas,
                    tbar: [
                        '->',
                        {
                            text: 'Refrescar',
                            handler: 'onClickUMrefrescar'
                        }
                    ],
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    },
                    {
                        xtype: 'widgetcolumn',
                        flex: 0.5,
                        widget:
                        {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            handler: 'onClickEliminarUnidadMedida'
                        }
                    }
                    ],
                    listeners: {
                        select: 'onSelectedUnidadMedida'
                    }

                },
                ]
            },
            {
                xtype: 'form',
                reference: 'frmUnidadMedida',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.unidadMedidaGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionUnidadMedida',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        disabled: true,
                        handler: 'onClickNuevoUnidadMedida'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        disabled: true,
                        handler: 'onClickGuardarUnidadMedida'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelTipoDeProducto: function (storeTipoProductos) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Categoría',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvTipoProducto',
                    store: storeTipoProductos,
                    tbar: [
                        '->',
                        {
                            text: 'Refrescar',
                            handler: 'onClickTipoProdRefrescar'
                        }
                    ],
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    },
                    {
                        xtype: 'widgetcolumn',
                        flex: 0.5,
                        widget:
                        {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            handler: 'onClickEliminarTipoProducto'
                        }
                    }
                    ],
                    listeners: {
                        select: 'onSelectedTipoProducto'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmTipoProducto',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.tipoProductoGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    reference: 'idTipoProducto',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionTipoProducto',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        handler: 'onClickNuevoTipoProducto'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        handler: 'onClickGuardarTipoProducto'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelTarifas: function (storeTarifas) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Tarifas',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvTarifas',
                    store: storeTarifas,
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    },
                    {
                        xtype: 'widgetcolumn',
                        flex: 0.5,
                        widget:
                        {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            handler: 'onClickEliminarTarifa'
                        }
                    }
                    ],
                    listeners: {
                        select: 'onSelectedTarifa'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmTarifas',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.TarifaGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    reference: 'idTarifa',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionTarifa',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        handler: 'onClickNuevoTarifa'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        handler: 'onClickGuardarTarifa'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelPresentacionProducto: function (storePresentacion) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Presentación',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvPresentacion',
                    store: storePresentacion,
                    tbar: [
                        '->',
                        {
                            text: 'Refrescar',
                            handler: 'onClickPreseRefrescar'
                        }
                    ],
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'despres',
                        flex: 1
                    },
                    {
                        xtype: 'widgetcolumn',
                        flex: 0.5,
                        widget:
                        {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            handler: 'onClickEliminarPresentacion'
                        }
                    }
                    ],
                    listeners: {
                        select: 'onSelectedPresentacion'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmPresentacion',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.presentacionGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'idpres',
                    reference: 'idTipoProducto',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'despres',
                    itemId: 'txtDescripcionPresentacion',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        handler: 'onClickNuevoPresentacion'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        handler: 'onClickGuardarPresentacion'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelTipoDocumentoPersona: function (storeTipoDocumentoPersona) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Tipo Documento',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvTipoDocPersona',
                    //store: storeTipoProductos,
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    },
                    {
                        xtype: 'widgetcolumn',
                        flex: 0.5,
                        widget:
                        {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            //  handler: 'onClickEliminarTipoProducto'
                        }
                    }
                    ],
                    listeners: {
                        //select : 'onSelectedTipoProducto'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmTipoDocPersona',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                //  url: sisfacturaelectronica.util.Rutas.tipoProductoGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    reference: 'idTipoProducto',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionTipoProducto',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        //  handler: 'onClickNuevoTipoProducto'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        // handler: 'onClickGuardarTipoProducto'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelFormaPago: function (storeFormaPago) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Forma Pago',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvFormaPago',
                    store: storeFormaPago,
                    tbar: [
                        '->',
                        {
                            text: 'Refrescar',
                            handler: 'onClickFormaPagRefrescar'
                        }
                    ],
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    },
                    {
                        xtype: 'widgetcolumn',
                        flex: 0.5,
                        widget:
                        {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            handler: 'onClickEliminarFormaPago'
                        }
                    }
                    ],
                    listeners: {
                        select: 'onSelectedFormaPago'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmFormaPago',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.formaPagoGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'idfopag',
                    reference: 'idFormaPago',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionFormaPago',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        handler: 'onClickNuevoFormaPago'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        handler: 'onClickGuardarFormaPago'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelModoDeEntrega: function (storeModoEntrega) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Modo Entrega',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvModoEntrega',
                    store: storeModoEntrega,
                    tbar: [
                        '->',
                        {
                            text: 'Refrescar',
                            handler: 'onClickModoEnRefrescar'
                        }
                    ],
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    },
                    {
                        xtype: 'widgetcolumn',
                        flex: 0.5,
                        widget:
                        {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            handler: 'onClickEliminarModoEntrega'
                        }
                    }
                    ],
                    listeners: {
                        select: 'onSelectedModoEntrega'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmModoEntrega',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.modoEntregaGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    reference: 'idTipoProducto',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionModoEntrega',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        handler: 'onClickNuevoModoEntrega'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        handler: 'onClickGuardarModoEntrega'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelMarca: function (storeMarca) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Marcas',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvMarca',
                    store: storeMarca,
                    tbar: [
                        '->',
                        {
                            text: 'Refrescar',
                            handler: 'onClickMarcaRefrescar'
                        }
                    ],
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    },
                    {
                        xtype: 'widgetcolumn',
                        flex: 0.5,
                        widget:
                        {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            handler: 'onClickEliminarMarca'
                        }
                    }
                    ],
                    listeners: {
                        select: 'onSelectedMarca'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmMarca',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.marcaGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    reference: 'idMarca',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionMarca',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        handler: 'onClickNuevoMarca'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        handler: 'onClickGuardarMarca'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelModelo: function (storeModelo) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Modelos',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvModelo',
                    store: storeModelo,
                    tbar: [
                        '->',
                        {
                            text: 'Refrescar',
                            handler: 'onClickModeloRefrescar'
                        }
                    ],
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    },
                    {
                        xtype: 'widgetcolumn',
                        flex: 0.5,
                        widget:
                        {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            handler: 'onClickEliminarModelo'
                        }
                    }
                    ],
                    listeners: {
                        select: 'onSelectedModelo'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmModelo',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.modeloGuardar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    reference: 'idModelo',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionModelo',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        handler: 'onClickNuevoModelo'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        handler: 'onClickGuardarModelo'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getPanelForma: function (storeModelo) {
        obj = {
            xtype: 'panel',
            hidden: false,
            title: 'Formas',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [{
                    xtype: 'gridpanel',
                    reference: 'dgvForma',
                    store: storeModelo,
                    tbar: [
                        '->',
                        {
                            text: 'Refrescar',
                            handler: 'onClickFormaRefrescar'
                        }
                    ],
                    columns: [{
                        text: 'Descripcion',
                        dataIndex: 'descripcion',
                        flex: 1
                    },
                    {
                        xtype: 'widgetcolumn',
                        flex: 0.5,
                        widget:
                        {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            handler: 'onClickEliminarForma'
                        }
                    }
                    ],
                    listeners: {
                        select: 'onSelectedForma'
                    }

                }]
            },
            {
                xtype: 'form',
                reference: 'frmForma',
                flex: 1,
                bodyPadding: 10,
                layout: 'anchor',
                url: sisfacturaelectronica.util.Rutas.formaFarmaceuticaActualizar,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    reference: 'idforma',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Descripcion',
                    name: 'descripcion',
                    itemId: 'txtDescripcionForma',
                    allowBlank: false
                }
                ],
                tbar: [
                    {
                        xtype: 'button',
                        text: 'Nuevo',

                        handler: 'onClickNuevaForma'
                    },
                    {
                        xtype: 'button',
                        text: 'Guardar',

                        handler: 'onClickGuardarForma'
                    }
                ]

            }

            ]

        };
        return obj;
    },
    getItems: function () {
        storeEstado = Ext.create('sisfacturaelectronica.store.Estados');
        //storeBancos = Ext.create('sisfacturaelectronica.store.Bancos');
        //storeCategoria = Ext.create('sisfacturaelectronica.store.Categoria');
        //storeColores = Ext.create('sisfacturaelectronica.store.Colores');
        //storeMedidas = Ext.create('sisfacturaelectronica.store.Medidas');
        storeTipoProductos = Ext.create('sisfacturaelectronica.store.TipoDeProductos');
        storeUnidadMedidas = Ext.create('sisfacturaelectronica.store.UnidadDeMedidas');
        //storeTarifas = Ext.create('sisfacturaelectronica.store.Tarifas');

        storePresentacion = Ext.create('sisfacturaelectronica.store.Presentacion');
        storeFormaPago = Ext.create('sisfacturaelectronica.store.FormaPago');
        storeModoEntrega = Ext.create('sisfacturaelectronica.store.ModoEntrega');

        storeModelos = Ext.create('sisfacturaelectronica.store.Modelos');
        storeMarcas = Ext.create('sisfacturaelectronica.store.Marcas');
        stformas = Ext.create('sisfacturaelectronica.store.FormaFarmaceutica');

        me = this;
        _obj = [{
            xtype: 'tabpanel',
            activeTab: 0,
            tabPosition: 'left',
            tabRotation: 0,
            ui: 'navigation',
            tabBar: {
                border: false
            },
            autoScroll: true,
            items: [
                //me.getPanelEstados(storeEstado),
                //me.getPanelEstadosVentas(storeEstado),
                //me.getPanelEstadosCompras(storeEstado),
                //me.getPanelEstadosInventario(storeEstado),
                // me.getPanelBancos(storeBancos),
                //  me.getPanelCategorias(storeCategoria),
                //me.getPanelColores(storeColores),
                //  me.getPanelMedidas(storeMedidas),
                me.getPanelUnidadMedida(storeUnidadMedidas),
                me.getPanelTipoDeProducto(storeTipoProductos),
                // me.getPanelTarifas(storeTarifas)
                me.getPanelPresentacionProducto(storePresentacion),
                //me.getPanelTipoDocumentoPersona(),
                me.getPanelFormaPago(storeFormaPago),
                me.getPanelModoDeEntrega(storeModoEntrega),
                me.getPanelMarca(storeMarcas),
                me.getPanelModelo(storeModelos),
                me.getPanelForma(stformas)

            ]

        }];
        return _obj;
    }

});
