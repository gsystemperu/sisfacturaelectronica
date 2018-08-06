Ext.define('sisfacturaelectronica.view.puntoventa.Pago',{
    extend: 'Ext.form.Panel',
    xtype :'wPuntoVentaPago',
    alias : 'wPuntoVentaPago',
    itemId :'wPuntoVentaPago',

    layout:{type:'vbox',align:'stretch'},
    padding : 100,
    controller:'puntoventa-main',
    initComponent:function(){
         me = this;
         Ext.apply(this,{
            items:[
              me.getPanelPago(),
              me.getPanelTotales()
            ],
            buttons:[
              {
                text :'GUARDAR PAGO',
                scale :'medium',
                itemId : 'btnGuardarCajaPago',
                listeners:{
                  click : 'onClickGuardarCajaPago'
                }

              }
            ]
         });
        this.callParent(arguments);

    },
    getPanelTotales:function(){
      return obj = {
        xtype:'panel',
        layout:{
          type:'vbox',
          align :'stretch'
        },
        defaults:{
          labelWidth : 300
        },
        bodyPadding: '30',
        padding : '5 0 0 0',
        items:[
          {
              xtype: 'numberfield',
              fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Total </div></b>',
              itemId: 'txtTotalVentaCajaValidar' ,
              decimalSeparator: '.',
              readOnly: true,
              fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',

          },
          {
              xtype: 'numberfield',
              fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Pago Acuenta </div></b>',
              itemId: 'txtAcuentaVentaCajaValidar' ,
              decimalSeparator: '.',
              readOnly: false,
              fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',
              enableKeyEvents: true,
              value : 0,
              listeners:{
                keyup:'onKeyPagoAcuenta'
              }
          },
          {
              xtype: 'numberfield',
              fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Saldo </div></b>',
              itemId: 'txtSaldoVentaCajaValidar' ,
              decimalSeparator: '.',
              readOnly: true,
              value : 0,
              fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',
          }

        ]
      };
    },
    getPanelPago:function(){
      var _storeFormaPago = Ext.create('sisfacturaelectronica.store.FormaPago');
      return obj = {
          xtype:'panel',
          layout:{
            type:'hbox',
            align :'stretch'
          },
          //padding : 100,
          items:[
            {
                xtype:'radiogroup',
                vertical: true,
                flex: 1.5,
                items:[
                  {boxLabel:'NOTA / TICKET',name: 'dv',inputValue:'3',hidden:true},
                  {boxLabel:'BOLETA',name: 'dv',inputValue:'2' , checked: true},
                  {boxLabel:'FACTURA',name: 'dv',inputValue:'1'}
                ],
                listeners:{
                  change:'onChangeSeleccionarDoc'
                }
            },
            {
                xtype:'label',
                text :'FORMA PAGO',
                padding: '5px 0 0 0',
                border: true,
                width: 110,
                height: 25,
                style: {
                    background: '#6E4B5A',
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '11px'
                }
            },
            {
              xtype:'combo',
              flex: 1,
              labelAlign:'right',
              store  :_storeFormaPago,
              valueField : 'idfopag',
              displayField : 'descripcion',
              queryMode : 'local',
              itemId :'cboFormaPagoPv',
              editable:false,
              allowBlank:false,
              value : 18
              
            },
            {
                xtype:'label',
                text :'DOCUMENTO',
                padding: '5px 0 0 0',
                border: true,
                itemId:'lblDoc',
                width: 90,
                height: 25,
                hidden:true,
                style: {
                    background: '#6E4B5A',
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '11px'
                }
            },
            {
              xtype:'textfield',
              allowBlank :true,
              flex: 0.5,
              value : '001',
              itemId : 'txtSerieDoc',
              hidden:true
            },
            {
              xtype:'textfield',
              allowBlank :true,
              readOnly:true,
              flex: 0.5,
              itemId : 'txtNumeroDoc',
              hidden:true
            }
          ]
      };

    }


});
