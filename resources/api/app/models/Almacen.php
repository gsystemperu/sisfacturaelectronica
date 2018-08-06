<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Almacen extends \Phalcon\Mvc\Model
{
    public static function Listado()
    {    
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('inventario','sp_almacen_listar',$param);
        return $sql;
    }

    public static function actualizar($data)
    {    
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_almacen_actualizar',$param);
        return $sql;
    }
  
    public static function eliminar($data)
    {    
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_almacen_eliminar',$param);
        return $sql;
    }
    //=================================================================
    // Sessiones del almacen

      public static function ListarSecciones($data)
    {    
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('inventario','sp_almacen_secciones_listar',$param);
        return $sql;
    }

      public static function actualizarseccion($data)
    {    
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_almacen_secciones_actualizar',$param);
        return $sql;
    }
     public static function eliminarseccion($data)
    {    
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_almacen_secciones_eliminar',$param);
        return $sql;
    }



    

}
