<?php
use \Phalcon\Mvc\Controller as Controller;

class ManufacturaController extends Controller
{
    public function initialize(){$this->view->disable(); }
    public function listarmaterialproductoAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $data = array();
              $jsonData = Manufactura::Listado($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }



}
