<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class GuiaProveedor extends \Phalcon\Mvc\Model
{

    public static function actualizar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('compras','sp_guia_proveedor_actualizar',$param);
        return $sql;
    }
  


}
