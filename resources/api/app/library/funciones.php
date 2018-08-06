<?php
function pintarApostrofe($cadena)
{
	return str_replace("'", "\'", $cadena);
}

function dia($pDia)
{	
	if(strtolower($pDia)=='monday') return 'lunes';
	if(strtolower($pDia)=='tuesday') return 'martes';
	if(strtolower($pDia)=='wednesday') return 'mi&eacute;rcoles';
	if(strtolower($pDia)=='thursday') return 'jueves';
	if(strtolower($pDia)=='friday') return 'viernes';
	if(strtolower($pDia)=='saturday') return 's�bado';
	if(strtolower($pDia)=='sunday') return 'domingo';
}

function horam($pHora)
{
	if( $pHora=='' ) return '';
	$aHora=array('12','01','02','03','04','05','06','07','08','09','10','11');
	if(substr($pHora,0,2) > 11) return $aHora[substr($pHora,0,2)-12].':'.substr($pHora,3,2).' p.m.';
	return substr($pHora,0,5).' a.m.';
}

function nombremes($mes){
	$nmes="";
	switch ($mes) {
		case 1:
			$nmes="Enero";
			break;
		case 2:
			$nmes="Febrero";
			break;
		case 3:
			$nmes="Marzo";
			break;
		case 4:
			$nmes="Abril";
			break;
		case 5:
			$nmes="Mayo";
			break;
		case 6:
			$nmes="Junio";
			break;
		case 7:
			$nmes="Julio";
			break;																		
		case 8:
			$nmes="Agosto";
			break;
		case 9:
			$nmes="Setiembre";
			break;
		case 10:
			$nmes="Octubre";
			break;
		case 11:
			$nmes="Noviembre";
			break;
		case 12:
			$nmes="Diciembre";
			break;															
	}
	return $nmes;
}

// Function : Verifica que un usuario tenga permiso a una opcion de la aplicacion
// Owner:	Herles
/*
function validaopcion($opcion){
	$s_idusuario= $_SESSION["idusuario"];
	if($s_idusuario==""){
		senderror1("No tiene una sesi�n activa, Debe de Ingresar nuevamente al sistema");
		//echo "No tiene una sesi�n activa, Debe de Ingresar nuevamente al sistema";
	}
	$herror="";
	$sqlconnect1=@mssql_connect("data3","sa","");
	if(!($herror=="")){
		senderror1("No se pudo conectar a la base de datos SQLServer<br>".$herror);
		//echo "No se pudo conectar a la base de datos SQLServer<br>".$herror;
	}
	$sqldb=mssql_select_db("web_usuario",$sqlconnect1);
	$sql_query="exec wb_opcion_valida ".$s_idusuario.",".$opcion;
	$herror="";
	$sql_result=mssql_query($sql_query);
	if(!($herror=="")){
		senderror1("Error al ejecutar el procedimiento almacenado<br>".$herror);
		//echo "Error al ejecutar el procedimiento almacenado<br>".$herror;
	}
	$sql_filas = mssql_num_rows($sql_result);
	if($sql_filas>0){
	}else{
  	senderror1("No tiene permiso para realizar esta Tarea.");
  	//echo "No tiene permiso para realizar esta Tarea.";
	}
}

function senderror1($error){
	echo "<div align=center class=msgerror>$error<br><input type=button class=msgerrorbtn value=Cerrar onclick=javascript:window.close()></div>";
	exit;
}
*/

// Funcion de JUAN JAIMES
function cadena_vacio_a_nulo($objeto) {
	if (!empty($objeto)) {
		$retorna = $objeto;
		$retorna = "'".str_replace("'", "''", $retorna)."'";
		$retorna = stripslashes($retorna);
		return $retorna;
	}
	return "NULL";
}

// Funcion de JUAN JAIMES
function numero_vacio_a_nulo($objeto) {
	if (!empty($objeto) && trim($objeto)!="") {
		return $objeto;
	}
	return "NULL"; 
}

