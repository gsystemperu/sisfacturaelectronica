Ext.define('sisfacturaelectronica.view.compras.ContenedorGuias', {
  extend: 'Ext.panel.Panel',
  xtype: 'wContenedorGuias',
  itemId: 'wContenedorGuias',
  alias: 'widget.wContenedorGuias',
  reference: 'wContendedorGuias',
  requires: [
    'Ext.layout.container.Card',
    'sisfacturaelectronica.view.compras.AccionesContenedorGuias',
    'sisfacturaelectronica.view.compras.IngresoGuia',
    'sisfacturaelectronica.util.Rutas'
  ],
  layout: {
    type: 'card',
    align: 'stretch',
    deferredRender: true,
  },
  bodyPadding: 0,
  defaults: {
    bodyPadding: 0,
    border: false
  },
  defaultListenerScope: true,
  controller: 'acciones-contenedorguias',
  initComponent: function () {
    Ext.apply(this, {
      items: [{
        id: 'guia-0',
        xtype: 'wGuiasEntrada'

      }, {
        id: 'guia-1',
        xtype: 'wIngresoGuia'

      }
      ],
      tbar: [
        {
          itemId: 'card-list',
          text: 'LISTAR',
          handler : function(){
            Ext.ComponentQuery.query('#gridOrdenesCompraConfir')[0].getStore().reload();
          }
        },  
      ],
    });
    this.callParent();
  }
});
