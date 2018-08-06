Ext.define('sisfacturaelectronica.store.tree.GestionClientes', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
           /* { text: '<b>Lista Clientes</b>', leaf: true, itemId: "ListaCliente", titulo: "Listado de Clientes"  },
            { text: '<b>Lista Proveedores</b>', leaf: true, itemId: "ListaProveedor", titulo: "Listado de Proveedores" },
            { text: '<b>Crear Contacto</b>', leaf: true, itemId: "CrearContacto", titulo: "Crear Contacto" }*/
        ]


    }
});