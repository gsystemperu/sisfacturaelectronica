Ext.define('sisfacturaelectronica.view.conf.configEmpresa', {
  extend: 'Ext.form.Panel',
  alias: 'widget.wRegEmpresa',
  xtype: 'wRegEmpresa',
  itemId: 'wRegEmpresa',
  requires: [
    'Ext.form.field.*',
    'sisfacturaelectronica.util.Rutas',
    'sisfacturaelectronica.view.conf.configEmpresaController'
  ],
  margin: 30,
  autoScroll: true,
  controller: 'acciones-empresa',
  url: sisfacturaelectronica.util.Rutas.actualizarEmpresa,
  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },
  initComponent: function () {
    me = this;
    Ext.apply(me, {
      items: me.getFormularioEmpresa(),
      bbar: [
        '->',
        {
          xtype: 'button',
          text: 'Grabar',
          scale: 'medium',
          handler: 'onClickGuardarEmpresa'
        }

      ]
    });
    me.callParent(arguments);
    me.getCargarDatosEmpresa();

  },
  getCargarDatosEmpresa: function () {
    Ext.Ajax.request({
      url: sisfacturaelectronica.util.Rutas.empresaDatos,
      success: function (response) {
        ob = Ext.JSON.decode(response.responseText).data[0];
        Ext.ComponentQuery.query('hiddenfield[name=id]')[0].setValue(ob.id);
        Ext.ComponentQuery.query('textfield[name=razonsocial]')[0].setValue(ob.razonsocial);
        Ext.ComponentQuery.query('textfield[name=ruc]')[0].setValue(ob.ruc);
        Ext.ComponentQuery.query('textarea[name=direccion]')[0].setValue(ob.direccion);
        Ext.ComponentQuery.query('textfield[name=lema]')[0].setValue(ob.lema);
        Ext.ComponentQuery.query('textfield[name=correo]')[0].setValue(ob.correo);
        Ext.ComponentQuery.query('textfield[name=telefono]')[0].setValue(ob.telefono);

        if (ob.imagen == '0') {
          Ext.ComponentQuery.query('#imgemp')[0].setSrc(
            sisfacturaelectronica.util.Rutas.srcimagenes + 'P-00.jpg?_=' + (new Date().getTime())
          )
          Ext.ComponentQuery.query('hiddenfield[name=imagenguardar]')[0].setValue(0);

        } else {
          Ext.ComponentQuery.query('#imgemp')[0].setSrc(
            sisfacturaelectronica.util.Rutas.srcimagenes + 'logo.jpg?_=' + (new Date().getTime())
          )
          Ext.ComponentQuery.query('hiddenfield[name=imagenguardar]')[0].setValue(1);
        }

      }
    });
    return true;
  },
  getFormularioEmpresa: function () {
    s = Ext.create('sisfacturaelectronica.store.Series');
    t = Ext.create('sisfacturaelectronica.store.Ticketeras');
    i = Ext.create('sisfacturaelectronica.store.Tiendas');
    d = Ext.create('sisfacturaelectronica.store.DocumentoVenta');
    var obj = [

      {
        xtype: 'hiddenfield',
        name: 'id',
        value: 0
      },
      {
        xtype: 'hiddenfield',
        name: 'tiendas',
        reference: 'tiendas'
      },
      {
        xtype: 'hiddenfield',
        name: 'documentos',
        reference: 'documentos'
      },
      {
        xtype: 'hiddenfield',
        name: 'ticketeras',
        reference: 'ticketeras'
      },
      {
        xtype: 'hiddenfield',
        name: 'imagen',
        reference: 'imagen'
      },
      {
        xtype: 'hiddenfield',
        name: 'imagenguardar',
        itemId: 'imagenguardar',
        value: 0
      },
      {
        xtype: 'container',
        layout: 'hbox',
        items: [
          {
            xytpe: 'panel',
            flex: 1,
            bodyPadding: 10,
            items: [
              {
                xtype: 'image',
                name: 'imgemp',
                itemId: 'imgemp',
                src: 'resources/images/imagen.png',
                height: 120,
                width: 150,
                tooltip: 'Seleccionar una imagen con las extensiones ( jpg,jpeg,bmp )'
              }
            ],
            tbar: [
              '->',
              {
                xtype: 'filebutton',
                itemId: 'fileimg',
                glyph: 0xf1c5,
                listeners: {
                  change: 'onChangeCargarImagenBase64'
                }
              },
              {
                xtype: 'button',
                glyph: 0xf014,
                tooltip: 'Quitar imagen',
                handler: 'onClickRemoverImagen'
              }
            ]
          },
          {
            xytpe: 'container',
            flex: 3,
            layout: {
              type: 'vbox',
              pack: 'start',
              align: 'stretch'
            },
            padding: '10 10 10 10',
            defaults:{
              labelWidth:150
            },
            items: [
              {
                xtype: 'textfield',
                fieldLabel: 'Razón Social',
                name: 'razonsocial',
                allowBlank: false,
                fieldStyle: 'font-size:25px;text-transform: uppercase;background-color:#E1E1E1;border:false;',
                labelStyle: 'padding : 5px 5px 5px 5px ;text-transform: uppercase;background-color:#6A4B5A;border:false;color:#FFFFFF;font-size: 15px;'
              },
              {
                xtype: 'textfield',
                fieldLabel: 'R.U.C',
                name: 'ruc',
                allowBlank: false,
                fieldStyle: 'font-size:25px;text-transform: uppercase;background-color:#E1E1E1;border:false;',
                labelStyle: 'padding : 5px 5px 5px 5px ;text-transform: uppercase;background-color:#6A4B5A;border:false;color:#FFFFFF;font-size: 15px;'

              }

            ]
          }
        ]
      },
      {
        xtype: 'textarea',
        fieldLabel: 'Dirección Fiscal',
        name: 'direccion',
        allowBlank: true,

      },
      {
        xtype: 'container',
        layout: {
          type: 'hbox',
          aling: 'stretch'
        },
        hidden: false,
        padding: '0 0 10 0',
        defaultType: 'textfield',
        items: [
          {
            fieldLabel: 'Lema',
            name: 'lema',
            allowBlank: true,
            flex: 1
          },
          {
            fieldLabel: 'Correo',
            name: 'correo',
            type: 'mail',
            allowBlank: true,
            flex: 1,
            labelAlign: 'right'
          },
          {
            fieldLabel: 'Telefono',
            name: 'telefono',
            allowBlank: true,
            flex: 1,
            labelAlign: 'right'
          },

        ]
      },
      {
        xtype: 'tabpanel',
        itemId: 'tabDetalleEmpresa',
        height: 300,
        activeItem: 1,
        items: [

          {
            title: ' Tiendas ',
            layout: 'fit',
            tbar: [
              {
                xtype: 'button',
                text: 'Nuevo',
                handler: 'onClickNuevaTienda'
              },
              '->',
              {
                xtype: 'button',
                text: 'Boleta - Factura - Guia Remisión',
                glyph: 0xf0f6,
                handler: 'onClickNuevaBoleta'
              },
              {
                xtype: 'button',
                text: 'Ticketera',
                glyph: 0xf0f6,
                handler: 'onClickNuevaTicketeraTienda'
              },

            ],
            items: [{
              xtype: 'gridpanel',
              store: i,
              reference: 'dgvTiendas',
              itemId: 'dgvTiendas',
              selModel: 'rowmodel',
              plugins: {
                ptype: 'cellediting',
                clicksToEdit: 1
              },
              columns: [
                {
                  text: 'Dirección',
                  dataIndex: 'direccion',
                  flex: 2,
                  editor: {
                    xtype: 'textfield'
                  }

                },
                {
                  text: 'Telefono',
                  dataIndex: 'telefono',
                  flex: 1,
                  editor: {
                    xtype: 'textfield'
                  }
                },
                {
                  text: 'Celular',
                  dataIndex: 'celular',
                  flex: 1,
                  editor: {
                    xtype: 'textfield'
                  }
                },
                {
                  xtype: 'widgetcolumn',
                  flex: 0.5,
                  widget: {
                    xtype: 'button',
                    flex: 1,
                    glyph: 0xf014,
                    handler: 'onClickEliminarTienda'

                  }

                }
              ],
            }]
          },
          {
            title: ' Doc. Internos ',
            layout: 'fit',
            tbar: [{
              xtype: 'button',
              text: 'Nuevo',
              handler: 'onClickNuevoDocInterno'
            },

            ],
            items: [{
              xtype: 'gridpanel',
              store: s,
              reference: 'dgvDocInternos',
              selModel: 'rowmodel',
              plugins: {
                ptype: 'cellediting',
                clicksToEdit: 1
              },
              columns: [
                {
                  text: 'Tipo',
                  dataIndex: 'documento',
                  flex: 1,
                  editor: {
                    xtype: 'combo',
                    store: d,
                    valueField: 'descripcion',
                    displayField: 'descripcion'
                  }
                },
                {
                  text: 'Serie',
                  dataIndex: 'serie',
                  flex: 1,
                  editor: { xtype: 'textfield' }

                },
                {
                  text: 'Inicia',
                  dataIndex: 'numero',
                  flex: 1,
                  editor: { xtype: 'numberfield' }
                },
                {
                  xtype: 'widgetcolumn',
                  flex: 0.5,
                  widget: {
                    xtype: 'button',
                    flex: 0.5,
                    glyph: 0xf014,
                    handler: 'onClickEliminarSerie'
                  }
                }
              ]
            }]
          },
          {
            title: ' Ticketeras ',
            layout: 'fit',
            tbar: [{
              xtype: 'button',
              text: 'Nuevo',
              handler: 'onClickNuevaTicketera'
            },

            ],
            items: [{
              xtype: 'gridpanel',
              store: t,
              reference: 'dgvTicketera',
              selModel: 'rowmodel',
              plugins: {
                ptype: 'cellediting',
                clicksToEdit: 1
              },
              columns: [
                {
                  text: 'Descripción',
                  dataIndex: 'descripcion',
                  flex: 1.5,
                  editor: {
                    xtype: 'textfield',

                  }
                },
                {
                  text: 'Codigo',
                  dataIndex: 'codigo',
                  flex: 1,
                  editor: {
                    xtype: 'textfield',

                  }
                },
                {
                  text: 'Serie',
                  dataIndex: 'serie',
                  flex: 1,
                  editor: {
                    xtype: 'textfield'
                  }
                },
                {
                  text: 'Autorizacion Sunat',
                  dataIndex: 'autorizacionsunat',
                  flex: 1,
                  editor: {
                    xtype: 'textfield'
                  }
                },
                {
                  text: 'Inicia',
                  dataIndex: 'numero',
                  flex: 1,
                  editor: {
                    xtype: 'numberfield'
                  }
                },
                {
                  xtype: 'widgetcolumn',
                  flex: 0.5,
                  widget: {
                    xtype: 'button',
                    flex: 0.5,
                    glyph: 0xf014,
                    handler: 'onClickEliminarTicketera'
                  }
                }
              ]
            }]
          },
          {
            title: ' Precio Ventas ',
            hidden:true,
            layout: {
              type: 'fit',
            },
            bodyPadding: 10,
            items: [
              {
                xtype: 'container',
                layout:{
                  type:'hbox',
                },
                items: [
                  {
                    xtype: 'label',
                    text: 'Porcentaje que se agregara al precio de compra para generar precio de venta (%)',
                    padding: '5px 0 0 0',
                    border: true,
                    height: 25,
                    flex :1,
                    style: {
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '13px'
                    }
                  },
                  {
                    xtype:'numberfield',
                    name : 'porprecio',
                    flex: 1
                  }
                ]
              }

            ]
          },
        ]
      }
    ];
    return obj;
  }



});
