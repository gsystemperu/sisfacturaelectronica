Ext.define('sisfacturaelectronica.view.almacen.AccionesProveedor', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-proveedor',
    requires: ['sisfacturaelectronica.util.Rutas'],

    //@ Tabla Proveedor
    //=============================================
    onClickGuardarProveedorModal: function (btn) {
        _form = this.lookupReference('frmProveedor');
        me = this;
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if (action.result.error != 0) {
                        Ext.ComponentQuery.query('#' + btn.idcontrol.toString())[0].getStore().load();
                        me.getView().close();
                    }
                },
                failure: function () {
                    Ext.Msg.alert("SisFacturaElectronica", "Error en conexion de la base de datos");
                }
            });

        }
    },
    onClickGuardarProveedor: function (btn) {
        _form = this.lookupReference('frmProveedor');
        me = this;
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if (action.result.error != 0) {
                        Ext.ComponentQuery.query('#' + btn.idcontrol.toString())[0].getStore().load();

                    }
                },
                failure: function () {
                    Ext.Msg.alert("SisFacturaElectronica", "Error en conexion de la base de datos");
                }
            });

        }
    },
    onClickCancelarProveedor: function (btn) {
        this.getView().close();
    },
    onClickNuevoProveedor: function () {
        this.lookupReference('frmProveedor').reset();
        Ext.ComponentQuery.query('#txtRazonSocial')[0].focus();
    },
    onClickItemProveedor: function (grid, record, index, eOpts) {
        this.lookupReference('frmProveedor').loadRecord(record);
    },
    onKeyPressTextoDeBusquedaProveedor: function (txt, e, eOpts) {
        if (e.charCode == 13) {
            this.lookupReference('dgvProveedores').getStore().load({
                params: {
                    proveedor: txt.getValue()
                }
            });
        }
    },
     onClickEliminarProveedor:function(btn){
        me = this;
        Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.proveedorEliminar, 
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmProveedor').reset();
                            me.lookupReference('dgvProveedores').getStore().reload();
                    } 
                }
             });
    },
});