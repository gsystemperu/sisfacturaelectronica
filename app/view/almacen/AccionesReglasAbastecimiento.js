
Ext.define('sisfacturaelectronica.view.almacen.AccionesReglasAbastecimiento', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-abastecimiento',
    requires:[
        'sisfacturaelectronica.util.Rutas',
       
    ],   
    //@ Tabla Abastecimiento
    //=============================================
    onClickIngresar:function(){
        Ext.create('sisfacturaelectronica.view.almacen.IngresarAbastecimiento');
    },
    onClickBuscarProducto:function(btn){
        Ext.create('sisfacturaelectronica.view.almacen.ProductoBuscar');
    },

    //@ Objeto : Ventana , Listado de productos 
    onClickItemProducto:function(grid, record, item, index, e, eOpts ){
        me = this;
        var _store         = Ext.ComponentQuery.query('#dgvDetalleAbastecimiento')[0].getStore();
        var _precio         = 0;

        _data = {
                idprod: parseInt(record.get('id')),
                producto: record.get('nombre'),
                cantidad: 1,
                precio: parseFloat(record.get('preciocompra')),
                total: parseInt(1) * parseFloat(record.get('preciocompra'))
            };

        if (_store.findRecord('idprod', parseInt( record.get('id') ))) {
            Ext.Msg.alert("SisFacturaElectronica", "Producto ya se encuentra cargada");
            return false;
        }
        _store.insert(0, _data);
        me.onCalcularTotalAbastecimiento();
    },
    onCalcularTotalAbastecimiento: function () {
        me = this;
        var store = Ext.ComponentQuery.query('#dgvDetalleAbastecimiento')[0].getStore();
        var _tot = 0;
        store.each(function (record) {
            _tot = _tot + record.get('total');
        });
        Ext.ComponentQuery.query('#txtSubtotal')[0].setValue(_tot.toFixed(2));
        if (Ext.ComponentQuery.query('#ckbAplicarIgv')[0].getValue()){
            Ext.ComponentQuery.query('#txtSubtotal')[0].setHidden(true);
            Ext.ComponentQuery.query('#txtIgv')[0].setHidden(true);
            var _igv = 0;
        }
        else{
            Ext.ComponentQuery.query('#txtSubtotal')[0].setHidden(false);
            Ext.ComponentQuery.query('#txtIgv')[0].setHidden(false);
            var _igv = _tot * 0.18;
        }

        Ext.ComponentQuery.query('#txtIgv')[0].setValue(_igv.toFixed(2));
        var _totven = 0;
        _totven = _tot + _igv;
        Ext.ComponentQuery.query('#txtTotalGeneral')[0].setValue(  Ext.util.Format.number(_totven.toFixed(2), "0,000.00")  );
    },
    onEditorCalcularTotalAbastecimiento: function (editor, e) {
        var _cant = 0;
        var _pre = 0;
        _cant = e.record.get('cantidad');
        _pre = e.record.get('precio');
        _tot = _pre * _cant;
        e.record.set('total', _tot.toFixed(2));
        this.onCalcularTotalAbastecimiento();
      },
      onClickEliminarDetalle: function (button, event, eOpts) {
        var store = Ext.ComponentQuery.query('#dgvDetalleAbastecimiento')[0].getStore();
        var rec = button.getWidgetRecord();
        if (rec) {
            store.remove(rec);
            this.onCalcularTotalAbastecimiento();
        }
    },
    onClickSalirAbastecimiento:function(btn){
        this.getView().close();
    },

    onClickGuardarAbastecimiento: function () {
        var _form = this.lookupReference('frmAbastecimiento');
        if (_form.isValid()) {
            var _dataDetalle = [];
            var _store = this.lookupReference('dgvDetalleAbastecimiento').getStore();
            me = this;
            _store.each(function (record) {
                if (record.get('cantidad') != 0) {
                    _reg = {
                        "idprod": record.get('idprod'),
                        "cantidad": record.get('cantidad'),
                        "precio": record.get("precio"),
                        "total": record.get("total"),
                        "vencimiento": (record.get("vencimiento")==null? null:  Ext.Date.format(record.get("vencimiento"), 'd/m/Y') ),
                        "genserie" :  (record.get("genserie")==true?1:0)
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
                    _dgv = Ext.ComponentQuery.query('#gridAbastecimientos')[0];
                    _dgv.getStore().load();
                    _view.close();
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
    //==============================================

    onClickBuscarAbastecimientoPorFechas:function(btn){
        store = Ext.ComponentQuery.query("#gridAbastecimientos")[0].getStore();
        store.load({
        params :{
            start : 1,
            limit : 50,
            desde: Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
            hasta: Ext.ComponentQuery.query('#dfHasta')[0].getRawValue(),
            proveedor: 0
         }
        });
    },
    onClickBuscarAbastecimientoPorProveedor:function(btn){
        store = Ext.ComponentQuery.query("#gridAbastecimientos")[0].getStore();
        store.load({
        params :{
            start : 1,
            limit : 50,
            desde: Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
            hasta: Ext.ComponentQuery.query('#dfHasta')[0].getRawValue(),
            proveedor: Ext.ComponentQuery.query('#cboProveedores')[0].getValue()
         }
        });
    },

    onClickFormularioProveedor :function(btn){
        var win   = Ext.create('sisfacturaelectronica.view.almacen.FormProveedor',{control: btn.control.toString()});
    },

    onSelectedDetalleAbastecimiento:function(  grid, td, cellIndex, record, tr, rowIndex, e, eOpts){
            this.lookupReference('dgvAbastecimientoDetalle').getStore().load({
                params : {
                    id :record.get('id') 
                }
            });
    }




});