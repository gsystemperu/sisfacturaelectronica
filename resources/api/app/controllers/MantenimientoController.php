<?php
use \Phalcon\Mvc\Controller as Controller;

class MantenimientoController extends Controller
{
    public function initialize(){$this->view->disable(); }
    //#Segmento : Estado
    public function estadolistarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData = Estado::Listado();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function estadoactualizarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idestado     = $request->getPost('idestado');
              $descripcion  = $request->getPost('descripcion');
              $data = array($idestado,$descripcion);
              $jsonData = Estado::actualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    //=================
    //#Segmento : Banco
    public function bancolistarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData = Banco::listado();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function bancoactualizarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idbanco     = $request->getPost('id');
              $descripcion = $request->getPost('descripcion');
              $hsql        = new FuncionesHelpers();
              $data = array( $hsql->esNumeroCero($idbanco),$descripcion);
              $jsonData = Banco::actualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function bancoeliminarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {

              $idbanco  = $request->getPost('id');
              $data     = array($idbanco);
              $jsonData = Banco::eliminar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    //********************
    //#Segmento : Almacen
     public function almacenlistarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData = Almacen::Listado();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function almacenseccioneslistarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {    $idalmacen = $request->get('id');
              if($idalmacen!='')
                $jsonData  = Almacen::ListarSecciones(array($idalmacen));
             else
                $jsonData  = Almacen::ListarSecciones(array());

              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function almacenactualizarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idalmacen   = $request->getPost('id');
              $descripcion = $request->getPost('descripcion');
              $helper = new FuncionesHelpers();
              $data = array( $helper->esNumeroCero($idalmacen),$descripcion);
              $jsonData  = Almacen::actualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function almaceneliminarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idalmacen   = $request->getPost('id');
              $data = array($idalmacen);
              $jsonData  = Almacen::eliminar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function almacenseccionesactualizarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $id          = $request->getPost('id');
              $idalmacen   = $request->getPost('idalmacen');
              $descripcion = $request->getPost('descripcion');
              $usuario     = $request->getPost('usuario');
              $helper      = new FuncionesHelpers();
               $data = array(
                      $id,
                      $idalmacen,
                      $descripcion,
                      $usuario
               );

              $jsonData  = Almacen::actualizarseccion($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
     public function almacenseccioneseliminarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idseccion   = $request->getPost('id');
              $usuario     = $request->getPost('usuario');
              $data = array($idseccion,$usuario);
              $jsonData  = Almacen::eliminarseccion($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    //***********************
    //#Segmento : Categoria
      public function categorialistarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData  = Categoria::listado();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

     public function categoriaactualizarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idcategoria = $request->getPost('id');
              $descripcion = $request->getPost('descripcion');
              $data = array($idcategoria,$descripcion);
              $jsonData  = Categoria::actualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function categoriaeliminarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idcategoria   = $request->getPost('id');
              $data = array($idcategoria);
              $jsonData  = Categoria::eliminar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    //***********************
    //#Segmento : Color
       public function colorlistarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData  = Color::Listado();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
      public function coloractualizarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idcolor = $request->getPost('id');
              $descripcion = $request->getPost('descripcion');
              $data = array($idcolor,$descripcion);
              $jsonData  = Color::actualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function coloreliminarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idcolor   = $request->getPost('id');
              $data = array($idcolor);
              $jsonData  = Color::eliminar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    //=========================
    //#Segmento : Medidas
     public function medidaslistarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData  = Medidas::Listado();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function medidasactualizarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idmedida    = $request->getPost('id');
              $descripcion = $request->getPost('descripcion');
              $data = array($idmedida,$descripcion);
              $jsonData  = Medidas::actualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function medidaseliminarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idmedida   = $request->getPost('id');
              $data = array($idmedida);
              $jsonData  = Medidas::eliminar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }

    //@Tabla Tipo producto
    //=========================
     public function tipoproductolistarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData  = Producto::listarTipoProducto();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

 public function tipoproductoactualizarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $id    = $request->getPost('id');
              $descripcion = $request->getPost('descripcion');


              $data = array($id,$descripcion);
              $jsonData  = Producto::actualizarTipoProducto($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function tipoproductoeliminarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $id    = $request->getPost('id');
              $usuario  = 'DESARROLLO';
              $data = array($id);
              $jsonData  = Producto::eliminarTipoProducto($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }

    //@Tabla Unidad de Medida
    //=========================
    public function unidadmedidalistarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData  = UnidadMedida::ListarUnidadMedida();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    public function unidadmedidaactualizarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $id    = $request->getPost('id');
              $descripcion = $request->getPost('descripcion');
              $usuario     = 'DESARROLLO';
              $data = array($id,$descripcion);
              $jsonData  = UnidadMedida::actualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function unidadmedidaeliminarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $id    = $request->getPost('id');
              $usuario  = 'DESARROLLO';
              $data = array($id);
              $jsonData  = UnidadMedida::eliminar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }




    //@ Tabla Tarifa
    //========================
    public function tarifaslistarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData  = Tarifa::Listado();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
     public function tarifaactualizarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idtarifa    = $request->getPost('id');
              $descripcion = $request->getPost('descripcion');
              $valor       = $request->getPost('valor');
              $usuario     = $request->getPost('usuario');
              $usuario     = 'DESARROLLO';

              $data = array($idtarifa,$descripcion,$valor,$usuario);
              $jsonData  = Tarifa::actualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function tarifaeliminarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idtarifa    = $request->getPost('id');
              $usuario     = $request->getPost('usuario');
              $usuario  = 'DESARROLLO';
              $data = array($idtarifa,$usuario);
              $jsonData  = Tarifa::eliminar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }


    

    //@ Tabla Marca
    //========================
    public function marcalistarAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isGet() ==true)
        {
             $jsonData  = Marca::Listado();
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
        }
   }
    public function marcaactualizarAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {
             $id    = $request->getPost('id');
             $descripcion = $request->getPost('descripcion');
             
             $data = array($id,$descripcion);
             $jsonData  = Marca::actualizar($data);
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
             return $response;
        }
   }
   public function marcaeliminarAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {
             $id    = $request->getPost('id');
             $data = array($id);
             $jsonData  = Marca::eliminar($data);
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
             return $response;
        }
   }


    //@ Tabla Modelo
    //========================
    public function modelolistarAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isGet() ==true)
        {
             $jsonData  = Modelo::Listado();
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
        }
   }
    public function modeloactualizarAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {
             $id    = $request->getPost('id');
             $descripcion = $request->getPost('descripcion');
             
             $data = array($id,$descripcion);
             $jsonData  = Modelo::actualizar($data);
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
             return $response;
        }
   }
   public function modeloeliminarAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {
             $id    = $request->getPost('id');
             $data = array($id);
             $jsonData  = Modelo::eliminar($data);
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
             return $response;
        }
   }


}
