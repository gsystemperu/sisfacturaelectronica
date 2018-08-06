<?php
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

 	class SQLHelpers
 	{
    private $cadena;
    public function __construct()
    {
      $this->cadena = "Select * from";
    }
    public function getCadena(){
      return $this->cadena;
    }
    public function setCadena($sql){
       $this->cadena = $sql;
    }

 		public function executarJson($esquema,$nombre,$array_parametros)
 		{
        $parametros ="";
        if(sizeof($array_parametros)>0)
        {
          for($i = 0; $i < sizeof($array_parametros);$i++)
          {$parametros = $parametros . ',?';}
          $parametros=substr($parametros,1,strlen($parametros));
        }

        $reporte = new Seguridad();
        $sql     = $this->getCadena().' '.$esquema.'.'.$nombre.'('.$parametros.')';
        $data    = $reporte->getReadConnection()->query($sql,$array_parametros)->fetch();
        return $data[0];
		}

    public function executar($esquema,$nombre,$array_parametros)
 		{
        $parametros ="";
        if(sizeof($array_parametros)>0)
        {
          for($i = 0; $i < sizeof($array_parametros);$i++)
          {$parametros = $parametros . ',?';}
          $parametros=substr($parametros,1,strlen($parametros));
        }
        $reporte = new Seguridad();
        $sql     = $this->getCadena().' '.$esquema.'.'.$nombre.'('.$parametros.')';
        $data       = new Resultset(null,$reporte,$reporte->getReadConnection()->query($sql,$array_parametros));
        return $data->toArray();
		}

    public function executarCadena($esquema,$nombre,$parametros)
   {
       $reporte = new Seguridad();
       $sql     = $this->getCadena().' '.$esquema.'.'.$nombre.'('.$parametros.')';
       $data       = new Resultset(null,$reporte,$reporte->getReadConnection()->query($sql));
       return $data->toArray();
   }

   public function executarCadenaJsonCondicionado($esquema,$nombre,$parametros)
  {
      $reporte = new Seguridad();
      $sql     = $this->getCadena().' '.$esquema.'.'.$nombre.'('.$parametros.')';
    
      $data    = $reporte->getReadConnection()->query($sql)->fetch();
      return $data[0];
  }

      public function executarQuery($parametros)
 		{
        $reporte = new Seguridad();
        $sql     = $parametros;
        $data       = new Resultset(null,$reporte,$reporte->getReadConnection()->query($sql));
        return $data->toArray();
		}

 	}
