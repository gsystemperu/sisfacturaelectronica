<?php
use \Phalcon\Mvc\Controller as Controller;

class ProveedorController extends Controller
{
    public function initialize(){$this->view->disable(); }
    public function listarAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isGet() ==true)
        {    
              $proveedor = $request->get('proveedor');
              if($proveedor){
                $data = array($proveedor);
                $jsonData = Proveedor::buscarProveedor($data);
              }else{
                $jsonData = Proveedor::listado();
              }

             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
        }
   }


   public function actualizarAction()
   {
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         
         if($request->isPost() == true)
         {
             $data = array(
                    $request->getPost('id'),
                    $request->getPost('razonsocial'),
                    $request->getPost('contacto'),
                    $request->getPost('telefono'),
                    $request->getPost('direccion'),
                    $request->getPost('direccionfiscal'),
                    $request->getPost('numrucprov'),
                    $request->getPost('correo')
             );
              $jsonData = Proveedor::actualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
     public function eliminarAction()
   {
         $request        = new \Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         
         if($request->isPost() == true)
         {
             $data = array(
                    $request->getPost('id'),
             );
              $jsonData = Proveedor::eliminar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    


}
