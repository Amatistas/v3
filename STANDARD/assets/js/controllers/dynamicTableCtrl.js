"use strict";
/**
 * controllers for dynamic table
 * Remove/delete a table row dynamically
 */

app.controller("dynamicTableCtrl", [
    "$scope",
    "$http",
    function($scope, $http) {
        $scope.companies = [{
                name: "Infosys Technologies",
                employees: 125000,
                headoffice: "Bangalore",
            },
            {
                name: "Cognizant Technologies",
                employees: 100000,
                headoffice: "Bangalore",
            },
            { name: "Wipro", employees: 115000, headoffice: "Bangalore" },
            {
                name: "Tata Consultancy Services (TCS)",
                employees: 150000,
                headoffice: "Bangalore",
            },
        ];

        $scope.addRow = function() {
            $scope.companies.push({
                name: $scope.name,
                employees: $scope.employees,
                headoffice: $scope.headoffice,
            });
            $scope.name = "";
            $scope.employees = "";
            $scope.headoffice = "";
        };

        $scope.addRowAsyncAsNV = function() {
            $scope.companies.push({
                name: $scope.name,
                employees: $scope.employees,
                headoffice: $scope.headoffice,
            });
            // Writing it to the server
            //
            var data =
                "name=" +
                $scope.name +
                "&employees=" +
                $scope.employees +
                "&headoffice=" +
                $scope.headoffice;
            $http
                .post("/savecompany", data)
                .success(function(data, status, headers, config) {
                    $scope.message = data;
                })
                .error(function(data, status, headers, config) {
                    alert("failure message: " + JSON.stringify({ data: data }));
                });
            // Making the fields empty
            //
            $scope.name = "";
            $scope.employees = "";
            $scope.headoffice = "";
        };

        $scope.removeRow = function(name) {
            var index = -1;
            var comArr = eval($scope.companies);
            for (var i = 0; i < comArr.length; i++) {
                if (comArr[i].name === name) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                alert("Something gone wrong");
            }
            $scope.companies.splice(index, 1);
        };
    },
]);

