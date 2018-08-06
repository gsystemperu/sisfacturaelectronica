Ext.define('sisfacturaelectronica.view.almacen.ListadoGenericos',{
    extend: 'Ext.panel.Panel',
    xtype: 'wListadoGenericos',
    alias: 'widget.wListadoGenericos',
    requires: [
      'Ext.layout.container.HBox',
      'Ext.grid.*',
      'Ext.form.field.*',
      'Ext.grid.plugin.*'
    ],
    layout: {
      type: 'hbox',
      pack: 'start',
      align: 'stretch'
    },
    defaults: {
      frame: false,
      bodyPadding: 0
    },
    //controller: 'puntoventa-listadogenericos',
    initComponent: function () {
      var st = Ext.create('sisfacturaelectronica.store.ProductosGenericos');
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
              title : 'Genericos del producto',
              itemId: 'dgvProdGenericos',
              reference: 'dgvProdGenericos',
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
                    text: 'Producto',
                    dataIndex: 'nombregenerico',
                    flex: 2,
                    align: 'left'
                  },
                {
                  xtype:'numbercolumn',
                  text: 'A mano',
                  dataIndex: 'existencias',
                  flex: 1,
                  align: 'left'
                },
                {
                  text: 'Precio',
                  dataIndex: 'precioventa',
                  flex: 1,
                  align: 'left'
                }
               
              ]
            }]
          },
  
        ]
      });
      this.callParent();
    },
 
  });
  