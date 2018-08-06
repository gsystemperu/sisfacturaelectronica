Ext.define('sisfacturaelectronica.store.tree.ControlManufactura', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
           {
             text: 'Productos',
             leaf: true,
             itemId: "wContenedorProducto",
             titulo: "Registro Productos"
           },
           {
              text: 'Registro Formulas',
              leaf: true,
              itemId: "wContenedorFormula",
              titulo: "Formula Materiales"
           }

        ]
    }
});
