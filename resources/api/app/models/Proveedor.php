<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Proveedor extends \Phalcon\Mvc\Model
{
    public static function listado()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('inventario','sp_proveedor_listar',$param);
        return $sql;
    }
    public static function buscarProveedor($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('inventario','sp_proveedor_listar',$param);
        return $sql;
    }
    public static function actualizar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_proveedor_actualizar',$param);
        return $sql;
    }
    public static function eliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_proveedor_eliminar',$param);
        return $sql;
    }
    

}
