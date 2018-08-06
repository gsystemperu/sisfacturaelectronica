
Ext.define('sisfacturaelectronica.view.almacen.AccionesAlmacen', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-almacen',
    requires:['sisfacturaelectronica.util.Rutas'],

      //@ Tabla Bancos
    //=============================================
    onClickGuardarAlmacen: function (btn) {
        _form = this.lookupReference('frmAlmacen');
        me    = this;
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                        me.lookupReference('dgvAlmacen').getStore().reload();
                    }                   
                },
                failure: function () {
                    Ext.Msg.alert("AkinetFarma", action.result.msg);
                }
            });

        }
    },
    onClickNuevoAlmacen:function(btn)
    {
        this.lookupReference('frmAlmacen').reset();
        Ext.ComponentQuery.query('#txtNombreAlmacen')[0].focus();
    },
    onSelectedAlmacen : function( grid, record, index, eOpts ) {
        this.lookupReference('frmAlmacen').loadRecord(record)
        this.lookupReference('dgvSecciones').getStore().load({
            params:{
                id : record.get('id')
            }
        }); 
        this.lookupReference('frmSeccion').reset();

    },

    onClickEliminarAlmacen:function(btn){
        me = this;
        Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.almacenEliminar, 
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmAlmacen').reset();
                            me.lookupReference('dgvAlmacen').getStore().reload();
                    } 
                }
             });
    },
    //=====================================================
    onSelectedSeccion : function( grid, record, index, eOpts ) {
        this.lookupReference('frmSeccion').loadRecord(record);
    },
    onClickNuevoSeccion:function(btn)
    {
        this.lookupReference('frmSeccion').reset();
        Ext.ComponentQuery.query('#txtDescripcion')[0].focus();
    },
     onClickEliminarSeccion:function(btn){
        me = this;
        Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.seccionAlmacenEliminar, 
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmSeccion').reset();
                            me.lookupReference('dgvSecciones').getStore().reload();
                    } 
                }
             });
    },
    onClickGuardarSeccion: function (btn) {
        _form = this.lookupReference('frmSeccion');
        me    = this;
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                        me.lookupReference('dgvSecciones').getStore().reload();
                    }                   
                },
                failure: function () {
                    Ext.Msg.alert("AkinetFarma", action.result.msg);
                }
            });

        }
    },
});
