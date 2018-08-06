Ext.define('sisfacturaelectronica.view.compras.ContenedorGuias', {
  extend: 'Ext.panel.Panel',
  xtype: 'wContenedorGuias',
  itemId : 'wContenedorGuias',
  alias: 'widget.wContenedorGuias',
  reference : 'wContendedorGuias',
  requires: [
    'Ext.layout.container.Card',
    'sisfacturaelectronica.view.compras.AccionesContenedorGuias',
    'sisfacturaelectronica.view.compras.IngresoGuia',
    'sisfacturaelectronica.util.Rutas'
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
  controller: 'acciones-contenedorguias',

  initComponent: function () {
    Ext.apply(this, {
      items: [{
        id: 'guia-0',
        xtype: 'wGuiasEntrada'

      }, {
        id: 'guia-1',
        xtype:'wIngresoGuia'

      }
    ],
    tbar: [
    {
        itemId: 'card-prev',
        text: 'INGRESAR GUIAS',
        handler: 'mostrarIngresoGuias',
    },
    {
        itemId: 'card-next',
        text: 'CANCELAR',
        itemId : 'btnListadoOrdenesAprovadas',
        handler: 'showListadoOrdenesAprovadas'
    }
],
    });
    this.callParent();
  },
  mostrarIngresoGuias: function () {
    try{
    var _grid = Ext.ComponentQuery.query('#gridOrdenesCompraConfir')[0];
    var _rec = _grid.getSelectionModel().getSelection()[0];
    if(_rec){
       this.doCardNavigation(1);
       Ext.ComponentQuery.query('#dgvOrdenCompraConfirDetalle')[0].mask('..cargando');
       _store = Ext.ComponentQuery.query('#dgvOrdenCompraConfirDetalle')[0].getStore();
       _store.removeAll();
       Ext.Ajax.request({
           url : sisfacturaelectronica.util.Rutas.OrdenCompraConfirmadaDetalle,
           params:{
             id :  _rec.get('id')
           },
           success:function(response){
              _data = sisfacturaelectronica.util.Util.decodeJSON(response.responseText);
              _id   = 0;
              Ext.each(_data.data,function(row,i){
                _id   = row.idordencompra;
                _data = {
                  'idordencompra': row.idordencompra,
                  'item' : row.item,
                  'idprod': row.idprod,
                  'producto':row.producto,
                  'cantidad':row.cantidad,
                  'preciocompra':row.preciocompra,
                  'cantidadrecibida' : row.saldo,
                  'saldo' : row.saldo,
                 // 'numeroguia': row.numeroguia,
                  'vencimiento' : null,
                 // 'pasestock' : row.pasestock,
                  'total' : row.total,
                  'genserie':true
                };
                _store.insert(0, _data);
              });
              Ext.ComponentQuery.query('#dgvOrdenCompraConfirDetalle')[0].unmask();
              Ext.ComponentQuery.query('#idordencompra')[0].setValue(_id);

           }
       });
       Ext.ComponentQuery.query('#txtIdProveedor')[0].setValue(_rec.get('idprov'));
       Ext.ComponentQuery.query('#txtNombreProveedor')[0].setText(_rec.get('razonsocial'));
    }
    }catch(e){
      console.log("error");
    }
  },

  showListadoOrdenesAprovadas: function (btn) {
      this.doCardNavigation(-1);
  },

  doCardNavigation: function (incr) {
      var me = this;
      var l = me.getLayout();
      var i = l.activeItem.id.split('guia-')[1];
      var next = parseInt(i, 10) + incr;
      l.setActiveItem(next);
  }

});
