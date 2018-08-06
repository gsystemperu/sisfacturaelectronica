Ext.define('sisfacturaelectronica.view.ventas.EditarCotizacion', {
    extend: 'Ext.window.Window',
    alias: 'widget.wEditarCotizacion',
    requires: [
        'Ext.grid.plugin.*',
        'Ext.form.field.*',
        'sisfacturaelectronica.util.Rutas',
        'Ext.grid.plugin.RowEditing'
    ],
    itemId: 'wEditarCotizacion',
    width: 1100,
    height: 670,
    resizable: false,
    modal: true,
    floating: true,
    title: '.:. Editar Cotizacion .:.',
    bodyPadding: 5,
    controller: 'acciones-regcotizacion',
    config: {
        cotizacion: 0
    },
    initComponent: function () {

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        me = this;
        var storeClientes = Ext.create('sisfacturaelectronica.store.Clientes');
        var storeProductos = Ext.create('sisfacturaelectronica.store.Productos');
        //var storeDetCot = Ext.create('sisfacturaelectronica.store.CotizacionesDetalle');
        var storeDetCotizacion = Ext.create('sisfacturaelectronica.store.DetalleCotizacion');
        var storeFormaPago = Ext.create('sisfacturaelectronica.store.FormaPago');
        var storeModoEntrega = Ext.create('sisfacturaelectronica.store.ModoEntrega');
        var storeVendedores = Ext.create('sisfacturaelectronica.store.Vendedores');
        storeClientes.load();


        Ext.applyIf(me, {
            items: [{
                    xtype: "form",
                    itemId: 'frmRegCotizacion',
                    reference: 'frmRegCotizacion',
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
                                    name: 'idcoti',
                                    itemId: 'vid',
                                    value: 0
                                },
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    title: 'Cliente',
                                    layout: 'fit',
                                    items: [{
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '0 0 5 6',
                                            columnWidth: 0.5,
                                            items: [{
                                                    xtype: 'combobox',
                                                    itemId: 'cboDatosCliente',
                                                    fieldLabel: 'Nombre / Razon Social',
                                                    flex: 2.5,
                                                    fieldStyle: 'text-transform:uppercase',
                                                    labelWidth: 150,
                                                    allowBlank: false,
                                                    editable: true,
                                                    store: storeClientes,
                                                    QueryMode: 'local',
                                                    displayField: 'nomcompleto',
                                                    valueField: 'idper',
                                                    enableKeyEvents: true,
                                                    minChars: 2,
                                                    typeAhead: true,
                                                    forceSelection: true,
                                                    hideTrigger: true,
                                                    name: 'idper',
                                                    empyText: '--- Digitar Datos del Cliente ---'

                                                },
                                                {
                                                    xtype: 'button',
                                                    glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                                                    handler: 'onClickNuevoCliente'
                                                },

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
                                                    name   : 'vreferencia'

                                                }


                                            ]
                                        },

                                    ]

                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 130,
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
                                            editable: false,
                                            itemId: 'idfopag'

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
                                            itemId: 'vmodoentrega'
                                        },
                                        {
                                            xtype: 'button',
                                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                                            handler: 'onClickMantenimiento'
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Asignar a Vendedor',
                                            store: storeVendedores,
                                            displayField: 'completo',
                                            valueField: 'idvend',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            name: 'idvend',
                                            labelAlign: 'right',
                                            editable: false,
                                            itemId: 'vvendedor'


                                        },
                                        {
                                            xtype: 'button',
                                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                                            handler: 'onClickMantenimiento'
                                        },

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
                                                            xtype: 'button',
                                                            text: 'Buscar Producto',
                                                            handler: 'onClickBuscarProducto',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                                                            handler: 'onClickNuevoProductoPorCotizacion',
                                                            flex: 0.5
                                                        }

                                                    ]
                                                }


                                            ]
                                        },

                                        /*
                                        vjsondetalle:[{"idprod":22,"cantidad":1,"precio":22,"total":22,"vencimiento":"2017-06-28T05:00:00.000Z"},{"idprod":15,"cantidad":1,"precio":15,"total":15,"vencimiento":"2017-06-29T05:00:00.000Z"},{"idprod":55,"cantidad":1,"precio":55,"total":55, vencimiento "vencimiento":"2017-06-30T05:00:00.000Z"} ]
                                         */
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
                                                 plugins: {
                                                    ptype: 'cellediting',
                                                    clicksToEdit: 1
                                                },
                                                selModel: 'cellmodel',
                                                columns: [{
                                                        text: 'Descripción',
                                                        dataIndex: 'descripcion',
                                                        flex: 3
                                                    },
                                                    {
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
                                                            //format: 'd/m/Y',
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
                                    items: [{
                                            xtype: 'panel',
                                            flex: 1.7,
                                            padding: '5 10 5 5',
                                            html: '<div style="text-aling:center;"> <img src="resources/images/lgsis.png" width="100" height="50"> </div>',
                                            items: [{
                                                xtype: 'container',
                                                layout: 'hbox',
                                                items: [{
                                                    xtype: 'checkboxfield',
                                                    boxLabel: 'Precio incluye el I.G.V.',
                                                    name: 'incluyeigv',
                                                    itemId: '_incluyeigv',
                                                    value: 1,
                                                    listeners: {
                                                        change: {
                                                            fn: 'onSelectedIncluyeIGV'
                                                        }
                                                    }

                                                }]
                                            }]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            padding: '0 0 15 0',
                                            items: [{
                                                    xtype: 'numberfield',
                                                    itemId: 'txtSubtotalventas',
                                                    name: 'valventacont',
                                                    value: "0.00",
                                                    fieldLabel: 'Sub Total',
                                                    decimalPrecision: 2,
                                                    // maxValue: 9999,
                                                    minValue: 0,
                                                    step: 0.01,
                                                    decimalSeparator: '.',
                                                    readOnly: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    fieldStyle: 'text-align: right;',
                                                    hidden:true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Igv',
                                                    itemId: 'txtIgvventas',
                                                    name: 'valigvcont',
                                                    value: "0.00",
                                                    fieldStyle: 'text-align: right;',
                                                    minValue: 0,
                                                    readOnly: true,
                                                    enableKeyEvents: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    hidden:true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Total General ',
                                                    itemId: 'txtTotalGeneral',
                                                    value: "0.00",
                                                    name: 'valtotalcont',
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
                                    buttons: [{
                                            xytpe: 'button',
                                            text: 'Cancelar',
                                            scale: 'medium',
                                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('cancelar'),
                                            handler: 'onClickSalirCotizacion'
                                        }, '-',
                                        {
                                            xytpe: 'button',
                                            text: 'Guardar',
                                            scale: 'medium',
                                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('guardar'),
                                            itemId: 'btnGuardarVenta',
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


        Ext.Ajax.request({
            url :'resources/api/cotizacion_detalle',
            params:{
              vIdCotizacion : me.getCotizacion()
            },
            success:function(response){
                var data = Ext.JSON.decode(response.responseText);
                var _tot = 0;
                Ext.each(data,function(rec){
                        _data = {
                            idprod: rec._idprod,
                            descripcion: rec._descripcion,
                            cantidad:rec._cantidad,
                            precio: parseFloat( rec._precio ),
                            total: parseFloat( rec._total),
                            vencimiento: ( rec._vencimiento == null? null: new Date(rec._vencimiento) )
                        };
                           _tot = _tot + parseFloat( rec._total);
                             storeDetCotizacion.insert(0,_data);
                   });

                   Ext.ComponentQuery.query('#txtSubtotalventas')[0].setValue(_tot.toFixed(2));
                      if (Ext.ComponentQuery.query('#_incluyeigv')[0].getValue()){
                          Ext.ComponentQuery.query('#txtSubtotalventas')[0].setHidden(true);
                          Ext.ComponentQuery.query('#txtIgvventas')[0].setHidden(true);
                          var _igv = 0;
                      }
                      else{
                          Ext.ComponentQuery.query('#txtSubtotalventas')[0].setHidden(false);
                          Ext.ComponentQuery.query('#txtIgvventas')[0].setHidden(false);
                          var _igv = _tot * 0.18;
                      }
                      Ext.ComponentQuery.query('#txtIgvventas')[0].setValue(_igv.toFixed(2));
                      var _totven = 0;
                      _totven = _tot + _igv;
                      Ext.ComponentQuery.query('#txtTotalGeneral')[0].setValue(   Ext.util.Format.number(_totven.toFixed(2), "0,000.00") )    //(_totven.toFixed(2));


            }
        });
    }
});
