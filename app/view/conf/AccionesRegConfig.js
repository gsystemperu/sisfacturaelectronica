
Ext.define('sisfacturaelectronica.view.conf.AccionesRegConfig', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-config',
    requires:['sisfacturaelectronica.util.Rutas'],

    //@ Tabla Estado
    //=============================================
    onClickGuardarEstado:function(btn){
        _form = this.lookupReference('frmEstados');
        _form.submit({
            waitMsg: 'Guardando informacion...',
            success: function(form, action) {
                /*_dgv = Ext.ComponentQuery.query('#dgvPedidos');
                _dgvd = Ext.ComponentQuery.query('#dgvLotePedidoDetalle');
                if(_dgvd[0]){
                    _dgvd[0].getStore().load();
                }else{
                    _dgv[0].getStore().load();
                }
                Ext.Msg.alert("Aviso", action.result.msg);
                _view.close();*/
            },
            failure: function() {
                Ext.Msg.alert("Aviso", action.result.msg);
                //_view.close();
            }
        });
    },
    onClickNuevoEstado:function(btn)
    {
        this.lookupReference('frmEstados').reset();
        Ext.ComponentQuery.query('#txtDescripcionEstado')[0].focus();
    },
    onSelectedEstado : function( grid, record, index, eOpts ) {this.lookupReference('frmEstados').loadRecord(record)},

      //@ Tabla Bancos
    //=============================================
    onClickGuardarBanco: function (btn) {
        _form = this.lookupReference('frmBancos');
        me    = this;
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                        me.lookupReference('dgvBancos').getStore().reload();
                    }
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });

        }
    },
    onClickNuevoBanco:function(btn)
    {
        this.lookupReference('frmBancos').reset();
        Ext.ComponentQuery.query('#txtDescripcionBanco')[0].focus();
    },
    onSelectedBanco : function( grid, record, index, eOpts ) {this.lookupReference('frmBancos').loadRecord(record)},

    onClickEliminarBanco:function(btn){
        me = this;
        Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.bancoEliminar,
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmBancos').reset();
                            me.lookupReference('dgvBancos').getStore().reload();
                    }
                }
             });
    },
     //@ Tabla Categorias
    //=============================================
    onClickGuardarCategoria:function(btn){
        _form = this.lookupReference('frmCategoria');
        if(_form.isValid()){
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                        me.lookupReference('dgvCategoria').getStore().reload();
                    }
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });
        }
    },
    onClickNuevoCategoria:function(btn)
    {
        this.lookupReference('frmCategoria').reset();
        Ext.ComponentQuery.query('#txtDescripcionCategoria')[0].focus();
    },
    onSelectedCategoria : function( grid, record, index, eOpts ) {this.lookupReference('frmCategoria').loadRecord(record)},

     onClickEliminarCategoria:function(btn){
        me = this;
        Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.categoriaEliminar,
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmCategoria').reset();
                            me.lookupReference('dgvCategoria').getStore().reload();
                    }
                }
             });

     },
     //@ Tabla Colores
    //=============================================
    onClickGuardarColor:function(btn){
        _form = this.lookupReference('frmColores');
        if(_form.isValid()){
             _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                        me.lookupReference('dgvColores').getStore().reload();
                    }
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });
        }
    },
    onClickNuevoColor:function(btn)
    {
        this.lookupReference('frmColores').reset();
        Ext.ComponentQuery.query('#txtDescripcionColor')[0].focus();
    },
    onSelectedColor : function( grid, record, index, eOpts ) {this.lookupReference('frmColores').loadRecord(record)},

    onClickEliminarColor:function(btn){
         me = this;
        Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.colorEliminar,
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmColores').reset();
                            me.lookupReference('dgvColores').getStore().reload();
                    }
                }
             });
    },
       //@ Tabla Medida
    //=============================================
    onClickGuardarMedida:function(btn){
        _form = this.lookupReference('frmMedidas');
        if(_form.isValid()){
           _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                        me.lookupReference('dgvMedidas').getStore().reload();
                    }
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });
        }
    },
    onClickNuevoMedida:function(btn)
    {
        this.lookupReference('frmMedidas').reset();
        Ext.ComponentQuery.query('#txtDescripcionMedidas')[0].focus();
    },
    onSelecteMedida : function( grid, record, index, eOpts ) {this.lookupReference('frmMedidas').loadRecord(record)},
    onClickEliminarMedida:function(btn){
         me = this;
        Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.medidaEliminar,
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmMedidas').reset();
                            me.lookupReference('dgvMedidas').getStore().reload();
                    }
                }
             });
    },
       //@ Tabla Unidad Medida
    //=============================================
    onClickGuardarUnidadMedida:function(btn){
        _form = this.lookupReference('frmUnidadMedida');
        if(_form.isValid()){
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                        me.lookupReference('dgvUnidadMedida').getStore().reload();
                    }
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });
        }
    },
    onClickNuevoUnidadMedida:function(btn)
    {
        this.lookupReference('frmUnidadMedida').reset();
        Ext.ComponentQuery.query('#txtDescripcionUnidadMedida')[0].focus();
    },
    onSelectedUnidadMedida : function( grid, record, index, eOpts ) {this.lookupReference('frmUnidadMedida').loadRecord(record)},
    onClickEliminarUnidadMedida:function(btn){

          me = this;
        Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.unidadMedidaEliminar,
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmUnidadMedida').reset();
                            me.lookupReference('dgvUnidadMedida').getStore().reload();
                    }
                }
             });

    },
       //@ Tabla Tipo Producto
    //=============================================
    onClickGuardarTipoProducto:function(btn){
       me =this;
        _form = this.lookupReference('frmTipoProducto');
        if(_form.isValid()){
             _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){

                        me.lookupReference('dgvTipoProducto').getStore().reload();
                    }
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });
        }
    },
    onClickNuevoTipoProducto:function(btn)
    {
        this.lookupReference('frmTipoProducto').reset();
        Ext.ComponentQuery.query('#txtDescripcionTipoProducto')[0].focus();
    },
    onSelectedTipoProducto : function( grid, record, index, eOpts ) {this.lookupReference('frmTipoProducto').loadRecord(record)},
    onClickEliminarTipoProducto:function(btn){
          me = this;
        Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.tipoProductoEliminar,
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmTipoProducto').reset();
                            me.lookupReference('dgvTipoProducto').getStore().reload();
                    }
                }
             });

    },
        //@ Tabla Tarifas
    //=============================================
    onClickGuardarTarifa:function(btn){
        _form = this.lookupReference('frmTarifas');
        if(_form.isValid()){
            console.log("guardado");
        }
    },
    onClickNuevoTarifa:function(btn)
    {
        this.lookupReference('frmTarifas').reset();
        Ext.ComponentQuery.query('#txtDescripcionTarifa')[0].focus();
    },
    onSelectedTarifa : function( grid, record, index, eOpts ) {this.lookupReference('frmTarifas').loadRecord(record)},

    onClickEliminarTarifa:function(btn){
        console.log(btn.getWidgetRecord());
    },
    onSelectedPresentacion:function(grid, record, index, eOpts){
      this.lookupReference('frmPresentacion').loadRecord(record);
    },
    onClickGuardarPresentacion:function(){
      me =this;
       _form = this.lookupReference('frmPresentacion');
       if(_form.isValid()){
            _form.submit({
               waitMsg: 'Guardando informacion...',
               success: function (form, action) {
                   if(action.result.error!=0){
                       me.lookupReference('dgvPresentacion').getStore().reload();
                   }
               },
               failure: function () {
                   Ext.Msg.alert("Aviso", action.result.msg);
               }
           });
       }
    },
    onClickEliminarPresentacion:function(button){
      var rec = button.getWidgetRecord();
          if (rec) {
             Ext.Ajax.request({
                 url :sisfacturaelectronica.util.Rutas.presentacionEliminar,
                 params:{
                   idpres : rec.get('idpres')
                 },
                 success:function(response){
                   var data = Ext.JSON.decode(response.responseText);
                   Ext.each(data,function(r){
                     if(r.error != 0)
                          me.lookupReference('dgvPresentacion').getStore().load();
                          var _form = this.lookupReference('frmPresentacion');_form.reset();
                  });
                 }
             });
          }
    },
    onClickNuevoPresentacion:function(btn){
      this.lookupReference('frmPresentacion').reset();
      Ext.ComponentQuery.query('#txtDescripcionPresentacion')[0].focus();
    },
    onSelectedFormaPago:function(grid, record, index, eOpts){
        this.lookupReference('frmFormaPago').loadRecord(record);
    },
    onSelectedForma:function(grid, record, index, eOpts){
        this.lookupReference('frmForma').loadRecord(record);
    },
    onClickNuevaForma:function(b){
        this.lookupReference('frmForma').reset();
        Ext.ComponentQuery.query('#txtDescripcionForma')[0].focus();
    },
    onClickGuardarForma:function(b){
        me =this;
        _form = this.lookupReference('frmForma');
        if(_form.isValid()){
             _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                        me.lookupReference('dgvForma').getStore().reload();
                    }
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });
        }
    },
    onClickEliminarForma:function(b){
        var rec = b.getWidgetRecord();
        if (rec) {
               Ext.Ajax.request({
                   url :sisfacturaelectronica.util.Rutas.formaFarmaceuticaEliminar,
                   params:{
                     idforma : rec.get('id')
                   },
                   success:function(response){
                     var data = Ext.JSON.decode(response.responseText);
                     Ext.each(data,function(r){
                       if(r.error != 0)
                            me.lookupReference('dgvForma').getStore().load();
                            me.lookupReference('frmForma').reset();
  
                     });
                   }
               });
            }
    },
    onClickGuardarFormaPago:function(){
      me =this;
       _form = this.lookupReference('frmFormaPago');
       if(_form.isValid()){
            _form.submit({
               waitMsg: 'Guardando informacion...',
               success: function (form, action) {
                   if(action.result.error!=0){
                       me.lookupReference('dgvFormaPago').getStore().reload();
                   }
               },
               failure: function () {
                   Ext.Msg.alert("Aviso", action.result.msg);
               }
           });
       }
    },
    onClickNuevoFormaPago:function(btn){
      this.lookupReference('frmFormaPago').reset();
      Ext.ComponentQuery.query('#txtDescripcionPresentacion')[0].focus();
    },
    onClickEliminarFormaPago:function(button){
      var rec = button.getWidgetRecord();
      if (rec) {
             Ext.Ajax.request({
                 url :sisfacturaelectronica.util.Rutas.formaPagoEliminar,
                 params:{
                   idfpago : rec.get('idfopag')
                 },
                 success:function(response){
                   var data = Ext.JSON.decode(response.responseText);
                   Ext.each(data,function(r){
                     if(r.error != 0)
                          me.lookupReference('dgvFormaPago').getStore().load();
                          me.lookupReference('frmFormaPago').reset();

                   });
                 }
             });
          }
    },
    onSelectedModoEntrega:function(grid, record, index, eOpts){
      var form = this.lookupReference('frmModoEntrega');
      form.loadRecord(record);
    },
    onClickGuardarModoEntrega:function(btn){
      me =this;
       _form = this.lookupReference('frmModoEntrega');
       if(_form.isValid()){
            _form.submit({
               waitMsg: 'Guardando informacion...',
               success: function (form, action) {
                   if(action.result.error!=0){
                       me.lookupReference('dgvModoEntrega').getStore().reload();
                   }
               },
               failure: function () {
                   Ext.Msg.alert("Aviso", action.result.msg);
               }
           });
       }
    },
    onClickNuevoModoEntrega:function(btn){
      this.lookupReference('frmModoEntrega').reset();
      Ext.ComponentQuery.query('#txtDescripcionModoEntrega')[0].focus();
    },
    onClickEliminarModoEntrega:function(button){
      var rec = button.getWidgetRecord();
        if (rec) {
             Ext.Ajax.request({
                 url :sisfacturaelectronica.util.Rutas.modoEntregaEliminar,
                 params:{
                   idmodo : rec.get('idmodo')
                 },
                 success:function(response){
                   var data = Ext.JSON.decode(response.responseText);
                   Ext.each(data,function(r){
                     if(r.error != 0)
                         me.lookupReference('dgvModoEntrega').getStore().load();
                         var _form = this.lookupReference('frmModoEntrega');_form.reset();
                   });
                 }
             });
          }
    },

    //@ Tabla Marca
    //=============================================
    onClickGuardarMarca: function (btn) {
        _form = this.lookupReference('frmMarca');
        me    = this;
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                        me.lookupReference('dgvMarca').getStore().reload();
                    }
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });

        }
    },
    onClickNuevoMarca:function(btn)
    {
        this.lookupReference('frmMarca').reset();
        Ext.ComponentQuery.query('#txtDescripcionMarca')[0].focus();
    },
    onSelectedMarca : function( grid, record, index, eOpts ) {this.lookupReference('frmMarca').loadRecord(record)},

    onClickEliminarMarca:function(btn){
        me = this;
        Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.marcaEliminar,
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmMarca').reset();
                            me.lookupReference('dgvMarca').getStore().reload();
                    }
                }
             });
    },

    //@ Tabla Modelo
    //=============================================
    onClickGuardarModelo: function (btn) {
        _form = this.lookupReference('frmModelo');
        me    = this;
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                        me.lookupReference('dgvModelo').getStore().reload();
                    }
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });

        }
    },
    onClickNuevoModelo:function(btn)
    {
        this.lookupReference('frmModelo').reset();
        Ext.ComponentQuery.query('#txtDescripcionModelo')[0].focus();
    },
    onSelectedModelo : function( grid, record, index, eOpts ) {this.lookupReference('frmModelo').loadRecord(record)},

    onClickEliminarModelo:function(btn){
        me = this;
        Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.modeloEliminar,
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmModelo').reset();
                            me.lookupReference('dgvModelo').getStore().reload();
                    }
                }
             });
    },

});
