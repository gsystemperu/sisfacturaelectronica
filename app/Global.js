Ext.define('sisfacturaelectronica.Global', {
    singleton: true,
    loadData:function(data){
        this.empresa = data.razonsocial;
        this.ruc = data.ruc;
        this.correo = data.correo;
    },
    empresa : '',
    ruc : '',
    correo :'',
    usuario : 'eerazo',
    idticketera:0,
    accesos :[]
    
});

