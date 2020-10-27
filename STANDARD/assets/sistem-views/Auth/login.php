<?php
// Borra todas las variables de sesión 
$_SESSION = array();
// Borra la cookie que almacena la sesión 
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 42000, '/');
}
// Finalmente, destruye la sesión 
@session_destroy();
?>

    <!DOCTYPE html>
    <html class="loading" lang="en" data-textdirection="ltr">
    <!-- BEGIN: Head-->

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
        <meta name="description" content="Vuexy admin is super flexible, powerful, clean &amp; modern responsive bootstrap 4 admin template with unlimited possibilities.">
        <meta name="keywords" content="admin template, Vuexy admin template, dashboard template, flat admin template, responsive admin template, web app">
        <meta name="author" content="PIXINVENT">
        <title>Login Page - Vuexy - Bootstrap HTML admin template</title>
        <link rel="apple-touch-icon" href="../../../app-assets/images/ico/apple-icon-120.png">
        <link rel="shortcut icon" type="image/x-icon" href="../../../app-assets/images/ico/favicon.ico">

        <!-- BEGIN: Vendor CSS-->
        <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/vendors.min.css">
        <!-- END: Vendor CSS-->

        <!-- BEGIN: Theme CSS-->
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap-extended.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/colors.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/components.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/dark-layout.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/semi-dark-layout.css">

        <!-- BEGIN: Page CSS-->
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/menu/menu-types/vertical-menu.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/colors/palette-gradient.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/pages/authentication.css">
        <!-- END: Page CSS-->

        <!-- BEGIN: Custom CSS-->
        <link rel="stylesheet" type="text/css" href="../../../assets/css/style.css">
        <!-- END: Custom CSS-->

    </head>
    <!-- END: Head-->

    <!-- BEGIN: Body-->

    <body class="vertical-layout vertical-menu-modern 1-column  navbar-floating footer-static bg-full-screen-image  blank-page blank-page" data-open="click" data-menu="vertical-menu-modern" data-col="1-column">
        <!-- BEGIN: Content-->
        <div class="app-content content">

            <div class="content-overlay"></div>
            <div class="header-navbar-shadow"></div>
            <div class="content-wrapper">
                <div class="content-header row">
                </div>
                <div class="content-body">
                    <section class="row flexbox-container">
                        <div class="col-xl-8 col-11 d-flex justify-content-center">
                            <div class="card bg-authentication rounded-0 mb-0">
                                <div class="row m-0">
                                    <div class="col-lg-6 d-lg-block d-none text-center align-self-center px-1 py-0">
                                        <img src="../../../app-assets/images/pages/login.png" alt="branding logo">
                                    </div>
                                    <div class="col-lg-6 col-12 p-0">
                                        <div class="card rounded-0 mb-0 px-2">
                                            <div class="card-header pb-1">
                                                <div class="card-title">
                                                    <h4 class="mb-0">Login</h4>
                                                </div>
                                            </div>
                                            <p class="px-2">Welcome back, please login to your account.</p>
                                            <div class="card-content">
                                                <div class="card-body pt-1">
                                                    <form action="#">
                                                        <fieldset class="form-label-group form-group position-relative has-icon-left">
                                                            <input type="text" name="username" class="form-control" id="username" placeholder="Username" required>
                                                            <div class="form-control-position">
                                                                <i class="feather icon-user"></i>
                                                            </div>
                                                            <label for="user-name">Username</label>
                                                        </fieldset>

                                                        <fieldset class="form-label-group position-relative has-icon-left">
                                                            <input type="password" name="password" class="form-control" id="password" placeholder="Password" required>
                                                            <div class="form-control-position">
                                                                <i class="feather icon-lock"></i>
                                                            </div>
                                                            <label for="user-password">Password</label>
                                                        </fieldset>
                                                        <div class="form-group d-flex justify-content-between align-items-center">
                                                            <div class="text-left">
                                                            </div>
                                                            <div class="text-right"><a href="auth-forgot-password.html" class="card-link">Forgot Password?</a></div>
                                                        </div>
                                                        <a href="auth-register.html" class="btn btn-outline-primary float-left btn-inline">Register</a>
                                                        <button type="button" id="login" class="btn btn-primary float-right btn-inline">Login</button>
                                                    </form>
                                                </div>
                                            </div>
                                            <br>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </section>
                </div>
            </div>
        </div>
        <!-- END: Content-->


        <!-- BEGIN: Vendor JS-->
        <script src="../../../app-assets/vendors/js/vendors.min.js"></script>
        <!-- BEGIN Vendor JS-->

        <!-- BEGIN: Page Vendor JS-->
        <script src="../../../app-assets/vendors/js/extensions/sweetalert2.all.min.js"></script>
        <script src="../../../app-assets/vendors/js/extensions/polyfill.min.js"></script>
        <!-- END: Page Vendor JS-->

        <!-- BEGIN: Theme JS-->
        <script src="../../../app-assets/js/core/app-menu.js"></script>
        <script src="../../../app-assets/js/core/app.js"></script>
        <script src="../../../app-assets/js/scripts/components.js"></script>
        <script src="../../../app-assets/js/scripts/customizer.min.js"></script>
        <script src="../../../app-assets/js/scripts/footer.min.js"></script>

        <!-- END: Theme JS-->
        <script src="../../../app-assets/js/scripts/pages/bootstrap-toast.min.js"></script>
        <!-- BEGIN: Page JS-->
        <script>
            $(document).ready(function() {
                sessionStorage.clear();
                var username = $('input#username').val();
                var password = $('input#password').val();
                $('button#login').click(function() {
                    var dataString = $('form').serialize();
                    if (true) {
                        $.ajax({
                            type: "POST",
                            url: "../../../control/checkLogin.php",
                            data: dataString,
                            beforeSend: function() {
                                $('button#login').val('Connectando...');
                            },
                            success: function(data) {
                                if (data) {
                                    var data = JSON.parse(data);
                                    datosSession = JSON.stringify(data);
                                    sessionStorage.setItem('datos', datosSession);
                                    //obtener nombre de las empresas
                                    var xmlhttp = new XMLHttpRequest();
                                    var theUrl = `../../../../api/mantenimiento/mantenimiento/read.php?getdb=${data.database}&tbnom=empresa`;
                                    xmlhttp.open("POST", theUrl);
                                    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                                    xmlhttp.withCredentials = true;
                                    xmlhttp.send();
                                    xmlhttp.onload = () => {
                                        Swal.fire({
                                            title: 'Seleccione Empresa',
                                            html: '<div id="renderListUbigeo" class="list-group"></div>',
                                            showCloseButton: true,
                                            showCancelButton: true,
                                            cancelButtonText: '<i class="fal fa-times"></i> Cerrar',
                                            cancelButtonAriaLabel: 'Cancelar',
                                            onOpen: function() {
                                                var data = JSON.parse(xmlhttp.response)
                                                var res = data.data
                                                $.each(res, function(k, v) {
                                                    $("#renderListUbigeo").append("<a class='list-group-item' id='ubigeoSelected' data2=" + v.emp_dec + " data=" + v.emp_id + ">" + v.emp_nom + "</a>")
                                                });
                                                $('#swal2-content').addClass('renderize400')
                                                $("a#ubigeoSelected").on('click', function() {
                                                    var emp_id = $(this).attr('data')
                                                    var emp_dec = $(this).attr('data2')
                                                    var text_ubi_id = $(this).text()
                                                   
                                                    var qwe = `../../../../control/dataSession.php`;
                                                    xmlhttp.open("POST", qwe);
                                                    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                                                    xmlhttp.withCredentials = true;
                                                    let dax = {emp_id : emp_id , data : datosSession }
                                                    xmlhttp.send( JSON.stringify(dax));
                                                    xmlhttp.onload = () =>{
                                                        if(xmlhttp.status == 200){
                                                            Swal.close();
                                                            sessionStorage.setItem('idEmpresa', emp_id);
                                                            sessionStorage.setItem('decEmpresa', emp_dec);
                                                            window.location.href = "../../../";
                                                        }
                                                     }
                                                })
                                            }
                                        })
                                    }
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Uups...',
                                        text: 'Combinación de Inicio de Sesión Inválida por favor verifique',
                                    })
                                }
                            }
                        });
                    }
                    return false;
                });

            });
        </script>

        <!-- END: Page JS-->

    </body>
    <!-- END: Body-->

    </html>