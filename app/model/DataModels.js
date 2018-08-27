Ext.define('sisfacturaelectronica.model.DataModels', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }]
});

// @Model : Estado
Ext.define('sisfacturaelectronica.model.Estado', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        }
    ]
});

// @Model : Banco
Ext.define('sisfacturaelectronica.model.Banco', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Almacen
Ext.define('sisfacturaelectronica.model.Almacen', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Almacen Secciones
Ext.define('sisfacturaelectronica.model.AlmacenSecciones', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'idalmacen',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'usuario',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Almacen Categorias
Ext.define('sisfacturaelectronica.model.Categoria', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Almacen Color
Ext.define('sisfacturaelectronica.model.Color', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Medidas
Ext.define('sisfacturaelectronica.model.Medida', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Tipo de producto
Ext.define('sisfacturaelectronica.model.TipoDeProducto', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Unidad de Medida
Ext.define('sisfacturaelectronica.model.UnidadDeMedida', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Tarifa
Ext.define('sisfacturaelectronica.model.Tarifa', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'valor',
            type: 'float'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});


// @Model : Marca
Ext.define('sisfacturaelectronica.model.Marca', {
    extend: 'Ext.data.Model',
    fields: [
       {
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        }
    ]
});


// @Model : Modelo
Ext.define('sisfacturaelectronica.model.Modelo', {
    extend: 'Ext.data.Model',
    fields: [
       {
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        }
    ]
});


// @Model : Producto
Ext.define('sisfacturaelectronica.model.Producto', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: "codigoproducto",
            type: 'string'
        },
        {
            name: "nombre",
            type: 'string'
        },
        {
            name: "preciocompra",
            type: 'float'
        },
        {
            name: "precioventa",
           // type: 'float'
        },
        {
            name: "precioventafraccion",
            type: 'float'
        },
        {
            name: "preciodolares",
            type: 'float'
        },
        {
            name: "stockminimo",
            type: 'int'
        },
        {
            name: "fechacaducidad",
            type: 'string'
        },
        {
            name: "idcolor",
            type: 'int'
        },
        {
            name: "idmedida",
            type: 'int'
        },
        {
            name: "idunidadmedida",
            type: 'int'
        },
        {
            name: "idunidadmedidafraccion",
            type: 'int'
        },
        {
            name: "idtipoproducto",
            type: 'int'
        },
        {
            name: "talla",
            type: 'string'
        },
        {
            name: "stockminimo",
            type: 'float'
        },
        {
            name: "manejastock",
            type: 'boolean'
        },
        {
            name: "existencias",
            type: 'integer'
        },
        {name: "precioprodlocalespecial",type: 'float'},
        {name: "precioprodlocalespecial2",type: 'float'},
        {name: "precioprodlocalespecial3",type: 'float'},
        {name: "precioprodprovincia",type: 'float'},
        {name: "precioprodprovinciaespecial",type: 'float'},
        {name: "precioprodprovinciaespecial2",type: 'float'},
        {name: "precioprodprovinciaespecial3",type: 'float'},
        {name: "precioproddistribuidorlima",type: 'float'},
        {name: "precioproddistribuidorprovincia",type: 'float'},
        {name: "sevendepordosis",type: 'boolean'},
        {name: "numerodosis",type: 'integer'},
        {name: "preciodosis",type: 'float'},
        {name: "ventas",type: 'float'},
        {name: "cotizaciones",type: 'float'},
        {name: "cantidadunidadmedida",type: 'float'},
        {name: "unidadmedida",type: 'string'},
        {name: "ventakilos",type: 'boolean'},
        {name: "preciokilo",type: 'float'},
        {name: "ventagramos",type: 'boolean'},
        {name: "preciogramo",type: 'float'},
        {name: "stock_dosis",type: 'float'},
        {name: "stock_kilos",type: 'float'},
        {name: "stock_gramos",type: 'float'},
        {name: "idmodelo",type: 'integer'},
        {name: "modelo",type: 'string'},
        {name: "idmarca",type: 'float'},
        {name: "marca",type: 'string'},
        {name: "ventaunidad",type: 'boolean'},
        {name: "preciounidad",type: 'float'},
        {name: "stockminimo",type: 'float'},
        {name: "fotoprod",type: 'string'},
        {name: "nombregenerico",type: 'string'},
        {name: "idformafarmaceutica",type: 'integer'},
        {name: "ventaconreceta",type: 'boolean'},
        {name: "ventablister",type: 'boolean'},
        {name: "precioblister",type: 'float'},
        {name: "idalmacen",type: 'integer'},
        {name: "idalmacenseccion",type: 'integer'},
        {name: "seccion",type: 'string'},
        {name: "accionfarmacologica",type: 'string'},
        {name: "_cajas",type: 'float'},
        {name: "_unidades",type: 'float'}
    ]
});

// @Model : Tarifa
Ext.define('sisfacturaelectronica.model.Proveedor', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'razonsocial',
            type: 'string'
        },
        {
            name: 'contacto',
            type: 'string'
        },
        {
            name: 'telefono',
            type: 'string'
        },
        {
            name: 'direccion',
            type: 'string'
        },
        {
            name: 'direccionfiscal',
            type: 'string'
        },
        {
            name: 'numrucprov',
            type: 'string'
        },
        {
            name: 'correo',
            type: 'string'
        }
    ]
});


// @Model : Abastecimientos
Ext.define('sisfacturaelectronica.model.Abastecimiento', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'idprov',
            type: 'int'
        },
        {
            name: 'razonsocial',
            type: 'string'
        },
        {
            name: 'fecha',
            type: 'date'
        },
        {
            name: 'tipodoc',
            type: 'string'
        },
        {
            name: 'serie',
            type: 'string'
        },
        {
            name: 'numero',
            type: 'string'
        },
        {
            name: 'lote',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        },
        {
            name: 'feabastecimiento',
            type: 'string'
        }

    ]
});

