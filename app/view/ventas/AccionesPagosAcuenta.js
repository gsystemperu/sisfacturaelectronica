Ext.define('sisfacturaelectronica.view.ventas.AccionesPagosAcuenta', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.acciones-pagosacuenta',
  onClickIngresarNuevoPago: function (btn) {
    __store = Ext.ComponentQuery.query('#dgvPagoAcuenta')[0].getStore();
    __data = {
      fecha: new Date(),
      pago: 0
    };
    __store.insert(0, __data);

  },
  onClickEliminarPago: function (btn) {
    __reg = btn.getWidgetRecord();
    __me = this;
    __store = Ext.ComponentQuery.query('#dgvPagoAcuenta')[0].getStore();
    if (__reg) {
      __store.remove(__reg);
      __store = Ext.ComponentQuery.query('#dgvPagoAcuenta')[0].getStore();
      __tot = 0;
      __store.each(function (record) { __tot = __tot + record.get('monto'); });
      Ext.ComponentQuery.query('#lblTotalIngresado')[0].setText(__tot.toString());
    }
  },
  onClickGuardarPagoAcuenta: function (btn) {
    s = Ext.ComponentQuery.query('#dgvPagoAcuenta')[0].getStore();
    w = this.getView();
    if (s) {
      jd = [];
      s.each(function (record) {
        if (record.get('monto') > 0) {
          __reg = {
            "fecha": record.get('fecha'),
            "monto": record.get('monto'),
            "metodopago": record.get('metodopago')
          };
          jd.push(__reg);
        }
      });
      idf = Ext.ComponentQuery.query('#idfactura')[1];
      idf2 = Ext.ComponentQuery.query('#idfactura')[0];
      Ext.Ajax.request({
        url: sisfacturaelectronica.util.Rutas.facturacionAgregarPagosAcuenta,
        params: {
          idfacturacion: (idf ? idf.getValue() : idf2.getValue()),
          vjsondetalle: JSON.stringify(jd)
        },
        success: function (response) {
          __data = Ext.JSON.decode(response.responseText);
          if (__data.error != 0) {
            sisfacturaelectronica.util.Util.showToast('Registrado');
            w.close();
            try {
              Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getStore().reload();
            } catch (error) {
              Ext.ComponentQuery.query('#dgvClientes')[0].getStore().reload();
            }

          }
        }
      });
    }
  },
  onEditorCalcularTotal: function (editor, e) {
    __monto = e.record.get('monto');
    e.record.set('monto', __monto.toFixed(2));
    this.onCalcularTotalPagoAcuenta();
  },
  onCalcularTotalPagoAcuenta: function () {
    __store = Ext.ComponentQuery.query('#dgvPagoAcuenta')[0].getStore();
    __tot = 0;
    __store.each(function (record) { __tot = __tot + record.get('monto'); });
    Ext.ComponentQuery.query('#lblTotalIngresado')[0].setText(__tot.toString());
  }
});
