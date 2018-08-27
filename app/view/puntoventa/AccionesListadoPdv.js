Ext.define('sisfacturaelectronica.view.puntoventa.AccionesListadoPdv', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-listadopdv',
    requires:['sisfacturaelectronica.util.Rutas'],
    init:function(){},
    onClickIngresarPagoAcuentaPdv:function(btn){
      __rec = btn.getWidgetRecord();
      Ext.widget('wPagosAcuentaPdv', {
        codigo :__rec.get("idfacturacion"),
        nombre :__rec.get("nomcompleto") ,
        monto  :__rec.get("totalcoti")
      });
    },
    onClickEliminarPagoAcuentaPdv:function(btn){
        
    },
    onClickVisualizarVenta:function(btn){
      r  = Ext.ComponentQuery.query('#dgvVentasFacturarPdv')[0].getSelectionModel().getSelection()[0];
      if(r){
        var objrpt = window.open( sisfacturaelectronica.util.Rutas.rptVisualizarNota+ 
        'id='+ r.get('idfacturacion'), "", "width=700,height=900");
      }
    },
    onClickImprimirComprobante:function(btn){
      r  = Ext.ComponentQuery.query('#dgvVentasFacturarPdv')[0].getSelectionModel().getSelection()[0];
      if(r){
        /*switch (r.get('tipodoc')) {
          case 'BOL':objrpt = window.open( sisfacturaelectronica.util.Rutas.rptImprimirNota+ 'id='+ r.get('idfacturacion'), "", "width=700,height=900");break;
          case 'FAC':objrpt = window.open( sisfacturaelectronica.util.Rutas.rptImprimirNota+ 'id='+ r.get('idfacturacion'), "", "width=700,height=900");break;
          case 'NOT':objrpt = window.open( sisfacturaelectronica.util.Rutas.imprimirTicket+ 'id='+ r.get('idfacturacion'), "", "width=700,height=900");break;
        }*/
        window.open(sisfacturaelectronica.util.Rutas.imprimirTicket+ 
          'id='+ r.get('idfacturacion'), "", "width=700,height=900");
      }
    },
    onClickBuscarCotizacionesPorFechas:function(){
        d=this.lookupReference('dfDesde').getRawValue();
        h=this.lookupReference('dfHasta').getRawValue();
        s=Ext.ComponentQuery.query('#dgvVentasFacturarPdv')[0].getStore();
        s.load({
          params:{
            desde : d,
            hasta : h
          }
        });
    },
    onClickImprimirListado:function(b){
       d=this.lookupReference('dfDesde').getRawValue();
       h=this.lookupReference('dfHasta').getRawValue();
       var objrpt = window.open( sisfacturaelectronica.util.Rutas.listadoVentas+ 
        '?desde='+ d.toString() +'&hasta='+ h.toString(), "", "width=700,height=900");
    },
    onClickCierreCaja:function(b){
      Ext.Msg.confirm('SisFacturaElectronica', 'Este procedimiento bloqueara las ventas y no se podran anular, desea continuar?',
      function (choice) {
          if (choice === 'yes') {
            g = Ext.ComponentQuery.query('#dgvVentasFacturarPdv')[0]
            console.log(sisfacturaelectronica.Global.usuario);
            data = {};
            sisfacturaelectronica.util.Util.ajax(sisfacturaelectronica.util.Rutas.cerrarCaja,data,g.getStore());
          }
      });
    },
    onClickResumenticketera:function(b){
      window.open( sisfacturaelectronica.util.Rutas.cierreVentasTicketera+ '?usuario='+ sisfacturaelectronica.util.Data.usuario);
      }
});
