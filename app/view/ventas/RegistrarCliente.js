Ext.define('sisfacturaelectronica.view.ventas.RegistrarCliente', {
    extend: 'Ext.window.Window',
    alias : 'widget.wRegistrarCliente',
    requires   : [
        'sisfacturaelectronica.view.ventas.AccionesRegCotizacion',
        'sisfacturaelectronica.util.Rutas'

    ],
    width : 700,
    height: 500,
    modal : true,
    floating : true,
    autoShow : true,
    title : 'Registro de Clientes',
    layout : {
    	aling : 'stretch',
    	type  : 'fit'
    },
    controller : 'acciones-regcotizacion',
    initComponent: function() {
        var storeTipoDoc = Ext.create('sisfacturaelectronica.store.TipoDocumentos');
        me = this;
        Ext.apply(me, {
            items: [
                {
                    xtype: 'form',
                    reference   :'myFormCliente',
                    url : sisfacturaelectronica.util.Rutas.clienteGuardar,
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
                                    name : 'vid',
                                    value: 0
                                },

                                {
                                    fieldLabel: 'Apellido Materno',
                                    maxLength: 100,
                                    name: 'vmaterno',
                                    fieldStyle:'text-transform:uppercase',
                                    hidden:true
                                },
                                {
                                    fieldLabel: 'Razón Social',
                                    maxLength: 100,
                                    name: 'vnombre',
                                    reference :'vnombre',
                                    fieldStyle:'text-transform:uppercase'
                                },
                                {
                                    xtype:'container',
                                    layout:'hbox',
                                    padding:'5 5 5 5',
                                    items:[
                                      {
                                          xtype: 'textfield',
                                          name: 'vnumruc',
                                          reference :'vnumruc',
                                          fieldLabel: 'RUC',
                                          labelWidth : 145,
                                          fieldStyle:'text-transform:uppercase;text-align:right;font-size:15px;',
                                          flex: 3
                                      }
                                      /*,
                                      {
                                        xtype:'button',
                                        glyph: sisfacturaelectronica.util.Glyphs.getGlyph('buscar'),
                                        flex: 0.5,
                                        handler:'onClickBuscarRUCDatosSimple'
                                      }*/
                                    ]
                                },
                                 {
                                    fieldLabel: 'Dirección',
                                    name: 'vdireccion',
                                    reference :'vdireccion',
                                    fieldStyle:'text-transform:uppercase'
                                },
                                {
                                    fieldLabel: 'Contacto / Referencia',
                                    name: 'vpaterno',
                                    fieldStyle:'text-transform:uppercase',
                                    hidden:false,
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Tipo Documento',
                                    name: 'viddoc',
                                    itemId: 'iddocidentidad',
                                    store : storeTipoDoc,
                                    queryMode: 'local',
                                    displayField: 'descripcion',
                                    valueField: 'idtipdoc',
                                    value : 1

                                },
                                {
                                    fieldLabel: 'Numero',
                                    name: 'vnumdoc',
                                    fieldStyle:'text-transform:uppercase;text-align:right'
                                },
                                /*{
                                    fieldLabel: 'RUC',
                                    name: 'vnumruc',
                                    fieldStyle:'text-transform:uppercase;text-align:right'
                                },*/

                                {
                                    fieldLabel: 'Telefono',
                                    name: 'vtelefono',
                                    fieldStyle:'text-transform:uppercase;text-align:right'
                                },
                                {
                                    fieldLabel: 'Celular',
                                    name: 'vcelular',
                                    fieldStyle:'text-transform:uppercase;text-align:right'
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
                                      value : true

                                  }, {
                                      boxLabel  : 'Lima Especial 1',
                                      name      : 'tipoprecioper',
                                      inputValue : 2

                                  }, {
                                      boxLabel  : 'Lima Especial 2',
                                      name      : 'tipoprecioper',
                                      inputValue : 3

                                  }, {
                                      boxLabel  : 'Lima Especial 3',
                                      name      : 'tipoprecioper',
                                      inputValue : 4

                                  }, {
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
                            scale : 'medium',
                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('cancelar'),
                            handler: 'onClickCancelarCliente'
                        },
                        {
                            xtype: 'button',
                            text: 'Grabar',
                            itemId: 'btnGrabar',
                            iconCls: 'add',
                            scale : 'medium',
                            glyph: sisfacturaelectronica.util.Glyphs.getGlyph('guardar'),
                            handler:'onClickGuardarCliente'
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    },



});
