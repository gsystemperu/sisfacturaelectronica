Ext.define('sisfacturaelectronica.view.puntoventa.ListadoPdv', {
    extend: 'Ext.panel.Panel',
    xtype: 'wListadoPdv',
    alias: 'widget.wListadoPdv',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.container.ButtonGroup',
        'Ext.grid.column.*',
        'Ext.form.field.*',
        'Ext.panel.Panel',
        'sisfacturaelectronica.view.puntoventa.AccionesListadoPdv',
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
    controller: 'acciones-listadopdv',
    initComponent: function () {
        var storeCotiFacturar    = Ext.create('sisfacturaelectronica.store.PuntoVentaPagos');

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        me = this;
        Ext.apply(this, {
            items: [
              me.getListadoCotizacionesAfacturar(storeCotiFacturar,rowEditing)
            ],
            //bbar:me.getBarraTotales()
        });
        this.callParent();
    },
    getBarraTotales:function(){
      return obj = [
          '->',
          {
            xtype:'label',
            text :'TOTAL'
          },{
            xtype:'numberfield',
            padding:'0 50 0 15'
          }
      ];
    },
    getListadoCotizacionesAfacturar:function(storeCotiFacturar,rowEditing){
      return obj = {
        xtype: 'panel',
        flex: 1,
        margin: '0 3 0 0',
        layout: 'fit',
        items: [{
            xtype: 'grid',
            itemId: 'dgvVentasFacturarPdv',
            reference: 'dgvVentasFacturarPdv',
            store: storeCotiFacturar,
            columnLines: true,
            sortableColumns: false,
            requires: [
                'Ext.grid.selection.SpreadsheetModel',
                'Ext.grid.plugin.Clipboard'
            ],
            emptyText: 'NO HAY REGISTROS PARA MOSTRAR SEGUN EL RANGO DE FECHAS',
            features: [{
                id: 'group',
                ftype: 'groupingsummary',
                groupHeaderTpl: 'Fecha Venta: {name}',
                hideGroupedHeader: true,
                enableGroupingMenu: false
            }],
            columns: [
                {
                        text: 'F.Facturado',
                        dataIndex: 'fechafact',
                        flex: 0.5,
                        align: 'center'
                },
                {
                        text: 'Cod.Venta',
                        dataIndex: 'idfacturacion',
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
                    text: 'Nombre / Razon Social',
                    dataIndex: 'nomcompleto',
                    flex: 1.5
                },
                /*{
                    text: 'RUC',
                    dataIndex: 'numrucper',
                    flex: 0.5,
                    align: 'right',

                },*/
                {
                    text: 'Estado',
                    dataIndex: 'descripcion',
                    flex: 0.7,
                    align: 'center',
                    renderer : function(value,style){
                       if(value=='CT ANULADA'){
                          return '<span style="color:red;">'+value.toString()+'</span>'
                       }else if(value=='CT CONFIRMADA'){
                          return '<span style="color:#FF9800;">'+value.toString()+'</span>'
                       }else{
                         return '<span style="color:DarkSlateBlue;"><b>'+value.toString()+'</b></span>';
                       }
                    }
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
                    align: 'right',
                    renderer:Ext.util.Format.numberRenderer('0.00'),
                    summaryType: 'sum',
                    summaryRenderer: function(v,summaryData,field,metaData){
                       // t = v - metaData.record.data.totalcotianulado;
                        return v.toFixed(2);
                    }
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Acuenta',
                    dataIndex: 'pagoacuenta',
                    flex: 0.7,
                    align: 'right',
                    renderer:Ext.util.Format.numberRenderer('0.00'),
                    summaryType: 'sum',
                    summaryRenderer: function(v,summaryData,field,metaData){
                        return v.toFixed(2);
                    }
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Saldo',
                    dataIndex: 'saldopagar',
                    flex: 0.7,
                    align: 'right',
                    renderer:Ext.util.Format.numberRenderer('0.00'),
                    summaryType: 'sum',
                    summaryRenderer: function(v,summaryData,field,metaData){
                        return v.toFixed(2);
                    }
                },
                {
                    xtype: 'widgetcolumn',
                    width: 50,
                    widget: {
                        xtype: 'button',
                        width: 30,
                        glyph: 0xf0d6,
                        tooltip : 'INGRESAR PAGOS A CUENTA AL DOCUMENTO',
                        handler: 'onClickIngresarPagoAcuentaPdv'

                    }

                },
                {
                    xtype: 'widgetcolumn',
                    width: 50,
                    widget: {
                        xtype: 'button',
                        width: 30,
                        glyph: 0xf014,
                        handler: 'onClickEliminarPagoAcuentaPdv'

                    }

                }
            ]
        }],
        tbar: [{
            xtype: 'container',
            bodyPadding: 0,
            layout: 'hbox',
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
                    reference: 'dfDesde',
                    itemId: 'dfDesde',
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
                    reference: 'dfHasta',
                    itemId: 'dfHasta',
                    width: 100
                },
                {
                    xtype: 'button',
                    glyph: sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                    tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
                    handler: 'onClickBuscarCotizacionesPorFechas'
                },
                {
                    xtype: 'button',
                    text : 'Visualizar Venta',
                    tooltip: 'Vista Previa del documento de venta',
                    handler: 'onClickVisualizarVenta'
                },
                {
                    xtype: 'button',
                    text  :'Re-Imprimir',
                    tooltip: 'Imprime el comprobante de la venta!',
                    handler: 'onClickImprimirComprobante'
                }
            ]
        },
        '->',
        {
            xtype: 'button',
            text  :'Impresion',
            tooltip: 'Listado de reportes de venta de caja',
            menu: [
                {
                    text:'Resumen Ventas (Ticketera)',
                    handler: 'onClickResumenticketera'
                },
                {
                    text:'Resumen Ventas (A4)',
                    handler: 'onClickImprimirListado'
                }
            ]
        },{
            xtype: 'button',
            text  :'Cierre de Caja',
            tooltip: 'Cierre de caja',
            handler: 'onClickCierreCaja'
        }
        ]
      };//Fin Objeto
    }
});
