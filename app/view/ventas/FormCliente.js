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
    margin: 30,
    autoScroll: true,
    controller:'acciones-regcotizacion',
    submitEmptyText : false,
    url : sisfacturaelectronica.util.Rutas.clienteGuardarViaListado,
    layout: {
      type: 'vbox',
      pack: 'start',
      align: 'stretch'
    },
    initComponent: function()
    {
        me = this;
        var storeTipoDoc = Ext.create('sisfacturaelectronica.store.TipoDocumentos');
        Ext.apply(me,
        {
          items :me.getFormularioCliente(storeTipoDoc),
          bbar: ['->',
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
            xtype: 'label',
            text :'Cliente: Contacto',
            padding:0,
            border: false,
            style: {
              color: '#775c80',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: '15px'
            },
            hidden:true
          },
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
            ///
            // Este campo sera para guardar a la persona de contacto de la empresa
            //
            /*{
                xtype: 'label',
                text: 'Contacto/Referencia',

            },*/
            {
                xtype: 'textfield',
                name: 'maternoper',
                allowBlank: true,
                fieldStyle:'text-transform:uppercase',
                hidden:true

            },

            {
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
                  fontSize: '15px'
                }
              },
            {
                xtype: 'textfield',
                name: 'nombreper',
                allowBlank: false,
                reference:'nombreper',
                fieldStyle:'text-transform:uppercase;font-size:20px;',
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
                      flex: 1.5
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
                xtype: 'label',
                text: 'Telefono'
            },
            {
                xtype: 'textfield',
                name: 'telefper'
            },

            {
                xtype: 'label',
                text: 'Celular'
            },
            {
                xtype: 'textfield',
                name: 'celper'
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
