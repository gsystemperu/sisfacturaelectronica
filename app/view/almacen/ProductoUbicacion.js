
Ext.define('sisfacturaelectronica.view.almacen.ProductoUbicacion', {
    extend: 'Ext.window.Window',
    xtype:'wProductoUbicacion',
    requires:['sisfacturaelectronica.view.almacen.AccionesUbicacion'],
    modal:true,
    title: '..: Registrar Ubicacion :..',
    width: 400,
    frame: true,
    bodyPadding: 5,
    resizable: true,
    minHeight: 300,
    autoShow:true,
    fieldDefaults: {
        labelWidth: 70,
        anchor: '100%'
    },
    config : {
        codigo:0
    },
    layout: {
        type: 'vbox',
        align: 'stretch'  // Child items are stretched to full width
    },
    controller :'acciones-ubicacion',
    initComponent:function(){
      me = this;
      Ext.apply(this, {
        items: this.getItems(me.getCodigo()),
        bbar : this.getButtonBar()
      });
      this.callParent();
    },
    getButtonBar:function(){
      return obj = [
        '->',
          {
            text :'Cancelar',
            handler:'onClickCancelarUbicacion'
          },
          {
            text :'Guardar',
            handler:'onClickGuardarUbicacion'
          }
      ];
    },
    getItems:function(codigoserie){
      storeA = Ext.create('sisfacturaelectronica.store.Almacenes');
      storeS = Ext.create('sisfacturaelectronica.store.AlmacenSecciones');
      return obj = [
        {
            xtype: 'container',
            scrollable: true,
            maxHeight: 100,
            layout: 'anchor',
            items: [
              {
                  xtype:'hiddenfield',
                  value : codigoserie,
                  reference : 'txtCodigoSerie'
              },
              {
                xtype: 'combo',
                store : storeA,
                displayField: 'descripcion',
                valueField :'id',
                fieldLabel: 'Almacen',
                anchor: '0',
                queryMode: 'local',
                selectOnTab: false,
                editable :false,
                listeners:{
                  'select' : 'onSelectAlmacen'
                }
            }]
        },
        {
          xtype: 'combo',
          store : storeS,
          valueField : 'id',
          displayField: 'descripcion',
          fieldLabel: 'Seccion',
          forceSelection:true,
          anchor: '0',
          queryMode: 'local',
          editable :false,
          reference : 'cboSecciones'

      },
      {
        xtype:'textfield',
        fieldLabel :'Ubicacion ',
        reference : 'txtUbicacion'
      } ,
      {
            xtype: 'textarea',
            emptyText: 'Ingresar alguna observacion',
            hideLabel: true,
            reference : 'txtObservaciones',
            flex: 1
        }
      ];
    }

});
