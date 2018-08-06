<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Banco extends \Phalcon\Mvc\Model
{
    public static function listado()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('public','sp_banco_listar',$param);
        return $sql;
    }

    public static function actualizar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('public','sp_banco_actualizar',$param);
        return $sql;
    }
    
    public static function eliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('public','sp_banco_eliminar',$param);
        return $sql;
    }


}
