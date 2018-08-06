Ext.define('sisfacturaelectronica.view.mrp.FormListaMaterial', {
    extend: 'Ext.form.Panel',
    alias : 'widget.wFormListaMaterial',
    xtype : 'wFormListaMaterial',
    itemId : 'wFormListaMaterial',
    requires   : [
        'Ext.form.field.*',
        'sisfacturaelectronica.util.Rutas',
        'sisfacturaelectronica.view.mrp.AccionesFormListaMaterial',

    ],
    //margin: 30,
    autoScroll: true,
    padding : 50,
    controller: 'acciones-formlistamaterial',
    //url: sisfacturaelectronica.util.Rutas.productoGuardar,
    layout: {
      type: 'vbox',
      //pack: 'start',
      align: 'stretch'
    },
    initComponent: function() {
        me = this;
        var storeUnidadMedida = Ext.create('sisfacturaelectronica.store.UnidadDeMedidas');
        var storeProveedores  = Ext.create('sisfacturaelectronica.store.Proveedores');
        var storeProducto     = Ext.create('sisfacturaelectronica.store.Productos');
        //storeProducto.load();

        Ext.apply(me,
        {
          items : me.getFormularioProducto(storeUnidadMedida, storeProveedores,storeProducto),
          bbar: [
            {
              xtype: 'button',
              text: 'Copiar',
              scale: 'medium',
              handler: 'onClickCopiarProducto'
            },
            '->',
            {
             xtype: 'button',
             text: 'Cancelar',
             scale: 'medium',
             handler: 'onClickCancelarProducto'
           },
             {
              xtype: 'button',
              text: 'Grabar',
              scale: 'medium',
              handler: 'onClickGuardarProducto'
            }

          ]
        });
        me.callParent(arguments);
    },
    getFormularioProducto: function (storeUnidadMedida, storeProveedores,storeProducto) {
      _storeDetListaMateriales = Ext.create('sisfacturaelectronica.store.DetListaMateriales', {});
      storeProducto.load();
      var obj = [
        {
          xtype:'hiddenfield',
          name : 'id',
          value : 0
        },
        {
          xtype:'hiddenfield',
          name :'jsondetallelistamaterial',
          itemId :'jsondetallelistamaterial'
        },
        {
            xtype: 'label',
            itemId : 'lblNombreProducto',
            text  : '* NUEVA FORMULA *',
            padding: '5px 5px 5px 5px',
            style: {
              color: '#775c80',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: '15px'
            }
          },

        {
          xtype       : 'combo',
          fieldLabel  : 'Nombre',
          store       : storeProducto,
          valueField  : 'id',
          displayField :'nombre',
          queryMode    :'local',
          editable     : true,
          name         : 'idproducto',
          allowBlank :false,
          fieldStyle  :'font-size:20px;text-transform: uppercase;background-color:#F9F7D8'
        },


        {
          xtype: 'container',
          layout: {
            type: 'hbox',
          },
          padding : '0 0 10 0',
          defaultType: 'combo',
          items: [
            {
              fieldLabel: 'Unidad Medida',
              name: 'idunidadmedida',
              itemId: 'idunidadmedida',
              flex: 1,
              store: storeUnidadMedida,
              displayField: 'descripcion',
              valueField: 'id',
              queryMode: 'local',
              editable: false,
              emptyText: '---- Seleccionar -----',
                labelAlign :'left'
            },
            {xtype:'button',glyph: sisfacturaelectronica.util.Glyphs.getGlyph('nuevo'),handler:'onClickNuevoUnidadMedida'},
            {xtype:'button',glyph: sisfacturaelectronica.util.Glyphs.getGlyph('refrescar'),handler:'onClickRefrescarUnidadMedida'},

              {
                xtype: 'numberfield',
                fieldLabel: 'Cantidad',
                name: 'cantidadunidadmedida',
                fieldStyle : 'font-size:15px;',
                value : 0,
                flex: 1,
                  labelAlign :'right'
              }
          ]
        },

        {
          xtype:'tabpanel',
          itemId :'tabDetalleProducto',
          height : 500,
          items:[

            {
                title:'..:: Componentes ::..',
                layout:'fit',
                tbar:[
                  { xtype:'button', text: 'nuevo',handler:'onClickAddProducto'},
                  { xtype:'button', text: 'Nuevo Producto',handler:'onClickNuevoProducto'},
                  { xtype:'button', text: 'Refrescar',handler:'onClickRefrescarProducto'},
                ],
                items:[
                    {
                      xtype:'gridpanel',
                      store : _storeDetListaMateriales,
                      itemId : 'dgvDetListaMaterial',
                      selModel: 'rowmodel',
                      sortableColumns: false,
                      plugins: {
                           ptype: 'cellediting',
                           clicksToEdit: 1
                      },
                      columns: [
                          {
                            text: 'Producto',
                            dataIndex: 'producto',
                            flex: 3 ,
                            editor:{
                              xtype:'combo',
                              store:storeProducto,
                              displayField: 'nombre',
                              valueField: 'nombre',
                              queryMode: 'local',
                              editable :true,
                              itemId : 'cboProductoGrid'
                            }
                          },
                          {
                            xtype: 'numbercolumn',
                            text: 'Cantidad',
                            dataIndex: 'cantidad',
                            flex: 1,
                            editor:{
                              xtype:'numberfield',
                              value : 0
                            }
                          },
                          {
                            text : 'Unidad Medida',
                            dataIndex : 'unidadmedida',
                            flex: 1,
                            editor:{
                                xtype:'combo',
                                store: storeUnidadMedida,
                                displayField: 'descripcion',
                                valueField: 'descripcion',
                                queryMode: 'local',
                                editable: false,
                                emptyText: '---- Seleccionar -----',
                            }
                          },

                          {
                            xtype: 'widgetcolumn',
                            flex: 0.5,
                            widget: {
                              xtype: 'button',
                              flex: 1,
                              glyph: 0xf014,
                              handler: 'onClickEliminarProductoMaterial'

                            }

                          }
                      ],
                    }
                ]
            }

          ]

        }






      ];
      return obj;
    }



});
