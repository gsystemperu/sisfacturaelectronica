Ext.define('sisfacturaelectronica.view.almacen.FormProveedor', {
    extend: 'Ext.window.Window',
    xtype: 'wFormProveedor',
    alias: 'widget.wFormProveedor',
    requires: [
        'Ext.layout.container.VBox',
        'Ext.form.field.*',
        'Ext.form.Panel',
        'sisfacturaelectronica.view.almacen.AccionesProveedor'
    ],
    layout: 'fit',
    title: '..:: Registro de Proveedor ::..',
    width: 520,
    height: 500,
    modal :true,
    controller :'acciones-proveedor',
    config : {
        control:''
    },
    initComponent: function () {
       me = this;
        Ext.apply(this, {
            items: this.getFormulario(me.getControl())
        });
        this.callParent();
    },
    getFormulario: function (_idcontrol) {
        return obj = [
            {
                xtype: 'form',
                defaultType:'textfield',
                reference :'frmProveedor',
                bodyPadding : 5,
                defaults:{
                      anchor :'100%',
                      flex :1
                },
                url : sisfacturaelectronica.util.Rutas.proveedorGuardar,
                items:[
                    {
                        xtype:'hiddenfield',
                        name :'id',
                        value : 0
                    },
                    {
                        emptyText : 'Razón Social : Proveedor S.A.',
                        allowBlank : false,
                        name : 'razonsocial',
                        fieldStyle : 'font-size:20px;background-color: #F9F7D8;'
                    },
                    {
                        xtype:'label',
                        text : 'Correo'
                    },
                    {
                        name : 'correo',
                        type:'mail'
                    },
                    {
                        xtype:'label',
                        text : 'Contacto'
                    },
                    {
                        name :'contacto'
                       
                    },
                    {
                        xtype:'label',
                        text : 'Telefono Fijo / Movil'
                    },
                    {
                        name :'telefono'
                    },
                    {
                        xtype:'label',
                        text : 'Dirección'
                    },
                    {
                        xtype:'textarea',
                        name :'direccion'
                    },
                    {
                        xtype:'label',
                        text : 'Dirección Fiscal'
                    },
                    {
                        xtype:'textarea',
                        name :'direccionfiscal'
                    }
                ],
                buttons:[
                    {
                        text :'Cancelar',
                        handler : 'onClickCancelarProveedor',
                    },
                    {
                        text :'Guardar',
                        handler : 'onClickGuardarProveedorModal',
                        idcontrol : _idcontrol
                    }
                    
                ]
            }
        ];

    }
});