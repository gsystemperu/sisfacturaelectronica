Ext.define('sisfacturaelectronica.view.ventas.ContenedorCliente', {
  extend: 'Ext.panel.Panel',
  xtype: 'wContenedorCliente',
  itemId : 'wContenedorCliente',
  reference : 'wContendedorCliente',
  requires: [
    'Ext.layout.container.Card',
    'sisfacturaelectronica.util.Rutas',
    'sisfacturaelectronica.view.ventas.FormCliente',
    'sisfacturaelectronica.view.ventas.AccionesContenedorClientes'
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
  controller :'acciones-contenedorclientes',
  initComponent: function () {
    me = this;
    Ext.apply(this, {
      items: [{
        id: 'clie-0',
        xtype: 'wRegCliente'
      },
      {
        id: 'clie-1',
        xtype:'wFormClienteListado'
      },
      {
        id: 'clie-2',
        xtype:'wListadoClienteCotizacion'
      },
      {
        id :'clie-3',
        xtype:'wListadoClienteFacturacion'
      }
    ],
    tbar: me.getBotonesERP()

    });
    this.callParent();
  },
  getBotonesERP:function(){
    _cotizaciones = 0;
    _txt1 = Ext.String.format('Pedidos  : {0}',_cotizaciones);
    _documentos = 0;
    _txt2 = Ext.String.format('Facturación  : {0}',_documentos);

    return obj = [
      {

       text : 'Clientes',
       iconCls :'fa  fa-cubes  fa-2x',
       textAlign :'right',
       iconAlign:'left',
       scale :'large',
       itemId:'btnClientes',
       handler:'onClickVerClientes'
        },
        {

         text : 'Nuevo',
         iconCls :'fa  fa-cubes  fa-2x',
         textAlign :'right',
         iconAlign:'left',
         scale :'large',
         itemId:'btnNuevoCliente',
         handler:'onClickNuevoCliente'
          },
        {

         text : _txt1,
         iconCls :'fa  fa-cubes  fa-2x',
         textAlign :'right',
         iconAlign:'left',
         scale :'large',
         itemId:'btnCotizaciones',
         handler:'onClickVerCotizaciones'
       },
       {
         text : _txt2,
         iconCls :'fa  fa-cubes  fa-2x',
         textAlign :'right',
         iconAlign:'left',
         scale :'large',
         itemId:'btnFacturasBoletas',
         handler :'onClickVerFacturacionCliente'

       }
    ];
  }

});
