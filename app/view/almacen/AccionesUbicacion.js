
Ext.define('sisfacturaelectronica.view.almacen.AccionesUbicacion', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-ubicacion',
    requires:['sisfacturaelectronica.util.Rutas','sisfacturaelectronica.util.Util'],
    onSelectAlmacen:function(combo, record, eOpts){
        if(record){
          _store = this.lookupReference('cboSecciones').getStore();
          _store.load({
              params:{
                id : record.get('id')
              }
          });
          this.lookupReference('cboSecciones').setValue(0);
        }
    },
    onClickGuardarUbicacion:function(){
        me = this;
        me.getView().mask('...Guando');
        Ext.Ajax.request({
            url :sisfacturaelectronica.util.Rutas.productoGuardarUbicacion,
            params:{
              idserie :  this.lookupReference('txtCodigoSerie').getValue()  ,
              idseccion : this.lookupReference('cboSecciones').getValue(),
              ubicacion : this.lookupReference('txtUbicacion').getValue(),
              observaciones : this.lookupReference('txtObservaciones').getValue()
            },
            success:function(response){
               var rs = sisfacturaelectronica.util.Util.decodeJSON(response.responseText);
               if(rs.error>0){
                 me.getView().unmask();
                 Ext.ComponentQuery.query('#dgvProductoExistencias')[0].getStore().reload();
                 me.getView().close();
               }
            }
        });
    },
    onClickCancelarUbicacion:function(){
        this.getView().close();
    }

});
