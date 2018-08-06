<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Marca extends \Phalcon\Mvc\Model
{
    
    public static function Listado()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('inventario','sp_marca_listar',$parametros);
        return $sql;
    }
    
    public static function actualizar($data)
    {   
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_marca_actualizar',$param);
        return $sql;
    }

    public static function eliminar($data)
    {   
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_marca_eliminar',$param);
        return $sql;
    }

 

}