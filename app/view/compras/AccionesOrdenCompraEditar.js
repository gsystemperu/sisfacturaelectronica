Ext.define('sisfacturaelectronica.view.compras.AccionesOrdenCompraEditar', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-ordencompraeditar',
    requires: [
        'sisfacturaelectronica.util.Rutas'
    ],
    onClickBuscarProductoEditar:function(btn){
      if(Ext.ComponentQuery.query('#cboProveedoresfEditar')[0].getValue()!=null){
       Ext.create('sisfacturaelectronica.view.almacen.ProductoBuscarOC',{
         proveedor : Ext.ComponentQuery.query('#cboProveedoresfEditar')[0].getValue(),
         mystore     : Ext.ComponentQuery.query('#dgvDetalleOrdenCompraEditar')[0].getStore()
       });
     }else{
       sisfacturaelectronica.util.Util.showToast('Seleccionar al Proveedor');
     }

   },
   onEditorCalcularTotalOrdenCompraEditar: function (editor, e) {
       var _cant = 0;
       var _pre = 0;
       _cant = e.record.get('cantidad');
       _pre = e.record.get('precio');
       _tot = _pre * _cant;
       e.record.set('total', _tot.toFixed(2));
       this.onCalcularTotalOrdenCompraEditar();
   },
   onCalcularTotalOrdenCompraEditar: function () {
       me = this;
       var store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompraEditar')[0].getStore();
       var _tot = 0;
       store.each(function (record) {
           _tot = _tot + record.get('total');
       });
       s = Ext.ComponentQuery.query('#ckbAplicarIgvEditar')[0].getValue();
       if(s){
        i  =_tot - (_tot / 1.18);
        st = _tot / 1.18;  
       }else{
        st = _tot;
        i  =_tot * 0.18;
        _tot = _tot + (_tot * 0.18);  
       }
    
       Ext.ComponentQuery.query('#txtSubtotalOrdenCompraEditar')[0].setValue(st.toFixed(2));
       Ext.ComponentQuery.query('#txtIgvOrdenCompraEditar')[0].setValue(i.toFixed(2));
       Ext.ComponentQuery.query('#txtTotalGeneralOrdenCompraEditar')[0].setValue(
           _tot.toFixed(2)
       );
       try {Ext.ComponentQuery.query('#txtBuscarCodigoProd')[0].focus();} catch (e) {}

   },
   onClickSalirOrdenCompra: function (btn) {
     try {
       var me =  Ext.ComponentQuery.query('#wContenedorOrdenCompra')[0];    //this;
       var l = me.getLayout();
       l.setActiveItem(0);
       Ext.ComponentQuery.query('#frmOrdenCompra')[0].reset();
       Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore().removeAll();
     } catch (e) {
       console.log('Salir Orden Compra');
     }
   },
   onClickEliminarDetalleEditar: function (button, event, eOpts) {
       var store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompraEditar')[0].getStore();
       var rec = button.getWidgetRecord();
       if (rec) {
           store.remove(rec);
           this.onCalcularTotalOrdenCompraEditar();
       }
   },
   onClickGuardarOrdenCompra: function () {
       var _form = this.lookupReference('frmOrdenCompraEditar');
       if (_form.isValid()) {
           var _dataDetalle = [];
           var _store = this.lookupReference('dgvDetalleOrdenCompraEditar').getStore();
           me = this;
           console.log(_store);
           _store.each(function (record) {
               if (record.get('cantidad') != 0) {
                   _reg = {
                       "idprod": record.get('idprod'),
                       "cantidad": record.get('cantidad'),
                       "precio": record.get("precio"),
                       "total": record.get("total")

                   };
                   _dataDetalle.push(_reg);
               }

           });
           _txt1 = Ext.ComponentQuery.query('#txtJsonDetalleOCEditar');
           _txt1[0].setValue(JSON.stringify(_dataDetalle));
           var _view = this.getView();
           _form.submit({
               waitMsg: 'Guardando informacion...',
               success: function (form, action) {
                   _dgv = Ext.ComponentQuery.query('#gridOrdenesCompra')[0];
                   _dgv.getStore().load();
                   var me =  Ext.ComponentQuery.query('#wContenedorOrdenCompra')[0];    //this;
                   var l = me.getLayout();
                   l.setActiveItem(0);
                   Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore().removeAll();
               },
               failure: function (action) {
                   Ext.Msg.alert("AkinetFarma", "Error en conexión de base de datos");

               }
           });
       } else {
           sisfacturaelectronica.util.Util.showErrorMsg('Ingresar los datos necesarios!');
       }
   },
   onChangeInIgv: function ( o, nv, ov, opt) {
    me = this;
    s = Ext.ComponentQuery.query('#dgvDetalleOrdenCompraEditar')[0].getStore();
    t = 0;
    s.each(function (r) {t += r.get('total');});
    if(nv){
        st = t / 1.18;
        i  = t - st;
        Ext.ComponentQuery.query('#txtSubtotalOrdenCompraEditar')[0].setValue(st.toFixed(2));
        Ext.ComponentQuery.query('#txtIgvOrdenCompraEditar')[0].setValue(i.toFixed(2));
        Ext.ComponentQuery.query('#txtTotalGeneralOrdenCompraEditar')[0].setValue(
            t.toFixed(2)
        );
    }else{
    
        st = t;
        i  = t * 0.18;
        t  = st + i;
        Ext.ComponentQuery.query('#txtSubtotalOrdenCompraEditar')[0].setValue(st.toFixed(2));
        Ext.ComponentQuery.query('#txtIgvOrdenCompraEditar')[0].setValue(i.toFixed(2));
        Ext.ComponentQuery.query('#txtTotalGeneralOrdenCompraEditar')[0].setValue(
            t.toFixed(2)
        );
   }
 }

});
