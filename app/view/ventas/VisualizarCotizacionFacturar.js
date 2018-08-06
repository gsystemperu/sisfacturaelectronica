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
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        var storeClientes       = Ext.create('sisfacturaelectronica.store.Clientes');
        var storeDetCotizacion  = Ext.create('sisfacturaelectronica.store.DetalleCotizacion');
        var storeFormaPago      = Ext.create('sisfacturaelectronica.store.FormaPago');
        var storeModoEntrega    = Ext.create('sisfacturaelectronica.store.ModoEntrega');
        var storeDocumentoVenta = Ext.create('sisfacturaelectronica.store.DocumentoVenta');
        var storeMonedas        = Ext.create('sisfacturaelectronica.store.Monedas');

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
                                    title: 'Datos Generales',
                                    layout: 'fit',
                                    items: [{
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '0 0 5 6',
                                            columnWidth: 0.5,
                                            items: [{
                                                    xtype: 'combobox',
                                                    itemId: 'cboDatosClienteFact',
                                                    name : 'idper',
                                                    fieldLabel: 'Nombre / Razon Social',
                                                    flex: 2,
                                                    fieldStyle: 'text-transform:uppercase',
                                                    labelWidth: 150,
                                                    allowBlank: false,
                                                    editable: true,
                                                    forceSelection : true,
                                                    store: storeClientes,
                                                    queryMode: 'local',
                                                    displayField: 'nombreper',
                                                    valueField :'idper',
                                                    readOnly:true,
                                                    fieldStyle :'font-size:20px;'
                                                },
                                                {

                                                    xtype: 'datefield',
                                                    fieldLabel: 'Fecha Venta',
                                                    value: new Date(),
                                                    labelAlign: 'right',
                                                    flex: 0.8,
                                                    itemId: 'dtFechaVenta',
                                                    name: 'fechacoti',
                                                    allowBlank:false

                                                },
                                                {
                                                  xtype:'datefield',
                                                  fieldLabel :'Válido Hasta',
                                                  labelAlign :'right',
                                                  editable:false,
                                                  name : 'fechavalidohasta',
                                                  value : new Date(),
                                                  flex: 0.8,
                                                  readOnly:true,
                                                  name :'validohasta'
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
                                        },

                                    ]

                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 80,
                                        //  padding:'0 5 0 0'
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
                                            editable:false,
                                            itemId:'idfopag',
                                            value : 1,
                                            flex:1

                                        },
                                        {
                                            xtype: 'button',
                                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                                            handler: 'onClickMantenimiento'
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Mod. Entrega',
                                            store: storeModoEntrega,
                                            displayField: 'descripcion',
                                            valueField: 'idmodo',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            name: 'idmodo',
                                            labelAlign:'right',
                                            editable:false,
                                            itemId:'vmodoentrega',
                                            value : 1,
                                            flex:1
                                        },
                                        {
                                            xtype: 'button',
                                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                                            handler: 'onClickMantenimiento'
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Documento',
                                            store: storeDocumentoVenta,
                                            displayField: 'descripcion',
                                            valueField: 'id',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            name: 'documentoventa',
                                            labelAlign:'right',
                                            editable:false,
                                            itemId:'documentoventa',
                                            value : 1,
                                            flex:1

                                        },
                                        {
                                            xtype: 'button',
                                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                                            handler: 'onClickMantenimiento'
                                        },
                                        {
                                          xtype:'textfield',
                                          fieldLabel :'Serie/Número',
                                          labelAlign :'right',
                                          name : 'seriedoc',
                                          value : '001',
                                          flex : 0.5,
                                          allowBlank:false
                                        },
                                        {
                                          xtype:'textfield',
                                          labelAlign :'right',
                                          name : 'numerodoc',
                                          flex : 0.5,
                                          allowBlank:false
                                        },
                                    ]


                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 80,
                                        padding : '5 0 5 0'
                                    },
                                    items: [
                                          {
                                              xtype: 'combo',
                                              fieldLabel: 'Moneda',
                                              store: storeMonedas,
                                              displayField: 'descripcion',
                                              valueField: 'id',
                                              queryMode: 'local',
                                              allowBlank: false,
                                              name: 'idmoneda',
                                              labelAlign:'left',
                                              editable:false,
                                              itemId:'idmoneda',
                                              value : 1,
                                              flex:1

                                          },
                                          {
                                            xtype:'numberfield',
                                            fieldLabel :'A Cuenta',
                                            name : 'pagoacuenta',
                                            value : 0,
                                            flex : 2,
                                            labelWidth : 75,
                                            labelAlign:'right'
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
                                            items: [


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
                                                        {
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
                                                            {
                                                                xtype: 'checkboxfield',
                                                                boxLabel: 'Precio incluye el I.G.V.',
                                                                hidden : true,
                                                                labelStyle :'font-size:15px;',
                                                                name: 'incluyeigv',
                                                                reference: 'incluyeigv',
                                                                itemId: 'incluyeigvfacturacion',
                                                                readOnly:false,
                                                                value: 0,
                                                               /*  listeners: {
                                                                      change: {
                                                                          fn: 'onSelectedIncluyeIGV'
                                                                      }
                                                                  }*/
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
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    items: [

                                        {
                                            xtype:'panel',
                                            flex: 2,
                                            frame:false,
                                            layout : 'fit',
                                            items:[
                                              {
                                                xtype:'textarea',
                                                name : 'comentario',
                                                fieldStyle : 'font-size:15px;',
                                                emptyText : 'Comentario de Cotización'
                                              }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            padding: '0 0 15 0',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    reference: 'SubtotalventasfacturacionVi',
                                                    itemId: 'SubtotalventasfacturacionVi',
                                                    name: 'valventacont',
                                                    value: "0.00",
                                                    fieldLabel: 'Sub Total',
                                                    readOnly: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    fieldStyle: 'text-align: right;font-size:16px;',
                                                    labelAlign :'right',
                                                    labelStyle : 'font-size:15px;',

                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Igv',
                                                    reference: 'igvventasfacturacionVi',
                                                    itemId: 'igvventasfacturacionVi',
                                                    name: 'valigvcont',
                                                    value: "0.00",
                                                    minValue: 0,
                                                    readOnly: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    fieldStyle: 'text-align: right;font-size:16px;',
                                                    labelStyle : 'font-size:15px;',
                                                    labelAlign :'right'

                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Total General ',
                                                    value: "0.00",
                                                    reference: 'TotalGeneralfacturacionVi',
                                                    itemId: 'TotalGeneralfacturacionVi',
                                                    name: 'valtotalcont',
                                                    minValue: 0,
                                                    readOnly: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    fieldStyle: 'text-align: right;font-size:16px;',
                                                    labelAlign :'right',
                                                    labelStyle : 'font-size:15px;',
                                                }
                                            ]
                                        }

                                    ]

                                },
                                {
                                    xtype: 'panel',
                                    buttons: [{
                                            xytpe: 'button',
                                            text: 'Cancelar',
                                            scale: 'medium',
                                            handler: 'onClickSalirCotizacionFacturar'
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
