<?php
use \Phalcon\Mvc\Controller as Controller;

class EmpresaController extends Controller
{
    public function initialize(){$this->view->disable(); }
    public function listaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData = Empresa::listar();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function seriesAction()
    {
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isGet() ==true)
        {
             $jsonData = DocumentoVenta::series();
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
        }
   }
   public function serieseliminarAction()
   {
       $request        = new Phalcon\Http\Request();
       $response       = new \Phalcon\Http\Response();
       if($request->isPost() ==true)
       {
            $id       = $request->getPost('idserie');
            $jsonData = DocumentoVenta::serieEliminar(array($id));
            $response->setContentType('application/json', 'UTF-8');
            $response->setContent($jsonData);
            return $response;
       }
  }
   public function ticketerasAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isGet() ==true)
        {
            $jsonData = DocumentoVenta::ticketeras();
            $response->setContentType('application/json', 'UTF-8');
            $response->setContent($jsonData);
            return $response;
        }
    }
    public function ticketeraeliminarAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {
             $id       = $request->getPost('idticketera');
             $jsonData = DocumentoVenta::ticketeraEliminar(array($id));
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
             return $response;
        }
    }
    public function tiendasAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isGet() ==true)
        {
             $jsonData = Empresa::tiendas();
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
        }
    }
    public function tiendaeliminarAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {
             $id       = $request->getPost('idtienda');
             $jsonData = Empresa::tiendaEliminar(array($id));
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
             return $response;
        }
    }
    public function actualizarAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        $util           = new FuncionesHelpers();
        if($request->isPost() ==true)
        {
             $data = array(
                $request->getPost('id'),
                $request->getPost('razonsocial'),
                $request->getPost('ruc'),
                $request->getPost('direccion'),
                $request->getPost('lema'),
                $request->getPost('correo'),
                $request->getPost('telefono'),
                $request->getPost('tiendas'),
                $request->getPost('documentos'),
                $request->getPost('ticketeras'),
                $request->getPost('imagenguardar')
             );

             if($request->getPost('imagen') && $request->getPost('imagenguardar')==1){
                $util->guardarImagen($request->getPost('imagen'),'logo');
             }
             $jsonData = Empresa::actualizar($data);
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
             return $response;
        }
    }
    public function tiendadocumentosventaasignadosAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isGet() ==true)
        {
             $data= array($request->get('idtienda'));
             $jsonData = Empresa::tiendaListarDocumentosVentaAsignados($data);
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
        }
    }
    public function tiendadocumentosventaAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isGet() ==true)
        {
             $jsonData = Empresa::tiendaListarDocumentosVenta();
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
        }
    }

    public function tiendaticketerasasignadasAction()
    {
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isGet() ==true)
        {
             $data= array($request->get('idtienda'));
             $jsonData = Empresa::tiendaListarTicketerasAsignadas($data);
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
        }
    }
    public function tiendaticketerasAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isGet() ==true)
        {
             $jsonData = Empresa::tiendaListarTicketeras();
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
        }
    }

    public function tiendaasignardocumentoventaAction()
    {
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {
             $data       = $request->getPost('documentos');
             $jsonData = Empresa::tiendaAsignarDocumentoVenta(array($data));
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
        }
   }
   public function tiendaasignarticketeraAction()
   {
       $request        = new Phalcon\Http\Request();
       $response       = new \Phalcon\Http\Response();
       if($request->isPost() ==true)
       {
            $data       = $request->getPost('ticketeras');
            $jsonData = Empresa::tiendaAsignarTicketera(array($data));
            $response->setContentType('application/json', 'UTF-8');
            $response->setContent($jsonData);
            return $response;
       }
  }

  public function tiendaeliminarticketeraAction()
  {
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $data       = $request->getPost('id');
           $jsonData = Empresa::tiendaEliminarTicketera(array($data));
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;
      }
 }

 public function tiendaeliminardocumentoventaAction()
  {
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $data       = $request->getPost('id');
           $jsonData = Empresa::tiendaEliminarDocumentoVenta(array($data));
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;
           

           
      }
 }

}
