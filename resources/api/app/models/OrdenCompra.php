<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class OrdenCompra extends \Phalcon\Mvc\Model
{

    public static function listarPorFechas($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('compras','sp_orden_compra_listar',$param);
        return $sql;
    }
    public static function listarPorFechaProveedor($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('compras','sp_orden_compra_listar',$param);
        return $sql;
    }

    public static function actualizar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('compras','sp_orden_compra_actualizar_2',$param);
        return $sql;
    }

    public static function eliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('compras','sp_orden_compra_eliminar',$param);
        return $sql;
    }

    public static function confirmar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('compras','sp_orden_compra_confirmar',$param);
        return $sql;
    }

    /*
        @ Orden de Compra confirmadas
    */
     public static function listarPorFechasConfirmadas($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        //print_r($data);die();
        $sql     =  $obj->executarJson('compras','sp_orden_compra_confirmada_listar',$param);
        return $sql;
    }
    public static function listarPorFechaProveedorConfirmadas($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('compras','sp_orden_compra_confirmada_listar',$param);
        return $sql;
    }

    public static function listarDetalleOrdenCompraConfirmada($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('compras','sp_orden_compra_confirmada_detalle',$param);
        return $sql;
    }

    public static function buscarOrdenCompraDetalle($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('compras','sp_orden_compra_detalle',$param);
        return $sql;
    }
    public static function ordenCompraAnular($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('compras','sp_orden_compra_anular',$param);
        return $sql;
    }
    public static function ordenCompraAnularConfirmado($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('compras','sp_orden_compra_anular_confirmado',$param);
        return $sql;
    }

    public static function ingresarPagoAcuenta($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('compras','sp_orden_compra_pago_acuenta',$param);
        return $sql;
    }
    public static function buscarPagoAcuenta($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('compras','sp_pagos_acuenta_buscar',$param);
        return $sql;
    }
    public static function listarTipoCompra($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('compras','sp_tipo_compra_listar',$param);
        return $sql;
    }
    
    public static function listarDetalleDeOrdenPorIngresos($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('compras','sp_orden_compra_confirmada_detalle_vista',$param);
        return $sql;
    }
    public static function ordenCompraBuscarId($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('compras','sp_orden_compra_id',$param);
        return $sql;
    }
    public static function ordenCompraBuscarIdDetalle($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('compras','sp_orden_compra_detalle_rpt',$param);
        return $sql;
    }
    
    

    
    

}
