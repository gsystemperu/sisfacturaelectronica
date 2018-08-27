<?php
/**
 * Services are globally registered in this file
 *
 * @var \Phalcon\Config $config
 */

use Phalcon\Di\FactoryDefault;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Url as UrlResolver;
use Phalcon\Mvc\View\Engine\Volt as VoltEngine;
use Phalcon\Mvc\Model\Metadata\Memory as MetaDataAdapter;
use Phalcon\Session\Adapter\Files as SessionAdapter;
use Phalcon\Flash\Direct as Flash;
use Phalcon\Mvc\Router as Router;

/**
 * The FactoryDefault Dependency Injector automatically register the right services providing a full stack framework
 */
$di = new FactoryDefault();

/**
 * The URL component is used to generate all kind of urls in the application
 */
$di->setShared('url', function () use ($config) {
    $url = new UrlResolver();
    $url->setBaseUri($config->application->baseUri);

    return $url;
});

/**
 * Setting up the view component
 */
$di->setShared('view', function () use ($config) {

    $view = new View();

    $view->setViewsDir($config->application->viewsDir);

    $view->registerEngines(array(
        '.volt' => function ($view, $di) use ($config) {

            $volt = new VoltEngine($view, $di);

            $volt->setOptions(array(
                'compiledPath' => $config->application->cacheDir,
                'compiledSeparator' => '_'
            ));

            return $volt;
        },
        '.phtml' => 'Phalcon\Mvc\View\Engine\Php'
    ));

    return $view;
});

/**
 * Database connection is created based in the parameters defined in the configuration file
 */
$di->setShared('db', function () use ($config) {
    $dbConfig = $config->database->toArray();
    $adapter = $dbConfig['adapter'];
    unset($dbConfig['adapter']);

    $class = 'Phalcon\Db\Adapter\Pdo\\' . $adapter;

    return new $class($dbConfig);
});

/**
 * If the configuration specify the use of metadata adapter use it or use memory otherwise
 */
$di->setShared('modelsMetadata', function () {
    return new MetaDataAdapter();
});

/**
 * Register the session flash service with the Twitter Bootstrap classes
 */
$di->set('flash', function () {
    return new Flash(array(
        'error'   => 'alert alert-danger',
        'success' => 'alert alert-success',
        'notice'  => 'alert alert-info',
        'warning' => 'alert alert-warning'
    ));
});

/**
 * Start the session the first time some component request the session service
 */
$di->setShared('session', function () {
    $session = new SessionAdapter();
    $session->start();
    return $session;
});

