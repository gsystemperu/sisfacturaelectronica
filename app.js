Ext.setGlyphFontFamily('FontAwesome');
Ext.require('sisfacturaelectronica.util.Glyphs');
Ext.require('sisfacturaelectronica.Global');
Ext.require('sisfacturaelectronica.util.Data');
/*Ext.Loader.setConfig({
  enabled:true,
  paths:{
      'gsperu':'./util'
  }
});*/
Ext.application(
{
    name: 'sisfacturaelectronica',
    extend: 'sisfacturaelectronica.Application'

});
