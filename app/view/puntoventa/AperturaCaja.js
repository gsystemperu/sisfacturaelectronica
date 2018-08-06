Ext.define('sisfacturaelectronica.view.puntoventa.AperturaCaja', {
    extend: 'Ext.window.Window',
    alias : 'widget.wApeturaCaja',
    xtype : 'wAperturaCaja',
    itemId : 'wAperturaCaja',
    requires   : [
        'Ext.form.field.*',
        'sisfacturaelectronica.util.*',
        'Ext.grid.*',
        'sisfacturaelectronica.view.puntoventa.AccionesAperturaCaja'
    ],
    config : {
        nombre : '',
        monto  : 0,
        codigo : 0
    },
    margin: 30,
    autoScroll: true,
    controller:'acciones-aperturacaja',
    submitEmptyText : false,
    layout: {
      type: 'hbox',
      pack: 'start',
      align: 'stretch'
    },
    width : 700,
    height : 510,
    autoShow:true,
    modal : true,
    initComponent: function()
    {
        me = this;
        st = Ext.create('sisfacturaelectronica.store.NombreMoneda');
        sh = Ext.create('sisfacturaelectronica.store.ListaAperturaCajaHistorico');
        Ext.apply(me,
        {
          items :[ 
              {
                  xtype:'panel',
                  layout :'fit',
                  flex: 1,
                  items:me.getGrillaPagos(st,me.getCodigo())
              },
              {
                  xtype:'panel',
                  flex: 1,
                  items : me.getGrillaHistorico(sh) 
              }
            ],
          bbar: [
              {
                xtype:'label',
                text : 'Ingresado :'
              },
              {
                xtype:'label',
                itemId :'lblTotalIngresado',
                style: {
                    fontWeight: 'bold',
                    fontSize:20
                }
              },
              '->',
              {
                  xtype: 'button',
                  text: 'Grabar',
                  scale: 'medium',
                  handler: 'onClickGuardarAperturaCaja'
              }
          ]
        }
        );
        me.tbar = me.getTopBar(me.getMonto());
        me.callParent(arguments);
       

    },
    getTopBar :function(__total){
      return __obj = [
        ,'->',
        {
          xtype:'textarea',
          text:'Comentario :',
          itemId : 'txtAperturaCajaComentario',
          style: {
              fontWeight: 'bold'
          }
        }
       /* ,{
          xtype:'label',
          text : __total.toString(),
          style: {
              fontWeight: 'bold'
          }
        }*/
      ];
    },
    getCargarDataGrilla:function(__store){
       __grilla    =  Ext.ComponentQuery.query('#dgvPagoAcuenta')[0].getStore();
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
             xtype:'grid',
             itemId :'dgvAperturaCaja',
             store : __store,
             selModel: 'cellmodel',
             plugins: {
                 ptype: 'cellediting',
                 clicksToEdit: 1
             },flex: 1,
             title : 'Ingresar Monto de Apertura',
             columns:[
               {

                 text : 'Moneda',
                 dataIndex : 'descripcion',
                 align:'center',
                 flex: 2
               },
               { xtype:'numbercolumn',flex:1, align :'right', text:'Cantidad',dataIndex:'monto',
                   editor:{
                    xtype:'numberfield',
                    value : 0,
                    format: '0.00',
                    decimalPrecision: 2,
                    decimalSeparator: '.'
                    }
              }
             
            ],
            listeners: {
                edit: 'onEditorCalcularTotal'
            }

           }
        ]
    },
    getGrillaHistorico:function(s){
        return __obj = [
           {
             xtype:'grid',
             itemId :'dgvApeCajaHis',
             store : s,
             flex: 1,
             title : 'Historial',
             columns:[
               {

                 text : 'Fecha',
                 dataIndex : 'fecha',
                 align:'center',
                 flex: 1
               },
               {

                text : 'Hora',
                dataIndex : 'hora',
                align:'center',
                flex: 1
              },{
                xtype :'numbercolumn',
                text : 'Monto Inicial',
                dataIndex : 'valor',
                align:'center',
                flex: 1
              }
             
            ]
           }
        ]
    }


});
