
Ext.define('sisfacturaelectronica.view.dashboard.Almacen',{
    extend: 'Ext.panel.Panel',

    requires: [
        'sisfacturaelectronica.view.dashboard.AlmacenController',
        'sisfacturaelectronica.view.dashboard.AlmacenModel'
    ],

    controller: 'dashboard-almacen',
    viewModel: {
        type: 'dashboard-almacen'
    },

    html: 'Hello, World!!'
});
