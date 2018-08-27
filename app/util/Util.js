Ext.define('sisfacturaelectronica.util.Util', {

    requires: [
        'Ext.window.Toast',
        'Ext.util.TaskRunner'
    ],

    statics: {

        required: '<span style="color:red;font-weight:bold" data-qtip="Required"> *</span>',

        decodeJSON: function (text) {

            var result = Ext.JSON.decode(text, true);

            if (!result) {
                result = {};
                result.success = false;
                result.msg = text;
            }

            return result;
        },

        showErrorMsg: function (text) {

            Ext.Msg.show({
                title: 'Error!',
                msg: text,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        },


        handleFormFailure: function (action) {

            var me = this,
                result = Packt.util.Util.decodeJSON(action.response.responseText);

            switch (action.failureType) {
                case Ext.form.action.Action.CLIENT_INVALID:
                    me.showErrorMsg('Form fields may not be submitted with invalid values');
                    break;
                case Ext.form.action.Action.CONNECT_FAILURE:
                    me.showErrorMsg(action.response.responseText);
                    break;
                case Ext.form.action.Action.SERVER_INVALID:
                    me.showErrorMsg(result.msg);
            }
        },

        showToast: function (text) {
            Ext.toast({
                html: text,
                closable: false,
                align: 't',
                slideInDuration: 400,
                minWidth: 400
            });
        },
        crearWindowOpenMantenimiento: function (__titulo, __ancho, __largo, __objeto_actualizar, __formulario, __tienda) {
            __ventana = Ext.create('Ext.window.Window', {
                title: __titulo,
                width: __largo,
                height: __ancho,
                autoShow: true,
                modal: true,
                objeto: __objeto_actualizar,
                tienda: __tienda,
                layout: 'fit',
                items: [
                    { xtype: __formulario }
                ]
            });

        },
        timerRefreshDataGrid: function (ng, tm) {

        },
        ajax: function (url, data, grid) {
            Ext.Ajax.request({
                url: url,
                params: data,
                success: function (response) {
                    e = Ext.JSON.decode(response.responseText);
                    if (e.error != 0) {
                        if (grid != null)
                            grid.reload();
                        Ext.toast("Guardado con existo", 'AkinetFarm', "br");
                    }
                }
            });
        },
        hexToBase64: function (file) {

            reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = function (event) {
                var binaryString = '',
                    bytes = new Uint8Array(event.target.result),
                    length = bytes.byteLength,
                    i,
                    base64String;

                for (i = 0; i < length; i++) {
                    binaryString += String.fromCharCode(bytes[i]);
                }
                base64String = btoa(binaryString);
                return "data:image/jpeg;base64," + base64String;
            }

        },
        focusControl: function (obj) {
            Ext.ComponentQuery.query('#' + obj.toString())[0].focus(false, 100);
        },
        redireccionarPanel: function (view, titulo) {
            _view = view;
            um = sisfacturaelectronica.util.Data.menu;
            ro = sisfacturaelectronica.util.Data.root;
            _tit = titulo;
            _panel = Ext.ComponentQuery.query('#tabPrincipal')[0];
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
        }
    }
});

