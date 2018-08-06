<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Seguridad extends \Phalcon\Mvc\Model
{
    /*
    @@ Menu del Sistema por Usuario
    */
    public static function LoginMenu($usuario)
    {
        $param   = array($usuario);
        $sql     = "SELECT * FROM seguridad.sp_login_menu(?)";
        $reporte = new Seguridad();
        $data    = $reporte->getReadConnection()->query($sql,$param)->fetch();
        return $data[0];
    }

    public static function Pefiles(){
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('seguridad','sp_perfil_listar',$param);
        return $sql;
    }

    public static function Usuarios(){
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('seguridad','sp_usuario_listar',$param);
        return $sql;
    }
    public static function usuarioActualizar($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('seguridad','sp_usuario_actualizar',$param);
        return $sql;
    }
    public static function permisosPerfilActualizar($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('seguridad','sp_perfil_permisos_actualizar',$param);
        return $sql;
    }
    public static function permisosDelPerfil($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('seguridad','sp_perfil_permisos',$param);
        return $sql;
    }
    public static function perfilActualizar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('seguridad','sp_perfil_actualizar',$param);
        return $sql;
    }
    public static function loginUsuario($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('seguridad','sp_usuario_login',$param);
        return $sql;
    }
    public static function usuarioEliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('seguridad','sp_usuario_eliminar',$param);
        return $sql;
    }
    
    

    

}
