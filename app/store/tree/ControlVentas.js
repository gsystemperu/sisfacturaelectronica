Ext.define('sisfacturaelectronica.store.tree.ControlVentas', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
             { text: 'Clientes', leaf: true, itemId: "wContenedorCliente", titulo :'Clientes',  glyph : 'xf022'},
             { text: 'Cotizaciones', leaf: true, itemId: "wContenedorCotizaciones", titulo :'Cotizaciones',  glyph : 'xf022'  },
             { text: 'Productos', leaf: true, itemId: "wContenedorProducto", titulo :'Productos',  glyph : 'xf022'},
             {
               text: 'Facturación',
               expanded: true,
                children: [
                 {
                   text: 'Reg.Boletas-Facturas',
                   leaf: true,
                   itemId: "wContenedorCotizacionesFacturar",
                   titulo: "Proforma/Facturar",
                   glyph : 'xf022'
                 },
                 {
                  text: 'Crear Documento',
                  leaf: true,
                  itemId: "wRegistrarFacturaBoleta",
                  titulo: 'Documento de venta',
                  glyph : 'xf022'

                },
              
               ]
             },
             {
               text: 'Punto Venta',
               expanded: true,
                children: [
                 {
                   text: 'Botica',
                   leaf: true,
                   itemId: "wContenedorPuntoVenta",
                   titulo: ".:. Botica .:. ",
                   glyph : 'xf0fa' 
                 }
                 
               ]
             },
             {
              text: 'Configuracion',
              leaf: true,
              itemId: "wconfigpuntoventa",
              titulo: ".:. Configuracón .:. ",
              glyph : 'xf013' 
            }
        ]
    }
});
