Ext.define('sisfacturaelectronica.view.ventas.AccionesContenedorClientes', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-contenedorclientes',
    init:function(){
      console.log('iniciado');
    },
    onClickNuevoCliente:function(btn){
      try {
        var me =  Ext.ComponentQuery.query('#wContenedorCliente')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(1);
        Ext.ComponentQuery.query('#wFormClienteListado')[0].reset();
      } catch (e) {
        console.log('Nuevo Cliente');
      }
    },
    onClickVerClientes:function(btn){
      try {
        var me =  Ext.ComponentQuery.query('#wContenedorCliente')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(0);
        this.onClickRefrescarListado();

      } catch (e) {
        console.log("Ver clientes");
      }
    },
    onClickVerCotizaciones:function(){
      me =  Ext.ComponentQuery.query('#wContenedorCliente')[0];    //this;
      l = me.getLayout();
      l.setActiveItem(2);
      s = Ext.ComponentQuery.query('#dgvVentas')[0].getStore();
      r = Ext.ComponentQuery.query('#dgvClientes')[0].getSelectionModel().getSelection()[0];
      s.load({
        params : {
          vIdper : r.get('idper')
        }
      });
    },
    onClickRefrescarListado: function () {
        _store = Ext.ComponentQuery.query('#dgvClientes')[0].getStore();
        _store.load(1);
    },
    onClickImprimirPDFCotizacion:function(){
       console.log("test");
    },
    onClickVerFacturacionCliente:function(){
      var me =  Ext.ComponentQuery.query('#wContenedorCliente')[0];    //this;
      var l = me.getLayout();
      l.setActiveItem(3);

      __registro = Ext.ComponentQuery.query('#dgvClientes')[0].getSelectionModel().getSelection()[0];
      __store    = Ext.ComponentQuery.query('#dgvVentasFacturarCliente2')[0].getStore();
      if(__registro){
        __store.load({
          params:{
            idper :__registro.get('idper')
          }
        })
      }
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

    }
  });
