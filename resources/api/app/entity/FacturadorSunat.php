<?php

    class FacturadorSunat 
    {
          private $facturador = 'C:\facturador\bd\BDFacturador.db';
          public $cn;
          function __construct() {
            $this->cn = new SQLite3($this->facturador);
          }
          public function listarDocumentos(){
              $rs = $this->cn->query('SELECT * FROM documento');
              return $rs;
          }  
    }
    