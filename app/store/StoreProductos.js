Ext.define('sisfacturaelectronica.store.StoreProductos', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/*
@DataSet :
Stores para las operaciones de Producto
==============================================================
*/
Ext.define('sisfacturaelectronica.store.Productos', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Producto',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams :{
      nombre : '',
      tipoproducto : 0,
      codigobarras: ''
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/producto_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/*
@DataSet :
Stores para listar los productos para las ordenes de compra
==============================================================
*/
Ext.define('sisfacturaelectronica.store.ProductosOrdenCompra', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Producto',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams :{
        idprov : 0,
        nombre : ''
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/producto_listar_oc'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


/*
@DataSet :
Stores para visualizar las series de cada producto por lote y guia
==============================================================
*/
Ext.define('sisfacturaelectronica.store.ProductoExistencias', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.ProductoExistencia',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    groupField: 'vencimiento',
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/producto_existencias'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/*
@DataSet :
@Descripcion : 
DataSet para los registros de los inventarios
==============================================================
*/
Ext.define('sisfacturaelectronica.store.InventarioRegistros', {
    extend  : 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.InventarioRegistro',
    autoLoad: true,
    remoteSort: true,
    autoSync  : false,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/producto_inventario_registros'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/*
@DataSet :
==============================================================
*/
Ext.define('sisfacturaelectronica.store.ProductoInventarioLista', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.ProductoInventario',
    autoLoad: false,
    remoteSort: true,
    autoSync  : false,
    extraParams :{ idinventario : 0 },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/producto_inventario_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});



/*
@DataSet :
==============================================================
*/
Ext.define('sisfacturaelectronica.store.FormaFarmaceutica', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.FormaFarmaceutica',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/forma_farmaceutica_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


/*
@DataSet :
Stores para las operaciones de Producto
==============================================================
*/
Ext.define('sisfacturaelectronica.store.ProductosGenericos', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Producto',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams :{
        nombregenerico : '',idprod : 0,
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/producto_genericos_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


