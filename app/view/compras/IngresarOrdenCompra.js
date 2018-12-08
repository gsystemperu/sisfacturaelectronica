Ext.define('sisfacturaelectronica.view.compras.IngresarOrdenCompra', {
    extend: 'Ext.panel.Panel',
    xtype: 'wingresarordencompra',
    requires: [
        'Ext.grid.plugin.*',
        'sisfacturaelectronica.view.compras.AccionesOrdenCompra',
        'sisfacturaelectronica.util.Rutas'
    ],
    itemId: 'wingresarordencompra',
    padding: 10,
    controller: 'acciones-ordencompra',
    initComponent: function () {
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        storeProductos = Ext.create('sisfacturaelectronica.store.ProductosOrdenCompra'); 
        storeProveedores = Ext.create('sisfacturaelectronica.store.Proveedores');
        storeDetalle = Ext.create('sisfacturaelectronica.store.DetalleOrdenCompra');
        storeMonedas = Ext.create('sisfacturaelectronica.store.Monedas');
        sfpag = Ext.create('sisfacturaelectronica.store.FormaPago');
        sAlam = Ext.create('sisfacturaelectronica.store.Almacenes');
        stdoc = Ext.create('sisfacturaelectronica.store.DocumentoVenta');
        me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: "form",
                    itemId: 'frmOrdenCompra',
                    reference: 'frmOrdenCompra',
                    url: sisfacturaelectronica.util.Rutas.ordenCompraGuardar,
                    items: [{
                        xtype: 'panel',
                        flex: 1,
                        frame: false,
                        border: false,
                        items: [{
                            xtype: 'hiddenfield',
                            itemId: 'txtJsonDetalleOC',
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
                            name: 'indice',
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
                            items: [
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
                                            emptyText: 'Razón Social : Proveedor S.A.',
                                            fieldStyle: 'font-size:20px;height:35px;',
                                            itemId: 'cboProveedoresf',
                                            store: storeProveedores,
                                            valueField: 'id',
                                            displayField: 'razonsocial',
                                            queryMode: 'local',
                                            flex: 2.5,
                                            editable: true,
                                            name: 'vidproveedor',
                                            padding: '0 2 0 0'

                                        },
                                        {
                                            xtype: 'button',
                                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                                            handler: 'onClickFormularioProveedor',
                                            control: 'cboProveedoresf',
                                            height: 35
                                        },
                                        {
                                            xtype: 'button',
                                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('refrescar'),
                                            handler: 'onClickRefrescarProveedor',
                                            height: 35

                                        },

                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Fecha Pedido',
                                            value: new Date(),
                                            labelAlign: 'right',
                                            flex: 1,
                                            name: 'vfecha',
                                            format: 'd/m/Y'

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
                                        },


                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    margin: '0 0 5 6',
                                    columnWidth: 0.5,
                                    defaults: {
                                        allowBlank: false,
                                        fieldStyle: 'text-align:center;;font-size:15px'
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
                                            name: 'idmoneda',
                                            flex: 1.5
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
                                            flex: 1.5

                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Serie/Número',
                                            labelAlign: 'right',
                                            name: 'serie',
                                            value: '001',
                                            flex: 1,
                                            allowBlank: false,
                                        },
                                        {
                                            xtype: 'textfield',
                                            labelAlign: 'right',
                                            name: 'numerodoc',
                                            flex: 1,
                                            allowBlank: false,
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
                                            boxLabel: '<b >Precios Incluye I.g.v. </b>',
                                            name: 'flagestadoigv',
                                            value: true,
                                            listeners: {
                                                change: 'onChangeInIgv'
                                            },
                                            padding : '0 10px 0 0'

                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            boxLabel: '<b style="color:#2d5f87">Es Orden Interna </b>',
                                            name: 'ordenInterna'
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
                                            allowBlank: false,
                                            labelWidth: 150
                                        }
                                    ]
                                },


                            ]
                        },
                        {
                            xtype: 'fieldset',
                            columnWidth: 0.1,
                            padding: 10,
                            defaultType: 'textfield',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'fit',
                                    tbar: [
                                        {
                                            xtype: 'combo',
                                            flex: 13,
                                            itemId: 'cboProducto',
                                            store: storeProductos,
                                            listConfig: {
                                                itemTpl: '<b>{nombre}</b>  ->   <strong> {marca} </strong> <br> '
                                                    //+'<label style="background-color:#6A4B5A;color:#FFFFFF;width:200px;height:30px;padding:5px 5px 5px 5px;  "> Precio </label> '
                                                    //+'&nbsp;&nbsp; Precio Mayorista :&nbsp;&nbsp; {precioventa} &nbsp  -  &nbsp;&nbsp;Precio Minorista : &nbsp;&nbsp; {preciounidad} <br> '
                                                    + '<label style="background-color:#03AA92;color:#FFFFFF;width:250px;height:30px;padding:5px 5px 5px 5px;  "> Stock &nbsp; </label> '
                                                    + '&nbsp;&nbsp; Stock : &nbsp;&nbsp;{entero}  &nbsp;&nbsp;-  &nbsp;&nbsp; Fracción :&nbsp;&nbsp; {fraccion} '
                                            },
                                            typeAhead: true,
                                            minChars: 4,
                                            typeAheadDelay: 150,
                                            queryDelay: 100,
                                            queryCaching: false,
                                            emptyText: ' DIGITAR NOMBRE DEL PRODUCTO',
                                            valueField: 'id',
                                            queryMode: 'remote',
                                            fieldStyle: 'font-size:20px;',
                                            listeners: {
                                                beforequery: 'onBeforeQueryProducto',
                                                select: 'onSelectProducto'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                                            handler: 'onClickNuevoProd',
                                            height: 33
                                        },

                                        '->',
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtNumeroPedido',
                                            value: '** Generando',
                                            readOnly: true,
                                            fieldStyle: 'font-size:25px;text-align:center;',
                                            fieldLabel: 'Nro. Orden de Compra',
                                            labelWidth: 160,
                                            labelStyle: 'padding : 10px 5px 5px 5px ;background-color:#6A4B5A;border:false;color:#FFFFFF;font-size: 15px;'

                                        }
                                    ],
                                    items: [
                                        {
                                            xtype: 'grid',
                                            flex: 1,
                                            itemId: 'dgvDetalleOrdenCompra',
                                            reference: 'dgvDetalleOrdenCompra',
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
                                                    //maxValue: 1000,
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
                                                xtype: 'numbercolumn',
                                                text: 'Precio Venta',
                                                dataIndex: 'precioventa',
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
                                            height: 250,
                                            listeners: {
                                                edit: 'onEditorCalcularTotalOrdenCompra'
                                            }

                                        }],
                                    bbar: [
                                        '->',
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            defaults:{
                                                fieldStyle: 'text-align: right;font-size:20px;',
                                                labelStyle: 'padding : 10px 5px 5px 5px ;background-color:#6A4B5A;border:false;color:#FFFFFF;font-size: 15px;',
                                                labelAlign: 'left',
                                                value: "0.00",
                                                minValue: 0,
                                                step: 0.01,
                                                readOnly: true,
                                                width: 280,
                                                labelWidth: 120,
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtSubtotalOrdenCompra',
                                                    name: 'subtotal',
                                                    fieldLabel: 'Sub Total',
                                                   
                                                    
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'I.g.v.',
                                                    itemId: 'txtIgvOrdenCompra',
                                                    name: 'igv',
                                                   
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Total General',
                                                    itemId: 'txtTotalGeneralOrdenCompra',
                                                   
                                                }
                                            ]
                                        }
                                    ]

                                }
                            ]

                        }, // fin fieldset Detalle
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
