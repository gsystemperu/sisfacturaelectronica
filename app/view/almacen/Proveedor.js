Ext.define('sisfacturaelectronica.view.almacen.Proveedor', {
    extend: 'Ext.panel.Panel',
    xtype: 'wRegProveedores',
    alias: 'widget.wRegProveedores',
    requires: [
      'Ext.layout.container.HBox',
      'sisfacturaelectronica.view.almacen.AccionesProveedor',
      'Ext.grid.*',
      'Ext.form.field.Number'
    ],
    layout: {
      type: 'hbox',
      pack: 'start',
      align: 'stretch'
    },
    controller :'acciones-proveedor',
    initComponent: function () {
     storeProveedores = Ext.create('sisfacturaelectronica.store.Proveedores');
      me = this;
      Ext.apply(this, {
        items: [{
            flex: 3,
            margin: '0 3 0 0',
            layout: 'fit',
            items: [{
              xtype: 'grid',
              itemId: 'dgvProveedores',
              reference: 'dgvProveedores',
              store: storeProveedores,
              sortableColumns: false,
              emptyText :'NO EXISTE DATOS SEGÚN EL CRITERIO DE BUSQUEDA',
              columns: [
                {
                  text: 'Razon Social',
                  dataIndex: 'razonsocial',
                  flex: 2,
                  align: 'left'
                },{
                  text: 'R.U.C.',
                  dataIndex: 'numrucprov',
                  flex: 1,
                  align: 'right'
                },
                 {
                  text: 'Contacto',
                  dataIndex: 'contacto',
                  flex: 1,
                  align: 'right'
                },
                {
                  text: 'Telefono',
                  dataIndex: 'telefono',
                  flex: 1,
                  align: 'right'
                },
                {
                  xtype: 'widgetcolumn',
                  flex: 0.5,
                  widget: {
                    xtype: 'button',
                    flex: 1,
                    glyph: 0xf014,
                    handler: 'onClickEliminarProveedor'

                  }

                }
              ],
              tbar: [{
                  xtype: 'container',
                  layout: 'hbox',
                  flex: 1,
                  defaults: {
                    labelWidth: 120
                  },
                  items: [{
                      xtype: 'textfield',
                      fieldStyle: 'font-size:18px;height:30px;',
                      reference: 'txtBuscarRazonSocial',
                      flex: 1,
                      enableKeyEvents: true,
                      emptyText :'Digital Razon Social ',
                      listeners: {
                        keypress: 'onKeyPressTextoDeBusquedaProveedor'
                      }
                    },


                  ]


                },

              ],
              listeners: {
                itemclick: 'onClickItemProveedor'
              }

            }]
          }, 
          {
            flex: 2,
            items: [
            {
              xtype: 'form',
              reference: 'frmProveedor',
              bodyPadding : 10,
              url: sisfacturaelectronica.util.Rutas.proveedorGuardar,
              defaults:{
                xtype:'textfield'
              },
              items: me.getFormularioProveedor(),
              layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
              },

              bbar: [
                '->', {
                  xtype: 'button',
                  text: 'Nuevo',
                  scale: 'medium',
                  handler: 'onClickNuevoProveedor'
                }, {
                  xtype: 'button',
                  text: 'Grabar',
                  scale: 'medium',
                  handler: 'onClickGuardarProveedor',
                  idcontrol : 'dgvProveedores'
                }

              ]

            }]

          }

        ]
      });
      this.callParent();
    },
    getFormularioProveedor: function () {
      var obj = [
        {
                        xtype:'hiddenfield',
                        name :'id',
                        value : 0
                    },
                    {
                        allowBlank : false,
                        name : 'razonsocial',
                        itemId :'txtRazonSocial',
                        fieldStyle: 'font-size:21px;height:30px;background-color:#F9F7D8',
                        emptyText : 'Razón Social : Empresa S.A.'
                    },
                    {
                      xtype:'label',
                      text : 'R.U.C.' 
                    },
                    {
                      name :'numrucprov'
                    },
                    {
                      xtype:'label',
                      text : 'Correo' 
                    },
                    {
                      type:'mail',
                      name : 'correo'
                  
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
                      text : 'Telefono Fijo / Movil ' 
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
                      text : 'Dirección Fiscal',
                    },
                    {
                        xtype:'textarea',
                        name :'direccionfiscal'

                    }
      ];
      return obj;
    }
  });