app.controller("itemsCtrl", [
    "$scope",
    "$http",
    function($scope, $http) {
        $scope.itemsList = [{
                cd_num: "jkashdjs81723",
                pro_cod: "MT001",
                id: 1,
                cd_des: "Zapato Nike",
                cd_can: 1,
                pst_id: "NIU",
                cd_fac: 1,
                cd_pre: 250,
                cd_igv: 18,
                cd_ina: 0,
                cd_isc: 0,
                igv: false,
            },
            {
                cd_num: "jkashdjs81723",
                pro_cod: "MT001",
                id: 1,
                cd_des: "Zapato Nike",
                cd_can: 1,
                pst_id: "NIU",
                cd_fac: 1,
                cd_pre: 250,
                cd_igv: 18,
                cd_ina: 0,
                cd_isc: 0,
                igv: false,
            },
            {
                cd_num: "jkashdjs81723",
                pro_cod: "MT001",
                id: 1,
                cd_des: "Zapato Nike",
                cd_can: 1,
                pst_id: "NIU",
                cd_fac: 1,
                cd_pre: 250,
                cd_igv: 18,
                cd_ina: 0,
                cd_isc: 0,
                igv: false,
            },
            {
                cd_num: "jkashdjs81723",
                pro_cod: "MT001",
                id: 1,
                cd_des: "Zapato Nike",
                cd_can: 1,
                pst_id: "NIU",
                cd_fac: 1,
                cd_pre: 250,
                cd_igv: 18,
                cd_ina: 0,
                cd_isc: 0,
                igv: false,
            },
            {
                cd_num: "jkashdjs81723",
                pro_cod: "MT001",
                id: 1,
                cd_des: "Zapato Nike",
                cd_can: 1,
                pst_id: "NIU",
                cd_fac: 1,
                cd_pre: 250,
                cd_igv: 18,
                cd_ina: 0,
                cd_isc: 0,
                igv: false,
            },
            {
                cd_num: "jkashdjs81723",
                pro_cod: "MT001",
                id: 1,
                cd_des: "Zapato Nike",
                cd_can: 1,
                pst_id: "NIU",
                cd_fac: 1,
                cd_pre: 250,
                cd_igv: 18,
                cd_ina: 0,
                cd_isc: 0,
                igv: false,
            },
            {
                cd_num: "jkashdjs81723",
                pro_cod: "MT001",
                id: 1,
                cd_des: "Zapato Nike",
                cd_can: 1,
                pst_id: "NIU",
                cd_fac: 1,
                cd_pre: 250,
                cd_igv: 18,
                cd_ina: 0,
                cd_isc: 0,
                igv: false,
            },
            {
                cd_num: "jkashdjs81723",
                pro_cod: "MT001",
                id: 1,
                cd_des: "Zapato Nike",
                cd_can: 1,
                pst_id: "NIU",
                cd_fac: 1,
                cd_pre: 250,
                cd_igv: 18,
                cd_ina: 0,
                cd_isc: 0,
                igv: false,
            },
            {
                cd_num: "jkashdjs81723",
                pro_cod: "MT001",
                id: 1,
                cd_des: "Zapato Nike",
                cd_can: 1,
                pst_id: "NIU",
                cd_fac: 1,
                cd_pre: 250,
                cd_igv: 18,
                cd_ina: 0,
                cd_isc: 0,
                igv: false,
            },
            {
                cd_num: "jkashdjs81723",
                pro_cod: "MT001",
                id: 1,
                cd_des: "Zapato Nike",
                cd_can: 1,
                pst_id: "NIU",
                cd_fac: 1,
                cd_pre: 250,
                cd_igv: 18,
                cd_ina: 0,
                cd_isc: 0,
                igv: false,
            },
        ];

        $scope.addRow = function() {
            var cont = $scope.itemsList.length;
            var newItem = {
                cd_num: $scope.numeroAleatorio,
                pro_cod: $scope.addItem.pro_cod,
                id: cont,
                cd_des: $scope.addItem.cd_des,
                cd_can: $scope.addItem.cd_can,
                pst_id: $scope.addItem.pst_id,
                cd_fac: $scope.addItem.cd_fac,
                cd_pre: $scope.addItem.cd_pre,
                cd_igv: $scope.addItem.cd_igv,
                cd_ina: $scope.addItem.cd_ina,
                cd_isc: $scope.addItem.cd_isc,
                igv: false,
            };

            $scope.items.push(newItem);

            $scope.addItems.cd_num = "";
            $scope.addItems.pro_cod = "";
            $scope.addItems.id = "";
            $scope.addItems.cd_des = "";
            $scope.addItems.cd_can = "";
            $scope.addItems.pst_id = "";
            $scope.addItems.cd_fac = "";
            $scope.addItems.cd_pre = "";
            $scope.addItems.cd_igv = "";
            $scope.addItems.cd_ina = "";
            $scope.addItems.cd_isc = "";
            $scope.addItems.igv = false;
        };

        $scope.addRowAsyncAsNV = function() {
            $scope.companies.push({
                name: $scope.name,
                employees: $scope.employees,
                headoffice: $scope.headoffice,
            });
            // Writing it to the server
            //
            var data =
                "name=" +
                $scope.name +
                "&employees=" +
                $scope.employees +
                "&headoffice=" +
                $scope.headoffice;
            $http
                .post("/savecompany", data)
                .success(function(data, status, headers, config) {
                    $scope.message = data;
                })
                .error(function(data, status, headers, config) {
                    alert("failure message: " + JSON.stringify({ data: data }));
                });
            // Making the fields empty
            //
            $scope.name = "";
            $scope.employees = "";
            $scope.headoffice = "";
        };

        $scope.removeRow = function(name) {
            var index = -1;
            var comArr = eval($scope.companies);
            for (var i = 0; i < comArr.length; i++) {
                if (comArr[i].name === name) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                alert("Something gone wrong");
            }
            $scope.companies.splice(index, 1);
        };
    },
]);

