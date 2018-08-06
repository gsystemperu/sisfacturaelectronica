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
        //'sisfacturaelectronica.view.ventas.AccionesRegCotizacionesFacturar',
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
    //controller: 'acciones-regcotizacionfacturar',
    initComponent: function () {
        var storeCotiFacturar    = Ext.create('sisfacturaelectronica.store.ClienteVentasFacturacion');

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
            itemId: 'dgvVentasFacturarCliente2',
            reference: 'dgvVentasFacturarCliente2',
            store: storeCotiFacturar,
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
               /*{
                   text: 'Nombre / Razon Social',
                   dataIndex: 'nomcompleto',
                   flex: 1.5
               },*/
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
                      if(value=='CT ANULADA' || value=='VD ANULADO'){
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
                       tooltip : 'INGRESAR PAGOS A CUENTA AL DOCUMENTO',
                       handler: 'onClickIngresarPagoAcuenta'

                   }

               },
                /*{
                    xtype: 'widgetcolumn',
                    width: 50,
                    widget: {
                        xtype: 'button',
                        width: 30,
                        glyph: 0xf014,
                        handler: 'onClickEliminarcotizacionFacturar'

                    }

                }*/
            ]
        }],
        tbar: [{
            xtype: 'container',
            bodyPadding: 0,
            layout: 'hbox',
            columnWidth: 10,
            items: [

              /*  {
                  xtype:'combo',
                  fieldLabel :'Filtros',
                  padding : '0 10 0 10',
                },*/
                {
                  xtype:'button',
                  text : 'IMPRIMIR CUENTA',
                  handler : 'onClickImprimirCC'
                },
                {
                  xtype:'button',
                  text : 'IMPRIMIR LISTADO',
                  handler:'onClickImprimirListadoCC'
                }

            ]
        }]
      };//Fin Objeto
    }
});
