<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Medidas extends \Phalcon\Mvc\Model
{
    public static function Listado()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('inventario','sp_medidas_listar',$parametros);
        return $sql;
    }

    public static function actualizar($data)
    {   
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_medidas_actualizar',$param);
        return $sql;
    }

    public static function eliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_medidas_eliminar',$param);
        return $sql;
    }



}
