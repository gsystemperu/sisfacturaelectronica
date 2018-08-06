<?php
use \Phalcon\Mvc\Controller as Controller;

class SeguridadController extends Controller
{
    public function initialize(){$this->view->disable(); }
    public function usuariomenuAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $usuario = $request->get('vusuario');
              $jsonData = Seguridad::LoginMenu($usuario);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function listarperfilesAction(){
        $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData = Seguridad::Pefiles();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
         
    }
    public function listarusuariosAction(){
        $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData = Seguridad::Usuarios();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function usuarioactualizarAction(){
        $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $id  = $request->getPost('id');
              $usuario  = $request->getPost('usuario');
              $clave    = $request->getPost('clave');
              $idperfil = $request->getPost('idperfil');    
              $data = array($id,$usuario,  $clave  , $idperfil);
              $jsonData = Seguridad::usuarioActualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function permisosperfilactualizarAction(){
        $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $id        = $request->getPost('idperfil');
              $permisos  = $request->getPost('permisos');
              $data = array($id,$permisos);
              $jsonData = Seguridad::permisosPerfilActualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function permisosdelperfilAction(){
        $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {  
              $data = array($request->getPost('idperfil'));
              $jsonData = Seguridad::permisosDelPerfil($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function perfilactualizarAction(){
        $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $id  = $request->getPost('id');
              $perfil = $request->getPost('perfil');    
              $data = array($id,$perfil);
              $jsonData = Seguridad::perfilActualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function loginusuarioAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              
              $usuario  = $request->getPost('usuario');
              $clave    = $request->getPost('clave');
              
              $data = array($usuario,$clave);
              $jsonData = Seguridad::loginUsuario($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function usuarioeliminarAction(){
        $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $id  = $request->getPost('id');
              $data = array($id);
              $jsonData = Seguridad::usuarioEliminar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function confinventarioAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {
             $data = array();
             $jsonData = Configuracion::confInventario($data);
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
        }
   }
   public function confpuntoventaAction(){
    $request        = new Phalcon\Http\Request();
    $response       = new \Phalcon\Http\Response();
    if($request->isPost() ==true)
    {
         $data = array();
         $jsonData = Configuracion::confPuntoVenta($data);
         $response->setContentType('application/json', 'UTF-8');
         $response->setContent($jsonData);
         return $response;
    }
}

    
    
    

    


}
