Ext.define('sisfacturaelectronica.view.almacen.ListadoInventarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.almacen-listadoinventario',
    onClickInventarioAnular:function(btn){
        me = this;
        Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.inventarioAnular,
                params: { 
                    id          : btn.getWidgetRecord().get('id'),
                    usuario : sisfacturaelectronica.util.Data.usuario 
                },
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            Ext.ComponentQuery.query('#dgvInvReg')[0].getStore().reload();
                    }
                }
             });

    }
});
