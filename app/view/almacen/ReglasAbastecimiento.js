Ext.define('sisfacturaelectronica.view.almacen.ReglasAbastecimiento', {
  extend: 'Ext.panel.Panel',
  xtype: 'wReglasAbastecimiento',
  alias: 'widget.wReglasAbastecimiento',
  requires: [
    'Ext.layout.container.HBox',
    'Ext.container.ButtonGroup',
    'Ext.grid.column.*',
    'Ext.form.field.*',
    'Ext.panel.Panel',
    'sisfacturaelectronica.store.DataTemp'
  ],
  layout: {
    type: 'vbox',
    //pack: 'start',
    align: 'stretch'
  },
  bodyPadding: 0,
  defaults: {
    bodyPadding: 0,
    border: false
  },
  controller: 'acciones-abastecimiento',
  tbar: [{
      xtype: 'button',
      text: 'Ingresar',
      handler: 'onClickIngresar'
    }, {
      xtype: 'button',
      text: 'Actualizar Lista',
    },
    {
      xtype: 'button',
      text: 'Imprimir',
    },

  ],
  initComponent: function () {
    var storeAbastecimiento = Ext.create('sisfacturaelectronica.store.Abastecimientos');
    var storeProveedores = Ext.create('sisfacturaelectronica.store.Proveedores');
    var storeAbastecimientoDet = Ext.create('sisfacturaelectronica.store.AbastecimientoDetalle');

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
      clicksToMoveEditor: 1,
      autoCancel: false
    });

    Ext.apply(this, {
      items: [{
          xtype: 'panel',
          flex: 1,
          margin: '0 3 0 0',
          layout: 'fit',
          border: false,
          items: [
            this.getPanelAbastecimiento(storeAbastecimiento)
          ],
          tbar: [
            this.getPanelToolBarAbastecimiento(storeProveedores)
          ]
        },
        this.getPanelDetalle(storeAbastecimientoDet)
      ]
    });
    this.callParent();

    storeAbastecimiento.load({
      params: {
        start: 0,
        limit: 50,
        desde: Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
        hasta: Ext.ComponentQuery.query('#dfHasta')[0].getRawValue(),
        proveedor: 0
      }
    });
  },
  getPanelToolBarAbastecimiento: function (storeProveedores) {
    return obj = {
      xtype: 'container',
      bodyPadding: 0,
      layout: {
        type: 'hbox',
        anchor: '100%'
      },
      columnWidth: 10,
      items: [{
          xtype: 'label',
          text: 'Fecha Desde',
          padding: '5px 0 0 0',
          border: false,
          width: 100,
          height: 25,
          style: {
            background: '#6a4b5a',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '13px'
          }
        }, {
          xtype: 'datefield',
          value: new Date(),
          reference: 'dfDesde',
          itemId: 'dfDesde',
          width: 100,
          format: 'd/m/Y'
        }, {
          xtype: 'label',
          text: 'Fecha Hasta',
          padding: '5px 0 0 0',
          border: false,
          width: 100,
          height: 25,
          style: {
            background: '#6a4b5a',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '13px'
          }
        }, {
          xtype: 'datefield',
          value: new Date(),
          reference: 'dfHasta',
          itemId: 'dfHasta',
          width: 100,
          format: 'd/m/Y'
        }, {
          xtype: 'button',
          glyph: sisfacturaelectronica.util.Glyphs.getGlyph(
            'buscar'),
          tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
          handler: 'onClickBuscarAbastecimientoPorFechas'
        }, {
          xtype: 'label',
          text: 'Proveedor',
          padding: '5px 0 0 0',
          border: true,
          width: 100,
          height: 25,
          style: {
            background: '#775c80',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '13px'
          }
        },
        {
          xtype: 'combo',
          store: storeProveedores,
          itemId: 'cboProveedores',
          valueField: 'id',
          displayField: 'razonsocial',
          queryMode: 'local',
          flex: 1,
          width: 400,
          editable: false
        },
        {
          xtype: 'button',
          glyph: sisfacturaelectronica.util.Glyphs.getGlyph(
            'buscar'),
          tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
          handler: 'onClickBuscarAbastecimientoPorProveedor'
        }, {
          xtype: 'button',
          glyph: sisfacturaelectronica.util.Glyphs.getGlyph(
            'nuevo'),
          tooltip: 'Formulario de proveedor',
          handler: 'onClickFormularioProveedor',
          control: 'cboProveedores'
        },

      ]
    };

  },
  getPanelAbastecimiento: function (storeAbastecimiento) {
    return obj = {
      xtype: 'grid',
      itemId: 'gridAbastecimientos',
      reference: 'gridAbastecimientos',
      store: storeAbastecimiento,
      columnLines: true,
      sortableColumns: false,

      requires: [
        'Ext.grid.selection.SpreadsheetModel',
        'Ext.grid.plugin.Clipboard'
      ],
      emptyText: 'NO HAY REGISTROS PARA MOSTRAR SEGUN EL RANGO DE FECHAS',
      columns: [{
          text: 'Fecha Ingreso',
          dataIndex: 'feabastecimiento',
          flex: 1,
          align: 'center',
        },
        {
          text: 'Nombre / Razon Social',
          dataIndex: 'razonsocial',
          flex: 2
        },
        {
          text: 'Tipo Doc.',
          dataIndex: 'tipodoc',
          flex: 1
        },
        {
          text: 'Serie',
          dataIndex: 'serie',
          flex: 1
        },
        {
          text: 'Numero',
          dataIndex: 'numero',
          flex: 1
        },
        {
          text: 'Lote',
          dataIndex: 'lote',
          flex: 1
        },

        {
          xtype: 'widgetcolumn',
          width: 60,
          widget: {
            xtype: 'button',
            width: 60,
            glyph: 0xf044,
            //  handler: 'onClickEliminarCotizacion'

          }

        },
        {
          xtype: 'widgetcolumn',
          width: 60,
          widget: {
            xtype: 'button',
            width: 60,
            glyph: 0xf014,
            // handler: 'onClickEliminarCotizacion'

          }

        }
      ],
      dockedItems: [{
        xtype: 'pagingtoolbar',
        store: storeAbastecimiento, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
      }],

      listeners: {
        cellclick: 'onSelectedDetalleAbastecimiento'
      }


    };

  },
  getPanelDetalle: function (storeAbastecimientoDet) {
    return obj = {
      xtype: 'panel',
      layout: 'fit',
      collapseDirection: 'right',
      border: false,
      flex: 0.7,
      items: [{
        xtype: 'grid',
        reference: 'dgvAbastecimientoDetalle',
        itemId: 'dgvAbastecimientoDetalle',
        store: storeAbastecimientoDet,
        columnLines: true,
        sortableColumns: false,
        requires: [
          'Ext.grid.selection.SpreadsheetModel',
          'Ext.grid.plugin.Clipboard'
        ],
        features: [{
          ftype: 'summary'
        }],
        columns: [{
            text: 'Producto',
            dataIndex: 'nombre',
            flex: 2,
            align: 'left'
          }, {
            text: 'Precio',
            dataIndex: 'precio',
            flex: 0.5,
            align: 'right'
          }, {
            text: 'Cantidad',
            dataIndex: 'cantidad',
            flex: 0.5,
            align: 'right'
          }, {
            text: 'Total',
            dataIndex: 'total',
            flex: 0.5,
            align: 'right',
            summaryType: 'sum',
            summaryRendeder: function (value, summaryData, dataIndex) {
              return value;
            }
          }

        ]
      }]



    };
  }
});