// Funcion de JUAN JAIMES
function pinta($objeto){
	//return utf8_encode($objeto);
	return utf8_decode($objeto);
	//return $objeto;
}

// Funcion de JUAN JAIMES
function pinta_pdf($objeto){
	//return utf8_encode($objeto);
	return utf8_decode($objeto);
	//return $objeto;
}

// Funcion de JUAN JAIMES
function utf8_code($objeto){
	//return utf8_encode($objeto);
	return utf8_decode($objeto);
}

// Funcion de JUAN JAIMES
function guarda($objeto){
	//return utf8_decode($objeto);
	return $objeto;
}

function ceros_izq($valor, $longitud){
	$retorna_valor = str_repeat("0", $longitud - strlen(trim($valor))) . trim($valor);
	return $retorna_valor;
}

// Funcion de JUAN JAIMES
function retorna_algo($expresion, $blancos_derecha=''){
	$retorna = empty($expresion) || trim($expresion) == "" ? "&nbsp;" : $expresion;

	if ($blancos_derecha=="S") {
		$expresion_result = "";
		for ($i=0; $i<=strlen($retorna); $i++) {
			switch (substr($retorna,$i,1))
			{
				case " ":
					$expresion_result = $expresion_result."&nbsp;";
					break;
					
				default:
					$expresion_result = $expresion_result.substr($retorna,$i,1);
			}
		}
		return $expresion_result;
	}
	
	return $retorna;
}

// Funcion de JUAN JAIMES
function retorna_sin_espacio($objeto) {
	if (!empty($objeto) && trim($objeto)!="") {
		return $objeto;
	}
	return "";
}
// Funcion de JUAN JAIMES
function retorna_sin_cero($objeto) {
	if (!empty($objeto) && trim($objeto)!="" && trim($objeto)!="0") {
		return $objeto;
	}
	return "";
}

//Funcion de JUAN JAIMES

//Genera Boton
function button($id, $clase, $imagen, $texto){
	echo "<button id='$id' class='$clase'>";
	echo "<table border='0' cellspacing='0' cellpadding='0'>";
	echo "	<tr>";
	echo "		<td><img src='$imagen' /></td>";
	echo "		<td nowrap='nowrap'>$texto</td>";
	echo "	</tr>";
	echo "</table>";
	echo "</button>";
}

function button_img_size($id, $clase, $imagen, $texto,$width,$height){
	echo "<button id='$id' class='$clase'>";
	echo "<table border='0' cellspacing='0' cellpadding='0'>";
	echo "	<tr>";
	echo "		<td><img src='$imagen' height='$height' width='$width' /></td>";
	echo "		<td nowrap='nowrap'>$texto</td>";
	echo "	</tr>";
	echo "</table>";
	echo "</button>";
}

// Genera boton horizontal c/s imagen
function boton_horizontal($id, $texto="", $imagen="", $largo, $ancho="28", $disabled=true, $title=""){
	$habilitado = "";
	if( $disabled == false ){
		$habilitado = " disabled='disabled'";
		$imagen = substr($imagen, 0, strlen($imagen)-4)."_disabled.gif";
	}
	if( $title != "" ){
		$title = " title='".$title."'";
	}
	echo "<button id='".$id."' name='".$id."' style='width:".$largo."px; height:".$ancho."px;'".$habilitado.$title.">";
	echo "<table border='0' cellspacing='0' cellpadding='0' align='center'><tr>";
	if ($imagen != ""){
		echo "<td style='padding-right:4px;'><img src='".$imagen."' /></td>";
	}
	if ($texto != ""){
		echo "<td>".$texto."</td>";
	}
	echo "</tr></table>";
	echo "</button>";
}

