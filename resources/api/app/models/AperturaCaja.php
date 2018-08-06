<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class AperturaCaja extends \Phalcon\Mvc\Model
{
    public static function listarmonedas()
    {    
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('ventas','sp_nombremonedas_listar',$param);
        return $sql;
    }

    public static function actualizar($data)
    {    
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('ventas','sp_apertura_caja_agregar',$param);
        return $sql;
    }

    public static function listaaperturacaja()
    {    
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('ventas','sp_apetura_caja_listar',$param);
        return $sql;
    }
    public static function historialaperturacaja(){
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('ventas','sp_apetura_caja_historial',$param);
        return $sql;
    }



    

}
