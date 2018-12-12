Ext.define('sisfacturaelectronica.view.ventas.AccionesListadoClienteCotizacion', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.acciones-listadoclientecotizacion',
  onClickBuscarFechas: function () {
    g = this.lookupReference('dgvVentas').getStore();
    g.load({
      params: {
        vIdper : this.lookupReference('idcliente').getValue(),
        vDesde : this.lookupReference('dfDesdeCotizacionesCliente').getValue(),
        vHasta : this.lookupReference('dfHastaCotizacionesCliente').getValue()
      }
    });
  },
  onSelectedDetalleCotizacion: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    me = this;
    g = me.lookupReference('dgvDetalleCotizacionCliente');
    s = g.getStore();
    s.getProxy().extraParams = {
      vIdCotizacion: record.get('idcoti')
    };
    s.load(1);
  },
  onClickSalir:function(){
    me =  Ext.ComponentQuery.query('#wContenedorCliente')[0]; 
    l = me.getLayout();
    l.setActiveItem(0);
  }
});
