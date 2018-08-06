Ext.define('sisfacturaelectronica.view.ventas.RegistrarProveedor', {
    extend: 'Ext.window.Window',
    alias: 'widget.wRegistrarProveedor',
    requires: [
        //'MyDesktop.app.util.Util',
        //'MyDesktop.app.util.Alert'
                //'MyDesktop.app.stores.Generos'

    ],
    itemId : 'wRegistrarCliente',
    width: 500,
    height: 330,
    modal: true,
    floating: true,
    autoShow: true,
    title: 'Registro de Proveedor ',
    layout: {
        aling: 'stretch',
        type: 'fit'
    },
    initComponent: function () {
        me = this;
        Ext.apply(me, {
            items: [
                {
                    xtype: 'form',
                    id: 'myFormProveedor',
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
                                anchor: '100%',
                                xtype: 'textfield',
                                allowBlank: true,
                                labelWidth: 150

                            },
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    fieldLabel: 'Label',
                                    name: '_idprov',
                                    id: 'idprov',
                                },
                                {
                                    fieldLabel: 'Apellido Paterno',
                                    name: '_paterno',
                                    id: 'paternoprov',
                                    fieldStyle: 'text-transform:uppercase'
                                },
                                {
                                    fieldLabel: 'Apellido Materno',
                                    maxLength: 100,
                                    name: '_materno',
                                    id: 'maternoprov',
                                    fieldStyle: 'text-transform:uppercase'
                                },
                                {
                                    fieldLabel: 'Nombres',
                                    maxLength: 100,
                                    name: '_nombre',
                                    id: 'nombreprov',
                                    fieldStyle: 'text-transform:uppercase'
                                },
                                {
                                    fieldLabel: 'RUC',
                                    name: '_numeroruc',
                                    id: 'numrucprov',
                                    fieldStyle: 'text-transform:uppercase;text-align:right'
                                },
                                {
                                    fieldLabel: 'Telefono',
                                    name: '_telefono',
                                    id: 'telper',
                                    fieldStyle: 'text-transform:uppercase;text-align:right'
                                },
                                {
                                    fieldLabel: 'Celular',
                                    name: '_celular',
                                    id: 'celper',
                                    fieldStyle: 'text-transform:uppercase;text-align:right'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Estado',
                                    name: '_estado',
                                    id: 'estado',
                                    //store: Ext.create('MyDesktop.app.stores.Estados'),
                                    queryMode: 'local',
                                    displayField: 'descripcion',
                                    valueField: 'id',
                                    value: '1'

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
                            scale: 'medium',
                           
                        },
                        {
                            xtype: 'button',
                            text: 'Grabar',
                            itemId: 'btnGrabar',
                            iconCls: 'add',
                            scale: 'medium',
                           
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }


});


