Ext.define('sisfacturaelectronica.view.mrp.AccionesContenedorFormulas', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-contenedorformulas',
    init:function(){
      console.log('iniciado');
    },
    onClickIngresarFormula:function(btn){
      try {
        var me =  Ext.ComponentQuery.query('#wContenedorFormula')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(1);
      //  Ext.ComponentQuery.query('#dgvListadoMateriales')[0].reset();
      } catch (e) {
        console.log('Nuevo Lista formula');
      }
    }
  });
