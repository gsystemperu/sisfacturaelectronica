
Ext.define('sisfacturaelectronica.view.dashboard.PuntoVenta',{
    extend: 'Ext.panel.Panel',

    requires: [
        'sisfacturaelectronica.view.dashboard.PuntoVentaController',
        'sisfacturaelectronica.view.dashboard.PuntoVentaModel'
    ],

    controller: 'dashboard-puntoventa',
    viewModel: {
        type: 'dashboard-puntoventa'
    },

    html: 'Hello, World!!'
});
