Ext.define('sisfacturaelectronica.view.ventas.RegistroCotizacionFacturar', {
    extend: 'Ext.panel.Panel',
    xtype: 'wRegistroCotizacionFacturar',
    alias: 'widget.wRegistroCotizacionFacturar',
    requires: [
        'Ext.grid.plugin.*',
        'Ext.form.field.*',
        'sisfacturaelectronica.util.Rutas',
        'Ext.grid.plugin.RowEditing'
    ],
    bodyPadding: 5,
    controller: 'acciones-regcotizacionfacturar',
    initComponent: function () {
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        storeClientes = Ext.create('sisfacturaelectronica.store.Clientes');
        storeDetCotizacion = Ext.create('sisfacturaelectronica.store.DetalleCotizacion');
        storeFormaPago = Ext.create('sisfacturaelectronica.store.FormaPago');
        storeModoEntrega = Ext.create('sisfacturaelectronica.store.ModoEntrega');
        storeDocumentoVenta = Ext.create('sisfacturaelectronica.store.DocumentoVenta');
        storeMonedas = Ext.create('sisfacturaelectronica.store.Monedas');

        me = this;
        Ext.applyIf(me, {
            items: [{
                xtype: "form",
                itemId: 'frmRegCotizacionFacturar',
                reference: 'frmRegCotizacionFacturar',
                padding: 10,
                url: sisfacturaelectronica.util.Rutas.facturacionGuardar,
                items: [
                    {
                        xtype: 'panel',
                        flex: 1,
                        frame: false,
                        border: false,
                        items: [
                            {
                                xtype: 'hiddenfield',
                                itemId: 'txtJsonDetalleFacturacioncf',
                                name: 'vjsondetalle'
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'idfacturacion',
                                value: 0
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'idcoti',
                                itemId: 'idcoti',
                                value: 0
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'vusuario',
                                itemId: 'usuariocf',
                                value: ''
                            },
                            {
                                xtype: 'hiddenfield',
                                itemId: 'posicion',
                                value: 0
                            },
                            {
                                xtype: 'fieldset',
                                defaultType: 'textfield',
                                title: 'Datos Principales',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                defaults: {
                                    flex: 1
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        margin: '5 0 5 0',
                                        columnWidth: 0.5,
                                        items: [
                                            {
                                                xtype: 'combobox',
                                                itemId: 'cboDatosClienteFact',
                                                name: 'idper',
                                                emptyText: 'Nombre o Razón Social ',
                                                fieldStyle: 'font-size:35px;height:40px;text-transform:uppercase;',
                                                allowBlank: false,
                                                editable: true,
                                                forceSelection: true,
                                                store: storeClientes,
                                                queryMode: 'local',
                                                displayField: 'nombreper',
                                                valueField: 'idper',
                                                readOnly: true,
                                                flex: 1
                                            },
                                            {
                                                xtype: 'button',
                                                glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                                                handler: 'onClickMantenimiento'
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
                                            align: 'stretch'
                                        },
                                        paddingTop: 10,
                                        paddingBotton: 10,
                                        defaults: {
                                            labelWidth: 120,
                                            emptyText: '-- Seleccionar --'
                                        },
                                        items: [{
                                            xtype: 'combo',
                                            fieldLabel: 'Forma Pago',
                                            store: storeFormaPago,
                                            displayField: 'descripcion',
                                            valueField: 'idfopag',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            name: 'idfopag',
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
                                            name: 'idmodo',
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
                                            value: 1,
                                            flex: 1.5
                                        }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout: {
                                            type: 'hbox',
                                            anchor: 'stretch'
                                        },
                                        padding: '5 0 0 0',
                                        defaults: {
                                            labelWidth: 120
                                        },
                                        items: [
                                            {

                                                xtype: 'datefield',
                                                fieldLabel: 'Fecha Venta',
                                                value: new Date(),
                                                labelAlign: 'left',
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
                                                labelWidth: 158

                                            },
                                            {
                                                xtype: 'combo',
                                                fieldLabel: 'Asignar a Vendedor',
                                                //store: storeVendedores,
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
                                                xtype: 'checkboxfield',
                                                boxLabel: '<b style="color:#2d5f87">Precios Incluye I.g.v. </b>',
                                                padding: '3 0 0 20',
                                                labelAlign: 'right',
                                                name: 'incluyeigv',
                                                reference: 'incluyeigv',
                                                itemId: 'incluyeigvfacturacion',
                                                readOnly: false,
                                                value: true,
                                                listeners: {
                                                    change: {
                                                        fn: 'onSelectedIncluyeIGV'
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                boxLabel: '<b style="color:#2d5f87">Precios Mayorista </b>',
                                                padding: '3 0 0 20',
                                                labelAlign: 'right',
                                                name: 'preciomayorista',
                                                reference: 'preciomayorista',
                                                itemId: 'preciomayorista',
                                                readOnly: false,
                                                value: true,


                                            }

                                        ]


                                    },
                                    {
                                        xtype: 'container',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        padding: '2 0 5 0',
                                        defaults: {
                                            labelWidth: 120,
                                            flex: 1
                                        },
                                        items: [
                                            {
                                                xtype: 'combo',
                                                fieldLabel: 'Documento',
                                                store: storeDocumentoVenta,
                                                displayField: 'descripcion',
                                                valueField: 'id',
                                                queryMode: 'local',
                                                allowBlank: false,
                                                name: 'documentoventa',
                                                labelAlign: 'left',
                                                editable: false,
                                                itemId: 'documentoventa',
                                                emptyText: '-- Seleccionar --',
                                                flex: 2

                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Serie/Número',
                                                labelAlign: 'right',
                                                name: 'seriedoc',
                                                readOnly: true,
                                                emptyText: '**GENERANDO**'
                                            },
                                            {
                                                xtype: 'textfield',
                                                labelAlign: 'right',
                                                name: 'numerodoc',
                                                readOnly: true,
                                                emptyText: '**GENERANDO**'
                                            },
                                            {
                                                xtype: 'numberfield',
                                                fieldLabel: 'A Cuenta',
                                                name: 'pagoacuenta',
                                                value: 0,
                                                labelWidth: 75,
                                                labelAlign: 'right'
                                            }
                                        ]
                                    },


                                ]//items

                            },//fieldset



                            {
                                xtype: 'fieldset',
                                columnWidth: 0.1,
                                defaultType: 'textfield',
                                padding: 10,
                                items: [
                                  
                                    {
                                        xtype: 'panel',
                                        layout: 'fit',
                                        tbar: [
                                            /*  {
                                                  xtype: 'combo',
                                                  flex: 13,
                                                  itemId: 'cboProducto',
                                                 //   store: storeProductos,
                                                  listConfig: {
                                                      itemTpl: '<b>{nombre}</b>  ->   <strong> {marca} </strong> <br> '
                                                          +'<label style="background-color:#03AA92;color:#FFFFFF;width:200px;height:30px;padding:5px 5px 5px 5px;  "> Unidad Medida </label> '
                                                          +'&nbsp;&nbsp;{unidadmedida}<br> '
                                                          +'<label style="background-color:#6A4B5A;color:#FFFFFF;width:300px;height:30px;padding:5px 5px 5px 5px;  "> Precio &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label> '
                                                          +'&nbsp;&nbsp; Precio Mayorista :&nbsp;&nbsp; {precioventa} &nbsp  -  &nbsp;&nbsp;Precio Minorista : &nbsp;&nbsp; {precioventafraccion} <br> '
                                                          + '<label style="background-color:#03AA92;color:#FFFFFF;width:250px;height:30px;padding:5px 5px 5px 5px;  "> Stock &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label> '
                                                          + '&nbsp;&nbsp; Stock : &nbsp;&nbsp;{entero}  &nbsp;&nbsp;-  &nbsp;&nbsp; Fracción :&nbsp;&nbsp; {fraccion} '
                                                  },
                                                  typeAhead: true,
                                                  minChars: 4,
                                                  typeAheadDelay: 200,
                                                  queryDelay: 500,
                                                  queryCaching: false,
                                                  emptyText: ' DIGITAR NOMBRE DEL PRODUCTO',
                                                  valueField: 'id',
                                                  queryMode: 'remote',
                                                  fieldStyle: 'font-size:20px;',
                                                  listeners: {
                                                      beforequery: 'onBeforeQueryProducto',
                                                      select: 'onSelectProducto'
                                                  }
                                              },*/

                                            '->',
                                            {
                                                xtype: 'textfield',
                                                name: 'idcotitxt',
                                                value: '** Generando',
                                                readOnly: true,
                                                fieldStyle: 'font-size:25px;text-align:center;',
                                                fieldLabel: 'Nro. Cotización',
                                                labelWidth: 160,
                                                labelStyle: 'padding : 10px 5px 5px 5px ;background-color:#6A4B5A;border:false;color:#FFFFFF;font-size: 15px;'

                                            }
                                        ],
                                        bbar: [
                                            {
                                                xtype: 'textarea',
                                                flex: 2,
                                                height: 100,
                                                name: 'comentario',
                                                fieldStyle: 'font-size:12px;text-transform:uppercase;'

                                            },
                                            '|',
                                            {
                                                text: 'Cancelar',
                                                scale: 'large',
                                                handler: 'onClickSalirCotizacionFacturar'
                                            },
                                            {
                                                text: 'Guardar',
                                                scale: 'large',
                                                handler: 'onClickGuardarCotizacionFacturar'
                                            },
                                            '->',
                                            {
                                                xtype: 'container',
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'stretch'
                                                },
                                                defaults: {
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
                                                        reference: 'Subtotalventasfacturacion',
                                                        itemId: 'Subtotalventasfacturacion',
                                                        name: 'valventacont',
                                                        fieldLabel: 'Sub Total',


                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'I.g.v.',
                                                        reference: 'igvventasfacturacion',
                                                        itemId: 'igvventasfacturacion',
                                                        name: 'valigvcont',

                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Total General',
                                                        reference: 'TotalGeneralfacturacion',
                                                        itemId: 'TotalGeneralfacturacion',
                                                        name: 'valtotalcont',

                                                    }
                                                ]
                                            }
                                        ],
                                        items: [
                                            {
                                                xtype: 'grid',
                                                flex: 1,
                                                reference: 'dgvDetalleVentaFacturar',
                                                itemId: 'dgvDetalleVentaFacturar',
                                                store: storeDetCotizacion,
                                                plugins: [rowEditing],
                                                selModel: 'cellmodel',
                                                plugins: {
                                                    ptype: 'cellediting',
                                                    clicksToEdit: 1
                                                },
                                                columns: [{
                                                    text: 'Descripción',
                                                    dataIndex: 'descripcion',
                                                    flex: 3
                                                },
                                                {
                                                    text: 'Unidad Medida',
                                                    dataIndex: 'presentacion',
                                                    flex: 1,
                                                    align: 'center',
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

                                                    xtype: 'numbercolumn',
                                                    text: 'Precio',
                                                    dataIndex: 'precio',
                                                    flex: 0.6,
                                                    align: 'right',
                                                    editor: {
                                                        xtype: 'numberfield',
                                                        format: '0.00000',
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
                                                    },
                                                    hidden: true
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
                                                    edit: 'onEditorCalcularTotalRegistroCotizacionFacturar'
                                                }

                                            }]

                                    }
                                ]

                            }, // fin fieldset Detalle
                        ]
                    }
                ]
            }


            ]
        });

        me.callParent(arguments);

    }
});
