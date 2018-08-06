<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Persona extends \Phalcon\Mvc\Model
{
    public static function Listar()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('ventas','sp_persona_listar',$param);
        return $sql;
    }

     public static function Buscar($idpersona)
    {
        $obj     = new SQLHelpers();
        $param   = array($idpersona);
        $sql     =  $obj->executarJson('ventas','sp_persona_listar',$param);
        return $sql;
    }

    public static function BuscarCuentasBancarias($idpersona)
    {
        $obj     = new SQLHelpers();
        $param   = array($idpersona);
        $sql     =  $obj->executarJson('ventas','sp_persona_cuentas_bancarias',$param);
        return $sql;
    }

    public static function actualizar($data)
    {   
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('ventas','sp_persona_actualizar',$param);
        return $sql;
    }

    public static function eliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('ventas','sp_persona_eliminar',$param);
        return $sql;
    }




}
