Ext.define('sisfacturaelectronica.view.conf.configNuevaTicketeraController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-ticketeras',
    requires: ['sisfacturaelectronica.util.Rutas'],

    //@Acciones
    init:function(){},
    onClickAgregar:function(b){
      r = Ext.create('sisfacturaelectronica.model.TiendaDocumentoVentaAsignado');
      d = this.lookupReference('dgvBoleta').getStore();
      d.add(r);
    },
    onClickEliminar:function(b){
      r = b.getWidgetRecord();
      d = this.lookupReference('dgvBoleta').getStore();
      data = {
        id : r.get('id')
      };
      if(Ext.isNumber(r.get('id')))
          sisfacturaelectronica.util.Util.ajax(sisfacturaelectronica.util.Rutas.tiendaEliminarTicketera,data,d)
      else
          d.remove(r);

    },
    onClickGuardar:function(b){
      t=Ext.ComponentQuery.query('window')[1].tienda;
      r=Ext.ComponentQuery.query('window')[1].objeto;
      d=this.lookupReference('dgvBoleta').getStore();

      ca = d.getCount();
      rs = [];
      for (i = 0; i < ca; i++) {
        r = d.getAt(i);
        da = {
          xid: ( Ext.isNumeric(r.get('id')) == true ? r.get('id') : 0),
          xdocumento:r.get('ticketera'),
          xtienda : t
        };
        rs.push(da);
      }
      data={
        ticketeras : JSON.stringify(rs)
      };
      sisfacturaelectronica.util.Util.ajax(sisfacturaelectronica.util.Rutas.tiendaAsignarTicketera,data,d);
      


    }
  });
