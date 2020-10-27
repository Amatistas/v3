'use strict';
/** 
 * controller for ngSweetAlert
 * AngularJS wrapper for SweetAlert
 */
app.controller('SweetAlertCtrl', [
    '$scope', 'SweetAlert',
    function($scope, SweetAlert) {

        $scope.demo1 = function() {
            SweetAlert.swal({ title: "Here's a message", confirmButtonColor: "#007AFF" });
        };

        $scope.demo2 = function() {
            SweetAlert.swal({ title: "Here's a message!", text: "It's pretty, isn't it?", confirmButtonColor: "#007AFF" });
        };

        $scope.demo3 = function() {
            SweetAlert.swal({ title: "Good job!", text: "You clicked the button!", type: "success", confirmButtonColor: "#007AFF" });
        };

        $scope.demo4 = function() {
            SweetAlert.swal({
                title: "Are you sure?",
                text: "Your will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!"
            }, function() {
                SweetAlert.swal({ title: "Booyah!", confirmButtonColor: "#007AFF" });
            });
        };

        $scope.demo5 = function() {
            SweetAlert.swal({
                title: "Are you sure?",
                text: "Your will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({ title: "Deleted!", text: "Your imaginary file has been deleted.", type: "success", confirmButtonColor: "#007AFF" });
                } else {
                    SweetAlert.swal({ title: "Cancelled", text: "Your imaginary file is safe :)", type: "error", confirmButtonColor: "#007AFF" });
                }
            });
        };

        $scope.demo6 = function() {
            SweetAlert.swal({ title: "Sweet!", text: "Here's a custom image.", imageUrl: "http://oitozero.com/img/avatar.jpg", confirmButtonColor: "#007AFF" });
        };

        $scope.SwalBuscarUbigeo = function(buscar) {
            var obj = buscar
            var xmlhttp = new XMLHttpRequest();
            var theUrl = "../../../../api/mantenimiento/ubigeo/search.php?s=" + obj;
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.withCredentials = true;
            xmlhttp.send(obj)
            xmlhttp.onload = () => {
                switch (xmlhttp.status) {
                    case 200:
                        SweetAlert.swal({
                            title: 'Seleccione Ubicación',
                            showCloseButton: false,
                            showCancelButton: false,
                            funtion: setTimeout(() => {
                                $(".sweet-alert p").addClass('SweetAlertscroll')
                                $(".sweet-alert p").html('')
                                var data = JSON.parse(xmlhttp.response)
                                var res = data.data
                                $.each(res, function(k, v) {
                                    $(".sweet-alert p").append("<a class='list-group-item' id='ubigeoSelected' data=" + v.ubi_id + ">" + v.departamento + "-" + v.provincia + "-" + v.distrito + "</a>")
                                });
                                $("a#ubigeoSelected").on('click', function() {
                                    var ubi_id = $(this).attr('data')
                                    var text_ubi_id = $(this).text()
                                    $scope.infoInputs.ubi_id = ubi_id;
                                    $scope.infoInputs.buscarubigeo = text_ubi_id;
                                    SweetAlert.close();
                                })

                            }, 250)
                        })
                        break;
                    default:
                        SweetAlert.swal('Error', 'Ubigeo No Encontrado', 'error');
                        break;
                }
            }
        }

        $scope.SwalBuscarPlanCuenta = function(buscar) {
            var obj = buscar
            var xmlhttp = new XMLHttpRequest();
            var theUrl = `../../../../api/mantenimiento/mantenimiento/search.php?getdb=nubefa.nubefa&tbnom=plan_cuenta&s=cta_nom&key=${obj}`;

            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.withCredentials = true;
            xmlhttp.send(obj)
            xmlhttp.onload = () => {
                switch (xmlhttp.status) {
                    case 200:
                        SweetAlert.swal({
                            title: 'Seleccione Cuenta',
                            showCloseButton: false,
                            showCancelButton: false,
                            funtion: setTimeout(() => {
                                $(".sweet-alert p").addClass('SweetAlertscroll')
                                $(".sweet-alert p").html('')
                                var data = JSON.parse(xmlhttp.response)
                                var res = data.data
                                $.each(res, function(k, v) {
                                    $(".sweet-alert p").append("<a class='list-group-item' id='ubigeoSelected' data=" + v.id + ">" + v.cta_id + "-" + v.cta_nom + "</a>")
                                });
                                $("a#ubigeoSelected").on('click', function() {
                                    var id = $(this).attr('data')
                                    var cta_id = $(this).text()
                                    $scope.infoInputs.cuenta_contable = id
                                    $scope.infoInputs.buscarPlanCuenta = cta_id
                                    SweetAlert.close();
                                })
                            }, 250)
                        })
                        break;
                    default:
                        SweetAlert.swal('Error', 'Cuenta no Encontrada', 'error');
                        break;
                }
            }
        }

    }
]);