// @Model : Abastecimiento detalle
Ext.define('sisfacturaelectronica.model.AbastecimientoDetalle', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idaba',
            type: 'int'
        },
        {
            name: 'item',
            type: 'int'
        },
        {
            name: 'idprod',
            type: 'int'
        },
        {
            name: 'nombre',
            type: 'string'
        },
        {
            name: 'cantidad',
            type: 'int'
        },
        {
            name: 'precio',
            type: 'int'
        },
        {
            name: 'total',
            type: 'int'
        },
        {
            name: 'vencimiento',
            type: 'date'
        }
    ]
});



// @Model : Orden de Compra
//eddy erazo 
Ext.define('sisfacturaelectronica.model.OrdenCompra', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'idprov',
            type: 'int'
        },
        {
            name: 'razonsocial',
            type: 'string'
        },
        {
            name: 'fecha',
            type: 'string'
        },
        {
            name: 'estado',
            type: 'string'
        },
        {
            name: 'fpedido',
            type: 'string'
        },
        {
            name: 'incluyeigv',
            type: 'boolean'
        },
        {
            name: 'occodigo',
            type: 'string'
        },
        {name: 'totalorden',type: 'float'},
        {name: 'pagoacuenta',type: 'float'},
        {name: 'saldopagar',type: 'float'},
        {name: 'idmoneda',type: 'integer'},
        {name: 'serie',type: 'string'},
        {name: 'numero',type: 'string'},
        {name: 'idalmacen',type: 'integer'},
        {name: 'documentoventa',type: 'integer'},
        {name: 'idformapago',type: 'integer'}
    ]
});



// @Model : Orden de Compra Detalle estado confirmado
//
Ext.define('sisfacturaelectronica.model.OrdenCompraDetalle', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idordencompra',type: 'int'},
        {name :'item',type:'int'},
        {name :'idprod',type:'int'},
        {name :'producto',type:'string'},
        {name :'cantidad',type:'float'},
        {name :'preciocompra',type:'float'},
        {name :'cantidadrecibida',type:'float'},
        {name :'total',type:'float'},
        {name :'saldo',type:'float'}
    ]
});

