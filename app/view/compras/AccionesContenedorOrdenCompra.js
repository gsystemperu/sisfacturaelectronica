Ext.define('sisfacturaelectronica.view.compras.AccionesContenedorOrdenCompra', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-contenedoordencompra',
    requires: [
        'sisfacturaelectronica.util.Rutas'
    ],
    onClickIngresar:function(){
        try {
          var me =  Ext.ComponentQuery.query('#wContenedorOrdenCompra')[0];    //this;
          var l = me.getLayout();
          l.setActiveItem(1);
          Ext.ComponentQuery.query('#frmOrdenCompra')[0].reset();
          Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore().removeAll();
        } catch (e) {
          console.log('Ingresar Orden Compra');
        }
    },
   
    onClickConfirmarOrdenCompra:function(){
      var _grid = Ext.ComponentQuery.query('#gridOrdenesCompra')[0];
      var _rec = _grid.getSelectionModel().getSelection()[0];
      me = this;
      if (_rec) {
          Ext.Ajax.request({
              url: sisfacturaelectronica.util.Rutas.ordenCompraConfirmar,
              params: {
                  id: _rec.get('id')
              },
              success: function (response) {
                  var _error = Ext.JSON.decode(response.responseText);
                  if (_error.error != 0) {
                      _grid.getStore().reload();
                      //me.lookupReference('gridOrdenesCompra').getStore().reload();
                  }
              }
          });
      }
    },

    onClickEnviarOrdenCompra:function(btn){
        r =  Ext.ComponentQuery.query('#gridOrdenesCompra')[0].getSelectionModel().getSelection()[0];
        if(r){
          Ext.Ajax.request({
              url : sisfacturaelectronica.util.Rutas.cotizacionEnviarMail,
              params:{
                id :r.get('id')
              },
              success:function(response){
                 r = JSON.parse(response.responseText);
                 if(r.error){
                    Ext.toast('Correo enviado el proveedor', 'AkinetFarma', 'br')
                 }else{
                    Ext.toast('No enviado, revise los datos de correo del proveedor', 'AkinetFarma', 'br') 
                 }
              }
          });

        }
    },

    onClickImprimirPdfOrdenCompra: function (btn) {
        r =  Ext.ComponentQuery.query('#gridOrdenesCompra')[0].getSelectionModel().getSelection()[0];
        if (r) {
            objrpt = window.open( sisfacturaelectronica.util.Rutas.ordenCompraPdf+ '?id='+ r.get('id') , "", "width=700,height=900");
            //setTimeout(function(){ objrpt.close(); }, 1000);
        } else {
            Ext.Msg.alert("AkinetFarma", "Seleccionar la orden de compra para imprimir");
            return false;
        }

    },
    onClickActualizarLista:function(b){
        Ext.ComponentQuery.query('#gridOrdenesCompra')[0].getStore().load();
    }

});
