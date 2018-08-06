Ext.define('sisfacturaelectronica.controller.Menu', {
    extend: 'Ext.app.Controller',
    stores:['Menu'],
    refs:[
      {
        ref:'mainPanel',
        selector:'mainpanel'
      }
    ],
    renderDynamicMenu: function(view, options) {

        var dynamicMenus = [];

        view.body.mask('Loading Menus... Please wait...');

        this.getMenuStore().load(function(records, op, success){

            Ext.each(records, function(root){

                var menu = Ext.create('Packt.view.menu.Tree',{
                    title: translations[root.get('text')],
                    iconCls: root.get('iconCls')
                });

                var treeNodeStore = root.items(),
                    nodes = [],
                    item;

                for (var i=0; i<treeNodeStore.getCount(); i++){
                    item = treeNodeStore.getAt(i);

                   nodes.push({
                        text: translations[item.get('text')],
                        leaf: true,
                        glyph: item.get('iconCls'),
                        id: item.get('id'),
                        className: item.get('className')
                    });
                }

                menu.getRootNode().appendChild(nodes);

                dynamicMenus.push(menu);
            });

            view.add(dynamicMenus);
            view.body.unmask();
        });
    },

    onTreePanelItemClick: function(view, record, item, index, event, options){
      this.redirectTo(record.get('className'));
    },

    init: function(application) {

        this.control({
            "menutree": {
                itemclick: this.onTreePanelItemClick
            },
            "mainmenu": {
                render: this.renderDynamicMenu
            }
        });
    }
});
