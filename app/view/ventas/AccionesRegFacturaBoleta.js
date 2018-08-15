Ext.define('sisfacturaelectronica.view.ventas.AccionesRegFacturaBoleta', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-regfacturaboleta',

    //@Cliente Seleccionar grilla
    onSelectedCliente:function( grid, record, index, eOpts ){
      try {
        var me =  Ext.ComponentQuery.query('#wContenedorCliente')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(1);
        Ext.ComponentQuery.query('#wFormClienteListado')[0].loadRecord(record);
      } catch (e) {
        console.log('Editar Cliente');
      }
    },

    onSelectedClienteERP:function( grid, record, index, eOpts ){
      try {
          _txt  = Ext.String.format('Pedidos  : {0}',record.get('cotizaciones'));
          _txtf = Ext.String.format('Facturación  : {0}',record.get('ventas'));
          Ext.ComponentQuery.query('#btnCotizaciones')[0].setText(_txt);
          Ext.ComponentQuery.query('#btnFacturasBoletas')[0].setText(_txtf);


      } catch (e) {
        console.log('Select ERP cliente');
      }
    },

    onClickBuscarProducto: function (btn) {
      if(Ext.ComponentQuery.query('#cboDatosCliente')[0].getValue()){
        var _win = Ext.create('sisfacturaelectronica.view.ventas.BuscarProductoFB', { 
            cliente: Ext.ComponentQuery.query('#cboDatosCliente')[0].getValue(),
            detalle : 'dgvDetalleVentaFacturaBoleta' 
        });
        _win.show(btn, function () {}, this);
      }else{
        Ext.Msg.alert("AkinetFarma","Buscar al cliente para buscar los precios de los productos !!"); return false;
      }
    },
    onClickIngresarCotizacion: function (btn) {
        var _win = Ext.create('sisfacturaelectronica.view.ventas.RegistrarCotizacion');
        _win.show(btn, function () {}, this);
    },
    onClickEliminarProducto:function(button, event, eOpts){
        var rec = button.getWidgetRecord();
        me = this;

        Ext.MessageBox.confirm('Aviso','Desea eliminar el producto ?',function(btn){
          if(btn=='yes'){
            if (rec) {
               Ext.Ajax.request({
                   url :sisfacturaelectronica.util.Rutas.productoEliminar,
                   params:{
                     idproducto : rec.get('idprod')
                   },
                   success:function(response){
                     var data = Ext.JSON.decode(response.responseText);
                     Ext.each(data,function(r){
                       if(r.error != 0)
                            me.lookupReference('dgvProductos').getStore().load();
                     });
                   }
               });
            }
          }
        });
    },
    onClickEliminarCliente:function(button, event, eOpts){
      var rec = button.getWidgetRecord();
      me = this;

      Ext.MessageBox.confirm('Aviso','Desea eliminar al Cliente ?',function(btn){
        if(btn=='yes'){
          if (rec) {
             Ext.Ajax.request({
                 url :sisfacturaelectronica.util.Rutas.clienteEliminar,
                 params:{
                   vIdPersona : rec.get('idper')
                 },
                 success:function(response){
                   var data = Ext.JSON.decode(response.responseText);
                   Ext.each(data,function(r){
                     if(r.error != 0)
                        Ext.ComponentQuery.query('#dgvClientes')[0].getStore().load();
                  });
                 }
             });
          }
        }
      });
    },
    onClickEliminarCotizacion:function(button, event, eOpts){
      var rec = button.getWidgetRecord();
      me = this;
      Ext.MessageBox.confirm('Aviso','Desea Anular la cotizacion ?',function(btn){
        if(btn=='yes'){
          if (rec) {
             Ext.Ajax.request({
                 url :sisfacturaelectronica.util.Rutas.cotizacionEliminar,
                 params:{
                   vIdCoti : rec.get('vid')
                 },
                 success:function(response){
                   var data = Ext.JSON.decode(response.responseText);
                   Ext.each(data,function(r){
                     if(r.error != 0)
                          me.lookupReference('dgvVentasCotizaciones').getStore().load();
                          _storeDet = me.lookupReference('dgvDetalleCotizacion').getStore();
                          _storeDet.getProxy().extraParams = {vIdCotizacion: 0};
                          _storeDet.load(1);
                   });
                 }
             });
          }
        }
      });
    },
     onClickEditarCotizacion: function (btn) {
        //xamudio
        var _grid = this.lookupReference('dgvVentasCotizaciones');
        var _rec = btn.getWidgetRecord();// _grid.getSelectionModel().getSelection()[0];
       
        if(_rec){
            var me =  Ext.ComponentQuery.query('#wContenedorCotizaciones')[0];    //this;
            var l = me.getLayout();
            l.setActiveItem(1);
            Ext.ComponentQuery.query('#frmRegFacturaBoleta')[0].reset();
            Ext.ComponentQuery.query('#frmRegFacturaBoleta')[0].loadRecord(_rec);
            Ext.ComponentQuery.query('#dgvDetalleVentaFacturaBoleta')[0].getStore().removeAll();
            var  _dataDetalle= Ext.ComponentQuery.query('#dgvDetalleVentaFacturaBoleta')[0].getStore();
            var  _tot = 0;
            Ext.Ajax.request(
            {
                url :sisfacturaelectronica.util.Rutas.cotizacionDetalle,
                params:{
                  vIdCotizacion : _rec.get('vid')
                },
                success:function(response){
                   var _obj = Ext.JSON.decode(response.responseText);
                 
                   Ext.each(_obj.data,function(record,i){
                      if (record.cantidad != 0) {
                          _reg = {
                              "idprod": record.id,
                              "cantidad": record.cantidad,
                              "descripcion": record.descripcion,
                              "precio": record.precio,
                              "total": record.total,
                              "vencimiento": Ext.Date.format(record.vencimiento, 'd/m/Y')   //(record.vencimiento==null? null:  Ext.Date.format(record.vencimiento, 'd/m/Y') )
                          };
                          _tot = _tot + record.total;
                          _dataDetalle.insert(0,_reg);
                         
                      }
                   });

                    __objChk      = Ext.ComponentQuery.query('#incluyeigv')[0];
                    __objIgv      = Ext.ComponentQuery.query('#igvventas')[0];
                    __objSubTotal = Ext.ComponentQuery.query('#Subtotalventas')[0];
                    __objTotal    = Ext.ComponentQuery.query('#TotalGeneral')[0];
                    
                    var _igv = 0;
                    __objSubTotal.setValue(_tot.toFixed(2));
                    if (__objChk.getValue()){var _igv = 0;}
                    else{var _igv = _tot * 0.18;}
                    __objSubTotal.setValue(
                        Ext.util.Format.number(_tot.toFixed(2), "0,000.00000") 
                    );
                    __objIgv.setValue(
                        Ext.util.Format.number(_igv.toFixed(2), "0,000.00000") 
                    );
                    var _totven = 0;
                    _totven     = _tot + _igv;
                    __objTotal.setValue(
                        Ext.util.Format.number(_totven.toFixed(2), "0,000.00000") 
                    );
                }
            });
         
    
        }

    },

    onClickNuevoCliente: function (btn) {
        w = Ext.create('sisfacturaelectronica.view.ventas.RegistrarCliente');
        w.show(btn, function () {}, this);
    },
    onClickNuevoProductoPorCotizacion: function (btn) {
        var _win = Ext.create('Ext.window.Window', {
            layout:'fit',
            width:1200,
            height:700,
            autoShow:true,
            modal:true,
            itemId : 'winProductoCoti',
            items:[
              {
                xtype:'wRegProducto'
              }
            ]
        });
    },
    onClickCancelarCliente: function () {
        _win = this.getView();
        _win.close();
    },

    onSelectOptionProducto: function (combo, record, index) {
        Ext.ComponentQuery.query('#txtCantidad')[0].focus();
    },
    onKeyPressCantidad: function (txt, e, eOpts) {
        if (e.keyCode == 13) {
            me = this;
            var _store = me.lookupReference('dgvDetalleVentaFacturaBoleta').getStore();
            var _producto = me.lookupReference('cboDescripcionProd');

            _pro = _producto.getValue();
            _pro = _pro.split('-');
            _data = {
                idprod: parseInt(_pro[0]),
                descripcion: _producto.getRawValue(),
                cantidad: txt.getValue(),
                precio: parseFloat(_pro[1]),
                total: parseInt(1) * parseInt(txt.getValue())
            };
            if (_store.findRecord('idprod', parseInt(_pro[0]))) {
                Ext.Msg.alert("Error", "Producto ya se encuentra cargada");
                return false;
            }
            _store.insert(0, _data);
            _producto.setRawValue('');
            txt.setValue(0);
            this.onCalcularTotalVenta(false);
        }

    },
    onEditorCalcularTotal: function (editor, e) {
      var _cant = 0;
      var _pre = 0;
      _cant = e.record.get('cantidad');
      _pre = e.record.get('precio');
      _tot = _pre * _cant;
      e.record.set('total', _tot.toFixed(2));
      this.onCalcularTotalVenta(false);
    },


    onSelectedIncluyeIGV: function (obj, newValue, oldValue, eOpts) {
        this.onCalcularTotalVenta(newValue);
    },
    onCalcularTotalVenta: function (conigv) {
        me = this;
        __objChk      = Ext.ComponentQuery.query('#incluyeigv')[0];
        __objIgv      = this.lookupReference('igvventas');
        __objSubTotal = this.lookupReference('Subtotalventas');
        __objTotal    = this.lookupReference('TotalGeneral');
        console.log("debug.....");
        s = Ext.ComponentQuery.query('#dgvDetalleVentaFacturaBoleta')[0].getStore();
        t = 0;
        s.each(function (r) {
            t = t + r.get('total');
        });
        console.log(__objChk.getValue());
        if(__objChk.getValue()){
            s = t / 1.18;
            i = t -(t / 1.18);
        }else{            
            s = t ;
            i = t * 0.18;
            t = s + i;
        }
        __objSubTotal.setValue(s.toFixed(2));
        __objIgv.setValue(i.toFixed(2));
        __objTotal.setValue(t.toFixed(2));
    },
    onCalcularTotalVentaPorBusqueda: function () {
        me = this;
        __objChk      = Ext.ComponentQuery.query('#incluyeigv')[0];
        __objIgv      = Ext.ComponentQuery.query('#igvventas')[0];
        __objSubTotal = Ext.ComponentQuery.query('#Subtotalventas')[0];
        __objTotal    = Ext.ComponentQuery.query('#TotalGeneral')[0];

        var store = Ext.ComponentQuery.query('#dgvDetalleVentaFacturaBoleta')[0].getStore();
        var _tot = 0;
        var _igv = 0;
        store.each(function (record) {
            _tot = _tot + record.get('total');
        });
        s = _tot / 1.18;
        i = _tot -(_tot / 1.18);
        __objSubTotal.setValue(s.toFixed(2));
        __objIgv.setValue(i.toFixed(2));
        __objTotal.setValue(_tot.toFixed(2));
    },
    onClickEliminarDetalle: function (button, event, eOpts) {
        var grid = this.lookupReference('dgvDetalleVentaFacturaBoleta');
        var store = grid.getStore();
        var rec = button.getWidgetRecord();
        if (rec) {
            store.remove(rec);
            this.onCalcularTotalVenta(false);
        }
    },
    onClickSalirCotizacion:function(){
          var me =  Ext.ComponentQuery.query('#wContenedorCotizaciones')[0];    //this;
          var l = me.getLayout();
          l.setActiveItem(0);

    },
    onClickGuardarFacturaBoleta: function () {
       var _form =  Ext.ComponentQuery.query('#frmRegFacturaBoleta')[0];    //this.lookupReference('frmRegFacturaBoleta');
        if (_form.isValid()) {

            var _dataDetalle = [];
            var s = this.lookupReference('dgvDetalleVentaFacturaBoleta').getStore();
            me = this;
            s.each(function (record) {
                if (record.get('cantidad') != 0) {
                    _reg = {
                        "idprod": record.get('idprod'),
                        "cantidad": record.get('cantidad'),
                        "precio": record.get("precio"),
                        "total": record.get("total"),
                        "vencimiento": (record.get("vencimiento")==null? null:  Ext.Date.format(record.get("vencimiento"), 'd/m/Y') )
                    };
                    _dataDetalle.push(_reg);
                }

            });
            _txt1 = Ext.ComponentQuery.query('#txtJsonDetalle');
            _txt1[0].setValue(JSON.stringify(_dataDetalle));
            var _view = this.getView();
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                       sisfacturaelectronica.util.Util.showToast("Documento Guardado");
                       f=Ext.ComponentQuery.query("#frmRegFacturaBoleta")[0];
                       if(f){
                           f.reset();
                           s.removeAll();
                            c = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0];
                            if(c){
                                sf = Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getStore();
                                sf.reload();
                                l = c.getLayout();
                                l.setActiveItem(0);
                            }
                       }
                    } 
                },
                failure: function () {
                    Ext.Msg.alert("AkinetFarma", action.result.msg);
                    _view.close();
                }
            });
        } else {
            sisfacturaelectronica.util.Util.showErrorMsg('error al guardar factura individual');
        }
    },

    //@ Acciones de Matenimiento

    onClickMantenimiento: function () {
        var _win = Ext.create('sisfacturaelectronica.view.ventas.Mantenimiento');
    },

    //@ Acciones Clientes
    //@ Accion en la ventana de registro de usuario por el formulario de cotizaciones
    onClickGuardarCliente: function () {
        var _form = this.lookupReference('myFormCliente');
        var _store = Ext.ComponentQuery.query('#cboDatosCliente')[0].getStore();
        if (_form.isValid()) {
            var _view = this.getView();
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    _store.load();
                    _view.close();
                },
                failure: function (error) {
                    Ext.Msg.alert("AkinetFarma", "Error al guardar");
                    _view.close();
                }
            });
        } else {
            sisfacturaelectronica.util.Util.showErrorMsg('Ingresar los datos para la cotización!');
        }
    },
    onClickGuardarClienteViaListado: function () {

        try {
            if( Ext.ComponentQuery.query('window')[1].objeto !=''){ // Si esta opcion de objeto no es vacio estamos es un modal de mantenimiento para los combos
                var _form =   Ext.ComponentQuery.query('#wFormClienteListado')[0];
                if (_form.isValid()) {
                    _form.submit({
                        waitMsg: 'Guardando informacion...',
                        success: function (form, action) {
                            __combo = Ext.ComponentQuery.query('window')[1].objeto;
                            __combo = Ext.ComponentQuery.query('#'+__combo)[0].getStore();
                            __combo.load();
                            Ext.ComponentQuery.query('window')[1].close();
                        },
                        failure: function () {
                            sisfacturaelectronica.util.Util.showErrorMsg("Error al momento de grabar la informacion");
                        }
                    });
                } else {
                    sisfacturaelectronica.util.Util.showErrorMsg('Ingresar los datos para la cotización!');
                }
          }
         
        } catch (error) {
            var _form =   Ext.ComponentQuery.query('#wFormClienteListado')[0];
            var _store =  Ext.ComponentQuery.query('#dgvClientes')[0].getStore();
            if (_form.isValid()) {
                _form.submit({
                    waitMsg: 'Guardando informacion...',
                    success: function (form, action) {
                        _store.getProxy().extraParams = {
                            vDocumento: null,
                            vRuc: null,
                            query: null
                        };
                        _store.load(1);
                        var me =  Ext.ComponentQuery.query('#wContenedorCliente')[0];    //this;
                        var l = me.getLayout();
                        l.setActiveItem(0);
                    },
                    failure: function () {
                        sisfacturaelectronica.util.Util.showErrorMsg("Error al momento de grabar la informacion");
                    }
                });
            } else {
                sisfacturaelectronica.util.Util.showErrorMsg('Ingresar los datos para la cotización!');
            }
        }

    },

    onClickRowProducto: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
 
        me = this;
        s = Ext.ComponentQuery.query('#dgvDetalleVentaFacturaBoleta')[0].getStore();
        ps= Ext.ComponentQuery.query('#posicion')[0];
        i = ps.getValue();
        p = 0;
        d = {
          idprod: parseInt(record.get('id')),
          descripcion: record.get('nombre'),
          cantidad: 1,
          precio: parseFloat(record.get('precioprod')),
          total: parseInt(1) * parseFloat(record.get('precioprod'))
        };

        if (s.findRecord('idprod', parseInt(record.get('id')))) {
          Ext.Msg.alert("Error", "Producto ya se encuentra cargada");
          return false;
        }
        i = i+1;
        s.insert(i, d);
        ps.setValue(i);
        this.onCalcularTotalVentaPorBusqueda();
    },

    onClickBuscarProductoPorNombre: function (obj) {
        me = this;
        _store     = me.lookupReference('dgvBuscarProducto').getStore();
        _idCliente = this.lookupReference('tipopreciopersona').getValue();
        _store.getProxy().extraParams = {
            vCodigo: '',
            vDescripcion: me.lookupReference('txtProductoNombre').getValue(),
            vIdCliente : _idCliente

        };
        _store.load(1);
    },
    onChangeBuscarCategoriaProducto:function(combo, record, eOpts){
        me = this;
        _store = me.lookupReference('dgvProductos').getStore();
        _store.getProxy().extraParams = {vCodigo: null,vDescripcion: null,vCategoria : record.get('idcate')};
        _store.load(1);

    },

    onSelectedDetalleCotizacion: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        me = this;
        if(record.get('estado')==3)
        {
          Ext.ComponentQuery.query('#btnImprimirCotizacion')[0].setDisabled(true);
          //Ext.ComponentQuery.query('#btnEditarCotizacion')[0].setDisabled(true);
        }else{
          //Ext.ComponentQuery.query('#btnEditarCotizacion')[0].setDisabled(false);
          Ext.ComponentQuery.query('#btnImprimirCotizacion')[0].setDisabled(false);
        }

        _store = me.lookupReference('dgvDetalleCotizacion').getStore();
        _store.getProxy().extraParams = {
            vIdCotizacion: record.get('vid')
        };
        _store.load(1);
    },

    onClickBuscarCotizacionesPorFechas: function () {

        me = this;
        _store = me.lookupReference('dgvVentasCotizaciones').getStore();
        _store.getProxy().extraParams = {
            vDesde: Ext.ComponentQuery.query('#dfDesdeCotizaciones')[0].getRawValue(),
            vHasta: Ext.ComponentQuery.query('#dfHastaCotizaciones')[0].getRawValue(),
            vPersona: ''
        };
        _store.load(1);
        _storeDet = me.lookupReference('dgvDetalleCotizacion').getStore();
        _storeDet.getProxy().extraParams = {
            vIdCotizacion: 0
        };
        _storeDet.load(1);

    },

    //@Cliente  Nuevo
    onClickNuevoClienteLista: function (btn) {
        var form = this.lookupReference('myFormClienteListado');
        form.reset();
        Ext.ComponentQuery.query('#idper')[0].setValue(0);
        Ext.ComponentQuery.query('#paternoper')[0].focus();
    },
    //@Cliente Buscar Numero Dni
    onClickBuscarClienteDni: function (obj, e, eOpts) {
        txtDni = this.lookupReference('txtDniBuscar');

        var store = this.lookupReference('dgvClientes').getStore();
        store.getProxy().extraParams = {
            vDocumento: (txtDni.getValue().trim() == '' ? null : txtDni.getValue().trim()),
            vRuc: null,
            query: null
        };
        store.load(1);
    },
    //@Cliente Buscar Numero Ruc
    onClickBuscarClienteRuc: function (obj, e, eOpts) {
        txtRuc = this.lookupReference('txtRucBuscar');
        var store = this.lookupReference('dgvClientes').getStore();
        store.getProxy().extraParams = {
            vDocumento: null,
            vRuc: (txtRuc.getValue().trim() == '' ? null : txtRuc.getValue().trim()),
            query: null
        };
        store.load(1);

    },
    //Obtener datos del cliente por su RUC
    onClickBuscarRUCDatos:function(){
        _form           = this.lookupReference('myFormClienteListado');
        _rucper         = this.lookupReference('numrucper').getValue();
        _txtNombre      = this.lookupReference('nombreper');
        _txtDireccion   = this.lookupReference('domiciper');
        sisfacturaelectronica.util.Util.obtenerDatosRUC(_rucper,_txtNombre,_txtDireccion,_form);
    },
    //Obtener datos del cliente por su RUC
    onClickBuscarRUCDatosSimple:function(){
        _form           = this.lookupReference('myFormCliente');
        _rucper         = this.lookupReference('vnumruc').getValue();
        _txtNombre      = this.lookupReference('vnombre');
        _txtDireccion   = this.lookupReference('vdireccion');
        sisfacturaelectronica.util.Util.obtenerDatosRUCSimple(_rucper,_txtNombre,_txtDireccion,_form);
    },
    //@Cliente Buscar Por Cliente
    onClickBuscarClienteQuery: function (obj, e, eOpts) {

        txtQuery = this.lookupReference('txtQueryBuscar');
        var store = this.lookupReference('dgvClientes').getStore();
        store.getProxy().extraParams = {
            vDocumento: null,
            vRuc: null,
            query: (txtQuery.getValue().trim() == '' ? null : txtQuery.getValue().trim())
        };
        store.load(1);
    },
    onKeyPressTextoNombreCliente:function(texto, e, eOpts){ //eddy

        if(e.charCode == 13){
        txtQuery =  Ext.ComponentQuery.query('#txtQueryBuscar')[0];
        var store = Ext.ComponentQuery.query('#dgvClientes')[0].getStore();
        store.getProxy().extraParams = {
            vDocumento: null,
            vRuc: null,
            query: (txtQuery.getValue().trim() == '' ? null : txtQuery.getValue().trim())
        };
        store.load(1);
        }
    },

    //@Producto Seleccionar un Producto Listado
    onClickItemProducto: function (obj, record, item, index, e, eOpts) {
        console.log(record);
        var form = this.lookupReference('myFrmProducto');
        form.loadRecord(record);
    },

    // @ Producto Buscar por Codigo
    onClickBuscarProductoCodigo: function () {
        txtCodigo = this.lookupReference('txtBuscarCodigoProd');
        var store = this.lookupReference('dgvProductos').getStore();
        store.getProxy().extraParams = {
            vCodigo: (txtCodigo.getValue().trim() == '' ? null : txtCodigo.getValue().trim()),
            query: null
        };
        store.load(1);
    },
    // @ Producto Buscar por Descripcion
    onClickBuscarProductoDescripcion: function () {
        txtQuery = this.lookupReference('txtBuscarDescripcionProd');
        var store = this.lookupReference('dgvProductos').getStore();
        store.getProxy().extraParams = {
            vCodigo: null,
            query: (txtQuery.getValue().trim() == '' ? null : txtQuery.getValue().trim())
        };
        store.load(1);
    },

    // @Producto Metodo para Guardar
    onClickGuardarProducto: function (btn) {
        var _form = this.lookupReference('myFrmProducto');
        var _store = this.lookupReference('dgvProductos').getStore();
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {

                  if(Ext.ComponentQuery.query('#wRegistrarCotizacion')[0]){
                      Ext.ComponentQuery.query('#winProductoCoti')[0].close();
                  }else{
                      _store.reload();
                  }
                },
                failure: function () {
                    Ext.Msg.alert("Error","Error al momento de grabar los datos");
                }
            });
        } else {
            sisfacturaelectronica.util.Util.showErrorMsg('Ingresar los datos del producto');
        }
    },
    // @Producto Metodo Nuevo
    onClickNuevoProducto: function (btn) {
        var form = this.lookupReference('myFrmProducto');
        form.reset();
        Ext.ComponentQuery.query('#idprod')[0].setValue(0);
        Ext.ComponentQuery.query('#codprod')[0].focus();
    },

    //Lost Focus para los mantenimientos de Producto y Clientes
    onFocusTextoDeBusquedaProducto:function( texto, event, eOpts ){
          this.lookupReference('txtBuscarCodigoProd').setValue('');
          this.lookupReference('txtBuscarCodigoProd').setValue('');
    },

    // Key Event : Presionando ENTER
    onKeyPressTextoDeBusquedaProducto:function(texto, e, eOpts){
      if(e.charCode == 13){this.onClickBuscarProductoCodigo();}
    },
    onKeyPressTextoDeBusquedaProducto2:function(texto, e, eOpts){
        try {
            if(e.charCode == 13){this.onClickBuscarProductoPorNombre();}
        } catch (error) {
            this.onClickBuscarProductoPorNombre();
        }
      
    },

    //-----------------------------------------------------------
    onClickBuscarCotizacionesAnteriores:function(btn){
        var _codcliente = this.lookupReference('cboDatosCliente').getValue();
        if(_codcliente)
            Ext.create('sisfacturaelectronica.view.ventas.CotizacionesClienteBuscar',{ codigo : _codcliente });

    },
    onClickCancelarFacturaBoleta:function(btn){
        try {
            c = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0];
            if(c){
                l = c.getLayout();
                l.setActiveItem(0);
            }   
        } catch (error) {
            return false;   
        }
    },
    onClickNuevoProductoPopup:function(b){
        Ext.create('Ext.window.Window',{title:'Nuevo Producto',modal:true,width:1100,height:700,autoShow:true,
           layout:'fit', itemId:'frmprodpopup', items:[ {xtype:'wContenedorProducto'} ]}
        );
    }
});
