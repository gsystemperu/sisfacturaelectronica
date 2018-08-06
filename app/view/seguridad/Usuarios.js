

Ext.define('sisfacturaelectronica.view.seguridad.Usuarios', {
  extend: 'Ext.panel.Panel',
  xtype: 'wusuarios',
  requires: [
    'sisfacturaelectronica.view.seguridad.UsuariosController',
    'sisfacturaelectronica.view.seguridad.UsuariosModel'
  ],
  controller: 'seguridad-usuarios',
  viewModel: {
    type: 'seguridad-usuarios'
  },
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
  initComponent: function () {
    u = Ext.create('sisfacturaelectronica.store.Usuarios');
    me = this;
    Ext.apply(this, {
      items: [{
        title: 'Registros',
        flex: 3,
        margin: '0 3 0 0',
        layout: 'fit',
        items: [{
          xtype: 'grid',
          reference: 'dgvUsuarios',
          store: u,
          sortableColumns: false,
          columns: [
            {
              text: 'Nombre Usuario',
              dataIndex: 'usuario',
              flex: 2,
              align: 'left'
            }, {
              text: 'Perfil',
              dataIndex: 'perfil',
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
                handler: 'onClickEliminarUsuario'

              }

            }
          ],
          listeners: {
            itemclick: 'onClickItemUsuario'
          }

        }]
      }, {
        title: 'Informacion',
        flex: 2,
        margin: '0 10 0 0',
        autoScroll: true,
        items: [{
          xtype: 'form',
          reference: 'frmUsuario',
          url: sisfacturaelectronica.util.Rutas.actualizarUsuario,
          defaults: {
            xtype: 'textfield'
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
              handler: 'onClickNuevoUsuario'
            }, {
              xtype: 'button',
              text: 'Grabar',
              scale: 'medium',
              handler: 'onClickGuardarUsuario'
              
            }

          ]

        }]

      }

      ]
    });
    this.callParent();
  },
  getFormularioProveedor: function () {
    s = Ext.create('sisfacturaelectronica.store.Perfiles');
    var obj = [
      {
        xtype: 'hiddenfield',
        name: 'id',
        value: 0
      },
      {
        fieldLabel: 'Usuario',
        allowBlank: false,
        name: 'usuario'
      },
      {
        fieldLabel: 'Password',
        name: 'clave',
        inputType: 'password',
        allowBlank: true
      },
      {
        xtype: 'combo',
        fieldLabel: 'Pefil del Usuario',
        name: 'idperfil',
        store : s ,
        displayField : 'descripcion',
        valueField : 'id',
        allowBlank: false,
        queryMode : 'local'
      }
    ];
    return obj;
  }
});
