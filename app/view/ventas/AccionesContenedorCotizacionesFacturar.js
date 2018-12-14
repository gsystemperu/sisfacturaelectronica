Ext.define('sisfacturaelectronica.view.ventas.AccionesContenedorCotizacionesFacturar', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.acciones-contenedorcotizacionesfacturar',
  requires: ['sisfacturaelectronica.util.Rutas'],
  init: function () { },
  onClickFacturarCotizacion: function (btn) {
    try {
      var me = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0]; //this;
      var l = me.getLayout();
      l.setActiveItem(0);
      Ext.ComponentQuery.query('#frmRegCotizacion')[0].reset();
      Ext.ComponentQuery.query('#dgvDetalleVenta')[0].getStore().removeAll();
    } catch (e) {
      console.log('Ingresar Cotizacion Facturar');
    }
  },
  onClickCrearCotizacionFactura: function (btn) {
    var me = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0]; //this;
    var l = me.getLayout();
    l.setActiveItem(1);
  },
  onClickCrearNota: function (b) {
    try {
      r = Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getSelectionModel().getSelection()[0];
      me = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0];
      l = me.getLayout();
      l.setActiveItem(5);
      fm = Ext.ComponentQuery.query('#frmRegNotaCredito')[0];
      fm.reset();
      fm.setTitle(':. Nota Crédito .:');
      fm.loadRecord(r);
      //fm.down('fieldset #documentoventa').setReadOnly(true);
      fm.down('fieldset #cboTipoNota').setValue(1);
      fm.down('#vusuario').setValue(sisfacturaelectronica.util.Data.usuario);
      fm.down('fieldset [name=seriedoc]').setReadOnly(true);
      fm.down('fieldset [name=numerodoc]').setReadOnly(true);
      po = fm.down('#posicion');
      dg = Ext.ComponentQuery.query('#dgvDetalleNota')[0];
      dgs = dg.getStore();
      dgs.removeAll();
      fm.mask('.... espere');
      Ext.Ajax.request({
        url: sisfacturaelectronica.util.Rutas.facturacionDetalle,
        params: {
          idfacturacion: r.get('idfacturacion'),
          orden: 1
        },
        method: 'GET',
        success: function (response) {
          ds = Ext.JSON.decode(response.responseText);
          ix = 0;
          t = 0;
          s = 0;
          i = 0;
          Ext.each(ds.data, function (re) {
            ix = ix + 1;
            d = {
              idprod: parseInt(re.id),
              descripcion: re.producto,
              cantidad: re.cantidad,
              precio: re.precio,
              total: re.total,
              vencimiento: re.vecimiento,
              presentacion: re.presentacion
            }
            t = t + re.total;
            dgs.insert(ix, d);
            po.setValue(ix.toString());
            dg.getView().refresh();
          });
          if (r.get('incluyeigv')) {
            s = t / 1.18;
            i = t - (t / 1.18);
            t = t;
          } else {
            s = t;
            i = t * 0.18;
            t = s + i;
          }
          fm.down('panel > panel #Subtotalventas').setValue(s.toFixed(2));
          fm.down('panel > panel #igvventas').setValue(i.toFixed(2));
          fm.down('panel > panel #TotalGeneral').setValue(t.toFixed(2));
          fm.unmask();
        }
      });
    } catch (e) {
      alert(e);
    }
  },
  onClickCrearCotizacionFactura2: function (btn) {
    try {
      _record = Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getSelectionModel().getSelection()[0];
      if (_record) {
        if (_record.get('estado') == 3 || _record.get('estado') == 4 ||
          _record.get('estado') == 5 || _record.get('estado') == 6) {
          Ext.Msg.alert("SisFacturaElectronica", "Ya fue generado no se puede modificar!");
          return false;
        }
        me = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0];
        l = me.getLayout();
        l.setActiveItem(4);

        Ext.ComponentQuery.query('#frmRegCotizacionFacturar')[0].reset();
        Ext.ComponentQuery.query('#frmRegCotizacionFacturar')[0].loadRecord(_record);
        Ext.ComponentQuery.query('#dgvDetalleVentaFacturar')[0].getStore().removeAll();
        t = 0;
        Ext.Ajax.request({
          url: sisfacturaelectronica.util.Rutas.cotizacionDetalle,
          params: {
            vIdCotizacion: _record.get('idcoti'),
            orden: 1
          },
          success: function (response) {
            d = Ext.JSON.decode(response.responseText);
            me = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0];
            me.mask('.. cargando');
            i = 1;
            Ext.each(d.data, function (record) {
              dg = Ext.ComponentQuery.query('#dgvDetalleVentaFacturar')[0];
              s = dg.getStore();
              p = 0;
              d = {
                idprod: parseInt(record.id),
                descripcion: record.descripcion,
                cantidad: record.cantidad,
                precio: record.precio,
                total: record.total,
                vencimiento: record.to_char,
                presentacion: record.presentacion
              };
              t = t + record.total;
              s.insert(i, d);
              i = i + 1;
              dg.getView().refresh();
              Ext.ComponentQuery.query('#posicion')[0].setValue(i);
            });
            me.unmask();

            chk = Ext.ComponentQuery.query('#incluyeigvfacturacion')[0];
            ti = Ext.ComponentQuery.query('#igvventasfacturacion')[0];
            ts = Ext.ComponentQuery.query('#Subtotalventasfacturacion')[0];
            tt = Ext.ComponentQuery.query('#TotalGeneralfacturacion')[0];

            if (_record.get('incluyeigv')) {
              s = t / 1.18;
              i = t - (t / 1.18);
              t = t;
            } else {
              s = t;
              i = t * 0.18;
              t = s + i;
            }
            ti.setValue(i.toFixed(2));
            ts.setValue(s.toFixed(2));
            tt.setValue(t.toFixed(2));

          }
        });
      } else {
        Ext.Msg.alert("SisFacturaElectronica", "Tiene que seleccionar una cotizacion a facturar!"); return false;
      }

    } catch (e) {
      alert(e.toString());
    }

  },
  onClickDocumentoImprimir: function (btn) {
    try {
      var _record = Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getSelectionModel().getSelection()[0];

      //if(_record.get('idguia')>0){

      //Imprimir en matricial A4
      //var objrpt = window.open( sisfacturaelectronica.util.Rutas.rptImprimirNota+
      //'id='+ _record.get('idfacturacion'), "", "width=700,height=900");
      //setTimeout(function(){ objrpt.close()}, 4000);

      var objrpt = window.open(sisfacturaelectronica.util.Rutas.rptImprimirFacElec + 'id=' + _record.get('idfacturacion'), "", "width=700,height=900");
      //setTimeout(function(){ objrpt.close(); }, 1000);

      //}
    } catch (e) {
      console.log(e);
    }
  },
  onClickGuiasRemisionImpresion: function (btn) {
    try {
      var _record = Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getSelectionModel().getSelection()[0];
      if (_record.get('idguia') > 0) {
        var objrpt = window.open(sisfacturaelectronica.util.Rutas.rptImprimirGuiaRemision +
          'id=' + _record.get('idguia'), "", "width=700,height=900");
        //setTimeout(function(){ objrpt.close()}, 4000);
      }
    } catch (e) {
      console.log(e);
    }
  },
  onClickGuiasRemision: function (btn) {
    try {
      var _record = Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getSelectionModel().getSelection()[0];
      console.log(_record);
      if (_record.get('idguia') == 0) 
      {
        me = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0]; //this;
        l = me.getLayout();
        l.setActiveItem(2);
        Ext.ComponentQuery.query('#frmRegGuiaRemision')[0].mask('...cargando');
        Ext.ComponentQuery.query('#frmRegGuiaRemision')[0].reset();
        Ext.ComponentQuery.query('#idfactura')[0].setValue(_record.get('idfacturacion'));
        Ext.ComponentQuery.query('#nrodocumento')[0].setValue(_record.get('docinterno'));
        Ext.ComponentQuery.query('textfield[name=puntollegada]')[0].setValue(_record.get('domiciper'));
        Ext.ComponentQuery.query('hiddenfield[name=idcotizacion]')[0].setValue(_record.get('idcoti'));
        Ext.ComponentQuery.query('textfield[name=razonsocialdestinatario]')[0].setValue(_record.get('nomcompleto'));
        Ext.ComponentQuery.query('textfield[name=rucdestinatario]')[0].setValue(_record.get('numrucper'));
        Ext.ComponentQuery.query('textfield[name=dnidestinatario]')[0].setValue(_record.get('numdocper'));
        Ext.ComponentQuery.query('textfield[name=puntopartida]')[0].setValue(_record.get('direfiscal'));
        dg = Ext.ComponentQuery.query('#dgvDetalleGuiaRemision')[0];
        sgd = dg.getStore();
        sgd.removeAll();
        if (_record.get('idfacturacion') == 0) {
          Ext.Ajax.request({
            url: (_record.get('idfacturacion') == 0 ? sisfacturaelectronica.util.Rutas.cotizacionDetalle : sisfacturaelectronica.util.Rutas.facturacionDetalle),
            params: {
              vIdCotizacion: _record.get('idcoti'),
              orden: 1
            },
            method: 'GET',
            success: function (response) {
              __data = Ext.JSON.decode(response.responseText);
              Ext.each(__data.data, function (row) {
                __dato = {
                  cantidad: row.cantidad,
                  idprod: (_record.get('idfacturacion') == 0 ? row.id : row.idprod),
                  descripcion: (_record.get('idfacturacion') == 0 ? row.descripcion : row.producto),
                  unidadmedida: (_record.get('idfacturacion') == 0 ? row.um : row.presentacion),
                  pesototal: 0
                }
                sgd.add(__dato);
              });
              Ext.ComponentQuery.query('#frmRegGuiaRemision')[0].unmask();
            }
          });

        } else {

          Ext.Ajax.request({
            url: (_record.get('idfacturacion') == 0 ? sisfacturaelectronica.util.Rutas.cotizacionDetalle : sisfacturaelectronica.util.Rutas.facturacionDetalle),
            params: {
              idfacturacion: _record.get('idfacturacion'),
              orden: 1
            },
            method: 'GET',
            success: function (response) {
              __data = Ext.JSON.decode(response.responseText);
              Ext.each(__data.data, function (row) {
                __dato = {
                  cantidad: row.cantidad,
                  idprod: row.idprod,
                  descripcion: row.producto,
                  unidadmedida: row.presentacion,
                  pesototal: 0
                }
                sgd.add(__dato);
              });
              Ext.ComponentQuery.query('#frmRegGuiaRemision')[0].unmask();
            }
          });

        }



      } else {
        //=== Editar Guia remisión    
        var me = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0]; //this;
        var l = me.getLayout();
        l.setActiveItem(2);
        Ext.ComponentQuery.query('#frmRegGuiaRemision')[0].loadRecord(_record);

        Ext.ComponentQuery.query('#idfactura')[0].setValue(_record.get('idfacturacion'));
        Ext.ComponentQuery.query('hiddenfield[name=idcotizacion]')[0].setValue(_record.get('idcoti'));
        Ext.ComponentQuery.query('hiddenfield[name=id]')[0].setValue(_record.get('idguia'));
        dg = Ext.ComponentQuery.query('#dgvDetalleGuiaRemision')[0];
        sgd = dg.getStore();
        sgd.removeAll();
        dg.mask('...Cargando');
        if (_record.get('idfacturacion') == 0) {

          Ext.Ajax.request({
            url: (_record.get('idfacturacion') == 0 ? sisfacturaelectronica.util.Rutas.cotizacionDetalle : sisfacturaelectronica.util.Rutas.facturacionDetalle),
            params: {
              vIdCotizacion: _record.get('idcoti'),
              orden: 1
            },
            method: 'GET',
            success: function (response) {
              __data = Ext.JSON.decode(response.responseText);
              Ext.each(__data.data, function (row) {
                __dato = {
                  cantidad: row.cantidad,
                  idprod: (_record.get('idfacturacion') == 0 ? row.id : row.idprod),
                  descripcion: (_record.get('idfacturacion') == 0 ? row.descripcion : row.producto),
                  unidadmedida: (_record.get('idfacturacion') == 0 ? row.um : row.cantidadunidadmedida),
                  pesototal: 0
                }
                sgd.add(__dato);
              });
              Ext.ComponentQuery.query('#dgvDetalleGuiaRemision')[0].unmask();
            }
          });

        } else {

          Ext.Ajax.request({
            url: (_record.get('idfacturacion') == 0 ? sisfacturaelectronica.util.Rutas.cotizacionDetalle : sisfacturaelectronica.util.Rutas.facturacionDetalle),
            params: {
              idfacturacion: _record.get('idfacturacion'),
              orden: 1
            },
            method: 'GET',
            success: function (response) {
              __data = Ext.JSON.decode(response.responseText);
              Ext.each(__data.data, function (row) {
                __dato = {
                  cantidad: row.cantidad,
                  idprod: row.idprod,
                  descripcion: row.producto,
                  unidadmedida: row.um,
                  pesototal: 0
                }
                sgd.add(__dato);
              });
              Ext.ComponentQuery.query('#dgvDetalleGuiaRemision')[0].unmask();
            }
          });

        }


      }
    } catch (e) {
      console.log(e);
    }
  },
  /* onClickReporteVentas:function(){
     //var _record = this.lookupReference('dgvVentas').getSelectionModel().getSelection()[0];
     __desde = Ext.ComponentQuery.query('#dfDesdeCotizacionesFactura')[0].getRawValue();
     __hasta = Ext.ComponentQuery.query('#dfHastaCotizacionesFactura')[0].getRawValue();

     var _url = 'resources/api/reporte_ventas?desde='+ __desde + '&hasta='+ __hasta;

      _panel = Ext.ComponentQuery.query("#tabPrincipal")[0];
      if (_panel.getChildByElement('pdfreporteventas')) {
          _panel.remove('pdfreporteventas');
      }
      if (!_panel.getChildByElement('pdfreporteventas')) {
          _panel.add({
              xtype: 'panel',
              closable: true,
              id: 'pdfreporteventas',
              title: 'PDF: Reporte Ventas',
              layout: 'fit',
              bodyPadding: '5px 5px 5px 5px',
              items: [{
                  xtype: 'component',
                  itemId: 'xiframe',
                  autoScroll: true,
                  autoEl: {
                      tag: 'iframe',
                      style: 'height: 100%; width: 100%;',
                      src: _url
                  }
              }]
          });
      }
      _panel.setActiveTab('pdfreporteventas');
   },*/
  onClickEnviarSunatFacturas: function () {
    Ext.Msg.alert("SisFacturaElectronica", "Módulo en contrucción");
  },


});
