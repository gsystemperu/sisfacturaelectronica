<?php
use \Phalcon\Mvc\Controller as Controller;

class PersonaController extends Controller
{
    public function initialize(){$this->view->disable(); }
    public function documentoidentidadlistaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData = TipoDocumentoIdentidad::Listado();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    
    public function listarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData = Persona::Listar();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function buscarAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $idpersona = $request->get('idpersona');
              $jsonData  = Persona::Buscar($idpersona);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

     public function buscarcuentasbancariasAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $idpersona = $request->get('idpersona');
              $jsonData  = Persona::BuscarCuentasBancarias($idpersona);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    public function actualizarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {    
              $idpersona    = $request->getPost('idpersona');
              $nombre       = $request->getPost('nombre');
              $apellido     = $request->getPost('apellido');
              $idtipodoc    = $request->getPost('idtipodoc');
              $numerodoc    = $request->getPost('numerodoc');
              $direccion    = $request->getPost('direccion');
              $telefono     = $request->getPost('telefono');
              $correo       = $request->getPost('correo');
              $escliente    = $request->getPost('escliente');
              $esproveedor  = $request->getPost('esproveedor');
              $usuario      = $request->getPost('usuario');

              $data = array(
                    $idpersona,  
                    $nombre   ,  
                    $apellido ,  
                    $idtipodoc,  
                    $numerodoc,  
                    $direccion,  
                    $telefono ,  
                    $correo,
                    $escliente , 
                    $esproveedor,
                    $usuario    
              );
              $jsonData  = Persona::actualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function eliminarAction(){
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

   

}
