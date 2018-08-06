<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Empresa extends \Phalcon\Mvc\Model
{
    public static function listar()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('public','sp_empresa_listar',$param);
        return $sql;
    }
    public static function tiendas()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('public','sp_tienda_listar',$param);
        return $sql;
    }
    public static function actualizar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('public','sp_empresa_actualizar',$param);
        return $sql;
    }
    public static function tiendaEliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('public','sp_tienda_eliminar',$param);
        return $sql;
    }
    public static function tiendaListarDocumentosVentaAsignados($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('public','sp_tienda_listar_documentos_asignados',$param);
        return $sql;
    }
    public static function tiendaListarDocumentosVenta()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     = $obj->executarJson('ventas','sp_tienda_listar_documento_venta',$param);
        return $sql;
    }

    public static function tiendaListarTicketerasAsignadas($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('public','sp_tienda_listar_ticketera_asignadas',$param);
        return $sql;
    }
    public static function tiendaListarTicketeras()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     = $obj->executarJson('ventas','sp_tienda_listar_ticketera',$param);
        return $sql;
    }

    public static function tiendaAsignarDocumentoVenta($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('public','sp_tienda_asignar_documento_venta',$param);
        return $sql;
    }
    public static function tiendaAsignarTicketera($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('public','sp_tienda_asignar_ticketeras',$param);
        return $sql;
    }
    public static function tiendaEliminarTicketera($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('public','sp_tienda_ticketera_eliminar',$param);
        return $sql;
    }
    public static function tiendaEliminarDocumentoVenta($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('public','sp_tienda_serie_venta_eliminar',$param);
        return $sql;
    }




}
