Ext.define('sisfacturaelectronica.view.ventas.AccionesContenedorCotizacionesFacturar', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.acciones-contenedorcotizacionesfacturar',
  requires: ['sisfacturaelectronica.util.Rutas'],
  init: function () {},
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
    /*try {
      var _record =  Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getSelectionModel().getSelection()[0];
      if (_record)
      {
        if(_record.get('estado')== 3  || _record.get('estado')== 4 ||
           _record.get('estado')== 5  || _record.get('estado')== 6 ){
          Ext.Msg.alert("AkinetFarma","Ya fue generado no se puede modificar!");
          return false;
           }*/

    var me = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0]; //this;
    var l = me.getLayout();
    l.setActiveItem(1);
    /*Ext.ComponentQuery.query('#frmRegCotizacionFacturar')[0].reset();
    Ext.ComponentQuery.query('#frmRegCotizacionFacturar')[0].loadRecord(_record);
    Ext.ComponentQuery.query('#dgvDetalleVentaFacturar')[0].getStore().removeAll();
    Ext.ComponentQuery.query('textfield[name=numerodoc]')[0].setValue('**GENERANDO**');
    Ext.ComponentQuery.query('textfield[name=seriedoc]')[0].setValue('-');
    var _tot = 0;
    Ext.Ajax.request({
      url: sisfacturaelectronica.util.Rutas.cotizacionDetalle,
      params: {
        vIdCotizacion: _record.get('idcoti')
      },
      success: function (response) {
        var _ds = Ext.JSON.decode(response.responseText);
        me.mask('.. cargando');
        Ext.each(_ds.data, function (record) {
          var _store = Ext.ComponentQuery.query('#dgvDetalleVentaFacturar')[0].getStore();
          var _precio = 0;
          _data = {
            idprod: parseInt(record.id),
            descripcion: record.descripcion,
            cantidad: record.cantidad,
            precio: record.precio,
            total: record.total,
            vencimiento: record.to_char,
            presentacion: record.presentacion
          };
          _tot = _tot + record.total;

          _store.insert(0, _data);
        });
        me.unmask();

        __objChk = Ext.ComponentQuery.query('#incluyeigvfacturacion')[0];
        __objIgv = Ext.ComponentQuery.query('#igvventasfacturacion')[0];
        __objSubTotal = Ext.ComponentQuery.query('#Subtotalventasfacturacion')[0];
        __objTotal = Ext.ComponentQuery.query('#TotalGeneralfacturacion')[0];

        s = _tot / 1.18;
        i = _tot - (_tot / 1.18);

        __objSubTotal.setValue(
          Ext.util.Format.number(s.toFixed(2), "0,000.00000")
        );
        __objIgv.setValue(
          Ext.util.Format.number(i.toFixed(2), "0,000.00000")
        );
        __objTotal.setValue(
          Ext.util.Format.number(_tot.toFixed(2), "0,000.00000")
        );

      }
    });*/

    /*
            }else{
              Ext.Msg.alert("AkinetFarma","Tiene que seleccionar una cotizacion a facturar!");return false;
            }

         } catch (e) {
            console.log(e);
         }*/

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
      if ( 
        _record.get('idguia') == 0) {
        var me = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0]; //this;
        var l = me.getLayout();
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
              orden : 1
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
              orden : 1
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
              orden : 1
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
              orden : 1
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
    Ext.Msg.alert("AkinetFarma", "Módulo en contrucción");
  },


});
