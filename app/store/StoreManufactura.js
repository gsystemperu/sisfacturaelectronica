Ext.define('sisfacturaelectronica.store.StoreManufactura', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/*
@DataSet :
Stores para la lista de materiales para crear productos de manufactura
==============================================================
*/
Ext.define('sisfacturaelectronica.store.ListaMateriales', {
    extend: 'Ext.data.Store',
    requiere:['sisfacturaelectronica.model.DataModelMrp'],
    model   :'sisfacturaelectronica.model.ListaMateriales',
    autoLoad: true,
    autoDestroy: true,
    extraParams:{
        nombre: ''
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/lista_materiales_producto'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});
