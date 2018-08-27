Ext.define('sisfacturaelectronica.view.ventas.AccionesGuiaRemision', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-guiaremision',
    onClickSalirGuiaRemision:function(btn){
        var me =  Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0];    //this;
        Ext.ComponentQuery.query('#frmRegGuiaRemision')[0].reset();
        var l = me.getLayout();
        l.setActiveItem(0);
    },
    onClickIngresarNuevoPago:function(btn){
        __store = Ext.ComponentQuery.query('#dgvPagoAcuenta')[0].getStore();
        __data = {
          fecha : new Date(),
          pago  : 0
        };
        __store.insert(0,__data);

    },
    onClickGuardarGuiaRemision:function(btn){
        var _form =  Ext.ComponentQuery.query('#frmRegGuiaRemision')[0];
        if (_form.isValid())
        {

            var _dataDetalle = [];
            var _store = this.lookupReference('dgvDetalleGuiaRemision').getStore();
            me = this;
            _store.each(function (record) {
                if (record.get('cantidad') != 0) {
                    _reg = {
                        "idprod": record.get('idprod'),
                        "cantidad": record.get('cantidad'),
                        "unidadmedida": record.get("unidadmedida"),
                        "pesototal": record.get("pesototal")
                    };
                    _dataDetalle.push(_reg);
                }

            });
            _txt1 = Ext.ComponentQuery.query('#txtJsonDetalleGuiaRemision');
            _txt1[0].setValue(JSON.stringify(_dataDetalle));
            var _view = this.getView();
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    var me =  Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0];    //this;
                    var l = me.getLayout();
                    l.setActiveItem(0);
                    _dgv = Ext.ComponentQuery.query('#dgvVentasFacturar')[0];
                    _dgv.getStore().reload();

                },
                failure: function () {
                     Ext.Msg.alert("SisFacturaElectronica", "Error al ingresar guia remision");
                     return false;

                }
            });
        } else {
            sisfacturaelectronica.util.Util.showErrorMsg('Ingresar los datos de la guia de remisión!!');
        }



    }



});
