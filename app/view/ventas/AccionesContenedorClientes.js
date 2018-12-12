Ext.define('sisfacturaelectronica.view.ventas.AccionesContenedorClientes', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-contenedorclientes',
    init:function(){
      console.log('iniciado');
    },
    onClickNuevoCliente:function(btn){
      try {
        c = document.getElementById("cliCotizaciones");
        c.textContent = '0';
        f = document.getElementById("cliFacturacion");
        f.textContent = '0';
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
        c = document.getElementById("cliCotizaciones");
        c.textContent = '0';
        f = document.getElementById("cliFacturacion");
        f.textContent = '0';
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
      Ext.ComponentQuery.query('#idcliente')[0].setValue(r.get('idper'));
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
      var me =  Ext.ComponentQuery.query('#wContenedorCliente')[0];    
      var l = me.getLayout();
      l.setActiveItem(3);
      r = Ext.ComponentQuery.query('#dgvClientes')[0].getSelectionModel().getSelection()[0];
      s = Ext.ComponentQuery.query('#dgvVentasFacturarCliente2')[0].getStore();
      Ext.ComponentQuery.query('#idclientefac')[0].setValue(r.get('idper'));
      if(r){
        s.load({
          params:{
            idper :r.get('idper')
          }
        })
      }
    },
    
  });
