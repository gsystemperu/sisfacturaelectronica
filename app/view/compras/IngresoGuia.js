Ext.define('sisfacturaelectronica.view.compras.IngresoGuia', {
  extend: 'Ext.form.Panel',
  xtype: 'wIngresoGuia',
  alias: 'widget.wIngresoGuia',
  requires: [
    'Ext.layout.container.HBox',
    'Ext.container.ButtonGroup',
    'Ext.grid.column.*',
    'Ext.form.field.*',
    'Ext.panel.Panel',
    'sisfacturaelectronica.store.DataTemp',
    'sisfacturaelectronica.view.compras.AccionesGuia',
    'Ext.grid.plugin.*',
    'sisfacturaelectronica.util.Rutas'
  ],
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  bodyPadding: 0,
  defaults: {
    bodyPadding: 0,
    border: false
  },
  controller: 'acciones-guia',
  bbar: [
    '->',
    {
      text: 'CANCELAR',
      handler: 'onClickCancelarGuiaProveedor',
      width: 120
    },
    {
      xtype: 'button',
      text: 'GUARDAR GUIA',
      handler: 'onClickGuardarGuiaProveedor',
      width: 120
    }

  ],
  initComponent: function () {
    var storeOrdenCompraConfirmdaDet = Ext.create('sisfacturaelectronica.store.TmpOrdenCompraConfirmadas');

    Ext.apply(this, {
      items: [
        this.getDatosDelProveedor(),
        this.getPanelDetalle(storeOrdenCompraConfirmdaDet)
      ]
    });
    this.callParent();

  },
  getDatosDelProveedor: function () {
    return obj = {
      xtype: 'form',
      reference: 'frmGuiaIngresoProveedor',
      itemId: 'frmGuiaIngresoProveedor',
      frame: false,
      defaultType: 'textfield',
      url: sisfacturaelectronica.util.Rutas.guiaProveedorGuardar,
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      padding: 5,
      bodyPadding: 5,
      defaults: {
        labelWidth: 150,
        labelAlign: 'right'
      },
      items: [
        {
          xtype:'hiddenfield',
          itemId : 'usuarioguia',
          name : 'usuario'
        },
        {
          xtype: 'hiddenfield',
          itemId: 'id',
          name: 'id',
          value: 0
        },
        {
          xtype: 'hiddenfield',
          itemId: 'idordencompra',
          name: 'idordencompra'
        },
        {
          xtype: 'hiddenfield',
          itemId: 'txtjsondetalle',
          name: 'jsondetalle'
        },
        {
          xtype: 'hiddenfield',
          itemId: 'txtIdProveedor',
          name: 'idprovedor'
        },
        {
          xtype: 'textfield',
          fieldStyle: 'border-style:none;font-size:30px;text-transform: uppercase;background-color:#EFEFEF;color:#666666;',
          itemId: 'txtNombreProveedor'
        },
        {
          xtype: 'container',
          flex: 1,
          layout: {
            type: 'hbox',
            align: 'stretch'
          },
          defaults: {
            labelWidth : 150,
            padding : '0 5 0 0',
            fieldStyle: 'border-style:none;font-size:20px;text-transform: uppercase;background-color:#FFFFFF;color:#666666;',
          },
          items: [
            {
              xtype:'textfield',
              name: 'serieGuia',
              emptyText : 'Serie Guia',
              flex: 1
              
            }, {
              xtype: 'textfield',
              name: 'numeroGuia',
              emptyText : 'Número Guia',
              allowBlank: false,
              flex: 1
            },
            {
              xtype: 'textfield',
              fieldLabel : 'Lote',
              name: 'numerolote',
              labelAlign:'right',
              flex: 1.5,
              allowBlank: false

            },
            {
              xtype: 'datefield',
              fieldLabel : 'Fecha Ingreso',
              value: new Date(),
              name: 'fecha',
              format: 'd/m/Y',
              flex: 1.5,
              allowBlank: false,
              labelAlign:'right',
            }
          ]
        }

      ]
    };
  },
  getPanelDetalle: function (storeAbastecimientoDet) {
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
      clicksToMoveEditor: 1,
      autoCancel: false
    });

    return obj = {
      xtype: 'panel',
      layout: 'fit',
      itemId: 'panCargandoOCCD',
      border: false,
      title: 'Detalle de Ingresos',
      flex: 1,
      items: [{
        xtype: 'grid',
        reference: 'dgvOrdenCompraConfirDetalle',
        itemId: 'dgvOrdenCompraConfirDetalle',
        store: storeAbastecimientoDet,
        columnLines: true,
        sortableColumns: false,
        selModel: 'rowmodel',
        plugins: [rowEditing],
        plugins: {
          ptype: 'cellediting',
          clicksToEdit: 1
        },
        columns: [{
          text: 'Producto',
          dataIndex: 'producto',
          flex: 2,
          align: 'left'
        }, {
          xtype: 'numbercolumn',
          text: 'Cant. Solicitada',
          dataIndex: 'saldo',
          flex: 0.5,
          align: 'right',
          renderer: function (value, metaData, record) {
            metaData.style = "background-color:#595e61;color:#EEEEEE;fontSize:15px;font-weight:bold;";
            return value;

          }
        },
        {
          text: 'Cant. Recibida',
          dataIndex: 'cantidadrecibida',
          flex: 0.5,
          align: 'right',
          renderer: function (value, metaData, record) {
            metaData.style = "background-color:#595e61;color:#EEEEEE;fontSize:15px;font-weight:bold;";
            return value;
          },
          editor: {
            xtype: 'numberfield',
            value: 0,
            maxValue: 1000,
            minValue: 0,
            itemId: 'txtCantidadRecibida'

          }
        },

        {
          xtype: 'datecolumn',
          dataIndex: 'vencimiento',
          flex: 0.5,
          format: 'd/m/Y',
          text: 'Vencimiento',
          renderer: function (value, metaData) {
            metaData.style = "background-color:#595e61;color:#EEEEEE;fontSize:15px;font-weight:bold;";
            return Ext.util.Format.date(value, 'd/m/Y');
          },
          editor: {
            xtype: 'datefield',
            format: 'd/m/Y',
            value: new Date()
          }
        },
        {
          xtype: 'checkcolumn',
          text: 'Gen. Serie',
          dataIndex: 'genserie',
          flex: 0.5,
          align: 'center',
          value: true,
          hidden: true,
          editor: {
            xtype: 'checkbox',
            value: true
          }

        },

        {
          xtype: 'numbercolumn',
          text: 'Precio',
          dataIndex: 'preciocompra',
          flex: 0.5,
          align: 'right',
          editor: {
            xtype: 'numberfield',
            value: 0,
            maxValue: 1000,
            minValue: 0,
            itemId: 'txtPrecioCompra'

          }
        },
        {
          xtype: 'numbercolumn',
          text: 'Sub total',
          dataIndex: 'total',
          flex: 0.5,
          align: 'right'
        }
        ],
        listeners: {
          edit: 'onEditorCalcularTotalGuiaIngreso'
        }
      }]
    };
  }
});
