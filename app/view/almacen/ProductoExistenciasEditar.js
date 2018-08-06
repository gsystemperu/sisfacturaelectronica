Ext.define('sisfacturaelectronica.view.almacen.ProductoExistenciasEditar', {
  extend: 'Ext.window.Window',
  xtype: 'wProductosExistenciasEditar',
  alias: 'widget.wProductosExistenciasEditar',
  requires: [
    'Ext.layout.container.HBox',
    'Ext.container.ButtonGroup',
    'Ext.grid.column.*',
    'Ext.form.field.*',
    'Ext.panel.Panel',
    'sisfacturaelectronica.store.DataTemp',
    'sisfacturaelectronica.view.almacen.AccionesProducto',
    'Ext.grid.plugin.*',
    'sisfacturaelectronica.util.Rutas'
  ],
  layout: {
    type: 'fit',
    align: 'stretch'
  },
  modal : true,
  bodyPadding: 0,
  width: 550,
  height: 220,
  autoShow: true,
  controller: 'acciones-producto',
  initComponent: function () {
    Ext.apply(this, {
      items: [
        this.getDatosDelProducto(),
      ]
    });
    this.callParent();

  },
  getDatosDelProducto: function () {
    o = {
      xtype: 'form',
      itemId : 'frmProdExistencia',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      url : sisfacturaelectronica.util.Rutas.productoActualizarExietencia,
      bodyPadding : 15,
      defaultType:'textfield',
      items: [
        {
          xtype: 'hiddenfield',
          name: 'id'
        },
        {
          fieldLabel: 'Producto',
          name: 'nombre',
        },
        {
          xtype: 'datefield',
          fieldLabel: 'Fecha Vencimiento',
          value: '',
          name: 'vencimiento'
        },
        {
          xtype: 'numberfield',
          fieldLabel: '(Unidades)',
          name: 'cantidadunidad',
          minvalue: 0,
          allowBlank: false,
        }
      ],
      buttons:[
        {text:'Cancelar', handler:'onClickCancelar'},
        {text:'Actualizar',handler:'onClickActualizar'}
      ]
    };


    return o;

  },

});
