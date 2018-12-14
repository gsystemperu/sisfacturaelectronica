Ext.define('sisfacturaelectronica.view.ventas.VisualizarCotizacionFacturar', {
    extend: 'Ext.panel.Panel',
    xtype :'wVisualizarCotizacionFacturar',
    alias: 'widget.wVisualizarCotizacionFacturar',
    requires: [
        'Ext.grid.plugin.*',
        'Ext.form.field.*',
        'sisfacturaelectronica.util.Rutas',
          'Ext.grid.plugin.RowEditing'
    ],
    bodyPadding: 5,
    controller: 'acciones-regcotizacionfacturar',
    initComponent: function () {
        rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        storeClientes       = Ext.create('sisfacturaelectronica.store.Clientes');
        storeDetCotizacion  = Ext.create('sisfacturaelectronica.store.DetalleCotizacion');
        storeFormaPago      = Ext.create('sisfacturaelectronica.store.FormaPago');
        storeModoEntrega    = Ext.create('sisfacturaelectronica.store.ModoEntrega');
        storeDocumentoVenta = Ext.create('sisfacturaelectronica.store.DocumentoVenta');
        storeMonedas        = Ext.create('sisfacturaelectronica.store.Monedas');
        me = this;
        Ext.applyIf(me, {
            items: [{
                    xtype: "form",
                    itemId: 'frmVisualizarCotizacionFacturar',
                    reference: 'frmVisualizarCotizacionFacturar',
                    padding : 10,
                    url: sisfacturaelectronica.util.Rutas.facturacionGuardar,
                    items: [{
                            xtype: 'panel',
                            flex: 1,
                            frame: false,
                            border: false,
                            items: [{
                                    xtype: 'hiddenfield',
                                    itemId: 'txtJsonDetalleFacturacion',
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
                                    itemId : 'idcoti',
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
                                            items: [{
                                                    xtype: 'combobox',
                                                    itemId: 'cboDatosClienteFact',
                                                    name : 'idper',
                                                    emptyText: 'Nombre o Razón Social ',
                                                    fieldStyle: 'font-size:35px;height:40px;text-transform:uppercase;',
                                                    flex: 1,
                                                    allowBlank: false,
                                                    editable: true,
                                                    forceSelection : true,
                                                    store: storeClientes,
                                                    queryMode: 'local',
                                                    displayField: 'nombreper',
                                                    valueField :'idper',
                                                    readOnly:true
                                                    
                                                },
                                               
                                                {

                                                    xtype: 'textfield',
                                                    fieldLabel: 'Referencia',
                                                    labelAlign: 'right',
                                                    flex: 1,
                                                    itemId: 'txtReferencia',
                                                    name   : 'vreferencia',
                                                    hidden : true

                                                }


                                            ]
                                        },//fin panel
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
                                            items: [
                                                {
                                                    xtype: 'combo',
                                                    fieldLabel: 'Forma Pago',
                                                    store: storeFormaPago,
                                                    displayField: 'descripcion',
                                                    valueField: 'idfopag',
                                                    queryMode: 'local',
                                                    allowBlank: false,
                                                    name: 'idfopag',
                                                    editable:false,
                                                    itemId:'idfopag',
                                                    flex: 1
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
                                                    editable:false,
                                                    itemId:'vmodoentrega',
                                                    flex : 1,
                                                    labelAlign: 'right'
                                                    
                                                },
                                                {
                                                    xtype: 'combo',
                                                    fieldLabel: 'Moneda',
                                                    store: storeMonedas,
                                                    displayField: 'descripcion',
                                                    valueField: 'id',
                                                    queryMode: 'local',
                                                    labelAlign: 'right',
                                                    allowBlank: false,
                                                    name: 'idmoneda',
                                                    editable:false,
                                                    itemId:'idmoneda',
                                                    value : 1,
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
                                                    itemId: 'dtFechaVenta',
                                                    name: 'fechacoti',
                                                    allowBlank:false
                                                },
                                                {
                                                  xtype:'datefield',
                                                  fieldLabel :'Válido Hasta',
                                                  labelAlign :'right',
                                                  name : 'fechavalidohasta',
                                                  value : new Date(),
                                                  name :'validohasta',
                                                  labelWidth: 158
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    boxLabel: '<b style="color:#2d5f87">Precios Incluye I.g.v. </b>',
                                                    hidden : false,
                                                    padding: '3 0 0 20',
                                                    name: 'incluyeigv',
                                                    reference: 'incluyeigv',
                                                    itemId: 'incluyeigvfacturacion',
                                                    readOnly:false
                                                    
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
                                                    editable:false,
                                                    itemId:'documentoventa',
                                                    flex:2
                                                },
                                                {
                                                  xtype:'textfield',
                                                  fieldLabel :'Serie/Número',
                                                  labelAlign :'right',
                                                  name : 'seriedoc',
                                                  allowBlank:false,
                                                  padding : '0 5 0 0'
                                                },
                                                {
                                                  xtype:'textfield',
                                                  labelAlign :'right',
                                                  name : 'numerodoc',
                                                  allowBlank:false
                                                },
                                                {
                                                    xtype:'numberfield',
                                                    fieldLabel :'A Cuenta',
                                                    name : 'pagoacuenta',
                                                    value : 0,
                                                    labelWidth: 75,
                                                    labelAlign: 'right'
                                                }
                                            ]
                                        },
        
                                    ]
                                },//fin fieldset
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
                                               '->',
                                               {
                                                xtype: 'textfield',
                                                name: 'idcotitxt',
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
                                                flex: 2.5,
                                                height: 100,
                                                name: 'comentario',
                                                fieldStyle: 'font-size:12px;text-transform:uppercase;',
                                                emptyText: 'Comentario facturación :'
                            
                                            },
                                            '|',
                                            {
                                                text: 'Cancelar',
                                                scale: 'large',
                                                handler: 'onClickSalirCotizacionFacturar'
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
                                                        reference: 'SubtotalventasfacturacionVi',
                                                        itemId: 'SubtotalventasfacturacionVi',
                                                        name: 'valventacont',
                                                        fieldLabel: 'Sub Total',


                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'I.g.v.',
                                                        reference: 'igvventasfacturacionVi',
                                                        itemId: 'igvventasfacturacionVi',
                                                        name: 'valigvcont',

                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Total General',
                                                        reference: 'TotalGeneralfacturacionVi',
                                                        itemId: 'TotalGeneralfacturacionVi',
                                                        name: 'valtotalcont',

                                                    }
                                                ]
                                            }
                                           ],    
                                            /* items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    padding: '0 0 5 0',
                                                    items: [
                                                      {
                                                              xtype: 'label',
                                                              text: 'Buscar Producto',
                                                              width: 120,
                                                              height: 23,
                                                              hidden:true,
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
                                                            tooltip : 'Accion para buscar los productos ingresados',
                                                            hidden:true
                                                            //flex: 1
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                                                            handler: 'onClickNuevoProductoPorCotizacion',
                                                            tooltip : 'Accion para agregar un nuevo producto',
                                                            hidden:true
                                                            //flex: 0.5
                                                        },
                                                       /* {
                                                          xtype:'container',
                                                          layout:'hbox',
                                                          items:[
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
                                                              xtype:'textfield',
                                                              flex : 1,
                                                              readOnly : true,
                                                              fieldStyle: 'text-align: center;font-size:15px;font-weight:bold; ',
                                                              name : 'idcotitxt'
                                                            },
                                                            
                                                          ]

                                                        }

                                                    ]
                                                }


                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'fit',
                                            margin: '0 0 5 0',*/
                                            items: [{
                                                xtype: 'grid',
                                                flex: 1,
                                                reference: 'dgvDetalleVentaFacturarVisualizar',
                                                itemId: 'dgvDetalleVentaFacturarVisualizar',
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
                                                        flex: 2.5
                                                    },
                                                    {
                                                        text: 'Presentacion',
                                                        dataIndex: 'presentacion',
                                                        flex: 0.5,
                                                        align: 'center',
                                                    },
                                                    {
                                                        xtype:'numbercolumn',
                                                        text: 'Cantidad',
                                                        dataIndex: 'cantidad',
                                                        flex: 0.5,
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
                                                        xtype:'numbercolumn',
                                                        text: 'Unidad',
                                                        dataIndex: 'unidadcantidad',
                                                        flex: 0.5,
                                                        align: 'center',
                                                        editor: {
                                                            xtype: 'numberfield',
                                                            value: 0,
                                                            maxValue: 1000,
                                                            minValue: 0,
                                                            itemId: 'txtUnidadCantidad'

                                                        }
                                                    },
                                                    {

                                                        xtype:'numbercolumn',
                                                        text: 'Precio',
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
                                                        xtype:'numbercolumn',
                                                        text: 'Total',
                                                        dataIndex: 'total',
                                                        flex: 0.5,
                                                        align: 'center'

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
