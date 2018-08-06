Ext.define('sisfacturaelectronica.view.ventas.Imprimir', {
    extend:'Ext.window.Window',
    xtype :'wImprimir',
    require:[
      'Ext.form.*',
      'sisfacturaelectronica.view.ventas.AccionesRegCotizacion'
    ],
    layout:'anchor',
    width :350,
    height:190,
    autoShow:'true',
    padding: 10,
    //modal : true,
    title :'Imprimir Cotizacion',
    controller:'acciones-regcotizacion',
    initComponent:function(){
      Ext.apply(this,{
          items: this.getItems(),
          bbar : this.getToolBar()
      });
      this.callParent();
    },
    getToolBar:function(){
      return obj =[
        '->',
        {
          xtype:'button',
          text :'Imprimir',
          iconCls: 'fa fa-file-pdf-o',
          handler:'onClickImprimirPDFCotizacionFormato'
        }
      ]
    },
    getItems:function(){
      var storeOrientacion = Ext.create('sisfacturaelectronica.store.PosicionReporte');
      var storeFormato     = Ext.create('sisfacturaelectronica.store.FormatoReporte');
      var storeFirmas     = Ext.create('sisfacturaelectronica.store.Firmas');



      var _obj = [
        {
          xtype:'combo',
          store:storeOrientacion,
          itemId : 'cboOrientacion',
          displayField:'descripcion',
          valueField:'id',
          fieldLabel:'Orientación',
          anchor:'100%',
          editable:false,
          value : 1
        },
        {
          xtype:'combo',
          store:storeFormato,
          itemId : 'cboFormato',
          displayField:'descripcion',
          valueField:'id',
          fieldLabel:'Formato Reporte',
          anchor:'100%',
          editable:false,
          value : 1

        },
        {
          xtype:'combo',
          store:storeFirmas,
          itemId : 'cboFirma',
          displayField:'descripcion',
          valueField:'id',
          fieldLabel:'Formato Firma',
          anchor:'100%',
          editable:false,
          value : 1
        }
    ];
      return _obj;
    }
});
