Ext.define('sisfacturaelectronica.view.ventas.GuiaRemision', {
    extend: 'Ext.panel.Panel',
    xtype: 'wGuiaRemision',
    alias: 'widget.wGuiaRemision',
    requires: [
        'Ext.grid.plugin.*',
        'Ext.form.field.*',
        'sisfacturaelectronica.util.Rutas',
        'Ext.grid.plugin.RowEditing',
        'sisfacturaelectronica.view.ventas.AccionesGuiaRemision'
    ],
    itemId: 'wGuiaRemision',
    controller: 'acciones-guiaremision',
    initComponent: function () {
        me = this;
        sgr = Ext.create('sisfacturaelectronica.store.GuiaRemisionDetalle');
        smt = Ext.create('sisfacturaelectronica.store.MotivosTranslados');
        Ext.applyIf(me, {
            items: [
                {
                    xtype: "form",
                    itemId: 'frmRegGuiaRemision',
                    padding: 10,
                    reference: 'frmRegGuiaRemision',
                    url: sisfacturaelectronica.util.Rutas.guiaRemisionActualizar,
                    items: [
                        {
                            xtype: 'fieldset',
                            title : 'Datos Principales',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    name: 'id',
                                    itemId: 'idguia',
                                    value: 0
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'idfactura',
                                    itemId: 'idfactura'
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'idcotizacion',
                                    itemId: 'idcotizacion'
                                },
                                {
                                    xtype: 'panel', // @@ Datos del Punto salida, punto llegada
                                    border: false,
                                    flex: 1,
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: 'fit',
                                            defaultType: 'textfield',
                                            bodyPadding: 10,
                                            items: [
                                                {
                                                    xtype: 'textarea',
                                                    fieldLabel: 'Punto de Partida',
                                                    flex: 1,
                                                    name: 'puntopartida',
                                                    allowBlank: false
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: 'fit',
                                            bodyPadding: 10,
                                            defaultType: 'textfield',
                                            items: [
                                                {
                                                    xtype: 'textarea',
                                                    fieldLabel: 'Punto de Llegada',
                                                    flex: 1,
                                                    name: 'puntollegada',
                                                    allowBlank: false
                                                },
                                            ]
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel', // @@ Datos del Translado
                                    border: false,
                                    flex: 1,
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            defaultType: 'textfield',
                                            bodyPadding: 10,
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    flex: 1,
                                                    items: [
                                                        {
                                                            xtype: 'datefield', labelWidth: 150,
                                                            fieldLabel: 'Fecha Inicio Translado', flex: 1, value: new Date(),
                                                            name: 'fechatraslado'
                                                        },
                                                        {
                                                            xtype: 'numberfield',
                                                            labelWidth: 150,
                                                            fieldLabel: 'Costo Minimo', flex: 1,
                                                            value: 0,
                                                            name: 'costominimo', minValue: 0,
                                                            labelAlign:'right'
                                                        }
                                                    ]
                                                }

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            bodyPadding: 10,
                                            defaultType: 'textfield',
                                            defaults: {
                                                labelWidth: 190
                                            },
                                            items: [
                                                {
                                                    xtype:'label',
                                                    text :'Razon Social del DESTINATARIO',
                                                    flex:1
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    //fieldLabel: 'Razon Social del DESTINATARIO',
                                                    flex: 1,
                                                    allowBlank: false,
                                                    name: 'razonsocialdestinatario'
                                                           
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    layout: 'hbox',
                                                    defaultType: 'textfield',
                                                    defaults: {
                                                        labelWidth: 100
                                                    },
                                                    items: [
                                                        { fieldLabel: 'R.U.C', flex: 1, allowBlank: false, name: 'rucdestinatario' },
                                                        { fieldLabel: 'D.N.I', flex: 1, labelAlign: 'right', allowBlank: true, name: 'dnidestinatario' }
                                                    ]
                                                }

                                            ]

                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel', // @@ Datos del Transportista
                                    border: false,
                                    flex: 1,
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            defaultType: 'textfield',
                                            defaults: {
                                                labelWidth: 200
                                            },
                                            bodyPadding: 10,
                                            items: [
                                                {
                                                    xtype: 'label', textAlign: 'center', text: 'UNIDAD DE TRANSPORTE Y CONDUCTOR', flex: 1,
                                                    style: {
                                                        paddingTop: '3px',
                                                        background: '#664a5a',
                                                        color: 'white',
                                                        textAlign: 'center',
                                                        fontWeight: 'bold',
                                                        fontSize: '13px'
                                                    }
                                                },
                                                {
                                                    fieldLabel: 'Marca y numero de placa',
                                                    flex: 1,
                                                    padding: '5 0 0 0',
                                                    name: 'marcanumeroplaca'
                                                },
                                                {
                                                    fieldLabel: 'N° de constancia de inscripcion',
                                                    flex: 1,
                                                    name: 'numeroconstanciainscripcion'
                                                },
                                                {
                                                    fieldLabel: 'N° de licencia de conducir',
                                                    flex: 1,
                                                    name: 'numerolicenciaconductor'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            defaultType: 'textfield',
                                            defaults: {
                                                labelWidth: 200
                                            },
                                            bodyPadding: 10,
                                            items: [
                                                {
                                                    xtype: 'label', align: 'center',
                                                    text: 'EMPRESA DE TRANSPORTE', flex: 1,
                                                    style: {
                                                        paddingTop: '3px',
                                                        background: '#664a5a',
                                                        color: 'white',
                                                        textAlign: 'center',
                                                        fontWeight: 'bold',
                                                        fontSize: '13px'
                                                    }
                                                },
                                                {
                                                    fieldLabel: 'Nombre o Razón Social',
                                                    flex: 1, padding: '5 0 0 0 ',
                                                    name: 'empresatransporterazonsocial'
                                                },
                                                {
                                                    fieldLabel: 'Número de R.U.C', flex: 1,
                                                    name: 'empresatransporteruc'
                                                }
                                            ]
                                        }

                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            frame: false,
                            border: false,
                            items: [{
                                xtype: 'hiddenfield',
                                itemId: 'txtJsonDetalleGuiaRemision',
                                name: 'vjsondetalle'
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'vid',
                                itemId: 'vid',
                                value: 0
                            },
                            //*** */

                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'label',
                                        text: 'FECHA EMISION',
                                        width: 120,
                                        height: 23,
                                        style: {
                                            paddingTop: '3px',
                                            background: '#664a5a',
                                            color: 'white',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '13px'
                                        }
                                    },
                                    {
                                        xtype: 'datefield',
                                        value: new Date(),
                                        name: 'fechaemision',
                                        flex: 1

                                    },
                                  
                                            {
                                                xtype: 'label',
                                                text: 'Nro. Documento :',
                                                width: 120,
                                                height: 23,
                                                style: {
                                                    paddingTop: '3px',
                                                    background: '#664a5a',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',
                                                    fontSize: '13px'

                                                }
                                            },
                                            {
                                                xtype:'textfield',
                                                flex: 1,
                                                name: 'serieguia',
                                                itemId: 'serieguia',
                                                emptyText:'000',
                                                allowBlank:false,
                                                value : '*Generando*',
                                                readOnly:true
                                                
                                            },
                                            {
                                                xtype:'textfield',
                                                flex: 1,
                                                name: 'numeroguia',
                                                itemId: 'numeroguia',
                                                emptyText:'0000',
                                                allowBlank:false,
                                                value : '*Generando*',
                                                readOnly:true
                                                
                                            },
                                            {
                                                xtype: 'textfield',
                                                flex: 2,
                                                readOnly: true,
                                                hidden:true,
                                                fieldStyle: 'text-align: center;font-size:15px;font-weight:bold; ',
                                                value: 'CT000000000000',
                                                name: 'ctcodigo',
                                                itemId: 'nrodocumento'
                                            },
                                            {
                                                xtype: 'label',
                                                text: 'Motivo del Translado :',
                                                width: 200,
                                                height: 23,
                                                style: {
                                                    paddingTop: '3px',
                                                    background: '#664a5a',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',
                                                    fontSize: '13px'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                labelHide: true,
                                                store: smt,
                                                displayField: 'descripcion',
                                                valueField: 'id',
                                                editable: true,
                                                queryMode: 'local',
                                                name: 'idmotivotranslado',
                                                allowBlank: false,
                                                flex: 3

                                            }
                                        ]

                                   // }

                                //]
                            },

                            /*** */
                            {
                                xtype: 'fieldset',
                                columnWidth: 0.1,
                                defaultType: 'textfield',
                                items: [

                                    {
                                        xtype: 'panel',
                                        layout: 'fit',
                                        margin: '0 0 5 0',
                                        items: [{
                                            xtype: 'grid',
                                            flex: 1,
                                            reference: 'dgvDetalleGuiaRemision',
                                            itemId: 'dgvDetalleGuiaRemision',
                                            store: sgr,
                                            columns: [
                                                {
                                                    text: 'Cantidad',
                                                    dataIndex: 'cantidad',
                                                    flex: 0.5,
                                                    align: 'center',
                                                },
                                                {
                                                    text: 'Descripción',
                                                    dataIndex: 'descripcion',
                                                    flex: 3
                                                },
                                                {
                                                    text: 'Unidad Medida',
                                                    dataIndex: 'unidadmedida',
                                                    flex: 1,
                                                    align: 'center',

                                                },
                                                {
                                                    xtype: 'numbercolumn',
                                                    text: 'Peso Total',
                                                    dataIndex: 'pesototal',
                                                    flex: 1,
                                                    align: 'center',
                                                    hidden:true
                                                }
                                            ],
                                            cls: '',
                                            height: 250,
                                        }]

                                    }
                                ]

                            }, // fin fieldset Detalle
                            {
                                xtype: 'panel',
                                buttons: [{
                                    xytpe: 'button',
                                    text: 'Cancelar',
                                    scale: 'medium',
                                    handler: 'onClickSalirGuiaRemision'
                                }, '-',
                                {
                                    xytpe: 'button',
                                    text: 'Guardar',
                                    scale: 'medium',
                                    handler: 'onClickGuardarGuiaRemision'
                                }


                                ]


                            }
                            ]

                        }

                    ]
                }


            ]
        });

        me.callParent(arguments);
    }
});
