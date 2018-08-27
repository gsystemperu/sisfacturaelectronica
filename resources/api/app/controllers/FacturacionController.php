<?php
use \Phalcon\Mvc\Controller as Controller;

class FacturacionController extends Controller
{
    public function initialize(){$this->view->disable(); }

    public function actualizarAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $vId           =  $request->getPost('idfacturacion');
           $vIdCoti       =  $request->getPost('idcoti');
           $vFecha        =  $request->getPost('fechacoti');
           $vIdCliente    =  $request->getPost('idper');
           $vUsuario      =  $request->getPost('vusuario');
           $vJsonDetalle  =  $request->getPost('vjsondetalle');
           $vFormaPago    =  $request->getPost('idfopag');
           $vModoEntrega  =  ($request->getPost('idmodo')==''?0:$request->getPost('idmodo'));
           $vDocVenta     =  $request->getPost('documentoventa');
           $vIncluyeIgv   = ($request->getPost('incluyeigv')=='on'? 1:0);
           $vFechaValidoHasta  = ( $request->getPost('validohasta')==''? $request->getPost('fechavalidohasta') : $request->getPost('validohasta'));
           $vSerieDoc     = $request->getPost('seriedoc');
           $vNumeroDoc    = $request->getPost('numerodoc');
           $vPagoAcuenta  = $request->getPost('pagoacuenta');
           $vIdmoneda     = $request->getPost('idmoneda');
           $data = array($vId,$vIdCoti,$vFecha,$vIdCliente,$vUsuario,$vJsonDetalle, $vFormaPago,$vModoEntrega,$vDocVenta,$vIncluyeIgv,$vFechaValidoHasta,$vSerieDoc,$vNumeroDoc,$vPagoAcuenta,$vIdmoneda);
           $jsonData             = Facturacion::actualizar($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;
      }
    }
    public function actualizarnotaAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $vId           =  $request->getPost('idfacturacion');
           $vIdCoti       =  $request->getPost('idcoti');
           $vFecha        =  $request->getPost('fechacoti');
           $vIdCliente    =  $request->getPost('idper');
           $vUsuario      =  $request->getPost('vusuario');
           $vJsonDetalle  =  $request->getPost('vjsondetalle');
           $vFormaPago    =  $request->getPost('idfopag');
           $vModoEntrega  =  ($request->getPost('idmodo')==''?0:$request->getPost('idmodo'));
           $vDocVenta     =  $request->getPost('documentoventa');
           $vIncluyeIgv   = ($request->getPost('incluyeigv')=='on'? 1:0);
           $vFechaValidoHasta  = ( $request->getPost('validohasta')==''? $request->getPost('fechavalidohasta') : $request->getPost('validohasta'));
           $vSerieDoc     = $request->getPost('seriedoc');
           $vNumeroDoc    = $request->getPost('numerodoc');
           $vPagoAcuenta  = $request->getPost('pagoacuenta');
           $vIdmoneda     = $request->getPost('idmoneda');
           $vNtipo     = $request->getPost('nctipo');
           $vMotivo     = $request->getPost('ncmotivo');
           
           $data = array($vId,$vIdCoti,$vFecha,$vIdCliente,$vUsuario,$vJsonDetalle, $vFormaPago,$vModoEntrega,$vDocVenta,$vIncluyeIgv,$vFechaValidoHasta,$vSerieDoc,$vNumeroDoc,$vPagoAcuenta,$vIdmoneda,$vNtipo,$vMotivo);
           //print_r($data);die();
           $jsonData             = Facturacion::actualizarNota($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;
      }
    }
    public function anularAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idpersona   = $request->getPost('idpersona');
              $usuario    = $request->getPost('usuario');
              $data = array($idpersona,$usuario);
              $jsonData  = Persona::eliminar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }

    public function actualizarpagoacuentaAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $vId           = $request->getPost('idfacturacion');
           $vJsonDetalle  =  $request->getPost('vjsondetalle');
           $data          = array($vId,$vJsonDetalle);
           $jsonData      = Facturacion::actualizarPagoAcuenta($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;
      }
    }
    public function buscarpagoacuentaAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $vId           = $request->getPost('idfacturacion');
           $data          = array($vId);
           $jsonData      = Facturacion::buscarPagoAcuenta($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent($jsonData);
           return $response;
      }
    }

    public function actualizarpuntoventapagoAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $vId           = $request->getPost('id');
           $vIdCoti       = $request->getPost('idcoti');
           $vIdCliente    = $request->getPost('idper');
           $vUsuario      = $request->getPost('vusuario');
           $vJsonDetalle  = $request->getPost('vjsondetalle');
           $vFormaPago    = $request->getPost('idfopag');
           $vModoEntrega  = $request->getPost('idmodo');
           $vDocVenta     = $request->getPost('documentoventa');
           $vIncluyeIgv   = 1;
           $vSerieDoc     = $request->getPost('serie');
           $vNumeroDoc    = $request->getPost('numerodoc');
           $vAcuenta      = $request->getPost('acuenta');

           $data = array($vId,$vIdCoti,'',$vIdCliente,$vUsuario,$vJsonDetalle, $vFormaPago,$vModoEntrega,$vDocVenta,true,'',$vSerieDoc,$vNumeroDoc,$vAcuenta);
           
           $jsonData             = Facturacion::guardarPuntoVentaPago($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;
      }
    }
    public function buscarventaspdvAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isGet() ==true)
      {
           $vDesde        = $request->get('desde');
           $vHasta        = $request->get('hasta');
           if(strlen($vDesde)=='' && strlen($Hasta)=='')
           {
              $data       = array();
           }else{
              $data       = array($vDesde,$vHasta);
           }

           $jsonData      = Facturacion::buscarVentasPdv($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent($jsonData);
           return $response;
      }
    }
    public function buscarventasclienteAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isGet() ==true)
      {
           $vIdper        = $request->get('idper');
           $data          = array($vIdper);
           $jsonData      = Facturacion::buscarVentasCliente($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent($jsonData);
           return $response;
      }
    }

    public function anularfacturaAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $vId           = $request->getPost('idfacturacion');
           $vIdcoti       = $request->getPost('idcotizacion');
           $vMotivo       = $request->getPost('motivo');
           $data          = array($vId,$vIdcoti,$vMotivo);
           $jsonData      = Facturacion::anular($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;
      }
    }

    public function detallefacturacionAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isGet() ==true)
      {
           $vId           = $request->get('idfacturacion');
           if($vId=='')   $vId           = $request->get('vIdCotizacion');
           $data          = array($vId);
           if($request->get('orden'))
           {
            $jsonData      = Facturacion::detalleFacturacionImpresion($data);
           }else{
            $jsonData      = Facturacion::detalleFacturacion($data);
           }
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent($jsonData);
           return $response;
      }
    }
    public function actualizarguiaremisionAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {

           $vid             =  $request->getPost('id');
           $idfacturacion   =  $request->getPost('idfactura');
           $fechaemision    =  $request->getPost('fechaemision');
           $puntopartida    =  $request->getPost('puntopartida');
           $puntollegada    =  $request->getPost('puntollegada');
           $fechatraslado   =  $request->getPost('fechatraslado');
           $costominimo     =  $request->getPost('costominimo');
           $razonsocialdestinatorio   =  $request->getPost('razonsocialdestinatario');
           $rucdestinatorio     =  $request->getPost('rucdestinatario');
           $dnidestinatorio     =  $request->getPost('dnidestinatario');
           $marcanumeroplaca    =  $request->getPost('marcanumeroplaca');
           $numeroconstanciainscripcion  =  $request->getPost('numeroconstanciainscripcion');
           $numerolicenciaconductor      =  $request->getPost('numerolicenciaconductor');
           $empresatransporterazonsocial =  $request->getPost('empresatransporterazonsocial');
           $empresatransporteruc         =  $request->getPost('empresatransporteruc');
           $jsondetalle       =  $request->getPost('vjsondetalle');
           $motivotranslado   =  $request->getPost('idmotivotranslado');
           $idcotizacion      =  $request->getPost('idcotizacion');
           $numeroguia        =  trim($request->getPost('serieguia')).'-'.trim($request->getPost('numeroguia'));
           

           $data = array(
            $vid,
            $idfacturacion,
            $fechaemision,
            $puntopartida,
            $puntollegada,
            $fechatraslado,
            $costominimo,
            $razonsocialdestinatorio,
            $rucdestinatorio,
            $dnidestinatorio,
            $marcanumeroplaca,
            $numeroconstanciainscripcion,
            $numerolicenciaconductor,
            $empresatransporterazonsocial,
            $empresatransporteruc,
            $jsondetalle,
            $motivotranslado,
            $idcotizacion,
            $numeroguia
           );
           $jsonData             = GuiaRemision::actualizar($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;
      }
    }

    public function listarmonedaAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isGet() ==true)
      {
           $data          = array();
           $jsonData      = Facturacion::listarMoneda($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent($jsonData);
           return $response;
      }
    }

    public function listarnombremonedaAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isGet() ==true)
      {
           $data          = array();
           $jsonData      = AperturaCaja::listarmonedas($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent($jsonData);
           return $response;
      }
    }

    public function aperturacajaingresarAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $data          = array(
            $request->getPost('id'),
            $request->getPost('comentario'),
            $request->getPost('jsondetalle')
           );

           $jsonData      = AperturaCaja::actualizar($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;
      }
    }


        public function listarmotivostransladosAction(){
          $request        = new Phalcon\Http\Request();
          $response       = new \Phalcon\Http\Response();
          if($request->isGet() ==true)
          {
               $data          = array();
               $jsonData      = GuiaRemision::motivosTransladoListado($data);
               $response->setContentType('application/json', 'UTF-8');
               $response->setContent($jsonData);
               return $response;
          }
        }
    public function listarmetodopagoAction(){
          $request        = new Phalcon\Http\Request();
          $response       = new \Phalcon\Http\Response();
          if($request->isGet() ==true)
          {
               $jsonData      = Facturacion::listarMetodosPago();
               $response->setContentType('application/json', 'UTF-8');
               $response->setContent($jsonData);
               return $response;
          }
        }
        public function listaraperturacajaAction(){
          $request        = new Phalcon\Http\Request();
          $response       = new \Phalcon\Http\Response();
          if($request->isGet() ==true)
          {
               $jsonData      = AperturaCaja::listaaperturacaja();
               $response->setContentType('application/json', 'UTF-8');
               $response->setContent($jsonData);
               return $response;
          }
        }
        public function listarhistoricoaperturacajaAction(){
          $request        = new Phalcon\Http\Request();
          $response       = new \Phalcon\Http\Response();
          if($request->isGet() ==true)
          {
               $jsonData = AperturaCaja::historialaperturacaja();
               $response->setContentType('application/json', 'UTF-8');
               $response->setContent($jsonData);
               return $response;
          }
        }
        public function cerrarcajaAction(){
          $request        = new Phalcon\Http\Request();
          $response       = new \Phalcon\Http\Response();
          if($request->isGet() ==true)
          {
               $jsonData = Facturacion::cerrarCaja();
               $response->setContentType('application/json', 'UTF-8');
               $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
               return $response;
          }
        }
        public function generartxtfacturadorAction(){
          $request        = new Phalcon\Http\Request();
          $response       = new \Phalcon\Http\Response();
          if($request->isPost() ==true)
          {
               $vId  = $request->getPost('idfact');
               $data = array($vId);
               $jsonData = Facturacion::volverGenerarDataFacturador($data);
               $response->setContentType('application/json', 'UTF-8');
               $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
               return $response;
          }
      }
      public function tiponotacreditoAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isGet() ==true)
        {
             $data          = array();
             $jsonData      = Facturacion::tipoNotaCredito($data);
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
        }
      }
        

        
}
