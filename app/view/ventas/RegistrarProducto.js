Ext.define('sisfacturaelectronica.view.ventas.RegistrarProducto', {
    extend: 'Ext.window.Window',
    alias : 'widget.wRegistrarProducto',
    width : 500,
    height: 300,
    modal : true,
    floating : true,
    autoShow : true,
    title : 'Registro de Productos',
    layout : {
    	aling : 'stretch',
    	type  : 'fit'
    },
    initComponent: function() {
        var storeTipoDoc = Ext.create('sisfacturaelectronica.store.TipoDocumentos');
        me = this;
        Ext.apply(me, {
            items: [
                {
                    xtype: 'form',
                    id   :'myFormCliente',
                    bodyPadding: 5,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            flex: 2,
                            title: 'Informaci&oacute;n Principal',
                            defaults: {
                                //afterLabelTextTpl: Packt.util.Util.required,
                                anchor: '100%',
                                xtype: 'textfield',
                                allowBlank: true,
                                labelWidth: 150

                            },
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    fieldLabel: 'Label',
                                    name : '_idprod',

                                },
                                {
                                    xtype:'combo',
                                    fieldLabel: 'Proveedor',
                                    name: '_idprov',
                                },
                                {
                                    fieldLabel: 'Codigo',
                                    itemId : 'txtCodigoProd',
                                },
                                {
                                    fieldLabel: 'Descripcion',
                                    fieldStyle:'text-transform:uppercase'
                                },
                                {
                                    fieldLabel: 'Presentacion',
                                    fieldStyle:'text-transform:uppercase'
                                },
                                {
                                    xtype:'numberfield',
                                    fieldLabel: 'Precio',
                                }



                            ]
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'bottom',
                    ui: 'footer',
                    layout: {
                        pack: 'end',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: 'Cancelar',
                            itemId: 'btnCancelar',
                            iconCls: 'remove',
                            scale : 'medium',
                            handler: function(){
                                win = Ext.getCmp('wCliente');
                                win.close();
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Grabar',
                            itemId: 'btnGrabar',
                            iconCls: 'add',
                            scale : 'medium',
                          
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    },



});
