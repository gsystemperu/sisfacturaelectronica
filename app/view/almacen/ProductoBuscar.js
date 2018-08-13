Ext.define('sisfacturaelectronica.view.almacen.ProductoBuscar', {
    extend: 'Ext.window.Window',
    xtype: 'wRegProductoBuscar',
    alias: 'widget.wRegProductoBuscar',
    itemId:'wRegProductoBuscar',
    requires: [
        'Ext.layout.container.HBox',
        'sisfacturaelectronica.view.compras.AccionesOrdenCompra',
        'Ext.grid.*',
        'Ext.form.field.Number'
    ],
    layout: {
        type: 'fit',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 0,
    defaults: {
        bodyPadding: 0
    },
    config :{
      ventana: ''
    },
    autoShow: true,
    modal: true,
    width: 900,
    height: 500,
    title: '::. Buscar Productos .:: ',
    controller :'acciones-ordencompra',
    initComponent:function(){
        me = this;
        storeProducto  = Ext.create('sisfacturaelectronica.store.Productos');
        storeTipoProd  = Ext.create('sisfacturaelectronica.store.TipoDeProductos');
        Ext.apply(me,{
            items:[
                me.getGrilla(storeProducto,storeTipoProd,me.getVentana())
            ]
        });
        this.callParent();
    },
    getToolBar :function(storeTipoProd){
        return obj ={
            xtype: 'fieldset',
            title: '<b>Buscar Por Codigo</b>',
            layout: 'hbox',
            flex: 1,
            padding: '0 5 10 5',
            defaults: {
              labelWidth: 50
            },
            items: [
              {
                xtype: 'textfield',
                reference: 'txtBuscarCodigoProd',
                itemId: 'txtBuscarCodigoProd',
                fieldLabel: 'Producto',
                flex: 1,
                enableKeyEvents: true,
                listeners:{
                  keyup:'onKeyUpBuscarProducto'
                }
              }, {
                xtype: 'combo',
                reference: 'cboBuscarTipoProducto',
                fieldLabel: 'Tipo',
                store: storeTipoProd,
                queryMode: 'local',
                labelAlign: 'right',
                displayField: 'descripcion',
                valueField: 'id',
                editable: false,
                emptyText: '---- Seleccionar -----',
                flex: 1

              }

            ]


          };
    },
    getGrilla:function(storeProducto,storeTipoProd,ventana){
        me = this;
        return obj =
        {
            xtype: 'grid',
            itemId: 'dgvProductos',
            reference: 'dgvProductos',
            store: storeProducto,
            sortableColumns: false,
            ventana : ventana,
            columns: [

              /*{
                text: 'Codigo Barras',
                dataIndex: 'codigobarras',
                flex: 1,
                align: 'left'
              },*/
              {
                text: 'Nombre',
                dataIndex: 'nombre',
                flex: 3,
                align: 'left'
              },
              {
                xtype :'numbercolumn',
                text: 'Precio Compra General',
                dataIndex: 'preciocompra',
                flex: 1,
                align: 'right'
              },
              {
                xtype :'numbercolumn',
                text: 'Precio Compra Proveedor',
                dataIndex: 'preciocompraproveedor',
                flex: 1,
                align: 'right'
              },
              {
                text: 'Precio Venta',
                dataIndex: 'precioventa',
                flex: 1,
                align: 'right',
                hidden:true
              },
              {
                text: 'Precio Dolares',
                dataIndex: 'preciodolares',
                flex: 1,
                align: 'right',
                hidden:true
              },
              {
                text: 'Precio Fraccion',
                dataIndex: 'precioventafraccion',
                flex: 1,
                align: 'right',
                hidden:true
              }


            ],
            tbar: [
                me.getToolBar(storeTipoProd)
            ],
            listeners: {
              itemclick: 'onClickItemProducto'
            }

          };
    }
});
