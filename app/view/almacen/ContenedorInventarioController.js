Ext.define('sisfacturaelectronica.view.almacen.ContenedorInventarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.almacen-contenedorinventario',

    //@Acciones
    onClickCrearInventario: function (btn) {
        try {
            me = Ext.ComponentQuery.query('#wContenedorInventario')[0];    //this;
            Ext.ComponentQuery.query('#btnConfInventario')[0].setHidden(true);
            l = me.getLayout();
            l.setActiveItem(1);
            Ext.ComponentQuery.query('#dgvInvNuevo')[0].getStore().load();
            Ext.ComponentQuery.query('#wRegInventarioInicial')[0].reset();

        } catch (e) {
            console.log(e);
        }

    },
    onClickEditarInventario: function (btn) {
        try {
            r = Ext.ComponentQuery.query('#dgvInvReg')[0].getSelectionModel().getSelection()[0]; 
            if(r){
                if(r.get('idestado')==11) 
                {
                    sisfacturaelectronica.util.Util.showToast('El inventario no se puede modificar esta validado.');
                    return false;
                }
                me = Ext.ComponentQuery.query('#wContenedorInventario')[0];    //this;
                l = me.getLayout();
                l.setActiveItem(2);
                Ext.ComponentQuery.query('#btnConfInventario')[0].setHidden(false);
                Ext.ComponentQuery.query('#dgvInvEditar')[0].getStore().load({
                    params:{
                        idinventario : r.get('id')
                    }
                });
                Ext.ComponentQuery.query('#referencia')[0].setValue(r.get('referencia'));
                Ext.ComponentQuery.query('#fechainventario')[0].setValue(r.get('fechainventario'));
                Ext.ComponentQuery.query('#id')[0].setValue(r.get('id'));
            }else{
                sisfacturaelectronica.util.Util.showToast('Seleccionar el registro a editar!');
            }

            
        } catch (e) {
            console.log(e);
        }

    },
    onClickImprimirStockInventario: function (btn) {
        w = window.open(sisfacturaelectronica.util.Rutas.inventarioImprimirStock, "", "width=700,height=900");
        //setTimeout(function(){ objrpt.close(); }, 1000);
    },
    onClickConfirmarInventario:function(btn){
        alert("confirma");
        f =  Ext.ComponentQuery.query('#wRegInventarioInicialEditar')[0];    //this.lookupReference('frmRegCotizacion');
        if (f.isValid()) {

            d = [];
            st = Ext.ComponentQuery.query('#dgvInvEditar')[0].getStore();
            me = this;
            ca = st.getCount();

            for (i = 0; i < ca; i++) {
                re = st.getAt(i);
                //if(re.modified){
                    reg = {
                        "idprod"     : re.get('idprod'),
                        "stockfisico": re.get('stockfisico'),
                        "inventario": re.get("inventario"),
                        "diferencia": re.get("diferencia"),
                        "generaserie" : re.get("chk"),
                        "confirmado" : 1
                    };
                    d.push(reg);
                //}
            }
            Ext.ComponentQuery.query('#jsondetalle')[0].setValue(JSON.stringify(d));
            console.log(JSON.stringify(d));
             f.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    me =  Ext.ComponentQuery.query('#wContenedorInventario')[0];    //this;
                    l = me.getLayout();
                    l.setActiveItem(0);
                    Ext.ComponentQuery.query('#dgvInvReg')[0].getStore().load();
                    sisfacturaelectronica.util.Util.showToast('Inventario Guardado!');
                    Ext.ComponentQuery.query('#btnConfInventario')[0].setHidden(true);

                },
                failure: function (action) {
                    Ext.Msg.alert("SisFacturaElectronica", action.result.msg);
                }
            });
        } else {
            sisfacturaelectronica.util.Util.showErrorMsg('Ingresar los datos para el inventario!');
        }
    }


});
