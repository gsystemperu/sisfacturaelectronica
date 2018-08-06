Ext.define('sisfacturaelectronica.view.mrp.AccionesFormListaMaterial', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-formlistamaterial',
    init:function(){
      console.log('iniciado');
    },
    onClickAddProducto:function(btn){
      _store = Ext.ComponentQuery.query('#dgvDetListaMaterial')[0].getStore();
      _data = {
        "producto"     : '',
        "cantidad"     : 0,
        "unidadmedida" : ''
      };
      if(_store.getCount()){
        _store.insert(_store.getCount() + 1,_data);
      }else{
         _store.insert(0,_data);
      }
    },
    onClickEliminarProductoMaterial:function(btn){
      var _rec   = btn.getWidgetRecord();
      var _store = Ext.ComponentQuery.query('#dgvDetListaMaterial')[0].getStore();
      if(_rec)
      {
         _store.remove(_rec);
      }
    },
    onClickGuardarListaMaterial:function(btn){
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
                       "producto": record.get('producto'),
                       "cantidad": record.get("cantidad"),
                       "unidadmedida": record.get("unidadmedida")
                  };
                   _dataDetalle.push(_reg);
               }

           });
           _txt1 = Ext.ComponentQuery.query('#jsondetallelistamaterial');
           _txt1[0].setValue(JSON.stringify(_dataDetalle));
          _form.submit({
              waitMsg: 'Guardando informacion...',
              success: function (form, action) {
                  if(action.result.error!=0){
                    try {
                        //var me = Ext.ComponentQuery.query('#wContenedorFormula')[0];
                        /*var l  = me.getLayout();
                        l.setActiveItem(0);
                        Ext.ComponentQuery.query('#dgvListadoMateriales')[0].getStore().reload({
                          /*params:{
                            nombre : action.result.producto
                          }*/
                        //});

                      } catch (e) {
                        console.log(e);return false;

                      }
                  }
              },
              failure: function () {
                  Ext.Msg.alert("AkinetFarma","Se perdio la conexion con el servidor!");
              }
          });

      }
    }


  });
