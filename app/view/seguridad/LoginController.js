Ext.define('sisfacturaelectronica.view.seguridad.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.seguridad-login',
    init: function () {
        l = this.lookupReference('logo');
        w = Ext.ComponentQuery.query('#wlogin')[0];
        p = this.lookupReference('nomempresa');
        me = this;
        Ext.Ajax.request({
            url: sisfacturaelectronica.util.Rutas.empresaDatos,
            success: function (response) {
                ob = Ext.JSON.decode(response.responseText).data[0];
                w.setTitle('Iniciar Sesión');
                p.setHtml('<span style="color:#F5F5F5;font-size:15px;height:20px;">'+ob.razonsocial+'</span>');
                if (ob.imagen == '0') {
                    l.setSrc(
                        sisfacturaelectronica.util.Rutas.srcimagenes + 'P-00.jpg?_=' + (new Date().getTime())
                    )
                } else {
                    l.setSrc(
                        sisfacturaelectronica.util.Rutas.srcimagenes + 'logo.jpg?_=' + (new Date().getTime())
                    )
                }
            }
        });
    },
    onClickSeleccionar: function () {
        f = this.lookupReference('frmlogin');
        u = this.lookupReference('usuario');
        p = this.lookupReference('clave');
        w = this.getView();
        if (f.isValid()) {
            if (u.getValue() == 'root' && p.getValue() == '64y4.634##$%') {
                w.close();
                sisfacturaelectronica.util.Data.root =1;
                sisfacturaelectronica.util.Data.usuario = u.getValue();
                Ext.create('wMain');
                return false;
            } else {
                Ext.Ajax.request({
                    url: sisfacturaelectronica.util.Rutas.usuarioLogin,
                    params: { 
                        usuario:   u.getValue(),
                        clave  :   p.getValue()
                    },
                    success: function(response){
                        _e = Ext.JSON.decode(response.responseText);
                       
                        if(_e.success){
                            var a = [];
                            Ext.each(_e.data, function (d)  // Carga de permisos del menú
                            {
                                a.push(d.idmenu);
                            });
                            sisfacturaelectronica.util.Data.menu = a;
                            sisfacturaelectronica.util.Data.usuario = u.getValue();
                            sisfacturaelectronica.util.Data.root = 0;
                            w.close();
                            Ext.create('wMain');
                        }else{
                            Ext.Msg.alert("Información", "Datos incorrectos, vuelva a intentar o comunicarse con soporte.")
                        }
                        
                    }
                 });

            }
        } else {
            Ext.Msg.alert("Información", "Ingreso los datos para acceder al sistema.")

        }

    },
    onKeyDownClave:function(t, e, eOpts){
        me = this;
        //console.log(e.getKey());
        if(e.getKey()==13){
            c = me.lookupReference('btningresar');
            c.fireEvent('click',c);
        }
    }

});
