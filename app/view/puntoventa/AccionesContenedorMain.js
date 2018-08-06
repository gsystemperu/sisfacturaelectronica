Ext.define('sisfacturaelectronica.view.puntoventa.AccionesContenedorMain', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-contenedormain',
    requires:['sisfacturaelectronica.util.Rutas'],
    init:function(){},
    onClickIngresarPago:function(btn){
      try {
        if(Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore().getCount()==0){
           sisfacturaelectronica.util.Util.showToast("TIENE QUE INGRESAR EL DETALLE DE LA VENTA"); return false;
        }
        var me =  Ext.ComponentQuery.query('#wContenedorPuntoVenta')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(1);
        __valorVenta = Ext.ComponentQuery.query('#txtTotalVentaCaja')[0].getValue();
        Ext.ComponentQuery.query('#txtTotalVentaCajaValidar')[0].setValue(
          __valorVenta
        );
        Ext.ComponentQuery.query('#txtSaldoVentaCajaValidar')[0].setValue(
          __valorVenta
        );
        Ext.ComponentQuery.query('#cboCliente')[0].setHidden(false);
        Ext.ComponentQuery.query('#btnNuevoClientePdv')[0].setHidden(false);
        Ext.ComponentQuery.query('#btnVentasPdv')[0].setDisabled(false);
        
        //**** Descomentar para que la venta sea directa */
        // b=Ext.ComponentQuery.query('#btnGuardarCajaPago')[0];
        // b.fireEvent('click',b);

      } catch (e) {
        console.log('Ingresar Pago Punto venta');
      }
    },
    onClickRegresarPago:function(btn){
      try {
        var me =  Ext.ComponentQuery.query('#wContenedorPuntoVenta')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(0);
        Ext.ComponentQuery.query('#txtTotalVentaCajaValidar')[0].setValue(0);
        Ext.ComponentQuery.query('#cboCliente')[0].setHidden(false);
        Ext.ComponentQuery.query('#btnNuevoClientePdv')[0].setHidden(false);
        Ext.ComponentQuery.query('#btnEditarClientePdv')[0].setHidden(false);
        Ext.ComponentQuery.query('#btnVentasPdv')[0].setDisabled(false);


      } catch (e) {
        console.log('Ingresar Pago Punto venta');
      }
    },
    onClickListadoVentaPdv:function(btn){
      try {
        var me =  Ext.ComponentQuery.query('#wContenedorPuntoVenta')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(2);
        Ext.ComponentQuery.query('#cboCliente')[0].setHidden(true);
        Ext.ComponentQuery.query('#btnNuevoClientePdv')[0].setHidden(true);
        Ext.ComponentQuery.query('#btnEditarClientePdv')[0].setHidden(true);
        Ext.ComponentQuery.query('#btnVentasPdv')[0].setDisabled(true);
        Ext.ComponentQuery.query('#dgvVentasFacturarPdv')[0].getStore().load();

      } catch (e) {
        console.log('Listado Punto venta');
      }
    },
    onClickNuevoClientePDV:function(btn){
      sisfacturaelectronica.util.Util.crearWindowOpenMantenimiento('Agregar Cliente',650,600,'cboCliente','wFormClienteListado',0);
      
    },
    onClickEditarClientePDV:function(btn){
      sisfacturaelectronica.util.Util.crearWindowOpenMantenimiento('Editar Cliente',650,600,'cboCliente','wFormClienteListado',0);
      Ext.ComponentQuery.query('#wFormClienteListado')[0].loadRecord(btn.record);
    },
    onClickApeturarCaja:function(btn){
      Ext.create('sisfacturaelectronica.view.puntoventa.AperturaCaja');
    },
    onSelectCliente :function ( combo, record, eOpts ) {
      s = Ext.ComponentQuery.query('#dvListaProductos')[0].getStore();
     /* s.load({
        params:{
          nombre : '$%76853()='
        }
      });*/
      Ext.ComponentQuery.query('#btnEditarClientePdv')[0].record= record;
      Ext.ComponentQuery.query('#txtBuscarMarcaProd')[0].focus(false,100);

    },




});
