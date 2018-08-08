<?php
use \Phalcon\Mvc\Controller as Controller;
include __DIR__ .'/../library/funciones.php';
include __DIR__ .'/../library/fpdf/fpdf.php';
include __DIR__ .'/../library/fpdf/exfpdf.php';
include __DIR__ .'/../library/fpdf/jspdf.php';
include __DIR__ .'/../library/phpqrcode/qrlib.php';

//use Greenter\Ws\Services\SunatEndpoints;
//$serializer = 
//use JMS\Serializer\SerializerBuilder; //::create()->build();
class ImpresionController extends Controller
{
  
    public function impresionnotaAction()
    {
      $request  = new Phalcon\Http\Request();
      $id       =  $request->get("id");
      $data     = array($id);
      $cliente  =  json_decode(Facturacion::datosFacturacionCliente($data));       
      $detalle  =  json_decode(Facturacion::detalleFacturacion($data));
      $this->view->cliente = $cliente;
      $this->view->detalle = $detalle;
    }
    public function impresionguiaremisionAction(){
     
          $request  = new Phalcon\Http\Request();
          $id       =  $request->get("id");
          $data     = array($id);
          $guiaremision  =  json_decode(GuiaRemision::guiaremisionbuscar($data));       
          
          $pdf = new jsPDF('P','mm','A4');
          #Establecemos los márgenes izquierda, arriba y derecha: 
          $pdf->SetAutoPageBreak(true, 5);
          $wg = 188 ;//Ancho total
          $in = 6; //Interlineado
          $font = 'Arial';
          $tam = 9;
          $borde = 0;
          foreach ((array)$guiaremision->data as $row)
          {
            $fechaEmision     = $row->fechaemision;
            $fechaTraslado    = $row->fechatraslado;
            $puntoPartida     = $row->puntopartida;
            $puntoLLegada     = $row->puntollegada;
            $destinatario_razonsocial =  $row->destinatario_razonsocial;
            $destinatario_ruc         = $row->destinatario_ruc;
            $destinatario_dni         = $row->destinatario_dni;
            $unidad_placa             = $row->unidad_placa;
            $unidad_certificado       = $row->unidad_certificado;
            $unidad_licencia          = $row->unidad_licencia;
            $transportista_nombre     = $row->transportista_nombre;
            $transportista_ruc        = $row->transportista_ruc;
            $detalle                  = $row->detalle;
          }

       
          $h = new FuncionesHelpers();

          $pdf->AddPage();            
          $pdf->SetFont($font,'',$tam);
          $pdf->ln(50);
          $pdf->setX(36);
          $pdf->SetFontSpacing(1);
          $pdf->cell(110,5,pinta($fechaEmision),$borde,0,'L');
          $pdf->cell(0,5,pinta($fechaTraslado),$borde,1,'L');
          $pdf->Ln(2);
          $pdf->setX(35);
          $pdf->cell(0,5,pinta(strtoupper($puntoPartida)),$borde,1,'L');
          $pdf->setX(35);
          $pdf->cell(0,5,pinta(strtoupper($puntoLLegada)),$borde,1,'L');
          $pdf->Ln(8);$pdf->setX(20); // *****
          $pdf->cell(150,5,pinta('                                    '.$destinatario_razonsocial),0,0,'J');
          $pdf->cell(0,5,pinta($unidad_placa),0,1,'L');
          $pdf->ln(6);$pdf->setX(45);
          $pdf->cell(100,5,pinta($destinatario_ruc),$borde,0,'J');
          $fila = $pdf->getY();
          $pdf->setXY(150,$fila - 3);
          $pdf->cell(50,5,pinta($unidad_certificado),$borde,0,'C');
          $pdf->setXY(150,$fila + 3);
          $pdf->cell(50,5,pinta($unidad_licencia),$borde,0,'C');
          $pdf->Ln(12);

          
          foreach((array)$detalle as $row)
          {
            $pdf->setX(13);
            $pdf->Cell(20,5,pinta($row->cantidad),0,0,'C');
            $pdf->MultiCell(120,5, substr(pinta(trim($row->nombre)),0,63),0,'J');
            $pdf->Ln(1.5);
          }
          
          $pdf->SetY(282);
          $borde=0;$pdf->SetX(20);
          $pdf->Cell(0,5,pinta($transportista_nombre),$borde,1,'J')  ;$pdf->SetX(20);
          $pdf->Cell(0,5,pinta($transportista_ruc),$borde,1,'J')  ;
        
          $pdf->AutoPrint();
          $pdf->Output();

      
    }
    public function visualizarnotaAction(){
      $request  = new Phalcon\Http\Request();
      $id   =  $request->get("id");
      $data     = array($id);
      $cliente  =  json_decode(Facturacion::datosFacturacionCliente($data));       
      $detalle  =  json_decode(Facturacion::detalleFacturacion($data));
      $this->view->cliente = $cliente;
      $this->view->detalle = $detalle;   
    }
    public function enviarCotizacionAction(){

      $request    = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      $id = array($request->getPost("id"));
      $dataEmpresa =  json_decode(Empresa::listar())->data[0];
      $dataOc      =  json_decode( OrdenCompra::ordenCompraBuscarId($id))->data[0];
      $dataOcd     =  OrdenCompra::ordenCompraBuscarIdDetalle($id);  
     
      // ========== FPDF ==========  //
      $pdf = new exFPDF('P','mm','A4');

      $wg = 188 ;//Ancho total
      $in = 5; //Interlineado
      $font = 'Arial';
      $tam = 9;

      $pdf->AddPage();
      $pdf->SetFont($font,'',$tam);
      $pdf->MultiCell($wg,6,pinta($dataEmpresa->razonsocial),0,'L');
      $pdf->MultiCell($wg,$in, pinta($dataEmpresa->direccion),0,'L');
      $pdf->MultiCell($wg,$in,"RUC: ".$dataEmpresa->ruc,0,'L');
      $pdf->MultiCell($wg,$in,"Correo: ".pinta($dataEmpresa->correo),0,'L');
      $pdf->MultiCell($wg,$in,pinta("Teléfono: ".$dataEmpresa->telefono),'B','L');
      $pdf->Ln(4);
      

      $pdf->SetFont($font,'B',20);
      $pdf->Ln(4);
      $pdf->MultiCell($wg,$in,pinta("PEDIDO DE COMPRA # ".$dataOc->occodigo),0,'L');

      $pdf->Ln(5);

      $fila = $pdf->GetY();
      $pdf->SetFont($font,'B',$tam);
      $pdf->MultiCell(50,$in,"Fecha de pedido: ",0,'L');
      $pdf->SetXY(60,$fila);
      $pdf->MultiCell(80,$in,"Proveedor : ",0,'L');
      
      $pdf->SetXY(10,$fila+6);
      $fila = $pdf->GetY();
      $pdf->SetFont($font,'',$tam);
      $pdf->MultiCell(50,$in,pinta($dataOc->fordencompra),0,'L');
      $pdf->SetXY(60,$fila);
      $pdf->MultiCell(80,$in,pinta($dataOc->razonsocial),0,'L');
      
      $pdf->Ln(5);
      $pdf->SetFont($font,'B',$tam);
      $pdf->Cell(10,5,pinta('Item'),1,0,'C');
      $pdf->Cell(110,5,pinta('Descripción'),1,0,'C');
      $pdf->Cell(40,5,pinta('U.M.'),1,0,'C');
      $pdf->Cell(0,5,pinta('Cantidad'),1,1,'C');

      $pdf->SetFont($font,'',$tam);
      $tot=0;
      foreach($dataOcd as $row)
      {
        $pdf->Cell(10,5,$row["pitem"],1,0,'C');
        $pdf->Cell(110,5,pinta($row["pnombre"]),1,0,'L');
        $pdf->Cell(40,5,pinta($row["punidadmedida"]),1,0,'C');  
        $pdf->Cell(0,5,pinta($row["pcantidad"]),1,1,'C');
        $tot+=$row["pcantidad"];
      }
      $pdf->ln(1.5);
      $pdf->cell(160,5,'Total ',0,0,'R');
      $pdf->cell(0,5,pinta($tot),'T',1,'C');
      
        $pdf->Output('temp/ordencompra.pdf','F');
        $mailer = SimpleMail::make()
        ->setTo($dataOc->provcor, $dataOc->razonsocial) // para 
        ->setFrom($dataEmpresa->correo, $dataEmpresa->razonsocial) // de
        ->setSubject('Pedido de mercaderia ')
        ->setMessage('Le adjunto información de requerimiento.')
        ->setWrap(100)
        ->addAttachment('temp/ordencompra.pdf')
        ->send();
          
        $jsonData = array();
        $jsonData["error"] = $mailer;
        $response->setContentType('application/json', 'UTF-8');
        $response->setContent( json_encode($jsonData));
        return $response;
      
    }
    public function ordencomprapdfAction(){

      $request    = new Phalcon\Http\Request();
      $id = array($request->get("id"));
      $dataEmpresa =  json_decode(Empresa::listar())->data[0];
      $dataOc      =  json_decode( OrdenCompra::ordenCompraBuscarId($id))->data[0];
      $dataOcd     =  OrdenCompra::ordenCompraBuscarIdDetalle($id);  
    
      // ========== FPDF ==========  //
      $pdf = new exFPDF('P','mm','A4');

      $wg = 188 ;//Ancho total
      $in = 5; //Interlineado
      $font = 'Arial';
      $tam = 9;

      $pdf->AddPage();
      $pdf->SetFont($font,'',$tam);
      $pdf->MultiCell($wg,6,pinta($dataEmpresa->razonsocial),0,'L');
      $pdf->MultiCell($wg,$in, pinta($dataEmpresa->direccion),0,'L');
      $pdf->MultiCell($wg,$in,"RUC: ".$dataEmpresa->ruc,0,'L');
      $pdf->MultiCell($wg,$in,"Correo: ".pinta($dataEmpresa->correo),0,'L');
      $pdf->MultiCell($wg,$in,pinta("Teléfono: ".$dataEmpresa->telefono),'B','L');
      $pdf->Ln(4);
      

      $pdf->SetFont($font,'B',20);
      $pdf->Ln(4);
      $pdf->MultiCell($wg,$in,pinta("PEDIDO DE COMPRA # ".$dataOc->occodigo),0,'L');

      $pdf->Ln(5);

      $fila = $pdf->GetY();
      $pdf->SetFont($font,'B',$tam);
      $pdf->MultiCell(50,$in,"Fecha de pedido: ",0,'L');
      $pdf->SetXY(60,$fila);
      $pdf->MultiCell(80,$in,"Proveedor : ",0,'L');
      
      $pdf->SetXY(10,$fila+6);
      $fila = $pdf->GetY();
      $pdf->SetFont($font,'',$tam);
      $pdf->MultiCell(50,$in,pinta($dataOc->fordencompra),0,'L');
      $pdf->SetXY(60,$fila);
      $pdf->MultiCell(80,$in,pinta($dataOc->razonsocial),0,'L');
      
      $pdf->Ln(5);
      $pdf->SetFont($font,'B',$tam);
      $pdf->Cell(10,5,pinta('Item'),1,0,'C');
      $pdf->Cell(110,5,pinta('Descripción'),1,0,'C');
      $pdf->Cell(40,5,pinta('U.M.'),1,0,'C');
      $pdf->Cell(0,5,pinta('Cantidad'),1,1,'C');

      $pdf->SetFont($font,'',$tam);
      $tot=0;
      foreach($dataOcd as $row)
      {
        $pdf->Cell(10,5,$row["pitem"],1,0,'C');
        $pdf->Cell(110,5,pinta($row["pnombre"]),1,0,'L');
        $pdf->Cell(40,5,pinta($row["punidadmedida"]),1,0,'C');  
        $pdf->Cell(0,5,pinta($row["pcantidad"]),1,1,'C');
        $tot+=$row["pcantidad"];
      }
      $pdf->ln(1.5);
      $pdf->cell(160,5,'Total ',0,0,'R');
      $pdf->cell(0,5,pinta($tot),'T',1,'C');
      $pdf->Output();
    }
    public function reporteVentasAction(){
      
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      $desde = $request->get('desde');
      $hasta = $request->get('hasta');
      $rango = array($desde,$hasta);
      $listaCots =  json_decode(Cotizacion::listarCotizacionesParaFacturarPorFechas($rango))->data;

      // ========== FPDF ==========  //
      $pdf = new exFPDF('P','mm','A4');

      $wg = 188 ;//Ancho total
      $in = 6; //Interlineado
      $font = 'Arial';
      $tam = 8;


      $pdf->AddPage();
      $pdf->SetFont($font,'',$tam);
      $pdf->MultiCell($wg,6,pinta("REPORTE VENTAS"),0,'L');

      $pdf->Ln(4);

      $pdf->SetFont($font,'',$tam-2);
      //-----------------------------------
      //----------- LISTA PRODUCTOS DETALLE
      $table=new easyTable($pdf, '{20, 20, 18, 10, 45, 25, 18, 15, 15}', 'align:L; border:{B};');
        $table->rowStyle('font-style:B;');
        $table->easyCell(pinta('F.Cotización'), 'valign:B;border:{B};');
        $table->easyCell(pinta('F.Facturado'), 'valign:B;border:{B};bgcolor:#EBEBEB;');
        $table->easyCell(pinta('Doc.Interno'),'valign:B;border:{B};');
        $table->easyCell(pinta('Tipo'),'valign:B;border:{B};bgcolor:#EBEBEB;');
        $table->easyCell(pinta('Nombre/Razón Social'),'valign:B');
        $table->easyCell(pinta('Estado'),'valign:B;bgcolor:#EBEBEB;');
        $table->easyCell(pinta('F.Pago'),'valign:B');
        $table->easyCell(pinta('Total'),'valign:B;bgcolor:#EBEBEB;');
        $table->easyCell(pinta('A cuenta'),'valign:B');
        $table->easyCell(pinta('Saldo'),'valign:B;bgcolor:#EBEBEB;');
        $table->printRow();

        foreach($listaCots as $row){
          $table->rowStyle('border-color:#ADADAD;');
          $table->easyCell(pinta($row->fechacoti), 'align:L;');
          $table->easyCell(pinta($row->fechafact), 'align:L;bgcolor:#EBEBEB;');
          $table->easyCell(pinta($row->docinterno), 'align:L;');
          $table->easyCell(pinta($row->tipodoc), 'align:L;bgcolor:#EBEBEB;');
          $table->easyCell(pinta($row->nomcompleto), 'align:L;');
          $table->easyCell(pinta($row->descripcion), 'align:L;bgcolor:#EBEBEB;');
          $table->easyCell(pinta($row->formapago), 'align:L;');
          $table->easyCell(pinta($row->totalcoti), 'align:L;bgcolor:#EBEBEB;');
          $table->easyCell(pinta($row->pagoacuenta), 'align:L;');
          $table->easyCell(pinta($row->saldopagar), 'align:L;bgcolor:#EBEBEB;');
          $table->printRow();
        }

      $table->endTable(4);
      //----------- FIN LISTA PRODUCTOS DETALLE
      //-----------------------------------

      $pdf->Output();
    }
    public function reportecuentacorrienteclienteAction(){
      
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      $vIdper         =  $request->get('idper');
      $vPersona       =  $request->get('persona');
      $data           = array($vIdper);

      $jsonData      = json_decode(Facturacion::buscarVentasCliente($data))->data;
      // ========== FPDF ==========  //
      $pdf = new fpdf('P','mm','A4');

      $wg = 188 ;//Ancho total
      $in = 6; //Interlineado
      $font = 'Arial';
      $tam = 8;


      $pdf->AddPage();
      $pdf->SetFont($font,'',$tam);
      $pdf->Cell($wg,4,pinta("CUENTA CORRIENTE CLIENTE : " . $vPersona),0,1,'L');

      $pdf->Ln(4);
      $pdf->Cell(30,4,'Fecha',1,0,'C');
      $pdf->Cell(30,4,'Documento',1,0,'C');
      $pdf->Cell(10,4,'Tipo',1,0,'C');
      $pdf->Cell(30,4,'Forma Pago',1,0,'C');
      $pdf->Cell(30,4,'Total',1,0,'C');
      $pdf->Cell(30,4,'Acuenta',1,0,'C');
      $pdf->Cell(30,4,'Saldo',1,1,'C');

      $total  = 0;
      $totalS = 0;
      $totalP = 0;

      foreach((array) $jsonData as $row){
          //if($row->formapago == 'CREDITO'){
              $pdf->Cell(30,4,pinta($row->fechafact),1,0,'C');
              $pdf->Cell(30,4,pinta($row->docinterno),1,0,'C');
              $pdf->Cell(10,4,pinta($row->tipodoc),1,0,'C');
              $pdf->Cell(30,4,pinta($row->formapago),1,0,'C');
              $pdf->Cell(30,4, number_format($row->totalcoti,2,'.',' '),1,0,'R');
              $pdf->Cell(30,4, number_format($row->pagoacuenta,2,'.',' '),1,0,'R');
              $pdf->Cell(30,4, number_format($row->saldopagar,2,'.',' '),1,1,'R');

              $total  += $row->totalcoti;
              $totalS += $row->pagoacuenta;
              $totalP += $row->saldopagar;
            //}
      }
      $pdf->Cell(100,4,'TOTALES',0,0,'R');
      $pdf->Cell(30,4, number_format($total,2,'.',' '),1,0,'R');
      $pdf->Cell(30,4, number_format($totalS,2,'.',' ') ,1,0,'R');
      $pdf->Cell(30,4, number_format($totalP,2,'.',' ') ,1,1,'R');

      $pdf->Output();

    }
    public function reporteventapagosclienteAction(){
     
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();



      $vIdper           =  $request->get('idper');
      $vPersona         =  $request->get('persona');
      $data           = array($vIdper);
      $jsonData      = json_decode(Facturacion::buscarVentasCliente($data))->data;
      //print_r($jsonData);die();
      // ========== FPDF ==========  //
      $pdf = new fpdf('P','mm','A4');

      $wg = 188 ;//Ancho total
      $in = 6; //Interlineado
      $font = 'Arial';
      $tam = 8;


      $pdf->AddPage();
      $pdf->SetFont($font,'',$tam);


      $pdf->Cell(20,4,pinta('CLIENTE :  ' . $vPersona),0,1,'L');
      $pdf->Ln();

      foreach( (array) $jsonData as $row)
      {
                  if($row->formapago == 'CREDITO'){

                    $pdf->Cell(20,4,pinta('Fecha Venta  '),1,0,'L');
                    $pdf->Cell(40,4,pinta($row->fechafact),1,0,'C');
                    $pdf->Cell(20,4,pinta('Forma Pago   '),1,0,'L');
                    $pdf->Cell(0,4,pinta($row->formapago),1,1,'L');
                    $pdf->Cell(20,4,pinta('Total Venta    '),1,0,'L');
                    $pdf->Cell(40,4,pinta( number_format($row->totalcoti,2,'.',' ')),1,1,'R');
                    $pdf->Cell(20,4,pinta('Total Acuenta   '),1,0,'L');
                    $pdf->Cell(40,4,pinta( number_format($row->pagoacuenta,2,'.',' ')),1,1,'R');
                    $pdf->Cell(20,4,pinta('Total Saldo    '),1,0,'L');
                    $pdf->Cell(40,4,pinta( number_format($row->saldopagar,2,'.',' ')),1,1,'R');


                    $pdf->SetFillColor(206, 202, 202);
                    $pdf->MultiCell(0,4,'PAGOS / ADELANTOS  ',1,'L',TRUE);

                    $datax           = array($row->idfacturacion);
                    $jsonDataD      = json_decode(Facturacion::buscarPagoAcuenta($datax))->data;
                    $total = 0;
                    foreach ((array) $jsonDataD as $rowd) {
                                    $pdf->Cell(20,4,  $rowd->fechat ,1,0,'C');
                                    $pdf->Cell(40,4, number_format($rowd->monto,2,'.',' '),1,1,'R');
                                    $total  += $rowd->monto;
                    }
                    $pdf->Cell(20,4,'Total Acuenta' ,1,0,'C',TRUE);
                    $pdf->Cell(40,4, number_format($total,2,'.',' '),1,1,'R',TRUE);

                    $pdf->Ln();
                  }
      }

      $pdf->Cell($wg,4,pinta("PAGOS DEL CLIENTE : " . $vPersona),0,1,'L');
      $pdf->Cell($wg,4,pinta("MONTO DEL PEDIDO  : " . $vMonto),0,1,'L');

      $pdf->Ln(4);
      $pdf->Cell(30,4,'Fecha',1,0,'C');
      $pdf->Cell(30,4,'Pago',1,1,'C');

      $total  = 0;
      foreach($jsonData as $row){

              $pdf->Cell(30,4,  $row->fechat ,1,0,'C');
              $pdf->Cell(30,4, number_format($row->monto,2,'.',' '),1,1,'R');
              $total  += $row->monto;

      }
      $pdf->Cell(30,4,'TOTAL',0,0,'R');
      $pdf->Cell(30,4, number_format($total,2,'.',' '),1,0,'R');

      $pdf->Output();

    }
    public function imprimirproformaAction(){
      
            $request    = new Phalcon\Http\Request();
            $idCot      = $request->get("id");
            $dataEmpresa =  json_decode(Empresa::listar())->data[0];
            $dataCotizacion =  json_decode(Cotizacion::buscarCotizacionPorId(array($idCot)))->data[0];
            $dataDetalle =  json_decode(Cotizacion::detalleCotizacionVista(array($idCot)))->data;
            $dataPersona = json_decode(Persona::Buscar($dataCotizacion->idper))->data[0];;
            
            $total_sin_imp = 0.00;
            $impuestos = 0.18;
            $total_cotizacion = 0.00;
      
            // ========== FPDF ==========  //
            $pdf = new jsPDF('P','mm','A4');
            $wg = 100 ;//Ancho total
            $in = 5; //Interlineado
            $font = 'Arial';
            $tam = 8;
      
            $pdf->AddPage();
            $pdf->SetFont($font,'',$tam);
            $pdf->Ln(1);
            $pdf->Image('../public/img/logo.jpg', 10, 5, 28);
            $pdf->setY(5);
            $pdf->setX(100);
            $pdf->MultiCell($wg,$in, pinta($dataEmpresa->razonsocial),'T','L');
            $pdf->setX(100);
            $pdf->MultiCell($wg,$in, pinta(strtoupper($dataEmpresa->direccion)),0,'L');
            $pdf->setX(100);
            $pdf->MultiCell($wg,$in,"CORREO: ".pinta($dataEmpresa->correo),0,'L');
            $pdf->setX(100);
            $pdf->MultiCell($wg,$in,pinta("TELÉFONO: ".$dataEmpresa->telefono),'B','L');
          
            $tam = 9;
            $pdf->Ln(7);
      
            $pdf->SetFont($font,'B',20);
            $pdf->MultiCell(186,$in,pinta("COTIZACIÓN: ".$dataCotizacion->ctcodigo),0,'C');
            $pdf->Ln(5);
      
            $fila = $pdf->GetY();
            $pdf->SetFont($font,'B',$tam);
            //$pdf->Cell(40,$in,pinta("FECHA DE COTIZACIÓN: "),0,0,'L');
            $pdf->Cell(0,$in,pinta($dataCotizacion->fechacoti),0,1,'R');
            $pdf->Cell(20,$in,"CLIENTE: ",0,0,'L');
            $pdf->Cell(0,$in,pinta($dataCotizacion->nomcompleto),0,1,'L');
            $pdf->Cell(20,$in,"DIRECCION: ",0,0,'L');
            $pdf->Cell(0,$in,pinta($dataCotizacion->domiciper),0,1,'L');
            $pdf->Cell(20,$in,"RUC: ",0,0,'L');
            $pdf->Cell(0,$in,pinta($dataCotizacion->numrucper),0,1,'L');
            $pdf->Cell(20,$in,"TELEFONO: ",0,0,'L');
            $pdf->Cell(108,$in,pinta($dataCotizacion->telefper),0,0,'L');

            $pdf->Cell(47,6,pinta('COTIZACIÓN VALIDA HASTA : '),0,0,'L');
            $pdf->Cell(0,6,pinta($dataCotizacion->validohasta),0,1,'L');

            
            
            
            
          // print_r($dataCotizacion);die();
            $pdf->Ln(4);
              $pdf->Cell(10,5,pinta('Item'),1,0,'C');
              $pdf->Cell(110,5,pinta('Descripción'),1,0,'C');
              $pdf->Cell(10,5,pinta('Cant.'),1,0,'C');
              $pdf->Cell(15,5,pinta('Unidad'),1,0,'C');
              //$pdf->Cell(16,5,pinta('P. sin igv'),1,0,'C');
              $pdf->Cell(16,5,pinta('P. con igv'),1,0,'C');
              $pdf->Cell(32,5,pinta('Total'),1,1,'C');
                $item = 1;
                 foreach($dataDetalle as $row){
                  $pdf->SetFont($font,'',7);
                  $pdf->Cell(10,5,pinta($item++),1,0,'C'); 
                  $pdf->Cell(110,5,pinta($row->descripcion),1,0,'L');
                  
                  $pdf->Cell(10,5,pinta($row->cantidad),1,0,'C');
                  $pdf->Cell(15,5,pinta($row->um),1,0,'C');
                  //$pdf->Cell(16,5,pinta(number_format($row->precio / 1.18 , 2, '.',' ')),1,0,'R');
                  $pdf->Cell(16,5,pinta(number_format($row->precio, 2, '.',' ')),1,0,'R');
                  $pdf->Cell(32,5,pinta(number_format($row->total , 2, '.',' ')),1,1,'R');
                  $total_sin_imp += $row->total;
                 }
  
              $pdf->Ln(4);
              //$impuestos = $total_sin_imp * $impuestos;
              $total_cotizacion = $total_sin_imp; // $total_sin_imp + $impuestos;
           
          $pdf->SetFont($font,'',$tam);       
          if($dataCotizacion->incluyeigv == 1){
                $pdf->Cell(165,5,pinta('TOTAL'),0,0,'R');
                $pdf->Cell(22,5,pinta(number_format($total_cotizacion, 2, '.',' ')),'T',1,'R');
              }else{
                $pdf->Cell(168,5,pinta('SUB TOTAL'),0,0,'R');
                $pdf->Cell(22,5,pinta(number_format($total_cotizacion / 1.18 , 2, '.',' ')),'T',1,'R');
                $pdf->Cell(168,5,pinta('IGV'),0,0,'R');
                $pdf->Cell(22,5,pinta(number_format($total_cotizacion - ($total_cotizacion / 1.18 ) , 2, '.',' ')),'T',1,'R');
                $pdf->Cell(168,5,pinta('TOTAL'),0,0,'R');
                $pdf->Cell(22,5,pinta(number_format($total_cotizacion, 2, '.',' ')),'T',1,'R');
              }

          //$pdf->Ln();      
          //- Observaciones
          $pdf->SetFont($font,'',$tam);
          $pdf->Cell(0,6,pinta(''),'B',1,'L');
          $pdf->Cell(35,6,'LUGAR DE ENTREGA :',0,0,'L');
          $pdf->Cell(0,6,pinta($dataCotizacion->lugarentrega),0,1,'L');
          $pdf->MultiCell($wg,6,'OBSERVACIONES :',0,'L');
          $pdf->SetFont($font,'',$tam);
          $pdf->MultiCell($wg,6,pinta($dataCotizacion->comentario),0,'L');
          
          $pdf->Cell(35,6,pinta('CREDITOS Y COBRANZAS : '),0,1,'L');
          $pdf->MultiCell(0,4,pinta($dataCotizacion->creditoscobranzas),0,'J');
          /*$pdf->Ln();    
          $pdf->Cell(80,6,pinta('CUENTA CORRIENTE BCP  :'),0,0,'L');
          $pdf->Cell(0,6,pinta('S/: 191-2451784-0-93'),0,1,'L');
          $pdf->Cell(80,6,pinta('CUENTA CORRIENTE BCP  :'),0,0,'L');
          $pdf->Cell(0,6,pinta('$:  191-2471001-1-15'),0,1,'L');*/
        
          $pdf->AutoPrint();
          $pdf->Output();
      
      
    }
    public function imprimirstockinventarioAction(){  
            $this->view->disable();      
            $pdf = new fpdf('P','mm','A4');
            $request    = new Phalcon\Http\Request();
            
            $data = array($request->get('mes'));
            $jsonData = json_decode( Producto::listarInventario($data) );
            $pdf->AddPage(); 
            $pdf->SetFont('Arial','B',16);
            $fila = 0;
            $pdf->Cell(0,10,'Registro de Inventario',1,1,'C');
            $pdf->SetFont('Arial','',9);
            //print_r( $jsonData->data[0]);die();
            $pdf->Cell(30,5,'Codigo' ,1,0,'C');
            $pdf->Cell(100,5,'Producto' ,1,0,'C');
            $pdf->Cell(20,5,'Stock Fisico' ,1,0,'C');
            $pdf->Cell(20,5,'Inventario' ,1,0,'C');   
            $pdf->Cell(20,5,'Diferencia' ,1,1,'C');   
            $pdf->SetFont('Arial','',8);
           foreach ($jsonData->data as $row){
                //  $pdf->Code39(10,$pdf->getY(), $row->codigobarras ,0.5,10);
              $pdf->Cell(30,5,$row->codigoproducto  ,1,0,'C');
              $pdf->Cell(100,5,$row->nombre ,1,0,'L');
              $pdf->Cell(20,5,$row->stockfisico ,1,0,'C');
              $pdf->Cell(20,5,'' ,1,0,'C');   
              $pdf->Cell(20,5,'' ,1,1,'C');   
              
            }
      
            $pdf->Output();
    }  
    public function imprimirticketeraAction(){
          
          //#Ruta del Facturador Sunat
          $rutaFacturadorSunat = "C:\\facturador\sunat_archivos\sfs\FIRMA";
          $hp                  = new FuncionesHelpers();
          $request             = new Phalcon\Http\Request();
          $idfactura           = array($request->get("id"));
          $dataEmpresa         = json_decode(Empresa::listar())->data[0];
          $dataFacturacion     = json_decode(Facturacion::datosFacturacionCliente($idfactura))->data[0];
          $dataDetalle         = json_decode(Facturacion::detalleFacturacion($idfactura))->data;
          $dataTicketera       = json_decode(DocumentoVenta::ticketeras())->data[0];
          $totalGrabado        = 0;
          $igv                 = 0;
          $totalVenta          = 0;
          
          $file = simplexml_load_file($rutaFacturadorSunat.'\\'. $dataFacturacion->nombrearchivo. '.xml');
          $arrayData = $hp->xmlToArray($file);
          $umlExt    = $arrayData["Invoice"]["ext:UBLExtensions"]["ext:UBLExtension"]["ext:ExtensionContent"];
          $umlFirmas = $umlExt["ds:Signature"]["ds:SignedInfo"];
          $firmaDoc  = $umlFirmas["ds:Reference"]["ds:DigestValue"];

          $pdf = new jsPDF('P','mm',array(100,250));
          $borde = 0;
          #Establecemos los márgenes izquierda, arriba y derecha: 
          $pdf->SetMargins(1, 0 , 1); 
          $pdf->AddPage();
          $pdf->setX(4);
          $pdf->setFont("Arial", "B", 11);
          $pdf->MultiCell(93, 5,utf8_decode( $dataEmpresa->razonsocial) ,$borde, "C");
          $pdf->setX(4);
          $pdf->setFont("Arial", "", 9.5);
          $pdf->MultiCell(93, 4,"R.U.C : ". $dataEmpresa->ruc ,$borde, "C");
          $pdf->setX(4);
          $pdf->MultiCell(93, 4, trim($dataEmpresa->direccion),0, "C");
          $pdf->setX(4);
          $pdf->Cell(93,4,"Tef: ".$dataEmpresa->telefono,0,1,"C");
          $pdf->setX(4);
          $pdf->setFont("Arial", "B", 9.5);
          if(substr($dataFacturacion->documento,0,1)=='B'){
            $pdf->Cell(93, 5,'BOLETA ELECTRONICA ', 0, 2, "C");
            $pdf->Cell(93, 3,$dataFacturacion->seriedoc.'-'. str_pad( $dataFacturacion->numerodoc,8,'0',STR_PAD_LEFT) , 0, 2, "C");
          }else{
                if( substr($dataFacturacion->documento,0,1)=='N')
                {
                  $pdf->Cell(93, 5,'** NOTA PEDIDO :  '. $dataFacturacion->seriedoc.'-'.$dataFacturacion->numerodoc .' **', 0, 2, "C");  
                }
                else{
                  $pdf->Cell(93, 5,'FACTURA ELECTRONICA ', 0, 2, "C");
                  $pdf->Cell(93, 3,$dataFacturacion->seriedoc.'-'.str_pad( $dataFacturacion->numerodoc,8,'0',STR_PAD_LEFT) , 0, 2, "C");
                }
          }
        $pdf->setFont("Arial", "", 9.5);
        $pdf->Ln(1);
        $pdf->setX(4);
        $pdf->Cell(35, 5, utf8_decode("FECHA EMISIÓN   :  ").$dataFacturacion->fecha, $borde, 1, "L");
        $pdf->Ln(1);
        $pdf->setX(4);
        $borde = 'B';
        $pdf->setFont("Arial", "", 9);
        $pdf->Cell(45, 5, "DESCRIPCION", $borde, 0, "L");
        $pdf->Cell(15, 5, "CANT", $borde, 0, "L");
        $pdf->Cell(14, 5, "P.UNI.", $borde, 0, "R");
        $pdf->Cell(15, 5, "IMP.", $borde, 2, "R");
        $pdf->Ln(1);
        $borde = 0;
        $totalventa = 0;
        foreach ($dataDetalle as $row) {
            $pdf->setX(4);
            $pdf->setFont("Arial", "", 9);
            $pdf->MultiCell(89, 4, $row->producto, $borde, "L");
            $pdf->setFont("Arial", "", 10);
            if($row->cantidad == 1 && $row->unidadcantidad >0){
              $pdf->setX(50);
              $pdf->Cell(10, 5, $row->unidadcantidad .' und', $borde, 0, "R");
            }else{
              $pdf->setX(50);
              $pdf->Cell(10, 5, $row->cantidad, $borde, 0, "R");
            }
            $pdf->Cell(15, 5, number_format($row->precio, 2, ".", ","), $borde, 0, "R");
            $pdf->Cell(18, 5, number_format($row->total , 2, ".", ","), $borde, 1, "R");
            $totalventa = $totalventa + $row->total;
        }
        $pdf->setX(4);
        $pdf->MultiCell(89, 1, ' ', 'B', "C");
        $pdf->Ln(0.5);
        $pdf->setX(36);
        $borde= 0;
        if($dataFacturacion->incluyeigv == 1){
          $totalGrabado = $totalventa / 1.18 ;
          $igv          = $totalventa - ($totalventa / 1.18);
          $totalVenta   = $totalventa;
        }else{
          $totalGrabado = $totalventa  ;
          $igv          = $totalventa * 0.18;
          $totalGrabado = $totalventa  ;
          $totalVenta   = $totalventa + ($totalventa * 0.18);
        }
        $pdf->setFont("Arial", "", 9);
        $pdf->Cell(27, 5, "OP.GRAVADA ", $borde, 0, "L");
        $pdf->Cell(6, 5, "S/", $borde, 0, "L");
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(24, 5, number_format($totalGrabado , 2, ".", ","), $borde, 2, "R");
        $pdf->setX(36);
        $pdf->setFont("Arial", "", 9);
        $pdf->Cell(27, 5, "I.G.V. 18% ", $borde, 0, "L");
        $pdf->Cell(6, 5, "S/", $borde, 0, "L");
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(24, 5, number_format( $igv, 2, ".", ","), $borde, 2, "R");
        $pdf->setX(36);
        $pdf->setFont("Arial", "", 9);
        $pdf->Cell(27, 5, "IMPORTE TOTAL ", $borde, 0, "L");
        $pdf->Cell(6, 5, "S/", $borde, 0, "L");
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(24, 5, number_format($totalVenta , 2, ".", ","), $borde, 2, "R");
        $pdf->Ln();
        $pdf->setX(4);
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(20, 5, "SON : ", $borde, 0, "L");
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(65, 5, $dataFacturacion->totalletras, $borde, 2, "L");
        $pdf->Ln(1);
        $pdf->setX(4); 
        $pdf->setFont("Arial", "", 9);
        $pdf->Cell(20, 5, "CLIENTE : ", $borde, 0, "L");
        $pdf->setFont("Arial", "", 9);
        $pdf->Cell(65, 5, $dataFacturacion->nomcompleto, $borde, 2, "L");
        $pdf->setX(4);
        $pdf->Cell(20, 5, "RUC/DNI : ", $borde, 0, "L");
        $pdf->setFont("Arial", "", 9);
        $pdf->Cell(65, 5, ($dataFacturacion->numdocper!=''?$dataFacturacion->numdocper:$dataFacturacion->numrucper), $borde, 2, "L");
        $pdf->Ln();
        $pdf->setX(4);
        $pdf->MultiCell(88, 5, $firmaDoc, $borde, "C"); #Firma Digital
        $pdf->AutoPrint();
        $pdf->output(); 
    }
    // @Grupo reportes de ventas
    // Muestra todos los reportes del esquema facturación
    public function impresiondeventasAction(){
      $request    = new Phalcon\Http\Request();
      $desde = $request->get("desde");
      $hasta = $request->get("hasta");
      if(strlen($desde)=='' && strlen($hasta)==''){ $data       = array();}
      else{ $data   = array($desde,$hasta);}
      $detalle      = json_decode(Facturacion::buscarVentasPdv($data));
      $resumen      = json_decode(Facturacion::resumenVentas($data));
      
      $pdf = new  ReporteVentas('P','mm','A4');
      $borde = 0;
      $wg = 100 ;//Ancho total
      $in = 4; //Interlineado
      $font = 'Arial';
      $tam = 9;
      $pdf->SetMargins(15,10,10,10);
      $pdf->AddPage();
      $pdf->SetFont($font,'B',16);
      $pdf->Ln();
      $pdf->MultiCell(186,$in,"REPORTE VENTAS",0,'L');
      $pdf->Ln(5);
  
      $fila = $pdf->GetY();
      $pdf->SetFont($font,'B',$tam);
      $pdf->Cell(30,5,pinta('Fecha Inicio  :'),0,0,'l');
      $pdf->SetFont($font,'',$tam);
      $pdf->Cell(30,5,pinta($desde),0,0,'l');
      $pdf->SetFont($font,'B',$tam);
      $pdf->Cell(30,5,pinta('Fecha Termino :'),0,0,'l');
      $pdf->SetFont($font,'',$tam);
      $pdf->Cell(30,5,pinta($hasta),0,1,'l');
      $pdf->Ln(4);
      $pdf->SetFont($font,'B',$tam);
      $pdf->Cell(8,5,pinta('Item'),'B',0,'C');
      $pdf->Cell(18,5,pinta('Fecha'),'B',0,'C');
      $pdf->Cell(20,5,pinta('Documento'),'B',0,'C');
      $pdf->Cell(20,5,pinta('Nro.'),'B',0,'C');
      $pdf->Cell(70,5,pinta('Cliente'),'B',0,'L');
      $pdf->Cell(30,5,pinta('Total'),'B',0,'R');
      $pdf->Cell(0,5,pinta('Estado'),'B',1,'C');
      $item = 1;
      $total= 0;
      $pdf->SetFont($font,'',$tam);
      $borde='B';
      foreach($detalle->data as $row){
              $pdf->SetFont($font,'',8);
              $pdf->Cell(8,5,pinta($item++),$borde,0,'C'); 
              $pdf->Cell(18,5,pinta($row->fechafact),$borde,0,'C');
              $pdf->Cell(20,5,pinta($row->tipodoc),$borde,0,'C');
              $pdf->Cell(20,5,pinta($row->docinterno),$borde,0,'C');
              $pdf->Cell(70,5,pinta($row->nomcompleto),$borde,0,'L');
              $pdf->Cell(30,5,pinta(number_format($row->totalcoti, 2, '.',' ')),$borde,0,'R');
              $pdf->Cell(0,5,pinta($row->descripcion),$borde,1,'C');
              $total += $row->totalcoti;
      }
      $pdf->Ln(1.5);
      $pdf->Cell(145,5,pinta('TOTAL'),0,0,'R');
      $pdf->Cell(21,5,pinta(number_format($total, 2, '.',' ')),'T',1,'R');
      
      $pdf->Ln(5);
      $pdf->SetFont($font,'B',9);
      $pdf->Cell(0,5,pinta('RESUMEN'),0,1,'L');
      $pdf->Cell(18,5,pinta('Fecha'),$borde,0,'C');
      $pdf->Cell(20,5,pinta('Total Dia'),$borde,0,'R');
      $pdf->Cell(30,5,pinta('Apertura'),$borde,0,'R');
      $pdf->Cell(30,5,pinta('Total'),$borde,1,'R');

      $pdf->SetFont($font,'',8);
      $td=0;
      $ta=0;
      $tg=0;
      foreach($resumen->data as $row){
        
        $pdf->Cell(18,5,pinta($row->fecha),$borde,0,'C');
        $pdf->Cell(20,5,pinta(number_format($row->subtotal, 2, '.',' ')),$borde,0,'R');
        $pdf->Cell(30,5,pinta(number_format($row->apertura, 2, '.',' ')),$borde,0,'R');
        $pdf->Cell(30,5,pinta(number_format($row->total, 2, '.',' ')),$borde,1,'R');
        $td +=$row->subtotal;
        $ta +=$row->apertura;
        $tg +=$row->total;
        
      }   
      $pdf->Cell(18,5,pinta(''),0,0,'C');
      $pdf->Cell(20,5,pinta(number_format($td, 2, '.',' ')),$borde,0,'R');
      $pdf->Cell(30,5,pinta(number_format($ta, 2, '.',' ')),$borde,0,'R');
      $pdf->Cell(30,5,pinta(number_format($tg, 2, '.',' ')),$borde,1,'R');

      $pdf->output();
    }
    public function impresiondeventasfacturacionAction(){
      $request    = new Phalcon\Http\Request();
      $desde = $request->get("desde");
      $hasta = $request->get("hasta");
      if(strlen($desde)=='' && strlen($hasta)==''){ $data       = array();}
      else{ $data   = array($desde,$hasta);}
      $detalle      = json_decode(Cotizacion::listarCotizacionesParaFacturarPorFechas($data));
      $resumen      = json_decode(Facturacion::resumenVentas($data));
      $resumenco   = json_decode(Facturacion::resumenVentasCotizacion($data));
      
      $pdf = new  ReporteVentas('P','mm','A4');
      $borde = 0;
      $wg = 100 ;//Ancho total
      $in = 4; //Interlineado
      $font = 'Arial';
      $tam = 9;
      $pdf->SetMargins(15,10,10,10);
      $pdf->AddPage();
      $pdf->SetFont($font,'B',16);
      $pdf->Ln();
      $pdf->MultiCell(186,$in,"REPORTE VENTAS",0,'L');
      $pdf->Ln(5);
  
      $fila = $pdf->GetY();
      $pdf->SetFont($font,'B',$tam);
      $pdf->Cell(30,5,pinta('Fecha Inicio  :'),0,0,'l');
      $pdf->SetFont($font,'',$tam);
      $pdf->Cell(30,5,pinta($desde),0,0,'l');
      $pdf->SetFont($font,'B',$tam);
      $pdf->Cell(30,5,pinta('Fecha Termino :'),0,0,'l');
      $pdf->SetFont($font,'',$tam);
      $pdf->Cell(30,5,pinta($hasta),0,1,'l');
      $pdf->Ln(4);
      $pdf->SetFont($font,'B',$tam);
      $pdf->Cell(8,5,pinta('Item'),'B',0,'C');
      $pdf->Cell(18,5,pinta('Fecha'),'B',0,'C');
      $pdf->Cell(20,5,pinta('Documento'),'B',0,'C');
      $pdf->Cell(10,5,pinta('Serie'),'B',0,'C');
      $pdf->Cell(20,5,pinta('Nro.'),'B',0,'C');
      $pdf->Cell(60,5,pinta('Cliente'),'B',0,'L');
      $pdf->Cell(30,5,pinta('Total'),'B',0,'R');
      $pdf->Cell(0,5,pinta('Estado'),'B',1,'C');
      $item = 1;
      $total= 0;
      $pdf->SetFont($font,'',$tam);
      $borde='B';
      //print_r($detalle);die();
      foreach($detalle->data as $row){
              $pdf->SetFont($font,'',8);
              $pdf->Cell(8,5,pinta($item++),$borde,0,'C'); 
              $pdf->Cell(18,5,pinta($row->fechafact),$borde,0,'C');
              $pdf->Cell(20,5,pinta($row->tipodoc),$borde,0,'C');
              $pdf->Cell(10,5,pinta($row->seriedoc),$borde,0,'C');
              $pdf->Cell(20,5,pinta($row->docinterno),$borde,0,'C');
              $pdf->Cell(60,5,pinta($row->nomcompleto),$borde,0,'L');
              $pdf->Cell(30,5,pinta(number_format($row->totalcoti, 2, '.',' ')),$borde,0,'R');
              $pdf->SetFont($font,'',6);
              $pdf->Cell(0,5,pinta($row->descripcion),$borde,1,'C');
              IF($row->descripcion!='VD ANULADO')
                  $total += $row->totalcoti;
      }
      $pdf->Ln(1.5);
      $pdf->SetFont($font,'',8);
      $pdf->Cell(145,5,pinta('TOTAL'),0,0,'R');
      $pdf->Cell(21,5,pinta(number_format($total, 2, '.',' ')),'T',1,'R');
      $pdf->Ln(2);
      $pdf->SetFont($font,'B',9);
      $borde =1;
      $pdf->Cell(0,5,pinta('RESUMEN ORIGEN ( COTIZACIONES/FACTURACIÓN  )'),0,1,'L');
      $pdf->Cell(18,5,pinta('Fecha'),$borde,0,'C');
      $pdf->Cell(50,5,pinta('Estado'),$borde,0,'R');
      $pdf->Cell(30,5,pinta('Total'),$borde,1,'R');
      $tc = 0;
      $pdf->SetFont($font,'',8);
      $ttg =0;
      foreach($resumenco->data as $row){
        
        $pdf->Cell(18,5,pinta($row->fechacoti),$borde,0,'C');
        $pdf->Cell(50,5,pinta($row->descripcion),$borde,0,'R');
        $pdf->Cell(30,5,pinta(number_format($row->totalcoti, 2, '.',' ')),$borde,1,'R');
        $tc +=$row->totalcoti;
        if($row->descripcion =='CT FACTURADA' || $row->descripcion =='VD FACTURADA' || $row->descripcion =='CT CONFIRMADA')
        {
          $ttg += $row->totalcoti;
        }
      } 
      $pdf->Cell(18,5,pinta(''),0,0,'C');
      $pdf->Cell(50,5,'',0,0,'R');
      $pdf->Cell(30,5,pinta(number_format($tc, 2, '.',' ')),$borde,1,'R');
      

      $pdf->Ln(5);
      $pdf->SetFont($font,'B',9);
      $pdf->Cell(0,5,pinta('RESUMEN ORIGEN ( PUNTO DE VENTA )'),0,1,'L');
      $pdf->Cell(18,5,pinta('Fecha'),$borde,0,'C');
      $pdf->Cell(20,5,pinta('Total Dia'),$borde,0,'R');
      $pdf->Cell(30,5,pinta('Apertura'),$borde,0,'R');
      $pdf->Cell(30,5,pinta('Total'),$borde,1,'R');

      $pdf->SetFont($font,'',8);
      $td=0;
      $ta=0;
      $tg=0;
     foreach($resumen->data as $row){
        
        $pdf->Cell(18,5,pinta($row->fecha),$borde,0,'C');
        $pdf->Cell(20,5,pinta(number_format($row->subtotal, 2, '.',' ')),$borde,0,'R');
        $pdf->Cell(30,5,pinta(number_format($row->apertura, 2, '.',' ')),$borde,0,'R');
        $pdf->Cell(30,5,pinta(number_format($row->total, 2, '.',' ')),$borde,1,'R');
        $td +=$row->subtotal;
        $ta +=$row->apertura;
        $tg +=$row->total;
        
      }   
      $ttg = $ttg + $tg;
      $pdf->Cell(18,5,pinta(''),0,0,'C');
      $pdf->Cell(20,5,pinta(number_format($td, 2, '.',' ')),$borde,0,'R');
      $pdf->Cell(30,5,pinta(number_format($ta, 2, '.',' ')),$borde,0,'R');
      $pdf->Cell(30,5,pinta(number_format($tg, 2, '.',' ')),$borde,1,'R');
      
      $pdf->SetFont($font,'B',9);
      $pdf->Ln();
      $pdf->Cell(0,5,pinta('TOTAL GENERAL '),0,1,'L');
      $pdf->Cell(38,5,pinta(number_format($ttg, 2, '.',' ')),$borde,1,'R');
      $pdf->output();
    }
    public function imprimirresumenventaticketeraAction() {

      $request    = new Phalcon\Http\Request();
      $u = array($request->get("usuario"));
      $det =  json_decode(Facturacion::resumenVentasTickera($u))->data;
      //$pdf = new FPDF($orientation='P',$unit='mm', array(45,350));
      $pdf = new jsPDF($orientation='P',$unit='mm', array(45,350));
      $pdf->AddPage();
      $pdf->SetFont('Arial','B',8);    //Letra Arial, negrita (Bold), tam. 20
      $textypos = 5;
      $pdf->setY(2);
      $pdf->setX(2);
      $pdf->Cell(5,$textypos,"Resumen Ventas");
      $pdf->SetFont('Arial','',5);    //Letra Arial, negrita (Bold), tam. 20
      $textypos+=6;
      $pdf->Ln(1);
      $pdf->setX(2);
      $pdf->Cell(5,$textypos,'Usuario : '. $u[0]);
      $textypos+=6;
      $pdf->setX(2);
      $pdf->Cell(5,$textypos,utf8_decode('Fecha Impresión : '). Date('d/m/Y'));
      $pdf->setX(28);
      $pdf->Cell(5,$textypos,'Hora : '. Date('h:i A'));
      $textypos+=6;
      $pdf->setX(2);
      $pdf->Cell(5,$textypos,'-------------------------------------------------------------------');
      $textypos+=6;
      $pdf->setX(2);
      $pdf->Cell(5,$textypos,'DESCRIPCION             CANT       P.UNI.      IMP.');
      $total =0;
      $off = $textypos+6;
      foreach($det as $pro){
        $pdf->setX(2);
        $pdf->Cell(35,$off,  strtoupper(substr($pro->producto, 0,35)) );
        $off+=5;
        $pdf->setX(15);
        $pdf->Cell(11,$off,number_format($pro->cantidad,2,".",",") ,0,0,"R");
        $pdf->setX(24);
        $pdf->Cell(11,$off,number_format($pro->precio,2,".",",") ,0,0,"R");
        $pdf->setX(32);
        $pdf->Cell(11,$off,number_format($pro->total,2,".",",") ,0,0,"R");
        $total += $pro->total;
        $off+=4;
      }
      $textypos=$off+6;
      $pdf->setX(2);
      $pdf->Cell(5,$textypos,"TOTAL: " );
      $pdf->setX(38);
      $pdf->Cell(5,$textypos,number_format($total,2,".",","),0,0,"R");
      $pdf->output();
    }



