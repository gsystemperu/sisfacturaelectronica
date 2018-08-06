Ext.define('sisfacturaelectronica.view.ventas.RegistrarFacturaBoleta', {
    extend: 'Ext.panel.Panel',
    xtype :'wRegistrarFacturaBoleta',
    alias: 'widget.wRegistrarFacturaBoleta',
    requires: [
        'Ext.grid.plugin.*',
        'Ext.form.field.*',
        'sisfacturaelectronica.util.Rutas',
        'Ext.grid.plugin.RowEditing'
    ],
    itemId: 'wRegistrarFacturaBoleta',
    bodyPadding: 5,
    controller: 'acciones-regfacturaboleta',
    initComponent: function () {
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        var storeClientes = Ext.create('sisfacturaelectronica.store.Clientes');
        var storeProductos = Ext.create('sisfacturaelectronica.store.Productos');
        var storeDetCotizacion = Ext.create('sisfacturaelectronica.store.DetalleCotizacion');
        var storeFormaPago = Ext.create('sisfacturaelectronica.store.FormaPago');
        var storeModoEntrega = Ext.create('sisfacturaelectronica.store.ModoEntrega');
        var storeVendedores = Ext.create('sisfacturaelectronica.store.Vendedores');
        var storeMonedas = Ext.create('sisfacturaelectronica.store.Monedas');
        var storeDocumentoVenta = Ext.create('sisfacturaelectronica.store.DocumentoVenta');

        me = this;
        Ext.applyIf(me, {
            items: [{
                    xtype: "form",
                    itemId: 'frmRegFacturaBoleta',
                    reference: 'frmRegFacturaBoleta',
                    padding : 10,
                    url: sisfacturaelectronica.util.Rutas.facturacionGuardar,
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
                                    xtype: 'hiddenfield',
                                    name: 'vusuario',
                                    itemId : 'vusuario',
                                    value: ''
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'incluyeigv',
                                    itemId : 'incluyeigv',
                                    value: 1
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
                                                    itemId: 'cboDatosCliente',
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
                                                    fieldStyle :'font-size:20px;'
                                                },
                                                {
                                                    xtype: 'button',
                                                    glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                                                    handler: 'onClickNuevoCliente'
                                                },
                                                /*{
                                                    xtype: 'button',
                                                    text :'Cotizaciones',
                                                    glyph: sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                                                    handler: 'onClickBuscarCotizacionesAnteriores'
                                                },*/

                                                {

                                                    xtype: 'datefield',
                                                    fieldLabel: 'Fecha Venta',
                                                    value: new Date(),
                                                    labelAlign: 'right',
                                                    flex: 1,
                                                    itemId: 'dtFechaVenta',
                                                    name: 'fechacoti'

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
                                    layout: {
                                        type:'hbox',
                                        align:'strech'
                                    },
                                    defaults: {
                                        labelWidth: 100,
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
                                            flex: 1.5

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
                                            labelAlign:'right',
                                            editable:false,
                                            itemId:'vmodoentrega',
                                            value : 1,
                                            flex: 1
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
                                          name : 'serie',
                                          value : '001',
                                          flex : 1,
                                          allowBlank:false
                                        },
                                        {
                                          xtype:'textfield',
                                          labelAlign :'right',
                                          name : 'numerodoc',
                                          flex : 0.5,
                                          allowBlank:false,
                                          value : '**GENERANDO**'
                                        },
                                       
                                       /* {
                                            xtype: 'combo',
                                            fieldLabel: 'Asignar a Vendedor',
                                            store: storeVendedores,
                                            displayField: 'completo',
                                            valueField: 'idvend',
                                            queryMode: 'local',
                                            allowBlank: true,
                                            name: 'vvendedor',
                                            labelAlign:'right',
                                            editable:false,
                                            itemId:'vvendedor',
                                            hidden : true

                                        },*/
                                      

                                    ]


                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 100,
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
                                    defaultType: 'textfield',
                                    items: [{
                                            xtype: 'container',
                                            margin: '0 0 0 -5',
                                            layout: 'fit',
                                            frame: true,
                                            border: false,
                                            padding: 5,
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
                                                            tooltip : 'Accion para buscar los productos ingresados'
                                                            
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
                                                              hidden:true,
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
                                                              xtype:'textfield',
                                                              flex : 1,
                                                              disabled : true,
                                                              fieldStyle: 'text-align: center;font-size:15px;font-weight:bold; ',
                                                              value : 'CT000000000000',
                                                              name : 'ctcodigo',

                                                              hidden:true,
                                                            },
                                                            {
                                                            xtype: 'checkboxfield',
                                                            boxLabel: 'Precio incluye el I.G.V.',
                                                            name: 'incluyeigv',
                                                            reference: 'incluyeigv',
                                                            itemId: 'incluyeigv',
                                                            readOnly:false,
                                                            value: 0,
                                                            hidden : true,
                                                             listeners: {
                                                                  change: {
                                                                      fn: 'onSelectedIncluyeIGV'
                                                                  }
                                                              }
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
                                                reference: 'dgvDetalleVentaFacturaBoleta',
                                                itemId: 'dgvDetalleVentaFacturaBoleta',
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
                                                        xtype:'numbercolumn',
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
                                                       // xtype:'numbercolumn',
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
                                                        renderer: Ext.util.Format.numberRenderer('0.00'),

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
                                                height: 350,
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
                                            xtype:'textarea',
                                            flex: 1.5,
                                            height : 100,
                                            name : 'comentario',
                                            fieldStyle : 'font-size:12px;text-transform:uppercase;',
                                            emptyText : 'Comentario facturación :'
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
                                                   // value: "0.00",
                                                    fieldLabel: 'Sub Total',
                                                    readOnly: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    fieldStyle: 'text-align: right;font-size:16px;',
                                                    labelAlign :'right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Igv',
                                                    reference: 'igvventas',
                                                    itemId: 'igvventas',
                                                    name: 'valigvcont',
                                                    //value: "0.00",
                                                    minValue: 0,
                                                    readOnly: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    fieldStyle: 'text-align: right;font-size:16px;',
                                                    labelAlign :'right'
                                                   // hidden:true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Total General ',
                                                    labelAlign :'right',
                                                    reference: 'TotalGeneral',
                                                    itemId: 'TotalGeneral',
                                                    name: 'valtotalcont',
                                                    //   decimalPrecision: 3,
                                                    //  maxValue: 9999,
                                                    minValue: 0,
                                                    //                                            step: 0.01,
                                                    //                                            decimalSeparator: '.',
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
                                        {
                                            xytpe: 'button',
                                            text: 'Cancelar',
                                            scale: 'medium',
                                            handler: 'onClickCancelarFacturaBoleta'
                                        },
                                        {
                                            xytpe: 'button',
                                            text: 'Guardar',
                                            scale: 'medium',
                                            handler: 'onClickGuardarFacturaBoleta'
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
        Ext.ComponentQuery.query('#vusuario')[0].setValue(sisfacturaelectronica.util.Data.usuario);

    }
});
