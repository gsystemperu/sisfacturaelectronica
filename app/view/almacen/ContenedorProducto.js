Ext.define('sisfacturaelectronica.view.almacen.ContenedorProducto', {
  extend: 'Ext.panel.Panel',
  xtype: 'wContenedorProducto',
  itemId: 'wContenedorProducto',
  reference: 'wContendedorProducto',
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
        id: 'prod-1',
        xtype: 'wFormProducto'
      },
      {
        id: 'prod-2',
        xtype: 'wProductosExistencias'
      },
      {
        id: 'prod-3',
        xtype: 'wRegMaestros'
      }
      ],
      tbar: me.getBotonesERP()

    });
    this.callParent();
  },
  getBotonesERP: function () {
    return obj = [
      {
        text: 'Lista',
        iconCls: 'fa  fa-dropbox  fa-2x',
        iconAlign: 'top',
        scale: 'large',
        itemId: 'btnProductos',
        handler: 'onClickVerProductos'
      },
      {

        text: 'Crear',
        iconCls: 'fa  fa-dropbox  fa-2x',
        iconAlign: 'top',
        scale: 'large',
        handler: 'onClickNuevoProducto'
      },
      {
        text: 'Regresar Producto',
        iconCls: 'fa fa-mail-reply-all  fa-2x',
        textAlign: 'right',
        iconAlign: 'left',
        scale: 'large',
        hidden: true,
        itemId: 'btnRegresarIngresoProducto',
        handler: 'onClickRegresarIngresoProducto'
      }
    ];
  },

  onClickVerProductos: function (btn) {
    try {
      this.doCardNavigation(0);
      Ext.ComponentQuery.query('#dgvProductos')[0].getStore().reload();
    } catch (e) {
      return false;
    }
  },
  onClickNuevoProducto: function (btn) {
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
      console.log(e); return false;
    }
  },
  onClickRegresarIngresoProducto: function () {
    try {
      this.doCardNavigation(1);
      Ext.ComponentQuery.query('#btnRegresarIngresoProducto')[0].setHidden(true);
    } catch (e) {
      console.log(e); return false;
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
