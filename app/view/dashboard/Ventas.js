
Ext.define('sisfacturaelectronica.view.dashboard.Ventas',{
    extend: 'Ext.panel.Panel',

    requires: [
        'sisfacturaelectronica.view.dashboard.VentasController',
        'sisfacturaelectronica.view.dashboard.VentasModel'
    ],

    controller: 'dashboard-ventas',
    viewModel: {
        type: 'dashboard-ventas'
    },

    html: 'Hello, World!!'
});
