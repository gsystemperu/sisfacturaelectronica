Ext.define('sisfacturaelectronica.store.StoreVentas', {
    extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }
});

// @DataSet :

Ext.define('sisfacturaelectronica.store.Clientes', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.Cliente',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idper',direction: 'ASC'}],
    extraParams: { vDocumento: '', vRuc: '', vDatos: ''},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/buscar_cliente'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/*
Ext.define('sisfacturaelectronica.store.Productos', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.Producto',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    groupField: 'categoria',
    sorters: [{property: 'idprod',direction: 'ASC'}],
    extraParams: { vCodigo: '', vDescripcion: '', vCategoria : null},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/buscar_producto'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});*/

Ext.define('sisfacturaelectronica.store.ProductosPorPrecioPersona', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.ProductoPorCliente',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    //groupField: 'categoria',
    sorters: [{property: 'idprod',direction: 'ASC'}],
    extraParams: { vCodigo: '', vDescripcion: '', vCategoria : null,vIdCliente:0},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/buscar_producto_por_persona'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('sisfacturaelectronica.store.DetalleCotizacion', {
    extend: 'Ext.data.Store',
    fields: [
            {name: "idprod", type:'int' },
            {name: "descripcion", type:'string' },
            {name: "cantidad", type:'int' },
            //{name: "precio", type:'float' },
            {name: "precio"},
            {name: "total", type:'float' }  ,
            {name: "vencimiento",type:'date', format:'d/m/Y'},
            {name: "presentacion", type:'string' },
            {name: "unidadcantidad", type:'float' }
    ],
    proxy: { type: 'memory' }
});

Ext.define('sisfacturaelectronica.store.TipoDocumentos', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.TipoDocumento',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idtipdoc',direction: 'ASC'}],
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_documentos'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('sisfacturaelectronica.store.Cotizaciones', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.Cotizacion',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idcoti',direction: 'ASC'}],
    extraParams: {
        vDesde      : '',
        vHasta      : '',
        vPersona    : '',
        vCodigo     : ''
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_cotizaciones'},
        reader: {
            type: 'json',
            rootProperty: 'data',
            //totalProperty: 'totalreg'
        }
    }
});

Ext.define('sisfacturaelectronica.store.CotizacionesDetalle', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.CotizacionDetalle',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'item',direction: 'ASC'}],
    extraParams: { vIdCotizacion: 0 },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/cotizacion_detalle_vista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('sisfacturaelectronica.store.FormaPago', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.FormaPago',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idfopag',direction: 'ASC'}],
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_forma_pago'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('sisfacturaelectronica.store.ModoEntrega', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.ModoEntrega',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idmodo',direction: 'ASC'}],
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_modo_entrega'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('sisfacturaelectronica.store.Vendedores', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.Vendedor',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idvend',direction: 'ASC'}],
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_vendedores'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('sisfacturaelectronica.store.UnidadMedida', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.UnidadMedida',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idumed',direction: 'ASC'}],
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_unidad_medida'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});



Ext.define('sisfacturaelectronica.store.Presentacion', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.Presentacion',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idpres',direction: 'ASC'}],
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_presentacion'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('sisfacturaelectronica.store.Categoria', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.Categoria',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idcate',direction: 'ASC'}],
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_categorias'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('sisfacturaelectronica.store.CotizacionesEstadistica', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.Cotizacion',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idcoti',direction: 'ASC'}],
    extraParams: {
        vDesde: '',
        vHasta: '',
        vPersona : ''
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/estadistica_por_cliente'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('sisfacturaelectronica.store.CotizacionesEstadisticaProducto', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.EstProducto',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idcoti',direction: 'ASC'}],
    extraParams: {
        vDesde: '',
        vHasta: '',
        vProducto : 0
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/estadistica_por_producto'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('sisfacturaelectronica.store.CotizacionesEstadisticaVendedor', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.Cotizacion',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idcoti',direction: 'ASC'}],
    extraParams: {
        vDesde: '',
        vHasta: '',
        vProducto : 0
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/estadistica_por_vendedor'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('sisfacturaelectronica.store.CotizacionesDelCliente', {
    extend: 'Ext.data.Store',requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.Cotizacion',
    autoLoad: false,extraParams: {vCodigo : 0},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/buscar_cotizaciones_cliente'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('sisfacturaelectronica.store.CotizacionesFacturar', {
    extend: 'Ext.data.Store',requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.CotizacionesFacturar',
    autoLoad: true,
    extraParams: {vDesde : '',vHasta:''},
    groupField: 'fechacoti',
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/cotizaciones_a_facturar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('sisfacturaelectronica.store.ClienteVentasFacturacion', {
    extend: 'Ext.data.Store',requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.CotizacionesFacturar',
    autoLoad: false,
    extraParams: {idper : 0},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/persona_buscar_ventas'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('sisfacturaelectronica.store.DocumentoVenta', {
    extend: 'Ext.data.Store',requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.TipoDocumentoVenta',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/documentos_venta_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});



Ext.define('sisfacturaelectronica.store.PuntoVentaPagos', {
    extend: 'Ext.data.Store',requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.CotizacionesFacturar',
    autoLoad: false,
    extraParams: {desde : '',hasta:''},
    groupField: 'fechafact',
    autoSort :false,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/buscar_punto_venta_pagos'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('sisfacturaelectronica.store.DetalleFacturacion', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.DetFacturacion',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams: {idfacturacion:101},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/detalle_facturacion'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('sisfacturaelectronica.store.NombreMoneda', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModel'],
    model   :'sisfacturaelectronica.model.NombreMoneda',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_nombre_moneda'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

//@ Store : Muestra los datos de los ingresos de una orden de compra

Ext.define('sisfacturaelectronica.store.DetalleIngresoGuiaVista', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.DetalleIngresoGuiaVista',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/ordercompra_lista_detalle_ingresos'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


// @ Store : Listado de Motivos de Translado para las guias de remisión

Ext.define('sisfacturaelectronica.store.MotivosTranslados', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.MotivoTranslado',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_motivos_translado'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


// @ Store : Listado de Documentos de venta asignados a una tienda
Ext.define('sisfacturaelectronica.store.TiendaDocumentosVentaAsignados', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.TiendaDocumentoVentaAsignado',
    autoLoad: false,
    extraParams: {
        idtienda : 0
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/empresa_listar_doc_ventas_asignados'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

// @ Store : Listado de Documentos de venta para asignar
Ext.define('sisfacturaelectronica.store.TiendaDocumentosVenta', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.TiendaDocumentoVenta',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/empresa_listar_doc_ventas'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

// @ Store : Listado de Ticketeras de venta asignadas a una tienda
Ext.define('sisfacturaelectronica.store.TiendaTicketerasAsignadas', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.TiendaTicketeraAsignada',
    autoLoad: false,
    extraParams: {
        idtienda : 0
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/empresa_listar_ticketeras_asignadas'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

// @ Store : Listado de Ticketeras de venta para asignar
Ext.define('sisfacturaelectronica.store.TiendaTicketeras', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.TiendaTicketera',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/empresa_listar_ticketeras'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


// @ Store : Listado de metodos de pago

Ext.define('sisfacturaelectronica.store.MetodosPago', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.MetodoPago',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_metodo_pago'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});
// @ Store : Listado de metodos de pago

Ext.define('sisfacturaelectronica.store.ListaAperturaCaja', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.AperturaCaja',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_apetura_caja'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('sisfacturaelectronica.store.ListaAperturaCajaHistorico', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelVentas'],
    model   :'sisfacturaelectronica.model.AperturaCaja',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_apetura_caja_his'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});
