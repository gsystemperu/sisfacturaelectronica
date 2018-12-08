Ext.define('sisfacturaelectronica.view.ventas.ListadoClienteFacturacion', {
    extend: 'Ext.panel.Panel',
    xtype: 'wListadoClienteFacturacion',
    alias: 'widget.wListadoClienteFacturacion',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.container.ButtonGroup',
        'Ext.grid.column.*',
        'Ext.form.field.*',
        'Ext.panel.Panel',
        'sisfacturaelectronica.store.DataTemp'
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
    //controller: 'acciones-regcotizacionfacturar',
    initComponent: function () {
        var storeCotiFacturar = Ext.create('sisfacturaelectronica.store.ClienteVentasFacturacion');
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        me = this;
        Ext.apply(this, {
            items: [
                me.getListadoCotizacionesAfacturar(storeCotiFacturar, rowEditing)
            ],
            //bbar:me.getBarraTotales()
        });
        this.callParent();
    },
    getBarraTotales: function () {
        return obj = [
            '->',
            {
                xtype: 'label',
                text: 'TOTAL'
            }, {
                xtype: 'numberfield',
                padding: '0 50 0 15'
            }
        ];
    },
    getListadoCotizacionesAfacturar: function (storeCotiFacturar, rowEditing) {
        return obj = {
            xtype: 'panel',
            flex: 1,
            margin: '0 3 0 0',
            layout: 'fit',
            items: [{
                xtype: 'grid',
                itemId: 'dgvVentasFacturarCliente2',
                reference: 'dgvVentasFacturarCliente2',
                store: storeCotiFacturar,
                columnLines: true,
                sortableColumns: false,
                requires: [
                    'Ext.grid.selection.SpreadsheetModel',
                    'Ext.grid.plugin.Clipboard'
                ],
                viewConfig: {
                    getRowClass: function(record, index, rowParams, ds) {
                        console.log(record.get('estado'));
                        if(record.get('estado') == 7){
                            return "red-row"; 
                        }
                        if(record.get('estado')==2){
                            return "blue-row";
                        }else{
                            return "black-row";
                        }
                       
                    }
                 },
                emptyText: 'NO HAY REGISTROS PARA MOSTRAR SEGUN EL RANGO DE FECHAS',
                columns: [
                    { xtype: 'rownumberer' },
                    {
                        text: 'Fecha',
                        dataIndex: 'fechafact',
                        flex: 0.5,
                        align: 'center'
                    },
                    {
                        text: 'Doc. Interno',
                        dataIndex: 'docinterno',
                        flex: 0.5,
                        align: 'center'
                    },
                    {
                        text: 'Tipo',
                        dataIndex: 'tipodoc',
                        flex: 0.3,
                        align: 'center'
                    },
                    {
                        text: 'F.Pago',
                        dataIndex: 'formapago',
                        flex: 0.7,
                        align: 'center',

                    },
                    {
                        xtype: 'numbercolumn',
                        text: 'Total',
                        dataIndex: 'totalcoti',
                        flex: 0.7,
                        align: 'right'
                    },
                    {
                        xtype: 'numbercolumn',
                        text: 'Acuenta',
                        dataIndex: 'pagoacuenta',
                        flex: 0.7,
                        align: 'right'
                    },
                    {
                        xtype: 'numbercolumn',
                        text: 'Saldo',
                        dataIndex: 'saldopagar',
                        flex: 0.7,
                        align: 'right'
                    },
                    {
                        xtype: 'widgetcolumn',
                        width: 50,
                        widget: {
                            xtype: 'button',
                            width: 30,
                            glyph: 0xf0d6,
                            tooltip: 'INGRESAR PAGOS A CUENTA AL DOCUMENTO',
                            handler: 'onClickIngresarPagoAcuenta'

                        }

                    }
                ]
            }],
            tbar: [

                {
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
                    reference: 'dfDesdeCotizacionesFactura',
                    itemId: 'dfDesde',
                    width: 110
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
                    reference: 'dfHastaCotizacionesFactura',
                    itemId: 'dfHasta',
                    width: 110
                },
                {
                    xtype: 'button',
                    glyph: sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                    tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
                    handler: 'onClickBuscarCotizacionesPorFechas'
                },
                {
                    xtype: 'button',
                    text: 'IMPRIMIR CUENTA',
                    handler: 'onClickImprimirCC'
                },
                {
                    xtype: 'button',
                    text: 'IMPRIMIR LISTADO',
                    handler: 'onClickImprimirListadoCC'
                }


            ]
        };//Fin Objeto
    }
});
