<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Producto extends \Phalcon\Mvc\Model
{



     public static function listar()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('inventario','sp_producto_listar_all',$param);
        return $sql;
    }
    public static function buscarNombre($data)
    {
       $obj     = new SQLHelpers();
       $param   = $data;
       $sql     =  $obj->executarJson('inventario','sp_producto_listar_all',$param);
       return $sql;
    }
    public static function buscarMarca($data)
    {
       $obj     = new SQLHelpers();
       $param   = $data;
       $sql     =  $obj->executarJson('inventario','sp_producto_listar_marca',$param);
       return $sql;
    }
    
    public static function buscarNombreYcliente($data)
    {
       $obj     = new SQLHelpers();
       $param   = $data;
       $sql     =  $obj->executarJson('inventario','sp_producto_listar_all',$param);
       return $sql;
    }
    public static function buscarNombreYclienteGenerico($data)
    {
       $obj     = new SQLHelpers();
       $param   = $data;
       $sql     =  $obj->executarJson('inventario','sp_producto_listar_generico',$param);
       return $sql;
    }
    
    
    public static function buscarTipo($data)
    {
       $obj     = new SQLHelpers();
       $param   = $data;
       $sql     =  $obj->executarJson('inventario','sp_producto_listar_all',$param);
       return $sql;
    }

    /*
    @ Model : Buscar Productos solo para la vista de orden de compra
    */
    public static function  buscarOrdenCompra($data)
    {
       $obj     = new SQLHelpers();
       $param   = $data;
       $sql     =  $obj->executarJson('inventario','sp_producto_listar_OC_all',$param);
       return $sql;
    }

    public static function  buscarProductoOrdenCompra($data)
    {
       
       $obj     =  new SQLHelpers();
       $param   =  $data;
       $sql     =  $obj->executarJson('inventario','sp_producto_listar_oc_proveedor',$param);
       return $sql;
    }
    public static function  buscarProductoOrdenCompraFiltro($data)
    {
       $obj     =  new SQLHelpers();
       $param   =  $data;
       $sql     =  $obj->executarJson('inventario','sp_producto_listar_oc_proveedor_filtro',$param);
       return $sql;
    }




    public static function buscarCodigoBarras($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('inventario','sp_producto_buscar_codigo_barra',$param);
        return $sql;
    }
    public static function buscarCodigoSerie($serie)
    {
        $obj     = new SQLHelpers();
        $param   = array($serie);
        $sql     =  $obj->executarJson('inventario','sp_producto_buscar_codigo_serie',$param);
        return $sql;
    }
  /*  public static function buscarNombre($nombre)
    {
        $obj     = new SQLHelpers();
        $param   = array($nombre);
        $sql     =  $obj->executarJson('inventario','sp_producto_buscar_nombre',$param);
        return $sql;
    }*/

    public static function actualizar($data)
    {   //print_r($data);die();
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_producto_actualizar',$param);
        return $sql;
    }

    public static function eliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_producto_eliminar',$param);
        return $sql;
    }

    public static function eliminarSerie($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        
        $sql     =  $obj->executar('inventario','sp_producto_eliminar_existencia',$param);
        return $sql;
    }



    //@ Metodos Tipo Producto
      public static function listarTipoProducto()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('inventario','sp_tipo_producto_listar',$parametros);
        return $sql;
    }

     public static function actualizarTipoProducto($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_tipo_producto_actualizar',$param);
        return $sql;
    }

    public static function eliminarTipoProducto($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_tipo_producto_eliminar',$param);
        return $sql;
    }

    /**
     * [existenciasPorProducto : Lista las existencias por cada producto individual por serie]
     * @param  [type] $data [ array , parametro idproducto]
     * @return [type] $json  , retorna un json con todos los datos
     */
    public static function existenciasPorProducto($data){
      $obj     = new SQLHelpers();
      $param   = $data;
      $sql     = $obj->executarJson('inventario','sp_producto_existencias_listar',$param);
      return $sql;
    }


    public static function ingresarUbicacionProducto($data){
      $obj     = new SQLHelpers();
      $param   = $data;
      $sql     = $obj->executar('inventario','sp_producto_existencia_ubicacion_actualizar',$param);
      return $sql;
    }


    public static function buscarProductoPorCodigoBarras($data){
      $obj     = new SQLHelpers();
      $param   = $data;
      $sql     = $obj->executarJson('inventario','sp_producto_serie_buscar',$param);
      return $sql;
    }

    /**
     * [proveedoresDelProducto]
     * @param  [type] $data array con el codigo de producto
     * @return [type] Json      [description]
     */
    public static function proveedoresDelProducto($data){
      $obj     = new SQLHelpers();
      $param   = $data;
      $sql     = $obj->executarJson('inventario','sp_productoxproveedor_listar',$param);
      return $sql;
    }

     /**
     * [proveedoresDelProducto]
     * @param  [type] $data array con el codigo de producto
     * @return [type] Json      [description]
     */
    public static function copiarProducto($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('inventario','sp_producto_copiar',$param);
        return $sql;
    }

       /**
     * [listarInventario]
     * @param  [type] $data nombre el producto a filtrar
     * @return [type] Json      [description]
     */
    public static function listarInventario($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('inventario','SP_PRODUCTO_REGISTRO_INVENTARIO',$param);
        return $sql;
      }

         /**
     * [BuscarInventario]
     * @param  [type] $data nombre el producto a filtrar
     * @return [type] Json      [description]
     */
    public static function BuscarInventario($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('inventario','sp_inventario_ingresado_buscar',$param);
        return $sql;
      }


     /**
     * [inventarioRegistros]
     * @param  [type] $data numero el mes para el filtro de los registros de inventario.
     * @return [type] Json      [description]
     */
    public static function inventarioRegistros($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('inventario','sp_inventario_registros',$param);
        return $sql;
      }

       /**
     * [inventarioAgregar]
     * @param  [type] $data de los campos de la tabla inventario incluye un json para insertar el detalle
     * @return [type] Json      [description]
     */
    public static function inventarioAgregar($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('inventario','sp_inventario_agregar',$param);
        return $sql;
      }


       /**
     * [inventarioAnular]
     * @param  [type] $data de los campos de la tabla inventario incluye un json para insertar el detalle
     * @return [type] Json      [description]
     */
    public static function inventarioAnular($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('inventario','sp_inventario_anular',$param);
        return $sql;
      }

        /**
     * [actualizarCantidadDisponible]
     * @param  [type] $data código del producto y la nueva cantidad a actualizar
     * @return [type] Json      [description]
     */
    public static function actualizarCantidadDisponible($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('inventario','sp_producto_actualizar_disponibilidad',$param);
        return $sql;
      }

       /**
     * [listarFormaFarmaceutica]
     * @param  [type] $data no tiene parametros
     * @return [type] Json      [description]
     */
    public static function listarFormaFarmaceutica($data){
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     = $obj->executarJson('inventario','sp_forma_farmaceutica_listar',$param);
        return $sql;
      }
   /**
     * [actualizarFormaFarmaceutica]
     * @param  [type] $data {codigo, descripcion}
     * @return [type] Json      [description]
     */
    public static function actualizarFormaFarmaceutica($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('inventario','sp_forma_farmaceutica_actualizar',$param);
        return $sql;
      }
/**
     * [eliminarFormaFarmaceutica]
     * @param  [type] $data {codigo}
     * @return [type] Json      [description]
     */
    public static function eliminarFormaFarmaceutica($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('inventario','sp_forma_farmaceutica_eliminar',$param);
        return $sql;
      }


       /**
     * [listarProductoGenericos]
     * @param  [type] $data parametros : descripcion generico, id del producto base 
     * @return [type] Json      [todos las columnas de los medicamentos]
     */
    public static function listarProductoGenericos($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('inventario','sp_producto_listar_generico',$param);
        return $sql;
    }

       /**
     * [actualizarProductoExistencia]
     * @param  [type] $data parametros : id, fecha vencimiento, cantidad
     * @return [type] Json      [objeto respuesta ]
     */
    public static function actualizarProductoExistencia($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('inventario','sp_producto_actualizar_existencia',$param);
        return $sql;
    }

    

    

    
      
}