// Funcion de JUAN JAIMES
// Genera boton vertical c/s imagen
function boton_vertical($id, $texto="", $imagen="", $largo, $ancho="50", $disabled=true){
	$habilitado = "";
	if( $disabled == false ){
		$habilitado = " disabled='disabled'";
		$imagen = substr($imagen, 0, strlen($imagen)-4)."_disabled.gif";
	}
	echo "<button id='".$id."' name='".$id."' style='width:".$largo."px; height:".$ancho."px;'".$habilitado.">";
	echo "<table border='0' cellspacing='0' cellpadding='0' align='center'>";
	if ($imagen != ""){
		echo "<tr><td align='center'><img src='".$imagen."' /></td></tr>";
	}
	if ($texto != ""){
		echo "<tr><td align='center'>".$texto."</td></tr>";
	}
	echo "</table>";
	echo "</button>";
}

// Funcion de JUAN JAIMES
// Genera opcion menu vista vertical
function opcion_menu_vista_vertical($id, $texto="", $imagen="", $menu=false){
	echo "<div id='".$id."' class='menu_vista_opcion'><table border='0' cellspacing='0' cellpadding='0'>";
	echo "<tr><td class='menu_vista_opcion_td_imagen' align='center'><img src='".$imagen."' border='0' /></td></tr>";
	if( $menu == false ){
		echo "<tr><td class='menu_vista_opcion_td_texto' valign='top'>".$texto."</td></tr>";
	} else {
		echo "<tr><td class='menu_vista_opcion_td_texto' valign='top'>".$texto."<br /><img src='http://".$_SERVER['SERVER_NAME']."/sig/images/iconos/ico_flecha_abajo.gif' border='0' align='center' /></td></tr>";
	}
	echo "</table></div>";
}

//Function de JUAN JAIMES
function query($sQuery, $hDb_conn)
{
    if(!$rQuery = @mssql_query($sQuery, $hDb_conn))
    {
        $sMssql_get_last_message = mssql_get_last_message();
        $sQuery_added  = "BEGIN TRY\n";
        $sQuery_added .= "\t".$sQuery."\n";
        $sQuery_added .= "END TRY\n";
        $sQuery_added .= "BEGIN CATCH\n";
        $sQuery_added .= "\tSELECT 'Error: '  + ERROR_MESSAGE()\n";
        $sQuery_added .= "END CATCH";
        $rRun2= @mssql_query($sQuery_added, $hDb_conn);
        $aReturn = @mssql_fetch_assoc($rRun2);
        if(empty($aReturn))
        {
            echo "<strong>MSSQL retorna:</strong> ".$sMssql_get_last_message."<br><strong>Comando ejecutado:</strong> ".nl2br($sQuery);
        }
        elseif(isset($aReturn['computed']))
        {
            echo "<strong>MSSQL retorna:</strong> ".$aReturn["computed"]."<br><strong>Comando ejecutado:</strong> ".nl2br($sQuery);
        }
        return false;
    }
    else
    {
        return $rQuery;
    }
}

function v_opc_mnu($opcion,$iduser)
{
	$conectData3Opciones = mssql_pconnect("respaldo","sa","magicsigm111111");
	$db1 = mssql_select_db('web_usuario');
	$sql_opciones = "SELECT * FROM web_usuario_grupo a
					 left join web_grupo b on a.idgrupo=b.idgrupo
					 left join web_grupo_opcion c on b.idgrupo=c.idgrupo
					 left join web_opcion d on c.idopcion=d.idopcion
					 where a.idusuario='".$iduser."' AND d.codigo='".$opcion."'";			
	$rs_opciones = mssql_query($sql_opciones, $conectData3Opciones);
	if(!$rs_opciones)
	{ return $mensaje="NO SE PUEDE EXTRAER LA OPCIONES DEL MENU";}
	else
	{
		$num_registros = mssql_num_rows($rs_opciones);
		if($num_registros != 0)
		{return $variable = 1;}
		else
		{return $variable = 2;}
	}
	mssql_close($conect02);
}

