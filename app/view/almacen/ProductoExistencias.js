Ext.define('sisfacturaelectronica.view.almacen.ProductoExistencias', {
  extend: 'Ext.form.Panel',
  xtype: 'wProductosExistencias',
  alias: 'widget.wProductosExistencias',
  requires: [
    'Ext.layout.container.HBox',
    'Ext.container.ButtonGroup',
    'Ext.grid.column.*',
    'Ext.form.field.*',
    'Ext.panel.Panel',
    'sisfacturaelectronica.store.DataTemp',
    'sisfacturaelectronica.view.almacen.AccionesProducto',
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
  controller: 'acciones-producto',
  initComponent: function () {
    var storeProductoExistencias = Ext.create('sisfacturaelectronica.store.ProductoExistencias');
    Ext.apply(this, {
      items: [
        this.getDatosDelProducto(),
        this.getPanelDetalle(storeProductoExistencias)
      ]
    });
    this.callParent();

  },
  getDatosDelProducto: function () {
    return obj = {
      xtype: 'panel',
      frame: false,
      defaultType: 'textfield',
      layout: 'hbox',
      padding: 5,
      bodyPadding: 5,
      defaults: {
        labelWidth: 150,
        labelAlign: 'right'
      },
      items: [
        {
            xtype: 'label',
            itemId : 'lblNombreProducto',
            padding: '5px 5px 5px 5px',
            border: false,
            flex: 1,
            height : 25,
            style: {
              color: '#775c80',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: '15px'
            }
          }
         
      ]
    };
  },
  getPanelDetalle: function (storeProductoExistencias) {
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
      clicksToMoveEditor: 1,
      autoCancel: false
    });

    return obj = {
      xtype: 'panel',
      layout: 'fit',
      itemId: 'panCargando',
      border: false,
      flex: 0.7,
      items: [{
        xtype: 'grid',
        reference: 'dgvProductoExistencias',
        itemId: 'dgvProductoExistencias',
        store: storeProductoExistencias,
        columnLines: true,
        sortableColumns: false,
        selModel: 'rowmodel',
        features: [{
          id: 'group',
          ftype: 'groupingsummary',
          groupHeaderTpl: 'Fecha Vencimiento : {name} ,   Stock a mano: ( {rows.length} )',
          hideGroupedHeader: true,
          enableGroupingMenu: true,
          startCollapsed: true
        }],
        columns: [
          {
            text: 'Fecha Ingreso',
            dataIndex: 'fechaingreso',
            flex: 0.5,
            align: 'center',
            //locked   : true,
          },
          {
            text: 'Proveedor',
            dataIndex: 'razonsocial',
            flex: 1.5,
            align: 'left',
            //locked   : true,
          },
          {
            text: 'Estado',
            dataIndex: 'estado',
            //lockable: false,
            flex: 0.8,
            align: 'left',
            renderer: function (value, metaData, record)
            {
               switch (value) {
                 case 'VENDIDO':
                    metaData.style = "color:red;fontSize:13px;";
                 break;
                 default:
                    metaData.style = "fontSize:13px;";

               }
               return value;
             }
          },
          {
            text: 'Guia Ingreso',
            dataIndex: 'numeroguia',
            flex: 0.5,
            align: 'right'
          },
         {
            text: 'Nro. Lote',
            dataIndex: 'numerolote',
            flex: 0.5,
            align: 'right'
          },
          {
            text: 'Vencimiento',
            dataIndex: 'vencimiento',
            flex: 0.5,
            align: 'center'
          },
          {
            text: 'Presentacion',
            dataIndex: 'presentacion',
            flex: 1,
            align: 'center'
          },

          {
            xtype:'numbercolumn',
            text: 'Stock Dosis',
            dataIndex: 'cantidaddosis',
            flex: 0.5,
            align: 'center',
            hidden:true,
            renderer: function (value, metaData, record)
            {metaData.style = "background-color:#F7F8E0;fontSize:13px;";return value;}
          },
          {
            xtype:'numbercolumn',
            text: 'Stock (Kg)',
            dataIndex: 'cantidadkilos',
            flex: 0.5,
            align: 'center',
            hidden:true,
            renderer: function (value, metaData, record)
            {metaData.style = "background-color:#F7F8E0;fontSize:13px;";return  value;}
          },

          {
            xtype:'numbercolumn',
            text: 'Stock (g)',
            dataIndex: 'cantidadgramo',
            flex: 0.5,
            hidden:true,
            align: 'center',
            renderer: function (value, metaData, record)
            {metaData.style = "background-color:#F7F8E0;fontSize:13px;";return value;}
          },
          {
            xtype:'numbercolumn',
            text: 'X (Unidad)',
            dataIndex: 'cantidadunidad',
            flex: 0.5,
            hidden:false,
            align: 'center',
            renderer: function (value, metaData, record)
            {metaData.style = "background-color:#00AF88;fontSize:13px;color:#ffffff;font-size:15px;";return value;}
          },


          {
           xtype: 'widgetcolumn',
           flex: 0.5,
           widget: {
             xtype: 'button',
             flex: 1,
             glyph: 0xf014,
             tooltip : 'Opcion para eliminar una existencia en el almacen.',
             handler: 'onClickEliminarProductoSerie'

           }

         },
         {
          xtype: 'widgetcolumn',
          flex: 0.5,
          widget: {
            xtype: 'button',
            flex: 1,
            glyph: 0xf021,
            tooltip : 'Opcion para editar la cantidad unitaria de (caja).',
            handler: 'onClickEditarProductoSerie'

          }

        }
        ],

      }]



    };
  }
});
