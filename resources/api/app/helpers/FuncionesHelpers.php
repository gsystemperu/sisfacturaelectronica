<?php

 	class FuncionesHelpers
 	{

 		public function esCadenaNulo($objeto)
 		{
		    if (!empty($objeto)) {
		        $retorna = $objeto;
		        $retorna = "'" . str_replace("'", "''", $retorna) . "'";
		        $retorna = stripslashes($retorna);
		        return $retorna;
		    }
		    return "NULL";
		}

		public function esNumeroNulo($objeto) {
		    if (!empty($objeto) && trim($objeto) != "" && is_numeric($objeto)) {
		        return $objeto;
		    }
		    return "NULL";
		}

		public function esNumeroCero($objeto) {
		    if (!empty($objeto) && trim($objeto) != "" && is_numeric($objeto)) {
		        return $objeto;
		    }
		    return "0";
		}

    public function nombreMes($objeto) {
       $nombre = '';
		    switch ($objeto) {
		      case "01": $nombre='ENERO'; break;
          case "02":$nombre='FEBRERO'; break;
          case "03":$nombre='MARZO'; break;
          case "04":$nombre='ABRIL'; break;
          case "05":$nombre='MAYO'; break;
          case "06":$nombre='JUNIO'; break;
          case "07":$nombre='JULIO'; break;
          case "08":$nombre='AGOSTO'; break;
          case "09":$nombre='SEPTIEMBRE'; break;
          case "10":$nombre='OCTUBRE'; break;
          case "11":$nombre='NOVIEMBRE'; break;
          case "12":$nombre='DICIEMBRE'; break;
		    }
        return $nombre;
	}
	
	public function guardarImagen($obj,$nom){
		$rs = true;
		$image = $obj;
		$pos  = strpos($image, ';');
		$type = explode(':', substr($image, 0, $pos))[1];
		$split = explode( '/', $type );
		$type = $split[1]; 
		switch ($type) {
			case 'jpeg':$image = imagecreatefromjpeg($image);break;
			case 'png' :$image = imagecreatefrompng($image);break;
			case 'bmp' :$image = imagecreatefrombmp($image);break;
			case 'gif' :$image = imagecreatefromgif($image);break;			
		}
		imagejpeg($image, 'img/'.$nom.'.jpg', 100);
		imagedestroy($image);
		return $rs;
	}
	public function guardarImagenProducto($obj,$nom){
		$rs = true;
		$image = $obj;
		$pos   = strpos($image, ';');
		$type  = explode(':', substr($image, 0, $pos))[1];
		$split = explode('/', $type );
		$type = $split[1]; 
		switch ($type) {
			case 'jpeg':$image = imagecreatefromjpeg($image);break;
			case 'png' :$image = imagecreatefrompng($image);break;
			case 'bmp' :$image = imagecreatefrombmp($image);break;
			case 'gif' :$image = imagecreatefromgif($image);break;			
		}
		imagejpeg($image, 'img/P-'.$nom.'.jpg', 100);
		imagedestroy($image);
		return $rs;
	}
	public function xmlToArray($xml, $options = array()) {
		$defaults = array(
			'namespaceSeparator' => ':',//you may want this to be something other than a colon
			'attributePrefix' => '@',   //to distinguish between attributes and nodes with the same name
			'alwaysArray' => array(),   //array of xml tag names which should always become arrays
			'autoArray' => true,        //only create arrays for tags which appear more than once
			'textContent' => '$',       //key used for the text content of elements
			'autoText' => true,         //skip textContent key if node has no attributes or child nodes
			'keySearch' => false,       //optional search and replace on tag and attribute names
			'keyReplace' => false       //replace values for above search values (as passed to str_replace())
		);
		$options = array_merge($defaults, $options);
		$namespaces = $xml->getDocNamespaces();
		$namespaces[''] = null; //add base (empty) namespace
	 
		//get attributes from all namespaces
		$attributesArray = array();
		foreach ($namespaces as $prefix => $namespace) {
			foreach ($xml->attributes($namespace) as $attributeName => $attribute) {
				//replace characters in attribute name
				if ($options['keySearch']) $attributeName =
						str_replace($options['keySearch'], $options['keyReplace'], $attributeName);
				$attributeKey = $options['attributePrefix']
						. ($prefix ? $prefix . $options['namespaceSeparator'] : '')
						. $attributeName;
				$attributesArray[$attributeKey] = (string)$attribute;
			}
		}
		//get child nodes from all namespaces
		$tagsArray = array();
		foreach ($namespaces as $prefix => $namespace) {
			foreach ($xml->children($namespace) as $childXml) {
				//recurse into child nodes
				$childArray = $this->xmlToArray($childXml, $options);
				list($childTagName, $childProperties) = each($childArray);
	 
				//replace characters in tag name
				if ($options['keySearch']) $childTagName =
						str_replace($options['keySearch'], $options['keyReplace'], $childTagName);
				//add namespace prefix, if any
				if ($prefix) $childTagName = $prefix . $options['namespaceSeparator'] . $childTagName;
	 
				if (!isset($tagsArray[$childTagName])) {
					//only entry with this key
					//test if tags of this type should always be arrays, no matter the element count
					$tagsArray[$childTagName] =
							in_array($childTagName, $options['alwaysArray']) || !$options['autoArray']
							? array($childProperties) : $childProperties;
				} elseif (
					is_array($tagsArray[$childTagName]) && array_keys($tagsArray[$childTagName])
					=== range(0, count($tagsArray[$childTagName]) - 1)
				) {
					//key already exists and is integer indexed array
					$tagsArray[$childTagName][] = $childProperties;
				} else {
					//key exists so convert to integer indexed array with previous value in position 0
					$tagsArray[$childTagName] = array($tagsArray[$childTagName], $childProperties);
				}
			}
		}
	 
		//get text content of node
		$textContentArray = array();
		$plainText = trim((string)$xml);
		if ($plainText !== '') $textContentArray[$options['textContent']] = $plainText;
	 
		//stick it all together
		$propertiesArray = !$options['autoText'] || $attributesArray || $tagsArray || ($plainText === '')
				? array_merge($attributesArray, $tagsArray, $textContentArray) : $plainText;
	 
		//return node as array
		return array(
			$xml->getName() => $propertiesArray
		);
	}


 	}
