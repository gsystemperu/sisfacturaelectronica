<?php
use \Phalcon\Mvc\Controller as Controller;

class OrdencompraController extends Controller
{
    public function initialize(){$this->view->disable(); }
    public function actualizarAction()
    {
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         $format         = new FuncionesHelpers();
         if($request->isPost() ==true)
         {
             $data = array
             (
                    $format->esNumeroCero($request->getPost('vid')),
                    $request->getPost('vidproveedor'),
                    $request->getPost('vfecha'),
                    ($request->getPost('flagestadoigv')==''?0:1),
                    $request->getPost('vjsondetalle'),
                    $request->getPost('idmoneda'),
                    $request->getPost('documentoventa'),
                    $request->getPost('idalmacen'),
                    $request->getPost('idformapago'),
                    $request->getPost('serie'),
                    $request->getPost('numerodoc'),
                    $request->getPost('usuario')
              );
              $jsonData = OrdenCompra::actualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;

         }
    }

  public function modificarAction()
    {
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         $format         = new FuncionesHelpers();
         if($request->isPost() ==true)
         {
             $data = array
             (
                    $format->esNumeroCero($request->getPost('id')),
                    $request->getPost('idprov'),
                    $request->getPost('fecha'),
                    ($request->getPost('flagestadoigv')==''?0:1),
                    $request->getPost('vjsondetalle'),
                    $request->getPost('idmoneda')
             );
             //print_r($data);die();
               $jsonData = OrdenCompra::actualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;

         }
    }

     public function listarAction()
    {
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         $format         = new FuncionesHelpers();
         if($request->isGet() ==true)
         {

             if($request->get('proveedor')=='' ||  $request->get('proveedor') == 0){
                $data = array
                    (
                        $request->get('start'),
                        $request->get('limit'),
                        $request->get('desde'),
                        $request->get('hasta')
                    );
                    if(  $request->get('desde') == ''){
                      $data = array
                          (
                              $request->get('start'),
                              $request->get('limit')

                          );
                    }

                 $jsonData = OrdenCompra::listarPorFechas($data);
             }else{
                $data = array
                    (
                        $request->get('start'),
                        $request->get('limit'),
                        $request->get('desde'),
                        $request->get('hasta'),
                        $request->get('proveedor')
                   );
                  $jsonData = OrdenCompra::listarPorFechaProveedor($data);
             }
             //print_r($data);die();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    public function confirmarAction()
    {
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         $format         = new FuncionesHelpers();
         if($request->isPost() ==true)
         {
             $data = array
             (
                    $format->esNumeroCero($request->getPost('id')),
                    'EERAZO'
             );

              $jsonData = OrdenCompra::confirmar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;

         }
    }

       public function listarconfirmadasAction()
    {
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         $format         = new FuncionesHelpers();
         if($request->isGet() ==true)
         {
             if($request->get('proveedor')=='' ||  $request->get('proveedor') == 0){
                $data = array
                    (
                        $request->get('start'),
                        $request->get('limit'),
                        $request->get('desde'),
                        $request->get('hasta')
                    );
                 if(  $request->get('desde') == ''){
                   $data = array
                       (
                           $request->get('start'),
                           $request->get('limit')

                       );
                 }
                 $jsonData = OrdenCompra::listarPorFechasConfirmadas($data);
             }else{
                $data = array
                    (
                        $request->get('start'),
                        $request->get('limit'),
                        $request->get('desde'),
                        $request->get('hasta'),
                        $request->get('proveedor')
                   );
                  $jsonData = OrdenCompra::listarPorFechaProveedorConfirmadas($data);
             }
             
                $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    public function detalleordencompraconfirmadaAction()
    {
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         $format         = new FuncionesHelpers();
         if($request->isPost() ==true)
         {
              $data = array($request->getPost('id'));
              $jsonData = OrdenCompra::listarDetalleOrdenCompraConfirmada($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    /*====================================================
    * Procedimientos para el ingreso de guias del proveedor
    *
    =====================================================*/
    public function actualizarguiaproveedorAction(){
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         $format         = new FuncionesHelpers();
         if($request->isPost() ==true)
         {
              $data = array(
                  $request->getPost('id'),
                  $request->getPost('idordencompra'),
                  $request->getPost('fecha'),
                  $request->getPost('idprovedor'),
                  $request->getPost('serieGuia'),
                  $request->getPost('numeroGuia'),
                  $request->getPost('numerolote'),
                  $request->getPost('jsondetalle')
              );

              $jsonData = GuiaProveedor::actualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }

    public function buscarodencompradetalleAction(){
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         $format         = new FuncionesHelpers();
         if($request->isPost() ==true)
         {
              $data     = array($request->getPost('id'));
              $jsonData = OrdenCompra::buscarOrdenCompraDetalle($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    public function anularordencompraAction(){
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         $format         = new FuncionesHelpers();
         if($request->isPost() ==true)
         {
              $data = array(
                  $request->getPost('id'),
              );

              $jsonData = OrdenCompra::ordenCompraAnular($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function anularordencompraconfirmadoAction(){
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         $format         = new FuncionesHelpers();
         if($request->isPost() ==true)
         {
              $data = array(
                  $request->getPost('id'),
              );

              $jsonData = OrdenCompra::ordenCompraAnularConfirmado($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }

    public function ingresarPagoAcuentaAction(){
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         $format         = new FuncionesHelpers();
         if($request->isPost() ==true)
         {
              $data = array(
                $request->getPost('idordencompra'),
                $request->getPost('jsondetalle')
              );

              $jsonData = OrdenCompra::ingresarPagoAcuenta($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function buscarPagoAcuentaAction(){
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         $format         = new FuncionesHelpers();
         if($request->isPost() ==true)
         {
              $data = array($request->getPost('idordencompra'));
              $jsonData = OrdenCompra::buscarPagoAcuenta($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    public function listartipoordencompraAction()
    {
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         $format         = new FuncionesHelpers();
         if($request->isGet() ==true)
         {
              $data = array();
              $jsonData = OrdenCompra::listarTipoCompra($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    public function listardetalleingresosAction()
    {
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         $format         = new FuncionesHelpers();
         if($request->isGet() ==true)
         {
              $data = array(
                $request->get('id')
              );
             // print_r( $data );die();
              $jsonData = OrdenCompra::listarDetalleDeOrdenPorIngresos($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    
}
