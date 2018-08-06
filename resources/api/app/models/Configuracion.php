<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Configuracion extends \Phalcon\Mvc\Model
{
    public static function confInventario()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('configuracion','sp_config_inventario',$param);
        return $sql;
    }
    public static function confPuntoVenta()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('configuracion','sp_config_punto_venta',$param);
        return $sql;
    }
}
