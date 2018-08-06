Ext.define('sisfacturaelectronica.model.menu.Accordion', {
    extend: 'Ext.data.Model',
    requires: [
       'sisfacturaelectronica.model.menu.TreeNode'
   ],
   fields: [
       { name: 'id', type: 'int'},
       { name: 'text' },
       { name: 'iconCls' }
   ],
   hasMany: {
       model: 'sisfacturaelectronica.model.menu.TreeNode',
       foreignKey: 'parent_id',
       name: 'items'
   }
});
