Ext.define('sisfacturaelectronica.view.mrp.ListadoFormulas', {
    extend: 'Ext.panel.Panel',
    xtype: 'wListadoFormulas',
    alias: 'widget.wListadoFormulas',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.container.ButtonGroup',
        'Ext.grid.column.*',
        'Ext.form.field.*',
        'Ext.panel.Panel',
        'sisfacturaelectronica.view.ventas.AccionesRegCotizacion',
        'sisfacturaelectronica.store.DataTemp'
    ],
    layout: {
        type: 'vbox',
        //pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 0,
    defaults: {
        bodyPadding: 0,
        border: false
    },
    controller: 'acciones-regcotizacion',
    initComponent: function () {
        var storeListaMateriales    = Ext.create('sisfacturaelectronica.store.ListaMateriales');
        var storeCotiDet = Ext.create('sisfacturaelectronica.store.CotizacionesDetalle');

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        Ext.apply(this, {
            items: [{
                xtype: 'panel',
                flex: 1,
                margin: '0 3 0 0',
                layout: 'fit',
                items: [{
                    xtype: 'grid',
                    reference: 'dgvListadoMateriales',
                    itemId   : 'dgvListadoMateriales',
                    store: storeListaMateriales,
                    columnLines: true,
                    sortableColumns: false,
                    requires: [
                        'Ext.grid.selection.SpreadsheetModel',
                        'Ext.grid.plugin.Clipboard'
                    ],
                    emptyText: 'NO HAY REGISTROS PARA MOSTRAR',
                    columns: [
                       {xtype: 'rownumberer'},
                        {
                            text: 'Nombre Producto',
                            dataIndex: 'producto',
                            flex: 2,
                            align: 'left'
                        },
                        {
                            xtype:'numbercolumn',
                            text: 'Cantidad',
                            dataIndex: 'cantidad',
                            flex: 1,
                            align: 'left'
                        },
                        {
                          xtype:'numbercolumn',
                            text: 'Unidad Medida',
                            dataIndex: 'unidadmedida',
                            flex: 1,
                            align: 'left'
                        },

                        {
                            text: 'Estado',
                            dataIndex: 'descripcion',
                            flex: 1,
                            align: 'center',
                            renderer : function(value,style){
                               if(value=='CT ANULADA'){
                                 return '<span style="color:red;">'+value.toString()+'</span>'
                               }else{
                                 return value;
                               }
                            }
                        },
                        {
                            xtype: 'widgetcolumn',
                            width: 50,
                            widget: {
                                xtype: 'button',
                                width: 30,
                                glyph: 0xf044,
                                handler: 'onClickEditarListadoFormula'
                            }

                        },
                        {
                            xtype: 'widgetcolumn',
                            width: 50,
                            widget: {
                                xtype: 'button',
                                width: 30,
                                glyph: 0xf014,
                                handler: 'onClickEliminarListadoFormula'
                            }
                        }
                    ],

                    listeners: {
                        cellclick: 'onSelectedDetalleCotizacion'
                    }


                }]
            }, {
                xtype: 'panel',
                layout: 'fit',
                collapseDirection: 'right',
                border: false,
                flex: 1,
                title : 'DETALLE DE MATERIALES DE LA FORMULA',
                items: [{
                    xtype: 'grid',
                    reference: 'dgvDetalleCotizacion',
                    itemId: 'dgvDetalleCotizacion',
                    store: storeCotiDet,
                    columnLines: true,
                    sortableColumns: false,
                    requires: [
                        'Ext.grid.selection.SpreadsheetModel',
                        'Ext.grid.plugin.Clipboard'
                    ],
                    columns: [{
                            text: 'Producto',
                            dataIndex: 'descripcion',
                            flex: 2,
                            align: 'left'
                        },
                        {
                            text: 'Presentacion',
                            dataIndex: 'presentacion',
                            flex: 1,
                            align: 'left'
                        },
                        {
                            xtype:'numbercolumn',
                            text: 'Precio',
                            dataIndex: 'precio',
                            flex: 0.5,
                            align: 'right'
                        },
                        {

                            xtype:'numbercolumn',
                            text: 'Cantidad',
                            dataIndex: 'cantidad',
                            flex: 0.5,
                            align: 'right'
                        },
                        {

                            xtype:'numbercolumn',
                            text: 'Total',
                            dataIndex: 'total',
                            flex: 0.5,
                            align: 'right'
                        }

                    ]
                }]



            }]
        });
        this.callParent();
        /*storeCoti.getProxy().extraParams = {
            vDesde: Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
            vHasta: Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
            vPersona: ''
        };
        storeCoti.load(1);*/
    }
});
