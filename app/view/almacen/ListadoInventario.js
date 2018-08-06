Ext.define('sisfacturaelectronica.view.almacen.ListadoInventario',{
    extend: 'Ext.panel.Panel',
    xtype: 'wListadoInventario',
    alias: 'widget.wListadoInventario',
    requires: [
      'Ext.layout.container.HBox',
      'sisfacturaelectronica.view.almacen.ListadoInventarioController',
      'Ext.grid.*',
      'Ext.form.field.*',
      'Ext.grid.plugin.*'
    ],
    layout: {
      type: 'hbox',
      pack: 'start',
      align: 'stretch'
    },
    bodyPadding: 2,
    defaults: {
      frame: false,
      bodyPadding: 0
    },
    controller: 'almacen-listadoinventario',
    initComponent: function () {
      var st = Ext.create('sisfacturaelectronica.store.InventarioRegistros');
      var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

      me = this;
      Ext.apply(this, {
        items: [{
            flex: 3,
            margin: '0 3 0 0',
            layout: 'fit',
            items: [
              {
              xtype: 'grid',
              itemId: 'dgvInvReg',
              reference: 'dgvInvReg',
              store: st ,
              sortableColumns: false,
              plugins: [rowEditing],
              plugins: {
                ptype: 'cellediting',
                clicksToEdit: 1
            },
              selModel: 'cellmodel',
              columns: [
                {
                    text: 'Referencia',
                    dataIndex: 'referencia',
                    flex: 2,
                    align: 'left'
                  },
                {
                    xtype:'datecolumn',
                  text: 'Fecha inventario',
                  dataIndex: 'fechainventario',
                  flex: 1,
                  align: 'left'
                },
                {
                  text: 'Estado',
                  dataIndex: 'estado',
                  flex: 1,
                  align: 'left'
                },
                {
                    xtype: 'widgetcolumn',
                    width: 60,
                    widget: {
                      xtype: 'button',
                      width: 60,
                      glyph: 0xf014,
                      tooltip : 'Anular inventario',
                       handler: 'onClickInventarioAnular'
          
                    }
          
                  }
               
              ],
              tbar: [
                {
                    xtype: 'label',
                    text :'Registro de Inventarios',
                    itemId: 'lblTituloProducto',
                    padding :'5 5 5 5',
                    style: {
                      color: '#775c80',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '23px'
                    },
                    flex: 1
                  },
                  
  
              ]
            }]
          },
  
        ]
      });
      this.callParent();
    },
 
  });
  