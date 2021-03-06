Ext.define('sisfacturaelectronica.view.compras.AccionesOrdenCompra', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-ordencompra',
    requires: [
        'sisfacturaelectronica.util.Rutas',

    ],
    //@ Tabla Orden de Compra
    //=============================================
    onClickIngresar: function () {
        Ext.create('sisfacturaelectronica.view.compras.IngresarOrdenCompra');
    },
    onClickBuscarProducto: function (btn) {
       if(Ext.ComponentQuery.query('#cboProveedoresf')[0].getValue()!=null){
        Ext.create('sisfacturaelectronica.view.almacen.ProductoBuscarOC',{
          proveedor : Ext.ComponentQuery.query('#cboProveedoresf')[0].getValue()
        });
      }else{
        sisfacturaelectronica.util.Util.showToast('Seleccionar al Proveedor');
      }
    },
    onKeyUpBuscarProducto:function( obj, e, eOpts){
      if(e.keyCode==13){
          _store = Ext.ComponentQuery.query('#dgvProductos')[0].getStore();
          _store.load({
            params:{
              nombre : obj.getValue(),

            }
          });
      }

    },
    onKeyUpBuscarProductoOC:function( obj, e, eOpts){
      if(e.keyCode==13){
          _store = Ext.ComponentQuery.query('#dgvProductosOC')[0].getStore();
          idprov = Ext.ComponentQuery.query('#cboProveedoresf')[0].getValue();
          if(idprov){
            idprov = idprov;
          }else{
            idprov =Ext.ComponentQuery.query('#cboProveedoresfEditar')[0].getValue(); 
          }
          
          _store.load({
            params:{
              idprov : idprov,
              nombre : obj.getValue()
            }
          });
      }

    },

    onClickItemProductoOC: function (grid, record, item, index, e, eOpts) {
        me = this;
        if(Ext.ComponentQuery.query('#myStore')[0].getValue()){
           _store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompraEditar')[0].getStore();
        }else{
           _store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore();
        }
         _precio = 0;
        if(parseFloat(record.get('preciocompraproveedor'))>0){
          _precio = parseFloat(record.get('preciocompraproveedor'));
        }else{
          _precio = parseFloat(record.get('preciocompra'))
        }
        _data = {
            idprod: parseInt(record.get('id')),
            producto: record.get('nombre'),
            cantidad: 1,
            precio: _precio,    //parseFloat(record.get('preciocompra')),
            total: parseInt(1) * _precio    // parseFloat(record.get('preciocompra'))
        };

        if (_store.findRecord('idprod', parseInt(record.get('id')))) {
            Ext.Msg.alert("SisFacturaElectronica", "Producto ya se encuentra cargada");
            return false;
        }
        _store.insert(0, _data);
        if(Ext.ComponentQuery.query('#myStore')[0].getValue()){
            me.onCalcularTotalOrdenCompraEditar(_store);
         }else{
            me.onCalcularTotalOrdenCompra();
         }
      
    },




    //@ Objeto : Ventana , Listado de productos
    onClickItemProducto: function (grid, record, item, index, e, eOpts) {
        me = this;
         _store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore();
         _precio = 0;

        _data = {
            idprod: parseInt(record.get('id')),
            producto: record.get('nombre'),
            cantidad: 1,
            precio: parseFloat(record.get('preciocompra')),
            total: parseInt(1) * parseFloat(record.get('preciocompra'))
        };

        if (_store.findRecord('idprod', parseInt(record.get('id')))) {
            Ext.Msg.alert("SisFacturaElectronica", "Producto ya se encuentra cargada");
            return false;
        }
        _store.insert(0, _data);
        me.onCalcularTotalOrdenCompra();
    },
    onCalcularTotalOrdenCompra: function () {
         me    = this;
         store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore();
         if(store.data.items==''){
            store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompraEditar')[0].getStore(); 
         }
         t = 0;
        store.each(function (r) {t = t + r.get('total');});
        igv = Ext.ComponentQuery.query('[name=flagestadoigv]')[0].getValue();
        if(igv){
            igv = Ext.ComponentQuery.query('[name=flagestadoigv]')[0].getValue();    
        }else{
            igv=Ext.ComponentQuery.query('#ckbAplicarIgvEditar')[0].getValue();
        }
        if(igv){    
            i   = t - (t / 1.18);
            st = t / 1.18;
        }else{
            st = t;
            i  = t * 0.18;
            t =st + (t * 1.18);
        }

        Ext.ComponentQuery.query('#txtSubtotalOrdenCompra')[0].setValue(st.toFixed(2));
        Ext.ComponentQuery.query('#txtIgvOrdenCompra')[0].setValue(i.toFixed(2));
        Ext.ComponentQuery.query('#txtTotalGeneralOrdenCompra')[0].setValue(t.toFixed(2));
        
        if(Ext.ComponentQuery.query('#txtSubtotalOrdenCompraEditar')[0]){
            Ext.ComponentQuery.query('#txtSubtotalOrdenCompraEditar')[0].setValue(st.toFixed(2));
            Ext.ComponentQuery.query('#txtIgvOrdenCompraEditar')[0].setValue(i.toFixed(2));
            Ext.ComponentQuery.query('#txtTotalGeneralOrdenCompraEditar')[0].setValue(t.toFixed(2));
        }
        try {Ext.ComponentQuery.query('#txtBuscarCodigoProd')[0].focus();} catch (e) {}

    },
    onEditorCalcularTotalOrdenCompra: function (editor, e) {
         _cant = 0;
         _pre = 0;
        _cant = e.record.get('cantidad');
        _pre = e.record.get('precio');
        _tot = _pre * _cant;
        e.record.set('total', _tot.toFixed(2));
        this.onCalcularTotalOrdenCompra();
    },
    onClickEliminarDetalle: function (button, event, eOpts) {
         store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore();
         rec = button.getWidgetRecord();
        if (rec) {
            store.remove(rec);
            this.onCalcularTotalOrdenCompra();
        }
    },
    onClickEliminarDetalleEditar: function (button, event, eOpts) {
         store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompraEditar')[0].getStore();
         rec = button.getWidgetRecord();
        if (rec) {
            store.remove(rec);
            this.onCalcularTotalOrdenCompraEditar(store);
        }
    },
    onClickSalirOrdenCompra: function (btn) {
      try {
         me =  Ext.ComponentQuery.query('#wContenedorOrdenCompra')[0];    //this;
         l = me.getLayout();
        l.setActiveItem(0);
        Ext.ComponentQuery.query('#frmOrdenCompra')[0].reset();
        Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore().removeAll();
      } catch (e) {
        console.log('Salir Orden Compra');
      }
    },

    onClickGuardarOrdenCompra: function () {
         f = this.lookupReference('frmOrdenCompra');
         if (f.isValid()) {
            det = [];
            s = this.lookupReference('dgvDetalleOrdenCompra').getStore();
            if(s.getCount()==0){
                Ext.Msg.alert("Aviso","No puede ingresar una orden de compra sin detalle");
                return false;
            }else{
                me = this;
                s.each(function (record) {
                    if (record.get('cantidad') != 0) {
                        _reg = {
                            "idprod": record.get('idprod'),
                            "cantidad": record.get('cantidad'),
                            "precio": record.get("precio"),
                            "total": record.get("total"),
                            "precioventa": record.get("precioventa")
                        };
                        det.push(_reg);
                    }

                });
                _txt1 = Ext.ComponentQuery.query('#txtJsonDetalleOC');
                _txt1[0].setValue(JSON.stringify(det));
                Ext.ComponentQuery.query('[name=usuario]')[0].setValue(sisfacturaelectronica.util.Data.usuario);
                _view = this.getView();
                f.submit({
                    waitMsg: 'Guardando informacion...',
                    success: function (form, action) {
                        dg = Ext.ComponentQuery.query('#gridOrdenesCompra')[0];
                        dg.getStore().load();
                        me = Ext.ComponentQuery.query('#wContenedorOrdenCompra')[0];    //this;
                        l = me.getLayout();
                        l.setActiveItem(0);
                        Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore().removeAll();
                    },
                    failure: function (action) {
                        Ext.Msg.alert("SisFacturaElectronica", "Error en conexión de base de datos");

                    }
                });
            }
        } else {
            sisfacturaelectronica.util.Util.showErrorMsg('Ingresar los datos necesarios!');
        }
    },
    //==============================================

    onClickBuscarOrdenCompraPorFechas: function (btn) {
        store = Ext.ComponentQuery.query("#gridOrdenesCompra")[0].getStore();
        store.load({
            params: {
                start: 1,
                limit: 100,
                desde: Ext.ComponentQuery.query('#dfDesdeOC')[0].getRawValue(),
                hasta: Ext.ComponentQuery.query('#dfHastaOC')[0].getRawValue(),
                proveedor: 0
            }
        });
    },
    onClickBuscarOrdenCompraPorProveedor: function (btn) {
        store = Ext.ComponentQuery.query("#gridOrdenesCompra")[0].getStore();
        store.load({
            params: {
                start: 1,
                limit: 100,
                desde: Ext.ComponentQuery.query('#dfDesdeOC')[0].getRawValue(),
                hasta: Ext.ComponentQuery.query('#dfHastaOC')[0].getRawValue(),
                proveedor: Ext.ComponentQuery.query('#cboProveedores')[0].getValue()
            }
        });
    },

    onClickFormularioProveedor: function (b) {
        w = Ext.create('sisfacturaelectronica.view.almacen.FormProveedor', {
            control: b.control.toString()
        });
        w.show(b);
    },

    onClickConfirmarOrdenCompra: function (btn) {
         id =  r.get('id');
         g = this.lookupReference('gridOrdenesCompra');
         r = g.getSelectionModel().getSelection()[0];
        me = this;
        if (r) {
            g.mask('... Confirmando ');
            Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.ordenCompraConfirmar,
                params: {
                    id: r.get('id')
                },
                success: function (response) {
                     _error = Ext.JSON.decode(response.responseText);
                    if (_error.error != 0) {
                        g.unmask();
                        me.lookupReference('gridOrdenesCompra').getStore().reload();
                    }
                }
            });
        }
    },
    onClickActualizarLista:function(btn){
      this.lookupReference('gridOrdenesCompra').getStore().load({
        params:{page:1,start:0}
      });
    },

    onClickEditarOrdenCompra:function(button){
       rec = button.getWidgetRecord();
       _me  = this;
      if(rec.get('idestado')==4){ sisfacturaelectronica.util.Util.showToast('La OC esta anulada!');; return false; }
      if (rec) {
          try {
             me =  Ext.ComponentQuery.query('#wContenedorOrdenCompra')[0];    //this;
             l = me.getLayout();
            l.setActiveItem(2);
            Ext.ComponentQuery.query('#frmOrdenCompraEditar')[0].loadRecord(rec);
            g =  Ext.ComponentQuery.query('#dgvDetalleOrdenCompraEditar')[0];
            _store  =g.getStore();
            _store.removeAll();
            Ext.Ajax.request({
                url :sisfacturaelectronica.util.Rutas.ordenCompraBuscarDetalle,
                params:{
                  id :rec.get('id')
                },
                success:function(response){
                    _obj = Ext.JSON.decode(response.responseText);
                   i =  Ext.ComponentQuery.query('[name=indiceeditar]')[0];
                   x = 0;
                   Ext.each(_obj.data,function(record){
                      _data = {
                          idprod   : parseInt(record.idprod),
                          producto : record.nombre,
                          cantidad : record.cantidad,
                          precio   : record.preciocompra,
                          total    : record.total
                      };
                     
                      x = i.getValue() + 1;
                      _store.insert(x, _data);
                      g.getView().refresh();
                      i.setValue(x);
                    });
                    _me.onCalcularTotalOrdenCompraEditar(_store);
                }
            });
            if(rec.get('idestado')==3){
                b=Ext.ComponentQuery.query('#frmOrdenCompraEditar')[0];
                b.down('#btnGuardarVenta').setDisabled(true);
            }else{
                b=Ext.ComponentQuery.query('#frmOrdenCompraEditar')[0];
                b.down('#btnGuardarVenta').setDisabled(false);
            }
          } catch (e) {
            console.log('Editar Orden Compra');
          }
      }
    },

    onClickAnularOrdenCompra:function(button){
       rec = button.getWidgetRecord();
      if(rec.get('idestado')==4){ sisfacturaelectronica.util.Util.showToast('La OC esta anulada!');; return false; }
       _me  = this;
      if (rec) {
          try {

            Ext.Ajax.request({
                url :sisfacturaelectronica.util.Rutas.ordenCompraAnular,
                params:{
                  id :rec.get('id')
                },
                success:function(response){
                    _obj = Ext.JSON.decode(response.responseText);
                   console.log(_obj);
                   Ext.ComponentQuery.query('#gridOrdenesCompra')[0].getStore().reload();
                }
            });

          } catch (e) {
            console.log('anular orden compra');
          }
      }
    },

    onCalcularTotalOrdenCompraEditar: function (store) {
        me = this;
      //  store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompraEditar')[0].getStore();
        t = 0;
        s = Ext.ComponentQuery.query('#ckbAplicarIgvEditar')[0].getValue();
        store.each(function (r) {t += r.get('total');});
        if(s){
            st = t / 1.18;
            i  = t - st;
            Ext.ComponentQuery.query('#txtSubtotalOrdenCompraEditar')[0].setValue(st.toFixed(2));
            Ext.ComponentQuery.query('#txtIgvOrdenCompraEditar')[0].setValue(i.toFixed(2));
            Ext.ComponentQuery.query('#txtTotalGeneralOrdenCompraEditar')[0].setValue(
                t.toFixed(2)
            );
        }else{
        
            st = t;
            i  = t * 0.18;
            t  = st + i;
            Ext.ComponentQuery.query('#txtSubtotalOrdenCompraEditar')[0].setValue(st.toFixed(2));
            Ext.ComponentQuery.query('#txtIgvOrdenCompraEditar')[0].setValue(i.toFixed(2));
            Ext.ComponentQuery.query('#txtTotalGeneralOrdenCompraEditar')[0].setValue(
                t.toFixed(2)
            );
       }
       try {Ext.ComponentQuery.query('#txtBuscarCodigoProd')[0].focus();} catch (e) {}



    },
    onClickIngresarPagoAcuenta:function(btn){
      __record = btn.getWidgetRecord();
      Ext.widget('wCompraPagosAcuenta',{
        codigo :__record.get('id'),
        nombre :__record.get('razonsocial'),
        monto  :__record.get('totalorden')
      });
    },
    onClickRefrescarProveedor:function(){
        Ext.ComponentQuery.query('#cboProveedoresf')[0].getStore().load();
    },
    onChangeInIgv: function ( o, nv, ov, opt) {
        me = this;
        s = Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore();
        t = 0;
        s.each(function (r) {t += r.get('total');});
       if(nv){
            st = t / 1.18;
            i  = t - st;
            Ext.ComponentQuery.query('#txtSubtotalOrdenCompra')[0].setValue(st.toFixed(2));
            Ext.ComponentQuery.query('#txtIgvOrdenCompra')[0].setValue(i.toFixed(2));
            Ext.ComponentQuery.query('#txtTotalGeneralOrdenCompra')[0].setValue(
                t.toFixed(2)
            );
       }else{

            st = t;
            i  = t * 0.18;
            t  = st + i;
            Ext.ComponentQuery.query('#txtSubtotalOrdenCompra')[0].setValue(st.toFixed(2));
            Ext.ComponentQuery.query('#txtIgvOrdenCompra')[0].setValue(i.toFixed(2));
            Ext.ComponentQuery.query('#txtTotalGeneralOrdenCompra')[0].setValue(
                t.toFixed(2)
            );
       }
     
      // try {Ext.ComponentQuery.query('#txtBuscarCodigoProd')[0].focus();} catch (e) {}

   },
   onBeforeQueryProducto:function(queryPlan, eOpts ){
       if(queryPlan.query.length>2){
            p = Ext.ComponentQuery.query('#cboProveedoresf')[0];
            if(p.getValue()!=null){
                queryPlan.query = p.getValue() +'|'+ queryPlan.query;
            }
            else {
                queryPlan.cancel = true;
                sisfacturaelectronica.util.Util.showErrorMsg('Seleccionar o buscar el proveedor!');
            }
       }
   },
   onSelectProducto:function(grid, record, index, eOpts){
        me = this;
        i = Ext.ComponentQuery.query('hiddenfield[name=indice]')[0];
        g = Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0];
        s = g.getStore();
        p = 0;
        if(parseFloat(record.get('preciocompraproveedor'))>0){
          p = parseFloat(record.get('preciocompraproveedor'));
        }else{
          p = parseFloat(record.get('preciocompra'))
        }
        d = {
            idprod: parseInt(record.get('id')),
            producto: record.get('nombre'),
            cantidad: 1,
            precio: p,    
            total: parseInt(1) * p   
        };
        if (s.findRecord('idprod', parseInt(record.get('id')))) {
            Ext.Msg.alert("SisFacturaElectronica", "Producto ya se encuentra cargada");
            return false;
        }
        x = i.getValue();
        x = x + 1 ;
        s.insert(x, d);
        g.getView().refresh();
        i.setValue(x);
        me.onCalcularTotalOrdenCompra();
   }
});
