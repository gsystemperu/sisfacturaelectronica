Ext.define('sisfacturaelectronica.view.conf.configNuevaBoleta', { //**CAMBIAR
        extend: 'Ext.panel.Panel',
        xtype: 'wnuevaboleta', //**CAMBIAR
        alias: 'widget.wnuevaboleta', //**CAMBIAR
        requires: [
            'Ext.layout.container.HBox',
            'sisfacturaelectronica.view.conf.configNuevaBoletaController',
            'Ext.grid.*',
            'Ext.grid.column.*',
            'Ext.form.field.*'
        ],
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        defaults: {
            frame: false,
            bodyPadding: 0
        },
        config:{
          tienda:0
        },
        controller:'acciones-documentos',
        initComponent: function () {
            st = Ext.create('sisfacturaelectronica.store.TiendaDocumentosVentaAsignados');
            d  = Ext.create('sisfacturaelectronica.store.TiendaDocumentosVenta');
            t  = Ext.ComponentQuery.query('#dgvTiendas')[0].getSelectionModel().getSelection()[0];
            st.load({
              params:{
                idtienda:  t.get('id')
              }
            });

            Ext.apply(this, {
                items: [{
                        flex: 3,
                        margin: '0 3 0 0',
                        layout: 'fit',
                        items: [
                          {
                            xtype:'hiddenfield',
                            reference : 'jsondocumentos',
                          },
                          {
                            xtype: 'grid',
                            reference: 'dgvBoleta',
                            selModel: 'rowmodel',
                            plugins: {
                              ptype: 'cellediting',
                              clicksToEdit: 1
                            },
                            store: st,
                            sortableColumns: false,
                            columns: [{
                                    text: 'Documento de Venta',
                                    dataIndex: 'documentoventa',
                                    flex: 1,
                                    editor:{
                                        xtype:'combo',
                                        store : d,
                                        valueField:'documentoventa',
                                        displayField:'documentoventa',
                                        editable :false
                                    }
                                },
                                {
                                    xtype: 'widgetcolumn',
                                    flex: 0.3,
                                    widget: {
                                        xtype: 'button',
                                        glyph: 0xf014,
                                        handler: 'onClickEliminar'
                                    }

                                }
                            ],
                            tbar:[
                              {xtype:'button',text:'Agregar',handler:'onClickAgregar'},
                              '->',
                              {xtype:'button',text :'Guardar',handler:'onClickGuardar'}
                            ]
                        }]
                    }
                ]
            });
            this.callParent();
        }
    });
