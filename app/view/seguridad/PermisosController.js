Ext.define('sisfacturaelectronica.view.seguridad.PermisosController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.seguridad-permisos',
    init: function () {
        r = this.lookupReference('treeprog');
        root = r.getRootNode();
        ca = Ext.create('sisfacturaelectronica.store.tree.ControlAlmacen');
        cv = Ext.create('sisfacturaelectronica.store.tree.ControlVentas');
        m = Ext.create('sisfacturaelectronica.store.tree.Mantenimiento');
        cu = Ext.create('sisfacturaelectronica.store.tree.ControlUsuarios');
        this.setCargarMenu(root, ca, cv, m, cu);
    },
    setCargarMenu(t, ca, cv, ma, cu) {
        menu = {
            text: sisfacturaelectronica.Global.empresa,
            expanded: true,
            children: []
        };
        nodo = [];
        ma.each(function (r) {
            m = {
                text: r.get('text'),
                leaf: true,
                checked: false,
                idmenu: r.get('itemId')
            };
            nodo.push(m);
        });
        ca.each(function (r) {
            if (r.get('children')) {
                nx = r.get('children');
                for (i = 0; i < nx.length; i++) {
                    a = nx[i];
                    m = {
                        text: a['text'],
                        leaf: true,
                        checked: false,
                        idmenu: a['itemId']
                    };
                    nodo.push(m);
                }
            } else {
                m = {
                    text: r.get('text'),
                    leaf: true,
                    checked: false,
                    idmenu: r.get('itemId')
                };
                nodo.push(m);
            }


        });
        cv.each(function (r) {
            if (r.get('children')) {
                nx = r.get('children');
                for (i = 0; i < nx.length; i++) {
                    a = nx[i];
                    m = {
                        text: a['text'],
                        leaf: true,
                        checked: false,
                        idmenu: a['itemId']
                    };
                    nodo.push(m);
                }
            } else {
                m = {
                    text: r.get('text'),
                    leaf: true,
                    checked: false,
                    idmenu: r.get('itemId')
                };
                nodo.push(m);
            }
        });

        cu.each(function (r) {
            if (r.get('children')) {
                nx = r.get('children');
                for (i = 0; i < nx.length; i++) {
                    a = nx[i];
                    m = {
                        text: a['text'],
                        leaf: true,
                        checked: false,
                        idmenu: a['itemId']
                    };
                    nodo.push(m);
                }
            } else {
                m = {
                    text: r.get('text'),
                    leaf: true,
                    checked: false,
                    idmenu: r.get('itemId')
                };
                nodo.push(m);
            }
        });

        menu.children = nodo;
        t.appendChild(menu);
        return 1;
    },
    onClickActualizarPermisosAlPerfil: function (b) {
        treepanel = this.lookupReference('treeprog');  //Ext.getCmp('treeProgramas');
        tree = treepanel.getStore();
        root = treepanel.getRootNode();
        enviar = new Array();
        nodos = root.getChildAt(0);
        PChilds = nodos.childNodes;
        Ext.each(PChilds, function (node, index) {
            if (node.data.checked == true) {
                p = { "menu": node.data.idmenu };
                enviar.push(p);
            }
        });

        if (this.lookupReference('cboperfil').getValue() != null) {
            data = { idperfil: this.lookupReference('cboperfil').getValue(), permisos: JSON.stringify(enviar) };
            sisfacturaelectronica.util.Util.ajax(sisfacturaelectronica.util.Rutas.actualizarPermisos, data, null);
        }
        else
            Ext.Msg.alert("Error", "Tiene que seleccionar un perfil de usuario!");
    },
    onChangeBuscarPermisosPerfil: function (obj, newValue, oldValue, eOpts) {
        me = this;
        Ext.Ajax.request({
            url: sisfacturaelectronica.util.Rutas.permisosDelPerfil,
            params: {
                idperfil: newValue
            },
            success: function (conn, response, options, eOpts) {
                r = sisfacturaelectronica.util.Util.decodeJSON(conn.responseText);
                p = [];
                  try {
                    if(r.data.length){
                        Ext.each(r.data,function(i){
                            p.push(i.idmenu);
                        })

                        treepanel = me.lookupReference('treeprog');  
                        tree = treepanel.getStore();
                        root = treepanel.getRootNode();
                        enviar = new Array();
                        nodos = root.getChildAt(0);
                        PChilds = nodos.childNodes;
                        Ext.each(PChilds, function (node, index) {
                            if (p.indexOf(node.data.idmenu) >= 0) {
                                node.set('checked', true);
                            } else {
                                node.set('checked', false);
                            }
                            treepanel.fireEvent('checkchange', node, node.get('checked'));
                        });
                    }
                  } catch (error) {
                    treepanel = me.lookupReference('treeprog');  
                    tree = treepanel.getStore();
                    root = treepanel.getRootNode();
                    enviar = new Array();
                    nodos = root.getChildAt(0);
                    PChilds = nodos.childNodes;
                    Ext.each(PChilds, function (node, index) {
                        node.set('checked', false);
                        treepanel.fireEvent('checkchange', node, node.get('checked'));
                    });
                  }
                    
                   
            },
            failure: function (conn, response, options, eOpts) { }
        });
    },
    onClickAgregarPerfil:function(b){
        me = this;
        Ext.Ajax.request({
            url: sisfacturaelectronica.util.Rutas.perfilActualizar,
            params: { id:0 , perfil : me.lookupReference('perfil').getValue() },
            success: function (conn, response, options, eOpts) {
                r = sisfacturaelectronica.util.Util.decodeJSON(conn.responseText);
                if(r.error>0){
                    me.lookupReference('cboperfil').getStore().load();
                    me.lookupReference('perfil').setValue('');
                    Ext.Msg.alert("Perfil","Perfil Guardado");
                }
            },
            failure: function (conn, response, options, eOpts) { }
        });

    }

});