function v_permite_opcion($opcion, $idsistema, $usuario)
{
	require_once("config.php");
	require_once("clases_php/db_sql.class.php"); 
	$rstUsuario = new EasySQL($g_sql_data3_tipoBD, $g_sql_data3_server, $g_sql_data3_username, $g_sql_data3_password, $g_sql_data3_db_usuarios);
	$rstUsuario->select("SELECT idusuario FROM web_usuario WHERE login='".$usuario."'");
	$Usuario = $rstUsuario->fetchArray();
	
	$sql_opciones = "SELECT * FROM web_usuario_grupo a
					 left join web_grupo b on a.idgrupo=b.idgrupo
					 left join web_grupo_opcion c on b.idgrupo=c.idgrupo
					 left join web_opcion d on c.idopcion=d.idopcion
					 where a.idusuario=".$Usuario["idusuario"]." AND d.idsistema=".$idsistema." AND d.codigo='".$opcion."'";			

	$rstAcceso = new EasySQL($g_sql_data3_tipoBD, $g_sql_data3_server, $g_sql_data3_username, $g_sql_data3_password, $g_sql_data3_db_usuarios);
	$rstAcceso->select($sql_opciones);
	if( $rstAcceso->total_rows > 0 ){
		return true;
	} else{
		return false;
	}
}

function traer_fecha($menos_dias, $g_sql_tipoBD, $g_sql_server, $g_sql_username, $g_sql_password, $g_sql_database) {
	$Fecha = new EasySQL($g_sql_tipoBD, $g_sql_server, $g_sql_username, $g_sql_password, $g_sql_database); 
	$Fecha->select("SELECT CONVERT(VARCHAR, GETDATE() - ".$menos_dias.", 103) AS FECHA"); 
	$Fec = $Fecha->fetchArray();
	return $Fec["FECHA"];
}

function repetir($pCadena, $pRepetir) {
	$cRetorna = "";
	$nContador = 0;
	while ( ++$nContador <= $pRepetir ) $cRetorna .= $pCadena;
	return $cRetorna;
}


function cadena_sql($pDbsql, $pProcedAlmacenado, $pParametros, $pEsquema="", $pRetorna="")
{
	switch($pDbsql)
	{		
		case "SQL":
			$sql = "exec ".$pProcedAlmacenado." ".$pParametros;
			break;
			
		case "PostGreSQL":
			if( $pEsquema != "" ) $pEsquema = $pEsquema . ".";
			if( $pRetorna != "" ) $pRetorna = " (" . $pRetorna . ")";
			$sql = "select * from ".$pEsquema.$pProcedAlmacenado." (".$pParametros.")";
			break;
	}
	return $sql; 	
}



function centimos()
{
	global $importe_parcial;
 
	$importe_parcial = number_format($importe_parcial, 2, ".", "") * 100;
	
	if ($importe_parcial > 0)
		$num_letra = " con  ". $importe_parcial.' / 100 SOLES';  //.decena_centimos($importe_parcial);
	else
		$num_letra = " con  ". '00 / 100 SOLES';
 
	return $num_letra;
}
 
function unidad_centimos($numero)
{
	switch ($numero)
	{
		case 9:
		{
			$num_letra = "nueve céntimos";
			break;
		}
		case 8:
		{
			$num_letra = "ocho céntimos";
			break;
		}
		case 7:
		{
			$num_letra = "siete céntimos";
			break;
		}
		case 6:
		{
			$num_letra = "seis céntimos";
			break;
		}
		case 5:
		{
			$num_letra = "cinco céntimos";
			break;
		}
		case 4:
		{
			$num_letra = "cuatro céntimos";
			break;
		}
		case 3:
		{
			$num_letra = "tres céntimos";
			break;
		}
		case 2:
		{
			$num_letra = "dos céntimos";
			break;
		}
		case 1:
		{
			$num_letra = "un céntimo";
			break;
		}
	}
	return $num_letra;
}
 
