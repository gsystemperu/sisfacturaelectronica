<?php
use \Phalcon\Mvc\Controller as Controller;

class AbastecimientoController extends Controller
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
                    $request->getPost('vtipodoc'),
                    $request->getPost('vserie'),
                    $request->getPost('vnumero'),
                    $request->getPost('vlote'),
                    $request->getPost('vjsondetalle')                   
             );
              
              $jsonData = Abastecimiento::actualizar($data);
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
                 $jsonData = Abastecimiento::listarPorFechas($data);
             }else{
                $data = array
                    (
                        $request->get('start'),
                        $request->get('limit'),
                        $request->get('desde'),
                        $request->get('hasta'),
                        $request->get('proveedor')
                   );
                  $jsonData = Abastecimiento::listarPorFechaProveedor($data);
             }
             //print_r($data);die();
                $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

      public function buscardetalleAction()
    {
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         $format         = new FuncionesHelpers();
         if($request->isGet() ==true)
         {
             
              $data = array
              (
                  $request->get('id')
              );
              $jsonData = Abastecimiento::buscarDetalle($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    


}
