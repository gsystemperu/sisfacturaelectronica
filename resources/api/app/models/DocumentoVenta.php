<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class DocumentoVenta extends \Phalcon\Mvc\Model
{
    public static function Listado()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('ventas','sp_documento_venta_listar',$param);
        return $sql;
    }

    public static function series()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('ventas','sp_series_venta_listar',$param);
        return $sql;
    }
    public static function serieEliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('ventas','sp_serie_venta_eliminar',$param);
        return $sql;
    }
    public static function ticketeras()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('ventas','sp_ticketera_venta_listar',$param);
        return $sql;
    }
    public static function ticketeraEliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('ventas','sp_ticketera_eliminar',$param);
        return $sql;
    }

    



}
