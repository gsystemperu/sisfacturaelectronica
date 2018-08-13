<?php
use Karriere\JsonDecoder\JsonDecoder;
use \Phalcon\Mvc\Controller as Controller;
class CotizacionController extends Controller
{

    public function initialize(){$this->view->disable(); }

    public function productolistaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $vCodigo          = $request->get('vCodigo');
              $vquery           = $request->get('query');
               if($vquery!='')
                $vDescripcion   = $vquery;
              else
                $vDescripcion   = $request->get('vDescripcion');

              $vCategoria       =  $request->get('vCategoria');

              $data = array($vCodigo,$vDescripcion,$vCategoria);
              $jsonData             = Cotizacion::productoListar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;

         }
    }
    public function productolistaporclienteAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $vCodigo          = $request->get('vCodigo');
              $vquery           = $request->get('query');
              $vIdCliente       = $request->get('vIdCliente');
               if($vquery!='')
                $vDescripcion   = $vquery;
              else
                $vDescripcion   = $request->get('vDescripcion');

              $vCategoria       =  $request->get('vCategoria');

              $data = array($vCodigo,$vDescripcion,$vCategoria,$vIdCliente);
              $jsonData             = Cotizacion::productoListarPorCliente($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;

         }
    }

    public function productoeliminarAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {

             $vIdProd  = $request->getPost('id');
             $data     = array($vIdProd,'desarrollo');
             $jsonData = Cotizacion::eliminarProducto($data);
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
             return $response;
        }
   }

    public function clientelistaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();

         if($request->isGet() ==true)
         {

              $vDocumento= $request->get('vDocumento');
              $vRuc= $request->get('vRuc' );
              $vquery=  $request->get('query' );
              if($vquery!='')
                $vDatos=  $vquery;
              else
                $vDatos=  $request->get('vDatos' );

              $data       = array(
                $vDocumento,
                $vRuc,
                $vDatos);

              $jsonData   = Cotizacion::clienteListar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;

         }
    }
    public function clienteeliminarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $vIdPersona= $request->getPost('vIdPersona');

              $data = array( $vIdPersona,'desarrollo' ); //******
              $jsonData             = Cotizacion::eliminarCliente($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
              return $response;

         }
    }
    public function buscarclientecodigoAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $persona   =  $request->getPost('idper');
           $data      = array($persona);
           $jsonData  = Cotizacion::buscarPersonaPrecio($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
           return $response;
      }
    }
     public function tipodocumentolistaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData             = Cotizacion::tipodocumentoListar();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
              return $response;

         }
    }

    public function agregarcotizacionAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $vId  = ( $request->getPost('vid')==''? $request->getPost('idcoti') : $request->getPost('vid') );
              $vFecha  = ( $request->getPost('vfecha')==''? $request->getPost('fechacoti') : $request->getPost('vfecha'));
              $vIdCliente = ( $request->getPost('vidcliente')==''?$request->getPost('idper') : $request->getPost('vidcliente') );
              $vUsuario = 'desarrollo';   //$request->getPost('vusuario');
              $vJsonDetalle = $request->getPost('vjsondetalle');
              $vFormaPago= ( $request->getPost('vformapago')==''? $request->getPost('idfopag') : $request->getPost('vformapago') );
              $vModoEntrega= ( $request->getPost('vmodoentrega')==''? $request->getPost('idmodo'): $request->getPost('vmodoentrega'));
              $vVendedor= 0;  //( $request->getPost('vvendedor') == ''?  $request->getPost('idvend'):  $request->getPost('vvendedor'));
              $vIncluyeIgv= ($request->getPost('incluyeigv')? 1:0);
              $vReferencia  = $request->getPost('vreferencia');
              $vFechaValidoHasta  = ( $request->getPost('fechavalidohasta')==''? $request->getPost('fechavalidohasta') : $request->getPost('fechavalidohasta'));
              $vComentario  = $request->getPost('comentario');
              $vidMoneda     =$request->getPost('idmoneda');
              $vluegarentregra     =$request->getPost('lugarentrega');
              $vcreditoscobranzas     =$request->getPost('creditoscobranzas');
              
              $data = array($vId,$vFecha,$vIdCliente,$vUsuario,$vJsonDetalle,
               $vFormaPago,$vModoEntrega,$vVendedor,$vIncluyeIgv,$vReferencia,
               $vFechaValidoHasta,$vComentario,$vidMoneda,$vluegarentregra,$vcreditoscobranzas);
             // print_r($data);die();
              $jsonData             = Cotizacion::agregarCotizacion($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }

    public function cotizacioneliminarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $vIdCoti= $request->getPost('vIdCoti');
              $data = array($vIdCoti,'desarrollo');
              $jsonData             = Cotizacion::eliminarCotizacion($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
              return $response;

         }
    }

    public function cotizacionconfirmarventaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $vIdCoti= $request->getPost('idcoti');
              $data = array($vIdCoti,'desarrollo');
              $jsonData             = Cotizacion::confirmarVentaCotizacion($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
              return $response;

         }
    }

    public function agregarclienteAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $vId  = $request->getPost('vid');
              $vPaterno= $request->getPost('vpaterno');
              $vMaterno= $request->getPost('vmaterno');
              $vNombre= $request->getPost('vnombre');
              $vSexo= $request->getPost('vsexo');
              $vFechaNaci= $request->getPost('vfechanaci');
              $vidDoc= $request->getPost('viddoc');
              $vNumDoc= $request->getPost('vnumdoc');
              $vNumRuc= $request->getPost('vnumruc');
              $vDireccion= $request->getPost('vdireccion');
              $vTelefono= $request->getPost('vtelefono');
              $vCelular= $request->getPost('vcelular');
              $vUsuario= 'desarrollo'; //$request->getPost('vusuario');
              $vPrecio= $request->getPost('tipoprecioper');

              $data = array( $vId,$vPaterno,$vMaterno,$vNombre,$vSexo,$vFechaNaci,$vidDoc,$vNumDoc,$vNumRuc,$vDireccion,$vTelefono,$vCelular,$vUsuario,'','',$vPrecio );
              $jsonData             = Cotizacion::agregarCliente($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
     public function agregarclientevialistadoAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $vId  = $request->getPost('idper');
              $vPaterno = $request->getPost('paternoper');
              $vMaterno = $request->getPost('maternoper');
              $vNombre  = $request->getPost('nombreper');
              $vSexo    =  NULL;
              $vFechaNaci= NULL;
              $vidDoc= $request->getPost('iddocidentidad');
              $vNumDoc= $request->getPost('numdocper');
              $vNumRuc= $request->getPost('numrucper');
              $vDireccion= $request->getPost('domiciper');
              $vTelefono= $request->getPost('telefper');
              $vCelular= $request->getPost('celper');
              $vUsuario= 'desarrollo'; //$request->getPost('vusuario');
              $vCorreo= $request->getPost('correoper');
              $vProvincia= $request->getPost('provinciaper');
              $vPrecio= $request->getPost('tipoprecioper');

              $data = array($vId,$vPaterno,$vMaterno,$vNombre,$vSexo,$vFechaNaci,$vidDoc,$vNumDoc,$vNumRuc,$vDireccion,$vTelefono,$vCelular,$vUsuario,$vCorreo,$vProvincia,$vPrecio);
              $jsonData             = Cotizacion::agregarCliente($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }

     public function proveedoreslistaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $vNumDoc = $request->get('vnumdoc');
              $vNumRuc = $request->get('vnumruc');
              $vNmbres = $request->get('vnombres');
              $data = array($vNumDoc,$vNumRuc,$vNmbres );
              $jsonData             = Cotizacion::proveedorListar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
              return $response;

         }
    }

    public function cotizacioneslistaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $vDesde   = $request->get('vDesde');
              $vHasta   = $request->get('vHasta');
              $vPersona = $request->get('vPersona');
              $vCodigo  = $request->get('vCodigo');
              $data     = array($vDesde,$vHasta,$vPersona);
              if(sizeof($data)){
                if($vCodigo!='')
                {
                  $data =array($vCodigo);
                  $jsonData  = Cotizacion::cotizacionesBuscarCodigo($data);
                }else{
                  $jsonData  = Cotizacion::cotizacionesListar($data);
                }
              }else {
                  $data =array();
                  $jsonData  = Cotizacion::cotizacionesListar($data);
              }
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;

         }
    }

    public function cotizacionesdetalleAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $vIdCotizacion   = $request->get('vIdCotizacion');
              $data  = array($vIdCotizacion);
              $jsonData             = Cotizacion::detalleCotizacion($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
              return $response;

         }
    }

    public function cotizacionesdetallevistaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $vIdCotizacion   = $request->get('vIdCotizacion');
              $data = array($vIdCotizacion);
              $jsonData             = Cotizacion::detalleCotizacionVista($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;

         }else{
           $vIdCotizacion   = $request->getPost('vIdCotizacion');
           $data = array($vIdCotizacion);
           $jsonData             = Cotizacion::detalleCotizacionVista($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent($jsonData);
           return $response;
         }
    }

    public function formapagoAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData             = Cotizacion::listarFormaPago();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function modoentregaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData             = Cotizacion::listarModoEntrega();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
              return $response;
         }
    }

     public function vendedoresAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $vquery=  $request->get('query' );
              $data = array($vquery);
              if($vquery!=''){
                $jsonData             = Cotizacion::vendedoresFiltroListar($data);
              }else{
                $jsonData             = Cotizacion::vendedoresListar();
              }

              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }



    /*
    @Reportes de cotizaciones
    */

     public function pdfcotizacionverticalAction(){
         $request    = new Phalcon\Http\Request();
         $vIDCotizacion  = $request->get("id");
         $vFormato       = $request->get("for");
         $vFirma         = $request->get("firma");

         $dataCab   = Cotizacion::reportePedidoCliente($vIDCotizacion);
         $dataCab   = $dataCab[0];
         $pdf = new fpdf('P');

         $fuente ="courier";
         $fsize =7;
         $fnormal =7;
         $ftitulo =12;
         $pdf->AddPage();
         $pdf->SetFont($fuente,'',$fsize);
         //$pdf->Image('img/logoandina.jpg',$pdf->getY()+135,$pdf->getX() - 5,0,20,'JPG');
         $pdf->setY($pdf->getY()- 5 );
         $pdf->MultiCell(55,3, utf8_decode( "Av. Gregorio Escobedo 776 Of. 201-A Jesus Maria, Lima - Perú Tel:(51-1)628-5733 Fax:(51-1)628-5736 ventas@andinamedica.com.pe www.andinamedica.com.pe"),0,'L');
         $pdf->Ln(10);
         $pdf->setY($pdf->getY());
         $pdf->SetFont($fuente,'B',$fnormal);
         $pdf->Cell(90,4,'Cliente : '. utf8_decode(  trim($dataCab["_persona"]) ),1,0,'L');
         $pdf->Cell(50,4,'Referencia : '. utf8_decode(  trim($dataCab["_referencia"]) ),1,0,'L');
         $pdf->SetFont($fuente,'B',$fsize);
         $pdf->Cell(0,4,'Datos del asesor comercial',1,1,'L');
         $pdf->SetFont($fuente,'B',$fsize);
         $pdf->Cell(140,4, utf8_decode('Att. Dr. Juan Tantaleán V.'),1,0,'L');$pdf->Cell(0,4,'Nombre :  '. $dataCab["_vendedor"],1,1,'L');
         $pdf->Cell(140,4, utf8_decode('Dirección :' .$dataCab["_domicilio"]),1,0,'L');       $pdf->Cell(0,4,'Celular :  '.$dataCab["_celvendedor"],1,1,'L');  //$pdf->Cell(94,4,'Cargo :'.$dataCab["_cargovendedor"],0,1,'L');
         $pdf->Cell(40,4, utf8_decode('Provincia :' .$dataCab["_provincia"]),1,0,'L');
         $pdf->Cell(40,4, utf8_decode('Correo : '. $dataCab["_correo"]),1,0,'L');
         $pdf->Cell(30,4, utf8_decode('Telefono : '. $dataCab["_correo"]),1,0,'L');
         $pdf->Cell(30,4, utf8_decode('Celular : '. $dataCab["_correo"]),1,0,'L');
         $pdf->Cell(0,4,'Email :  '.$dataCab["_emailvendedor"],1,1,'L');
         //$pdf->Cell(94,4,'Celular :  '.$dataCab["_celvendedor"],0,1,'L');
                                                                               //$pdf->Cell(94,4,'Email :  '.$dataCab["_emailvendedor"],0,1,'L');
         $pdf->Ln(4);
         $pdf->SetFont($fuente,'B',$ftitulo);
        // $pdf->Cell(0,5,'SOLICITUD DE COTIZACION '. str_pad( $dataCab["_idcoti"], 10, "0", STR_PAD_LEFT) ,0,1,'C');
         $pdf->Cell(0,5,'SOLICITUD DE COTIZACION '. date("m",strtotime($dataCab["_fecharepo"])) . str_pad( $dataCab["_idcoti"], 5, "0", STR_PAD_LEFT)  ,0,1,'C');
         $pdf->Cell(0,5,'REACTIVOS DE LABORATORIO',0,1,'C');
         $pdf->Ln(1);
         $pdf->SetFont($fuente,'B',$fnormal);
         $fila = $pdf->getY();
         $pdf->MultiCell(35,6,'MATERIAL LABORATORIO',1,'C');
         $pdf->setXY(45,$fila);
         $pdf->MultiCell(25,6,'PRESENTACION',1,'C');
         $pdf->setXY(70,$fila);
         $pdf->MultiCell(25,6,'MARCA',1,'C');
         $pdf->setXY(95,$fila);
         $pdf->MultiCell(30,6,'PROCEDENCIA',1,'C');
         $pdf->setXY(125,$fila);
         $pdf->MultiCell(15,6,'U.M',1,'C');
         $pdf->setXY(140,$fila);
         $pdf->MultiCell(16,3,'CANTIDAD TOTAL',1,'C');
         $pdf->setXY(156,$fila);
         $pdf->MultiCell(16,3,'PRECIO UNITARIO',1,'C');
         $pdf->setXY(172,$fila);
         $pdf->MultiCell(15,3,'PRECIO TOTAL',1,'C');
         $pdf->setXY(187,$fila);
         $pdf->MultiCell(15,6,'VCTO',1,'C');
         $dataDetEs =  Cotizacion::reportePedidoDetalle($vIDCotizacion);
         $total=0;
         $pdf->SetFont($fuente,'',$fsize);
         $fila = $pdf->getY();
         foreach($dataDetEs as $data)
         {
            $pdf->setXY(10,$fila);
            $x    = $pdf->getY();

            $pdf->MultiCell(35,4,$data["_producto"],0,'L');
            $fila = $pdf->getY();
            $pdf->setXY(45,$x);
            $pdf->Cell(25,6,$data["_presentacion"],0,1,'L');

            $pdf->setXY(70,$x);
            $pdf->MultiCell(25,6,$data["_marca"],0,'C');

            $pdf->setXY(95,$x);
            $pdf->MultiCell(30,6,$data["_procedencia"],0,'C');

            $pdf->setXY(125,$x);
            $pdf->MultiCell(15,6,$data["_unidadmedida"],0,'C');

            $pdf->setXY(140,$x);
            $pdf->MultiCell(16,6,$data["_cantidad"],0,'R');

            $pdf->setXY(156,$x);
            $pdf->MultiCell(16,6,$data["_precio"],0,'R');

            $pdf->setXY(172,$x);
            $pdf->MultiCell(15,6,number_format($data["_total"],2,'.',' '),0,'R');

            $pdf->setXY(187,$x);
              $pdf->SetFont($fuente,'B',6);
            $pdf->MultiCell(15,6,$data["_fechavencimiento"],0,'C');
              $pdf->SetFont($fuente,'B',$fnormal);
            $pdf->SetXY(10,$fila);
            //$pdf->Ln(1.8);
            $pdf->Cell(0,3,'','T',1,'L');


           $total = $total +  $data["_total"];
         }
           if($dataCab["_incluyeigv"]==false){
             $subtotal = $total - ($total * 0.18);
             $igv      = ($total * 0.18);
            $pdf->Cell(145,3,'SUB TOTAL S/.',0,0,'R');
            $pdf->Cell(32,3,number_format( $subtotal,2,'.',' '),0,1,'R');
            $pdf->Cell(145,3,'IGV S/.',0,0,'R');
            $pdf->Cell(32,3,number_format( $igv,2,'.',' '),0,1,'R');
            $pdf->Cell(145,3,'TOTAL S/.',0,0,'R');
            $pdf->Cell(32,3,number_format( $total,2,'.',' '),0,1,'R');
            $pdf->Cell(177,3,utf8_encode("Precios no Incluye IGV") ,0,1,'J');
          }else{
            $pdf->Cell(145,3,'TOTAL S/.',0,0,'R');
            $pdf->Cell(32,3,number_format( $total,2,'.',' '),0,1,'R');
            $pdf->Cell(177,3,utf8_encode("Precios Incluye IGV") ,0,1,'J');
          }
          $pdf->Cell(177,3,utf8_encode("Forma de Pago : " . $dataCab["_formapago"]) ,0,1,'J');
          $pdf->Cell(177,3,utf8_encode("Entrega : " . $dataCab["_modoentrega"]) ,0,1,'J');
          $pdf->Cell(177,3,utf8_encode("Validez de la oferta 30 DIAS ") ,0,1,'J');
          $pdf->Ln();
          if($dataCab['_provincia']!=''){
            if(  strtoupper(trim($dataCab['_provincia']))!='LIMA')
                $pdf->Cell(177,3,utf8_encode("** COSTO FLETE S/35.00.- A CONSIDERAR EN PEDIDO INFERIORES A S/300.00 **") ,0,1,'J');
          }

          $pdf->Ln();
          switch ( $vFirma  ) {
            case 1: $pdf->Image('img/firma1.png',$pdf->getX() + 80,$pdf->getY() ,0,20,'PNG');  break;
            case 2: $pdf->Image('img/firma2.png',$pdf->getX() + 80,$pdf->getY() ,0,20,'PNG');  break;
            case 3: $pdf->Image('img/firma3.png',$pdf->getX() + 80,$pdf->getY() ,0,20,'PNG');  break;
          }


          $pdf->Output();

    }

    public function pdfcotizacionhorizontalAction(){
        $request    = new Phalcon\Http\Request();
        $vIDCotizacion  = $request->get("id");
        $vFormato       = $request->get("for");
        $vFirma         = $request->get("firma");

        $dataCab   = Cotizacion::reportePedidoCliente($vIDCotizacion);
        $dataCab   = $dataCab[0];
        $pdf = new fpdf('L');

        $fuente ="courier";
        $fsize =7;
        $fnormal =7;
        $ftitulo =12;
        $pdf->AddPage();
        $pdf->SetFont($fuente,'',$fsize);
        //$pdf->Image('img/logoandina.jpg',$pdf->getY()+135,$pdf->getX() - 5,0,20,'JPG');
        $pdf->Image('img/logoandina.jpg',230,3,0,20,'JPG');
        $pdf->setY($pdf->getY()- 5 );
        $pdf->MultiCell(55,3, utf8_decode( "Av. Gregorio Escobedo 776 Of. 201-A Jesus Maria, Lima - Perú Tel:(51-1)628-5733 Fax:(51-1)628-5736 ventas@andinamedica.com.pe www.andinamedica.com.pe"),0,'L');
        $pdf->Ln(10);
        $pdf->setY($pdf->getY());
        $pdf->SetFont($fuente,'B',$fnormal);
        $pdf->Cell(150,4,'Cliente :'. utf8_decode( $dataCab["_persona"] ),1,0,'L');
        $pdf->Cell(50,4,'Referencia :'. utf8_decode( $dataCab["_referencia"] ),1,0,'L');
        $pdf->SetFont($fuente,'B',$fsize);  $pdf->Cell(0,4,'Datos del asesor comercial',1,1,'L');
        $pdf->SetFont($fuente,'B',$fsize);
        $pdf->Cell(200,4, utf8_decode('Att. Dr. Juan Tantaleán V.'),1,0,'L');$pdf->Cell(0,4,'Nombre :  '. $dataCab["_vendedor"],1,1,'L');
        $pdf->Cell(200,4, utf8_decode('Dirección :' .$dataCab["_domicilio"]),1,0,'L');       $pdf->Cell(0,4,'Celular :  '.$dataCab["_celvendedor"],1,1,'L');  //$pdf->Cell(94,4,'Cargo :'.$dataCab["_cargovendedor"],0,1,'L');
        $pdf->Cell(50,4, utf8_decode('Provincia :' .$dataCab["_provincia"]),1,0,'L');
        $pdf->Cell(50,4, utf8_decode('Correo : '. $dataCab["_correo"]),1,0,'L');
        $pdf->Cell(50,4, utf8_decode('Telefono : ' /*. $dataCab[] */),1,0,'L');
        $pdf->Cell(50,4, utf8_decode('Celular : ' /*. $dataCab[] */),1,0,'L');
        $pdf->Cell(0,4,'Email :  '.$dataCab["_emailvendedor"],1,1,'L');

        $pdf->Ln(4);
        $pdf->SetFont($fuente,'B',$ftitulo);
       // $pdf->Cell(0,5,'SOLICITUD DE COTIZACION '. str_pad( $dataCab["_idcoti"], 10, "0", STR_PAD_LEFT) ,0,1,'C');
        $pdf->Cell(0,5,'SOLICITUD DE COTIZACION '. date("m",strtotime($dataCab["_fecharepo"])) . str_pad( $dataCab["_idcoti"], 5, "0", STR_PAD_LEFT)  ,0,1,'C');

        $pdf->Cell(0,5,'REACTIVOS DE LABORATORIO',0,1,'C');
        $pdf->Ln(1);
        $pdf->SetFont($fuente,'B',$fnormal);
        $fila = $pdf->getY();
        $pdf->MultiCell(90,6,'MATERIAL LABORATORIO',1,'C');
        $pdf->setXY(100,$fila);
        $pdf->MultiCell(29,6,'PRESENTACION',1,'C');
        $pdf->setXY(129,$fila);
        $pdf->MultiCell(30,6,'MARCA',1,'C');
        $pdf->setXY(159,$fila);
        $pdf->MultiCell(40,6,'PROCEDENCIA',1,'C');
        $pdf->setXY(199,$fila);
        $pdf->MultiCell(15,6,'U.M',1,'C');
        $pdf->setXY(214,$fila);
        $pdf->MultiCell(18,3,'CANTIDAD TOTAL',1,'C');
        $pdf->setXY(232,$fila);
        $pdf->MultiCell(18,3,'PRECIO UNITARIO',1,'C');
        $pdf->setXY(250,$fila);
        $pdf->MultiCell(18,3,'PRECIO TOTAL',1,'C');
        $pdf->setXY(268,$fila);
        $pdf->MultiCell(18,6,'VCTO',1,'C');




        $dataDetEs =  Cotizacion::reportePedidoDetalle($vIDCotizacion);
        $total=0;

       $pdf->SetFont($fuente,'',$fsize);
        $fila = $pdf->getY();
        foreach($dataDetEs as $data)
        {


           $pdf->setXY(10,$fila);
           $x    = $pdf->getY();
           $pdf->MultiCell(90,4,$data["_producto"],0,'L');
           $fila = $pdf->getY();
           $pdf->setXY(100,$x);
           $pdf->Cell(29,4,$data["_presentacion"],0,1,'L');
           $pdf->setXY(129,$x);
           $pdf->MultiCell(30,4,$data["_marca"],0,'C');
           $pdf->setXY(159,$x);
           $pdf->MultiCell(40,4,$data["_procedencia"],0,'C');
           $pdf->setXY(199,$x);
           $pdf->MultiCell(15,4,$data["_unidadmedida"],0,'C');
           $pdf->setXY(214,$x);
           $pdf->MultiCell(18,4,$data["_cantidad"],0,'R');
           $pdf->setXY(232,$x);
           $pdf->MultiCell(18,6,$data["_precio"],0,'R');

           $pdf->setXY(250,$x);
           $pdf->MultiCell(18,6,number_format($data["_total"],2,'.',' '),0,'R');

           $pdf->setXY(268,$x);
            $pdf->SetFont($fuente,'B',7);
           $pdf->MultiCell(18,6,$data["_fechavencimiento"],0,'C');
             $pdf->SetFont($fuente,'B',$fnormal);
           $pdf->SetXY(10,$fila+0.5);
           //$pdf->Ln(1.8);
           $pdf->Cell(0,3,'','T',1,'L');


          $total = $total +  $data["_total"];
        }

         $pdf->Cell(226,3,'TOTAL S/.',0,0,'R');
         $pdf->Cell(32,3,number_format( $total,2,'.',' '),0,1,'R');
         $pdf->Cell(177,3,utf8_encode("Precios Incluye IGV") ,0,1,'J');
         $pdf->Cell(177,3,utf8_encode("Forma de Pago : " . $dataCab["_formapago"]) ,0,1,'J');
         $pdf->Cell(177,3,utf8_encode("Entrega : " . $dataCab["_modoentrega"]) ,0,1,'J');
         $pdf->Cell(177,3,utf8_encode("Validez de la oferta 30 DIAS ") ,0,1,'J');
         $pdf->Ln();
         if($dataCab['_provincia']!=''){
           if(  strtoupper(trim($dataCab['_provincia']))!='LIMA')
               $pdf->Cell(177,3,utf8_encode("** COSTO FLETE S/35.00.- A CONSIDERAR EN PEDIDO INFERIORES A S/300.00 **") ,0,1,'J');
         }

         $pdf->Ln();
         switch ( $vFirma  ) {
           case 1: $pdf->Image('img/firma1.png',$pdf->getX() + 120,$pdf->getY() ,0,20,'PNG');  break;
           case 2: $pdf->Image('img/firma2.png',$pdf->getX() + 120,$pdf->getY() ,0,20,'PNG');  break;
           case 3: $pdf->Image('img/firma3.png',$pdf->getX() + 120,$pdf->getY() ,0,20,'PNG');  break;
         }

         $pdf->Output();

   }
    /*
      @Listados Unidad de Medida
    */
     public function uniaddmedidalistaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData             = Cotizacion::listarUnidadMedida();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
              return $response;

         }
    }
    /*
      @Listado de Presentacion
    */
     public function presentacionlistaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData             = Cotizacion::listarPresentacion();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
              return $response;

         }
    }
      /*
      @Listado de Categorias
    */
     public function categorialistaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData             = Cotizacion::listarCategorias();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
              return $response;

         }
    }
    /*
      @ Guardar Producto
    */
    public function productoguardarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $vIdProd          = $request->getPost('idprod');
              $vCodigo          = $request->getPost('codprod');
              $vDescrip         = $request->getPost('desprod');
              $vPresen          = $request->getPost('presenprod');
              $vPrecio          = $request->getPost('precioprod');
              $vStock           = $request->getPost('stockprod');
              $vIdCate          = $request->getPost('idcate');
              $vMarcaProd       = $request->getPost('marcaprod');
              $vProcedencia     = $request->getPost('procedencia');
              $vIdUnidadMed     = $request->getPost('idumed');
              $vIdPresentacion  = $request->getPost('idpres');
              $vEquivalencia    = $request->getPost('evaleprod');
              $vRendimientoPlacas = $request->getPost('rendimientoplacas');

              $vPrecioLimaEspecial          = $request->getPost('precioprodlocalespecial');
              $vPrecioLimaEspecial2         = $request->getPost('precioprodlocalespecial2');
              $vPrecioLimaEspecial3         = $request->getPost('precioprodlocalespecial3');
              $vPrecioProvincia             = $request->getPost('precioprodprovincia');
              $vPrecioProvinciaEspecial     = $request->getPost('precioprodprovinciaespecial');
              $vPrecioProvinciaEspecial2    = $request->getPost('precioprodprovinciaespecial2');
              $vPrecioProvinciaEspecial3    = $request->getPost('precioprodprovinciaespecial3');

              $vPrecioDistribuidorLima      = $request->getPost('precioproddistribuidorlima');
              $vPrecioDistribuidorProvincia = $request->getPost('precioproddistribuidorprovincia');

              $data = array( $vIdProd,$vCodigo,$vDescrip,$vPresen,$vPrecio,$vStock,$vIdCate,
              $vMarcaProd,$vProcedencia,$vIdUnidadMed,$vIdPresentacion,$vEquivalencia,$vRendimientoPlacas,$vPrecioLimaEspecial,
              $vPrecioProvincia,$vPrecioProvinciaEspecial,$vPrecioLimaEspecial2,$vPrecioLimaEspecial3,$vPrecioProvinciaEspecial2,$vPrecioProvinciaEspecial3,
              $vPrecioDistribuidorLima,$vPrecioDistribuidorProvincia);

              $jsonData                     = Cotizacion::guardarProducto($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;

         }
    }
    /*
       @Estadisticas por Cliente : Cantidades
    */

   public function estadisticaclientecotizacionesAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $vDesde   = $request->get('vDesde');
              $vHasta   = $request->get('vHasta');
              $vPersona = $request->get('vPersona');
              $data     = array($vPersona,$vDesde,$vHasta);
              $jsonData             = Cotizacion::estadisticaClienteCotizaciones($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;

         }
    }

      /*
       @Estadisticas por Producto : Cantidades
    */

   public function estadisticaproductocotizacionesAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $vDesde   = $request->get('vDesde');
              $vHasta   = $request->get('vHasta');
              $vProducto = $request->get('vProducto');
              $data  = array($vProducto,$vDesde,$vHasta);
              $jsonData             = Cotizacion::estadisticaProductoCotizaciones($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;

         }
    }

       /*
       @Estadisticas por Vendedor : Cantidades
    */

   public function estadisticavendedorcotizacionesAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $vDesde    = $request->get('vDesde');
              $vHasta    = $request->get('vHasta');
              $vVendedor = $request->get('vVendedor');
              $data      = array($vVendedor,$vDesde,$vHasta);
              $jsonData  = Cotizacion::estadisticaVendedorCotizaciones();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;

         }
    }




   //
   //   @Mantenimiento Unidad medida : Insertar / Actualizar
   //
   public function unidadmedidaactualizarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $vId =  $request->getPost('id');
              $vDescripcion = $request->getPost('descripcion');
              $vAbreviatura =  '';
              $data = array($vId,$vDescripcion,$vAbreviatura);
              $jsonData             = Cotizacion::agregarUnidadMedida($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;

         }
    }

   //
   //   @Mantenimiento Forma de Pago : Insertar / Actualizar
   //
   public function formapagoactualizarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $vId =  $request->getPost('idfopag');
              $vDescripcion = $request->getPost('descripcion');
              $data = array($vId,$vDescripcion);
              $jsonData             = Cotizacion::agregarFormaPago($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;

         }
    }

   //
   //   @Mantenimiento Modo de entrega : Insertar / Actualizar
   //
   public function modoentregaactualizarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $vId =  $request->getPost('idmodo');
              $vDescripcion = $request->getPost('descripcion');
              $data = array($vId,$vDescripcion);
              $jsonData             = Cotizacion::agregarModoEntrega($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }

   //
   //   @Mantenimiento Vendedor : Insertar / Actualizar
   //
   public function vendedoractualizarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $vId =  $request->getPost('idvend');
              $vNombre =  $request->getPost('nomvend');
              $vApellido=  $request->getPost('apevend');
              $vEmail =  $request->getPost('emailvend');
              $vTelefono=  $request->getPost('vtelefono');
              $vCelular=  $request->getPost('celvend');
              $vCargo=  $request->getPost('cargo');

              $data = array($vId,$vNombre,$vApellido,$vEmail,$vTelefono,$vCelular,$vCargo);
              $jsonData             = Cotizacion::agregarVendedor($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }

    //
    //  @Mantenimiento Eliminar : Vendedor , Forma de Pago , Modo Entrega
    //
    public function vendedoreliminarAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {

             $vIdVen  = $request->getPost('idven');
             $data = array($vIdVen);
             $jsonData             = Cotizacion::eliminarVendedor($data);
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
             return $response;
        }
   }
   public function formapagoeliminarAction(){
       $request        = new Phalcon\Http\Request();
       $response       = new \Phalcon\Http\Response();
       if($request->isPost() ==true)
       {

            $vIdfpago   = $request->getPost('idfpago');
            $data       = array($vIdfpago);
            $jsonData   = Cotizacion::eliminarFormaPago($data);
            $response->setContentType('application/json', 'UTF-8');
            $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
            return $response;
       }
  }
  public function modoentregaeliminarAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $vIdModo     = $request->getPost('idmodo');
           $data  = array($vIdModo);
           $jsonData    = Cotizacion::eliminarModoEntrega($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
           return $response;
      }
 }

 //
 //   @Mantenimiento Categoria : Insertar / Actualizar
 //
 public function categoriaactualizarAction(){
       $request        = new Phalcon\Http\Request();
       $response       = new \Phalcon\Http\Response();
       if($request->isPost() ==true)
       {
            $vId            =  $request->getPost('idcate');
            $vDescripcion   =  $request->getPost('descate');
            $vAbreviatura   =  $request->getPost('abrecate');
            $data = array($vId,$vDescripcion,$vAbreviatura);
            $jsonData             = Cotizacion::actualizarCategoria($data);
            $response->setContentType('application/json', 'UTF-8');
            $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
            return $response;
       }
  }

  public function categoriaeliminarAction()
  {
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $vId         = $request->getPost('idcate');
           $data  = array($vId);
           $jsonData    = Cotizacion::eliminarCategoria($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
           return $response;
      }
  }


  //
  //   @Mantenimiento Presentacion : Insertar / Actualizar
  //
  public function presentacionactualizarAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {
             $vId            =  $request->getPost('idpres');
             $vDescripcion   =  $request->getPost('despres');
             $vAbreviatura   =  $request->getPost('abrepres');
             $data = array($vId,$vDescripcion,$vAbreviatura);
             $jsonData      = Cotizacion::actualizarPresentacion($data);
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
             return $response;
        }
   }
   public function presentacioneliminarAction(){
       $request        = new Phalcon\Http\Request();
       $response       = new \Phalcon\Http\Response();
       if($request->isPost() ==true)
       {
            $vId        = $request->getPost('idpres');
            $data = array($vId);
            $jsonData   = Cotizacion::eliminarPresentacion($data);
            $response->setContentType('application/json', 'UTF-8');
            $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
            return $response;
       }
  }
  public function cotizacionesclientebuscarAction(){
       $request        = new Phalcon\Http\Request();
       $response       = new \Phalcon\Http\Response();
       if($request->isGet() ==true)
       {
            $vCodCliente  = $request->get('vCodigo');
            $data = array($vCodCliente);
            $jsonData     = Cotizacion::buscarCotizacionesCliente();
            $response->setContentType('application/json', 'UTF-8');
            $response->setContent($jsonData);
            return $response;

       }
  }

  /**
   * [listarCotizacionesParaFacturarAction, Lista todas las cotizaciones con el estado confirmado]
   * @return [json]
   */
  public function listarCotizacionesParaFacturarAction(){
       $request        = new Phalcon\Http\Request();
       $response       = new \Phalcon\Http\Response();
       if($request->isGet() ==true)
       {
            $vDesde  = $request->get('vDesde');
            $vHasta  = $request->get('vHasta');
           
            if( strlen($vDesde)!=0 && strlen($vHasta) !=0)
            {
                $datax = array($vDesde,$vHasta);
                $jsonDatax     = json_decode(Cotizacion::listarCotizacionesParaFacturarPorFechas($datax))->data;
            }else{
                $datax = array();
                $jsonDatax     = json_decode(Cotizacion::listarCotizacionesParaFacturar($datax))->data;
            }
            $af = array();
            $hp   = new FuncionesHelpers();
            if($jsonDatax !=''){
              foreach ($jsonDatax as $r) {
                  $af[] = array("idfact" => $r->idfacturacion,"estsunat"=>$hp->estado_xml_facturador($r->nomarchivo));
               }
              if(!empty($af)){ $rs = Facturacion::actualizarEstadosFacturador($hp->esCadenaNulo(json_encode($af)));}
            }
            if( strlen($vDesde)!=0 && strlen($vHasta) !=0)
            {
                $data = array($vDesde,$vHasta);
                $jsonData     = Cotizacion::listarCotizacionesParaFacturarPorFechas($data);
            }else{
                $data = array();
                $jsonData     = Cotizacion::listarCotizacionesParaFacturar($data);
            }
            $response->setContentType('application/json', 'UTF-8');
            $response->setContent($jsonData);
            return $response;

       }
  }
  public function listardocumentosventaAction(){
       $request        = new Phalcon\Http\Request();
       $response       = new \Phalcon\Http\Response();
       if($request->isGet() ==true)
       {
            $data = array();
            $jsonData     = DocumentoVenta::Listado();
            $response->setContentType('application/json', 'UTF-8');
            $response->setContent($jsonData);
            return $response;
       }
  }
 


}
