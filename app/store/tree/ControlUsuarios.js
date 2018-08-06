Ext.define('sisfacturaelectronica.store.tree.ControlUsuarios', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
            { text: 'Registro de Usuarios', leaf: true, itemId: "wusuarios", titulo: "Registro Usuarios" , glyph: 'xf007'},
            { text: 'Niveles de Acceso', leaf: true, itemId: "wseguriadpermisos", titulo: 'Niveles de Acceso', glyph: 'xf007' },
        ]
    }
});
