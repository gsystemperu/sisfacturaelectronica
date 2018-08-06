Ext.define('sisfacturaelectronica.store.StoreAbastecimiento', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/* 
@DataSet :
Stores para las operaciones de Abastecimiento
==============================================================
*/
Ext.define('sisfacturaelectronica.store.Abastecimientos', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Abastecimiento',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
     pageSize  : 100,
    extraParams :{
        desde       : null,
        hasta       : null,
        proveedor   : 0
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/abastecimiento_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty : 'totalreg'

        }
    }
});

/* 
@DataSet :
Stores para las operaciones de Abastecimiento Detalle
==============================================================
*/
Ext.define('sisfacturaelectronica.store.AbastecimientoDetalle', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.AbastecimientoDetalle',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams :{id       : null},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/abastecimiento_detalle'},
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
