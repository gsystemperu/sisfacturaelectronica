Ext.define('sisfacturaelectronica.view.ventas.FormCliente', {
    extend: 'Ext.form.Panel',
    alias : 'widget.wFormClienteListado',
    xtype : 'wFormClienteListado',
    itemId : 'wFormClienteListado',
    requires   : [
        'Ext.form.field.*',
        'sisfacturaelectronica.util.*',
        'sisfacturaelectronica.view.ventas.AccionesRegCotizacion',
    ],
    reference : 'myFormClienteListado',
    autoScroll: true,
    controller:'acciones-regcotizacion',
    submitEmptyText : false,
    url : sisfacturaelectronica.util.Rutas.clienteGuardarViaListado,
    layout: {
      type: 'vbox',
      //pack: 'start',
      align: 'stretch'
    },
    padding : 50,
    initComponent: function()
    {
        me = this;
        var storeTipoDoc = Ext.create('sisfacturaelectronica.store.TipoDocumentos');
        Ext.apply(me,
        {
          items :me.getFormularioCliente(storeTipoDoc),

          bbar: ['->',
              {
                  text : 'Cancelar',
                  scale: 'medium',
                  handler: 'onClickCancelarViaListado'

              },
              {
                  xtype: 'button',
                  text: 'Grabar',
                  scale: 'medium',
                  handler: 'onClickGuardarClienteViaListado'
              }
          ]
        });
        me.callParent(arguments);
    },
    getFormularioCliente: function (storeTipoDoc)
    {
      var obj = [
            {
                xtype: 'hiddenfield',
                name: 'idper',
                itemId:'idper',
                value:0

            },
            {
                xtype: 'label',
                text: 'Ape. Paterno',
                hidden :true
            },
            {
                xtype: 'textfield',
                name: 'paternoper',
                itemId: 'paternoper',
                allowBlank: true,
                hidden :true
                //readOnly: true

            },
            {
                xtype: 'textfield',
                name: 'maternoper',
                allowBlank: true,
                fieldStyle:'text-transform:uppercase',
                hidden:true

            },

           /* {
                xtype: 'label',
                text :'Nombres o Razon Social',
                padding:0,
                border: false,
                //flex: 1,
                //height : 25,
                style: {
                  color: '#775c80',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: '20px'
                }
            },*/
            {
                xtype: 'textfield',
                name: 'nombreper',
                allowBlank: false,
                reference:'nombreper',
                fieldStyle:'text-transform:uppercase;font-size:35px;',
                emptyText : 'Razón Social '
                //readOnly: true
            },

            {
                xtype:'fieldcontainer',
                layout:'hbox',
                hidden:false,
                items:[
                  {
                      xtype: 'combo',
                      name: 'iddocidentidad',
                      store: storeTipoDoc,
                      queryMode: 'local',
                      displayField: 'descripcion',
                      valueField: 'idtipdoc',
                      value: 1,
                      editable: false,
                      flex: 1.5,
                      padding : '0 5 0 0'
                  },
                  {
                    
                        xtype: 'textfield',
                        name: 'numrucper',
                        reference :'numrucper',
                        flex: 1
                    
                  },
                ]
            },
            {
                xtype: 'label',
                text: 'Dirección'
            },
            {
                xtype: 'textfield',
                name: 'domiciper',
                reference: 'domiciper'
            },
            {
                xtype:'fieldcontainer',
                layout:{
                    type:'hbox',
                    align:'stretch'
                },
                items:[
                    {
                        xtype: 'label',
                        text: 'Telefono',
                        flex:1
                    },
                    {
                        xtype: 'label',
                        text: 'Celular',
                        flex:1
                    },
                ]
            },
            {
                xtype:'fieldcontainer',
                layout:{
                    type:'hbox',
                    align:'stretch'
                },
                items:[
                    {
                        xtype: 'textfield',
                        name: 'telefper',
                        flex:1,
                        padding : '0 5 0 0'
                    },
        
                    
                    {
                        xtype: 'textfield',
                        name: 'celper',
                        flex:1
                    },
                ]
            },
            {
                xtype: 'label',
                text: 'Correo'
            },
            {
                xtype: 'textfield',
                name: 'correoper',
                vtype: 'email'
            },
            {
                xtype: 'label',
                text: 'Provincia'
            },
            {
                xtype: 'textfield',
                name: 'provinciaper'
            },
            {
              xtype:'radiogroup',
              fieldLabel: 'Precio',
              hidden : true,
              columns: 3,
              items: [
                  {
                      boxLabel  : 'Publico Lima',
                      inputValue:1,
                      name      : 'tipoprecioper',
                      checked :true                      
                      

                  }, {
                      boxLabel  : 'Lima Especial 1' ,
                      name      : 'tipoprecioper',
                      inputValue : 2

                  },
                  {
                      boxLabel  : 'Lima Especial 2',
                      name      : 'tipoprecioper',
                      inputValue : 3

                  },
                  {
                      boxLabel  : 'Lima Especial 3',
                      name      : 'tipoprecioper',
                      inputValue : 4

                  },

                   {
                      boxLabel  : 'Publico Provincia',
                      name      : 'tipoprecioper',
                      inputValue : 5

                  },{
                      boxLabel  : 'Provincia Especial 1',
                      name      : 'tipoprecioper',
                      inputValue : 6

                  },
                  {
                      boxLabel  : 'Provincia Especial 2' ,
                      name      : 'tipoprecioper',
                      inputValue : 7

                  },
                  {
                      boxLabel  : 'Provincia Especial 3' ,
                      name      : 'tipoprecioper',
                      inputValue : 8

                  },
                  {
                      boxLabel  : 'Distribuidor Lima' ,
                      name      : 'tipoprecioper',
                      inputValue : 9

                  },
                  {
                      boxLabel  : 'Distribuidor Provincia' ,
                      name      : 'tipoprecioper',
                      inputValue : 8

                  }
              ]
            }
            
      ];
      return obj;
    }

});
