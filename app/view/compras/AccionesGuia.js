Ext.define('sisfacturaelectronica.view.compras.AccionesGuia', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-guia',
    requires: [
        'sisfacturaelectronica.util.Rutas',

    ],
    //@ Tabla Orden de Compra
    //=============================================

    onClickActualizarListado()
    {
        this.lookupReference('gridOrdenesCompraConfir').getStore().load();
    },
    onSelectedDetalleOrdenCompraConfirmada( grid, td, cellIndex, record, tr, rowIndex, e, eOpts)
    {   me = this;
        if(record){
          me.lookupReference('dgvOrdenCompraConfirDetalle').mask('..cargando');
           _store = me.lookupReference('dgvOrdenCompraConfirDetalle').getStore();
           _store.removeAll();

           Ext.Ajax.request({
               url : sisfacturaelectronica.util.Rutas.OrdenCompraConfirmadaDetalle,
               params:{
                 id :  record.get('id')
               },
               success:function(response){
                  _data = sisfacturaelectronica.util.Util.decodeJSON(response.responseText);
                  Ext.each(_data.data,function(row,i){
                    _data = {
                      'idordencompra': row.idordencompra,
                      'item' : 1,
                      'idprod': row.idprod,
                      'producto':row.producto,
                      'cantidad':row.cantidad,
                      'preciocompra':row.preciocompra,
                      'cantidadrecibida' : row.cantidadrecibida,
                      'numeroguia': row.numeroguia,
                      'vencimiento' : row.vencimiento,
                      'pasestock' : row.pasestock,
                      'total' : row.total
                    };
                    _store.insert(0, _data);
                  });
                  me.lookupReference('dgvOrdenCompraConfirDetalle').unmask();
               }
           });

        }
    },

    /*********************************************
     *    Procedimiento de actualizar Guia
     ********************************************/
     onClickGuardarGuiaProveedor:function(){

        var _form = this.lookupReference('frmGuiaIngresoProveedor');
        if (_form.isValid()) {
            var _dataDetalle = [];
            var _store = this.lookupReference('dgvOrdenCompraConfirDetalle').getStore();
            me = this;
            _store.each(function (record) {
                if (record.get('cantidadrecibida') != 0) {
                    _reg = {
                        "item": record.get('item'),
                        "idprod": record.get('idprod'),
                        "cantidadrecibida": record.get('cantidadrecibida'),
                        "vencimiento": (record.get("vencimiento")==null || record.get("vencimiento") ==''? null:  Ext.Date.format(record.get("vencimiento"), 'd/m/Y') ),
                        "genserie" :  (record.get("genserie")==true?1:0),
                        "preciocompra": record.get("preciocompra"),
                        "total" : record.get("total"),

                    };
                    _dataDetalle.push(_reg);
                }

            });
             _txt1 = Ext.ComponentQuery.query('#txtjsondetalle');
            _txt1[0].setValue(JSON.stringify(_dataDetalle));
            Ext.ComponentQuery.query('#usuarioguia')[0].setValue(sisfacturaelectronica.util.Data.usuario);
            var _view = this.getView();
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                        _dgv = Ext.ComponentQuery.query('#gridOrdenesCompraConfir')[0];
                        if(_dgv){
                            _dgv.getStore().load();
                            Ext.ComponentQuery.query('#frmGuiaIngresoProveedor')[0].reset();
                            _paneles = Ext.ComponentQuery.query('#wContenedorGuias')[0].getLayout() ;
                            _paneles.setActiveItem(0);
                        }else{
                            me =  Ext.ComponentQuery.query('#wContenedorOrdenCompra')[0]; 
                            l = me.getLayout();
                            l.setActiveItem(0);
                        }
                },
                failure: function (action) {
                    Ext.Msg.alert("SisFacturaElectronica", "Error en conexión de base de datos");
                    _view.close();
                }
            });
        } else {
            sisfacturaelectronica.util.Util.showErrorMsg('Ingresar los datos necesarios!');
        }
     },
     onClickCancelarGuiaProveedor:function(){
        l = Ext.ComponentQuery.query('#wContenedorGuias')[0];
        if(l){
            p = l.getLayout() ;
        }else{
            l =  Ext.ComponentQuery.query('#wContenedorOrdenCompra')[0];
            p = l.getLayout() ;
        }
        
        f = this.lookupReference('frmGuiaIngresoProveedor');
        s = this.lookupReference('dgvOrdenCompraConfirDetalle').getStore();
        f.reset();
        s.removeAll();
        p.setActiveItem(0);
     },

     onClickBuscarOrdenCompraConfirmadasPorFechas: function (btn) {
         store = Ext.ComponentQuery.query("#gridOrdenesCompraConfir")[0].getStore();
         store.load({
             params: {
                 desde: Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
                 hasta: Ext.ComponentQuery.query('#dfHasta')[0].getRawValue(),
                 proveedor: 0
             }
         });
     },

     onClickBuscarOrdenCompraConfirmadasPorProveedor: function (btn) {
         store = Ext.ComponentQuery.query("#gridOrdenesCompraConfir")[0].getStore();
         store.load({
             params: {
                 desde: Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
                 hasta: Ext.ComponentQuery.query('#dfHasta')[0].getRawValue(),
                 proveedor: Ext.ComponentQuery.query('#cboProveedores')[0].getValue()
             }
         });
     },
     onClickEliminarGuiaEntrada:function(btn){
       __record = btn.getWidgetRecord();
       __grid   = Ext.ComponentQuery.query('#gridOrdenesCompraConfir')[0];
       __d      = Ext.ComponentQuery.query('#dgvOrdenCompraConfirDetalleVista')[0];
       __grid.mask('...enviando');
       if(__record){
           Ext.Ajax.request({
               url : sisfacturaelectronica.util.Rutas.ordenCompraAnularConfirmado,
               params:{
                 id : __record.get('id')
               },
               success:function(response){
                  var text = Ext.JSON.encode(response.responseText);
                  console.log(text);
                  __grid.unmask();
                  __grid.getStore().load();
                  __d.getStore().removeAll();
               }
           });
       }
     },
     onEditorCalcularTotalGuiaIngreso: function (editor, e) {
        var _cant = 0;
        var _pre = 0;
        _cant = e.record.get('cantidadrecibida');
        _pre = e.record.get('preciocompra');
        _tot = _pre * _cant;
        e.record.set('total', _tot.toFixed(2));
   
    },
    onSelectedDetalleIngresosDeOrdenCompra:function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts){ //eddy
        __store = Ext.ComponentQuery.query('#dgvOrdenCompraConfirDetalleVista')[0].getStore();
        __store.load({
            params:{
                id : record.get('id')
            }
        });
    },
    mostrarIngresoGuias:function(b){
        try {
            me =  Ext.ComponentQuery.query('#wContenedorGuias')[0]; 
            _rec = b.getWidgetRecord(); 
            if (_rec) {
              l = me.getLayout();
              l.setActiveItem(1);         
              Ext.ComponentQuery.query('#dgvOrdenCompraConfirDetalle')[0].mask('..cargando');
              _store = Ext.ComponentQuery.query('#dgvOrdenCompraConfirDetalle')[0].getStore();
              _store.removeAll();
              Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.OrdenCompraConfirmadaDetalle,
                params: {
                  id: _rec.get('id')
                },
                success: function (response) {
                  _data = sisfacturaelectronica.util.Util.decodeJSON(response.responseText);
                  _id = 0;
                  Ext.each(_data.data, function (row, i) {
                    _id = row.idordencompra;
                    _data = {
                      'idordencompra': row.idordencompra,
                      'item': row.item,
                      'idprod': row.idprod,
                      'producto': row.producto,
                      'cantidad': row.cantidad,
                      'preciocompra': row.preciocompra,
                      'cantidadrecibida': row.saldo,
                      'saldo': row.saldo,
                      // 'numeroguia': row.numeroguia,
                      'vencimiento': null,
                      // 'pasestock' : row.pasestock,
                      'total': row.total,
                      'genserie': true
                    };
                    _store.insert(0, _data);
                  });
                  Ext.ComponentQuery.query('#dgvOrdenCompraConfirDetalle')[0].unmask();
                  Ext.ComponentQuery.query('#idordencompra')[0].setValue(_id);
      
                }
              });
              Ext.ComponentQuery.query('#txtIdProveedor')[0].setValue(_rec.get('idprov'));
              Ext.ComponentQuery.query('#txtNombreProveedor')[0].setValue(_rec.get('razonsocial'));
            }
          } catch (e) {
            alert(e);
          }
    }







});
