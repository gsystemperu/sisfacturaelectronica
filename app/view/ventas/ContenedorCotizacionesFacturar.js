Ext.define('sisfacturaelectronica.view.ventas.ContenedorCotizacionesFacturar', {
  extend: 'Ext.panel.Panel',
  xtype: 'wContenedorCotizacionesFacturar',
  itemId : 'wContenedorCotizacionesFacturar',
  requires: [
    'Ext.layout.container.Card',
    'sisfacturaelectronica.util.Rutas',
    'sisfacturaelectronica.view.ventas.AccionesContenedorCotizacionesFacturar'
  ],
  layout: {
    type: 'card',
    align: 'stretch',
    //deferredRender: true,
  },
  bodyPadding: 0,
  defaults: {
    bodyPadding: 0,
    border: false
  },
  controller :'acciones-contenedorcotizacionesfacturar',
  initComponent: function () {
    me = this;
    Ext.apply(this,
    {
      items: [
      {
        xtype: 'wListadoCotizacionesFacturar'
      },
      {
         xtype: 'wRegistrarFacturaBoleta'
      },
      {
        xtype:'wGuiaRemision'
      },
      {
        xtype:'wVisualizarCotizacionFacturar'
      },
      {
         xtype:'wRegistroCotizacionFacturar'
      },
      {
         xtype:'wRegistrarNota'
      }
    ],
    tbar: me.getBotonesERP()

    });
    this.callParent();
  },
  getBotonesERP:function(){
    return obj = [
          {
              text: 'NUEVO',
              handler: "onClickCrearCotizacionFactura",
          },
          {
            text: 'CREAR FACTURA DE COTIZACION',
            handler: "onClickCrearCotizacionFactura2",
          },
          {
            text: 'CREAR NOTA',
            handler: "onClickCrearNota",
          },
          {
            text :'IMPRIMIR',
            handler : 'onClickDocumentoImprimir'
          },
          {
            text :'CREAR GUIA DE REMISIÓN',
            handler:'onClickGuiasRemision'
          },
          {
            text :'IMPRIMIR GUIA DE REMISIÓN',
            handler:'onClickGuiasRemisionImpresion'
          },
          {
            text :'PUBLICAR WEB',
            handler:'onClickEnviarSunatFacturas'
          },
         /* '->',
          {
            text :'IMPRIMIR LISTADO',
            handler:'onClickReporteVentas'
          }*/
    ];
  }
});
