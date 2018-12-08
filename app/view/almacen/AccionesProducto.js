
Ext.define('sisfacturaelectronica.view.almacen.AccionesProducto', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-producto',
    requires:['sisfacturaelectronica.util.Rutas'],

      //@ Tabla Producto
    //=============================================
    onClickCancelarProducto:function(btn){
        var me = Ext.ComponentQuery.query('#wContenedorProducto')[0];
        var l  = me.getLayout();
        l.setActiveItem(0);
    },    
    onClickGuardarProducto: function (btn) {
        _form = Ext.ComponentQuery.query('#wFormProducto')[0];
        me    = this;
        if (_form.isValid()) {

             /** Recorrer el detalle de los Proveedores **/
             var _store =  Ext.ComponentQuery.query('#dgvDetProvProd')[0].getStore();
             me = this;
             _dataDetalle = [];
             _store.each(function (record) {
                 if (record.get('producto') != '') {
                     _reg = {
                         "razonsocial": record.get('razonsocial'),
                         "precio": record.get("precio")
                    };
                     _dataDetalle.push(_reg);
                 }

             });
             _txt1 = Ext.ComponentQuery.query('#jsondetalle');
             _txt1[0].setValue(JSON.stringify(_dataDetalle));
             Ext.ComponentQuery.query('[name=usuario]')[0].setValue(sisfacturaelectronica.util.Data.usuario);
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                      try {
                          var me = Ext.ComponentQuery.query('#wContenedorProducto')[0];
                          var l  = me.getLayout();
                          l.setActiveItem(0);
                          Ext.ComponentQuery.query('#dgvProductos')[0].getStore().reload();
                          p=Ext.ComponentQuery.query('#frmprodpopup')[0];
                          if(p){
                            tb = Ext.ComponentQuery.query('#txtProductoNombre')[0];
                            tb.setValue(action.result.producto);
                            tb.fireEvent('keypress')
                            p.close(); 
                          }
                        } catch (e) {
                          Ext.ComponentQuery.query('#frmprodpopup')[0].close();
                          Ext.Msg.alert("Producto","Producto Guardado");
                          console.log(e);return false;

                        }
                    }
                },
                failure: function () {
                    Ext.Msg.alert("SisFacturaElectronica","Se perdio la conexion con el servidor!");
                }
            });

        }
    },
    onClickNuevoProducto:function(btn)
    {
        Ext.ComponentQuery.query('#wFormProducto')[0].reset();
        Ext.ComponentQuery.query('#codigoserie')[0].focus();
    },
    onClickItemProducto : function( grid, record, index, eOpts ) {
        //Ext.ComponentQuery.query('#btnExistencias')[0].setText(Ext.String.format('Stock  : {0}',(record.get('_cajas')==''?0:record.get('_cajas'))      ));
        try {
            var me = Ext.ComponentQuery.query('#wContenedorProducto')[0];
            var l  = me.getLayout();
            l.setActiveItem(1);
            Ext.ComponentQuery.query('#tabDetalleProducto')[0].getLayout().setActiveItem(0);
            Ext.ComponentQuery.query('#wFormProducto')[0].loadRecord(record);
            if(record.get('fotoprod')=='P-00.jpg'){
              Ext.ComponentQuery.query('#imagenguardar')[0].setValue(0);
              Ext.ComponentQuery.query('#imgprod')[0].setSrc(
                sisfacturaelectronica.util.Rutas.srcimagenes +  'P-00.jpg?_='+(new Date().getTime())
              )
            }else{
              t = new Date().getTime();
              Ext.ComponentQuery.query('#imagenguardar')[0].setValue(1);
              Ext.ComponentQuery.query('#imgprod')[0].setSrc(
                sisfacturaelectronica.util.Rutas.srcimagenes + record.get('fotoprod')+'?_='+t.toString()
              )
            }
            
            Ext.Ajax.request({
                url :sisfacturaelectronica.util.Rutas.productoBuscarProveedores,
                params:{idprod : record.get('id')},
                success:function(response){
                    _obj = Ext.JSON.decode(response.responseText);
                    _store = Ext.ComponentQuery.query('#dgvDetProvProd')[0].getStore();
                    _store.removeAll();
                    _x = 0;
                    Ext.each(_obj.data,function(record){
                      console.log(record);
                      _data = {
                        'razonsocial' : record.razonsocial,
                        'precio' : record.precio
                      };
                     _store.insert(_x++,_data);
                    });
                }
            });

        } catch (e) {
            console.log(e);return false;
      }

    },
    onClickEliminarProducto:function(btn){
        me = this;
        Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.productoEliminar,
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            Ext.ComponentQuery.query('#dgvProductos')[0].getStore().reload();

                    }
                }
             });
    },

    onClickIngresarUbicacionProducto:function(btn){
        Ext.create('sisfacturaelectronica.view.almacen.ProductoUbicacion', {codigo : btn.getWidgetRecord().get('id')});
    },
    onClickRefrescarTipoProducto:function(btn){
        Ext.ComponentQuery.query('#tipoproducto')[0].getStore().load();
    },
    onClickRefrescarModelo:function(btn){
       Ext.ComponentQuery.query('#idmodelo')[0].getStore().load();
    },
    onClickRefrescarMarca:function(btn){
       Ext.ComponentQuery.query('#idmarca')[0].getStore().load();
    },
    onClickAddProveedorProducto:function(btn){
       _store = Ext.ComponentQuery.query('#dgvDetProvProd')[0].getStore();
       _data = {
         'razonsocial' : '',
         'precio' : 0
       };
       if(_store.getCount()){
         _store.insert(_store.getCount() + 1,_data);
       }else{
          _store.insert(0,_data);
       }

    },
    onClickEliminarProveedorProducto:function(btn){
        var _rec   = btn.getWidgetRecord();
        var _store = Ext.ComponentQuery.query('#dgvDetProvProd')[0].getStore();
        if(_rec)
        {
           _store.remove(_rec);
        }
    },
    onClickRefrescarUnidadMedida:function(btn){
      Ext.ComponentQuery.query('#idunidadmedida')[0].getStore().load();
    },
    onClickRefrescarPresentacion:function(btn){
      Ext.ComponentQuery.query('#idpresentacion')[0].getStore().load();
    },
    onClickRefrescarForma:function(b){
      Ext.ComponentQuery.query('#idformafarmaceutica')[0].getStore().load();
    },
    onKeyPressTextoDeBusquedaProducto:function(obj, e, eOpts){
      if(e.keyCode==13){
          __store = Ext.ComponentQuery.query('#dgvProductos')[0].getStore();
          __store.load({
              params:{
                nombre  : obj.getValue(),
                idclie : ''
              }
          });
      }
    },
    onKeyPressTextoMarca:function(obj,e,opt){
      if(e.keyCode==13){
        __store = Ext.ComponentQuery.query('#dgvProductos')[0].getStore();
        __store.load({
            params:{
              marca : obj.getValue(),
              idclie : 'x',
              nombre : (obj.getValue()==''?'*':'x')
            }
        });
      }
    },
    onSelectTipoProducto :function ( combo, record, eOpts ) {
      __store = Ext.ComponentQuery.query('#dgvProductos')[0].getStore();
      __store.load({
          params:{
            nombre : '',
            tipoproducto : combo.getValue()
          }
      });
    },
    onClickNuevoUnidadMedida:function(btn){
        this.getMostrarMenuMantenimiento();
    },
    onClickNuevoPresentacion:function(btn){
        this.getMostrarMenuMantenimiento();
    },
    onClickNuevoTipoProducto:function(btn){
        this.getMostrarMenuMantenimiento();
    },
    getMostrarMenuMantenimiento:function(){

      try {
        me = Ext.ComponentQuery.query('#wContenedorProducto')[0];
        l  = me.getLayout();
        l.setActiveItem(3);
        Ext.ComponentQuery.query('#btnRegresarIngresoProducto')[0].setHidden(false);
      } catch (e) {
          console.log(e);
      }

      /*_view = 'wRegMaestros';
      _tit = 'Registro de Maestros';
      _panel = Ext.ComponentQuery.query('#tabPrincipal')[0]; //this.lookupReference('tabPrincipal');
      try {
        if(_tit.length > 0){
        _panel.removeAll();
        if (!_panel.getChildByElement(_view)) {
          _panel.add({
            title: _tit,
            closable: true,
            id: _view,
            layout: 'fit',
            items: [{
              xtype: _view
            }]
          });
        }
       }
        _panel.setActiveTab(_view);
      } catch (err) {
        console.info(err);
      }*/
    },
    getMostrarMenuProveedor:function(){
      _view = 'wRegProveedores';
      _tit = 'Proveedores';
      _panel = this.getView().up('tabpanel');
      try {
        if(_tit == ''){return 0;}
        if (!_panel.getChildByElement(_view)) {
          _panel.add({
            title: _tit,
            closable: true,
            id: _view,
            layout: 'fit',
            items: [{
              xtype: _view
            }]
          });

        }
        _panel.setActiveTab(_view);
      } catch (err) {
        console.info(err);
      }
    },
    onClickNuevoProveedor:function(){
      this.getMostrarMenuProveedor();
    },
    onClickRefrescarProveedor:function(){
        Ext.ComponentQuery.query('#cboProveedorGrid')[0].getStore().load();
    },
    onClickEliminarProductoSerie:function(btn){
      r = btn.getWidgetRecord();
      if(r){
        Ext.Ajax.request({
            url :sisfacturaelectronica.util.Rutas.productoEliminarSerie,
            params:{
              id : r.get('id')
            },
            success:function(response){
               var text =Ext.JSON.encode(response.responseText);
                Ext.each(text,function(row,e){
                  console.log(row);
                  Ext.ComponentQuery.query('#dgvProductoExistencias')[0].getStore().reload();
                });
            }
        });
      }
    },
    onClickActStockMa:function(b){
     r = Ext.ComponentQuery.query('#wFormProducto')[0].getRecord(); 
     Ext.createByAlias('widget.wActDisponibilidad');
     Ext.ComponentQuery.query('#frmdispo')[0].loadRecord(r);
    },
    onChangeCargarImagenBase64:function(field, path){
      me = this;
      if (path) {
        files = Ext.ComponentQuery.query("#fileimg")[0].fileInputEl.dom.files;  
        file = files[0];
        reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = function (event) {
          var binaryString = '',
            bytes = new Uint8Array(event.target.result),
            length = bytes.byteLength,
            i,
            base64String;
          // convert to binary string
          for (i = 0; i < length; i++) {
            binaryString += String.fromCharCode(bytes[i]);
          }
          base64String = btoa(binaryString);
          srcBase64 = "data:image/jpeg;base64," + base64String;
          Ext.ComponentQuery.query('#imagen')[0].setValue(srcBase64);
          Ext.ComponentQuery.query('#imgprod')[0].setSrc(
            srcBase64
          );
          Ext.ComponentQuery.query('#imagenguardar')[0].setValue(1);
        }
      }
    },
    onClickRemoverImagen:function(b){
      Ext.ComponentQuery.query('#imgprod')[0].setSrc(
        'resources/images/imagen.png'
      );
      Ext.ComponentQuery.query('#imagen')[0].setValue('');
      Ext.ComponentQuery.query('#imagenguardar')[0].setValue(0);
    },
    onSelectedAlmacen:function(c){
        this.lookupReference('almacenseccion').getStore().load({
            params:{
                id : c.getValue()
            }
        });    
    },
    onClickCopiar:function(b){
      Ext.ComponentQuery.query('[name=id]')[0].setValue(0);
      Ext.ComponentQuery.query('[name=codigoproducto]')[0].setValue('');
      Ext.ComponentQuery.query('[name=codigobarras]')[0].setValue('');
      o=Ext.ComponentQuery.query('[name=nombre]')[0];
      t= o.getValue();
      o.setValue(t + ' (copia)');
      sisfacturaelectronica.util.Util.focusControl('nombre'); 
    },
    onClickEditarProductoSerie:function(b){
      r = b.getWidgetRecord();
      Ext.create('sisfacturaelectronica.view.almacen.ProductoExistenciasEditar');
      Ext.ComponentQuery.query('#frmProdExistencia')[0].loadRecord(r);
      
    },
    onClickActualizar:function(b){
       me = this.getView();
       f = Ext.ComponentQuery.query('#frmProdExistencia')[0];
       r = Ext.ComponentQuery.query('#dgvProductoExistencias')[0].getStore();
       if(f.isValid()){
          f.submit({
            waitMsg: 'Guardando informacion...',
            success: function (form, action) {
                if(action.result.error!=0){
                  r.reload();
                  me.close();     
                }
            },
            failure: function () {
                Ext.Msg.alert("SisFacturaElectronica","Vuelva a enviar la información, si persiste llamar a soporte.");
            }
          });
       }
    },
    onClickCancelar:function(b){
       this.getView().close();
    },
    onChangeVentaUnidad:function(ob, nv, ov, op ){
      if(nv){
        Ext.ComponentQuery.query('[name=preciounidad]')[0].setDisabled(false);
      }else{
        Ext.ComponentQuery.query('[name=preciounidad]')[0].setDisabled(true).setValue(0);
      }
      
    },
    onChangeVentaBlister:function(ob, nv, ov, op ){
      if(nv){
        Ext.ComponentQuery.query('[name=cantidadblister]')[0].setDisabled(false);
        Ext.ComponentQuery.query('[name=precioblister]')[0].setDisabled(false);
      }else{
        Ext.ComponentQuery.query('[name=cantidadblister]')[0].setDisabled(true).setValue(0);
        Ext.ComponentQuery.query('[name=precioblister]')[0].setDisabled(true).setValue(0);
      }
    }



});
