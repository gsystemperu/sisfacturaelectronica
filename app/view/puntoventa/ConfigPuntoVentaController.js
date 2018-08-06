Ext.define('sisfacturaelectronica.view.puntoventa.ConfigPuntoVentaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.confpuntoventa',
    onRender:function( w ){
        Ext.Ajax.request({
            url :sisfacturaelectronica.util.Rutas.confPuntoVenta,
            method : 'POST',
            success:function(response){
                  rs =  Ext.JSON.decode(response.responseText);
                  fs =  Ext.ComponentQuery.query('form')[0];
                  Ext.each(rs.data,function(r){
                    if(r.estitulo!=true){
                          l = new Ext.form.field.Checkbox({
                            boxLabel: r.descripcion,
                            name : r.id,
                            checked : r.valor 
                          });
                          fs.add(l);
                   }else{
                        l = new Ext.form.Label({
                            text: r.descripcion,
                            style: {
                                color: '#bf0000',
                                textAlign: 'left',
                                fontWeight: 'bold',
                                fontSize: '13px',
                            }
                        });
                        fs.add(l);
                   }
                });
            }
        });
    },
    onClickGuardar:function(b){
       /* f= this.lookupReference('wFormConfiguraciones');
        if(f.isValid()){
            f.submit({
                
            });
        }*/
    }

});