// @Model : Producto existencias con sus series
Ext.define('sisfacturaelectronica.model.ProductoExistencia', {
    extend: 'Ext.data.Model',
    fields: [
        {name :'id',type:'int'},
        {name: 'fechaingreso',type:'string'},
        {name :'idprodeedor',type:'int'},
        {name :'razonsocial',type:'string'},
        {name :'numeroguia',type:'string'},
        {name :'numerolote',type:'string'},
        {name :'codigobarras',type:'string'},
        {name: "vencimiento",type:'string'},
        {name: "idseccion",type:'int'},
        {name: "seccionalmacen",type:'string'},
        {name: "ubicacion",type:'string'},
        {name: "observaciones",type:'string'},
        {name: "estado",type:'string'},
        {name: "cantidaddosis",type:'int'},
        {name: "cantidadgramo",type:'float'},
        {name: "cantidadkilos",type:'float'}


    ]
});

// @Model : Moneda
Ext.define('sisfacturaelectronica.model.Moneda', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {name: 'abreviatura',type: 'string'},
        {name: 'simbolo',type: 'string'}
    ]
});


// @Model : Listado de nombre de monedas para la apetura de caja
Ext.define('sisfacturaelectronica.model.NombreMoneda', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'valor',
            type: 'float'
        },
        {
            name: 'monto',
            type: 'float'
        },
    ]
});


// @Model : Detalle de Guia Remisión
Ext.define('sisfacturaelectronica.model.GuiaRemisionDetalle', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idordencompra',type: 'int'},
        {name :'item',type:'int'},
        {name :'idprod',type:'int'},
        {name :'producto',type:'string'},
        {name :'cantidad',type:'float'},
        {name :'preciocompra',type:'float'},
        {name :'cantidadrecibida',type:'float'},
        {name :'total',type:'float'},
        {name :'saldo',type:'float'}
    ]
});

// @Model : Listado de Registros de inventario
//
Ext.define('sisfacturaelectronica.model.InventarioRegistro', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',type: 'string'},
        {name :'referencia',type:'string'},
        {name :'fechainventario',type:'date'},
        {name :'idestado',type:'integer'},
        {name :'estado',type:'string'},
        {name :'stockfisico',type:'integer'},
        {name :'inventario',type:'integer'},
        {name :'diferencia',type:'integer'},
        {name :'detalle',type:'string'}
        
    ]
});

// @Model : Lista de productos para el inventario
//
Ext.define('sisfacturaelectronica.model.ProductoInventario', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'codigoproducto',type: 'string'},
        {name :'id',type:'integer'},
        {name :'nombre',type:'string'},
        {name :'stockfisico',type:'integer'},
        {name :'inventario',type:'integer'},
        {name :'inventarioseries',type:'integer'},
        {name :'diferencia',type:'integer'},
        {name :'chk',type:'boolean'},
        
    ]
});



// @Model : Series de los documentos
//
Ext.define('sisfacturaelectronica.model.Serie', {
    extend: 'Ext.data.Model',
    fields: [
        {name :'id',type:'integer'},
        {name :'iddocventa',type:'integer'},
        {name :'documento',type:'string'},
        {name :'serie',type:'string'},
        {name :'numero',type:'integer'},
    ]
});

// @Model : Ticketeas
//
Ext.define('sisfacturaelectronica.model.Ticketera', {
    extend: 'Ext.data.Model',
    fields: [
        {name :'id',type:'integer'},
        {name :'codigo',type:'string'},
        {name :'serie',type:'string'},
        {name :'autorizacionsunat',type:'string'},
        {name :'numero',type:'integer'},
        {name :'estado',type:'integer'},
        {name :'descripcion',type:'string'}
    ]
});

// @Model : Tiendas
//
Ext.define('sisfacturaelectronica.model.Tienda', {
    extend: 'Ext.data.Model',
    fields: [
        {name :'id',type:'integer'},
        {name :'direccion',type:'string'},
        {name :'telefono',type:'string'},
        {name :'celular',type:'string'}
        
    ]
});

// @Model : Forma Farmaceutica
Ext.define('sisfacturaelectronica.model.FormaFarmaceutica', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});


// @Model : Perfil
Ext.define('sisfacturaelectronica.model.Perfil', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        }
    ]
});

// @Model : Usuario
Ext.define('sisfacturaelectronica.model.Usuario', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'usuario',
            type: 'string'
        },
        {
            name: 'idperfil',
            type: 'int'
        },
        {
            name: 'perfil',
            type: 'string'
        }

    ]
});

