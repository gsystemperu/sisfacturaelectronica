Ext.define('sisfacturaelectronica.view.almacen.InventarioInicialController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.almacen-inventarioinicial',
     
    //@Acciones
    onEditorCalcularDiferencia:function(editor, e){
        s = e.record.get('stockfisico');
        i = e.record.get('inventario');
        t = s - i;
        e.record.set('diferencia', t.toFixed(2));
    },
    onClickRefrescar:function(b){
        this.lookupReference('dgvInvNuevo').getStore().reload();
    },
   
    onClickGuardarInventario:function(btn){
        f =  Ext.ComponentQuery.query('#wRegInventarioInicial')[0];    //this.lookupReference('frmRegCotizacion');
        if (f.isValid()) {
            g = this.lookupReference('dgvInvNuevo');
            g.getPlugin('gridfilters').clearFilters();   
            d = [];
            st = g.getStore();  //this.lookupReference('dgvInvNuevo').getStore();
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
                    };
                    d.push(reg);
                //}
            }
            this.lookupReference('jsondetalle').setValue(JSON.stringify(d));
            this.lookupReference('usuario').setValue( sisfacturaelectronica.util.Data.usuario  );
            f.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    me =  Ext.ComponentQuery.query('#wContenedorInventario')[0];    //this;
                    l = me.getLayout();
                    l.setActiveItem(0);
                    Ext.ComponentQuery.query('#dgvInvReg')[0].getStore().load();
                    sisfacturaelectronica.util.Util.showToast('Inventario Guardado!');

                },
                failure: function (action) {
                    Ext.Msg.alert("SisFacturaElectronica", action.result.msg);
                }
            });
        } else {
            sisfacturaelectronica.util.Util.showErrorMsg('Ingresar los datos para el inventario!');
        }
    },
    onClickGuardarConfInventario:function(btn){
        me = this;
        Ext.Msg.confirm('SisFacturaElectronica', 'Este procedimiento actualizará las cantidades a mano y eliminara las anteriores. Desea Continuar?',
        function (choice) {
            if (choice === 'yes') {
                f =  Ext.ComponentQuery.query('#wRegInventarioInicial')[0];  
                if (f.isValid()) {
                    g = me.lookupReference('dgvInvNuevo');
                    g.getPlugin('gridfilters').clearFilters();   
                    d = [];
                    st = g.getStore(); ///me.lookupReference('dgvInvNuevo').getStore();
                    ca = st.getCount();
                    for (i = 0; i < ca; i++) {
                        re = st.getAt(i);
                       // if(re.modified){
                            reg = {
                                "idprod"     : re.get('idprod'),
                                "stockfisico": re.get('stockfisico'),
                                "inventario": re.get("inventario"),
                                "diferencia": re.get("diferencia"),
                                "generaserie" : re.get("chk"),
                                "confirmado" : 1
                            };
                            d.push(reg);
                       // }
                    }
                    me.lookupReference('jsondetalle').setValue(JSON.stringify(d));
                    me.lookupReference('usuario').setValue( sisfacturaelectronica.util.Data.usuario  );
                    me.lookupReference('config').setValue(1);
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
    },
    onClickCancelarInventario:function(btn){
        try {
            me =  Ext.ComponentQuery.query('#wContenedorInventario')[0]; 
            Ext.ComponentQuery.query('#btnConfInventario')[0].setHidden(true);
            l = me.getLayout();
            l.setActiveItem(0);
          } catch (e) {
            console.log(e);
          }
    },
    onClickBuscarProductoSeries:function(btn){
        r  = btn.getWidgetRecord();
        st = this.lookupReference('dgvInvNuevo').getStore();
        w  = Ext.create('Ext.window.Window',{
           title : 'Listada de Productos',
           itemId : 'wProductosUnidadesInventario',
           width : 750 ,
           height :600,
           autoShow:true,
           modal : true,
           layout:{
             type:'fit',
             align:'stretch'
           },
           items:[
             {
               xtype    :'wListaSeriesInventario',
               codigo   : r.get('id'),
               cantidad : r.get('stockfisico'),
               registro : r
             }
           ]
        });
        Ext.ComponentQuery.query('#txtSerieUnico')[0].focus(false,100);
    }


});
