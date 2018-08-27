<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Facturacion extends \Phalcon\Mvc\Model
{

    public static function actualizar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('ventas','sp_facturacion_agregar',$param);
        return $sql;
    }
    public static function actualizarPagoAcuenta($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('ventas','sp_factura_pago_acuenta',$param);
        return $sql;
    }
    public static function buscarPagoAcuenta($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('ventas','sp_pagos_acuenta_buscar',$param);
        return $sql;
    }

    public static function guardarPuntoVentaPago($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('ventas','sp_facturacion_punto_venta_agregar_bk',$param);
        return $sql;
    }
    public static function buscarVentasPdv($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('ventas','sp_facturacion_punto_venta_listar',$param);
        return $sql;
    }
    public static function buscarVentasCliente($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('ventas','sp_cliente_facturacion_buscar',$param);
        return $sql;
    }

    public static function anular($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('ventas','sp_facturacion_anular',$param);
        return $sql;
    }

    public static function datosFacturacionCliente($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('ventas','sp_facturacion_datos_cliente',$param);
        return $sql;
    }
    public static function detalleFacturacion($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('ventas','sp_facturacion_detalle_vista',$param);
        return $sql;
    }
    public static function detalleFacturacionImpresion($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('ventas','sp_facturacion_detalle_vista_impresion',$param);
        return $sql;
    }

    public static function listarMoneda($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('contabilidad','sp_monedas_lista',$param);
        return $sql;
    }
    public static function listarMetodosPago()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('ventas','sp_metodo_pago_listar',$param);
        return $sql;
    }  
    public static function resumenVentas($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('ventas','sp_ventas_resumen',$param);
        return $sql;
    }  
    public static function resumenVentasCotizacion($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('ventas','sp_ventas_resumen_cotizacion',$param);
        return $sql;
    }  
    public static function cerrarCaja($data)
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executar('ventas','sp_facturacion_cierre_caja',$param);
        return $sql;
    }
    public static function resumenVentasTickera($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('ventas','SP_RESUMEN_VENTAS_TICKETERA',$param);
        return $sql;
    } 
    public static function actualizarEstadosFacturador($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarQuery('SELECT * FROM ventas.sp_facturacion_actualizar_estado_facturador ('.$param.')');
        return $sql;
    } 
    public static function volverGenerarDataFacturador($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('catalogos','sp_generar_cab_y_det_facturador_version_1_1',$param);
        return $sql;
    } 
    public static function tipoNotaCredito($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('catalogos','sp_tipo_nota_credito',$param);
        return $sql;
    } 
    public static function actualizarNota($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('ventas','sp_facturacion_agregar_nota',$param);
        return $sql;
    }
    
    

     
    


}
