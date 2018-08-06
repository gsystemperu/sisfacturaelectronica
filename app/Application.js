
Ext.define('sisfacturaelectronica.Application', {
    extend: 'Ext.app.Application',
    name: 'sisfacturaelectronica',
    stores: [
      'StoreMantenimientos',
      'StoreProductos',
      'StoreProveedores',
      'StoreAbastecimiento',
      'StoreOrdenCompra',
      'StoreVentas',
      'StoreManufactura'
    ],
    views:[
        'main.Main',
        'conf.Maestros',
        'almacen.Almacenes',
        'almacen.Producto',
        'almacen.ReglasAbastecimiento',
        'almacen.IngresarAbastecimiento',
        'almacen.Proveedor',
        'almacen.ProductoBuscar',
        'almacen.FormProveedor',
        'compras.OrdenCompra',
        'compras.GuiasEntrada',
        'compras.ContenedorGuias',
        'almacen.ProductoExistencias',
        'almacen.ContenedorProducto',
        'almacen.ProductoUbicacion',
        'compras.ContenedorOrdenCompra',
        'almacen.ProductoBuscarOC',
        'compras.PagosAcuenta',
        'almacen.ContenedorInventario',
        'almacen.ListadoInventario',
        'almacen.InventarioInicial',
        'almacen.InventarioInicialEditar',
        'almacen.ActualizarDisponibilidad',
        'ventas.ContenedorCotizaciones',
        'ventas.ContenedorCliente',
        'ventas.ListadoDeCotizaciones',
        'ventas.RegistrarCliente',
        'ventas.RegistrarProducto',
        'ventas.BuscarProducto',
        'ventas.ListadoClientes',
        'ventas.Mantenimiento',
        'ventas.VisorClienteCotizacion',
        'ventas.VisorProductoCotizacion',
        'ventas.VisorVendedorCotizacion',
        'ventas.EditarCotizacion',
        'ventas.Imprimir',
        'ventas.CotizacionesClienteBuscar',
        'ventas.ListadoDeCotizacionesFacturar',
        'ventas.ContenedorCotizacionesFacturar',
        'ventas.RegistroCotizacionFacturar',
        'ventas.PagosAcuenta',
        'ventas.GuiaRemision',
        'ventas.ListadoClienteFacturacion',
        'ventas.ListadoClienteCotizacion',
        'ventas.VisualizarCotizacionFacturar',
        'ventas.RegistrarFacturaBoleta',
        'ventas.BuscarProductoFB',
        'ventas.FormConfiguraciones',
        'puntoventa.ContenedorMain',
        'puntoventa.ListadoPdv',
        'puntoventa.PagosAcuentaPdv',
        'puntoventa.AperturaCaja',
        'mrp.ContenedorFormulas',
        'mrp.ListadoFormulas',
        'mrp.FormListaMaterial',
        'almacen.ListadoGenericos',
        'almacen.ProductoExistenciasEditar',
        'almacen.ReportesProducto',
        'puntoventa.ConfigPuntoVenta',

        //@Conf views
        'conf.configEmpresa',
        'conf.configNuevaBoleta',
        'conf.configNuevaTicketera',
        //@Usuarios views
        'seguridad.Usuarios',
        'seguridad.Permisos',
        'seguridad.Login'
        
    ],

     models: [
      'sisfacturaelectronica.model.DataModels',
      'sisfacturaelectronica.model.DataModelVentas',
      'sisfacturaelectronica.model.DataModelMrp'
    ],
    controllers:[
        'Main'
    ],
    launch: function () {
       //$('#splashscreen').hide();
       Ext.util.Format.decimalSeparator  = '.';
       Ext.util.Format.thousandSeparator = ' ';
       Ext.util.Format.currencyPrecision = 5;

       Ext.getBody().on('keydown', function(ev){
        console.log(ev.ctrlKey);

             if(ev.getKey() == ev.self.F4)
             { sisfacturaelectronica.util.Util.focusControl('txtBuscarCodigoBarrasProd');}
             if(ev.ctrlKey == true && ev.getKey() == 112){ //Ctrb + f1
               // sisfacturaelectronica.util.Util.crearWindowOpenMantenimiento('Tipo de Cambio','wfrmTipoCambio',450,130,null,'wTipoCambio');
             }
        });
       //Ext.create('wMain');
       Ext.create('sisfacturaelectronica.view.seguridad.Login');

       document.getElementById("splashscreen").style.display = 'none';

    }
});
