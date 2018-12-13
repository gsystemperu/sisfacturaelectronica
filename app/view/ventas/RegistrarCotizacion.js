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
        storeProductos = Ext.create('sisfacturaelectronica.store.ProductosFiltroPrecioPersona');   //('sisfacturaelectronica.store.Productos');
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
                        xtype: 'fieldset',
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
                                        itemId: 'cboDatosCliente',
                                        name: 'idper',
                                        emptyText: 'Nombre o Razón Social ',
                                        fieldStyle: 'font-size:35px;height:40px;text-transform:uppercase;',
                                        allowBlank: false,
                                        editable: true,
                                        store: storeClientes,
                                        queryMode: 'local',
                                        displayField: 'nombreper',
                                        valueField: 'idper',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'button',
                                        glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                                        handler: 'onClickNuevoCliente',
                                        height: 35
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Referencia',
                                        labelAlign: 'right',
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
                                    anchor: 'stretch'
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
                                    anchor: 'stretch'
                                },
                                padding: '5 0 0 0',
                                defaults: {
                                    labelWidth: 120,
                                    flex: 1.5
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
                                        labelWidth: 128,
                                        flex: 2
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
                                        handler: 'onClickMantenimiento',
                                        flex: 0
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        boxLabel: '<b style="color:#2d5f87">Precios Incluye I.g.v. </b>',
                                        
                                        padding: '3 0 0 20',
                                        labelAlign: 'right',
                                        name: 'incluyeigv',
                                        reference: 'incluyeigv',
                                        itemId: 'incluyeigv',
                                        readOnly: false,
                                        flex: 1,
                                        value : true,
                                        listeners: {
                                            change: {
                                                fn: 'onSelectedIncluyeIGV'
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        boxLabel: '<b style="color:#2d5f87">Precios Solo Mayorista </b>',
                                        padding: '3 0 0 20',
                                        labelAlign: 'right',
                                        name: 'preciomayorista',
                                        reference: 'preciomayorista',
                                        itemId: 'preciomayorista',
                                        readOnly: false,
                                        value : true,
                                        flex: 1
                                       
                                    }

                                ]


                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox',
                                    anchor: 'stretch'
                                },
                                defaults: {
                                    labelWidth: 120,
                                    padding: '4 0 4 0'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Lugar de entrega',
                                        name: 'lugarentrega',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Creditos y cobranzas',
                                        labelAlign: 'right',
                                        name: 'creditoscobranzas',
                                        flex: 1,
                                        labelWidth: 150
                                    }
                                ]
                            }
                        ]
                    },
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
                                    {
                                        xtype: 'combo',
                                        flex: 13,
                                        itemId: 'cboProducto',
                                          store: storeProductos,
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
                                        name: 'ctcodigo',
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
                                        fieldStyle: 'font-size:12px;text-transform:uppercase;',
                                        toolTip: 'Ingresar un comentario a la cotización, se mostrara en el reporte.'
                                        //emptyText : 'Comentario Cotizacion :'
                                    },
                                    '|',
                                    {
                                        text: 'Cancelar',
                                        scale: 'large',
                                        handler: 'onClickSalirCotizacion'
                                    },
                                    {
                                        text: 'Guardar',
                                        scale: 'large',
                                        handler: 'onClickGuardarCotizacion'
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
                                                reference: 'Subtotalventas',
                                                itemId: 'Subtotalventas',
                                                name: 'valventacont',
                                                fieldLabel: 'Sub Total',


                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'I.g.v.',
                                                reference: 'igvventas',
                                                itemId: 'igvventas',
                                                name: 'valigvcont'

                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Total General',
                                                reference: 'TotalGeneral',
                                                itemId: 'TotalGeneral',
                                                name: 'valtotalcont',

                                            }
                                        ]
                                    }
                                ],

                                items: [
                                    {
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
                                        columns: [
                                            {
                                                text: 'Descripción',
                                                dataIndex: 'descripcion',
                                                flex: 3.5
                                            },
                                            {
                                                text: 'Unidad Medida',
                                                dataIndex: 'presentacion',
                                                flex: 1
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
                                                },
                                                hidden:true
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

                                    }
                                ]
                            }]

                    }, // fin fieldset Detalle
                        /*{
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
    
                        },*/
                        /*  {
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
      
      
                          }*/
                    ]

                }

                ]
            }


            ]
        });

        me.callParent(arguments);
    }
});
