
Ext.define('sisfacturaelectronica.view.ventas.FormConfiguraciones', {
    extend: 'Ext.form.Panel',
    alias: 'widget.wFormConfiguraciones',
    xtype: 'wFormConfiguraciones',
    reference: 'wFormConfiguraciones',
    requires: [
        'sisfacturaelectronica.view.ventas.FormConfiguracionesController'
    ],
    controller: 'ventas-formconfiguraciones',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    padding: 20,
    url : '',
    listeners : {
        render : 'onRender'
      },
    initComponent:function(){
        me = this;
        Ext.apply(me,
            {
              bbar: ['->',
                  {
                      xtype: 'button',
                      text: 'Grabar',
                      scale: 'medium',
                      handler: 'onClickGuardar'
                  }
              ]
            });
        me.callParent(arguments);
    }
});
