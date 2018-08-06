Ext.define('sisfacturaelectronica.store.tree.ControlAlmacen', {
  extend: 'Ext.data.TreeStore',
  root: {
    expanded: true,
    children: [
      {
        text: 'Almacenes',
        leaf: true,
        itemId: "wRegAlmacen",
        titulo: "Registro Almacenes",
        glyph: 'xf16b'
      }, {
        text: 'Productos',
        leaf: true,
        itemId: "wContenedorProducto",
        titulo: "Registro Productos",
        glyph: 'xf16b'
      },
      {
        text: 'Proveedores',
        leaf: true,
        itemId: "wRegProveedores",
        titulo: "Proveedores / Laboratorios",
        glyph: 'xf16b'
      },
      {
        text: 'Ingreso Mercaderia',
        expanded: true,
        //leaf : true,
         titulo : '',
         children: [
          {
            text: 'Orden Compra',
            leaf: true,
            itemId: "wContenedorOrdenCompra",
            titulo: "Orden Compra",
            glyph: 'xf16b'
          },
          {
            text: 'Guias Entrada',
            leaf: true,
            itemId: "wContenedorGuias",
            titulo: "Guia Entrada",
            glyph: 'xf16b'
          }
        ]
      },
      {
        text: 'Administración',
        expanded: true,
        //leaf : true,
         titulo : '',
         children: [
          {
            text: 'Inventarios',
            leaf: true,
            itemId: "wContenedorInventario",
            titulo: "Ajsute Inventario",
            glyph: 'xf16b'
          }
        
        ]
      },
     {
        text: 'Reportes',
        expanded: true,
        //leaf : true,
         titulo : '',
         children: [
          {
            text: 'Reportes Productos',
            leaf: true,
            itemId: "wrptproducto",
            titulo: "Reportes Productos",
            glyph: 'xf16b'
          }
          /*{
            text: 'Movimientos',
            leaf: true,
            //itemId: "wContenedorOrdenCompra",
            titulo: "Movimientos",
            glyph: 'xf16b'
          },
          {
            text: 'Valorizacion Inventario',
            leaf: true,
            //itemId: "wContenedorOrdenCompra",
            titulo: "Valorizacion Inventario",
            glyph: 'xf16b'
          }*/
        
        ]
      },
      {
        text: 'Configuraciones',
        leaf: true,
        itemId: "wFormConfiguraciones",
        titulo: "Almacen / Configuraciones",
        glyph: 'xf013'
      }


    ]


  }
});
