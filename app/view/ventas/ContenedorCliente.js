Ext.define('sisfacturaelectronica.view.ventas.ContenedorCliente', {
  extend: 'Ext.panel.Panel',
  xtype: 'wContenedorCliente',
  itemId: 'wContenedorCliente',
  reference: 'wContendedorCliente',
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
  controller: 'acciones-contenedorclientes',
  initComponent: function () {
    me = this;
    Ext.apply(this, {
      items: [{
        id: 'clie-0',
        xtype: 'wRegCliente'
      },
      {
        id: 'clie-1',
        xtype: 'wFormClienteListado'
      },
      {
        id: 'clie-2',
        xtype: 'wListadoClienteCotizacion'
      },
      {
        id: 'clie-3',
        xtype: 'wListadoClienteFacturacion'
      }
      ],
      dockedItems: me.getBotonesERP()

    });
    this.callParent();
  },
  getBotonesERP: function () {
    return obj = [
      {
        xtype: 'toolbar',
        width: 150,
        dock: 'left',
        items: [
          {

            text: 'Todos',
            iconCls :'fa  fa-group  fa-2x',
            iconAlign:'top',
            itemId: 'btnClientes',
            scale: 'large',
            handler: 'onClickVerClientes'
          },
         
          {
            text: 'Nuevo',
            itemId: 'btnNuevoCliente',
            iconCls :'fa  fa-group  fa-2x',
            iconAlign:'top',
            scale: 'large',
            handler: 'onClickNuevoCliente'
          },
          {
            xtype: 'component',
            width: 130,
            height: 80,
            html: '<table>' +
              '<tr>' +
              '<td style="background-color:#6A4B5A;padding: 5px;color: #FFFFFF;width: 130px;">COTIZACIONES</td>' +
              '</tr>' +
              '<tr>' +
              '<td><div id="cliCotizaciones" style="color:#ffffff;font-size:50px;height: 60px;padding-top: 20px;padding-left: 40%;">0</div></td>' +
              '</tr>' +
              '</table>'
            ,
          },
          {
            xtype: 'button',
            text: 'VER COTIZACIONES',
            handler: 'onClickVerCotizaciones'
          },
          {
            xtype: 'component',
            width: 130,
            height: 80,
            html: '<table>' +
              '<tr>' +
              '<td style="background-color:#6A4B5A;padding: 5px;color: #FFFFFF;width: 130px;">FACTURACIÓN</td>' +
              '</tr>' +
              '<tr>' +
              '<td><div id="cliFacturacion" style="color:#ffffff;font-size:50px;height: 60px;padding-top: 20px;padding-left: 40%;">0</div></td>' +
              '</tr>' +
              '</table>'
            ,
          },
          
          {
            xtype: 'button',
            text: 'VER FACTIURACIÓN',
            itemId: 'btnFacturasBoletas',
            handler: 'onClickVerFacturacionCliente'
           }

        ]
      }

    ];
  }

});
