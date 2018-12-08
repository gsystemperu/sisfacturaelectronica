
Ext.define('sisfacturaelectronica.view.almacen.ContenedorInventario', {
  extend: 'Ext.panel.Panel',
  xtype: 'wContenedorInventario',
  itemId: 'wContenedorInventario',
  requires: [
    'Ext.layout.container.Card',
    'sisfacturaelectronica.util.Rutas',
    'sisfacturaelectronica.view.almacen.ContenedorInventarioController'
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
  controller: 'almacen-contenedorinventario',
  initComponent: function () {
    me = this;
    Ext.apply(this,
      {
        items: [
          {
            xtype: 'wListadoInventario'
          },
          {
            xtype: 'wRegInventarioInicial',
          },
          {
            xtype:'wRegInventarioInicialEditar'
          }
          
        ],
        tbar: me.getBotonesERP()

      });
    this.callParent();
  },
  getBotonesERP: function () {
    return obj = [
      {
        text: 'CREAR',
        handler: "onClickCrearInventario",
      },
      {
        text: 'EDITAR',
        handler: "onClickEditarInventario",
      },
      {
        text: 'IMPRIMIR LISTADO',
        handler: "onClickImprimirStockInventario",
      },
      '->',
      {
        text   : 'CONFIRMAR INVENTARIO',
        itemId :'btnConfInventario',
        hidden:true,
        handler:'onClickConfirmarInventario'
      }
      

    ];
  }
});
