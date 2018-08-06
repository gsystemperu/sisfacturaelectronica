Ext.define('sisfacturaelectronica.view.almacen.ActualizarDisponibilidad',{
    extend: 'Ext.window.Window',
    alias : 'widget.wActDisponibilidad',
    xtype : 'wActDisponibilidad',
    itemId : 'wActDisponibilidad',
    requires: [
        'sisfacturaelectronica.view.almacen.ActualizarDisponibilidadController',
    ],
    autoShow:true,
    width : 700,
    height: 180,
    modal:true,
    controller: 'almacen-actualizardisponibilidad',
    padding : 0,
    items:[
        {
            xtype:'form',
            reference : 'frmdispo',
            itemId : 'frmdispo',
            url : sisfacturaelectronica.util.Rutas.productoActualizarCantidad,
            layout:{
                type:'vbox',
                pack: 'start',
                align: 'stretch'
            },
            bodyPadding:10,
            defaults:{
                xtype:'textfield',
                labelWidth:200
            },
            items:[
                {
                    xtype:'hiddenfield',
                    name : 'id'
                    
                },
                {
                    fieldLabel :'Producto',
                    name : 'nombre',
                    flex: 1
                },
                {
                    xtype:'datefield',
                    fieldLabel:'Fecha Vencimiento',
                    value : '',
                    name : 'vencimiento'
                },
                {
                    xtype:'panel',
                    layout:{
                        type:'hbox',
                        align :'stretch'
                    },
                    items:[
                        {
                            xtype:'numberfield',
                            fieldLabel :'Nueva cantidad a mano (cajas)',
                            name : 'nuevacantidad',
                            flex :1,
                            minvalue : 0,
                            allowBlank:true,
                            labelWidth : 200
                        },
                        {
                            xtype:'numberfield',
                            fieldLabel :'(Unidades)',
                            name : 'cantidadunidades',
                            flex :1,
                            minvalue : 0,
                            allowBlank:true,
                            hidden:true,
                            labelWidth : 200
                        }
                    ]
                }
               
            ],
            bbar:[
                '->',
                {text:'Cancelar',handler:'onClickCancelar'},
                {text:'Guardar',handler:'onClickGuardar'}
            ]
        }
        
    ]
});