    public function imprimirfacturaelectronicaAction(){
      
       //PHPQRCode::png('PHP QR Code :)');
      
       

      // QRcode::png('PHP QR Code :)');
      // die();
      //#Ruta del Facturador Sunat
       $rutaFacturadorSunat = "C:\\facturador\sunat_archivos\sfs\FIRMA";
       $hp                  = new FuncionesHelpers();
       $request             = new Phalcon\Http\Request();
       $idfactura           = array($request->get("id"));
       $dataEmpresa         = json_decode(Empresa::listar())->data[0];
       $dataFacturacion     = json_decode(Facturacion::datosFacturacionCliente($idfactura))->data[0];
       $dataDetalle         = json_decode(Facturacion::detalleFacturacion($idfactura))->data;
       $dataTicketera       = json_decode(DocumentoVenta::ticketeras())->data[0];
       $totalGrabado        = 0;
       $igv                 = 0;
       $totalVenta          = 0;
       
       $file = simplexml_load_file($rutaFacturadorSunat.'\\'. $dataFacturacion->nombrearchivo. '.xml');
       $arrayData = $hp->xmlToArray($file);
       $umlExt    = $arrayData["Invoice"]["ext:UBLExtensions"]["ext:UBLExtension"]["ext:ExtensionContent"];
       $umlFirmas = $umlExt["ds:Signature"]["ds:SignedInfo"];
       $firmaDoc  = $umlFirmas["ds:Reference"]["ds:DigestValue"];


      // ========== FPDF ==========  //
      $pdf = new jsPDF('P','mm','A4');
      $wg = 120 ;//Ancho total
      $in = 5; //Interlineado
      $font = 'Arial';
      $tam = 12;

      $pdf->AddPage();
      $pdf->SetFont($font,'B',$tam);
      $pdf->Ln(1);
      $pdf->Image('../public/img/logo.jpg', 10, 5, 28);
      $pdf->setY(35);
      $pdf->MultiCell($wg,$in, pinta($dataEmpresa->razonsocial),0,'L');
      $tam = 8;
      $pdf->SetFont($font,'',$tam);
      $pdf->Ln(1);
      $pdf->MultiCell($wg,4, pinta(strtoupper($dataEmpresa->direccion)),0,'L');
      $pdf->MultiCell($wg,$in,"CORREO: ".pinta($dataEmpresa->correo),0,'L');
      $pdf->MultiCell($wg,$in,pinta("TELÉFONO: ".$dataEmpresa->telefono),0,'L');
      $fila = $pdf->getY();
      $pdf->setXY(130,20);
      $pdf->SetFont($font,'B',13);
      $pdf->MultiCell(0,10,'RUC :' . pinta(strtoupper($dataEmpresa->ruc)),'LRT','C');
    
      if(substr($dataFacturacion->documento,0,1)=='B'){
        $pdf->setXY(130,30);
        $pdf->MultiCell(0,10,'BOLETA ELECTRONICA ','LR','C');
        $pdf->setXY(130,40);
        $pdf->MultiCell(0,10,$dataFacturacion->seriedoc.'-'. str_pad( $dataFacturacion->numerodoc,8,'0',STR_PAD_LEFT),'LRB','C');
      }else{
            if( substr($dataFacturacion->documento,0,1)=='F')
            {
              $pdf->setXY(130,30);
              $pdf->MultiCell(0,10,'FACTURA ELECTRONICA ','LR','C');
              $pdf->setXY(130,40);
              $pdf->MultiCell(0,10,$dataFacturacion->seriedoc.'-'. str_pad( $dataFacturacion->numerodoc,8,'0',STR_PAD_LEFT),'LRB','C');
            }
      }
      $pdf->setY($fila+5);
      $tam = 9;
      $pdf->SetFont($font,'B',$tam);
      $pdf->Cell(23,$in,pinta("SEÑOR (es)   : "),0,0,'L');  
      $pdf->SetFont($font,'',$tam);
      $pdf->Cell(0,$in,pinta($dataFacturacion->nomcompleto),0,1,'L');
      $pdf->SetFont($font,'B',$tam);
      $pdf->Cell(23,$in,pinta("RUC Nro        : "),0,0,'L');  
      $pdf->SetFont($font,'',$tam);
      $pdf->Cell(0,$in,pinta($dataFacturacion->numrucper),0,1,'L');
      $pdf->SetFont($font,'B',$tam);
      $pdf->Cell(23,$in,pinta("Dirección      : "),0,0,'L');  
      $pdf->SetFont($font,'',$tam);
      $pdf->Cell(0,$in,pinta($dataFacturacion->domiciper),0,1,'L');
      $pdf->Ln();
      //print_r($dataFacturacion);die();
      $pdf->Cell(45,7,pinta('FECHA EMISIÓN'),1,0,'C');
      $pdf->Cell(45,7,pinta('FECHA VESIÓN'),1,0,'C');
      $pdf->Cell(45,7,pinta('CONDICIONES'),1,0,'C');
      $pdf->Cell(45,7,pinta('GUIA REMISIÓN'),1,1,'C');
      $pdf->Cell(45,7,pinta($dataFacturacion->fecha),1,0,'C');
      $pdf->Cell(45,7,pinta($dataFacturacion->fecha),1,0,'C');
      $pdf->Cell(45,7,pinta($dataFacturacion->formapago),1,0,'C');
      $pdf->Cell(45,7,pinta(''),1,1,'C');
      $pdf->Ln();
      $pdf->Cell(15,7,pinta('Cant.'),'B',0,'C');
      $pdf->Cell(20,7,pinta('Codigo'),'B',0,'C');
      $pdf->Cell(110,7,pinta('Descripcion'),'B',0,'L');
      $pdf->Cell(20,7,pinta('Pre.Unit.'),'B',0,'R');
      $pdf->Cell(0,7,pinta('Total'),'B',1,'R');
      $totalventa = 0;
      foreach ($dataDetalle as $row) {
        $pdf->Cell(15,5,pinta($row->cantidad),'',0,'C');
        $pdf->Cell(20,5,pinta($row->idprod),'',0,'C');
        $pdf->Cell(110,5,pinta($row->producto),'',0,'L');
        $pdf->Cell(20,5,pinta(number_format($row->precio,2, ".", ",")),'',0,'R');
        $pdf->Cell(0,5,pinta(number_format($row->total,2, ".", ",")),'',1,'R');
        $totalventa  += $row->total;
      }
      $tam = 9.5;
      if($dataFacturacion->incluyeigv == 1){
        $totalGrabado = $totalventa / 1.18 ;
        $igv          = $totalventa - ($totalventa / 1.18);
        $totalVenta   = $totalventa;
      }else{
        $totalGrabado = $totalventa  ;
        $igv          = $totalventa * 0.18;
        $totalVenta   = $totalventa + ($totalventa * 0.18);
      }
      $pdf->SetFont($font,'',$tam);
      $pdf->Cell(0,1,pinta(''),'B',1,'R');
      $pdf->Ln(1);
      $pdf->setX(140);
      $fila = $pdf->getY();
      $pdf->Cell(25,7,pinta('OP. GRAVADA'),0,0,'L');
      $pdf->Cell(10,7,pinta('S/.'),0,0,'R');
      $pdf->Cell(0,7,pinta(number_format($totalGrabado , 2, ".", ",")),0,1,'R');
      $pdf->setX(140);
      $pdf->Cell(25,7,pinta('I.G.V. 18%'),0,0,'L');
      $pdf->Cell(10,7,pinta('S/.'),0,0,'R');
      $pdf->Cell(0,7,pinta(number_format($igv , 2, ".", ",")),0,1,'R');
      $pdf->setX(140);
      $pdf->Cell(25,7,pinta('TOTAL VENTA'),0,0,'L');
      $pdf->Cell(10,7,pinta('S/.'),0,0,'R');
      $pdf->Cell(0,7,pinta(number_format($totalVenta , 2, ".", ",")),0,1,'R');
      $filaqr = $pdf->getY();
      $pdf->setY($fila);
      $pdf->MultiCell(130,7,pinta('SON : '.$dataFacturacion->totalletras),0,'L');
      $tam = 9;
      $pdf->Ln(7);
      $tempDir = '../public/img/';
      $codeContents = $dataFacturacion->codigogr; 
      $fileName = 'qr'.md5($codeContents).'.png'; 
      $pngAbsoluteFilePath = $tempDir.$fileName; 
      if (!file_exists($pngAbsoluteFilePath)) { 
          QRcode::png($codeContents, $pngAbsoluteFilePath,QR_ECLEVEL_M); 
          $pdf->Image($pngAbsoluteFilePath, 10, $filaqr + 2, 25,25);
          unlink($pngAbsoluteFilePath);
      }else{
           unlink($pngAbsoluteFilePath);
      }
      $pdf->setY($filaqr + 30);
      $pdf->Cell(0,6,pinta('Ha sido aceptada con el Hash :  ' . $firmaDoc));
      $pdf->AutoPrint();
      $pdf->Output();
    }
  
}
