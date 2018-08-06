Ext.define('sisfacturaelectronica.view.almacen.ContenedorProducto', {
  extend: 'Ext.panel.Panel',
  xtype: 'wContenedorProducto',
  itemId : 'wContenedorProducto',
  reference : 'wContendedorProducto',
  requires: [
    'Ext.layout.container.Card',
    'sisfacturaelectronica.util.Rutas',
    'sisfacturaelectronica.view.almacen.Producto',
    'sisfacturaelectronica.view.almacen.ProductoExistencias',
    'sisfacturaelectronica.view.almacen.FormProducto'
  ],
  layout: {
    type: 'card',
    align: 'stretch',
    deferredRender: true,
  },
  bodyPadding: 0,
  defaults: {
    bodyPadding: 0,
    border: false
  },
  defaultListenerScope: true,
  initComponent: function () {
    me = this;
    Ext.apply(this, {
      items: [{
        id: 'prod-0',
        xtype: 'wRegProducto'
      },
      {
        id : 'prod-1',
        xtype:'wFormProducto'
      },
      {
        id: 'prod-2',
        xtype:'wProductosExistencias'
      },
      {
        id: 'prod-3',
        xtype:'wRegMaestros'
      }
    ],
    tbar: me.getBotonesERP()

    });
    this.callParent();
  },
  getBotonesERP:function(){
    _existencias = 0;
    _txt1 = Ext.String.format('Stock  : {0}',_existencias);
    _previstos = 0;
    _txt2 = Ext.String.format('Cotizaciones  : {0}',_previstos);
    _ventas = 0;
    _txt3 = Ext.String.format('Ventas  : {0}',_ventas);
    return obj = [
      {
       text : 'Productos',
       iconCls :'fa  fa-dropbox  fa-2x',
       textAlign :'right',
       iconAlign:'left',
       scale :'large',
       itemId:'btnProductos',
       handler:'onClickVerProductos'
        },
        {

         text : 'Nuevo',
         iconCls :'fa  fa-dropbox  fa-2x',
         textAlign :'right',
         iconAlign:'left',
         scale :'large',
         handler:'onClickNuevoProducto'
          },
        {

         text : _txt1,
         iconCls :'fa  fa-dropbox  fa-2x',
         textAlign :'right',
         iconAlign:'left',
         scale :'large',
         itemId:'btnExistencias',
         handler:'onClickVerExistencias'
       },
       {

        text : 'Regresar Producto',
        iconCls :'fa fa-mail-reply-all  fa-2x',
        textAlign :'right',
        iconAlign:'left',
        scale :'large',
        hidden:true,
        itemId:'btnRegresarIngresoProducto',
        handler:'onClickRegresarIngresoProducto'
      }
    ];
  },

  onClickVerProductos:function(btn){
    try{
      this.doCardNavigation(0);
      Ext.ComponentQuery.query('#dgvProductos')[0].getStore().reload();
    }catch(e){
      return false;
    }
  },
  onClickVerExistencias: function (btn) {
    try
    {
        var _grid = Ext.ComponentQuery.query('#dgvProductos')[0];
        var _rec = _grid.getSelectionModel().getSelection()[0];
        Ext.ComponentQuery.query('#btnRegresarIngresoProducto')[0].setHidden(false);
        if(_rec)
        {
            this.doCardNavigation(2);
            Ext.ComponentQuery.query('#dgvProductoExistencias')[0].getStore().load({
                  params:{
                    idprod : _rec.get('id')
                  }
            });
            Ext.ComponentQuery.query('#lblNombreProducto')[0].setText('PRODUCTO / EXISTENCIAS / '+_rec.get('nombre'));
        }
    } catch (e) { console.log(e); return false;}
  },
  onClickNuevoProducto:function(btn){
      try {
        this.doCardNavigation(1);
        Ext.ComponentQuery.query('#wFormProducto')[0].reset();
        Ext.ComponentQuery.query('#dgvDetProvProd')[0].getStore().removeAll();
        Ext.ComponentQuery.query('#tabDetalleProducto')[0].getLayout().setActiveItem(0);
        Ext.ComponentQuery.query('#codigoserie')[0].focus();
        Ext.ComponentQuery.query('#imgprod')[0].setSrc('resources/images/imagen.png');
        Ext.ComponentQuery.query('#imagen')[0].setValue('');
        Ext.ComponentQuery.query('#imagenguardar')[0].setValue(0);

      } catch (e) {
            console.log(e);return false;
      }
  },
  onClickRegresarIngresoProducto:function(){
    try{
      this.doCardNavigation(1);
      Ext.ComponentQuery.query('#btnRegresarIngresoProducto')[0].setHidden(true);
    } catch (e) {
          console.log(e);return false;
    }
  },

  doCardNavigation: function (incr) {
      var me = this;
      var l = me.getLayout();
      //var i = l.activeItem.id.split('prod-')[1];
      //var next = parseInt(i, 10) + incr;
      l.setActiveItem(incr);
  }

});
