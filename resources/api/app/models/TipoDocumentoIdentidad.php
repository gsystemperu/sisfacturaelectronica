<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class TipoDocumentoIdentidad extends \Phalcon\Mvc\Model
{
    public static function Listado()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('ventas','sp_tipo_documento_identidad_lista',$parametros);
        return $sql;
    }


}
