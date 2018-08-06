<?php
use Greenter\Model\Client\Client;
use Greenter\Model\Sale\Invoice;
use Greenter\Model\Company\Address;
use Greenter\Model\Company\Company;
use Greenter\Model\Sale\SaleDetail;
use Greenter\Model\Sale\Legend;
use Greenter\Ws\Services\SunatEndpoints;

use \Phalcon\Mvc\Controller as Controller;

class SunatController extends Controller
{
    public function initialize(){$this->view->disable(); }

    public function enviarfacturaAction(){
        
        // Cliente
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
  
        $util = Util::getInstance();
        $client = new Client();
        $client->setTipoDoc('6')
            ->setNumDoc('20000000001')
            ->setRznSocial('EMPRESA 1');
            
        // Emisor
        $address = new Address();
        $address->setUbigueo('150101')
            ->setDepartamento('LIMA')
            ->setProvincia('LIMA')
            ->setDistrito('LIMA')
            ->setUrbanizacion('NONE')
            ->setDireccion('AV LS');
            
        $company = new Company();
        $company->setRuc('20000000001')
            ->setRazonSocial('EMPRESA SAC')
            ->setNombreComercial('EMPRESA')
            ->setAddress($address);
         
        // Venta
        $invoice = (new Invoice())
            ->setTipoDoc('01')
            ->setSerie('F001')
            ->setCorrelativo('1')
            ->setFechaEmision(new DateTime())
            ->setTipoMoneda('PEN')
            ->setClient($client)
            ->setMtoOperGravadas(200.00)
            ->setMtoOperExoneradas(0.00)
            ->setMtoOperInafectas(0.00)
            ->setMtoIGV(36.00)
            ->setMtoImpVenta(2236.00)
            ->setCompany($company);

        $item = (new SaleDetail())
            ->setCodProducto('P001')
            ->setUnidad('NIU')
            ->setCantidad(2)
            ->setDescripcion('PRODUCTO 1')
            ->setIgv(18.00)
            ->setTipAfeIgv('10')
            ->setMtoValorVenta(100.00)
            ->setMtoValorUnitario(50.00)
            ->setMtoPrecioUnitario(56.00);

        $legend = (new Legend())
            ->setCode('1000')
            ->setValue('SON DOSCIENTOS TREINTA Y SEIS CON 00/100 SOLES');

        $invoice->setDetails([$item])
                ->setLegends([$legend]);

        // creacion de objeto see
        
        $see = $util->getSee(SunatEndpoints::FE_BETA);
        
        $result = $see->send($invoice);
        $util->writeXml($invoice, $see->getFactory()->getLastXml());

        if ($result->isSuccess()) {
            $pdf = $util->getPdf($invoice);
            $util->showPdf($pdf, $invoice->getName().'.pdf');
            //print_r($result->getCdrResponse())
            //echo $result->getCdrResponse()->getDescription();
        } else {
            var_dump($result->getError());
        }
    }
    public function enviarboletaAction()
    {
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();

      $util = Util::getInstance();
      // Cliente
      $client = new Client();
      $client->setTipoDoc('1')
          ->setNumDoc('20203030')
          ->setRznSocial('PERSON 1');
      
      // Venta
      $invoice = new Invoice();
      $invoice->setTipoDoc('03')
          ->setSerie('B001')
          ->setCorrelativo('1')
          ->setFechaEmision(new DateTime())
          ->setTipoMoneda('PEN')
          ->setClient($client)
          ->setMtoOperGravadas(200)
          ->setMtoOperExoneradas(0)
          ->setMtoOperInafectas(0)
          ->setMtoIGV(36)
          ->setMtoImpVenta(100)
          ->setCompany($util->getCompany());
      
      $item1 = new SaleDetail();
      $item1->setCodProducto('C023')
          ->setUnidad('NIU')
          ->setCantidad(2)
          ->setDescripcion('PROD 1')
          ->setIgv(18)
          ->setTipAfeIgv('10')
          ->setMtoValorVenta(100)
          ->setMtoValorUnitario(50)
          ->setMtoPrecioUnitario(56);
      
      $items = Util::generator($item1, 14);
      
      $legend = new Legend();
      $legend->setCode('1000')
          ->setValue('SON CIEN CON 00/100 SOLES');
      
      $invoice->setDetails($items)
          ->setLegends([$legend]);
      
      // Envio a SUNAT.
      $see = $util->getSee(SunatEndpoints::FE_BETA);
      $res = $see->send($invoice);
      $util->writeXml($invoice, $see->getFactory()->getLastXml());

      if ($res->isSuccess()) {
        /**@var $res \Greenter\Model\Response\BillResult*/
        $cdr = $res->getCdrResponse();
        
        $util->writeCdr($invoice, $res->getCdrZip());

        echo $util->getResponseFromCdr($cdr);
        } else {
            var_dump($res->getError());
        }
            

    }
    public function pdfboletaAction(){
        
        $util = Util::getInstance();
        // Cliente
        $client = new Client();
        $client->setTipoDoc('1')
            ->setNumDoc('20203030')
            ->setRznSocial('PERSON 1');

        // Venta
        $invoice = new Invoice();
        $invoice->setTipoDoc('03')
            ->setSerie('B001')
            ->setCorrelativo('1')
            ->setFechaEmision(new DateTime())
            ->setTipoMoneda('PEN')
            ->setClient($client)
            ->setMtoOperGravadas(200)
            ->setMtoOperExoneradas(0)
            ->setMtoOperInafectas(0)
            ->setMtoIGV(36)
            ->setMtoImpVenta(100)
            ->setCompany($util->getCompany());

        $item1 = new SaleDetail();
        $item1->setCodProducto('C023')
            ->setUnidad('NIU')
            ->setCantidad(2)
            ->setDescripcion('PROD 1')
            ->setIgv(18)
            ->setTipAfeIgv('10')
            ->setMtoValorVenta(100)
            ->setMtoValorUnitario(50)
            ->setMtoPrecioUnitario(56);

        $items = $util->generator($item1, 10);

        $legend = new Legend();
        $legend->setCode('1000')
            ->setValue('SON CIEN CON 00/100 SOLES');

        $invoice->setDetails($items)
            ->setLegends([$legend]);

        try {
            $pdf = $util->getPdf($invoice);
            $util->showPdf($pdf, $invoice->getName().'.pdf');
        } catch (Exception $e) {
            var_dump($e);
        }
    }
}
