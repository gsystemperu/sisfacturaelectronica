<?php
use \Phalcon\Mvc\Controller as Controller;

class ProductoController extends Controller
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
              $tipoproducto = $request->get('tipoproducto');
              if($tipoproducto>0)
              {
                    $data = array($tipoproducto);
                    $jsonData = Producto::buscarTipo($data);
                    $response->setContentType('application/json', 'UTF-8');
                    $response->setContent($jsonData);
                    return $response;
              }else{
                  if(strlen($request->get('nombre'))==0 || $request->get('nombre') =='*' )
                  {
                    $jsonData = Producto::listar();
                  }else{
                    if(strlen($request->get('idclie'))==0){
                      $data = array($request->get('nombre'));
                      $jsonData = Producto::buscarNombre($data);
                    }elseif($request->get('codigobarras')!=''){
                      $data = array($request->get('codigobarras'), $request->get('idclie'));
                      $jsonData = Producto::buscarCodigoBarras($data);
                    }elseif(strlen($request->get('marca'))!=''){
                      $data = array($request->get('marca'));
                      $jsonData = Producto::buscarMarca($data);
                    }else{
                      $data = array($request->get('nombre'),$request->get('idclie'));
                      if($request->get('tb')==1){
               
                        $jsonData = Producto::buscarNombreYcliente($data);
                      }else{
                      
                        $jsonData = Producto::buscarNombreYclienteGenerico($data);
                      }
                   }
                  }
                  $response->setContentType('application/json', 'UTF-8');
                  $response->setContent($jsonData);
                  return $response;
              }


         }
    }
    public function listarordencompraAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         $util           = new FuncionesHelpers();
         if($request->isGet() ==true)
         {
              if(strlen($request->get('query'))>0){
                    $data     = array($request->get('query'));
                    $jsonData = Producto::buscarProductoOrdenCompraFiltro($data);
              }else{
                    if(strlen($request->get('nombre'))==0)
                    {
                         $data =array($request->get('idprov'));
                         $jsonData = Producto::buscarOrdenCompra($data);
                    }else{
                         $data = array(
                              $util->esNumeroCero($request->get('idprov')),
                              $request->get('nombre')
                         );
                         $jsonData = Producto::buscarProductoOrdenCompra($data);
                    }
              }
                

              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function listarproveedoresproductoAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $data = array($request->getPost('idprod'));
              $jsonData = Producto::proveedoresDelProducto($data);
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
              $idproducto       = $request->getPost('id');
              $codigobarras     = $request->getPost('codigobarras');
              $codigoserie      = $request->getPost('codigoproducto');
              $nombre           = $request->getPost('nombre');
              $idtipoprod       = $request->getPost('idtipoproducto');
              $talla            = $request->getPost('talla');
              $idcolor          = $request->getPost('idcolor');
              $idmedida         = $request->getPost('idmedida');
              $preciocompra     = $request->getPost('preciocompra');
              $idunidadmedida   = $request->getPost('idunidadmedida');
              $idunidadmedidafrac= $request->getPost('idunidadmedidafraccion');
              $composicion      = $request->getPost('composicion');
              $precioventa      = $request->getPost('precioventa');
              $precioventafrac  = $request->getPost('precioventafraccion');
              $preciodolares    = $request->getPost('preciodolares');
              $stockmin         = $request->getPost('stockminimo');
              $fechacaducidad   = $request->getPost('fechacaducidad');
              $usuario          = $request->getPost('usuario');
              $manejastock      = $request->getPost('manejastock');
              $jsondetalle      = $request->getPost('jsondetalle');
              $ventadosis       = $request->getPost('ventadosis');
              $preciodosis      = $request->getPost('preciodosis');
              $cantidaddosis    = $request->getPost('catidaddosis');
              $ventaunidad      = $request->getPost('ventaunidad');
              $preciounidad     = $request->getPost('preciounidad');
              $nombregenerico   = $request->getPost('nombregenerico');
              $idformafarma     = $request->getPost('idformafarmaceutica');
              $ventablister     = $request->getPost('ventablister');
              $precioblister    = $request->getPost('precioblister');
              $ventarecetamed   = $request->getPost('ventaconreceta');
              $idseccion        = $request->getPost('idalmacenseccion');
              $cantblister      = $request->getPost('cantidadblister');
              $accionfarma      = $request->getPost('accionfarmacologica');

              //echo "test";die();
              //$usuario = "BOTICA";
              $formato  = new FuncionesHelpers();
              $data = array(
                   $formato->esNumeroCero($idproducto),
                    $codigobarras,
                    $codigoserie ,
                    $nombre,
                    $formato->esNumeroCero($idtipoprod),
                    $talla,
                    $formato->esNumeroCero($idcolor),
                    $formato->esNumeroCero($idmedida),
                    $formato->esNumeroCero($preciocompra),
                    $formato->esNumeroCero($idunidadmedida),
                    $formato->esNumeroCero($idunidadmedidafrac),
                    0,
                    $formato->esNumeroCero($precioventa) ,
                    $formato->esNumeroCero($precioventafrac),
                    $formato->esNumeroCero($preciodolares),
                    $formato->esNumeroCero($stockmin),
                    $fechacaducidad,
                    $usuario,
                    $manejastock,
                    $formato->esNumeroCero($request->getPost('precioprodlocalespecial')) ,
                    $formato->esNumeroCero($request->getPost('precioprodlocalespecial2')) ,
                    $formato->esNumeroCero($request->getPost('precioprodlocalespecial3')) ,
                    $formato->esNumeroCero($request->getPost('precioprodprovincia')) ,
                    $formato->esNumeroCero($request->getPost('precioprodprovinciaespecial')) ,
                    $formato->esNumeroCero($request->getPost('precioprodprovinciaespecial2')) ,
                    $formato->esNumeroCero($request->getPost('precioprodprovinciaespecial3')) ,
                    $formato->esNumeroCero($request->getPost('precioproddistribuidorlima')) ,
                    $formato->esNumeroCero($request->getPost('precioproddistribuidorprovincia')),
                    $jsondetalle,
                    $request->getPost('sevendepordosis') ,
                    $formato->esNumeroCero($request->getPost('preciodosis')),
                    $formato->esNumeroCero($request->getPost('numerodosis')),
                    $formato->esNumeroCero($request->getPost('idpresentacion')),
                    $formato->esNumeroCero($request->getPost('cantidadunidadmedida')),
                    $request->getPost('ventakilos') ,
                    $formato->esNumeroCero($request->getPost('preciokilo')),
                    $request->getPost('ventagramos') ,
                    $formato->esNumeroCero($request->getPost('preciogramo')),
                    $formato->esNumeroCero($request->getPost('idmodelo')),
                    $formato->esNumeroCero($request->getPost('idmarca')),
                    $request->getPost('ventaunidad'),
                    $formato->esNumeroCero($request->getPost('preciounidad')),
                    $request->getPost('imagenguardar'),
                    $nombregenerico,
                    $formato->esNumeroCero($idformafarma),
                    $ventablister  ,
                    $formato->esNumeroCero($precioblister) ,
                    $ventarecetamed,
                    $formato->esNumeroCero($idseccion),
                    $formato->esNumeroCero($cantblister),
                    $accionfarma
                    
              );

              $jsonData  = Producto::actualizar($data);
              $id        = $jsonData[0]["error"];
              if($request->getPost('imagen')!='' && $request->getPost('imagenguardar')==1){
                 $formato->guardarImagenProducto($request->getPost('imagen'),strval($id));
              }
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
              $idproducto       = $request->getPost('id');
              $usuario          = $request->getPost('usuario');

              $data = array(
                    $idproducto,
                    $usuario
              );
              $jsonData  = Producto::eliminar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }

    public function eliminarserieAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idproducto       = $request->getPost('id');
              $data = array($idproducto);
              $jsonData  = Producto::eliminarSerie($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }

    public function bucarcodigobarrasAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $codigobarras  = $request->get('codigobarras');
              $jsonData = Producto::buscarCodigoBarras($codigobarras);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function bucarserieAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $codigoserie  = $request->get('codigoserie');
              $jsonData = Producto::buscarCodigoSerie($codigoserie);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function buscarnombreAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $nombre   = $request->get('nombre');
              $jsonData = Producto::buscarNombre($nombre);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    /**
     * [existenciasporproductoAction ]
     * @return  Json
     */
    public function existenciasporproductoAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $data = array($request->get('idprod'));
              $jsonData = Producto::existenciasPorProducto($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    /**
     * [guardarubicacionproductoAction ]
     * @return  Array
     */
    public function guardarubicacionproductoAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $data = array(
                $request->getPost('idserie'),
                $request->getPost('idseccion'),
                $request->getPost('ubicacion'),
                $request->getPost('observaciones')
              );
              $jsonData = Producto::ingresarUbicacionProducto($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    /**
     * [buscarproductoporcodigobarraAction ]
     * @return  Json
     */
    public function buscarproductoporcodigobarraAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $data = array($request->getPost('codigobarra'));
              $jsonData = Producto::buscarProductoPorCodigoBarras($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

     /**
     * [copiarproductoAction ]
     * @return  Json
     */
    public function copiarproductoAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $data = array($request->getPost('idprod'));
           $jsonData = Producto::copiarProducto($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent($jsonData);
           return $response;
      }
  }
  /* 
  
    
  */
  
  public function listadoinventarioAction(){
    $request        = new Phalcon\Http\Request();
    $response       = new \Phalcon\Http\Response();
    if($request->isGet() ==true)
    {
         
         if($request->get('idinventario')!=0){
            $data = array($request->get('idinventario'));
            $jsonData = Producto::BuscarInventario($data);
         }else{
            $data = array($request->get('nombre'));
            $jsonData = Producto::listarInventario($data);
         }
         $response->setContentType('application/json', 'UTF-8');
         $response->setContent($jsonData);
         return $response;
    }
  
  }
  public function inventarioregistrosAction(){
  $request        = new Phalcon\Http\Request();
  $response       = new \Phalcon\Http\Response();
  if($request->isGet() ==true)
  {
     $data = array($request->get('mes'));
     $jsonData = Producto::inventarioRegistros($data);
     $response->setContentType('application/json', 'UTF-8');
     $response->setContent($jsonData);
     return $response;
  }
  }
  
  public function inventarioagregarAction(){
    $request        = new Phalcon\Http\Request();
    $response       = new \Phalcon\Http\Response();
    if($request->isPost() ==true)
    {
         $data = array(
             $request->getPost('id'),
             $request->getPost('referencia'),
             $request->getPost('jsondetalle'),
             $request->getPost('usuario'),
             $request->getPost('config')
         );
         $jsonData = Producto::inventarioAgregar($data);
         $response->setContentType('application/json', 'UTF-8');
         $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
         return $response;
    }
  }
  
  public function inventarioanularAction(){
    $request        = new Phalcon\Http\Request();
    $response       = new \Phalcon\Http\Response();
    if($request->isPost() ==true)
    {
         $data = array(
             $request->getPost('id'),
             $request->getPost('usuario')
         );
         $jsonData = Producto::inventarioAnular($data);
         $response->setContentType('application/json', 'UTF-8');
         $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
         return $response;
    }
  }
  public function actualizarcantidaddisponibleAction(){
    $request        = new Phalcon\Http\Request();
    $response       = new \Phalcon\Http\Response();
    if($request->isPost() ==true)
    {
      $ven  = $request->getPost('vencimiento');
      if ($ven) {
        $data = array(
          $request->getPost('id'),
          $request->getPost('nuevacantidad'),
          $ven
      );

      $jsonData = Producto::actualizarCantidadDisponible($data);
      $response->setContentType('application/json', 'UTF-8');
      $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
      return $response;
   
      }else{
         $data = array(
             $request->getPost('id'),
             $request->getPost('nuevacantidad')
         );
         $jsonData = Producto::actualizarCantidadDisponible($data);
         $response->setContentType('application/json', 'UTF-8');
         $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
         return $response;
      }
    }
  }
  public function listarFormaFarmaceuticaAction(){
    $request        = new Phalcon\Http\Request();
    $response       = new \Phalcon\Http\Response();
    if($request->isGet() ==true)
    {
         $jsonData = Producto::listarFormaFarmaceutica($data);
         $response->setContentType('application/json', 'UTF-8');
         $response->setContent($jsonData);
         return $response;
    }
  }
  public function actualizarformafarmaceuticaAction(){
    $request        = new Phalcon\Http\Request();
    $response       = new \Phalcon\Http\Response();
    if($request->isPost() ==true)
    {
         $data = array(
             $request->getPost('id'),
             $request->getPost('descripcion')
         );
         $jsonData = Producto::actualizarFormaFarmaceutica($data);
         $response->setContentType('application/json', 'UTF-8');
         $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
         return $response;
    }
  }
  public function eliminarformafarmaceuticaAction(){
    $request        = new Phalcon\Http\Request();
    $response       = new \Phalcon\Http\Response();
    if($request->isPost() ==true)
    {
         $data = array(
             $request->getPost('idforma')
         );
         $jsonData = Producto::eliminarFormaFarmaceutica($data);
         $response->setContentType('application/json', 'UTF-8');
         $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
         return $response;
    }
  }
  public function listargenericosAction(){
    $request        = new Phalcon\Http\Request();
    $response       = new \Phalcon\Http\Response();
    if($request->isGet() ==true)
    {
         $ngenerico = $request->get('nombregenerico');
         $idprod    = $request->get('idprod');
         $data = array($ngenerico,$idprod);
         $jsonData = Producto::listarProductoGenericos($data);
         $response->setContentType('application/json', 'UTF-8');
         $response->setContent($jsonData);
         return $response;
    }
  } 
  public function actualizarprodexitenciaAction(){
    $request        = new Phalcon\Http\Request();
    $response       = new \Phalcon\Http\Response();
    if($request->isPost() ==true)
    {
         $data = array(
          $request->getPost('id'),
          $request->getPost('vencimiento'),
          $request->getPost('cantidadunidad')
         );
         $jsonData = Producto::actualizarProductoExistencia($data);
         $response->setContentType('application/json', 'UTF-8');
         $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
         return $response;
    }
  } 
  


}
