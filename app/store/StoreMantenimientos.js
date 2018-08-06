Ext.define('sisfacturaelectronica.store.StoreMantenimientos', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/* 
@DataSet :
Stores para los mantenimientos de las tablas maestras
==============================================================
*/
Ext.define('sisfacturaelectronica.store.Estados', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Estado',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/estados_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('sisfacturaelectronica.store.Bancos', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Banco',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/bancos_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('sisfacturaelectronica.store.Almacenes', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Almacen',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/almacen_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('sisfacturaelectronica.store.AlmacenSecciones', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.AlmacenSecciones',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/almacen_secciones_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('sisfacturaelectronica.store.Categoria', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Categoria',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/categoria_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('sisfacturaelectronica.store.Colores', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Color',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/color_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('sisfacturaelectronica.store.Medidas', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Medida',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/medidas_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('sisfacturaelectronica.store.TipoDeProductos', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.TipoDeProducto',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/tipo_producto_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('sisfacturaelectronica.store.UnidadDeMedidas', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.UnidadDeMedida',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/unidad_medida_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('sisfacturaelectronica.store.Tarifas', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Tarifa',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/tarifa_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});



/* 
@DataSet :
Stores para los mantenimientos Tabla Modelo
==============================================================
*/
Ext.define('sisfacturaelectronica.store.Modelos', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Modelo',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/modelo_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/* 
@DataSet :
Stores para los mantenimientos Tabla Marca
==============================================================
*/
Ext.define('sisfacturaelectronica.store.Marcas', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Marca',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/marca_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/* 
@DataSet :
Stores para las series de documentos del sistema
==============================================================
*/

Ext.define('sisfacturaelectronica.store.Series', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Serie',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/series_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/* 
@DataSet :
Stores para las ticketeras del sistema
==============================================================
*/

Ext.define('sisfacturaelectronica.store.Ticketeras', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Ticketera',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/ticketeras_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


/* 
@DataSet :
Stores tiendas 
==============================================================
*/

Ext.define('sisfacturaelectronica.store.Tiendas', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Tienda',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/tiendas_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});



/* 
@DataSet :
Stores Perfiles 
==============================================================
*/

Ext.define('sisfacturaelectronica.store.Perfiles', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Perfil',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/perfiles_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});




/* 
@DataSet :
Stores Usuarios
==============================================================
*/

Ext.define('sisfacturaelectronica.store.Usuarios', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Usuario',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/usuarios_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});