function decena_centimos($numero)
{
	if ($numero >= 10)
	{
		if ($numero >= 90 && $numero <= 99)
		{
			  if ($numero == 90)
				  return "noventa céntimos";
			  else if ($numero == 91)
				  return "noventa y un céntimos";
			  else
				  return "noventa y ".unidad_centimos($numero - 90);
		}
		if ($numero >= 80 && $numero <= 89)
		{
			if ($numero == 80)
				return "ochenta céntimos";
			else if ($numero == 81)
				return "ochenta y un céntimos";
			else
				return "ochenta y ".unidad_centimos($numero - 80);
		}
		if ($numero >= 70 && $numero <= 79)
		{
			if ($numero == 70)
				return "setenta céntimos";
			else if ($numero == 71)
				return "setenta y un céntimos";
			else
				return "setenta y ".unidad_centimos($numero - 70);
		}
		if ($numero >= 60 && $numero <= 69)
		{
			if ($numero == 60)
				return "sesenta céntimos";
			else if ($numero == 61)
				return "sesenta y un céntimos";
			else
				return "sesenta y ".unidad_centimos($numero - 60);
		}
		if ($numero >= 50 && $numero <= 59)
		{
			if ($numero == 50)
				return "cincuenta céntimos";
			else if ($numero == 51)
				return "cincuenta y un céntimos";
			else
				return "cincuenta y ".unidad_centimos($numero - 50);
		}
		if ($numero >= 40 && $numero <= 49)
		{
			if ($numero == 40)
				return "cuarenta céntimos";
			else if ($numero == 41)
				return "cuarenta y un céntimos";
			else
				return "cuarenta y ".unidad_centimos($numero - 40);
		}
		if ($numero >= 30 && $numero <= 39)
		{
			if ($numero == 30)
				return "treinta céntimos";
			else if ($numero == 91)
				return "treinta y un céntimos";
			else
				return "treinta y ".unidad_centimos($numero - 30);
		}
		if ($numero >= 20 && $numero <= 29)
		{
			if ($numero == 20)
				return "veinte céntimos";
			else if ($numero == 21)
				return "veintiun céntimos";
			else
				return "veinti".unidad_centimos($numero - 20);
		}
		if ($numero >= 10 && $numero <= 19)
		{
			if ($numero == 10)
				return "diez céntimos";
			else if ($numero == 11)
				return "once céntimos";
			else if ($numero == 11)
				return "doce céntimos";
			else if ($numero == 11)
				return "trece céntimos";
			else if ($numero == 11)
				return "catorce céntimos";
			else if ($numero == 11)
				return "quince céntimos";
			else if ($numero == 11)
				return "dieciseis céntimos";
			else if ($numero == 11)
				return "diecisiete céntimos";
			else if ($numero == 11)
				return "dieciocho céntimos";
			else if ($numero == 11)
				return "diecinueve céntimos";
		}
	}
	else
		return unidad_centimos($numero);
}
 
function unidad($numero)
{
	switch ($numero)
	{
		case 9:
		{
			$num = "nueve";
			break;
		}
		case 8:
		{
			$num = "ocho";
			break;
		}
		case 7:
		{
			$num = "siete";
			break;
		}
		case 6:
		{
			$num = "seis";
			break;
		}
		case 5:
		{
			$num = "cinco";
			break;
		}
		case 4:
		{
			$num = "cuatro";
			break;
		}
		case 3:
		{
			$num = "tres";
			break;
		}
		case 2:
		{
			$num = "dos";
			break;
		}
		case 1:
		{
			$num = "uno";
			break;
		}
	}
	return $num;
}
 
