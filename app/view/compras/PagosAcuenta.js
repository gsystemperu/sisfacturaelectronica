Ext.define('sisfacturaelectronica.view.compras.PagosAcuenta', {
    extend: 'Ext.window.Window',
    alias : 'widget.wCompraPagosAcuenta',
    xtype : 'wCompraPagosAcuenta',
    itemId : 'wCompraPagosAcuenta',
    requires   : [
        'Ext.form.field.*',
        'sisfacturaelectronica.util.*',
        'Ext.grid.*',
        'sisfacturaelectronica.view.compras.AccionesPagosAcuenta'

    ],
    config : {
        nombre : '',
        monto  : 0,
        codigo : 0
    },
    margin: 30,
    autoScroll: true,
    controller:'acciones-comprapagosacuenta',
    submitEmptyText : false,
    layout: {
      type: 'fit',
      pack: 'start',
      align: 'stretch'
    },
    width : 800,
    height : 500,
    autoShow:true,
    modal : true,
    initComponent: function()
    {
        me = this;
        s = Ext.create('sisfacturaelectronica.store.PagosAcuenta');
        m = Ext.create('sisfacturaelectronica.store.MetodosPago');
        me.title = me.getNombre();
        Ext.apply(me,
        {
          items :me.getGrillaPagos(s,me.getCodigo(),m),
          bbar: [
              {
                xtype:'label',
                text : 'Ingresado :',
                style: {
                    fontWeight: 'bold',
                    fontSize: '15px;'
                }
              },
              {
                xtype:'label',
                itemId :'lblTotalIngresado',
                style: {
                    fontWeight: 'bold',
                    fontSize: '18px;'
                }
              },
              '->',
              {
                  xtype: 'button',
                  text: 'Grabar',
                  scale: 'medium',
                  handler: 'onClickGuardarPagoAcuenta'
              }
          ]
        });
        me.tbar = me.getTopBar(me.getMonto());
        me.callParent(arguments);
        Ext.Ajax.request({
              url : sisfacturaelectronica.util.Rutas.ordenCompraBuscarPagoAcuenta,
              params:{
                idordencompra : me.getCodigo()
              },
              success:function(response){
                 __data = Ext.JSON.decode(response.responseText);
                 if(__data.data){
                   me.getCargarDataGrilla(__data.data);
                 }
              }
        });

    },
    getTopBar :function(__total){
      return __obj = [
        {
          xtype:'button',
          text : 'INGRESAR PAGO',
          handler:'onClickIngresarNuevoPago'
        },'->',
        {
          xtype:'label',
          text:'Total :',
          style: {
              fontWeight: 'bold'
          }
        },{
          xtype:'label',
          text : __total.toString(),
          style: {
              fontWeight: 'bold'
          }
        }
      ];
    },
    getCargarDataGrilla:function(__store){
        g = Ext.ComponentQuery.query('#dgvPagoAcuentaOC')[0];
        gr = g.getStore();
        s = 0;
        Ext.each(__store, function (row, i) {
           da = {
                "fecha": row.fecha,  //Ext.Date.format(row.fecha, 'Y-m-d') ,
                "monto": row.monto,
                "metodopago": row.metodopago,
                "facprov": row.facprov
            };
            gr.insert(0, da);
            s = s + row.monto;
        });
        Ext.ComponentQuery.query('#lblTotalIngresado')[0].setText(s.toString());
    },
    getGrillaPagos:function(__store,__idfactura,mp){
        
        return __obj = [
           {
             xtype  :'hiddenfield',
             itemId :'idfactura',
             value  : __idfactura
           },
           {
             xtype:'grid',
             itemId :'dgvPagoAcuentaOC',
             store : __store,
             selModel: 'cellmodel',
             plugins: {
                 ptype: 'cellediting',
                 clicksToEdit: 1
             },
             columns:[
               {
                 xtype:'datecolumn',
                 flex:1,
                 align:'center',
                 text:'Fecha',
                 dataIndex:'fecha',
                 format: 'd/m/Y',
                 editor:{
                  xtype:'datefield',
                  value : new Date(),
                  format :'d/m/Y'
                }
              },
              {
                flex:2,
                align:'center',
                text:'Metodo de pago',
                dataIndex:'metodopago',
                editor:{
                 xtype:'combo',
                 store : mp,
                 valueField : 'descripcion',
                 displayField :'descripcion',
                 editable :false,
                 queryMode :'local'
                }
             },
             {
                flex:1,
                align:'center',
                text:'Factura Proveedor',
                dataIndex:'facprov',
                editor:{
                    xtype:'textfield',
                    value : '000-0000'
                }
                
             },
               { xtype:'numbercolumn',flex:1, align :'right', text:'Monto',dataIndex:'monto',
                   editor:{
                    xtype:'numberfield',
                    value : 0,
                    format: '0.00',
                    decimalPrecision: 2,
                    decimalSeparator: '.'
                    }
              },
              {
                  xtype: 'widgetcolumn',
                  flex: 0.5,
                  widget: {
                      xtype: 'button',
                      width: 24,
                      glyph: 0xf014,
                      listeners: {
                          click: 'onClickEliminarPago'
                      }
                  }

              }
            ],
            listeners: {
                edit: 'onEditorCalcularTotal'
            }

           }
        ]
    }

});



