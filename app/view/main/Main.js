Ext.define('sisfacturaelectronica.view.main.Main', {
  extend: 'Ext.container.Viewport',
  layout: 'border',
  alias: 'wMain',
  requires: [
    'sisfacturaelectronica.view.main.MainController',
    'sisfacturaelectronica.view.menu.Tree'
  ],
  controller: 'main',
  initComponent: function () {
    this.callParent();;
  },
  items: [
    {
      region: 'west',
      collapsible: true,
      titleCollapse: false,
      collapsed: false,
      itemId: 'panMenu',
      titleAlign: 'center',
      width: 230,
      layout: {
        type: 'accordion',
        titleCollapse: true,
        animate: true,
        activeOnTop: false,
        fill: false
      },
      defaults: {
        titleAlign: 'center'
      },
      bbar:[
        {
          xtype:'label',
          itemId : 'lblusuario',
          style: {
            color: 'red',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '13px'
          }
        },
        '->',
        {
          iconCls : 'fa fa-plug fa-1x',
          tooltip : 'SALIR DE LA APLICACIÓN ',
          handler:'onClickSalirApp'
        }
      ],
      plugins: 'responsive',
      responsiveConfig: {
        'width < 768 && tall': {
          region: 'south',
        },
        'width >= 768': {
          region: 'west'
        }
      },
      items: [
        {
          title: 'Configuraciones',
          itemId: 'panMantenimiento',
          iconCls: 'fa fa-gear fa-2x',

          bodyPadding: 0,
          items: [{
            xtype: 'menutree',
            reference: 'treeMantenimiento', //'treeGestionClientes',
            layout: 'fit',
            rootVisible: true,
            listeners: {
              itemClick: 'onClickOpcionMenu'
            }
          }]


        }, {
          title: 'Control de Almacen',
          itemId: 'panControlAlmacen', //'panGestionCliente',
          iconCls: 'fa fa-dropbox fa-2x',
          bodyPadding: 0,
          items: [{
            xtype: 'menutree',
            reference: 'treeControlAlmacen', //'treeGestionClientes',
            layout: 'fit',
            rootVisible: true,
            listeners: {
              itemClick: 'onClickOpcionMenu'
            }
          }]


        },
        {
          title: 'Control de Ventas',
          itemId: 'panControlVentas',
          iconCls: 'fa fa-gift fa-2x',
          //listeners: [{ expand: 'onExpandPanel' }],
          items: [{
            xtype: 'menutree',
            reference: 'treeControlVentas',
            layout: 'fit',
            rootVisible: true,
            listeners: {
              itemClick: 'onClickOpcionMenu'
            }
          }]

        },
        {
          title: 'Manufactura (MRP)',
          itemId: 'panControlMRP',
          iconCls: 'fa fa-university',
          hidden: true,
          //listeners: [{ expand: 'onExpandPanel' }],
          items: [{
            xtype: 'menutree',
            reference: 'treeControlManufactura',
            layout: 'fit',
            rootVisible: true,
            listeners: {
              itemClick: 'onClickOpcionMenu'
            }
          }]

        }, {
          title: 'Control Personal',
          itemId: 'panPersonal',
          iconCls: 'fa fa-users fa-2x',
          //listeners: [{ expand: 'onExpandPanel' }],
          html: 'Panel content!',
          hidden: true,
        }, {
          title: 'Control de Usuarios',
          itemId: 'panControlUsuarios',
          iconCls: 'fa fa-key fa-2x',
          //listeners: [{ expand: 'onExpandPanel' }],
          items: [{
            xtype: 'menutree',
            reference: 'treeControlUsuarios',
            layout: 'fit',
            rootVisible: false,
            useArrows: true,
            listeners: {
              itemClick: 'onClickOpcionMenu'
            }
          }]
        },
        {
          title: 'Soporte',
          itemId: 'panAcercaDe',
          iconCls: 'fa fa-cube fa-2x',
          //listeners: [{ expand: 'onExpandPanel' }],
          layout: 'vbox',
          bodyPadding: 5,
          items: [
            {
              xtype: 'image',
              //src: 'resources/images/lgsis.png',
              width: 100,
              height: 30,
              hidden:false

            },
            {
              xtype: 'label',
              text: 'Sr. : Cesar Leyva'
            },
            {
              xtype: 'label',
              text: 'Telefono : 992 913 895 / 999 874 314'
            },
            {
              xtype: 'label',
              text: 'Ing. : Eddy Erazo'
            },
            {
              xtype: 'label',
              text: 'Telefono : 925 183 347'
            }
           

          ]
        },

      ]

    }, {
      region: 'center',
      padding: 5,
      reference: 'tabPrincipal',
      itemId: 'tabPrincipal',
      defaults: { bodyPadding: 0 },
      scrollable: true,
      layout: 'fit',
      items: [
        {
          title: 'Nosotros',
          bodyPadding: 200,
          //layout:'fit',
          layout: 'vbox',
          items: [
            {
              xtype: 'image',
             // src: 'resources/images/lgsis.png',
              width: 300,
              height: 80,
              hidden: false

            },
            {
              xtype: 'label',
              text: '       Asesoria en tecnologíca para tu negocio       '
            },
             {
              xtype: 'label',
              text: 'Sr. : Cesar Leyva'
            },
            {
              xtype: 'label',
              text: 'Telefono : 992 913 895 / 999 874 314'
            },
            {
              xtype: 'label',
              text: 'Ing. : Eddy Erazo'
            },
            {
              xtype: 'label',
              text: 'Telefono : 925 183 347'
            }
          ]
        }]
    }
  ]

});
