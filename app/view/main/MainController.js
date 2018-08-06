Ext.define('sisfacturaelectronica.view.main.MainController', {
  extend: 'Ext.app.ViewController',
  requires: [
    'Ext.window.MessageBox',
    'Ext.tab.Panel',
    'Ext.tree.Panel',
    'sisfacturaelectronica.store.tree.GestionClientes',
    'sisfacturaelectronica.store.tree.ControlAlmacen',
    'sisfacturaelectronica.store.tree.ControlVentas',
    'sisfacturaelectronica.store.tree.Mantenimiento',
    'sisfacturaelectronica.store.tree.ControlUsuarios',
    'sisfacturaelectronica.store.tree.ControlManufactura',
    'sisfacturaelectronica.Global'

  ],
  alias: 'controller.main',
  onExpandPanel: function (pan, obj) {
    /**
     * Expande el panel y Genera un DASHBOARD del Menú
     */

    this.lookupReference('')
    switch (pan.itemId) {
      case "panControlVentas":
        _panel = this.getView().down('tabpanel');
        if (!_panel.getChildByElement(pan.itemId)) {
          _panel.add({
            title: 'Control de Ventas',
            closable: true,
            flex: 1,
            id: pan.itemId
          });

        }
        _panel.setActiveTab(pan.itemId);

        break;
      case "panFinanzas":
        _panel = this.getView().down('tabpanel');
        if (!_panel.getChildByElement(pan.itemId)) {
          _panel.add({
            title: 'Finanzas',
            closable: true,
            flex: 1,
            id: pan.itemId
          });

        }
        _panel.setActiveTab(pan.itemId);

        break;
      case "panRecursosHumanos":
        _panel = this.getView().down('tabpanel');
        if (!_panel.getChildByElement(pan.itemId)) {
          _panel.add({
            title: 'Recursos Humanos',
            closable: true,
            flex: 1,
            id: pan.itemId
          });

        }
        _panel.setActiveTab(pan.itemId);
        break;
      case "panFacturaElectronica":
        _panel = this.getView().down('tabpanel');
        if (!_panel.getChildByElement(pan.itemId)) {
          _panel.add({
            title: 'Factura Electronica',
            closable: true,
            flex: 1,
            id: pan.itemId
          });

        }
        _panel.setActiveTab(pan.itemId);
        break;
      case "panControlAlmacen":
        _panel = this.getView().down('tabpanel');
        if (!_panel.getChildByElement(pan.itemId)) {
          _panel.add({
            title: 'Control Almacen',
            closable: true,
            id: pan.itemId,
            items: [{
              xtype: 'DashBoardCrm'
            }]
          });

        }
        _panel.setActiveTab(pan.itemId);

        break;
      /* case "panMantenimiento":
           _panel = this.getView().down('tabpanel');
           if (!_panel.getChildByElement(pan.itemId)) {
               _panel.add({
                   title: 'Mantenimientos',
                   closable: true,
                   id: pan.itemId,
                   items: [{ xtype: 'DashBoardCrm' }]
               });

           }
           _panel.setActiveTab(pan.itemId);

           break;*/



    }
  },
  init: function () {
    /*_panel = this.getView().down('tabpanel');
    if (!_panel.getChildByElement('panControlAlmacen')) {
        _panel.add({
            title: 'Control Almacen',
            closable: true,
            id: 'panControlAlmacen',
            //layout: 'fit',
            items: [{ xtype: 'DashBoardCrm' }]
        });

    }

    _panel.setActiveTab('panControlAlmacen');
    */
    /* |------ Cargar Menu Dinamico ------| */

    var _ref = this.getReferences();
    var store = Ext.create('sisfacturaelectronica.store.tree.ControlAlmacen');
    _ref.treeControlAlmacen.setStore(store);
    var store = Ext.create('sisfacturaelectronica.store.tree.ControlVentas');
    _ref.treeControlVentas.setStore(store);
    var store = Ext.create('sisfacturaelectronica.store.tree.Mantenimiento');
    _ref.treeMantenimiento.setStore(store);
    var store = Ext.create('sisfacturaelectronica.store.tree.ControlUsuarios');
    _ref.treeControlUsuarios.setStore(store);
    var store = Ext.create('sisfacturaelectronica.store.tree.ControlManufactura');
    _ref.treeControlManufactura.setStore(store);

    Ext.Ajax.request({
      url: sisfacturaelectronica.util.Rutas.empresaDatos,
      success: function (response) {
        ob = Ext.JSON.decode(response.responseText).data[0];
        sisfacturaelectronica.Global.loadData(ob);
        Ext.ComponentQuery.query('#panMenu')[0].setTitle(sisfacturaelectronica.Global.empresa);
      }
    });
    Ext.ComponentQuery.query('#lblusuario')[0].setText('Usuario : ' + sisfacturaelectronica.util.Data.usuario);






  },
  onClickOpcionMenu: function (obj, record, item, index, e, eOpts) {
    _view = record.get("itemId");
    um = sisfacturaelectronica.util.Data.menu;
    ro = sisfacturaelectronica.util.Data.root;
    _tit = record.get("titulo");
    _panel = this.lookupReference('tabPrincipal');  //this.getView().down('tabpanel');
    try {
      if (_tit.length > 0) {
        if (ro == 0) {
          if (um.indexOf(_view) < 0) {
            Ext.Msg.alert("Seguridad", "Su usuario no tiene accesso a este modulo del sistema");
            return false;
          }
        }
        _panel.removeAll();
        if (!_panel.getChildByElement(_view)) {
          _panel.add({
            title: _tit,
            closable: false,
            id: _view,
            layout: 'fit',
            items: [{
              xtype: _view
            }]
          });
        }
      }
    } catch (err) {

      console.info(err);
    }
  },
  onClickSalirApp: function (b) {
    Ext.Msg.confirm('AkinetFarma', 'Esta seguro de salir del sistema?',
      function (e) {
        if (e == 'yes') {
          Ext.util.Cookies.clear();
          window.location = '';
        }
      });
  }


});