/*Ext.define('sisfacturaelectronica.view.compras.PagosAcuenta', {
    extend: 'Ext.window.Window',
    alias : 'widget.wCompraPagosAcuenta',
    xtype : 'wCompraPagosAcuenta',
    itemId : 'wCompraPagosAcuenta',
    requires   : [
        'Ext.form.field.*',
        'sisfacturaelectronica.util.*',
        'Ext.grid.*',
        'sisfacturaelectronica.view.compras.AccionesPagosAcuenta'

    ],
    config : {
        nombre : '',
        monto  : 0,
        codigo : 0
    },
    margin: 30,
    autoScroll: true,
    controller:'acciones-comprapagosacuenta',
    submitEmptyText : false,
    layout: {
      type: 'fit',
      pack: 'start',
      align: 'stretch'
    },
    width : 300,
    height : 500,
    autoShow:true,
    modal : true,
    initComponent: function()
    {
        me = this;
        __store = Ext.create('sisfacturaelectronica.store.PagosAcuenta');
        me.title = me.getNombre();
        Ext.apply(me,
        {
          items :me.getGrillaPagos(__store,me.getCodigo()),
          bbar: [
              {
                xtype:'label',
                text : 'Ingresado :'
              },
              {
                xtype:'label',
                itemId :'lblTotalIngresado',
                style: {
                    fontWeight: 'bold'
                }
              },
              '->',
              {
                  xtype: 'button',
                  text: 'Grabar',
                  scale: 'medium',
                  handler: 'onClickGuardarPagoAcuenta'
              }
          ]
        });
        me.tbar = me.getTopBar(me.getMonto());
        me.callParent(arguments);
        Ext.Ajax.request({
              url : sisfacturaelectronica.util.Rutas.ordenCompraBuscarPagoAcuenta,
              params:{
                idordencompra : me.getCodigo()
              },
              success:function(response){
                 __data = Ext.JSON.decode(response.responseText);
                 if(__data.data){
                   me.getCargarDataGrilla(__data.data);
                 }
              }
        });

    },
    getTopBar :function(__total){
      return __obj = [
        {
          xtype:'button',
          text : 'INGRESAR PAGO',
          handler:'onClickIngresarNuevoPago'
        },'->',
        {
          xtype:'label',
          text:'Total :',
          style: {
              fontWeight: 'bold'
          }
        },{
          xtype:'label',
          text : __total.toString(),
          style: {
              fontWeight: 'bold'
          }
        }
      ];
    },
    getCargarDataGrilla:function(__store){
       __grilla    =  Ext.ComponentQuery.query('#dgvPagoAcuentaOC')[0].getStore();
       __suma      = 0;
       Ext.each(__store,function(row,i){
          __dato = {
              "fecha" : row.fecha,  //Ext.Date.format(row.fecha, 'Y-m-d') ,
              "monto" : row.monto
          };
          __grilla.insert(0,__dato);
          __suma   = __suma + row.monto;
       });
       Ext.ComponentQuery.query('#lblTotalIngresado')[0].setText(__suma.toString());
    },
    getGrillaPagos:function(__store,__idfactura){
        return __obj = [
           {
             xtype  :'hiddenfield',
             itemId :'idfactura',
             value  : __idfactura
           },
           {
             xtype:'grid',
             itemId :'dgvPagoAcuentaOC',
             store : __store,
             selModel: 'cellmodel',
             plugins: {
                 ptype: 'cellediting',
                 clicksToEdit: 1
             },
             columns:[
               { xtype:'datecolumn', flex:1, align:'center', text:'Fecha',dataIndex:'fecha',
                format: 'd/m/Y',
                editor:{
                  xtype:'datefield',
                  value : new Date(),
                  format :'d/m/Y'
                }
              },
               { xtype:'numbercolumn',flex:1, align :'right', text:'Monto',dataIndex:'monto',
                   editor:{
                    xtype:'numberfield',
                    value : 0,
                    format: '0.00',
                    decimalPrecision: 2,
                    decimalSeparator: '.'
                    }
              },
              {
                  xtype: 'widgetcolumn',
                  flex: 0.5,
                  widget: {
                      xtype: 'button',
                      width: 24,
                      glyph: 0xf014,
                      listeners: {
                          click: 'onClickEliminarPago'
                      }
                  }

              }
            ],
            listeners: {
                edit: 'onEditorCalcularTotal'
            }

           }
        ]
    }

});
*/