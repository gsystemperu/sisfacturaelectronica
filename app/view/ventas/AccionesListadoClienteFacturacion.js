Ext.define('sisfacturaelectronica.view.ventas.AccionesListadoClienteFacturacion', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.acciones-listadoclientefacturacion',
  onClickBuscarFechas: function () {
    g = this.lookupReference('dgvVentasFacturarCliente2').getStore();
    g.load({
      params: {
        idper : this.lookupReference('idclientefac').getValue(),
        vdesde : this.lookupReference('dfDesdeCotizacionesFactura').getValue(),
        vhasta : this.lookupReference('dfHastaCotizacionesFactura').getValue()
      }
    });
  },
 
  onClickSalir:function(){
    me =  Ext.ComponentQuery.query('#wContenedorCliente')[0]; 
    l = me.getLayout();
    l.setActiveItem(0);
  },
  //@@Reportes Cliente
  onClickImprimirCC:function(){
    var _record =  Ext.ComponentQuery.query('#dgvClientes')[0].getSelectionModel().getSelection()[0];
    if (_record) {
        __nombre = _record.get('nombreper');
        __id     = _record.get('idper');
        var objrpt = window.open( sisfacturaelectronica.util.Rutas.rptClienteImprimirPagosCC+ 'idper='+ __id+"&persona="+__nombre, "", "width=700,height=900");
        //setTimeout(function(){ objrpt.close(); }, 1000);
    } else {
        Ext.Msg.alert("SisFacturaElectronica", "Seleccionar al cliente para imprimir");
        return false;
    }

  },
  onClickImprimirListadoCC:function(){
    var _record =  Ext.ComponentQuery.query('#dgvClientes')[0].getSelectionModel().getSelection()[0];
    if (_record) {
        __nombre = _record.get('nombreper');
        __id     = _record.get('idper');
        var objrpt = window.open( sisfacturaelectronica.util.Rutas.rptClienteImprimirCC+ 'idper='+ __id+"&persona="+__nombre, "", "width=700,height=900");
        //setTimeout(function(){ objrpt.close(); }, 1000);
    } else {
        Ext.Msg.alert("SisFacturaElectronica", "Seleccionar al cliente para imprimir");
        return false;
    }

  },
  onClickIngresarPagoAcuenta:function(b){
    r = b.getWidgetRecord();
      console.log(r);
      Ext.widget('wPagosAcuenta', {
        codigo :r.get("idfacturacion"),
        nombre :r.get("nomcompleto") ,
        monto  :r.get("totalcoti")
      });
  }
});