function decena($numero)
{
	if ($numero >= 90 && $numero <= 99)
	{
		$num_letra = "noventa ";
 
		if ($numero > 90)
			$num_letra = $num_letra."y ".unidad($numero - 90);
	}
	else if ($numero >= 80 && $numero <= 89)
	{
		$num_letra = "ochenta ";
 
		if ($numero > 80)
			$num_letra = $num_letra."y ".unidad($numero - 80);
	}
	else if ($numero >= 70 && $numero <= 79)
	{
			$num_letra = "setenta ";
 
		if ($numero > 70)
			$num_letra = $num_letra."y ".unidad($numero - 70);
	}
	else if ($numero >= 60 && $numero <= 69)
	{
		$num_letra = "sesenta ";
 
		if ($numero > 60)
			$num_letra = $num_letra."y ".unidad($numero - 60);
	}
	else if ($numero >= 50 && $numero <= 59)
	{
		$num_letra = "cincuenta ";
 
		if ($numero > 50)
			$num_letra = $num_letra."y ".unidad($numero - 50);
	}
	else if ($numero >= 40 && $numero <= 49)
	{
		$num_letra = "cuarenta ";
 
		if ($numero > 40)
			$num_letra = $num_letra."y ".unidad($numero - 40);
	}
	else if ($numero >= 30 && $numero <= 39)
	{
		$num_letra = "treinta ";
 
		if ($numero > 30)
			$num_letra = $num_letra."y ".unidad($numero - 30);
	}
	else if ($numero >= 20 && $numero <= 29)
	{
		if ($numero == 20)
			$num_letra = "veinte ";
		else
			$num_letra = "veinti".unidad($numero - 20);
	}
	else if ($numero >= 10 && $numero <= 19)
	{
		
		switch ($numero)
		{
			case 10:
			{
				$num_letra = "diez ";
				break;
			}
			case 11:
			{
				$num_letra = "once ";
				break;
			}
			case 12:
			{
				$num_letra = "doce ";
				break;
			}
			case 13:
			{
				$num_letra = "trece ";
				break;
			}
			case 14:
			{
				$num_letra = "catorce ";
				break;
			}
			case 15:
			{
				$num_letra = "quince ";
				break;
			}
			case 16:
			{
				$num_letra = "dieciseis ";
				break;
			}
			case 17:
			{
				$num_letra = "diecisiete ";
				break;
			}
			case 18:
			{
				$num_letra = "dieciocho ";
				break;
			}
			case 19:
			{
				$num_letra = "diecinueve ";
				break;
			}
		}
	}
	else
		$num_letra = unidad($numero);
 
	return $num_letra;
}
 
function centena($numero)
{
	if ($numero >= 100)
	{
		if ($numero >= 900 & $numero <= 999)
		{
			$num_letra = "novecientos ";
 
			if ($numero > 900)
				$num_letra = $num_letra.decena($numero - 900);
		}
		else if ($numero >= 800 && $numero <= 899)
		{
			$num_letra = "ochocientos ";
 
			if ($numero > 800)
				$num_letra = $num_letra.decena($numero - 800);
		}
		else if ($numero >= 700 && $numero <= 799)
		{
			$num_letra = "setecientos ";
 
			if ($numero > 700)
				$num_letra = $num_letra.decena($numero - 700);
		}
		else if ($numero >= 600 && $numero <= 699)
		{
			$num_letra = "seiscientos ";
 
			if ($numero > 600)
				$num_letra = $num_letra.decena($numero - 600);
		}
		else if ($numero >= 500 && $numero <= 599)
		{
			$num_letra = "quinientos ";
 
			if ($numero > 500)
				$num_letra = $num_letra.decena($numero - 500);
		}
		else if ($numero >= 400 && $numero <= 499)
		{
			$num_letra = "cuatrocientos ";
 
			if ($numero > 400)
				$num_letra = $num_letra.decena($numero - 400);
		}
		else if ($numero >= 300 && $numero <= 399)
		{
			$num_letra = "trescientos ";
 
			if ($numero > 300)
				$num_letra = $num_letra.decena($numero - 300);
		}
		else if ($numero >= 200 && $numero <= 299)
		{
			$num_letra = "doscientos ";
 
			if ($numero > 200)
				$num_letra = $num_letra.decena($numero - 200);
		}
		else if ($numero >= 100 && $numero <= 199)
		{
			if ($numero == 100)
				$num_letra = "cien ";
			else
				$num_letra = "ciento ".decena($numero - 100);
		}
	}
	else
		$num_letra = decena($numero);
 
	return $num_letra;
}
 
