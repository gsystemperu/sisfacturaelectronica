Ext.define('sisfacturaelectronica.view.ventas.AccionesMantenimiento', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-mantenimiento',
    //@ Unidad de Medida
    onClickNuevaUnidadMedida: function (btn) {
        var _form = this.lookupReference('frmUnidadMedida');
        _form.reset();
        Ext.ComponentQuery.query('#idumed')[0].setValue(0);
        Ext.ComponentQuery.query('#txtDesUMed')[0].focus();
    },
    onClickGuardarUnidadMedida: function (btn) {
        var _store = this.lookupReference('dgvUnidadMedida').getStore();
        var _form = this.lookupReference('frmUnidadMedida');
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    _store.reload();
                    _form.reset();

                },
                failure: function () {
                    Ext.Msg.alert("Error", "Error al momento de grabar los datos");
                }
            });
        }
    },


    //@ Forma de Pago
    onClickNuevaFormaPago: function (btn) {
        var _form = this.lookupReference('frmFormaPago');
        _form.reset();
        this.lookupReference('idfopag').setValue(0);
        this.lookupReference('descripcion').focus();
    },
    onClickGuardarFormaPago: function (btn) {
        var _store = this.lookupReference('dgvFormaPago').getStore();
        var _form = this.lookupReference('frmFormaPago');
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    _store.reload();
                    _form.reset();
                    Ext.ComponentQuery.query('#idfopag')[0].getStore().load();
                },
                failure: function () {
                    Ext.Msg.alert("Error", "Error al momento de grabar los datos");
                }
            });
        }
    },
    onSelectedFormaPago:function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts){
        var form = this.lookupReference('frmFormaPago');
        form.loadRecord(record);
    },


    //@ Modo de Entrega
    onClickNuevoModoEntrega: function (btn) {
        var _form = this.lookupReference('frmModoEntrega');
        _form.reset();
        this.lookupReference('idmodo').setValue(0);
        this.lookupReference('descripcion').focus();
    },
    onClickGuardarModoEntrega: function (btn) {
        var _store = this.lookupReference('dgvModoEntrega').getStore();
        var _form = this.lookupReference('frmModoEntrega');
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    _store.reload();
                    _form.reset();
                    Ext.ComponentQuery.query('#vmodoentrega')[0].getStore().reload();
                },
                failure: function () {
                    Ext.Msg.alert("Error", "Error al momento de grabar los datos");
                }
            });
        }
    },
    onSelectedModoEntrega:function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts){
      var form = this.lookupReference('frmModoEntrega');
      form.loadRecord(record);
    },

    //@ Vendedores
    onClickNuevoVendedor: function (btn) {
        var _form = this.lookupReference('frmVendedores');
        _form.reset();
        this.lookupReference('idvend').setValue(0);
        this.lookupReference('nomvend').focus();
    },
    onClickGuardarVendedor: function (btn) {
        var _store = this.lookupReference('dgvVendedor').getStore();
        var _form = this.lookupReference('frmVendedores');
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    _store.reload();
                    _form.reset();
                    Ext.ComponentQuery.query('#vvendedor')[0].getStore().reload();

                },
                failure: function () {
                    Ext.Msg.alert("Error", "Error al momento de grabar los datos");
                }
            });
        }
    },
    onSelectedVendedor:function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts){
      var form = this.lookupReference('frmVendedores');
      form.loadRecord(record);
    },


    //@ Estadisticas:  Por Cliente
    onClickCotizacionesPorCliente: function () {
        var idcliente = this.lookupReference('cboDatosCliente').getValue();
        var desde = this.lookupReference('dfDesde').getRawValue();
        var hasta = this.lookupReference('dfHasta').getRawValue();
        var store = this.lookupReference('dgvEstFechas').getStore();
        store.getProxy().extraParams = {
            vDesde: desde,
            vHasta: hasta,
            vPersona: idcliente
        };
        store.load({
            scope: this,
            callback: function (records, operation, success) {
                this.lookupReference('txtConteoCoti').setValue(records.length);
                var total = 0;
                Ext.Array.each(records, function (value) {
                    total += value.get('totalcoti');
                });
                this.lookupReference('txtSumaCoti').setValue(total);
            }
        });

    },

    //@ Estadisticas:  Por Producto
    onClickCotizacionesPorProducto: function () {
        var idproducto = this.lookupReference('cboProducto').getValue();
        var desde = this.lookupReference('dfDesde').getRawValue();
        var hasta = this.lookupReference('dfHasta').getRawValue();
        var store = this.lookupReference('dgvEstFechas').getStore();
        store.getProxy().extraParams = {
            vDesde: desde,
            vHasta: hasta,
            vProducto: idproducto
        };
        store.load({
            scope: this,
            callback: function (records, operation, success) {
                var total = 0;
                Ext.Array.each(records, function (value) {
                    total += value.get('total');
                });
                this.lookupReference('txtConteoCoti').setValue(records.length);
                this.lookupReference('txtSumaCoti').setValue(total);
            }
        });

    },

      //@ Estadisticas:  Por Vendedor
    onClickCotizacionesPorVendedor: function () {
        var idvendedor = this.lookupReference('cboVendedor').getValue();
        var desde = this.lookupReference('dfDesde').getRawValue();
        var hasta = this.lookupReference('dfHasta').getRawValue();
        var store = this.lookupReference('dgvEstFechas').getStore();
        store.getProxy().extraParams = {
            vDesde: desde,
            vHasta: hasta,
            vVendedor: idvendedor
        };
        store.load({
            scope: this,
            callback: function (records, operation, success) {
                var total = 0;
                Ext.Array.each(records, function (value) {
                    total += value.get('totalcoti');
                });
                this.lookupReference('txtConteoCoti').setValue(records.length);
                this.lookupReference('txtSumaCoti').setValue(total);
            }
        });

    },

    //@ Eliminar Tablas Mantenimiento
    onClickEliminarFormaPago:function(button, event, eOpts){
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

    onClickEliminarModoEntrega:function(button, event, eOpts){
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
    onClickEliminarVendedor:function(button, event, eOpts){
        var rec = button.getWidgetRecord();
        if (rec) {
               Ext.Ajax.request({
                   url :sisfacturaelectronica.util.Rutas.vendedorEliminar,
                   params:{
                     idven : rec.get('idvend')
                   },
                   success:function(response){
                     var data = Ext.JSON.decode(response.responseText);
                     Ext.each(data,function(r){
                       if(r.error != 0)
                            me.lookupReference('dgvVendedor').getStore().load();
                            var _form = this.lookupReference('frmVendedores');_form.reset();
                     });
                   }
               });
            }

    },

    onClickEliminarPresentacion:function(button, event, eOpts){
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
    onClickEliminarCategoria:function(button, event, eOpts){
        var rec = button.getWidgetRecord();
          if (rec) {
               Ext.Ajax.request({
                   url :sisfacturaelectronica.util.Rutas.categoriaEliminar,
                   params:{
                     idcate : rec.get('idcate')
                   },
                   success:function(response){
                     var data = Ext.JSON.decode(response.responseText);
                     Ext.each(data,function(r){
                       if(r.error != 0)
                            me.lookupReference('dgvCategoria').getStore().load();
                            var _form = this.lookupReference('frmCategoria');_form.reset();
                            this.lookupReference('cboCategoria').getStore().load();
                     });
                   }
               });
            }

    },


    //@ Tabla Presentacion

    onClickNuevaPresentacion: function (btn) {
        var _form = this.lookupReference('frmPresentacion');
        _form.reset();
        this.lookupReference('idpres').setValue(0);
        this.lookupReference('despres').focus();
    },
    onClickGuardarPresentacion: function (btn) {
        var _store = this.lookupReference('dgvPresentacion').getStore();
        var _form = this.lookupReference('frmPresentacion');
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    _store.reload();
                    _form.reset();
                    Ext.ComponentQuery.query('#cboPresentacion')[0].getStore().reload();

                },
                failure: function () {
                    Ext.Msg.alert("Error", "Error al momento de grabar los datos");
                }
            });
        }
    },
    onSelectedPresentacion:function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts){
      var form = this.lookupReference('frmPresentacion');
      form.loadRecord(record);
    },

    //@ Tabla Categoria

    onClickNuevaCategoria: function (btn) {
        var _form = this.lookupReference('frmCategoria');
        _form.reset();
        this.lookupReference('idcate').setValue(0);
        this.lookupReference('descate').focus();
    },
    onClickGuardarCategoria: function (btn) {
        var _store = this.lookupReference('dgvCategoria').getStore();
        var _form = this.lookupReference('frmCategoria');
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    _store.reload();
                    _form.reset();
                    //Ext.ComponentQuery.query('#vvendedor')[0].getStore().reload();

                },
                failure: function () {
                    Ext.Msg.alert("Error", "Error al momento de grabar los datos");
                }
            });
        }
    },
    onSelectedCategoria:function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts){
      var form = this.lookupReference('frmCategoria');
      form.loadRecord(record);
    },


});
