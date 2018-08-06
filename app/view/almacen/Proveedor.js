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
    bodyPadding: 5,
    defaults: {
      frame: false,
      bodyPadding: 5
    },
    controller :'acciones-proveedor',
    initComponent: function () {
     storeProveedores = Ext.create('sisfacturaelectronica.store.Proveedores');
      me = this;
      Ext.apply(this, {
        items: [{
            title: 'Registros',
            flex: 3,
            margin: '0 3 0 0',
            layout: 'fit',
            items: [{
              xtype: 'grid',
              itemId: 'dgvProveedores',
              reference: 'dgvProveedores',
              store: storeProveedores,
              sortableColumns: false,
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
                  xtype: 'fieldset',
                  title: '<b>Buscar Por</b>',
                  layout: 'hbox',
                  flex: 1,
                  padding: '0 5 10 5',
                  defaults: {
                    labelWidth: 120
                  },
                  items: [{
                      xtype: 'textfield',
                      reference: 'txtBuscarRazonSocial',
                      fieldLabel: 'Razon Social',
                      flex: 1,
                      enableKeyEvents: true,
                      emptyText :'-----  RAZON SOCIAL NOMBRE -----',
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
          }, {
            title: 'Informacion',
            flex: 2,
            margin: '0 10 0 0',
            autoScroll: true,
            items: [{
              xtype: 'form',
              reference: 'frmProveedor',
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
                        fieldLabel:'Razon Social',
                        allowBlank : false,
                        name : 'razonsocial',
                        itemId :'txtRazonSocial'
                    },
                    {
                      fieldLabel:'R.U.C.',
                      name :'numrucprov'
                    },
                    {
                      fieldLabel: 'Correo',
                      type:'mail',
                      name : 'correo'
                  
                    },
                    {
                        fieldLabel:'Contacto',
                        name :'contacto'

                    },
                    {
                        fieldLabel:'Telefono',
                        name :'telefono'

                    },
                    {
                        xtype:'textarea',
                        fieldLabel:'Direccion',
                        name :'direccion'

                    },
                    {
                        xtype:'textarea',
                        fieldLabel:'Direccion Fiscal',
                        name :'direccionfiscal'

                    }
      ];
      return obj;
    }
  });
