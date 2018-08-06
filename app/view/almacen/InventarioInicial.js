Ext.define('sisfacturaelectronica.view.almacen.InventarioInicial', {
  extend: 'Ext.form.Panel',
  xtype: 'wRegInventarioInicial',
  alias: 'widget.wRegInventarioInicial',
  itemId: 'wRegInventarioInicial',

  requires: [
    'Ext.layout.container.HBox',
    'sisfacturaelectronica.view.almacen.InventarioInicialController',
    'Ext.grid.*',
    'Ext.form.field.*',
    'Ext.grid.plugin.*',
    'sisfacturaelectronica.util.Rutas'
  ],
  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },
  bodyPadding: 2,
  defaults: {
    frame: false,
    bodyPadding: 5
  },
  url: sisfacturaelectronica.util.Rutas.inventarioAgregar,
  controller: 'almacen-inventarioinicial',
  initComponent: function () {
    var st = Ext.create('sisfacturaelectronica.store.ProductoInventarioLista');
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
      clicksToMoveEditor: 1,
      autoCancel: false
    });

    me = this;
    Ext.apply(this, {
      items: [
        me.getTituloFormulario(),
        me.getGrillaDetalle(st, rowEditing),
      ],
      bbar: [
        '->',
        { xtype: 'button', text: 'CANCELAR', handler: 'onClickCancelarInventario' },
        { xtype: 'button', text: 'GUARDAR', handler: 'onClickGuardarInventario' }
      ]
    });
    this.callParent();
  },
  getTituloFormulario: function () {
    return {
      xtype: 'panel',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      bodyPadding: 20,
      flex: 1,
      items: [
        {
          xtype: 'hiddenfield',
          name: 'id',
          reference: 'id',
          value: 0
        },
        {
          xtype: 'hiddenfield',
          name: 'jsondetalle',
          reference: 'jsondetalle',

        },
        {
          xtype: 'label',
          text: 'Inventario / Nuevo',
          itemId: 'lblTituloProducto',
          padding: '5 0 5 0',
          style: {
            color: '#775c80',
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: '20px'
          }

        },
        {
          xtype: 'container',
          layout: {
            type: 'hbox',
            align: 'stretch'
          },
          defaults: {
            flex: 1
          },
          items: [
            {
              xtype: 'label',
              text: 'Referencia',
              style: {
                color: '#775c80',
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: '20px'
              },
              padding: '5 0 5 0',

            },
            {
              xtype: 'label',
              text: 'Fecha',
              style: {
                color: '#775c80',
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: '20px'
              },
            },
          ]
        },
        {
          xtype: 'container',
          layout: {
            type: 'hbox',
            align: 'stretch'
          },
          defaults: {
            flex: 1
          },
          items: [
            {
              xtype: 'textfield',
              name: 'referencia',
              fieldStyle: 'font-size:20px;font-weight:bold;',
              allowBlank: false
            },
            {
              xtype: 'datefield',
              name: 'fechainventario',
              value: new Date()

            }
          ]
        },


      ]

    };
  },
  getGrillaDetalle: function (st, rowEditing) {
    return {
      flex: 3,
      margin: '0 3 0 0',
      layout: 'fit',
      items: [
        {
          xtype: 'grid',
          reference: 'dgvInvNuevo',
          itemId: 'dgvInvNuevo',
          store: st,
          sortableColumns: false,
          plugins: [rowEditing],
          plugins: {
            ptype: 'cellediting',
            clicksToEdit: 1
          },
          selModel: 'cellmodel',
          columns: [
            {
              text: 'Producto',
              dataIndex: 'nombre',
              flex: 2.5,
              align: 'left'
            }, {
              text: 'Stock',
              dataIndex: 'stockfisico',
              flex: 1,
              align: 'right',
              editor: {
                xtype: 'numberfield'
              },
              renderer: function (value, metaData, record) {
                if (value <= 0)
                  metaData.style = "color:red;font-Size:15px";
                else
                  metaData.style = "font-Size:15px";

                return value;
              }
            },
            {
              text: 'Inventario',
              dataIndex: 'inventario',
              flex: 1,
              align: 'right',
              editor: {
                xtype: 'numberfield'
              },
              renderer: function (value, metaData, record) {
                if (value <= 0)
                  metaData.style = "color:red;font-Size:15px";
                else
                  metaData.style = "font-Size:15px";

                return value;
              }
            },
            {
              text: 'Diferencia',
              dataIndex: 'diferencia',
              flex: 1,
              align: 'right',
              editor: {
                xtype: 'numberfield'
              },
              renderer: function (value, metaData, record) {
                if (value <= 0)
                  metaData.style = "color:red;font-Size:15px";
                else
                  metaData.style = "font-Size:15px";

                return value;
              }
            },
            {
              text: 'Genera Serie?',
              xtype: 'checkcolumn',
              flex: 1,
              hidden:true,
              dataIndex: 'chk',
            }

          ],
          listeners: {
            edit: 'onEditorCalcularDiferencia'
          }

        }]
    };
  }

});
