
Ext.define('sisfacturaelectronica.view.ventas.RegistrarFacturaBoleta', {
  extend: 'Ext.panel.Panel',
  xtype: 'wRegistrarFacturaBoleta',
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

    storeClientes = Ext.create('sisfacturaelectronica.store.Clientes');
    storeProductos = Ext.create('sisfacturaelectronica.store.Productos');
    storeDetCotizacion = Ext.create('sisfacturaelectronica.store.DetalleCotizacion');
    storeFormaPago = Ext.create('sisfacturaelectronica.store.FormaPago');
    storeModoEntrega = Ext.create('sisfacturaelectronica.store.ModoEntrega');
    storeVendedores = Ext.create('sisfacturaelectronica.store.Vendedores');
    storeMonedas = Ext.create('sisfacturaelectronica.store.Monedas');
    storeDocumentoVenta = Ext.create('sisfacturaelectronica.store.DocumentoVenta');
    stnc = Ext.create('sisfacturaelectronica.store.TipoNotaCredito');
    me = this;
    Ext.applyIf(me, {
      items: [{
        xtype: "form",
        itemId: 'frmRegFacturaBoleta',
        reference: 'frmRegFacturaBoleta',
        padding: 10,
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
            itemId: 'idcoti',
            value: 0
          },
          {
            xtype: 'hiddenfield',
            name: 'vusuario',
            itemId: 'vusuario',
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
                  itemId: 'cboDatosCliente',
                  name: 'idper',
                  emptyText: 'Nombre o Razón Social ',
                  fieldStyle: 'font-size:35px;height:40px;text-transform:uppercase;',
                  flex: 1,
                  allowBlank: false,
                  editable: true,
                  forceSelection: true,
                  store: storeClientes,
                  labelAlign: 'left',
                  queryMode: 'local',
                  displayField: 'nombreper',
                  valueField: 'idper',
                  
                },
                {
                  xtype: 'button',
                  glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                  handler: 'onClickNuevoCliente'
                },
              /*  {

                  xtype: 'datefield',
                  fieldLabel: 'Fecha Venta',
                  value: new Date(),
                  labelAlign: 'right',
                  flex: 0.8,
                  itemId: 'dtFechaVenta',
                  name: 'fechacoti'
                },
                {
                  xtype: 'datefield',
                  fieldLabel: 'Válido Hasta',
                  labelAlign: 'right',
                  editable: false,
                  name: 'fechavalidohasta',
                  value: new Date(),
                  flex: 0.8,
                  readOnly: true,
                  name: 'validohasta'
                },*/
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
              }, {
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
                    allowBlank: true,
                    name: 'idmodo',
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
                  {
                    xtype: 'combo',
                    fieldLabel: 'Moneda',
                    store: storeMonedas,
                    displayField: 'descripcion',
                    valueField: 'id',
                    queryMode: 'local',
                    allowBlank: false,
                    name: 'idmoneda',
                    labelAlign: 'right',
                    editable: false,
                    itemId: 'idmoneda',
                    value: 1,
                    flex: 1.5
                  }

                 /* {
                    xtype: 'combo',
                    fieldLabel: 'Documento',
                    store: storeDocumentoVenta,
                    displayField: 'descripcion',
                    valueField: 'id',
                    queryMode: 'local',
                    allowBlank: false,
                    name: 'documentoventa',
                    labelAlign: 'right',
                    editable: false,
                    itemId: 'documentoventa',
                    value: 1,
                    flex: 1
                  },
                  {
                    xtype: 'button',
                    glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                    handler: 'onClickMantenimiento'
                  },
                  {
                    xtype: 'textfield',
                    fieldLabel: 'Serie/Número',
                    labelAlign: 'right',
                    name: 'serie',
                    flex: 0.5,
                    value : '--',
                    readOnly:true
                  },
                  {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    name: 'numerodoc',
                    flex: 0.3,
                    value : '**Generando**',
                    readOnly:true
                  }*/
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
                  xtype: 'checkboxfield',
                  boxLabel: '<b style="color:#2d5f87">Precios Incluye I.g.v. </b>',
                  padding: '3 0 0 20',
                  name: 'incluyeigv',
                  reference: 'incluyeigv',
                  itemId: 'incluyeigv',
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
               /* {
                  xtype: 'numberfield',
                  fieldLabel: 'A Cuenta',
                  name: 'pagoacuenta',
                  value: 0,
                  flex: 2,
                  labelWidth: 75,
                  labelAlign: 'right'
                }*/
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
                        name: 'serie',
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
            }
            

            ]//fin items
          },//fin datos generales
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
                    },

                  '->',
                  {
                    xtype: 'button',
                    glyph: sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                    handler: 'onClickBuscarProducto',
                    text : 'Ver Productos',
                    tooltip: 'Accion para buscar los productos ingresados'

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
                    handler: 'onClickCancelarFacturaBoleta'
                },
                {
                    text: 'Guardar',
                    scale: 'large',
                    handler: 'onClickGuardarFacturaBoleta'
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
                            name: 'valigvcont',

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
                /*  {
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
                 

                  ]
                }


              ]
            },
            {
              xtype: 'panel',
              layout: 'fit',
              margin: '0 0 5 0',
              items: [*/
              {
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
                scrollable: true,
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

              }]

            }
            ]

          }, // fin fieldset Detalle
          /*{
            xtype: 'panel',
            layout: 'hbox',
            items: [{
              xtype: 'textarea',
              flex: 1.5,
              height: 100,
              name: 'comentario',
              fieldStyle: 'font-size:12px;text-transform:uppercase;',
              emptyText: 'Comentario facturación :'
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
                labelAlign: 'right'
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
                labelAlign: 'right'
                // hidden:true
              },
              {
                xtype: 'textfield',
                fieldLabel: 'Total General ',
                labelAlign: 'right',
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

          },*/
         /* {
            xtype: 'panel',
            buttons: [{
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




          }*/
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
