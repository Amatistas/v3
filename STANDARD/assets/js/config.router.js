"use strict";

/**
 * Config for the router
 */
function sessionVerificacion() {
    if (sessionStorage.length == 0) {
        location.href = "#!/login/iniciar"
    }
}

app.config([
    "$stateProvider",
    "$urlRouterProvider",
    "$controllerProvider",
    "$compileProvider",
    "$filterProvider",
    "$provide",
    "$ocLazyLoadProvider",
    "JS_REQUIRES",

    function(
        $stateProvider,
        $urlRouterProvider,
        $controllerProvider,
        $compileProvider,
        $filterProvider,
        $provide,
        $ocLazyLoadProvider,
        jsRequires
    ) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;

        // LAZY MODULES
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: jsRequires.modules,
        });


        app.run(function($rootScope, $location, $state, LoginService) {
            console.clear();
            console.log('running');
            alert()
            if (!LoginService.isAuthenticated()) {
                $state.transitionTo('login');
            }
        });


        // APPLICATION ROUTES
        // -----------------------------------
        // For any unmatched url, redirect to /app/dashboard
        $urlRouterProvider.otherwise("/app/dashboard");
        //
        // Set up the states
        $stateProvider
            .state("app", {
                url: "/app",
                templateUrl: "STANDARD/assets/views/app.html",
                resolve: loadSequence(
                    "modernizr",
                    "moment",
                    "angularMoment",
                    "uiSwitch",
                    "perfect-scrollbar-plugin",
                    "toaster",
                    "ngAside",
                    "vAccordion",
                    "sweet-alert",
                    "chartjs",
                    "tc.chartjs",
                    "oitozero.ngSweetAlert",
                    "chatCtrl",
                    "truncate",
                    "htmlToPlaintext",
                    "angular-notification-icons"
                ),
                abstract: true,
            })
            .state("app.dashboard", {
                url: "/dashboard",
                templateUrl: "STANDARD/assets/views/dashboard.html",
                resolve: loadSequence("jquery-sparkline", "dashboardCtrl", sessionVerificacion),
                title: "Dashboard",
                ncyBreadcrumb: {
                    label: "Dashboard",
                },

            })
            .state("app.ui", {
                url: "/ui",
                template: '<div ui-view class="fade-in-up"></div>',
                title: "UI Elements",
                ncyBreadcrumb: {
                    label: "UI Elements",
                },
            })
            /////////////////////////////////////////////////
            /////////////////////////////////////////////////
            ///////////////////////// Mis Rutas /////////////
            /////////////////////////////////////////////////
            /////////////////////////////////////////////////
            .state("app.compras", {
                url: "/compras",
                template: '<div ui-view class="fade-in-up"></div>',
                title: "Compras",
                ncyBreadcrumb: {
                    label: "Compras",
                },
            })
            .state("app.compras.listaCompras", {
                url: "/lista",
                templateUrl: "STANDARD/assets/sistem-views/compras/compras-lista.html",
                title: "Lista de Compras",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Lista de Compras",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    "vAccordionCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.compras.listaCompraspagar", {
                url: "/compraporpagar",
                templateUrl: "STANDARD/assets/sistem-views/finanzas/lista-compras-por-pagar.html",
                title: "Compras por Pagar",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Compras por Pagar",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    "vAccordionCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.compras.listaVentasscobrar", {
                url: "/ventasporcobrar",
                templateUrl: "STANDARD/assets/sistem-views/finanzas/lista-ventas-por-cobrar.html",
                title: "Ventas por Cobrar",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Ventas por Cobrar",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    "vAccordionCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.compras.fomCompras", {
                url: "/formulario-compra",
                controller: 'AsideModalTransaccionCtrl',
                template: `<div ng-controller="comprasCtrl"></div>`,
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    "modalesConRutasCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.compras.proveedores", {
                url: "/proveedores",
                templateUrl: "STANDARD/assets/sistem-views/compras/proveedores.html",
                title: "Proveedores",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Proveedores",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    "sweetAlertCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.ventas", {
                url: "/ventas",
                template: '<div ui-view class="fade-in-up"></div>',
                title: "Ventas",
                ncyBreadcrumb: {
                    label: "Ventas",
                },
            })
            .state("app.ventas.todaslasventas", {
                url: "/lista-ventas",
                templateUrl: "STANDARD/assets/sistem-views/ventas/ventas-listas.html",
                title: "Lista de Ventas",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Lista de Ventas",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    "sweetAlertCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.ventas.fomVentas", {
                url: "/formulario-ventas",
                controller: 'AsideModalTransaccionCtrl',
                template: `<div ng-controller="ventasCtrl"></div>`,
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    "modalesConRutasCtrl",
                    sessionVerificacion
                ),
            })            
 .state("app.ventas.ventadetalle", {
    url: "/venta-detalle/{idventa}/",
    templateUrl: 'STANDARD/assets/sistem-views/ventas/venta-detalle.html',
    resolve: loadSequence(
        "ui.select",
        "selectCtrl",
        "ngTable",
        "ngTableCtrl",
        "dynamicTableCtrl",
        "toasterCtrl",
        "asideCtrl",
        sessionVerificacion,
    )
})
            .state("app.ventas.clientes", {
                url: "/clientes",
                templateUrl: "STANDARD/assets/sistem-views/ventas/clientes.html",
                title: "clientes",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "clientes",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.punto", {
                url: "/ventas",
                template: '<div ui-view class="fade-in-up"></div>',
                title: "Ventas",
                ncyBreadcrumb: {
                    label: "Ventas",
                },
            })
            .state("app.punto.puntoventa", {
                url: "/punto-venta",
                templateUrl: "STANDARD/assets/sistem-views/ventas/registro-formulario-punto-venta.html",
                title: "Punto de Venta",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Punto de Venta",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    "sweetAlertCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.punto.cajapuntoventa", {
                url: "/caja",
                templateUrl: "STANDARD/assets/sistem-views/ventas/caja.html",
                title: "Caja",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Caja",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    "sweetAlertCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.listas", {
                url: "/todas-las-listas",
                templateUrl: "STANDARD/assets/sistem-views/listas/listas.html",
                title: "Todas las listas",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Todas las Listas",
                },
                resolve: loadSequence(
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.ajustes", {
                url: "/ajuste",
                template: '<div ui-view class="fade-in-up"></div>',
                title: "ajuste",
                ncyBreadcrumb: {
                    label: "ajuste",
                },
            })
            .state("app.ajustes.cuenta", {
                url: "/ajuste-cuenta",
                templateUrl: "STANDARD/assets/sistem-views/cuenta-ajustes/cuenta-ajustes.html",
                title: "Ajuste cuenta",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Ajuste cuenta",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.ajustes.cuentasujeto", {
                url: "/ajuste-cuenta",
                templateUrl: "STANDARD/assets/sistem-views/cuenta-ajustes/usuariosujeto.html",
                title: "Ajuste cuenta",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Ajuste cuenta",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.ajustes.confisunat", {
                url: "/configuracion-sunat",
                templateUrl: "STANDARD/assets/sistem-views/cuenta-ajustes/configuracion-sunat_def.html",
                title: "Configuracion Sunat",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Configuracion Sunat",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.ajustes.compraCuenta", {
                url: "/compra-ajuste",
                templateUrl: "STANDARD/assets/sistem-views/cuenta-ajustes/compra-ajustes.html",
                title: "Compra Ajustes",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Compra Ajustes",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.ajustes.ventaCuenta", {
                url: "/venta-ajuste",
                templateUrl: "STANDARD/assets/sistem-views/cuenta-ajustes/venta-ajustes.html",
                title: "Venta Ajustes",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Venta Ajustes",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            /*     .state("app.ajuste", {
                        template: "<div>Ajuste</div>",
                        title: "Ajustes",
                        resolve: loadSequence(
                            sessionVerificacion
                        ),
                    })
                    .state("app.ajuste.cuentaAjustes", {
                        url: "/cuenta-ajustes",
                        templateUrl: "STANDARD/assets/sistem-views/cuenta-ajustes/cuenta-ajustes.html",
                        title: "Cuentas y Ajustes",
                        icon: "ti-layout-media-left-alt",
                        ncyBreadcrumb: {
                            label: "Cuentas y Ajustes",
                        },
                        resolve: loadSequence(
                            sessionVerificacion
                        ),
                    })
                    .state("app.ajuste.compraAjuste", {
                        url: "/compra-ajustes",
                        templateUrl: "STANDARD/assets/sistem-views/cuenta-ajustes/compra-ajustes.html",
                        title: "Ajustes de Compras",
                        icon: "ti-layout-media-left-alt",
                        ncyBreadcrumb: {
                            label: "Ajustes de Compras",
                        },
                        resolve: loadSequence(
                            sessionVerificacion
                        ),
                    }) */
            .state("app.inventario", {
                url: "/inventario",
                template: '<div ui-view class="fade-in-up"></div>',
                title: "Inventario",
                ncyBreadcrumb: {
                    label: "Inventario",
                },
                resolve: loadSequence(
                    sessionVerificacion
                )
            })
            .state("app.inventario.productoyservicios", {
                url: "/producto-y-servicios",
                templateUrl: "STANDARD/assets/sistem-views/inventarios/inventario.html",
                title: "Productos y Servicios",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Productos y Servicios",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl",
                    "sweetAlertCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.inventario.listaprecios", {
                url: "/lista-precios",
                templateUrl: "STANDARD/assets/sistem-views/inventarios/listaprecios.html",
                title: "Lista de Precios",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Lista de Precios",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    "sweetAlertCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.inventario.stock", {
                url: "/stock",
                templateUrl: "STANDARD/assets/sistem-views/inventarios/almacen.html",
                title: "Stock",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Stock",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.inventario.movimientoAlamcen", {
                url: "/movimiento-almacen",
                templateUrl: "STANDARD/assets/sistem-views/inventarios/movimiento-almacen.html",
                title: "Almacén",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Almacén",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.inventario.traslado", {
                url: "/traslado",
                templateUrl: "STANDARD/assets/sistem-views/inventarios/vista-traslado.html",
                title: "traslado",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "traslado",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.contabilidad", {
                url: "/contabilidad",
                template: '<div ui-view class="fade-in-up"></div>',
                title: "Contabilidad",
                ncyBreadcrumb: {
                    label: "Contabilidad",
                },
                resolve: loadSequence(
                    sessionVerificacion
                )
            })
            .state("app.contabilidad.asientos", {
                url: "/asientos",
                templateUrl: "STANDARD/assets/sistem-views/listas/contabilidad/asientos.html",
                title: "asientos",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Asientos",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.contabilidad.libroelectronico", {
                url: "/libroelectronico",
                templateUrl: "STANDARD/assets/sistem-views/listas/contabilidad/libro-electronico.html",
                title: "LibroElectronico",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Libros Electrónicos",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.finanzas", {
                url: "/finanzas",
                template: '<div ui-view class="fade-in-up"></div>',
                title: "Finanzas",
                ncyBreadcrumb: {
                    label: "Finanzas",
                },
                resolve: loadSequence(
                    sessionVerificacion
                )
            })
            .state("app.finanzas.bancos", {
                url: "/bancos",
                templateUrl: "STANDARD/assets/sistem-views/listas/finanzas/bancos.html",
                title: "asientos",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Plantilla de Asientos",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.finanzas.cuentaCobrar", {
                url: "/cuentas-cobrar",
                templateUrl: "STANDARD/assets/sistem-views/finanzas/cuenta-cobrar.html",
                title: "Cuentas por Cobrar",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Cuentas por Cobrar",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.finanzas.cuentaPagar", {
                url: "/cuentas-pagar",
                templateUrl: "STANDARD/assets/sistem-views/finanzas/cuenta-pagar.html",
                title: "Cuentas por Pagar",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Cuentas por Pagar",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
          
            .state("app.finanzas.cuentadebancos", {
                url: "/cuenta-de-bancos",
                templateUrl: "STANDARD/assets/sistem-views/listas/finanzas/cta_bancos.html",
                title: "Cuenta de Bancos",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Cuenta de Bancos",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.finanzas.tipocuentas", {
                url: "/tipo-de-cuentas",
                templateUrl: "STANDARD/assets/sistem-views/listas/finanzas/tpo_cta_bancaria.html",
                title: "Cuenta de Bancos",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Tipo de Cuentas",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            /////////////////////////////////////////////////
            /////////////////////////////////////////////////
            /////////////////////////Mis Rutas///////////////
            /////////////////////////////////////////////////
            /////////////////////////////////////////////////

        /////////////////////////////////////////////////
        /////////////////////////////////////////////////
        /////////////////////////Jose Rutas///////////////
        /////////////////////////////////////////////////
        /////////////////////////////////////////////////
        .state("app.local", {
                url: "/local",
                templateUrl: "STANDARD/assets/sistem-views/listas/empresa/local.html",
                title: "Local",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Local",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.tpo_doc", {
                url: "/tpo_doc",
                templateUrl: "STANDARD/assets/sistem-views/listas/empresa/tpo_doc.html",
                title: "Tipo de Documento",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Tipo de Documento",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.tpo_soc", {
                url: "/tpo_soc",
                templateUrl: "STANDARD/assets/sistem-views/listas/empresa/tpo_soc.html",
                title: "Tipo de Socio",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Tipo de Socio",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.tpo_suj", {
                url: "/tpo_suj",
                templateUrl: "STANDARD/assets/sistem-views/listas/empresa/tpo_suj.html",
                title: "Tipo de Sujeto",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Tipo de Sujeto",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl",
                    sessionVerificacion
                ),
            })
            .state("app.areas", {
                url: "/areas",
                templateUrl: "STANDARD/assets/sistem-views/listas/empresa/areas.html",
                title: "Areas",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Areas",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.categorias", {
                url: "/categorias",
                templateUrl: "STANDARD/assets/sistem-views/listas/personal/categorias.html",
                title: "Categorias",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Categorias",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.tpo_hrs", {
                url: "/tpo_hrs",
                templateUrl: "STANDARD/assets/sistem-views/listas/personal/tpo_hrs.html",
                title: "Tipo de Horarios",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Tipo de Horarios",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.rgmn_laboral", {
                url: "/rgmn_laboral",
                templateUrl: "STANDARD/assets/sistem-views/listas/personal/rgmn_laboral.html",
                title: "Regimén Laboral",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Regimén Laboral",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.conceptos", {
                url: "/conceptos",
                templateUrl: "STANDARD/assets/sistem-views/listas/personal/conceptos.html",
                title: "Conceptos",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Conceptos",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.mtvs_baja", {
                url: "/mtvs_baja",
                templateUrl: "STANDARD/assets/sistem-views/listas/personal/mtvs_baja.html",
                title: "Motivos de Baja",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Motivos de Baja",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.tpo_trbjadores", {
                url: "/tpo_trbjadores",
                templateUrl: "STANDARD/assets/sistem-views/listas/personal/tpo_trbjadores.html",
                title: "Tipo de Trabajadores",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Tipo de Trabajadores"
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.ctg_ocupacional", {
                url: "/ctg_ocupacional",
                templateUrl: "STANDARD/assets/sistem-views/listas/personal/ctg_ocupacional.html",
                title: "Categoria Ocupacional",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Categoria Ocupacional",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.ocupaciones", {
                url: "/ocupaciones",
                templateUrl: "STANDARD/assets/sistem-views/listas/personal/ocupaciones.html",
                title: "Ocupaciones",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Ocupaciones",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.tpo_pagos", {
                url: "/tpo_pagos",
                templateUrl: "STANDARD/assets/sistem-views/listas/personal/tpo_pagos.html",
                title: "Tipo de Pagos",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Tipo de Pagos",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.stcion_educ", {
                url: "/stcion_educ",
                templateUrl: "STANDARD/assets/sistem-views/listas/personal/stcion_educ.html",
                title: "Situación Educativa",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Situación Educativa",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.beneficios", {
                url: "/beneficios",
                templateUrl: "STANDARD/assets/sistem-views/listas/personal/beneficios.html",
                title: "Beneficios",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Beneficios",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.tpo_contratos", {
                url: "/tpo_contratos",
                templateUrl: "STANDARD/assets/sistem-views/listas/personal/tpo_contratos.html",
                title: "Tipo de Contratos",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Tipo de Contratos",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.almacen", {
                url: "/almacen",
                templateUrl: "STANDARD/assets/sistem-views/listas/almacen/almacen.html",
                title: "Almacen",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Almacen",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.linea", {
                url: "/linea",
                templateUrl: "STANDARD/assets/sistem-views/listas/almacen/linea.html",
                title: "Línea",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Línea",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.categoria", {
                url: "/categoria",
                templateUrl: "STANDARD/assets/sistem-views/listas/almacen/categoria.html",
                title: "Categoría",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Categoría",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.sub_categoria", {
                url: "/sub_categoria",
                templateUrl: "STANDARD/assets/sistem-views/listas/almacen/sub_categoria.html",
                title: "Sub Categoría",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Sub Categoría",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.marcas", {
                url: "/marcas",
                templateUrl: "STANDARD/assets/sistem-views/listas/almacen/marcas.html",
                title: "Marcas",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Marcas",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.aplicaciones", {
                url: "/aplicaciones",
                templateUrl: "STANDARD/assets/sistem-views/listas/almacen/aplicaciones.html",
                title: "Aplicaciones",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Aplicaciones",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.presentacion", {
                url: "/presentacion",
                templateUrl: "STANDARD/assets/sistem-views/listas/almacen/presentacion.html",
                title: "Presentación",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Presentación",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.choferes", {
                url: "/choferes",
                templateUrl: "STANDARD/assets/sistem-views/listas/almacen/choferes.html",
                title: "Choferes",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Choferes",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.vehiculos", {
                url: "/vehiculos",
                templateUrl: "STANDARD/assets/sistem-views/listas/almacen/vehiculos.html",
                title: "Vehículos",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Vehículos",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.saldo-inicial", {
                url: "/saldoinicial",
                templateUrl: "STANDARD/assets/sistem-views/listas/almacen/carga-saldo-inicial.html",
                title: "Saldos Iniciales",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Saldos Iniciales",
                },
                resolve: loadSequence(

                    "ui.select",
                    "selectCtrl",
                    "vAccordionCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.bancos", {
                url: "/bancos",
                templateUrl: "STANDARD/assets/sistem-views/listas/finanzas/bancos.html",
                title: "Bancos",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Bancos",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.cta_bancos", {
                url: "/cta_bancos",
                templateUrl: "STANDARD/assets/sistem-views/listas/finanzas/cta_bancos.html",
                title: "Cuentas de Bancos",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Cuentas de Bancos",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.tpo_cta_bancaria", {
                url: "/tpo_cta_bancaria",
                templateUrl: "STANDARD/assets/sistem-views/listas/finanzas/tpo_cta_bancaria.html",
                title: "Tipos de Cuenta Bancaria",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Tipos de Cuenta Bancaria",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.mtdo_pago", {
                url: "/mtdo_pago",
                templateUrl: "STANDARD/assets/sistem-views/listas/finanzas/mtdo_pago.html",
                title: "Metodo de Pago",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Metodo de Pago",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.sist_pensiones", {
                url: "/sist_pensiones",
                templateUrl: "STANDARD/assets/sistem-views/listas/personal/sist_pensiones.html",
                title: "Sistemas de Pensiones",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Sistemas de Pensiones",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.otras_aportaciones", {
                url: "/aports_desc",
                templateUrl: "STANDARD/assets/sistem-views/listas/personal/otras_aportaciones.html",
                title: "Otras aportaciones y descuentos",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Otras aportaciones y descuentos",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.prcent_aports", {
                url: "/prcent_aports",
                templateUrl: "STANDARD/assets/sistem-views/listas/personal/prcent_aports.html",
                title: "Porcentajes de Aportaciones",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Porcentajes de Aportaciones",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.ptilla_asientos", {
                url: "/ptilla_asientos",
                templateUrl: "STANDARD/assets/sistem-views/listas/contabilidad/ptilla_asientos.html",
                title: "Plantilla de Asientos",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Plantilla de Asientos",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.prmtrs_detraccion", {
                url: "/prmtrs_detraccion",
                templateUrl: "STANDARD/assets/sistem-views/listas/contabilidad/prmtrs_detraccion.html",
                title: "Parámetros de Detracción",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Parámetros de Detracción",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.tpo_cambio", {
                url: "/tpo_cambio",
                templateUrl: "STANDARD/assets/sistem-views/listas/contabilidad/tpo_cambio.html",
                title: "Tipos de Cambio",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Tipos de Cambio",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.ctro_costo", {
                url: "/ctro_costo",
                templateUrl: "STANDARD/assets/sistem-views/listas/contabilidad/ctro_costo.html",
                title: "Centro de Costos",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Centro de Costos",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.parametros", {
                url: "/parametros",
                templateUrl: "STANDARD/assets/sistem-views/listas/contabilidad/parametros.html",
                title: "Crear Parámetros",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Crear Parámetros",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.saldo_ini_fina", {
                url: "/saldo-inicial-finanzas",
                templateUrl: "STANDARD/assets/sistem-views/listas/finanzas/saldo-inicial-finanza.html",
                title: "Saldo Inicial Finanzas",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Saldo Inicial Finanzas",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "vAccordionCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.maestro", {
                url: "/maestro",
                templateUrl: "STANDARD/assets/sistem-views/listas/contabilidad/maestro.html",
                title: "Maestro",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Maestro",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.maestro-cse_cta", {
                url: "/maestro-cse_cta",
                templateUrl: "STANDARD/assets/sistem-views/listas/contabilidad/maestro-cse_cta.html",
                title: "Clases de Cuenta",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Clases de Cuenta",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.maestro-nvl_cta", {
                url: "/maestro-nvl_cta",
                templateUrl: "STANDARD/assets/sistem-views/listas/contabilidad/maestro-nvl_cta.html",
                title: "Nivel de Cuentas",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Nivel de Cuentas",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.maestro-pln_cta", {
                url: "/maestro-pln_cta",
                templateUrl: "STANDARD/assets/sistem-views/listas/contabilidad/maestro-pln_cta.html",
                title: "Plan de Cuentas",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Plan de Cuentas",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.maestro-tpo_asiento", {
                url: "/maestro-tpo_asiento",
                templateUrl: "STANDARD/assets/sistem-views/listas/contabilidad/maestro-tpo_asiento.html",
                title: "Tipos de Asiento",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Tipos de Asiento",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.sist_salud", {
                url: "/sist_salud",
                templateUrl: "STANDARD/assets/sistem-views/listas/personal/sist_salud.html",
                title: "Sistema de Salud",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Sistema de Salud",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.lna_produccion", {
                url: "/lna_produccion",
                templateUrl: "STANDARD/assets/sistem-views/listas/produccion/lna_produccion.html",
                title: "Linea de Produccion",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Linea de Produccion",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })
            .state("app.lte_produccion", {
                url: "/lte_produccion",
                templateUrl: "STANDARD/assets/sistem-views/listas/produccion/lte_produccion.html",
                title: "Lote de Produccion",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Lote de Produccion",
                },
                resolve: loadSequence(
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl", sessionVerificacion
                ),
            })


            .state("app.informes", {
                url: "/informes",
                template: '<div ui-view class="fade-in-up"></div>',
                title: "Informes",
                ncyBreadcrumb: {
                    label: "Informes",
                },
            })
            .state("app.informes.informe", {
                url: "/informe",
                templateUrl: "STANDARD/assets/sistem-views/informe/informes.html",
                title: "Informe",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Informe",
                },
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    "vAccordionCtrl",
                    sessionVerificacion
                ),
            })

        ///////////////////////////////////////////////////
        /////////////////////////////////////////////////
        /////////////////////////Jose Rutas///////////////
        /////////////////////////////////////////////////
        /////////////////////////////////////////////////
        .state("app.ui.elements", {
                url: "/elements",
                templateUrl: "STANDARD/assets/views/ui_elements.html",
                title: "Elements",
                icon: "ti-layout-media-left-alt",
                ncyBreadcrumb: {
                    label: "Elements",
                },
            })
            .state("app.ui.buttons", {
                url: "/buttons",
                templateUrl: "STANDARD/assets/views/ui_buttons.html",
                title: "Buttons",
                resolve: loadSequence("spin", "ladda", "angular-ladda", "laddaCtrl"),
                ncyBreadcrumb: {
                    label: "Buttons",
                },
            })
            .state("app.ui.links", {
                url: "/links",
                templateUrl: "STANDARD/assets/views/ui_links.html",
                title: "Link Effects",
                ncyBreadcrumb: {
                    label: "Link Effects",
                },
            })
            .state("app.ui.icons", {
                url: "/icons",
                templateUrl: "STANDARD/assets/views/ui_icons.html",
                title: "Font Awesome Icons",
                ncyBreadcrumb: {
                    label: "Font Awesome Icons",
                },
                resolve: loadSequence("iconsCtrl"),
            })
            .state("app.ui.lineicons", {
                url: "/line-icons",
                templateUrl: "STANDARD/assets/views/ui_line_icons.html",
                title: "Linear Icons",
                ncyBreadcrumb: {
                    label: "Linear Icons",
                },
                resolve: loadSequence("iconsCtrl"),
            })
            .state("app.ui.modals", {
                url: "/modals",
                templateUrl: "STANDARD/assets/views/ui_modals.html",
                title: "Modals",
                ncyBreadcrumb: {
                    label: "Modals",
                },
                resolve: loadSequence("asideCtrl"),
            })
            .state("app.ui.toggle", {
                url: "/toggle",
                templateUrl: "STANDARD/assets/views/ui_toggle.html",
                title: "Toggle",
                ncyBreadcrumb: {
                    label: "Toggle",
                },
            })
            .state("app.ui.tabs_accordions", {
                url: "/accordions",
                templateUrl: "STANDARD/assets/views/ui_tabs_accordions.html",
                title: "Tabs & Accordions",
                ncyBreadcrumb: {
                    label: "Tabs & Accordions",
                },
                resolve: loadSequence("vAccordionCtrl"),
            })
            .state("app.ui.panels", {
                url: "/panels",
                templateUrl: "STANDARD/assets/views/ui_panels.html",
                title: "Panels",
                ncyBreadcrumb: {
                    label: "Panels",
                },
            })
            .state("app.ui.notifications", {
                url: "/notifications",
                templateUrl: "STANDARD/assets/views/ui_notifications.html",
                title: "Notifications",
                ncyBreadcrumb: {
                    label: "Notifications",
                },
                resolve: loadSequence(
                    "toasterCtrl",
                    "sweetAlertCtrl",
                    "NotificationIconsCtrl"
                ),
            })
            .state("app.ui.treeview", {
                url: "/treeview",
                templateUrl: "STANDARD/assets/views/ui_tree.html",
                title: "TreeView",
                ncyBreadcrumb: {
                    label: "Treeview",
                },
                resolve: loadSequence("angularBootstrapNavTree", "treeCtrl"),
            })
            .state("app.ui.media", {
                url: "/media",
                templateUrl: "STANDARD/assets/views/ui_media.html",
                title: "Media",
                ncyBreadcrumb: {
                    label: "Media",
                },
            })
            .state("app.ui.nestable", {
                url: "/nestable2",
                templateUrl: "STANDARD/assets/views/ui_nestable.html",
                title: "Nestable List",
                ncyBreadcrumb: {
                    label: "Nestable List",
                },
                resolve: loadSequence(
                    "jquery-nestable-plugin",
                    "ng-nestable",
                    "nestableCtrl"
                ),
            })
            .state("app.ui.typography", {
                url: "/typography",
                templateUrl: "STANDARD/assets/views/ui_typography.html",
                title: "Typography",
                ncyBreadcrumb: {
                    label: "Typography",
                },
            })
            .state("app.table", {
                url: "/table",
                template: '<div ui-view class="fade-in-up"></div>',
                title: "Tables",
                ncyBreadcrumb: {
                    label: "Tables",
                },
            })
            .state("app.table.basic", {
                url: "/basic",
                templateUrl: "STANDARD/assets/views/table_basic.html",
                title: "Basic Tables",
                ncyBreadcrumb: {
                    label: "Basic",
                },
            })
            .state("app.table.responsive", {
                url: "/responsive",
                templateUrl: "STANDARD/assets/views/table_responsive.html",
                title: "Responsive Tables",
                ncyBreadcrumb: {
                    label: "Responsive",
                },
            })
            .state("app.table.dynamic", {
                url: "/dynamic",
                templateUrl: "STANDARD/assets/views/table_dynamic.html",
                title: "Dynamic Tables",
                ncyBreadcrumb: {
                    label: "Dynamic",
                },
                resolve: loadSequence("dynamicTableCtrl"),
            })
            .state("app.table.data", {
                url: "/data",
                templateUrl: "STANDARD/assets/views/table_data.html",
                title: "ngTable",
                ncyBreadcrumb: {
                    label: "ngTable",
                },
                resolve: loadSequence("ngTable", "ngTableCtrl"),
            })
            .state("app.table.export", {
                url: "/export",
                templateUrl: "STANDARD/assets/views/table_export.html",
                title: "Table",
            })
            .state("app.form", {
                url: "/form",
                template: '<div ui-view class="fade-in-up"></div>',
                title: "Forms",
                ncyBreadcrumb: {
                    label: "Forms",
                },
            })
            .state("app.form.elements", {
                url: "/elements",
                templateUrl: "STANDARD/assets/views/form_elements.html",
                title: "Forms Elements",
                ncyBreadcrumb: {
                    label: "Elements",
                },
                resolve: loadSequence(
                    "ui.select",
                    "monospaced.elastic",
                    "ui.mask",
                    "touchspin-plugin",
                    "selectCtrl",
                    "spectrum-plugin",
                    "angularSpectrumColorpicker"
                ),
            })
            .state("app.form.xeditable", {
                url: "/xeditable",
                templateUrl: "STANDARD/assets/views/form_xeditable.html",
                title: "Angular X-Editable",
                ncyBreadcrumb: {
                    label: "X-Editable",
                },
                resolve: loadSequence("xeditable", "checklist-model", "xeditableCtrl"),
            })
            .state("app.form.texteditor", {
                url: "/editor",
                templateUrl: "STANDARD/assets/views/form_text_editor.html",
                title: "Text Editor",
                ncyBreadcrumb: {
                    label: "Text Editor",
                },
                resolve: loadSequence("ckeditor-plugin", "ckeditor", "ckeditorCtrl"),
            })
            .state("app.form.wizard", {
                url: "/wizard",
                templateUrl: "STANDARD/assets/views/form_wizard.html",
                title: "Form Wizard",
                ncyBreadcrumb: {
                    label: "Wizard",
                },
                resolve: loadSequence("wizardCtrl"),
            })
            .state("app.form.validation", {
                url: "/validation",
                templateUrl: "STANDARD/assets/views/form_validation.html",
                title: "Form Validation",
                ncyBreadcrumb: {
                    label: "Validation",
                },
                resolve: loadSequence("validationCtrl"),
            })
            .state("app.form.cropping", {
                url: "/image-cropping",
                templateUrl: "STANDARD/assets/views/form_image_cropping.html",
                title: "Image Cropping",
                ncyBreadcrumb: {
                    label: "Image Cropping",
                },
                resolve: loadSequence("ngImgCrop", "cropCtrl"),
            })
            .state("app.form.upload", {
                url: "/file-upload",
                templateUrl: "STANDARD/assets/views/form_file_upload.html",
                title: "Multiple File Upload",
                ncyBreadcrumb: {
                    label: "File Upload",
                },
                resolve: loadSequence("angularFileUpload", "uploadCtrl"),
            })
            .state("app.pages", {
                url: "/pages",
                template: '<div ui-view class="fade-in-up"></div>',
                title: "Pages",
                ncyBreadcrumb: {
                    label: "Pages",
                },
            })
            .state("app.pages.user", {
                url: "/user",
                templateUrl: "STANDARD/assets/views/pages_user_profile.html",
                title: "User Profile",
                ncyBreadcrumb: {
                    label: "User Profile",
                },
                resolve: loadSequence("flow", "userCtrl"),
            })
            .state("app.pages.invoice", {
                url: "/invoice",
                templateUrl: "STANDARD/assets/views/pages_invoice.html",
                title: "Invoice",
                ncyBreadcrumb: {
                    label: "Invoice",
                },
            })
            .state("app.pages.timeline", {
                url: "/timeline",
                templateUrl: "STANDARD/assets/views/pages_timeline.html",
                title: "Timeline",
                ncyBreadcrumb: {
                    label: "Timeline",
                },
                resolve: loadSequence("ngMap"),
            })
            .state("app.pages.calendar", {
                url: "/calendar",
                templateUrl: "STANDARD/assets/views/pages_calendar.html",
                title: "Calendar",
                ncyBreadcrumb: {
                    label: "Calendar",
                },
                resolve: loadSequence("moment", "mwl.calendar", "calendarCtrl"),
            })
            .state("app.pages.messages", {
                url: "/messages",
                templateUrl: "STANDARD/assets/views/pages_messages.html",
                resolve: loadSequence("truncate", "htmlToPlaintext", "inboxCtrl"),
            })
            .state("app.pages.messages.inbox", {
                url: "/inbox/:inboxID",
                templateUrl: "STANDARD/assets/views/pages_inbox.html",
                controller: "ViewMessageCrtl",
            })
            .state("app.pages.blank", {
                url: "/blank",
                templateUrl: "STANDARD/assets/views/pages_blank_page.html",
                ncyBreadcrumb: {
                    label: "Starter Page",
                },
            })
            .state("app.utilities", {
                url: "/utilities",
                template: '<div ui-view class="fade-in-up"></div>',
                title: "Utilities",
                ncyBreadcrumb: {
                    label: "Utilities",
                },
            })
            .state("app.utilities.search", {
                url: "/search",
                templateUrl: "STANDARD/assets/views/utility_search_result.html",
                title: "Search Results",
                ncyBreadcrumb: {
                    label: "Search Results",
                },
            })
            .state("app.utilities.pricing", {
                url: "/pricing",
                templateUrl: "STANDARD/assets/views/utility_pricing_table.html",
                title: "Pricing Table",
                ncyBreadcrumb: {
                    label: "Pricing Table",
                },
            })
            .state("app.maps", {
                url: "/maps",
                templateUrl: "STANDARD/assets/views/maps.html",
                resolve: loadSequence("ngMap", "mapsCtrl"),
                title: "Maps",
                ncyBreadcrumb: {
                    label: "Maps",
                },
            })
            .state("app.charts", {
                url: "/charts",
                templateUrl: "STANDARD/assets/views/charts.html",
                resolve: loadSequence("chartjs", "tc.chartjs", "chartsCtrl"),
                title: "Charts",
                ncyBreadcrumb: {
                    label: "Charts",
                },
            })
            .state("app.documentation", {
                url: "/documentation",
                templateUrl: "STANDARD/assets/views/documentation.html",
                title: "Documentation",
                ncyBreadcrumb: {
                    label: "Documentation",
                },
            })
            .state("error", {
                template: '<div ui-view class="fade-in-up"></div>',
            })
            .state("error.404", {
                url: "/404",
                templateUrl: "STANDARD/assets/views/utility_404.html",
            })
            .state("error.500", {
                url: "/500",
                templateUrl: "STANDARD/assets/views/utility_500.html",
            })

        // Login routes

        .state("login", {
                url: "/login",
                template: '<div ui-view class="fade-in-right-big smooth"></div>',
                abstract: true,
            })
            .state("login.signin", {
                url: "/iniciar",
                templateUrl: "STANDARD/assets/sistem-views/Auth/index.html",
                resolve: loadSequence(
                    "ui.select",
                    "selectCtrl",
                    "ngTable",
                    "ngTableCtrl",
                    "dynamicTableCtrl",
                    "toasterCtrl",
                    "asideCtrl",
                    "vAccordionCtrl",
                    sessionVerificacion
                ),
            })
            .state("login.original", {
                url: "/iniciar",
                templateUrl: "STANDARD/assets/views/login_login.html",
            })
            .state("login.forgot", {
                url: "/forgot",
                templateUrl: "STANDARD/assets/views/login_forgot.html",
            })
            .state("login.registration", {
                url: "/registration",
                templateUrl: "STANDARD/assets/views/login_registration.html",
            })
            .state("login.lockscreen", {
                url: "/lock",
                templateUrl: "STANDARD/assets/views/login_lock_screen.html",
            })

        // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
        function loadSequence() {
            var _args = arguments;
            return {
                deps: [
                    "$ocLazyLoad",
                    "$q",
                    function($ocLL, $q) {
                        var promise = $q.when(1);
                        for (var i = 0, len = _args.length; i < len; i++) {
                            promise = promiseThen(_args[i]);
                        }
                        return promise;

                        function promiseThen(_arg) {
                            if (typeof _arg == "function") return promise.then(_arg);
                            else
                                return promise.then(function() {
                                    var nowLoad = requiredData(_arg);
                                    if (!nowLoad)
                                        return $.error(
                                            "Route resolve: Bad resource name [" + _arg + "]"
                                        );
                                    return $ocLL.load(nowLoad);
                                });
                        }

                        function requiredData(name) {
                            if (jsRequires.modules)
                                for (var m in jsRequires.modules)
                                    if (
                                        jsRequires.modules[m].name &&
                                        jsRequires.modules[m].name === name
                                    )
                                        return jsRequires.modules[m];
                            return jsRequires.scripts && jsRequires.scripts[name];
                        }
                    },
                ],
            };
        }
    },
]);