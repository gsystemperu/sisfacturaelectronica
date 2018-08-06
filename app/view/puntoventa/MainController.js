Ext.define('sisfacturaelectronica.view.puntoventa.MainController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.puntoventa-main',
  onCalcularTotalVenta: function () {
    me = this;
    store = Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore();
    _tot = 0;
    store.each(function (record) {
      _tot = parseFloat(_tot) + record.get('total');
    });
    Ext.ComponentQuery.query('#txtTotalVentaCaja')[0].setValue(_tot.toFixed(2));
  },
  onEditorCalcularTotal: function (editor, e) {
    if (e.field == 'cantidad') {
      ca = e.record.get('cantidad');
      pa = e.record.get('preciodosis');
      pe = e.record.get('precio');
      console.log(e.field);
      if (e.record.get('precioanterior') != 0) {
        pe = e.record.get('precioanterior')
      }
      to = pe * ca;
      e.record.set('precio', pe.toFixed(2));
      e.record.set('total', to.toFixed(2));
      e.record.set('precioanterior', pe.toFixed(2));
      e.record.set('dosis', 0);
      e.record.set('blister', 0);
      this.onCalcularTotalVenta();
    }else if(e.field == 'dosis') { //fraccion
      console.log(e.field);
      pa = e.record.get('preciodosis');
      to = pa * e.record.get('dosis');
      if (e.record.get('precioanterior') == 0) {
        e.record.set('precioanterior', e.record.get('precio'));
      }
      e.record.set('precio', pa.toFixed(2));
      e.record.set('total', to.toFixed(2));
      e.record.set('cantidad', 1);
      e.record.set('blister', 0);
      this.onCalcularTotalVenta();
    }else{ // blister
      console.log('blister');
      pa = e.record.get('precioblister');
      to = pa * e.record.get('blister');
      if (e.record.get('precioanterior') == 0) {
          e.record.set('precioanterior', e.record.get('precio'));
      }
      e.record.set('precio', pa.toFixed(2));
      e.record.set('total', to.toFixed(2));
      e.record.set('cantidad', 1);
      e.record.set('dosis', 0);
      this.onCalcularTotalVenta();
    }
  },
  onClickEliminarItem: function (btn) {
    rec = btn.getWidgetRecord();
    store = Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore();
    store.remove(rec);
    this.onCalcularTotalVenta();
  },
  onClickGuardarCajaPago: function (btn) {
    fm = Ext.ComponentQuery.query('#wPuntoVentaPago')[0];
    me = this;
    if (fm.isValid()) {
      dt = [];
      st = Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore();
      if (st.getCount() == 0) { sisfacturaelectronica.util.Util.showToast("TIENE QUE INGRESAR PRODUCTOS"); return false; }
      st.each(function (record) {
        if (record.get('cantidad') != 0) 
        {
          //Venta por unidad
          if(record.get('dosis')>0 && record.get('cantidad')==1){
            _swDosis = true;
          }else{ // Venta por cantidad
            _swDosis = false;
          }
          if (record.get('kilos') > 0 && record.get('cantidad')==1) {
            _swKilos = true;
          } else {
            _swKilos = false;
          }
          if (record.get('gramos') > 0 && record.get('cantidad')==1) {
            _swGramos = true;
          } else {
            _swGramos = false;
          }
          if (record.get('blister') > 0 && record.get('cantidad')==1) {
            _swBlister = true;
          } else {
            _swBlister = false;
          }
          _reg = {
            "idprod": record.get('idprod'),
            "cantidad": record.get('cantidad'),
            "precio": record.get("precio"),
            "total": record.get("total"),
            "ventadosis": _swDosis,
            "dosis": record.get("dosis"),
            "ventakilos": _swKilos,
            "kilos": record.get("kilos"),
            "ventagramos": _swGramos,
            "gramos": record.get("gramos"),
            "ventablister": _swBlister,
            "blister": record.get("blister"),
          };
          dt.push(_reg);
        }

      });
      __jsondetalle = JSON.stringify(dt);
      __radios = Ext.ComponentQuery.query('radio');
      if (__radios[0].value) {
        __tipodoc = 3;
      }
      if (__radios[1].value) {
        __tipodoc = 2;
      }
      if (__radios[2].value) {
        __tipodoc = 1;
      }
      me.getView().mask('.. Espere');
      Ext.Ajax.request({
        url: sisfacturaelectronica.util.Rutas.facturacionGuardarPagoPuntoVenta,
        params: {
          id: 0,
          idcoti: 0,
          idper: Ext.ComponentQuery.query('#cboCliente')[0].getValue(),
          vjsondetalle: __jsondetalle.toString(),
          idfopag: Ext.ComponentQuery.query('#cboFormaPagoPv')[0].getValue(),
          idmodo: 1,
          documentoventa: __tipodoc,
          serie: Ext.ComponentQuery.query('#txtSerieDoc')[0].getValue(),
          numerodoc: Ext.ComponentQuery.query('#txtNumeroDoc')[0].getValue(),
          acuenta: Ext.ComponentQuery.query('#txtAcuentaVentaCajaValidar')[0].getValue(),
          vusuario :sisfacturaelectronica.util.Data.usuario
        },
        success: function (response) {
          __data = Ext.JSON.decode(response.responseText);
          if (__data.error != 0) {
            Ext.ComponentQuery.query('#wPuntoVentaPago')[0].reset();
            Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore().removeAll();
            Ext.ComponentQuery.query('#dvListaProductos')[0].getStore().reload();
            Ext.ComponentQuery.query('#txtTotalVentaCaja')[0].setValue('0');

            if(__data.conf ==1){
              // Timer de 10 segundos para que el facturador pueda firmar el XML digital para que se pueda imprimir
                setTimeout(function(){ 
                  me.getView().unmask();
                  if(__data.confimpre){  // 1=> ticketera : 0=> A4
                    objrpt = window.open(sisfacturaelectronica.util.Rutas.imprimirTicket + 'id=' + __data.error, "", "width=700,height=900")
                  }else{
                    objrpt = window.open(sisfacturaelectronica.util.Rutas.rptImprimirNota + 'id=' + __data.error, "", "width=700,height=900")
                  }
                  me = Ext.ComponentQuery.query('#wContenedorPuntoVenta')[0];
                  l = me.getLayout();
                  l.setActiveItem(0);
                  setTimeout(function(){ objrpt.close() },5000);
                }, 2800);
            }else{
              me.getView().unmask();
              me = Ext.ComponentQuery.query('#wContenedorPuntoVenta')[0];
              l = me.getLayout();
              l.setActiveItem(0);
              Ext.Msg.show({
                title : 'Venta',
                msg : '<H1> Código de la Venta  :: '+ __data.error.toString()  +'</H1>',
                width : 500,
                closable : false,
                icon : Ext.Msg.QUESTION,
                buttons : Ext.Msg.YES
            });
            }

            
          }
        }
      });
    }else{
      alert("ingresar datos de pago");
    }

  },
  onKeyPagoAcuenta: function (obj, e, eOpts) {
    if (e.keyCode == 13) {
      __total = Ext.ComponentQuery.query('#txtTotalVentaCajaValidar')[0].getValue()
      __acuenta = Ext.ComponentQuery.query('#txtAcuentaVentaCajaValidar')[0].getValue();
      Ext.ComponentQuery.query('#txtSaldoVentaCajaValidar')[0].setValue(__total - __acuenta);
    }
  },
  onChangeSeleccionarDoc: function (obj, val, old) {
    switch (parseInt(val.dv)) {
      case 3:
        Ext.ComponentQuery.query('#lblDoc')[0].setHidden(true);
        Ext.ComponentQuery.query('#txtSerieDoc')[0].setHidden(true);
        Ext.ComponentQuery.query('#txtNumeroDoc')[0].setHidden(true);
        break;//nota
      case 2:
        Ext.ComponentQuery.query('#lblDoc')[0].setHidden(false);
        Ext.ComponentQuery.query('#txtSerieDoc')[0].setHidden(false);
        Ext.ComponentQuery.query('#txtNumeroDoc')[0].setHidden(false);
        Ext.ComponentQuery.query('#txtNumeroDoc')[0].setValue('**GENERANDO**');
        break;//boleta
      case 1:
        Ext.ComponentQuery.query('#lblDoc')[0].setHidden(false);
        Ext.ComponentQuery.query('#txtSerieDoc')[0].setHidden(false);
        Ext.ComponentQuery.query('#txtNumeroDoc')[0].setHidden(false);
        Ext.ComponentQuery.query('#txtNumeroDoc')[0].setValue('**GENERANDO**');
        break;//factura

    }
  }

});
