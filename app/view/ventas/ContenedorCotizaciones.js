Ext.define('sisfacturaelectronica.view.ventas.ContenedorCotizaciones', {
  extend: 'Ext.panel.Panel',
  xtype: 'wContenedorCotizaciones',
  itemId : 'wContenedorCotizaciones',
  requires: [
    'Ext.layout.container.Card',
    'sisfacturaelectronica.util.Rutas',
    'sisfacturaelectronica.view.ventas.AccionesContenedorCotizaciones',
    'sisfacturaelectronica.view.ventas.RegistrarCotizacion'
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
  controller :'acciones-contenedorcotizaciones',
  initComponent: function () {
    me = this;
    Ext.apply(this,
    {
      items: [
      {
        id: 'coti-0',
        xtype: 'wListadoCotizaciones'
      },
      {
        id: 'coti-1',
        xtype:'wRegistrarCotizacion',


      }
    ],
    tbar: me.getBotonesERP()

    });
    this.callParent();
  },
  getBotonesERP:function(){
    return obj = [
          {
              text: 'TODOS',
              itemId: 'btnVerCotizaciones',
              handler: "onClickVerCotizaciones",
          },
          {
              text: 'CREAR',
              itemId: 'btnIngresarCotizacion',
              handler: "onClickIngresarCotizacion",
          },
          {
                  text: 'IMPRIMIR',
                  itemId : 'btnImprimirCotizacion',
                  handler: "onClickImprimirPDFCotizacion",
          },
          {
                  text: 'CONFIRMAR Y CREAR FACTURA',
                  itemId : 'btnConfirmarCotizacion',
                  handler: "onClickConfirmarCotizacion",
          }
    ];
  }
});
