Ext.define('sisfacturaelectronica.view.almacen.ActualizarDisponibilidadController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.almacen-actualizardisponibilidad',
    onClickCancelar: function (b) {
        this.getView().close();
    },
    onClickGuardar: function (b) {
        f = this.lookupReference('frmdispo');
        v = this.getView();
        Ext.Msg.confirm('SisFacturaElectronica', 'Este procedimiento actualizará las cantidades a mano y eliminara las anteriores. Desea Continuar?',
            function (choice) {
                if (choice === 'yes') {
                    if (f.isValid()) {
                        f.submit({
                            waitMsg: 'Guardando informacion...',
                            success: function (form, action) {
                                if (action.result.error != 0) {
                                    v.close();
                                }
                            },
                            failure: function () {
                                Ext.Msg.alert("SisFacturaElectronica", action.result.msg);
                            }
                        });

                    } else {
                        Ext.Msg.alert("SisFacturaElectronica", "Ingrese una cantidad válida");
                    }
                }
            }
        );
    }

});
