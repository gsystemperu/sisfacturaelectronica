
Ext.define('sisfacturaelectronica.view.dashboard.Compras',{
    extend: 'Ext.panel.Panel',

    requires: [
        'sisfacturaelectronica.view.dashboard.ComprasController',
        'sisfacturaelectronica.view.dashboard.ComprasModel'
    ],

    controller: 'dashboard-compras',
    viewModel: {
        type: 'dashboard-compras'
    },

    html: 'Hello, World!!'
});
