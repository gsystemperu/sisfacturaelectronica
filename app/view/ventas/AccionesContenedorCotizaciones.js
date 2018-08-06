Ext.define('sisfacturaelectronica.view.ventas.AccionesContenedorCotizaciones', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-contenedorcotizaciones',
    requires:['sisfacturaelectronica.util.Rutas'],
    init:function(){
      console.log('iniciado');
    },
    onClickIngresarCotizacion:function(btn){
      try {
        var me =  Ext.ComponentQuery.query('#wContenedorCotizaciones')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(1);
        Ext.ComponentQuery.query('#frmRegCotizacion')[0].reset();
        Ext.ComponentQuery.query('#dgvDetalleVenta')[0].getStore().removeAll();
      } catch (e) {
        console.log('Ingresar Cotizaciones');
      }

    },
    onClickVerCotizaciones:function(btn){
      try {
        var me =  Ext.ComponentQuery.query('#wContenedorCotizaciones')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(0);
        this.onClickRefrescarListadoCotizaciones();
      } catch (e) {
        console.log("Ver cotizaciones");
      }

    },
    onClickRefrescarListadoCotizaciones: function () {
        _store = Ext.ComponentQuery.query('#dgvVentasCotizaciones')[0].getStore();
        _store.load(1);
    },
    onClickImprimirPDFCotizacion: function (btn) {
        var _record =  Ext.ComponentQuery.query('#dgvVentasCotizaciones')[0].getSelectionModel().getSelection()[0];
        if (_record) {
            var objrpt = window.open( sisfacturaelectronica.util.Rutas.imprimirProforma+ 'id='+ _record.get('vid'), "", "width=700,height=900");
            //setTimeout(function(){ objrpt.close(); }, 1000);
        } else {
            Ext.Msg.alert("AkinetFarma", "Seleccionar la cotizacion para imprimir");
            return false;
        }

    },
    onClickConfirmarCotizacion:function(btn){
      me = this;
      var _record =  Ext.ComponentQuery.query('#dgvVentasCotizaciones')[0].getSelectionModel().getSelection()[0];
      if (_record) {
         me.getView().mask('..... confirmando datos');
          Ext.Ajax.request({
            url :sisfacturaelectronica.util.Rutas.confirmarVentaCotizacion,
            params:{
              idcoti : _record.get('vid')
            },
            success:function(response){
                var text =response.responseText;
                me.getView().unmask();
                Ext.ComponentQuery.query('#dgvVentasCotizaciones')[0].getStore().reload();
                storeDet = Ext.ComponentQuery.query('#dgvDetalleCotizacion')[0].getStore();
                _storeDet.getProxy().extraParams = {vIdCotizacion: 0};_storeDet.load(1);
            }
          });
      } else {
          Ext.Msg.alert("AkinetFarma", "Tiene que seleccionar la cotización para confirmar esta venta!");
          return false;
      }


    },
    onClickVisorClienteCotizaciones: function (btn) {
       /* var _record = this.lookupReference('dgvVentas').getSelectionModel().getSelection()[0];
        if (_record) {
            config = {
                cli: _record.get('idper'),
                nombre: _record.get('nomcompleto'),
                dire: _record.get('domiciper')
            };*/

            var _win = Ext.create('sisfacturaelectronica.view.ventas.VisorClienteCotizacion');
            _win.show(btn, function () {}, this);
        /*} else {
            Ext.Msg.alert("Error", "Tiene que seleccionar un cliente");
            return false;
        }*/
    },
    onClickVisorProductoCotizaciones: function (btn) {
       /* var _record = this.lookupReference('dgvVentas').getSelectionModel().getSelection()[0];
        if (_record) {
            config = {
                cli: _record.get('idper'),
                nombre: _record.get('nomcompleto'),
                dire: _record.get('domiciper')
            };
*/
            var _win = Ext.create('sisfacturaelectronica.view.ventas.VisorProductoCotizacion');
            _win.show(btn, function () {}, this);
        /*} else {
            Ext.Msg.alert("Error", "Tiene que seleccionar un cliente");
            return false;
        }*/
    },
    onClickVisorVendedorCotizaciones: function (btn) {
        /*var _record = this.lookupReference('dgvVentas').getSelectionModel().getSelection()[0];
        if (_record) {
            config = {
                cli: _record.get('idper'),
                nombre: _record.get('nomcompleto'),
                dire: _record.get('domiciper')
            };*/

            var _win = Ext.create('sisfacturaelectronica.view.ventas.VisorVendedorCotizacion');
            _win.show(btn, function () {}, this);
        /*} else {
            Ext.Msg.alert("Error", "Tiene que seleccionar un cliente");
            return false;
        }*/
    },
    onClickEnviarCotizacion:function(btn){
        var _record =  Ext.ComponentQuery.query('#dgvVentasCotizaciones')[0].getSelectionModel().getSelection()[0];
        if(_record){
          Ext.Ajax.request({
              url : sisfacturaelectronica.util.Rutas.cotizacionEnviarMail,
              params:{
                id :_record.get('vid')
              },
              success:function(response){
                 var text = Ext.JSON.encode(response.responseText);
                 console.log(text);
              }
          });

        }
    }
    

});
