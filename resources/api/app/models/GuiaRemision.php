<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class GuiaRemision extends \Phalcon\Mvc\Model
{

    public static function actualizar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('ventas','sp_guia_remision_agregar',$param);
        return $sql;
    }

    public static function motivosTransladoListado($data){
      $obj     = new SQLHelpers();
      $param   = $data;
      $sql     =  $obj->executarJson('inventario','sp_motivo_translado_listar',$param);
      return $sql;
    }

    public static function guiaremisionbuscar($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('ventas','sp_guia_remision_buscar',$param);
        return $sql;
      }

}
