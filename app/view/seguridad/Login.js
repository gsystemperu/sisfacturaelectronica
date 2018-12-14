Ext.define('sisfacturaelectronica.view.seguridad.Login', {
    extend: 'Ext.window.Window',
    alias: 'wlogin',
    requires: [
        'sisfacturaelectronica.view.seguridad.LoginController',
    ],
    controller: 'seguridad-login',
    layout: {
        type: 'fit',
        align: 'center',
        pack: 'center'
    },
    autoShow: true,
    width: 400,
    height: 450,
    closable : false,
    itemId : 'wlogin',
    items: [
        {
            xtype: 'form',
            frame: false,
            layout:{
                type : 'vbox',
                align: 'stretch'
            },
            reference: 'frmlogin',
            items: [
                {
                    xtype: 'container',
                    flex: 0.5,
                    reference: 'nomempresa',
                    padding: 5,
                    style: { borderColor: '#000000', borderWidth: '1px', backgroundColor: '#469E9F', textAlign: 'center' }
                },
                {
                    xtype: 'image',
                    reference : 'logo',
                    width: 130,
                    height: 160,
                    padding: '5 80 5 80',
                    flex: 2,
                    
                    
                },
                {
                    xtype:'fieldcontainer',
                    layout:{
                        type :'hbox',
                        align :'stretch'
                    },
                    padding : '0 10 0 10',
                    items:[
                        {
                            xtype:'button',
                            glyph: 0xf007,
                            padding : 0,
                            width : 40,
                            tooltip : 'Ingresar el usuario asignado'
                        },
                        { 
                            xtype: 'textfield', 
                            value: 'root', 
                            reference: 'usuario', 
                            name: 'usuario', 
                            allowBlank: false, 
                            labelAlign: 'right', 
                            flex:1,
                            fieldStyle: 'text-align: center;font-size:25px;font-weight:bold; '
                        },
                    ]
                },
                {
                    xtype:'fieldcontainer',
                    layout:{
                        type :'hbox',
                        align :'stretch'
                    },
                    padding : '0 10 0 10',
                    items:[
                        {
                            xtype:'button',
                            glyph: 0xf084,
                            padding : 0,
                            width : 40,
                            tooltip : 'Ingresar su contraseña'
                        },
                        { 
                            xtype: 'textfield', 
                            value: '64y4.634##$%', 
                            reference: 'clave', 
                            name: 'clave',  
                            inputType: 'password', 
                            allowBlank: false, 
                            labelAlign: 'right' ,
                            enableKeyEvents:true,
                            flex:1,
                            fieldStyle: 'text-align: center;font-size:25px;font-weight:bold; ',
                            listeners:{
                                keydown:'onKeyDownClave'
                            }
                        }
                    ]
                },

                
               

            ],
            bbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'INGRESAR',
                    reference :'btningresar',
                    listeners:{
                        click: 'onClickSeleccionar'
                    }
                    
                }
            ]

        }]
});
