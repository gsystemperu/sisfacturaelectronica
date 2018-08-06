Ext.define('sisfacturaelectronica.view.puntoventa.ListadoController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.puntoventa-listado',
  onKeyUpCambiarBuscarNombre:function(obj,e,opts){
    if (e.keyCode == 113) {
      sisfacturaelectronica.util.Util.focusControl('txtBuscarCodigoProd'); 
    }
  },
  onKeyUpMarcaProducto:function(obj,e,opts){
    console.log(obj.getValue().length);
    if (e.keyCode == 113) {
      sisfacturaelectronica.util.Util.focusControl('txtBuscarCodigoProd')  
    }
    if (e.keyCode == 13) {
      if(obj.getValue().length>=3){
      _combo = Ext.ComponentQuery.query('#cboCliente')[0].getValue();
      if (_combo == null) { sisfacturaelectronica.util.Util.showToast('Seleccionar un cliente para buscar sus precios !!'); return false; }
      s = Ext.ComponentQuery.query('#dvListaProductos')[0].getStore();
      s.load({
        params: {
          nombre: 'x',
          idclie: 'x',
          marca: obj.getValue()
        }
      });
     }
    }
  },
  onKeyUpBuscarProducto: function (obj, e, eOpts) {
    if (e.keyCode == 113) {
        switch (obj.itemId) {
          case 'txtBuscarCodigoProd': sisfacturaelectronica.util.Util.focusControl('txtBuscarActivoProd');     break;
          case 'txtBuscarActivoProd': sisfacturaelectronica.util.Util.focusControl('txtBuscarCodigoProd');     break;
        }   
    }
    if (e.keyCode == 13) {
      _combo = Ext.ComponentQuery.query('#cboCliente')[0].getValue();
      if (_combo == null) { sisfacturaelectronica.util.Util.showToast('Seleccionar un cliente para buscar sus precios !!'); return false; }
      s = Ext.ComponentQuery.query('#dvListaProductos')[0].getStore();
      if(obj.getValue().length>=3){
      s.load({
        params: {
          nombre: obj.getValue(),
          idclie: _combo,
          tb   : (obj.itemId=='txtBuscarCodigoProd'?1:2)
        }
      });
     }
    }
  },
  onKeyBuscarProductoBarras: function (obj, e, eOpts) {
    if (e.keyCode == 113) { sisfacturaelectronica.util.Util.focusControl('txtBuscarCodigoProd'); }
  },
  onChangeBuscarProductoBarras: function (obj, newValue, oldValue, eOpts) {
    me = this;
    _combo = Ext.ComponentQuery.query('#cboCliente')[0].getValue();
    if (_combo == null) { sisfacturaelectronica.util.Util.showToast('Seleccionar un cliente para buscar sus precios !!'); return false; }
    l = Ext.ComponentQuery.query('#dvListaProductos')[0];
    st = l.getStore();
    if (newValue != '') {
      st.load({
        params: {
          codigobarras: obj.getValue(),
          idclie: _combo,
          nombre: '*'
        },
        scope: this,
        callback: function (records, operation, success) {
          r = records[0];
          if (r) {
            var _data = {
              idprod: r.get('id'),
              producto: r.get('nombre'),
              cantidad: 1,
              precio: r.get('precioventa'),
              total: r.get('precioventa') * 1,
              minutos: r.get('minutos'),
              dosis: 0,
              preciodosis: r.get('preciounidad'),
              gramos: 0,
              kilos: 0,
              blister:0,
              preciokilo: r.get('preciokilo'),
              preciogramo: r.get('preciogramo'),
              precioblister:r.get('precioblister')
            };
            _grid = Ext.ComponentQuery.query('#dgvDetalleCaja')[0];
            if (_grid.getStore().findRecord('idprod', parseInt( r.get('id') ))) {
              Ext.Msg.alert('Información','El producto ingresado se encuentra en lista, solo puede modificar la cantidad.');return false;
             }
             if(r.get('ventaconreceta')){
              Ext.Msg.confirm('AkinetFarma','Este Medicamento es con receta médica! desea incluir en la venta?',function(b){
                if(b=='yes'){
                  _grid.getStore().insert(0, _data);
                  me.onCalcularTotalVenta();      
                }
              });
             }else{
              _grid.getStore().insert(0, _data);
              me.onCalcularTotalVenta();  
             }
        
          }
        }
      });
      obj.setValue('');
    }
  },
  accionClickItem: function (listview, record, item, index, e, eOpts) {
    me = this;
    if (Ext.ComponentQuery.query('#cboCliente')[0].getValue()) {
      var _data = {
        idprod: record.get('id'),
        producto: record.get('nombre'),
        cantidad: 1,
        precio: record.get('precioventa'),
        total: record.get('precioventa') * 1,
        minutos: record.get('minutos'),
        dosis: 0,
        preciodosis: record.get('preciounidad'),
        gramos: 0,
        kilos: 0,
        preciokilo: record.get('preciokilo'),
        preciogramo: record.get('preciogramo'),
        blister : 0,
        precioblister: record.get('precioblister')
      };
      var _grid = Ext.ComponentQuery.query('#dgvDetalleCaja')[0];
      if (_grid.getStore().findRecord('idprod', parseInt( record.get('id') ))) {
        Ext.Msg.alert('Información','El producto ingresado se encuentra en lista, solo puede modificar la cantidad.');return false;
       }
       if(record.get('ventaconreceta')){
        Ext.Msg.confirm('AkinetFarma','Este Medicamento es con médica! desea incluir en la venta?',function(b){
          if(b=='yes'){
            _grid.getStore().insert(0, _data);
            me.onCalcularTotalVenta();      
          }
        });
       }else{
        _grid.getStore().insert(0, _data);
        me.onCalcularTotalVenta();  
       }
      
    } else {
      sisfacturaelectronica.util.Util.showToast('TIENE QUE SELECCIONAR AL CLIENTE O CREARLO !!'); return false;
    }
  },
  onCalcularTotalVenta: function () {
    me = this;
    var store = Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore();
    var _tot = 0;

    store.each(function (record) {
      _tot = parseFloat(_tot) + record.get('total');
    });
    Ext.ComponentQuery.query('#txtTotalVentaCaja')[0].setValue(_tot.toFixed(2));
  },

});
