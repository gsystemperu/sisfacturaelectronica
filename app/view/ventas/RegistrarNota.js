Ext.define('sisfacturaelectronica.view.ventas.RegistrarNota', {
  extend: 'Ext.panel.Panel',
  xtype: 'wRegistrarNota',
  alias: 'widget.wRegistrarNota',
  requires: [
    'Ext.grid.plugin.*',
    'Ext.form.field.*',
    'sisfacturaelectronica.util.Rutas',
    'Ext.grid.plugin.RowEditing'
  ],
  itemId: 'wRegistrarNota',
  bodyPadding: 5,
  controller: 'acciones-regnota',
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
    stnc = Ext.create('sisfacturaelectronica.store.TipoNotaCredito');
    me = this;
    Ext.applyIf(me, {
      items: [{
        xtype: "form",
        itemId: 'frmRegNotaCredito',
        reference: 'frmRegNotaCredito',
        padding: 10,
        url: sisfacturaelectronica.util.Rutas.notaGuardar,
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
            title: 'Datos Generales',
            layout: 'fit',
            items: [
              {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 6',
                columnWidth: 0.5,
                items: [{
                  xtype: 'combobox',
                  itemId: 'cboDatosCliente',
                  name: 'idper',
                  fieldLabel: 'Nombre / Razon Social',
                  flex: 2,
                  fieldStyle: 'text-transform:uppercase',
                  labelWidth: 150,
                  allowBlank: false,
                  editable: true,
                  forceSelection: true,
                  store: storeClientes,
                  labelAlign: 'left',
                  queryMode: 'local',
                  displayField: 'nombreper',
                  valueField: 'idper',
                  fieldStyle: 'font-size:20px;'
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
              }, {
                xtype: 'container',
                layout: 'hbox',
                columnWidth: 0.5,
                defaults: {
                  labelWidth: 80
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
                    flex: 1,
                    value: 1

                  },
                  {
                    xtype: 'button',
                    glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),
                    handler: 'onClickMantenimiento'
                  },
                  {
                    xtype: 'combo',
                    fieldLabel: 'Entrega',
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
                  }
                ]
              },
              {
                xtype: 'container',
                layout: 'hbox',
                defaults: {
                  labelWidth: 80,
                  margin: '5 0 5 0',
                },
                items: [{
                  xtype: 'combo',
                  fieldLabel: 'Moneda',
                  store: storeMonedas,
                  displayField: 'descripcion',
                  valueField: 'id',
                  queryMode: 'local',
                  allowBlank: false,
                  name: 'idmoneda',
                  editable: false,
                  itemId: 'idmoneda',
                  value: 1,
                  flex: 1
                },
                {
                  xtype: 'checkboxfield',
                  boxLabel: '<b style="color:red;">Precio incluye el I.G.V.</b>',
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
                  xtype: 'numberfield',
                  fieldLabel: 'A Cuenta',
                  name: 'pagoacuenta',
                  value: 0,
                  flex: 2,
                  labelWidth: 75,
                  labelAlign: 'right'
                }
                ]
              },
              {
                xtype: 'container',
                itemId: 'dvNcss',
                layout: 'hbox',
                defaults: {
                  margin: '0 0 5 0',
                },
                items: [
                  {
                    xtype: 'combo',
                    fieldLabel: 'Tipo Nota Credito',
                    itemId: 'cboTipoNota',
                    store: stnc,
                    displayField: 'descripcion',
                    valueField: 'id',
                    queryMode: 'local',
                    allowBlank: false,
                    name: 'nctipo',
                    editable: false,
                    flex: 1,
                    labelWidth: 120
                  },
                  {
                    xtype: 'textfield',
                    fieldLabel: 'Serie/Número',
                    labelAlign: 'right',
                    name: 'seriedoc',
                    flex: 0.5
                  },
                  {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    name: 'numerodoc',
                    flex: 0.3,
                  },
                  {
                    xtype: 'button',
                    glyph: sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                    tooltip: 'Busca el detalle de la factura ingresada'
                  },
                  {
                    xtype: 'textfield',
                    fieldLabel: 'Motivo',
                    name: 'ncmotivo',
                    flex: 1.2,
                    labelWidth: 75,
                    labelAlign: 'right',
                    allowBlank: false
                  }
                ]
              }

            ]//fin items
          },//fin datos generales
          {
            xtype: 'fieldset',
            columnWidth: 0.1,
            defaultType: 'textfield',
            items: [
              {
                xtype: 'panel',
                layout: 'fit',
                margin: '0 0 5 0',
                items: [{
                  xtype: 'grid',
                  flex: 1,
                  reference: 'dgvDetalleNota',
                  itemId: 'dgvDetalleNota',
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
              xtype: 'textarea',
              flex: 1.5,
              height: 100,
              name: 'comentario',
              fieldStyle: 'font-size:12px;text-transform:uppercase;'
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

          },
          {
            xtype: 'panel',
            buttons: [{
              xytpe: 'button',
              text: 'Cancelar',
              scale: 'medium',
              handler: 'onClickCancelarNota'
            },
            {
              xytpe: 'button',
              text: 'Guardar',
              scale: 'medium',
              handler: 'onClickGuardarNota'
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
