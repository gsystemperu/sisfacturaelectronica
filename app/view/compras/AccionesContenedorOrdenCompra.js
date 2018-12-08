Ext.define('sisfacturaelectronica.view.compras.AccionesContenedorOrdenCompra', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-contenedoordencompra',
    requires: [
        'sisfacturaelectronica.util.Rutas'
    ],
    onClickIngresar: function () {
        try {
            var me = Ext.ComponentQuery.query('#wContenedorOrdenCompra')[0];    //this;
            var l = me.getLayout();
            l.setActiveItem(1);
            Ext.ComponentQuery.query('#frmOrdenCompra')[0].reset();
            Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore().removeAll();
        } catch (e) {
            console.log('Ingresar Orden Compra');
        }
    },

    onClickConfirmarOrdenCompra: function () {
        g = Ext.ComponentQuery.query('#gridOrdenesCompra')[0];
        r = g.getSelectionModel().getSelection()[0];
        me = this;
        if (r) {
            Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.ordenCompraConfirmar,
                params: {
                    id: r.get('id')
                },
                success: function (response) {
                    _error = Ext.JSON.decode(response.responseText);
                    if (_error.error != 0) {
                        g.getStore().reload();
                        x = Ext.ComponentQuery.query('#wContenedorOrdenCompra')[0];
                        l = x.getLayout();
                        l.setActiveItem(3);
                        Ext.ComponentQuery.query('#dgvOrdenCompraConfirDetalle')[0].mask('..cargando');
                        _store = Ext.ComponentQuery.query('#dgvOrdenCompraConfirDetalle')[0].getStore();
                        _store.removeAll();

                        Ext.Ajax.request({
                            url: sisfacturaelectronica.util.Rutas.OrdenCompraConfirmadaDetalle,
                            params: {
                                id: r.get('id')
                            },
                            success: function (response) {
                                _data = sisfacturaelectronica.util.Util.decodeJSON(response.responseText);
                                _id = 0;
                                Ext.each(_data.data, function (row, i) {
                                    _id = row.idordencompra;
                                    _data = {
                                        'idordencompra': row.idordencompra,
                                        'item': row.item,
                                        'idprod': row.idprod,
                                        'producto': row.producto,
                                        'cantidad': row.cantidad,
                                        'preciocompra': row.preciocompra,
                                        'cantidadrecibida': row.saldo,
                                        'saldo': row.saldo,
                                        // 'numeroguia': row.numeroguia,
                                        'vencimiento': null,
                                        // 'pasestock' : row.pasestock,
                                        'total': row.total,
                                        'genserie': true
                                    };
                                    _store.insert(0, _data);
                                });
                                Ext.ComponentQuery.query('#dgvOrdenCompraConfirDetalle')[0].unmask();
                                Ext.ComponentQuery.query('#idordencompra')[0].setValue(_id);

                            }
                        });
                        Ext.ComponentQuery.query('#txtIdProveedor')[0].setValue(r.get('idprov'));
                        Ext.ComponentQuery.query('#txtNombreProveedor')[0].setValue(r.get('razonsocial'));



                    }
                }
            });
        }
    },

    onClickEnviarOrdenCompra: function (btn) {
        r = Ext.ComponentQuery.query('#gridOrdenesCompra')[0].getSelectionModel().getSelection()[0];
        if (r) {
            Ext.Ajax.request({
                url: sisfacturaelectronica.util.Rutas.cotizacionEnviarMail,
                params: {
                    id: r.get('id')
                },
                success: function (response) {
                    r = JSON.parse(response.responseText);
                    if (r.error) {
                        Ext.toast('Correo enviado el proveedor', 'SisFacturaElectronica', 'br')
                    } else {
                        Ext.toast('No enviado, revise los datos de correo del proveedor', 'SisFacturaElectronica', 'br')
                    }
                }
            });

        }
    },

    onClickImprimirPdfOrdenCompra: function (btn) {
        r = Ext.ComponentQuery.query('#gridOrdenesCompra')[0].getSelectionModel().getSelection()[0];
        if (r) {
            objrpt = window.open(sisfacturaelectronica.util.Rutas.ordenCompraPdf + '?id=' + r.get('id'), "", "width=700,height=900");
            //setTimeout(function(){ objrpt.close(); }, 1000);
        } else {
            Ext.Msg.alert("SisFacturaElectronica", "Seleccionar la orden de compra para imprimir");
            return false;
        }

    },
    onClickActualizarLista: function (b) {
        Ext.ComponentQuery.query('#gridOrdenesCompra')[0].getStore().load();
    }

});