/************************************************************
@@ Rutas
*************************************************************/
$di->set('router',function() {

    $router = new Router();
    /*
    | @@ Controlador Seguridad
    */
    $router->add('/usuario_menu', array('controller'=>'seguridad','action'=>'usuariomenu'));

    /*
    | @@ Controlador Mantenimiento
    */
    $router->add('/estados_lista'      , array('controller'=>'mantenimiento','action'=>'estadolistar'));
    $router->add('/bancos_lista'       , array('controller'=>'mantenimiento','action'=>'bancolistar'));
    $router->add('/almacen_lista'      , array('controller'=>'mantenimiento','action'=>'almacenlistar'));
    $router->add('/almacen_secciones_lista', array('controller'=>'mantenimiento','action'=>'almacenseccioneslistar'));
    $router->add('/categoria_lista'    , array('controller'=>'mantenimiento','action'=>'categorialistar'));
    $router->add('/color_lista'        , array('controller'=>'mantenimiento','action'=>'colorlistar'));
    $router->add('/medidas_lista'      , array('controller'=>'mantenimiento','action'=>'medidaslistar'));
    $router->add('/tipo_producto_lista', array('controller'=>'mantenimiento','action'=>'tipoproductolistar'));
    $router->add('/unidad_medida_lista', array('controller'=>'mantenimiento','action'=>'unidadmedidalistar'));
    $router->add('/tarifa_lista'       , array('controller'=>'mantenimiento','action'=>'tarifaslistar'));
    $router->add('/documentos_venta_lista'       , array('controller'=>'cotizacion','action'=>'listardocumentosventa'));

    //# Insertar , Actualizar y eliminar
    $router->add('/almacen_actualizar' , array('controller'=>'mantenimiento','action'=>'almacenactualizar'));
    $router->add('/almacen_eliminar'   , array('controller'=>'mantenimiento','action'=>'almaceneliminar'));
    $router->add('/almacen_seccion_actualizar' , array('controller'=>'mantenimiento','action'=>'almacenseccionesactualizar'));
    $router->add('/almacen_seccion_eliminar' , array('controller'=>'mantenimiento','action'=>'almacenseccioneseliminar'));
    $router->add('/banco_actualizar' , array('controller'=>'mantenimiento','action'=>'bancoactualizar'));
    $router->add('/banco_eliminar'   , array('controller'=>'mantenimiento','action'=>'bancoeliminar'));
    $router->add('/categoria_actualizar' , array('controller'=>'mantenimiento','action'=>'categoriaactualizar'));
    $router->add('/categoria_eliminar'   , array('controller'=>'mantenimiento','action'=>'categoriaeliminar'));
    $router->add('/color_actualizar' , array('controller'=>'mantenimiento','action'=>'coloractualizar'));
    $router->add('/color_eliminar'   , array('controller'=>'mantenimiento','action'=>'coloreliminar'));
    $router->add('/estado_actualizar' , array('controller'=>'mantenimiento','action'=>'estadoactualizar'));
    $router->add('/medidas_actualizar' , array('controller'=>'mantenimiento','action'=>'medidasactualizar'));
    $router->add('/medidas_eliminar'   , array('controller'=>'mantenimiento','action'=>'medidaseliminar'));
    $router->add('/tarifa_actualizar' , array('controller'=>'mantenimiento','action'=>'tarifaactualizar'));
    $router->add('/tarifa_eliminar'   , array('controller'=>'mantenimiento','action'=>'tarifaeliminar'));
    $router->add('/tipo_producto_actualizar' , array('controller'=>'mantenimiento','action'=>'tipoproductoactualizar'));
    $router->add('/tipo_producto_eliminar'   , array('controller'=>'mantenimiento','action'=>'tipoproductoeliminar'));
    $router->add('/unidad_medida_actualizar' , array('controller'=>'mantenimiento','action'=>'unidadmedidaactualizar'));
    $router->add('/unidad_medida_eliminar'   , array('controller'=>'mantenimiento','action'=>'unidadmedidaeliminar'));
    $router->add('/marca_actualizar' , array('controller'=>'mantenimiento','action'=>'marcaactualizar'));
    $router->add('/marca_eliminar'   , array('controller'=>'mantenimiento','action'=>'marcaeliminar'));
    $router->add('/marca_listar'     , array('controller'=>'mantenimiento','action'=>'marcalistar'));
    $router->add('/modelo_actualizar' , array('controller'=>'mantenimiento','action'=>'modeloactualizar'));
    $router->add('/modelo_eliminar'   , array('controller'=>'mantenimiento','action'=>'modeloeliminar'));
    $router->add('/modelo_listar'     , array('controller'=>'mantenimiento','action'=>'modelolistar'));

    $router->add('/empresa_datos'       , array('controller'=>'empresa','action'=>'lista'));
    $router->add('/series_listar'       , array('controller'=>'empresa','action'=>'series'));
    $router->add('/serie_eliminar'      , array('controller'=>'empresa','action'=>'serieseliminar'));
    $router->add('/ticketeras_listar'   , array('controller'=>'empresa','action'=>'ticketeras'));
    $router->add('/ticketera_eliminar'  , array('controller'=>'empresa','action'=>'ticketeraeliminar'));
    $router->add('/tiendas_listar'      , array('controller'=>'empresa','action'=>'tiendas'));
    $router->add('/tienda_eliminar'     , array('controller'=>'empresa','action'=>'tiendaeliminar'));
    $router->add('/empresa_actualizar'  , array('controller'=>'empresa','action'=>'actualizar'));
    $router->add('/empresa_listar_doc_ventas_asignados'  , array('controller'=>'empresa','action'=>'tiendadocumentosventaasignados'));
    $router->add('/empresa_listar_doc_ventas'  , array('controller'=>'empresa','action'=>'tiendadocumentosventa'));
    $router->add('/empresa_listar_ticketeras_asignadas'  , array('controller'=>'empresa','action'=>'tiendaticketerasasignadas'));
    $router->add('/empresa_listar_ticketeras'  , array('controller'=>'empresa','action'=>'tiendaticketeras'));
    $router->add('/empresa_asignar_ticketera'  , array('controller'=>'empresa','action'=>'tiendaasignarticketera'));
    $router->add('/empresa_asignar_documento_venta'  , array('controller'=>'empresa','action'=>'tiendaasignardocumentoventa'));

    $router->add('/empresa_eliminar_documento_venta'  , array('controller'=>'empresa','action'=>'tiendaeliminardocumentoventa'));
    $router->add('/empresa_eliminar_ticketera'  , array('controller'=>'empresa','action'=>'tiendaeliminarticketera'));



    /*
    | @@ Controlador Persona
    */
    $router->add('/tipo_documento_identidad_lista' , array('controller'=>'persona','action'=>'documentoidentidadlista'));
    $router->add('/personas_lista' , array('controller'=>'persona','action'=>'listar'));
    $router->add('/persona_buscar' , array('controller'=>'persona','action'=>'buscar'));
    $router->add('/persona_cuentas_bancarias_buscar' , array('controller'=>'persona','action'=>'buscarcuentasbancarias'));
    $router->add('/persona_actualizar' , array('controller'=>'persona','action'=>'actualizar'));
    $router->add('/persona_eliminar'   , array('controller'=>'persona','action'=>'eliminar'));
    $router->add('/persona_buscar_ventas'   , array('controller'=>'facturacion','action'=>'buscarventascliente'));
    $router->add('/detalle_facturacion'   , array('controller'=>'facturacion','action'=>'detallefacturacion'));



    /*
    | @@ Controlador Producto
    */
    $router->add('/producto_listar' , array('controller'=>'producto','action'=>'listar'));
    $router->add('/producto_listar_oc' , array('controller'=>'producto','action'=>'listarordencompra'));
    $router->add('/producto_actualizar' , array('controller'=>'producto','action'=>'actualizar'));
    $router->add('/producto_eliminar' , array('controller'=>'producto','action'=>'eliminar'));
    $router->add('/producto_codigo_barras' , array('controller'=>'producto','action'=>'bucarcodigobarras'));
    $router->add('/producto_codigo_serie' , array('controller'=>'producto','action'=>'bucarserie'));
    $router->add('/producto_nombre' , array('controller'=>'producto','action'=>'buscarnombre'));
    $router->add('/producto_existencias' , array('controller'=>'producto','action'=>'existenciasporproducto'));
    $router->add('/producto_ubicacion_guardar' , array('controller'=>'producto','action'=>'guardarubicacionproducto'));
    $router->add('/producto_buscar_codigobarras' , array('controller'=>'producto','action'=>'buscarproductoporcodigobarra'));
    $router->add('/producto_buscar_proveedores' , array('controller'=>'producto','action'=>'listarproveedoresproducto'));
    $router->add('/producto_serie_eliminar' , array('controller'=>'producto','action'=>'eliminarserie'));
    $router->add('/producto_inventario_listar' , array('controller'=>'producto','action'=>'listadoinventario'));
    $router->add('/producto_inventario_registros' , array('controller'=>'producto','action'=>'inventarioregistros'));
    $router->add('/producto_inventario_agregar' , array('controller'=>'producto','action'=>'inventarioagregar'));
    $router->add('/producto_inventario_anular' , array('controller'=>'producto','action'=>'inventarioanular'));
    $router->add('/producto_inventario_pdf' , array('controller'=>'impresion','action'=>'imprimirstockinventario'));
    $router->add('/producto_actualizar_cantidad' , array('controller'=>'producto','action'=>'actualizarcantidaddisponible'));
    $router->add('/forma_farmaceutica_listar' , array('controller'=>'producto','action'=>'listarFormaFarmaceutica'));
    $router->add('/forma_farmaceutica_actualizar' , array('controller'=>'producto','action'=>'actualizarformafarmaceutica'));
    $router->add('/forma_farmaceutica_eliminar' , array('controller'=>'producto','action'=>'eliminarformafarmaceutica'));
    $router->add('/producto_actualizar_exitencia' , array('controller'=>'producto','action'=>'actualizarprodexitencia'));
    
    $router->add('/producto_genericos_listar' , array('controller'=>'producto','action'=>'listargenericos'));
    $router->add('/orden_compra_pdf' , array('controller'=>'impresion','action'=>'ordencomprapdf'));
    
    

    /*
    | @@ Controlador Proveedor
    */
    $router->add('/proveedor_listar' , array('controller'=>'proveedor','action'=>'listar'));
    $router->add('/proveedor_actualizar' , array('controller'=>'proveedor','action'=>'actualizar'));
    $router->add('/proveedor_eliminar' , array('controller'=>'proveedor','action'=>'eliminar'));


     /*
    | @@ Controlador Abastecimiento
    */
    $router->add('/abastecimiento_guardar' , array('controller'=>'abastecimiento','action'=>'actualizar'));
    $router->add('/abastecimiento_listar' , array('controller'=>'abastecimiento','action'=>'listar'));
    $router->add('/abastecimiento_detalle' , array('controller'=>'abastecimiento','action'=>'buscardetalle'));

     /*
    | @@ Controlador Orden de Compra
    */
    $router->add('/ordencompra_guardar' , array('controller'=>'ordencompra','action'=>'actualizar'));
    $router->add('/ordencompra_modificar' , array('controller'=>'ordencompra','action'=>'modificar'));
    $router->add('/ordencompra_listar' , array('controller'=>'ordencompra','action'=>'listar'));
    $router->add('/ordencompra_confirmar' , array('controller'=>'ordencompra','action'=>'confirmar'));
    $router->add('/ordencompra_listaconfirmadas' , array('controller'=>'ordencompra','action'=>'listarconfirmadas'));
    $router->add('/ordencompra_detalleconfirmadas' , array('controller'=>'ordencompra','action'=>'detalleordencompraconfirmada'));
    $router->add('/guiaproveedor_guardar' , array('controller'=>'ordencompra','action'=>'actualizarguiaproveedor'));
    $router->add('/ordencompra_buscar_detalle' , array('controller'=>'ordencompra','action'=>'buscarodencompradetalle'));
    $router->add('/ordencompra_anular' , array('controller'=>'ordencompra','action'=>'anularordencompra'));
    $router->add('/ordencompra_anular_confirmado' , array('controller'=>'ordencompra','action'=>'anularordencompraconfirmado'));
    $router->add('/ordencompra_ingresar_pago_acuenta' , array('controller'=>'ordencompra','action'=>'ingresarPagoAcuenta'));
    $router->add('/ordencompra_buscar_pago_acuenta' , array('controller'=>'ordencompra','action'=>'buscarPagoAcuenta'));
    $router->add('/orderncompra_listar_tipo_compra' , array('controller'=>'ordencompra','action'=>'listartipoordencompra'));
    $router->add('/ordercompra_lista_detalle_ingresos' , array('controller'=>'ordencompra','action'=>'listardetalleingresos'));



    /*************************************************************************************************************************
     | @@ Controlador de Cotizaciones,Clientes y Reportes
     */

     $router->add('/listar_documentos', array('controller'=>'cotizacion','action'=>'tipodocumentolista'));
     $router->add('/buscar_producto', array('controller'=>'cotizacion','action'=>'productolista'));
     $router->add('/buscar_producto_por_persona', array('controller'=>'cotizacion','action'=>'productolistaporcliente'));
     $router->add('/eliminar_producto', array('controller'=>'cotizacion','action'=>'productoeliminar'));
     $router->add('/buscar_cliente', array('controller'=>'cotizacion','action'=>'clientelista'));
     $router->add('/eliminar_cliente', array('controller'=>'cotizacion','action'=>'clienteeliminar'));
     $router->add('/buscar_cliente_codigo', array('controller'=>'cotizacion','action'=>'buscarclientecodigo'));
     $router->add('/agregar_cotizacion', array('controller'=>'cotizacion','action'=>'agregarcotizacion'));
     $router->add('/eliminar_cotizacion', array('controller'=>'cotizacion','action'=>'cotizacioneliminar'));
     $router->add('/confirmar_venta_cotizacion', array('controller'=>'cotizacion','action'=>'cotizacionconfirmarventa'));
     $router->add('/agregar_cliente', array('controller'=>'cotizacion','action'=>'agregarcliente'));
     $router->add('/agregar_cliente_via_listado', array('controller'=>'cotizacion','action'=>'agregarclientevialistado'));
     $router->add('/listar_cotizaciones', array('controller'=>'cotizacion','action'=>'cotizacioneslista'));
     $router->add('/cotizacion_detalle', array('controller'=>'cotizacion','action'=>'cotizacionesdetalle'));
     $router->add('/cotizacion_detalle_vista', array('controller'=>'cotizacion','action'=>'cotizacionesdetallevista'));

     $router->add('/listar_forma_pago', array('controller'=>'cotizacion','action'=>'formapago'));
     $router->add('/listar_modo_entrega', array('controller'=>'cotizacion','action'=>'modoentrega'));
     $router->add('/listar_vendedores', array('controller'=>'cotizacion','action'=>'vendedores'));
     $router->add('/listar_unidad_medida', array('controller'=>'cotizacion','action'=>'uniaddmedidalista'));
     $router->add('/listar_presentacion', array('controller'=>'cotizacion','action'=>'presentacionlista'));
     $router->add('/listar_categorias', array('controller'=>'cotizacion','action'=>'categorialista'));

     //$router->add('/guardar_producto', array('controller'=>'cotizacion','action'=>'productoguardar'));

     $router->add('/buscar_cotizaciones_cliente', array('controller'=>'cotizacion','action'=>'cotizacionesclientebuscar'));

     //@Mantenimiento eliminar
     $router->add('/eliminar_vendedor', array('controller'=>'cotizacion','action'=>'vendedoreliminar'));
     $router->add('/eliminar_modo_entrega', array('controller'=>'cotizacion','action'=>'modoentregaeliminar'));
     $router->add('/eliminar_forma_pago', array('controller'=>'cotizacion','action'=>'formapagoeliminar'));
     //@Reportes : Cotizaciones
     $router->add('/pdf_cotizacion_vertical', array('controller'=>'cotizacion','action'=>'pdfcotizacionvertical'));
     $router->add('/pdf_cotizacion_horizontal', array('controller'=>'cotizacion','action'=>'pdfcotizacionhorizontal'));

     //@Reportes : Facturacion
     $router->add('/cotizaciones_a_facturar', array('controller'=>'cotizacion','action'=>'listarCotizacionesParaFacturar'));
     $router->add('/agregar_facturacion', array('controller'=>'facturacion','action'=>'actualizar'));
     $router->add('/agregar_pago_acuenta', array('controller'=>'facturacion','action'=>'actualizarPagoAcuenta'));
     $router->add('/buscar_pago_acuenta', array('controller'=>'facturacion','action'=>'buscarpagoacuenta'));
     $router->add('/agregar_punto_venta_pago', array('controller'=>'facturacion','action'=>'actualizarpuntoventapago'));
     $router->add('/buscar_punto_venta_pagos', array('controller'=>'facturacion','action'=>'buscarventaspdv'));
     $router->add('/anular_facturacion', array('controller'=>'facturacion','action'=>'anularfactura'));
     $router->add('/actualizar_guia_remision', array('controller'=>'facturacion','action'=>'actualizarguiaremision'));
     $router->add('/listar_moneda', array('controller'=>'facturacion','action'=>'listarmoneda'));
     $router->add('/listar_nombre_moneda', array('controller'=>'facturacion','action'=>'listarnombremoneda'));
     $router->add('/ingresar_apetura_caja', array('controller'=>'facturacion','action'=>'aperturacajaingresar'));
     $router->add('/listar_apetura_caja', array('controller'=>'facturacion','action'=>'listaraperturacaja'));
     $router->add('/listar_apetura_caja_his', array('controller'=>'facturacion','action'=>'listarhistoricoaperturacaja'));
     $router->add('/listar_motivos_translado', array('controller'=>'facturacion','action'=>'listarmotivostranslados'));
     $router->add('/listar_metodo_pago', array('controller'=>'facturacion','action'=>'listarmetodopago'));
     $router->add('/listado_ventas', array('controller'=>'impresion','action'=>'impresiondeventas'));
     $router->add('/cerrar_caja', array('controller'=>'facturacion','action'=>'cerrarcaja'));
     $router->add('/reporte_ventas_admin', array('controller'=>'impresion','action'=>'impresiondeventasfacturacion'));
     $router->add('/generar_txt_facturador', array('controller'=>'facturacion','action'=>'generartxtfacturador'));
     $router->add('/tipo_nota_credito', array('controller'=>'facturacion','action'=>'tiponotacredito'));
     $router->add('/agregar_nota', array('controller'=>'facturacion','action'=>'actualizarnota'));
     

     //@Mantenimientos : Tablas Principales
     $router->add('/agregar_unidad_medida', array('controller'=>'cotizacion','action'=>'unidadmedidaactualizar'));
     $router->add('/agregar_forma_pago', array('controller'=>'cotizacion','action'=>'formapagoactualizar'));
     $router->add('/agregar_modo_entrega', array('controller'=>'cotizacion','action'=>'modoentregaactualizar'));
     $router->add('/agregar_vendedor', array('controller'=>'cotizacion','action'=>'vendedoractualizar'));
     $router->add('/agregar_categoria', array('controller'=>'cotizacion','action'=>'categoriaactualizar'));
     $router->add('/agregar_presentacion', array('controller'=>'cotizacion','action'=>'presentacionactualizar'));
     $router->add('/eliminar_categoria', array('controller'=>'cotizacion','action'=>'categoriaeliminar'));
     $router->add('/eliminar_presentacion', array('controller'=>'cotizacion','action'=>'presentacioneliminar'));


     //@Estadisticas : Reportes para Gerenta
     $router->add('/estadistica_por_cliente', array('controller'=>'cotizacion','action'=>'estadisticaclientecotizaciones'));
     $router->add('/estadistica_por_producto', array('controller'=>'cotizacion','action'=>'estadisticaproductocotizaciones'));
     $router->add('/estadistica_por_vendedor', array('controller'=>'cotizacion','action'=>'estadisticavendedorcotizaciones'));

    //@Estadisticas : Impresión - Reportes PDF
    $router->add('/cotizacion_enviarmail', array('controller'=>'impresion','action'=>'enviarCotizacion'));
    $router->add('/reporte_ventas', array('controller'=>'impresion','action'=>'reporteVentas'));
    $router->add('/reporte_cc_cliente', array('controller'=>'impresion','action'=>'reportecuentacorrientecliente'));
    $router->add('/reporte_pagos_cliente', array('controller'=>'impresion','action'=>'reporteventapagoscliente'));
    $router->add('/print_nota'  , array('controller'=>'impresion','action'=>'impresionnota'));
    $router->add('/visualizar_nota'  , array('controller'=>'impresion','action'=>'visualizarnota'));

    //$router->add('/print_boleta', array('controller'=>'impresion','action'=>'impresionnota'));
    //$router->add('/print_factura', array('controller'=>'impresion','action'=>'impresionnota'));

    $router->add('/imprimirproforma', array('controller'=>'impresion','action'=>'imprimirproforma'));
    $router->add('/imprimirticket', array('controller'=>'impresion','action'=>'imprimirticketera'));
    $router->add('/imprimirguiaremision', array('controller'=>'impresion','action'=>'impresionguiaremision'));
    $router->add('/imprimirresumenticketera', array('controller'=>'impresion','action'=>'imprimirresumenventaticketera'));
    $router->add('/imprimirfacturaelectronica', array('controller'=>'impresion','action'=>'imprimirfacturaelectronica'));

    
    //@ Manufactura  (MRP)
    $router->add('/lista_materiales_producto'  , array('controller'=>'manufactura','action'=>'listarmaterialproducto'));

    //@ Seguridad  
    $router->add('/perfiles_listar'  , array('controller'=>'seguridad','action'=>'listarperfiles'));
    $router->add('/usuarios_listar'  , array('controller'=>'seguridad','action'=>'listarusuarios'));
    $router->add('/usuario_actualizar'  , array('controller'=>'seguridad','action'=>'usuarioactualizar'));
    $router->add('/persmisos_actualizar'  , array('controller'=>'seguridad','action'=>'permisosperfilactualizar'));
    $router->add('/persmisos_del_perfil'  , array('controller'=>'seguridad','action'=>'permisosdelperfil'));
    $router->add('/perfil_actualizar'  , array('controller'=>'seguridad','action'=>'perfilactualizar'));
    $router->add('/usuario_login'  , array('controller'=>'seguridad','action'=>'loginusuario'));
    $router->add('/usuario_eliminar'  , array('controller'=>'seguridad','action'=>'usuarioeliminar'));

    $router->add('/conf_inventario'  , array('controller'=>'seguridad','action'=>'confinventario'));
    $router->add('/conf_punto_venta'  , array('controller'=>'seguridad','action'=>'confpuntoventa'));
    
    

     /************************************/
    return $router;
});