function cien()
{
	global $importe_parcial;
	
	$parcial = 0; $car = 0;
 
	while (substr($importe_parcial, 0, 1) == 0)
		$importe_parcial = substr($importe_parcial, 1, strlen($importe_parcial) - 1);
 
	if ($importe_parcial >= 1 && $importe_parcial <= 9.99)
		$car = 1;
	else if ($importe_parcial >= 10 && $importe_parcial <= 99.99)
		$car = 2;
	else if ($importe_parcial >= 100 && $importe_parcial <= 999.99)
		$car = 3;
	
	$parcial = substr($importe_parcial, 0, $car);
	$importe_parcial = substr($importe_parcial, $car);
 
	$num_letra = centena($parcial).centimos();
 
	return $num_letra;
}
 
function cien_mil()
{
	global $importe_parcial;
 
	$parcial = 0; $car = 0;
 
	while (substr($importe_parcial, 0, 1) == 0)
		$importe_parcial = substr($importe_parcial, 1, strlen($importe_parcial) - 1);
 
	if ($importe_parcial >= 1000 && $importe_parcial <= 9999.99)
		$car = 1;
	else if ($importe_parcial >= 10000 && $importe_parcial <= 99999.99)
		$car = 2;
	else if ($importe_parcial >= 100000 && $importe_parcial <= 999999.99)
		$car = 3;
 
	$parcial = substr($importe_parcial, 0, $car);
	$importe_parcial = substr($importe_parcial, $car);
 
	if ($parcial > 0)
	{
		if ($parcial == 1)
			$num_letra = "mil ";
		else
			$num_letra = centena($parcial)." mil ";
	}
 
	return $num_letra;
}
 
 
function millon()
{
	global $importe_parcial;
 
	$parcial = 0; $car = 0;
 
	while (substr($importe_parcial, 0, 1) == 0)
		$importe_parcial = substr($importe_parcial, 1, strlen($importe_parcial) - 1);
 
	if ($importe_parcial >= 1000000 && $importe_parcial <= 9999999.99)
		$car = 1;
	else if ($importe_parcial >= 10000000 && $importe_parcial <= 99999999.99)
		$car = 2;
	else if ($importe_parcial >= 100000000 && $importe_parcial <= 999999999.99)
		$car = 3;
 
	$parcial = substr($importe_parcial, 0, $car);
	$importe_parcial = substr($importe_parcial, $car);
 
	if ($parcial == 1)
		$num_letras = "un millón ";
	else
		$num_letras = centena($parcial)." millones ";
 
	return $num_letras;
}
 
function convertir_a_letras($numero)
{
	global $importe_parcial;
	//39
	$importe_parcial = $numero;
	
	if ($numero < 1000000000)
	{
		if ($numero >= 1000000 && $numero <= 999999999.99)
			$num_letras = millon().cien_mil().cien();
		else if ($numero >= 1000 && $numero <= 999999.99)
			$num_letras = cien_mil().cien();
		else if ($numero >= 1 && $numero <= 999.99)
			$num_letras = cien();
		else if ($numero >= 0.01 && $numero <= 0.99)
		{
			//if ($numero == 0.01)
			//	$num_letras = "un céntimo";
			//else
				$num_letras = convertir_a_letras(($numero * 100)."/100")." soles";
		}
	}
	return $num_letras;
}

?>
