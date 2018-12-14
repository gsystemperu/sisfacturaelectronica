Ext.define('sisfacturaelectronica.view.ventas.RegistrarCliente', {
  extend: 'Ext.window.Window',
  alias: 'widget.wRegistrarCliente',
  requires: [
    'sisfacturaelectronica.view.ventas.AccionesRegCotizacion',
    'sisfacturaelectronica.util.Rutas'

  ],
  width: 900,
  height: 380,
  modal: true,
  floating: true,
  autoShow: true,
  title: 'Registro de Clientes',
  layout: {
    aling: 'stretch',
    type: 'fit'
  },
  controller: 'acciones-regcotizacion',
  initComponent: function () {
    var storeTipoDoc = Ext.create('sisfacturaelectronica.store.TipoDocumentos');
    me = this;
    Ext.apply(me, {
      items: [{
        xtype: 'form',
        reference: 'myFormCliente',
        itemId : 'myFormCliente',
        url: sisfacturaelectronica.util.Rutas.clienteGuardar,
        bodyPadding: 5,
        layout: {
          type: 'hbox',
          align: 'stretch'
        },
        items: [{
          xtype: 'fieldset',
          flex: 2,
          title: 'Informaci&oacute;n Principal',
          defaults: {
            //afterLabelTextTpl: Packt.util.Util.required,
            anchor: '100%',
            xtype: 'textfield',
            labelWidth: 150

          },
          items: [{
              xtype: 'hiddenfield',
              name: 'vid',
              value: 0
            },

            {
              fieldLabel: 'Apellido Materno',
              maxLength: 100,
              name: 'vmaterno',
              fieldStyle: 'text-transform:uppercase',
              hidden: true
            },
            {
              emptyText: 'Nombre o Razón Social ',
              fieldStyle: 'font-size:25px;height:40px;text-transform:uppercase;',
              name: 'vnombre',
              reference: 'vnombre',
              allowBlank:false
            },
            {
              xtype: 'combobox',
              fieldLabel: 'Tipo Documento',
              name: 'viddoc',
              itemId: 'iddocidentidad',
              store: storeTipoDoc,
              queryMode: 'local',
              displayField: 'descripcion',
              valueField: 'idtipdoc',
              value: 1,
              editable: false

            },
            {
              xtype: 'textfield',
              name: 'vnumruc',
              reference: 'vnumruc',
              fieldLabel: 'Número',
              fieldStyle: 'text-transform:uppercase;text-align:left;font-size:15px;',
              flex: 1,
              allowBlank:false
            },
            {
                fieldLabel: 'Numero documento',
                name: 'vnumdoc',
                fieldStyle: 'text-transform:uppercase;text-align:right',
                hidden:true
              },
            {
              fieldLabel: 'Dirección',
              name: 'vdireccion',
              reference: 'vdireccion',
              fieldStyle: 'text-transform:uppercase'
            },
            {
              fieldLabel: 'Contacto / Referencia',
              name: 'vpaterno',
              fieldStyle: 'text-transform:uppercase',
              hidden: false,
            },

            
            /*{
                fieldLabel: 'RUC',
                name: 'vnumruc',
                fieldStyle:'text-transform:uppercase;text-align:right'
            },*/

            {
              fieldLabel: 'Telefono',
              name: 'vtelefono',
              fieldStyle: 'text-transform:uppercase;text-align:left'
            },
            {
              fieldLabel: 'Celular',
              name: 'vcelular',
              fieldStyle: 'text-transform:uppercase;text-align:left'
            },
            {
              xtype: 'radiogroup',
              fieldLabel: 'Precio',
              columns: 3,
              defaults:{
                hidden:true
              },
              items: [
              {
                  boxLabel: 'Publico Lima',
                  inputValue: 1,
                  name: 'tipoprecioper',
                  value: true,
                  hidden:false

                }, {
                  boxLabel: 'Lima Especial 1',
                  name: 'tipoprecioper',
                  inputValue: 2

                }, {
                  boxLabel: 'Lima Especial 2',
                  name: 'tipoprecioper',
                  inputValue: 3

                }, {
                  boxLabel: 'Lima Especial 3',
                  name: 'tipoprecioper',
                  inputValue: 4

                }, {
                  boxLabel: 'Publico Provincia',
                  name: 'tipoprecioper',
                  inputValue: 5

                }, {
                  boxLabel: 'Provincia Especial 1',
                  name: 'tipoprecioper',
                  inputValue: 6
                },
                {
                  boxLabel: 'Provincia Especial 2',
                  name: 'tipoprecioper',
                  inputValue: 7

                },
                {
                  boxLabel: 'Provincia Especial 3',
                  name: 'tipoprecioper',
                  inputValue: 8

                },
                {
                  boxLabel: 'Distribuidor Lima',
                  name: 'tipoprecioper',
                  inputValue: 9

                },
                {
                  boxLabel: 'Distribuidor Provincia',
                  name: 'tipoprecioper',
                  inputValue: 8

                }
              ]
            }

          ]
        }]
      }],
      bbar:[
        '->',
        {
          xtype: 'button',
          text: 'Cancelar',
          itemId: 'btnCancelar',
          handler: 'onClickCancelarCliente'
        },
        {
          xtype: 'button',
          text: 'Grabar',
          itemId: 'btnGrabar',
          handler: 'onClickGuardarCliente'
        }
      ]
    });
    me.callParent(arguments);
  },



});
