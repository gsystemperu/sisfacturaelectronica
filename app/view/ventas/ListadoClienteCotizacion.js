Ext.define('sisfacturaelectronica.view.ventas.ListadoClienteCotizacion', {
    extend: 'Ext.panel.Panel',
    xtype: 'wListadoClienteCotizacion',
    alias: 'widget.wListadoClienteCotizacion',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.container.ButtonGroup',
        'Ext.grid.column.*',
        'Ext.form.field.*',
        'Ext.panel.Panel',
        'sisfacturaelectronica.store.DataTemp',
        'sisfacturaelectronica.view.ventas.AccionesListadoClienteCotizacion'
    ],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 0,
    defaults: {
        bodyPadding: 0,
        border: false
    },
    controller : 'acciones-listadoclientecotizacion',
    initComponent: function () {
        var storeCoti    = Ext.create('sisfacturaelectronica.store.Cotizaciones');
        var storeCotiDet = Ext.create('sisfacturaelectronica.store.CotizacionesDetalle');

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        Ext.apply(this, {
            items: [
                {
                    xtype:'hiddenfield',
                    itemId : 'idcliente',
                    reference: 'idcliente',
                    value : 0
                },
                {
                xtype: 'panel',
                flex: 1,
                margin: '0 3 0 0',
                layout: 'fit',
                items: [{
                    xtype: 'grid',
                    itemId: 'dgvVentas',
                    reference: 'dgvVentas',
                    store: storeCoti,
                    columnLines: true,
                    sortableColumns: false,
                    requires: [
                        'Ext.grid.selection.SpreadsheetModel',
                        'Ext.grid.plugin.Clipboard'
                    ],
                    viewConfig: {
                        getRowClass: function(record, index, rowParams, ds) {
                            if(record.get('estado') == 7 || record.get('estado') == 4){
                                return "red-row"; 
                            }
                            else{
                                return "black-row";
                            }
                           
                        }
                     },
                    emptyText: 'NO HAY REGISTROS PARA MOSTRAR SEGUN EL RANGO DE FECHAS',
                    columns: [
                       {xtype: 'rownumberer'},
                      {
                            text: 'Fecha ',
                            dataIndex: 'fechacoti',
                            flex: 0.5,
                            align: 'center'
                        },
                        {
                            text: 'Nombre / Razon Social',
                            dataIndex: 'nomcompleto',
                            flex: 2
                        },
                        {
                            text: 'RUC',
                            dataIndex: 'numrucper',
                            flex: 0.7,
                            align: 'right',

                        },
                        {
                            xtype: 'numbercolumn',
                            text: 'Total',
                            dataIndex: 'totalcoti',
                            flex: 1,
                          
                            align: 'right'
                        }
                    ],
                    listeners: {
                        cellclick: 'onSelectedDetalleCotizacion'
                    }


                }],
                tbar: [
                    {
                    xtype: 'container',
                    bodyPadding: 0,
                    layout:{
                        type:'hbox',
                        align :'stretch'
                    },
                    defaults : {
                        fieldStyle: 'text-align: right;font-size:15px;',
                        labelStyle: 'padding : 5px 5px 5px 10px ;background-color:#6A4B5A;border:false;color:#FFFFFF;font-size: 13px; font-weight: bold; ',
                        padding : '0 5 0 0'
                       
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            value: new Date(),
                            flex:1,
                            reference: 'dfDesdeCotizacionesCliente',
                            itemId: 'dfDesde',
                            fieldLabel : 'Fecha Desde',
                           
                        },
                        {
                            xtype: 'datefield',
                            value: new Date(),
                            flex:1,
                            reference: 'dfHastaCotizacionesCliente',
                            itemId: 'dfHasta',
                            fieldLabel : 'Fecha Hasta'
                        },
                        {
                            xtype: 'button',
                            padding :0,
                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                            tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
                            handler: 'onClickBuscarFechas'
                        }

                    ]
                }]
                }, 
                {
                xtype: 'panel',
                layout: 'fit',
                collapseDirection: 'right',
                border: false,
                flex: 0.7,
                bbar : [
                    '->',
                    { 
                        text : 'Salir',
                        scale : 'large',
                        handler : 'onClickSalir'
                    }
                ],
                items: [{
                    xtype: 'grid',
                    reference: 'dgvDetalleCotizacionCliente',
                    itemId: 'dgvDetalleCotizacionCliente',
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
                            xtype : 'numbercolumn',
                            text: 'Precio',
                            dataIndex: 'precio',
                            flex: 0.5,
                            align: 'right'
                        },
                        {
                            xtype : 'numbercolumn',
                            text: 'Cantidad',
                            dataIndex: 'cantidad',
                            flex: 0.5,
                            align: 'right'
                        },
                        {
                            xtype : 'numbercolumn',
                            text: 'Total',
                            dataIndex: 'total',
                            flex: 0.5,
                            align: 'right'
                        }

                    ]
                }]



                }
            ]
        });
        this.callParent();
   }
});
