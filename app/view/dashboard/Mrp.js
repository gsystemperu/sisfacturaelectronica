
Ext.define('sisfacturaelectronica.view.dashboard.Mrp',{
    extend: 'Ext.panel.Panel',

    requires: [
        'sisfacturaelectronica.view.dashboard.MrpController',
        'sisfacturaelectronica.view.dashboard.MrpModel'
    ],

    controller: 'dashboard-mrp',
    viewModel: {
        type: 'dashboard-mrp'
    },

    html: 'Hello, World!!'
});
