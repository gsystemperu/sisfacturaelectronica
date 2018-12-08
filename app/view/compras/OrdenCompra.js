Ext.define('sisfacturaelectronica.view.compras.OrdenCompra', {
  extend: 'Ext.panel.Panel',
  xtype: 'wOrdenCompra',
  alias: 'widget.wOrdenCompra',
  requires: [
    'Ext.layout.container.HBox',
    'Ext.container.ButtonGroup',
    'Ext.grid.column.*',
    'Ext.form.field.*',
    'Ext.panel.Panel',
    'sisfacturaelectronica.store.DataTemp',
    'sisfacturaelectronica.view.compras.AccionesOrdenCompra'
  ],
  layout: {
    type: 'fit',
    align: 'stretch'
  },
  bodyPadding: 0,
  defaults: {
    bodyPadding: 0,
    border: false
  },
  controller: 'acciones-ordencompra',
  initComponent: function () {
    storeAbastecimiento = Ext.create('sisfacturaelectronica.store.OrdenesCompras');
    storeProveedores = Ext.create('sisfacturaelectronica.store.Proveedores');
    storeAbastecimientoDet = Ext.create('sisfacturaelectronica.store.AbastecimientoDetalle');

    rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
      clicksToMoveEditor: 1,
      autoCancel: false
    });

    Ext.apply(this, {
      items: [{
          xtype: 'panel',
          flex: 1,
          margin: '0 3 0 0',
          layout: {
            type: 'vbox',
            align: 'stretch'
          },
          border: false,
          items: [
            this.getPanelToolBarAbastecimiento(storeProveedores),

            this.getPanelAbastecimiento(storeAbastecimiento)
          ],
       },
       // this.getPanelDetalle(storeAbastecimientoDet)
      ]
    });
    this.callParent();
  },
  getPanelToolBarAbastecimiento: function (storeProveedores) {
    return obj = {
      xtype: 'container',
      padding :5,
      layout: {
        type: 'hbox',
        align : 'stretch'
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
          itemId: 'dfDesdeOC',
          flex:1,
          format: 'd/m/Y',
          padding : '0 5 0 0'
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
          reference: 'dfHastaOC',
          itemId: 'dfHastaOC',
          flex:1,
          format: 'd/m/Y',
          padding : '0 5 0 0'
        }, {
          xtype: 'button',
          glyph: sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
          tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
          handler: 'onClickBuscarOrdenCompraPorFechas'
        }, {
          xtype: 'label',
          text: 'Proveedor',
          padding: '5px 0 0 0',
          border: true,
          width: 100,
          height: 25,
          style: {
            background: '#6a4b5a',
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
          flex:5,
          editable: true,
          padding : '0 5 0 0'
        },
         {
          xtype: 'button',
          glyph: sisfacturaelectronica.util.Glyphs.getGlyph(
            'buscar'),
          tooltip: 'Buscar Pedidos Por Proveedor',
          handler: 'onClickBuscarOrdenCompraPorProveedor'
        },
         {
          xtype: 'button',
          glyph: sisfacturaelectronica.util.Glyphs.getGlyph(
            'nuevo'),
          tooltip: 'Formulario de proveedor',
          handler: 'onClickFormularioProveedor',
          control: 'cboProveedores'
        }


      ]
    };

  },
  getPanelAbastecimiento: function (st) {
    return obj = {
      xtype: 'grid',
      flex:1,
      itemId: 'gridOrdenesCompra',
      reference: 'gridOrdenesCompra',
      store: st,
      columnLines: true,
      sortableColumns: false,
      requires: [
        'Ext.grid.selection.SpreadsheetModel',
        'Ext.grid.plugin.Clipboard'
      ],
      emptyText: 'NO HAY REGISTROS PARA MOSTRAR SEGUN EL RANGO DE FECHAS',
      columns: [
        {
          text: 'Fecha Orden',
          dataIndex: 'fordencompra',
          flex: 1,
          align: 'center',
        },
        {
          text: 'Código',
          dataIndex: 'occodigo',
          flex: 1
        },
        {
          text: 'Nombre / Razon Social',
          dataIndex: 'razonsocial',
          flex: 4
        },
       {
          text: 'Estado',
          dataIndex: 'estado',
          flex: 1.5,
          renderer:function(value,style){
              if(value == 'OC ANULADA'){
                  return '<strong style="color:red">'+value+'</strong>';
              }else{
                return value;
              }
          }
        },
        {
          xtype:'numbercolumn',
          text: 'Total',
          dataIndex: 'totalorden',
          align : 'right',
          flex: 1,
          format:'0.00'
        },
        {

          xtype:'numbercolumn',
          text: 'Acuenta',
          dataIndex: 'pagoacuenta',
          flex: 1,
          align : 'right',
          format:'0.00',
          
        },
        {

          xtype:'numbercolumn',
          text: 'Saldo',
          dataIndex: 'saldopagar',
          flex: 1,
          align : 'right',
          format:'0.00',
          renderer : function(value,style,record){

            if(record.get('pagoacuenta') == 0){
              n = 0;
              return n.toFixed(2);
            }else{
              return value;
            }
          }
        },
        {
          xtype: 'widgetcolumn',
          width: 60,
          widget: {
            xtype: 'button',
            width: 60,
            glyph: 0xf0d6,
            tooltip : 'Ingresar el documento de pago al proveedor',
            handler: 'onClickIngresarPagoAcuenta'
          }

        },
        {
          xtype: 'widgetcolumn',
          width: 60,
          widget: {
            xtype: 'button',
            width: 60,
            glyph: 0xf044,
            handler: 'onClickEditarOrdenCompra'
          }

        },
        {
          xtype: 'widgetcolumn',
          width: 60,
          widget: {
            xtype: 'button',
            width: 60,
            glyph: 0xf014,
             handler: 'onClickAnularOrdenCompra'

          }

        }
      ]
    };

  },
  /*getPanelDetalle: function (storeAbastecimientoDet) {
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
  */
});
