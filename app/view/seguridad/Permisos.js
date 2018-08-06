Ext.define('sisfacturaelectronica.view.seguridad.Permisos', {
    extend: 'Ext.panel.Panel',
    xtype: 'wseguriadpermisos',
    requires: [
        'sisfacturaelectronica.view.seguridad.PermisosController',
        'sisfacturaelectronica.view.seguridad.PermisosModel'
    ],
    controller: 'seguridad-permisos',
    initComponent: function () {
        me = this;
        s = Ext.create('sisfacturaelectronica.store.Perfiles');

        Ext.apply(me, {
            layout: {
                align: 'stretch',
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    layout: {
                        align: 'stretch',
                        type: 'fit'
                    },
                    border: false,
                    items: [
                        {
                            xtype: 'panel',
                            flex: 2,
                            layout: 'fit',
                            border: false,
                            items: [
                                {
                                    xtype: 'treepanel',
                                    reference: 'treeprog',
                                    rootVisible: false,
                                    expanded: true,
                                    useArrows: true,
                                    multiSelect: true
                                }
                            ]
                        },

                    ]
                },
                {
                    xtype: 'panel',
                    frame: false,
                    flex: 0.8,
                    layout: {
                        type: 'fit',
                    },
                    border: false,
                    items: [
                        {
                            xtype: 'form',
                            bodyPadding: 10,
                            padding: '10 5 5 5',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelWidth: 150
                            },
                            id: 'frmUsuarioPermisos',
                            items: [

                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Seleccionar un Perfil',
                                    reference: 'cboperfil',
                                    store: s,
                                    displayField: 'descripcion',
                                    valueField: 'id',
                                    editable: false,
                                    queryMode: 'remote',
                                    emptyText: '-- Seleccionar el Perfil --',
                                    listeners: {
                                        change: 'onChangeBuscarPermisosPerfil'
                                    }


                                },
                                {
                                    xtype: 'fieldset',
                                    columnWidth: 0.5,
                                    bodyPadding: '5 5 5 5',
                                    padding: '5 5 5 5',
                                    title: 'INGRESAR NUEVO PERFIL',
                                    collapsible: false,
                                    defaultType: 'textfield',
                                    defaults: { anchor: '100%' },
                                    layout: 'anchor',
                                    items: [
                                        {
                                            fieldLabel: 'Nombre Perfil',
                                            reference: 'perfil'

                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Agregar',
                                            iconCls: 'boton-save',
                                            width: 100,
                                            handler: 'onClickAgregarPerfil'


                                        }
                                    ]
                                }



                            ]

                        }
                    ],
                    bbar: [

                        '->',
                        {
                            xtype: 'button',
                            text: '<b>Actualizar Permisos al Perfil</b>',
                            handler: 'onClickActualizarPermisosAlPerfil'

                        }
                    ]
                }
            ]
        });

        this.callParent(arguments);
    },
});
