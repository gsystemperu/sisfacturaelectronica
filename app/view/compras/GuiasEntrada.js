Ext.define('sisfacturaelectronica.view.compras.GuiasEntrada', {
  extend: 'Ext.panel.Panel',
  xtype: 'wGuiasEntrada',
  alias: 'widget.wGuiasEntrada',
  requires: [
    'Ext.layout.container.HBox',
    'Ext.container.ButtonGroup',
    'Ext.grid.column.*',
    'Ext.form.field.*',
    'Ext.panel.Panel',
    'sisfacturaelectronica.store.DataTemp',
    'sisfacturaelectronica.view.compras.AccionesGuia',
    'Ext.grid.plugin.*'
  ],
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  bodyPadding: 0,
  defaults: {
    bodyPadding: 0,
    border: false
  },
  controller: 'acciones-guia',

       tbar:
      [{
       xtype: 'button',
       text: 'ACTUALIZAR LISTA',
       handler : 'onClickActualizarListado'
    },
    {
      xtype: 'button',
      text: 'IMPRIMIR',
    }


  ],
  initComponent: function () {
    var storeOrdenCompraConfirmada = Ext.create('sisfacturaelectronica.store.OrdenesCompraConfirmadas');
    var storeProveedores = Ext.create('sisfacturaelectronica.store.Proveedores');
    var storeOrdenCompraConfirmdaDet = Ext.create('sisfacturaelectronica.store.DetalleIngresoGuiaVista');
   

    Ext.apply(this, {
      items: [
        {
          xtype: 'panel',
          flex: 1,
          margin: '0 3 0 0',
          layout: 'fit',
          border: false,
          items: [
            this.getPanelAbastecimiento(storeOrdenCompraConfirmada),
          ],
          tbar: [
            this.getPanelToolBarAbastecimiento(storeProveedores)
          ]
        },
        {
          xtype:'panel',
          title : 'Detalle de Ingresos',
          flex : 1,
          layout:'fit',
          items : this.getPanelDetalle(storeOrdenCompraConfirmdaDet)
        }
        
      ]
    });
    this.callParent();

    /*storeOrdenCompraConfirmada.load({
      params: {
        desde: Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
        hasta: Ext.ComponentQuery.query('#dfHasta')[0].getRawValue(),
        proveedor: 0
      }
    });*/
  },
  getPanelToolBarAbastecimiento: function (storeProveedores) {
    return obj = {
      xtype: 'container',
      bodyPadding: 0,
      layout: {
        type: 'hbox',
        anchor: '100%'
      },
      columnWidth: 10,
      items: [{
          xtype: 'label',
          text: 'Fecha Desde',
          padding: '5px 0 0 0',
          border: false,
          width: 100,
          height: 25,
          style: {
            background: '#6a4b5a',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '13px'
          }
        }, {
          xtype: 'datefield',
          value: new Date(),
          reference: 'dfDesde',
          itemId: 'dfDesde',
          width: 100,
          format: 'd/m/Y'
        }, {
          xtype: 'label',
          text: 'Fecha Hasta',
          padding: '5px 0 0 0',
          border: false,
          width: 100,
          height: 25,
          style: {
            background: '#6a4b5a',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '13px'
          }
        }, {
          xtype: 'datefield',
          value: new Date(),
          reference: 'dfHasta',
          itemId: 'dfHasta',
          width: 100,
          format: 'd/m/Y'
        }, {
          xtype: 'button',
          glyph: sisfacturaelectronica.util.Glyphs.getGlyph(
            'buscar'),
          tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
          handler: 'onClickBuscarOrdenCompraConfirmadasPorFechas'
        }, {
          xtype: 'label',
          text: 'Proveedor',
          padding: '5px 0 0 0',
          border: true,
          width: 100,
          height: 25,
          style: {
            background: '#6a4b5a',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '13px'
          }
        },
        {
          xtype: 'combo',
          store: storeProveedores,
          itemId: 'cboProveedores',
          valueField: 'id',
          displayField: 'razonsocial',
          queryMode: 'local',
          flex: 1,
          width: 400,
          editable: false
        },
         {
          xtype: 'button',
          glyph: sisfacturaelectronica.util.Glyphs.getGlyph(
            'buscar'),
          tooltip: 'Buscar Pedidos Por Proveedor',
          handler: 'onClickBuscarOrdenCompraConfirmadasPorProveedor'
        },
         {
          xtype: 'button',
          glyph: sisfacturaelectronica.util.Glyphs.getGlyph(
            'nuevo'),
          tooltip: 'Formulario de proveedor',
          handler: 'onClickFormularioProveedor',
          control: 'cboProveedores'
        }


      ]
    };

  },
  getPanelAbastecimiento: function (storeAbastecimiento) {
    return obj = {
      xtype: 'grid',
      itemId: 'gridOrdenesCompraConfir',
      reference: 'gridOrdenesCompraConfir',
      store: storeAbastecimiento,
      columnLines: true,
      sortableColumns: false,
      flex: 1,
      requires: [
        'Ext.grid.selection.SpreadsheetModel',
        'Ext.grid.plugin.Clipboard'
      ],
      emptyText: 'NO HAY REGISTROS PARA MOSTRAR SEGUN EL RANGO DE FECHAS',
      columns: [
   {xtype: 'rownumberer'},
        {
          text: 'Fecha Orden',
          dataIndex: 'fordencompra',
          flex: 1,
          align: 'center',
        },
        {
          text: 'Codigo Generado',
          dataIndex: 'occodigo',
          flex: 1
        },
        {
          text: 'Nombre / Razon Social',
          dataIndex: 'razonsocial',
          flex: 4
        },
      /* {
          text: 'Estado',
          dataIndex: 'estado',
          flex: 1,
          renderer:function(value,style){
            if(value == 'OC CONFIRMADO')
                return '<span style="color:red;">'+value+'</span>';
            else
                return '<span style="color:blue;">'+value+'</span>';

              //eddy
          }
       },*/
        {
          xtype:'actioncolumn',
          flex : 1,
          text : 'Estado',
          align: 'center',
          items:[
          {   tooltip :'Guia De Ingreso[ Estado de ingreso ]',
               getClass:function(v,meta,rec){
                   if(rec.get('estado')=='OC CONFIRMADO')
                   {
                     return 'x-mostrar-x-icon-bandera-amarilla';
                   }
                   else
                   {
                     return  'x-mostrar-x-icon-bandera-verde';
                  }

               }
          }]
        },



        {
          xtype: 'widgetcolumn',
          width: 60,
          widget: {
            xtype: 'button',
            width: 60,
            glyph: 0xf014,
             handler: 'onClickEliminarGuiaEntrada'

          }

        }
      ],
       listeners: {
        cellclick: 'onSelectedDetalleIngresosDeOrdenCompra'
      }


    };

  },
  getPanelDetalle: function (storeAbastecimientoDet) {
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

    return obj = 
      {
        xtype: 'grid',
        reference: 'dgvOrdenCompraConfirDetalleVista',
        itemId: 'dgvOrdenCompraConfirDetalleVista',
        store: storeAbastecimientoDet,
        flex : 1,
        columnLines: true,
        sortableColumns: false,
        selModel: 'rowmodel',
          plugins: [rowEditing],
        plugins: {
            ptype: 'cellediting',
            clicksToEdit: 1
        },
        columns: [
          {
            text: 'Fecha Ingreso',
            dataIndex: 'fechaingreso',
            flex: 1,
            align: 'left'
          },
          {
            text: 'Producto',
            dataIndex: 'producto',
            flex: 2,
            align: 'left'
          }, 
          /*{
            xtype:'numbercolumn',
            text: 'Cantidad Solicitada',
            dataIndex: 'cantidadsolicitada',
            flex: 1,
            align: 'right'
          },*/
          {
            text: 'Cant. Recibida',
            dataIndex: 'cantidadrecibida',
            flex: 1,
            align: 'right',
            renderer:function(value,metaData){
                metaData.style="background-color:#30B59B;color:#EEEEEE;fontSize:13px;";
                return value;
            }
          },
          {
              //xtype: 'datecolumn',
              text: 'Vencimiento',
              dataIndex: 'fvencimiento',
              flex: 0.5,
              align: 'center',
              /*format : 'd/m/Y',
              renderer:function(value,metaData){
                  metaData.style="background-color:#30B59B;color:#EEEEEE;font-size:13px;";
                  return Ext.util.Format.date(value,'d/m/Y');
              },*/
              
          },
    
          {
            xtype:'numbercolumn',
            text: 'Precio Unitario Ingreso',
            dataIndex: 'preciorecibido',
            flex: 1,
            align: 'right'
          },
           {
            xtype:'numbercolumn',
            text: 'Total',
            dataIndex: 'totalrecibido',
            flex: 1,
            align: 'right'
          }
        ],
        
      };



    
  }
});
