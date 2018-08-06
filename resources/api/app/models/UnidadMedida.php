<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class UnidadMedida extends \Phalcon\Mvc\Model
{
    public static function ListarUnidadMedida()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('inventario','sp_unidad_medida_listar',$parametros);
        return $sql;
    }

      public static function actualizar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_unidad_medida_actualizar',$param);
        return $sql;
    }
    
    public static function eliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_unidad_medida_eliminar',$param);
        return $sql;
    }


}
