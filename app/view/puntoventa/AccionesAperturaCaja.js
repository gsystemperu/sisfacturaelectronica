Ext.define('sisfacturaelectronica.view.puntoventa.AccionesAperturaCaja', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-aperturacaja',
    requires:['sisfacturaelectronica.util.Rutas'],
    init:function(){},
    onClickEliminarPago:function(btn){
        __reg   = btn.getWidgetRecord();
        __me    = this;
        __store =  Ext.ComponentQuery.query('#dgvPagoAcuenta')[0].getStore();
        if(__reg){
            __store.remove(__reg);
            __store = Ext.ComponentQuery.query('#dgvPagoAcuenta')[0].getStore();
            __tot = 0;
            __store.each(function (record) {__tot = __tot + record.get('monto');});
            Ext.ComponentQuery.query('#lblTotalIngresado')[0].setText(__tot.toString());
        }
      },
      onClickGuardarAperturaCaja:function(btn){
        __store    =  Ext.ComponentQuery.query('#dgvAperturaCaja')[0].getStore();
        __view     =  this.getView();
        if(__store){
          __jsondata = [];
          __store.each(function(record)
          {
              if(record.get('monto')>0){
                 __reg = {
                   "id": record.get('id'),
                   "monto": record.get('monto')
                 };
                 __jsondata.push(__reg);
              }
          });
          Ext.Ajax.request({
              url :sisfacturaelectronica.util.Rutas.apeturaCajaInsertar,
              params:{
                id : 0 ,
                comentario : Ext.ComponentQuery.query('#txtAperturaCajaComentario')[0].getValue() ,
                jsondetalle  :  JSON.stringify(__jsondata)
               },
              success:function(response){
                    __data = Ext.JSON.decode(response.responseText);
                    if(__data.error!=0){
                      sisfacturaelectronica.util.Util.showToast('Registrado');
                      __view.close();
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
          __store = Ext.ComponentQuery.query('#dgvAperturaCaja')[0].getStore();
          __tot = 0;
          __store.each(function (record) {
              __tot = __tot + (record.get('monto') * record.get('valor'));
          });
          Ext.ComponentQuery.query('#lblTotalIngresado')[0].setText(__tot.toString());
  
  
      },
});
