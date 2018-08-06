Ext.define('sisfacturaelectronica.view.ventas.ListadoDeCotizaciones', {
    extend: 'Ext.panel.Panel',
    xtype: 'wListadoCotizaciones',
    alias: 'widget.wListadoCotizaciones',
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
        var storeCoti    = Ext.create('sisfacturaelectronica.store.Cotizaciones');
        var storeCotiDet = Ext.create('sisfacturaelectronica.store.CotizacionesDetalle');
        var storeEstado = Ext.create('sisfacturaelectronica.store.BusquedaEstado');

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
                    itemId: 'dgvVentasCotizaciones',
                    reference: 'dgvVentasCotizaciones',
                    store: storeCoti,
                    columnLines: true,
                    sortableColumns: false,
                    requires: [
                        'Ext.grid.selection.SpreadsheetModel',
                        'Ext.grid.plugin.Clipboard'
                    ],
                    emptyText: 'NO HAY REGISTROS PARA MOSTRAR SEGUN EL RANGO DE FECHAS',
                    columns: [
                       {xtype: 'rownumberer'},
                      {
                            text: 'Fecha ',
                            dataIndex: 'vfecha',
                            flex: 0.5,
                            align: 'center'
                        },
                        {
                            text : 'Codigo',
                            dataIndex: 'ctcodigo',
                            flex: 1,
                            align :'center'
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
                            //xtype: 'numbercolumn',
                            text: 'Total',
                            dataIndex: 'valtotalcont',
                            flex: 1,
                            renderer: Ext.util.Format.numberRenderer('0.00'),
                            align: 'right'
                        },
                        {
                            xtype: 'widgetcolumn',
                            width: 50,
                            widget: {
                                xtype: 'button',
                                width: 30,
                                glyph: 0xf044,
                                handler: 'onClickEditarCotizacion'

                            }

                        },
                        {
                            xtype: 'widgetcolumn',
                            width: 50,
                            widget: {
                                xtype: 'button',
                                width: 30,
                                glyph: 0xf014,
                                handler: 'onClickEliminarCotizacion'

                            }

                        }
                    ],

                    listeners: {
                        cellclick: 'onSelectedDetalleCotizacion'
                    }


                }],
                tbar: [{
                    xtype: 'container',
                    bodyPadding: 0,
                    layout: {
                        type: 'hbox',
                    },
                    columnWidth: 10,
                    items: [{
                            xtype: 'label',
                            text: 'Fecha Desde',
                            padding: '5px 0 0 0',
                            border: true,
                            width: 100,
                            height: 25,
                            style: {
                                background: '#6a4b5a',
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: '13px'
                            }
                        }, {
                            xtype: 'datefield',
                            value: new Date(),
                            reference: 'dfDesdeCotizaciones',
                            itemId: 'dfDesdeCotizaciones',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            text: 'Fecha Hasta',
                            padding: '5px 0 0 0',
                            border: true,
                            width: 100,
                            height: 25,
                            style: {
                                background: '#6a4b5a',
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: '13px'
                            }
                        }, {
                            xtype: 'datefield',
                            value: new Date(),
                            reference: 'dfHastaCotizaciones',
                            itemId: 'dfHastaCotizaciones',
                            width: 100
                        },
                        {
                            xtype: 'button',
                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                            tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
                            handler: 'onClickBuscarCotizacionesPorFechas'
                        },
                        {
                            xtype: 'label',
                            text: 'Codigo Cotización',
                            padding: '5px 0 0 0',
                            border: true,
                            width: 150,
                            height: 25,
                            style: {
                                background: '#664a5a',
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: '13px'
                            }
                        },
                        {
                            xtype:'textfield',
                            itemId : 'txtBuscarCodigoCotizacion',
                            flex: 1
                        },
                        {
                            xtype:'button',
                            glyph :sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                            handler:'onClickBuscarCodigoCotizacion'
                        },

                        {
                            xtype: 'label',
                            text: 'Cliente',
                            padding: '5px 0 0 0',
                            border: true,
                            width: 90,
                            height: 25,
                            style: {
                                background: '#664a5a',
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: '13px'
                            }
                        },
                        {
                            xtype:'textfield',
                            itemId : 'txtBuscarNombreCliente',
                            flex:  5
                        },
                        {
                            xtype:'button',
                            glyph :sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                            handler:'onClickBuscarNombreCliente'
                        }      
                                            

                    ]
                }]
            }, {
                xtype: 'panel',
                layout: 'fit',
                collapseDirection: 'right',
                border: false,
                flex: 0.7,
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
                    columns: [
                        {xtype: 'rownumberer'},
                        {
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
                            //xtype:'numbercolumn',
                            text: 'Precio',
                            dataIndex: 'precio',
                            flex: 0.5,
                            align: 'right',
                            renderer: Ext.util.Format.numberRenderer('0.00'),
                            
                        },
                        {

                            xtype:'numbercolumn',
                            text: 'Cantidad',
                            dataIndex: 'cantidad',
                            flex: 0.5,
                            align: 'right'
                        },
                        {

                           // xtype:'numbercolumn',
                            text: 'Total',
                            dataIndex: 'total',
                            flex: 0.5,
                            align: 'right',
                            renderer: Ext.util.Format.numberRenderer('0.00')
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
