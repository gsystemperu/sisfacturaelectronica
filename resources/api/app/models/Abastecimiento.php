<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Abastecimiento extends \Phalcon\Mvc\Model
{

    public static function listarPorFechas($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('inventario','sp_abastecimiento_listar',$param);
        return $sql;
    }
    public static function listarPorFechaProveedor($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('inventario','sp_abastecimiento_listar',$param);
        return $sql;
    }

    public static function actualizar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_abastecimiento_actualizar',$param);
        return $sql;
    }
    
    public static function eliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_abastecimiento_eliminar',$param);
        return $sql;
    }

     public static function buscarDetalle($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('inventario','sp_abastecimiento_buscar_detalle',$param);
        return $sql;
    }
}
