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
        'sisfacturaelectronica.store.DataTemp',
        'sisfacturaelectronica.view.ventas.AccionesListadoClienteFacturacion'
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
    controller: 'acciones-listadoclientefacturacion',
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
            bbar:me.getBarraTotales()
        });
        this.callParent();
    },
    getBarraTotales: function () {
        return obj = [
            
            '->',
            {
                xtype:'button',
                text : 'Salir',
                scale : 'large',
                handler :'onClickSalir'
            },
         /*   {
                xtype: 'container',
                flex:1,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults:{
                    fieldStyle: 'text-align: right;font-size:20px;',
                    labelStyle: 'padding : 10px 5px 5px 5px ;background-color:#6A4B5A;border:false;color:#FFFFFF;font-size: 15px;',
                    labelAlign: 'left',
                    value: "0.00",
                    minValue: 0,
                    step: 0.01,
                    readOnly: true,
                    width: 180,
                    labelWidth: 120,
                },
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Total',
                        itemId: 'txtTotalGeneral',
                
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Total Acuenta',
                        itemId: 'txtTotalAcuenta',
                        

                       
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Total Saldo',
                        itemId: 'txtTotalSaldo',
                        
                       
                    }
                ]
            }*/
        ];
    },
    getListadoCotizacionesAfacturar: function (storeCotiFacturar, rowEditing) {
        return obj = {
            xtype: 'panel',
            flex: 1,
            margin: '0 3 0 0',
            layout: 'fit',
            items: [
                {
                    xtype:'hiddenfield',
                    itemId :'idclientefac',
                    reference :'idclientefac',
                    value : 0
                },
                {
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
                        text: 'Pagos',
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
                            reference: 'dfDesdeCotizacionesFactura',
                            itemId: 'dfDesde',
                            fieldLabel : 'Fecha Desde',
                           
                        },
                        {
                            xtype: 'datefield',
                            value: new Date(),
                            flex:1,
                            reference: 'dfHastaCotizacionesFactura',
                            itemId: 'dfHasta',
                            fieldLabel : 'Fecha Hasta'
                        },
                        {
                            xtype: 'button',
                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                            tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
                            handler: 'onClickBuscarFechas',
                            padding:'0 5 0 0'
                        },
                        {
                            xtype: 'button',
                            text: 'IMPRIMIR LISTADO',
                            handler: 'onClickImprimirListadoCC'
                        }

                    ]
                }
            ]
        };
    }
});
