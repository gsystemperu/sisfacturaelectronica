Ext.define('sisfacturaelectronica.store.StoreProveedores', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/* 
@DataSet :
Stores para las operaciones de Proveedores
==============================================================
*/
Ext.define('sisfacturaelectronica.store.Proveedores', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModels'],
    model   :'sisfacturaelectronica.model.Proveedor',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams:{
        proveedor: ''
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/proveedor_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});