app.controller("itemPagarCtrl", [
    "$scope",
    "$http",
    function($scope, $http) {
        $scope.addRow = function() {
            var cont = $scope.itemsList.length;
            var newItem = {
                cd_num: $scope.numeroAleatorio,
                pro_cod: $scope.addItem.pro_cod,
                id: cont,
                cd_des: $scope.addItem.cd_des,
                cd_can: $scope.addItem.cd_can,
                pst_id: $scope.addItem.pst_id,
                cd_fac: $scope.addItem.cd_fac,
                cd_pre: $scope.addItem.cd_pre,
                cd_igv: $scope.addItem.cd_igv,
                cd_ina: $scope.addItem.cd_ina,
                cd_isc: $scope.addItem.cd_isc,
                igv: false,
            };

            $scope.items.push(newItem);

            $scope.addItems.cd_num = "";
            $scope.addItems.pro_cod = "";
            $scope.addItems.id = "";
            $scope.addItems.cd_des = "";
            $scope.addItems.cd_can = "";
            $scope.addItems.pst_id = "";
            $scope.addItems.cd_fac = "";
            $scope.addItems.cd_pre = "";
            $scope.addItems.cd_igv = "";
            $scope.addItems.cd_ina = "";
            $scope.addItems.cd_isc = "";
            $scope.addItems.igv = false;
        };

        $scope.removeRow = function(name) {
            var index = -1;
            var comArr = eval($scope.companies);
            for (var i = 0; i < comArr.length; i++) {
                if (comArr[i].name === name) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                alert("Something gone wrong");
            }
            $scope.companies.splice(index, 1);
        };
    },
]);
app.controller("itemCobrarCtrl", [
    "$scope",
    "$http",
    function($scope, $http) {
        $scope.addRow = function() {
            var cont = $scope.itemsList.length;
            var newItem = {
                cd_num: $scope.numeroAleatorio,
                pro_cod: $scope.addItem.pro_cod,
                id: cont,
                cd_des: $scope.addItem.cd_des,
                cd_can: $scope.addItem.cd_can,
                pst_id: $scope.addItem.pst_id,
                cd_fac: $scope.addItem.cd_fac,
                cd_pre: $scope.addItem.cd_pre,
                cd_igv: $scope.addItem.cd_igv,
                cd_ina: $scope.addItem.cd_ina,
                cd_isc: $scope.addItem.cd_isc,
                igv: false,
            };

            $scope.items.push(newItem);

            $scope.addItems.cd_num = "";
            $scope.addItems.pro_cod = "";
            $scope.addItems.id = "";
            $scope.addItems.cd_des = "";
            $scope.addItems.cd_can = "";
            $scope.addItems.pst_id = "";
            $scope.addItems.cd_fac = "";
            $scope.addItems.cd_pre = "";
            $scope.addItems.cd_igv = "";
            $scope.addItems.cd_ina = "";
            $scope.addItems.cd_isc = "";
            $scope.addItems.igv = false;
        };

        $scope.addRowAsyncAsNV = function() {
            $scope.companies.push({
                name: $scope.name,
                employees: $scope.employees,
                headoffice: $scope.headoffice,
            });
            // Writing it to the server
            //
            var data =
                "name=" +
                $scope.name +
                "&employees=" +
                $scope.employees +
                "&headoffice=" +
                $scope.headoffice;
            $http
                .post("/savecompany", data)
                .success(function(data, status, headers, config) {
                    $scope.message = data;
                })
                .error(function(data, status, headers, config) {
                    alert("failure message: " + JSON.stringify({ data: data }));
                });
            // Making the fields empty
            //
            $scope.name = "";
            $scope.employees = "";
            $scope.headoffice = "";
        };

        $scope.removeRow = function(name) {
            var index = -1;
            var comArr = eval($scope.companies);
            for (var i = 0; i < comArr.length; i++) {
                if (comArr[i].name === name) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                alert("Something gone wrong");
            }
            $scope.companies.splice(index, 1);
        };
    },
]);
app.controller("itemPagarXclientesCtrl", [
    "$scope",
    "$http",
    "toaster",
    function($scope, $http, toaster) {
        $scope.itemsList = [];
        var rr = $scope.itemsList;
        $scope.addRow = function(document) {
            function getById(id, rr) {
                return rr.filter(function(obj) {
                    if (obj.id == id) {
                        return obj
                    }
                })[0]
            }

            var get_my_obj = getById(document.id, rr);
            if (get_my_obj) {
                toaster.pop("error", "Error", "Este Documento ya se encuentra en la Lista de Pagos");

            } else {
                $scope.itemsList.push(document);
            }
        };
        $scope.removeRow = function($id) {
            $scope.itemsList.splice($id, 1)
        }
    }
]);