Ext.define('sisfacturaelectronica.store.Menu', {
    extend: 'Ext.data.Store',
    requires: [
        'sisfacturaelectronica.util.Util'
    ],
    model: 'sisfacturaelectronica.model.menu.Accordion',
    extraParams:{
      vusuario : 0
    },
    autoLoad: false,
    autoSync: true,
    proxy: {
        type: 'ajax',
        url: 'resources/api/usuario_menu',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        listeners: {
            exception: function(proxy, response, operation){
                sisfacturaelectronica.util.Util.showErrorMsg(response.responseText);
            }
        }
    }
});
