Ext.define('sisfacturaelectronica.view.ventas.ListadoDeCotizacionesFacturar', {
    extend: 'Ext.panel.Panel',
    xtype: 'wListadoCotizacionesFacturar',
    alias: 'widget.wListadoCotizacionesFacturar',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.container.ButtonGroup',
        'Ext.grid.column.*',
        'Ext.form.field.*',
        'Ext.panel.Panel',
        'sisfacturaelectronica.view.ventas.AccionesRegCotizacionesFacturar',
        'sisfacturaelectronica.store.DataTemp'
    ],
    layout: {
        type: 'fit',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 0,
    defaults: {
        bodyPadding: 0,
        border: false
    },
    controller: 'acciones-regcotizacionfacturar',
    initComponent: function () {
        var storeCotiFacturar    = Ext.create('sisfacturaelectronica.store.CotizacionesFacturar');
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        me = this;
        Ext.apply(this, {
            items: [
              me.getListadoCotizacionesAfacturar(storeCotiFacturar,rowEditing),
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
            itemId: 'dgvVentasFacturar',
            reference: 'dgvVentasFacturar',
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
                groupHeaderTpl: 'Fecha : {name}',
                hideGroupedHeader: true,
                enableGroupingMenu: false
            }],
            viewConfig: {
                getRowClass: function(record, index, rowParams, ds) {
                    console.log(record.get('estado'));
                    if(record.get('estado') == 7 || record.get('estado') == 4){
                        return "red-row"; 
                    }
                    if(record.get('estado')==2){
                        return "blue-row";
                    }else{
                        return "black-row";
                    }
                   
                }
             },
            columns: [
               {xtype: 'rownumberer',flex:0.3,align:'center'},
              {
                    text: 'F.Cotizacion',
                    dataIndex: 'fechacoti',
                    flex: 0.5,
                    align: 'center',
                    hidden:true
                },
                {
                        text: 'F.Facturado',
                        dataIndex: 'fechafact',
                        flex: 0.5,
                        align: 'center',
                        hidden:true
                },
                {
                        text: 'Doc. Numero',
                        dataIndex: 'docinterno',
                        flex: 0.5,
                        align: 'center'
                },
                {
                    text: 'Nombre / Razon Social',
                    dataIndex: 'nomcompleto',
                    flex: 2
                },
                {
                    text: 'Estado',
                    dataIndex: 'descripcion',
                    flex: 0.7,
                    align: 'center',
                    hidden:true,
                    renderer : function(value,meta, rec, rowIndex, colIndex, store){
                        r = meta.record.data;
                       if(value=='CT ANULADA' || value=='VD ANULADO'){
                          return '<span style="color:red;">'+value.toString()+'</span>';
                       }else if(value=='CT CONFIRMADA'){
                          return '<span style="color:#FF9800;">'+value.toString()+'</span>'
                       }else{
                           if(r.idcoti == 0){
                                return '<span style="color:DarkSlateBlue;"><b>VD FACTUADA</b></span>';
                           }else{
                                return '<span style="color:DarkSlateBlue;"><b>'+value.toString()+'</b></span>';
                           }
                         
                       }
                    }
                },
                {
                    text: 'F.Pago',
                    dataIndex: 'formapago',
                    flex: 0.7,
                    align: 'center',
                    hidden:true

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
                        t = v - metaData.record.data.totalcotianulado;
                        return t.toFixed(2);
                    }
                   
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Anulado',
                    dataIndex: 'totalcotianulado',
                    flex: 0.7,
                    align: 'right',
                    hidden:true,
                    renderer:Ext.util.Format.numberRenderer('0.00'),
                    summaryType: 'sum',
                    summaryRenderer: function(v,summaryData,field,metaData){
                        return v.toFixed(2);
                    }
                   
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Pagos',
                    dataIndex: 'pagoacuenta',
                    flex: 0.7,
                    align: 'right',
                    hidden:false,
                    renderer: Ext.util.Format.numberRenderer('0.00'),
                    summaryType: 'sum',
                    summaryRenderer: function(v){
                        return v.toFixed(2);
                    }
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Saldo',
                    dataIndex: 'saldopagar',
                    flex: 0.7,
                    align: 'right',
                    hidden:true,
                    renderer: Ext.util.Format.numberRenderer('0.00'),
                    summaryType: 'sum',
                    summaryRenderer: function(v){
                        return v.toFixed(2);
                    }
                },
                {
                    xtype:'actioncolumn',
                    flex : 0.3,
                    text : 'Env.',
                    align: 'center',
                    items:[
                    {   tooltip :'Guia Remisión[ Registrado o Enviado a cliente]',
                         getClass:function(v,meta,rec){
                             if(rec.get('idguia')>0){
                                 return 'x-mostrar-x-icon-lote-pedido';
                             }else{
                                 return  ''; // 'x-mostrar-x-icon-bandera-amarilla';
                             }

                         }
                    }]
                },
                {
                    flex : 1,
                    text: 'Est.Sunat',
                    dataIndex : 'estadosunat',
                },
                {
                    flex : 0.5,
                    text: 'Publicado',
                    dataIndex : 'publicado',
                },
                {
                    xtype: 'widgetcolumn',
                    width: 50,
                    widget: {
                        xtype: 'button',
                        width: 30,
                        glyph: 0xf0d6,
                        tooltip : 'INGRESAR PAGOS A CUENTA AL DOCUMENTO',
                        handler: 'onClickIngresarPagoAcuenta'

                    }

                },
                {
                    xtype: 'widgetcolumn',
                    width: 50,
                    widget: {
                        xtype: 'button',
                        width: 30,
                        glyph: 0xf014,
                        handler: 'onClickEliminarcotizacionFacturar'

                    }

                }
               
            ],
            listeners: {
                celldblclick: 'onClickVerCotizacionFactura'
            }
        }],
        tbar: [
            {
                xtype: 'label',
                text: 'Fecha Desde',
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
                text  :'Reportes',
                tooltip: 'Listado de reportes de venta',
                menu: [
                    {
                        text:'Pdf Resumen de ventas',
                        handler : 'onClickResumenVentasAdmin',
                        glyph : 0xf1c1
                        
                    },
                    {
                        text:'Excel Resumen ventas',
                        handler : 'onClickResumenVentasExcel',
                        glyph : 0xf1c3
                        
                    }
                ]
            },
           
            {
                xtype:'button',
                text : 'Enviar a Facturador',
                tooltip : 'Se vuelve a generar el TXT o XML para enviar al facturador sunat',
                handler : 'onClickGenTxtfact'
            },
            {
                xtype:'button',
                text : 'Actualizar estado sunat',
                tooltip : 'Actualiza los estados de los documentos en el facturador',
                handler : 'onClickActEstado'
            }
      
        ]
      };//Fin Objeto
    },
    
});
