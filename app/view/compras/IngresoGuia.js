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
  tbar: [
    '->',
    {
      xtype: 'button',
      text: 'GUARDAR GUIA',
      handler: 'onClickGuardarGuiaProveedor',
      width  : 120
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
      layout: 'hbox',
      padding: 5,
      bodyPadding: 5,
      defaults: {
        labelWidth: 150,
        labelAlign: 'right'
      },
      items: [{
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
          xtype:'hiddenfield',
          itemId : 'txtIdProveedor',
          name  : 'idprovedor'
        },
        {
            xtype: 'label',
            itemId :'txtNombreProveedor',
            padding: '5px 5px 5px 5px',
            border: false,
            flex: 2,
            height : 25,
            style: {
              background: '#6E4B5A',
              color: 'white',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: '15px'
            }
          },
        {
          fieldLabel: 'Guia del Proveedor',
          name: 'serieGuia',
          flex: 1.5
        }, {
          xtype: 'textfield',
          name: 'numeroGuia',
          flex: 1,
          allowBlank: false
        },
        {
          xtype: 'label',
          text: 'Lote',
          padding: '5px 0 0 0',
          border: false,
          width: 60,
          height: 25,
          style: {
            background: '#6E4B5A',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '13px'
          }
        }, {
          xtype: 'textfield',
          name: 'numerolote',
          flex: 0.5,
          allowBlank: false

        },
        {
          xtype: 'label',
          text: 'Fecha',
          padding: '5px 0 0 0',
          border: false,
          width: 100,
          height: 25,
          style: {
            background: '#6E4B5A',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '13px'
          }
        }, {
          xtype: 'datefield',
          value: new Date(),
          name: 'fecha',
          format: 'd/m/Y',
          flex: 0.5,
          allowBlank: false
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
      title : 'Detalle de Ingresos',
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
            flex: 1.5,
            align: 'left'
          }, {
            xtype: 'numbercolumn',
            text: 'Cant. Solicitada',
            dataIndex: 'saldo',
            flex: 0.5,
            align: 'right',
            renderer: function (value, metaData, record) {
               metaData.style = "background-color:#30B59B;color:#EEEEEE;fontSize:13px;";
               return value;

            }
          },
          {
            text: 'Cant. Recibida',
            dataIndex: 'cantidadrecibida',
            flex: 0.5,
            align: 'right',
            renderer: function (value, metaData, record) {
              metaData.style = "background-color:#30B59B;color:#EEEEEE;fontSize:13px;";
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
              metaData.style = "background-color:#30B59B;color:#EEEEEE;font-size:13px;";
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
            value:true,
            editor: {
              xtype: 'checkbox',
              value :true
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
