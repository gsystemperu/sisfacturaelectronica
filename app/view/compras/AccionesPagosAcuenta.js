Ext.define('sisfacturaelectronica.view.compras.AccionesPagosAcuenta', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-comprapagosacuenta',
    onClickIngresarNuevoPago:function(btn){
        __store = Ext.ComponentQuery.query('#dgvPagoAcuentaOC')[0].getStore();
        __data = {
          fecha : new Date(),
          pago  : 0
        };
        __store.insert(0,__data);

    },
    onClickEliminarPago:function(btn){
      __reg   = btn.getWidgetRecord();
      __store =  Ext.ComponentQuery.query('#dgvPagoAcuentaOC')[0].getStore();
      if(__reg){
          __store.remove(__reg);
          __store = Ext.ComponentQuery.query('#dgvPagoAcuentaOC')[0].getStore();
          __tot = 0;
          __store.each(function (record) {__tot = __tot + record.get('monto');});
          Ext.ComponentQuery.query('#lblTotalIngresado')[0].setText(__tot.toString());
      }
    },
    onClickGuardarPagoAcuenta:function(btn){
      __store    =  Ext.ComponentQuery.query('#dgvPagoAcuentaOC')[0].getStore();
      __view     =  this.getView();
      if(__store){
        __jsondata = [];
        __store.each(function(record)
        {
            if(record.get('monto')>0){
               __reg = {
                 "fecha": record.get('fecha'),
                 "monto": record.get('monto'),
                 "metodopago" : record.get('metodopago'),
                 "facprov" :  record.get('facprov'),
               };
               __jsondata.push(__reg);
            }
        });
        Ext.Ajax.request({
            url :sisfacturaelectronica.util.Rutas.ordenCompraIngresarPagoAcuenta,
            params:{
              idordencompra :  Ext.ComponentQuery.query('#idfactura')[0].getValue() ,
              jsondetalle   :  JSON.stringify(__jsondata)
             },
            success:function(response){
                  __data = Ext.JSON.decode(response.responseText);
                  if(__data.error!=0){
                    sisfacturaelectronica.util.Util.showToast('Registrado');
                    __view.close();
                    Ext.ComponentQuery.query('#gridOrdenesCompra')[0].getStore().reload();
                  }
            }
        });
      }
    },
    onEditorCalcularTotal: function (editor, e) {
      __monto = e.record.get('monto');
      e.record.set('monto', __monto.toFixed(2));
      this.onCalcularTotalPagoAcuenta();
    },
    onCalcularTotalPagoAcuenta: function () {
        __store = Ext.ComponentQuery.query('#dgvPagoAcuentaOC')[0].getStore();
        __tot = 0;
        __store.each(function (record) {__tot = __tot + record.get('monto');});
        Ext.ComponentQuery.query('#lblTotalIngresado')[0].setText(__tot.toString());


    },



});
