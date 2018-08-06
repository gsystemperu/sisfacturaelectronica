Ext.define('sisfacturaelectronica.util.Glyphs', {
    singleton: true,
    config: {
        webFont: 'FontAwesome',
        buscar:'xf002',
        fechaDerecha:'xf064',
        fechaIzquierda:'xf112',
        nuevo:'xf055',
        ingresar :'xf0a9',
        guardar:'xf0c7',
        cancelar:'xf112',
        refrescar:'xf021',
        eliminar :'xf014'
        

    },

    constructor: function(config) {
        this.initConfig(config);
    },

    getGlyph : function(glyph) {
        var me = this,
            font = me.getWebFont();
        if (typeof me.config[glyph] === 'undefined') {
            return false;
        }
        return me.config[glyph] + '@' + font;
    }
});
