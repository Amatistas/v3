'use strict';
/**
 * controller for angular
 * Off canvas side menu to use with ui-bootstrap. Extends ui-bootstrap's $uibModal provider.
 */
app.controller('AsideCtrl', [
	'$scope',
	'$aside',
	function($scope, $aside) {
		$scope.openAside = function(position) {
			$aside.open({
				templateUrl: 'asideContent.html',
				placement: position,
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
	}
]);

app.controller('AsideModalTransaccionCtrl', [
	'$scope',
	'$aside',
	'$rootScope',
	'toaster',
	'$location',
	function($scope, $aside, $rootScope, toaster, $location, getserialesdecomprobantes, getProductos) {
		/////////////////COMPRAS////////////////
		$rootScope.compra = function(row) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/compras/formulario-de-transaccion-compra.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $http, $location, getProductos) {
					$scope.infoInputs = {};
					$scope.itemListCompras = [];
					if (row) {
						if (row.td_id == 'DN') {
							$scope.infoInputs.compraAsociada = true;
							$scope.infoInputs.com_clas_bien = row.com_clas_bien;
							$scope.infoInputs.com_dom_pro = row.com_dom_pro;
							$scope.infoInputs.com_doc_aso = row.com_id;
							$scope.infoInputs.td_id = 'DN';
							$scope.infoInputs.mnd_id = 'USD';
						}
						if (row.td_id == 'GR') {
							$scope.infoInputs.ane_id = row.id_proveedor;
							$scope.infoInputs.ane_alias = row.ane_alias;
							$scope.infoInputs.listProductoGetEspecial = true;
							$scope.infoInputs.compraAsociada = true;
							$scope.infoInputs.com_clas_bien = row.com_clas_bien;
							$scope.infoInputs.com_dom_pro = row.com_dom_pro;
							$scope.infoInputs.com_doc_aso = row.com_id;
							$scope.infoInputs.td_id = 'FA';
							$scope.infoInputs.mnd_id = 'PEN';
							$scope.fetchProductosCompras = function(id_compra) {
								getProductos.fetchProductosCompras(id_compra).then(
									function(d) {
										$scope.itemListCompras = d;
									},
									function(errResponse) {
										console.error('Error while fetching Currencies');
									}
								);
								return this;
							};
							var cont = $scope.fetchProductosCompras(row.com_id);
						}
						if (row.td_id == 'OC') {
							$scope.infoInputs.ane_id = row.id_proveedor;
							$scope.infoInputs.ane_alias = row.ane_alias;
							$scope.infoInputs.listProductoGetEspecial = true;
							$scope.infoInputs.compraAsociada = true;
							$scope.infoInputs.com_clas_bien = row.com_clas_bien;
							$scope.infoInputs.com_dom_pro = row.com_dom_pro;
							$scope.infoInputs.com_doc_aso = row.com_id;
							$scope.infoInputs.td_id = 'FA';
							$scope.infoInputs.mnd_id = 'PEN';
							$scope.fetchProductosCompras = function(id_compra) {
								getProductos.fetchProductosCompras(id_compra).then(
									function(d) {
										$scope.itemListCompras = d;
									},
									function(errResponse) {
										console.error('Error while fetching Currencies');
									}
								);
								return this;
							};
							var cont = $scope.fetchProductosCompras(row.com_id);
						}
					}

					// se verifica si es una documento asociado o un documento unico
					$scope.docOrigin = true;
					if ($scope.infoInputs.com_doc_aso) {
						$scope.docOrigin = false;
					} else {
						$scope.docOrigin = true;
					}
					$scope.infoInputs.usu_id = JSON.parse($rootScope.d.datos).usu_id;
					$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
					$scope.infoInputs.ofi_id = JSON.parse($rootScope.d.datos).ofi_id;
					/* 	$scope.infoInputs.ane_id = $scope.infoInputs.select_ane_id; */
					$scope.infoInputs.to_id = 2;
					$scope.infoInputs.com_fecdoc = '';

					$scope.infoInputs.com_per = '0';
					$scope.infoInputs.com_isc = '0';
					$scope.units = {};
					$scope.rr = [];
					$scope.valorIgvConvertido = 1.18;
					$scope.mySessionEmpresa = [];
					$scope.mySessionEmpresa.emp_igv = 18;
					let misDecimales = 2;
					$scope.miDetraccionMonto = 700;
					$scope.changeCurrenty = function(val) {
						if (val == 'IV' || val == 'DN') {
							$scope.infoInputs.mnd_id = 'USD';
						} else {
							$scope.infoInputs.mnd_id = 'PEN';
						}
					};

					if ($scope.infoInputs.alm_id != 0 || $scope.infoInputs.alm_id) {
						$scope.infoInputs.com_fecalm = $scope.infoInputs.com_fecdoc;
					}

					$scope.rr.td_id = {
						selectId: 'td_id',
						db: 'tipo_operacion_td',
						where: 'to_id',
						key: 1,
						mostrar: [ 'td_id', 'td_id' ]
					};

					$scope.rr.mnd_id = {
						selectId: 'mnd_id',
						db: 'moneda',
						where: 'mnd_id',
						key: '',
						mostrar: [ 'mnd_id', 'mnd_id' ]
					};
					$scope.rr.ofi_id = {
						selectId: 'ofi_id',
						db: 'local',
						where: 'emp_id',
						key: '',
						mostrar: [ 'loc_id', 'loc_nom' ]
					};
					$scope.rr.alm_id = {
						selectId: 'alm_id',
						db: 'almacen_info',
						where: 'emp_id',
						key: '',
						mostrar: [ 'alm_id', 'alm_nom' ]
					};
					$scope.rr.tdc_id = {
						selectId: 'tdc_id',
						db: 'tabla_sunat_contabilidad',
						where: 'tsc_cod',
						key: 30,
						mostrar: [ 'tsc_id', 'tsc_des' ]
					};
					$scope.rr.cc_id = {
						selectId: 'cc_id',
						db: 'centro_costo',
						where: 'cc_est',
						key: 1,
						mostrar: [ 'cc_id', 'cc_des' ]
					};
					$scope.rr.are_id = {
						selectId: 'are_id',
						db: 'areas',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'are_des' ]
					};
					$scope.rr.com_est = {
						selectId: 'com_est',
						db: 'tabla_sunat_contabilidad',
						where: 'tsc_cod',
						key: 104,
						mostrar: [ 'id', 'tsc_des' ]
					};
					$scope.rr.pst_id = {
						selectId: 'pst_id',
						db: 'presentacion',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'pst_id' ]
					};
					$scope.rr.cc_id = {
						selectId: 'cc_id',
						db: 'centro_costo',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'cc_des' ]
					};
					$rootScope.buscarOption = function(param) {
						switch (typeof param) {
							case 'string':
								var obj = JSON.parse(param);
								break;
							case 'object':
								var obj = param;
								break;
							default:
								break;
						}

						var arr = obj.selectId;
						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse(
									$rootScope.d.datos
								).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
							)
							.then(function(response) {
								var options = response.data.data;
								$scope.units[arr] = [];
								$.each(options, function(i, val) {
									$scope.units[arr].push({
										id: val[obj.mostrar[0]],
										label: val[obj.mostrar[1]]
									});
								});
								return $scope.units[arr];
							});
					};

					$scope.additem = function(item) {
						function validaVacio(valor) {
							valor = valor == undefined ? '' : valor;
							if (!valor || 0 === valor.length) {
								return true;
							} else {
								return false;
							}
						}

						function isNumber(x) {
							if (isNaN(x)) {
								return x;
							}
							return parseInt(x);
						}

						function isProduct(x) {
							if (x >= 2) {
								return true;
							} else {
								return false;
							}
						}
						if ($scope.infoInputs.td_id != 'DN') {
							// COMPRUEBA CAMPOS VACIOS
							if ($scope.infoInputs.td_id != 'IV') {
								// COMPRUEBA CAMPOS VACIOS
								if (!$scope.infoInputs.compraAsociada) {
									// COMPRUEBA CAMPOS VACIOS
									if (item.pro_pad >= 2) {
										if (
											validaVacio(item.cd_des) ||
											isNumber(validaVacio(item.cd_can)) ||
											isNumber(validaVacio(item.cd_pre)) ||
											validaVacio(item.pst_id) ||
											isNumber(validaVacio(item.cd_fac)) ||
											validaVacio(item.cc_id)
										) {
											toaster.pop(
												'error',
												'Error',
												'Complete todo el formulario elija Centro de Costo y Presentacion'
											);
										} else {
											$scope.itemListCompras.push(item);
											$rootScope.clearItems();
										}
									} else {
										if (
											validaVacio(item.cd_des) ||
											isNumber(validaVacio(item.cd_can)) ||
											isNumber(validaVacio(item.cd_pre)) ||
											validaVacio(item.pst_id) ||
											isNumber(validaVacio(item.cd_fac))
										) {
											toaster.pop('error', 'Error', 'Complete todo el Formulario');
										} else {
											$scope.itemListCompras.push(item);
											$rootScope.clearItems();
										}
									}
								} else {
									if (
										validaVacio(item.cd_des) ||
										isNumber(validaVacio(item.cd_can)) ||
										isNumber(validaVacio(item.cd_pre)) ||
										validaVacio(item.pst_id) ||
										isNumber(validaVacio(item.cd_fac))
									) {
										toaster.pop(
											'error',
											'Error',
											'Complete todo el formulario elija Centro de Costo y Presentacion'
										);
									} else {
										$scope.itemListCompras.push(item);
										$rootScope.clearItems();
									}
								}
							} else {
								if (
									validaVacio(item.cd_des) ||
									isNumber(validaVacio(item.cd_can)) ||
									isNumber(validaVacio(item.cd_pre)) ||
									validaVacio(item.pst_id) ||
									isNumber(validaVacio(item.cd_fac))
								) {
									toaster.pop(
										'error',
										'Error',
										'Complete todo el formulario elija Centro de Costo y Presentacion'
									);
								} else {
									$scope.itemListCompras.push(item);
									$rootScope.clearItems();
								}
							}
						} else {
							if (
								validaVacio(item.cd_des) ||
								isNumber(validaVacio(item.cd_can)) ||
								isNumber(validaVacio(item.cd_pre)) ||
								validaVacio(item.pst_id) ||
								isNumber(validaVacio(item.cd_fac))
							) {
								toaster.pop(
									'error',
									'Error',
									'Complete todo el formulario elija Centro de Costo y Presentacion'
								);
							} else {
								$scope.itemListCompras.push(item);
								$rootScope.clearItems();
							}
						}
					};

					$scope.eliminarItem = function(index) {
						$scope.itemListCompras.splice(index, 1);
					};

					$scope.getServiciosTotal = function() {
						var total = 0;
						if ($scope.infoInputs.td_id != 'IV') {
							if ($scope.infoInputs.td_id != 'DN') {
								for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
									if ($scope.itemListCompras[i].pro_pad == '2') {
										total =
											total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
									}
								}
								return total;
							} else {
								return 0;
							}
						} else {
							return 0;
						}
					};

					$scope.getTotalPercepcion = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
							if ($scope.itemListCompras[i].pro_tip == '0') {
								total = total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
							}
						}
						return total;
					};

					$scope.getPrecioBruto = function(val) {
						if (val.cd_ina == '0') {
							let total = 0;
							total = total + parseFloat(val.cd_pre / $scope.valorIgvConvertido);
							return total;
						}
						if (val.cd_ina == '1') {
							let total = 0;
							total = total + parseFloat(val.cd_pre);
							return total;
						}
					};

					$scope.getMontoTotal = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
							total = total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
						}
						return total;
					};

					$scope.getMontoDescuento = 0;

					$scope.getMontoTotalAfecto = function() {
						var total = 0;
						if ($scope.infoInputs.td_id != 'IV') {
							if ($scope.infoInputs.td_id != 'DN') {
								for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
									if ($scope.itemListCompras[i].cd_ina == '0') {
										total =
											total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
									}
								}
							}
						}
						return total;
					};

					$scope.getMontoTotalInafecto = function() {
						var total = 0;
						if ($scope.infoInputs.td_id != 'IV') {
							if ($scope.infoInputs.td_id != 'DN') {
								for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
									if ($scope.itemListCompras[i].cd_ina == '1') {
										total =
											total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
									}
								}
							}
						}
						if ($scope.infoInputs.td_id == 'IV') {
							for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
								total = total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
							}
						}
						if ($scope.infoInputs.td_id == 'DN') {
							for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
								total = total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
							}
						}
						return total;
					};

					$scope.getMontoIgv = function(val) {
						if ($scope.infoInputs.td_id != 'IV') {
							if ($scope.infoInputs.td_id != 'DN') {
								var total =
									parseFloat(val / $scope.valorIgvConvertido) *
									(parseFloat($scope.mySessionEmpresa.emp_igv) / 100);
								return total;
							} else {
								return 0;
							}
						} else {
							return 0;
						}
					};
					$scope.getMontoISC = function() {
						var total = 0;
						if ($scope.infoInputs.td_id != 'IV') {
							if ($scope.infoInputs.td_id != 'DN') {
								for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
									if ($scope.itemListCompras[i].cd_isc > 0)
										total =
											total +
											parseFloat(
												$scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre
											) *
												($scope.itemListCompras[i].cd_isc / 100);
								}
								return total;
							} else {
								return 0;
							}
						} else {
							return 0;
						}
					};
					$scope.getMontoDetraccion = function() {
						var total = 0;
						if ($scope.infoInputs.td_id != 'IV') {
							if ($scope.infoInputs.td_id != 'DN') {
								for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
									if ($scope.itemListCompras[i].pro_detraccion == '1')
										total =
											total +
											parseFloat(
												$scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre
											);
								}
								return total;
							} else {
								return 0;
							}
						} else {
							return 0;
						}
					};
					$scope.agregarImpuesto = function($event) {
						if ($event) {
							$.each($scope.itemListCompras, function(k, v) {
								if ($scope.itemListCompras[k].igv == false && $scope.itemListCompras[k].cd_ina == '0') {
									$scope.itemListCompras[k] = {
										pro_pad: v.pro_pad,
										pro_detraccion: v.pro_detraccion,
										cc_id: v.cc_id,
										cd_can: v.cd_can,
										cd_des: v.cd_des,
										cd_fac: v.cd_fac,
										cd_igv: v.cd_igv,
										cd_ina: v.cd_ina,
										cd_isc: v.cd_isc,
										cd_num: v.cd_num,
										cd_pre: (v.cd_pre * $scope.valorIgvConvertido).toFixed(misDecimales),
										id: v.id,
										igv: true,
										pro_cod: v.pro_cod,
										cd_pro_id: v.cd_pro_id,
										pst_id: v.pst_id
									};
								}
							});
						} else {
							$.each($scope.itemListCompras, function(k, v) {
								if ($scope.itemListCompras[k].igv == true && $scope.itemListCompras[k].cd_ina == '0') {
									$scope.itemListCompras[k] = {
										pro_pad: v.pro_pad,
										pro_detraccion: v.pro_detraccion,
										cc_id: v.cc_id,
										cd_can: v.cd_can,
										cd_des: v.cd_des,
										cd_fac: v.cd_fac,
										cd_igv: v.cd_igv,
										cd_ina: v.cd_ina,
										cd_isc: v.cd_isc,
										cd_num: v.cd_num,
										cd_pre: (v.cd_pre / $scope.valorIgvConvertido).toFixed(misDecimales),
										id: v.id,
										igv: false,
										pro_cod: v.pro_cod,
										cd_pro_id: v.cd_pro_id,
										pst_id: v.pst_id
									};
								}
							});
						}
					};
					$scope.reconocerTipoCompra = function() {
						let totalMercaderia = 0;
						let totalMateriaPrima = 0;
						let totalMateriales = 0;
						let totalEmbalajes = 0;
						let totalRepuestos = 0;
						let totalEnvases = 0;
						let totalSuministros = 0;
						let totalServicioGasto = 0;
						for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
							switch ($scope.itemListCompras[i].pro_tip) {
								case '1':
									totalMercaderia =
										totalMercaderia +
										parseFloat($scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre);

									break;
								case '2':
									totalMateriaPrima =
										totalMateriaPrima +
										parseFloat($scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre);

									break;
								case '3':
									totalMateriales =
										totalMateriales +
										parseFloat($scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre);

									break;
								case '4':
									totalEmbalajes =
										totalEmbalajes +
										parseFloat($scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre);

									break;
								case '5':
									totalRepuestos =
										totalRepuestos +
										parseFloat($scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre);

									break;
								case '6':
									totalEnvases =
										totalEnvases +
										parseFloat($scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre);

									break;
								case '7':
									totalSuministros =
										totalSuministros +
										parseFloat($scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre);

									break;

								default:
									totalServicioGasto =
										totalServicioGasto +
										parseFloat($scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre);

									break;
							}
						}

						var numArray = [
							totalMercaderia,
							totalMateriaPrima,
							totalMateriales,
							totalEmbalajes,
							totalRepuestos,
							totalEnvases,
							totalSuministros,
							totalServicioGasto
						];

						function getMaxOfArray(numArry) {
							return Math.max.apply(null, numArry);
						}

						var valu = getMaxOfArray(numArray);

						var position = numArray.indexOf(valu);

						return position + 1;
					};

					// definir el tipo de bien
					$scope.defineTipoBien = function(val) {
						switch (val) {
							case 1:
								return '1';
								break;
							case 2:
								return '1';
								break;
							case 3:
								return '1';
								break;
							case 4:
								return '1';
								break;
							case 5:
								return '1';
								break;
							case 6:
								return '1';
								break;
							case 7:
								return '1';
								break;
							case 8:
								return '5';
								break;
							default:
								break;
						}
					};
					$scope.nuevoproveedor = function(e) {
						var cache = {
							redir: $location.$$url,
							info: $scope.infoInputs,
							items: $scope.itemListCompras
						};

						localStorage.setItem('cache', JSON.stringify(cache));
						e.stopPropagation();
						$uibModalInstance.dismiss();
						$rootScope.nuevoproveedor();
					};

					$scope.guardarCompra = function() {
						var $adver = [];
						let sendObj = JSON.stringify({
							info: [ $scope.infoInputs ],
							items: $scope.itemListCompras
						});
						console.log(sendObj);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/insert2Tables/create.php?getdb=${JSON.parse($rootScope.d.datos)
							.database}&tbnom=compra`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}

							var $ff = IsJsonString($adver[0]);
							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									$rootScope.loadBtnFilters();
									$rootScope.chageDatatableCompra();
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.cancel = function(e) {
						$rootScope.loadBtnFilters();
						$rootScope.chageDatatableCompra();
						if ($location.$$url == '/app/compras/formulario-compra') {
							$uibModalInstance.dismiss();
							e.stopPropagation();
							$location.url(`/app/compras/lista`);
						} else {
							console.log($location.$$url);
							$uibModalInstance.dismiss();
							e.stopPropagation();
						}
					};
				}
			});
		};

		$scope.guiaRemisionCompra = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/compras/formulario-de-transaccion-guia-remision-compra.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $http, getserialesdecomprobantes) {
					$scope.infoInputs = {};
					$scope.infoInputs.usu_id = JSON.parse($rootScope.d.datos).usu_id;
					$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
					$scope.infoInputs.ane_id = $scope.infoInputs.select_ane_id;
					$scope.infoInputs.are_id = 1;
					$scope.infoInputs.td_id = 'GR';
					$scope.infoInputs.mnd_id = 'PEN';
					$scope.infoInputs.to_id = 13;
					$scope.infoInputs.com_ser = '';
					$scope.infoInputs.alm_id = null;
					$scope.units = {};
					$scope.rr = [];
					$scope.rr.td_id = {
						selectId: 'td_id',
						db: 'tipo_operacion_td',
						where: 'to_id',
						key: 1,
						mostrar: [ 'td_id', 'td_id' ]
					};
					$scope.rr.mnd_id = {
						selectId: 'mnd_id',
						db: 'moneda',
						where: 'mnd_id',
						key: '',
						mostrar: [ 'mnd_id', 'mnd_id' ]
					};
					$scope.rr.ofi_id = {
						selectId: 'ofi_id',
						db: 'local',
						where: 'emp_id',
						key: '',
						mostrar: [ 'loc_id', 'loc_nom' ]
					};
					$scope.rr.alm_id = {
						selectId: 'alm_id',
						db: 'almacen_info',
						where: 'emp_id',
						key: '',
						mostrar: [ 'alm_id', 'alm_nom' ]
					};

					$scope.rr.tdc_id = {
						selectId: 'tdc_id',
						db: 'tabla_sunat_contabilidad',
						where: 'tsc_cod',
						key: 30,
						mostrar: [ 'tsc_id', 'tsc_des' ]
					};
					$scope.rr.cc_id = {
						selectId: 'cc_id',
						db: 'centro_costo',
						where: 'cc_est',
						key: 1,
						mostrar: [ 'cc_id', 'cc_des' ]
					};
					$scope.rr.are_id = {
						selectId: 'are_id',
						db: 'areas',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'are_des' ]
					};
					$scope.rr.com_est = {
						selectId: 'com_est',
						db: 'tabla_sunat_contabilidad',
						where: 'tsc_cod',
						key: 104,
						mostrar: [ 'id', 'tsc_des' ]
					};
					$scope.rr.pst_id = {
						selectId: 'pst_id',
						db: 'presentacion',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'pst_nom' ]
					};

					$rootScope.buscarOption = function(param) {
						switch (typeof param) {
							case 'string':
								var obj = JSON.parse(param);
								break;
							case 'object':
								var obj = param;
								break;
							default:
								break;
						}

						var arr = obj.selectId;
						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse(
									$rootScope.d.datos
								).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
							)
							.then(function(response) {
								var options = response.data.data;
								$scope.units[arr] = [];
								$.each(options, function(i, val) {
									$scope.units[arr].push({
										id: val[obj.mostrar[0]],
										label: val[obj.mostrar[1]]
									});
								});
								return $scope.units[arr];
							});
					};
					$scope.itemListCompras = [];

					$scope.additem = function(item) {
						function validaVacio(valor) {
							valor = valor == undefined ? '' : valor;
							if (!valor || 0 === valor.length) {
								return true;
							} else {
								return false;
							}
						}

						function isNumber(x) {
							if (isNaN(x)) {
								return x;
							}
							return parseInt(x);
						}
						// COMPRUEBA CAMPOS VACIOS
						if (
							validaVacio(item.cd_des) ||
							isNumber(validaVacio(item.cd_can)) ||
							isNumber(validaVacio(item.cd_pre)) ||
							validaVacio(item.pst_id) ||
							isNumber(validaVacio(item.cd_fac))
						) {
							alert('completar');
						} else {
							$scope.itemListCompras.push(item);
							$rootScope.clearItems();
						}
					};

					$scope.eliminarItem = function(index) {
						$scope.itemListCompras.splice(index, 1);
					};

					$scope.getTotalPeso = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
							total = total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pes;
						}
						return total;
					};

					$scope.guardarGuiaRemisionCompra = function() {
						var $adver = [];
						let sendObj = JSON.stringify({
							info: [ $scope.infoInputs ],
							items: $scope.itemListCompras
						});
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/insert2TablesGuiaRemisionCompra/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=compra`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}

							var $ff = IsJsonString($adver[0]);
							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									$rootScope.loadBtnFilters();
									$rootScope.chageDatatableCompra();
									toaster.pop('success', 'Guia De Remisión', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
						$rootScope.loadBtnFilters();
						$rootScope.chageDatatableCompra();
					};
				}
			});
		};

		$rootScope.registroAlmacen = function(row) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/compras/formulario-de-registro-almacen.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $http) {
					$scope.infoInputs = {};
					$scope.infoInputs.usu_id = JSON.parse($rootScope.d.datos).usu_id;
					$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
					$scope.infoInputs.ofi_id = JSON.parse($rootScope.d.datos).ofi_id;
					$scope.infoInputs.ane_id = $scope.infoInputs.select_ane_id;
					$scope.units = {};
					$scope.rr = [];
					$scope.infodoc = row;
					console.log(row);
					$scope.infoInputs.tipo_op = row.Documentos;
					$scope.infoInputs.prove_compra = row.ane_alias;
					$scope.infoInputs.tip_ope = row.to_nom;

					$scope.rr.loc_id = {
						selectId: 'loc_id',
						db: 'local',
						where: 'loc_id',
						key: '',
						mostrar: [ 'loc_id', 'loc_nom' ]
					};
					$scope.rr.mnd_id = {
						selectId: 'mnd_id',
						db: 'moneda',
						where: 'mnd_id',
						key: '',
						mostrar: [ 'mnd_id', 'mnd_id' ]
					};
					$scope.rr.ofi_id = {
						selectId: 'ofi_id',
						db: 'local',
						where: 'emp_id',
						key: '',
						mostrar: [ 'loc_id', 'loc_nom' ]
					};
					$scope.rr.alm_id = {
						selectId: 'alm_id',
						db: 'almacen_info',
						where: 'emp_id',
						key: '',
						mostrar: [ 'alm_id', 'alm_nom' ]
					};
					$rootScope.buscarOption = function(param) {
						switch (typeof param) {
							case 'string':
								var obj = JSON.parse(param);
								break;
							case 'object':
								var obj = param;
								break;
							default:
								break;
						}

						var arr = obj.selectId;

						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse(
									$rootScope.d.datos
								).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
							)
							.then(function(response) {
								var options = response.data.data;
								$scope.units[arr] = [];
								$.each(options, function(i, val) {
									$scope.units[arr].push({
										id: val[obj.mostrar[0]],
										label: val[obj.mostrar[1]]
									});
								});
								return $scope.units[arr];
							});
					};
					$scope.itemListCompras = [];
					$http
						.get(
							`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
								.database}&tbnom=producto_com_almacen&where=det_com_id&igual=${row.det_com_id}`
						)
						.then(function(response) {
							$scope.itemListCompras.push(response.data.data);
							return $scope.itemListCompras;
						});

					$scope.itemListAlmacen = [];

					$scope.additem = function(item) {
						function validaVacio(valor) {
							valor = valor == undefined ? '' : valor;
							if (!valor || 0 === valor.length) {
								return true;
							} else {
								return false;
							}
						}

						function isNumber(x) {
							if (isNaN(x)) {
								return x;
							}
							return parseInt(x);
						}

						// COMPRUEBA CAMPOS VACIOS
						if (isNumber(validaVacio(item.cd_can))) {
							alert('completar');
						} else {
							var newItem = {
								com_id: item.com_id,
								cd_num: item.cd_num,
								pro_nom: item.pro_nom,
								cd_can: item.cd_can,
								det_com_id: item.det_com_id,
								cd_pro_id: item.cd_pro_id,
								cd_alm: item.cd_alm,
								cd_cantidadingresar: item.cd_cantidadingresar,
								pst_id: item.pst_id
							};
							$scope.itemListAlmacen.push(newItem);
						}
					};
					$scope.restarAlmacen = function(a, b, id) {
						var total = 0;
						var h = parseFloat(a);
						var v = parseFloat(b);
						total = v - h;
						for (let i = 0; i < $scope.itemListAlmacen.length; i++) {
							if ($scope.itemListAlmacen[i].cd_pro_id == id) {
								total = total - parseFloat($scope.itemListAlmacen[i].cd_cantidadingresar);
							}
						}
						return total;
					};
					$scope.eliminarItem = function(index) {
						$scope.itemListAlmacen.splice(index, 1);
					};

					$scope.guardarAlmacen = function() {
						var $adver = [];
						let sendObj = JSON.stringify({
							almInfo: [ $scope.infoInputs ],
							info: [ $scope.infodoc ],
							items: $scope.itemListAlmacen
						});
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/insert2TablesAlmacenIngreso/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=almacenAlmacenxd`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									$rootScope.loadBtnFilters();
									$rootScope.chageDatatableCompra();
									toaster.pop('success', 'Almacen', 'Datos Almacenados');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Almacenamiento no Generado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};

		// ////////////////////VENTAS//////////////////
		$rootScope.venta = function(row) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/ventas/registro-formulario-ventas.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $http, $rootScope, $window, getInformacionDocumentos) {
					$scope.infoInputs = {};
					$scope.itemListVentas = [];
					if (row) {
						$scope.infoInputs = {};
						getInformacionDocumentos.fetchDocumento(row.ven_id, 'ven_id', 'venta').then(
							function(d) {
								$scope.infoInputs = d[0];
								$scope.infoInputs.anexo_display_name = row.cliente;
								$scope.infoInputs.usu_id = JSON.parse($rootScope.d.datos).usu_id;
								$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
								$scope.infoInputs.loc_id = JSON.parse($rootScope.d.datos).ofi_id;
								$scope.infoInputs.ane_id = row.ane_id;
								$scope.infoInputs.to_id = 1;
								$scope.infoInputs.tipo_ope_sunat = '01';
								$scope.infoInputs.td_id = 'FA';
								$scope.infoInputs.docRelacionado = true;
								$scope.infoInputs.documento_asociado = row.ven_id;
							},
							function(errResponse) {
								alert('venta no encontrada');
								console.error('Error while fetching Currencies');
							}
						);
						getInformacionDocumentos.fetchDocumento(row.ven_id, 'venta_id', 'venta_det_especifico').then(
							function(d) {
								d.forEach((e) => {
									let it = {
										ven_id: e.ven_id,
										pro_id: e.pro_id,
										ven_position_obj: e.ven_position_obj,
										vd_can: e.vd_can,
										pst_id: e.pst_id,
										vd_fac: e.vd_fac,
										vd_des: e.vd_des,
										vd_bar: e.vd_bar,
										vd_pre: e.vd_pre,
										vd_pre_total: e.vd_pre_total,
										vd_costo_tt_pro: e.vd_costo_tt_pro,
										vd_impdes: e.vd_impdes,
										vd_igv: e.vd_igv,
										vd_affection_igv_type_code: e.vd_affection_igv_type_code,
										vd_total_igv: e.vd_total_igv,
										vd_gra: e.vd_gra,
										vd_system_isc_type_code: e.vd_system_isc_type_code,
										vd_total_isc: e.vd_total_isc,
										vd_isc: e.vd_isc,
										lp_id: e.lp_id,
										vd_ina: e.vd_ina,
										vd_vun: e.vd_vun,
										pro_pes: e.pro_pes,
										vt_pro_id: e.vt_pro_id,
										venta_id: e.venta_id,
										cd_alm: e.cd_alm,
										id_vehiculo: e.id_vehiculo,
										Unidad: e.Unidad,
										Descripcion: e.Descripcion,
										Cantidad: e.Cantidad,
										MtoValorUnitario: e.MtoValorUnitario,
										MtoValorVenta: e.MtoValorVenta,
										MtoBaseIgv: e.MtoBaseIgv,
										PorcentajeIgv: e.PorcentajeIgv,
										Igv: e.Igv,
										TipAfeIgv: e.TipAfeIgv,
										TotalImpuestos: e.TotalImpuestos,
										MtoPrecioUnitario: e.MtoPrecioUnitario,
										pro_nom: e.pro_nom
									};
									console.log(it);
									$scope.itemListVentas.push(it);
								});
							},
							function(errResponse) {
								alert('venta_det no encontrada');
								console.error('Error while fetching Currencies');
							}
						);
						$scope.infoInputs.docRelacionado = true;
						$scope.infoInputs.usu_id = JSON.parse($rootScope.d.datos).usu_id;
						$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
						$scope.infoInputs.loc_id = JSON.parse($rootScope.d.datos).ofi_id;
						$scope.infoInputs.ane_id = row.ane_id;

						$scope.infoInputs.to_id = 1;
						$scope.infoInputs.tipo_ope_sunat = '01';
						$scope.infoInputs.td_id = 'FA';
						$scope.productos = {};
					} else {
						$scope.infoInputs.docRelacionado = false;
						$scope.infoInputs.usu_id = JSON.parse($rootScope.d.datos).usu_id;
						$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
						$scope.infoInputs.loc_id = JSON.parse($rootScope.d.datos).ofi_id;

						$scope.infoInputs.to_id = 1;
						$scope.infoInputs.tipo_ope_sunat = '01';
						$scope.infoInputs.td_id = 'FA';
						$scope.productos = {};
					}

					var f = new Date();
					var ano = f.getFullYear();
					var mes = f.getMonth();
					var dia = f.getDate();

					var fechahoy = new Date(ano, mes, dia);

					$scope.infoInputs.ven_fecreg = fechahoy;
					$scope.infoInputs.ven_fecemi = fechahoy;

					function sumarDias(fecha, dias) {
						fecha = new Date(fecha);
						fecha.setDate(fecha.getDate() + dias);
						return fecha;
					}

					$scope.infoInputs.ven_fecven = sumarDias(fechahoy, 30);
					$scope.units = {};
					$scope.rr = [];
					$scope.valorIgvConvertido = 1.18;
					$scope.mySessionEmpresa = [];
					$scope.mySessionEmpresa.emp_igv = 18;
					let misDecimales = JSON.parse($rootScope.d.datos).emp_dec;
					$scope.misDecimales = misDecimales;

					$scope.serializador = function(serie) {
						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/search3.php?getdb=${JSON.parse(
									$rootScope.d.datos
								)
									.database}&tbnom=tipo_documento_serie&s=${serie}&key=td_id&where=emp_id&igual=${JSON.parse(
									$rootScope.d.datos
								).emp_id}&where2=ofi_id&igual2=1`
							)
							.then(function(response) {
								setTimeout(() => {
									$scope.infoInputs.ven_serSel = $scope.serialSelector[0];
								}, 150);
								return ($scope.serialSelector = response.data.data);
							});
					};

					$scope.rr.tipo_ope_sunat = {
						selectId: 'tipo_ope_sunat',
						db: 'sunat_tipo_operacion',
						where: 'cod',
						key: '',
						mostrar: [ 'cod', 'descripcion' ],
						panel: 'nubefaco_nubefapanel'
					};

					$scope.rr.td_id = {
						selectId: 'td_id',
						db: 'tipo_operacion_td',
						where: 'to_id',
						key: 2,
						mostrar: [ 'td_id', 'td_id' ]
					};
					$scope.rr.mnd_id = {
						selectId: 'mnd_id',
						db: 'moneda',
						where: 'mnd_id',
						key: '',
						mostrar: [ 'mnd_id', 'mnd_id' ]
					};
					$scope.rr.fp_id = {
						selectId: 'fp_id',
						db: 'forma_pago',
						where: 'fp_id',
						key: '',
						mostrar: [ 'fp_id', 'fp_nom' ]
					};
					$scope.rr.lp_id = {
						selectId: 'lp_id',
						db: 'lista_precio_list',
						where: 'lp_id',
						key: '',
						mostrar: [ 'lp_id', 'lp_nom' ]
					};
					$scope.rr.cd_alm = {
						selectId: 'cd_alm',
						db: 'almacen_info',
						where: 'emp_id',
						key: '',
						mostrar: [ 'alm_id', 'alm_nom' ]
					};

					$scope.rr.pst_id = {
						selectId: 'pst_id',
						db: 'presentacion',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'pst_nom' ]
					};

					$rootScope.buscarOption = function(param) {
						switch (typeof param) {
							case 'string':
								var obj = JSON.parse(param);
								break;
							case 'object':
								var obj = param;
								break;
							default:
								break;
						}

						var arr = obj.selectId;

						if (param.panel) {
							var bd = 'nubefaco_nubefapanel';
						} else {
							var bd = JSON.parse($rootScope.d.datos).database;
						}

						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${bd}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
							)
							.then(function(response) {
								var options = response.data.data;
								$scope.units[arr] = [];
								$.each(options, function(i, val) {
									$scope.units[arr].push({
										id: val[obj.mostrar[0]],
										label: val[obj.mostrar[1]]
									});
								});
								return $scope.units[arr];
							});
					};

					$scope.additem = function(item) {
						function validaVacio(valor) {
							valor = valor == undefined ? '' : valor;
							if (!valor || 0 === valor.length) {
								return true;
							} else {
								return false;
							}
						}

						function isNumber(x) {
							if (isNaN(x)) {
								return x;
							}
							return parseInt(x);
						}

						// COMPRUEBA CAMPOS VACIOS
						if (
							validaVacio(item.pro_nom) ||
							isNumber(validaVacio(item.vd_can)) ||
							isNumber(validaVacio(item.vd_pre)) ||
							validaVacio(item.pst_id) ||
							isNumber(validaVacio(item.vd_fac))
						) {
							toaster.pop('error', 'Error', 'Completa todo el Formulario');
						} else {
							$scope.itemListVentas.push(item);
							$rootScope.clearItems();
						}
					};

					$scope.eliminarItem = function(index) {
						$scope.itemListVentas.splice(index, 1);
					};

					$scope.getMontoTotal = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListVentas.length; i < len; i++) {
							total = total + $scope.itemListVentas[i].vd_can * $scope.itemListVentas[i].vd_pre;
						}
						return total;
					};

					$scope.getMontoDescuento = 0;

					$scope.getMontoTotalAfecto = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListVentas.length; i < len; i++) {
							if ($scope.itemListVentas[i].vd_ina == '0') {
								total = total + $scope.itemListVentas[i].vd_can * $scope.itemListVentas[i].vd_pre;
							}
						}
						return total;
					};

					$scope.getMontoTotalInafecto = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListVentas.length; i < len; i++) {
							if ($scope.itemListVentas[i].vd_ina == '1') {
								total = total + $scope.itemListVentas[i].vd_can * $scope.itemListVentas[i].vd_pre;
							}
						}
						return total;
					};
					$scope.getMontoIgv = function(val) {
						var total =
							parseFloat(val / $scope.valorIgvConvertido) *
							(parseFloat($scope.mySessionEmpresa.emp_igv) / 100);
						return total;
					};
					$scope.nuevocliente = function() {
						var cache = {
							redir: $location.$$url,
							info: $scope.infoInputs,
							items: $scope.itemListVentas
						};

						localStorage.setItem('cache', JSON.stringify(cache));

						$uibModalInstance.dismiss();
						$rootScope.nuevocliente();
					};

					$scope.guardarVenta = function() {
						var $adver = [];
						let sendObj = JSON.stringify({
							info: [ $scope.infoInputs ],
							items: $scope.itemListVentas
						});
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/insert2TablesVenta/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=venta`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									let ultimoIngreso = JSON.parse($adver[0]);
									toaster.pop('success', 'Venta', 'Documento Guardado');
									$uibModalInstance.close();
									$window.open(
										`${$rootScope.miURL}/compass/view/documento-A4.php?emp_id=${JSON.parse(
											$rootScope.d.datos
										).emp_id}&getdb=${JSON.parse($rootScope.d.datos)
											.database}&nro=${ultimoIngreso[0].ultimo}`
									);
								} else {
									$uibModalInstance.close();
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
							}
							/* $rootScope.loadBtnFilters(); */
						};
					};

					$scope.cancel = function(e) {
						if ($location.$$url == '/app/ventas/formulario-ventas') {
							$rootScope.loadBtnFilters();

							$uibModalInstance.dismiss();
							e.stopPropagation();
							$location.url(`/app/ventas/lista-ventas`);
						} else {
							$uibModalInstance.dismiss();
							e.stopPropagation();
							$rootScope.reloadDataVenta();
						}
					};
				}
			});
		};

		$scope.cotizacionVenta = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/ventas/registro-formulario-cotizacion.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $http) {
					$scope.infoInputs = {};
					$scope.infoInputs.usu_id = JSON.parse($rootScope.d.datos).usu_id;
					$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
					$scope.infoInputs.ane_id = $scope.infoInputs.select_ane_id;
					$scope.infoInputs.to_id = 11;
					$scope.infoInputs.tipo_ope_sunat = '0000';
					$scope.infoInputs.td_id = 'CT';
					$scope.productos = {};

					var f = new Date();
					var ano = f.getFullYear();
					var mes = f.getMonth();
					var dia = f.getDate();

					var fechahoy = new Date(ano, mes, dia);

					$scope.infoInputs.ven_fecreg = fechahoy;
					$scope.infoInputs.ven_fecemi = fechahoy;

					function sumarDias(fecha, dias) {
						fecha = new Date(fecha);
						fecha.setDate(fecha.getDate() + dias);
						return fecha;
					}

					$scope.infoInputs.ven_fecven = sumarDias(fechahoy, 30);
					$scope.units = {};
					$scope.rr = [];
					$scope.valorIgvConvertido = 1.18;
					$scope.mySessionEmpresa = [];
					$scope.mySessionEmpresa.emp_igv = 18;
					let misDecimales = JSON.parse($rootScope.d.datos).emp_dec;
					$scope.misDecimales = misDecimales;

					$scope.serializador = function(serie) {
						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/search3.php?getdb=${JSON.parse(
									$rootScope.d.datos
								)
									.database}&tbnom=tipo_documento_serie&s=${serie}&key=td_id&where=emp_id&igual=${JSON.parse(
									$rootScope.d.datos
								).emp_id}&where2=ofi_id&igual2=1`
							)
							.then(function(response) {
								setTimeout(() => {
									$scope.infoInputs.ven_serSel = $scope.serialSelector[0];
								}, 150);
								return ($scope.serialSelector = response.data.data);
							});
					};

					$scope.rr.td_id = {
						selectId: 'td_id',
						db: 'tipo_operacion_td',
						where: 'to_id',
						key: 11,
						mostrar: [ 'td_id', 'td_id' ]
					};
					$scope.rr.mnd_id = {
						selectId: 'mnd_id',
						db: 'moneda',
						where: 'mnd_id',
						key: '',
						mostrar: [ 'mnd_id', 'mnd_id' ]
					};
					$scope.rr.fp_id = {
						selectId: 'fp_id',
						db: 'forma_pago',
						where: 'fp_id',
						key: '',
						mostrar: [ 'fp_id', 'fp_nom' ]
					};
					$scope.rr.lp_id = {
						selectId: 'lp_id',
						db: 'lista_precio_list',
						where: 'lp_id',
						key: '',
						mostrar: [ 'lp_id', 'lp_nom' ]
					};

					$scope.rr.pst_id = {
						selectId: 'pst_id',
						db: 'presentacion',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'pst_nom' ]
					};
					$scope.rr.cd_alm = {
						selectId: 'cd_alm',
						db: 'almacen_info',
						where: 'emp_id',
						key: '',
						mostrar: [ 'alm_id', 'alm_nom' ]
					};
					$scope.rr.fd_id = {
						selectId: 'fd_id',
						db: 'tipo_operacion_td',
						where: 'to_id',
						key: 11,
						mostrar: [ 'fd_id', 'td_id' ]
					};
					$rootScope.buscarOption = function(param) {
						switch (typeof param) {
							case 'string':
								var obj = JSON.parse(param);
								break;
							case 'object':
								var obj = param;
								break;
							default:
								break;
						}

						/*  if (obj.key === "miEmpresa") {
                                                    obj.key = miEmpresa
                                                } else {
                                                    obj.key = obj.key
                                                } */

						var arr = obj.selectId;

						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse(
									$rootScope.d.datos
								).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
							)
							.then(function(response) {
								var options = response.data.data;
								$scope.units[arr] = [];
								$.each(options, function(i, val) {
									$scope.units[arr].push({
										id: val[obj.mostrar[0]],
										label: val[obj.mostrar[1]]
									});
								});
								return $scope.units[arr];
							});
					};

					$scope.itemListVentas = [];
					$scope.additem = function(item) {
						function validaVacio(valor) {
							valor = valor == undefined ? '' : valor;
							if (!valor || 0 === valor.length) {
								return true;
							} else {
								return false;
							}
						}

						function isNumber(x) {
							if (isNaN(x)) {
								return x;
							}
							return parseInt(x);
						}

						// COMPRUEBA CAMPOS VACIOS
						if (
							validaVacio(item.pro_nom) ||
							isNumber(validaVacio(item.vd_can)) ||
							isNumber(validaVacio(item.vd_pre)) ||
							validaVacio(item.pst_id) ||
							isNumber(validaVacio(item.vd_fac))
						) {
							toaster.pop('error', 'Error', 'Completa todo el Formulario');
						} else {
							$scope.itemListVentas.push(item);
							$rootScope.clearItems();
						}
					};

					$scope.eliminarItem = function(index) {
						$scope.itemListVentas.splice(index, 1);
					};

					$scope.getMontoTotal = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListVentas.length; i < len; i++) {
							total = total + $scope.itemListVentas[i].vd_can * $scope.itemListVentas[i].vd_pre;
						}
						return total;
					};

					$scope.getMontoDescuento = 0;

					$scope.getMontoTotalAfecto = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListVentas.length; i < len; i++) {
							if ($scope.itemListVentas[i].vd_ina == '0') {
								total = total + $scope.itemListVentas[i].vd_can * $scope.itemListVentas[i].vd_pre;
							}
						}
						return total;
					};

					$scope.getMontoTotalInafecto = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListVentas.length; i < len; i++) {
							if ($scope.itemListVentas[i].vd_ina == '1') {
								total = total + $scope.itemListVentas[i].vd_can * $scope.itemListVentas[i].vd_pre;
							}
						}
						return total;
					};
					$scope.getMontoIgv = function(val) {
						var total =
							parseFloat(val / $scope.valorIgvConvertido) *
							(parseFloat($scope.mySessionEmpresa.emp_igv) / 100);
						return total;
					};
					$scope.nuevocliente = function() {
						var cache = {
							redir: $location.$$url,
							info: $scope.infoInputs,
							items: $scope.itemListVentas
						};

						localStorage.setItem('cache', JSON.stringify(cache));

						$uibModalInstance.dismiss();
						$rootScope.nuevocliente();
					};

					$scope.guardarCotizacion = function() {
						var $adver = [];
						let sendObj = JSON.stringify({
							info: [ $scope.infoInputs ],
							items: $scope.itemListVentas
						});
						console.log(sendObj);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/insert2TablesCotizacion/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=venta`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									$rootScope.reloadDataVenta();
									toaster.pop('success', 'Cotización', 'Documento Guardado');
									$uibModalInstance.close();
									e.stopPropagation();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};

					$scope.cancelar = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
						$rootScope.reloadDataVenta();
					};
				}
			});
		};
		$scope.puntoVenta = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/ventas/registro-formulario-punto-venta.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $http) {
					$scope.infoInputs = {};

					$scope.infoInputs.usu_id = JSON.parse($rootScope.d.datos).usu_id;
					$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
					$scope.infoInputs.loc_id = JSON.parse($rootScope.d.datos).ofi_id;

					$scope.infoInputs.ane_id = $scope.infoInputs.select_ane_id;
					$scope.infoInputs.to_id = 2;
					$scope.units = {};
					$scope.rr = [];
					$scope.valorIgvConvertido = 1.18;
					$scope.mySessionEmpresa = [];
					$scope.mySessionEmpresa.emp_igv = 18;

					let misDecimales = JSON.parse($rootScope.d.datos).emp_dec;
					$scope.misDecimales = misDecimales;

					$scope.rr.td_id = {
						selectId: 'td_id',
						db: 'tipo_operacion_td',
						where: 'to_id',
						key: 1,
						mostrar: [ 'td_id', 'td_id' ]
					};
					$scope.rr.mnd_id = {
						selectId: 'mnd_id',
						db: 'moneda',
						where: 'mnd_id',
						key: '',
						mostrar: [ 'mnd_id', 'mnd_id' ]
					};
					$scope.rr.fp_id = {
						selectId: 'fp_id',
						db: 'forma_pago',
						where: 'fp_id',
						key: '',
						mostrar: [ 'fp_id', 'fp_nom' ]
					};
					$scope.rr.lp_id = {
						selectId: 'lp_id',
						db: 'lista_precio_list',
						where: 'lp_id',
						key: '',
						mostrar: [ 'lp_id', 'lp_nom' ]
					};
					$scope.rr.ofi_id = {
						selectId: 'ofi_id',
						db: 'local',
						where: 'emp_id',
						key: '',
						mostrar: [ 'loc_id', 'loc_nom' ]
					};
					$scope.rr.alm_id = {
						selectId: 'alm_id',
						db: 'almacen_info',
						where: 'emp_id',
						key: '',
						mostrar: [ 'alm_id', 'alm_nom' ]
					};

					$scope.rr.pst_id = {
						selectId: 'pst_id',
						db: 'presentacion',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'pst_nom' ]
					};
					$rootScope.buscarOption = function(param) {
						switch (typeof param) {
							case 'string':
								var obj = JSON.parse(param);
								break;
							case 'object':
								var obj = param;
								break;
							default:
								break;
						}

						/*  if (obj.key === "miEmpresa") {
                                                    obj.key = miEmpresa
                                                } else {
                                                    obj.key = obj.key
                                                } */

						var arr = obj.selectId;

						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse(
									$rootScope.d.datos
								).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
							)
							.then(function(response) {
								var options = response.data.data;
								$scope.units[arr] = [];
								$.each(options, function(i, val) {
									$scope.units[arr].push({
										id: val[obj.mostrar[0]],
										label: val[obj.mostrar[1]]
									});
								});
								return $scope.units[arr];
							});
					};
					$scope.itemListCompras = [];
					$scope.additem = function(item) {
						function validaVacio(valor) {
							valor = valor == undefined ? '' : valor;
							if (!valor || 0 === valor.length) {
								return true;
							} else {
								return false;
							}
						}

						function isNumber(x) {
							if (isNaN(x)) {
								return x;
							}
							return parseInt(x);
						}

						// COMPRUEBA CAMPOS VACIOS
						if (
							validaVacio(item.cd_des) ||
							isNumber(validaVacio(item.cd_can)) ||
							isNumber(validaVacio(item.cd_pre)) ||
							validaVacio(item.pst_id) ||
							isNumber(validaVacio(item.cd_fac))
						) {
							alert('completar');
						} else {
							$scope.itemListCompras.push(item);
							$rootScope.clearItems();
						}
					};

					$scope.eliminarItem = function(index) {
						$scope.itemListCompras.splice(index, 1);
					};

					$scope.getMontoTotal = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
							total = total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
						}
						return total;
					};

					$scope.getMontoDescuento = 0;

					$scope.getMontoTotalAfecto = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
							if ($scope.itemListCompras[i].cd_ina == '0') {
								total = total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
							}
						}
						return total;
					};

					$scope.getMontoTotalInafecto = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
							if ($scope.itemListCompras[i].cd_ina == '1') {
								total = total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
							}
						}
						return total;
					};
					$scope.getMontoIgv = function(val) {
						var total =
							parseFloat(val / $scope.valorIgvConvertido) *
							(parseFloat($scope.mySessionEmpresa.emp_igv) / 100);
						return total;
					};
					$scope.agregarImpuesto = function($event) {
						if ($event) {
							$.each($scope.itemListCompras, function(k, v) {
								if ($scope.itemListCompras[k].igv == false && $scope.itemListCompras[k].cd_ina == '0') {
									$scope.itemListCompras[k] = {
										cd_can: v.cd_can,
										cd_des: v.cd_des,
										cd_fac: v.cd_fac,
										cd_igv: v.cd_igv,
										cd_ina: v.cd_ina,
										cd_isc: v.cd_isc,
										cd_num: v.cd_num,
										cd_pre: (v.cd_pre * $scope.valorIgvConvertido).toFixed(misDecimales),
										id: v.id,
										igv: true,
										pro_cod: v.pro_cod,
										cd_pro_id: v.cd_pro_id,
										pst_id: v.pst_id
									};
								}
							});
						} else {
							$.each($scope.itemListCompras, function(k, v) {
								if ($scope.itemListCompras[k].igv == true && $scope.itemListCompras[k].cd_ina == '0') {
									$scope.itemListCompras[k] = {
										cd_can: v.cd_can,
										cd_des: v.cd_des,
										cd_fac: v.cd_fac,
										cd_igv: v.cd_igv,
										cd_ina: v.cd_ina,
										cd_isc: v.cd_isc,
										cd_num: v.cd_num,
										cd_pre: (v.cd_pre / $scope.valorIgvConvertido).toFixed(misDecimales),
										id: v.id,
										igv: false,
										pro_cod: v.pro_cod,
										cd_pro_id: v.cd_pro_id,
										pst_id: v.pst_id
									};
								}
							});
						}
					};
					$scope.guardarVenta = function() {
						let sendObj = JSON.stringify({
							info: [ $scope.infoInputs ],
							items: $scope.itemListCompras
						});
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/insert2Tables/create.php?getdb=${JSON.parse($rootScope.d.datos)
							.database}&tbnom=venta`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							alert(response);
						};
					};

					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancelv = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$rootScope.remisionGuia = function(row) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/ventas/registro-formulario-guia-remision.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $http, getInformacionDocumentos) {
					$scope.infoInputs = {};
					$scope.itemListVentas = [];
					if (row) {
						getInformacionDocumentos.fetchDocumento(row.ven_id, 'ven_id', 'venta').then(
							function(d) {
								$scope.infoInputs = d[0];
								$scope.infoInputs.anexo_display_name = row.cliente;
								$scope.infoInputs.usu_id = JSON.parse($rootScope.d.datos).usu_id;
								$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
								$scope.infoInputs.loc_id = JSON.parse($rootScope.d.datos).ofi_id;
								$scope.infoInputs.ane_id = row.ane_id;
								$scope.infoInputs.to_id = 13;
								$scope.infoInputs.tipo_ope_sunat = 9;
								$scope.infoInputs.td_id = 'GR';
								$scope.infoInputs.docRelacionado = true;
								$scope.infoInputs.documento_asociado = row.ven_id;
							},
							function(errResponse) {
								alert('venta no encontrada');
								console.error('Error while fetching Currencies');
							}
						);
						getInformacionDocumentos.fetchDocumento(row.ven_id, 'venta_id', 'venta_det_especifico').then(
							function(d) {
								$scope.itemListVentas = d;
							},
							function(errResponse) {
								alert('venta_det no encontrada');
								console.error('Error while fetching Currencies');
							}
						);

						$scope.infoInputs.docRelacionado = true;
						$scope.infoInputs.usu_id = JSON.parse($rootScope.d.datos).usu_id;
						$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
						$scope.infoInputs.loc_id = JSON.parse($rootScope.d.datos).ofi_id;
						$scope.infoInputs.ane_id = row.ane_id;

						$scope.infoInputs.to_id = 13;
						$scope.infoInputs.tipo_ope_sunat = 9;
						$scope.infoInputs.td_id = 'GR';
						$scope.productos = {};
					} else {
						$scope.infoInputs.docRelacionado = false;
						$scope.infoInputs.usu_id = JSON.parse($rootScope.d.datos).usu_id;
						$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
						$scope.infoInputs.ane_id = $scope.infoInputs.select_ane_id;
						$scope.infoInputs.loc_id = JSON.parse($rootScope.d.datos).ofi_id;
						$scope.infoInputs.to_id = 13;
						$scope.infoInputs.tipo_ope_sunat = 9;
						$scope.infoInputs.td_id = 'GR';
						$scope.productos = {};
					}

					var f = new Date();
					var ano = f.getFullYear();
					var mes = f.getMonth();
					var dia = f.getDate();

					var fechahoy = new Date(ano, mes, dia);

					$scope.infoInputs.ven_fecreg = fechahoy;
					$scope.infoInputs.ven_fecemi = fechahoy;

					function sumarDias(fecha, dias) {
						fecha = new Date(fecha);
						fecha.setDate(fecha.getDate() + dias);
						return fecha;
					}

					$scope.infoInputs.ven_fecven = sumarDias(fechahoy, 30);
					$scope.units = {};
					$scope.rr = [];
					$scope.valorIgvConvertido = 1.18;
					$scope.mySessionEmpresa = [];
					$scope.mySessionEmpresa.emp_igv = 18;
					let misDecimales = JSON.parse($rootScope.d.datos).emp_dec;
					$scope.misDecimales = misDecimales;

					$scope.serializador = function(serie) {
						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/search3.php?getdb=${JSON.parse(
									$rootScope.d.datos
								)
									.database}&tbnom=tipo_documento_serie&s=${serie}&key=td_id&where=emp_id&igual=${JSON.parse(
									$rootScope.d.datos
								).emp_id}&where2=ofi_id&igual2=1`
							)
							.then(function(response) {
								setTimeout(() => {
									$scope.infoInputs.ven_serSel = $scope.serialSelector[0];
								}, 150);
								return ($scope.serialSelector = response.data.data);
							});
					};
					$scope.rr.cd_alm = {
						selectId: 'cd_alm',
						db: 'almacen_info',
						where: 'emp_id',
						key: '',
						mostrar: [ 'alm_id', 'alm_nom' ]
					};
					$scope.rr.td_id = {
						selectId: 'td_id',
						db: 'tipo_operacion_td',
						where: 'to_id',
						key: 13,
						mostrar: [ 'td_id', 'td_id' ]
					};
					$scope.rr.mnd_id = {
						selectId: 'mnd_id',
						db: 'moneda',
						where: 'mnd_id',
						key: '',
						mostrar: [ 'mnd_id', 'mnd_id' ]
					};
					$scope.rr.fp_id = {
						selectId: 'fp_id',
						db: 'forma_pago',
						where: 'fp_id',
						key: '',
						mostrar: [ 'fp_id', 'fp_nom' ]
					};
					$scope.rr.lp_id = {
						selectId: 'lp_id',
						db: 'lista_precio_list',
						where: 'lp_id',
						key: '',
						mostrar: [ 'lp_id', 'lp_nom' ]
					};
					$scope.rr.ofi_id = {
						selectId: 'ofi_id',
						db: 'local',
						where: 'emp_id',
						key: '',
						mostrar: [ 'loc_id', 'loc_nom' ]
					};
					$scope.rr.alm_id = {
						selectId: 'alm_id',
						db: 'almacen_info',
						where: 'emp_id',
						key: '',
						mostrar: [ 'alm_id', 'alm_nom' ]
					};

					$scope.rr.pst_id = {
						selectId: 'pst_id',
						db: 'presentacion',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'pst_nom' ]
					};

					$scope.rr.id_chofer = {
						selectId: 'id_chofer',
						db: 'getchofer',
						where: 'ch_id',
						key: '',
						mostrar: [ 'ch_id', 'nombre_chofer' ]
					};

					$scope.rr.vh_id = {
						selectId: 'id_vehiculo',
						db: 'carroguia',
						where: 'vh_id',
						key: '',
						mostrar: [ 'vh_id', 'marca' ]
					};
					$scope.rr.ven_motsnt = {
						selectId: 'ven_motsnt',
						db: 'sunat_motivos_traslado',
						where: 'cod',
						key: '',
						mostrar: [ 'cod', 'descripcion' ],
						panel: 'nubefaco_nubefapanel'
					};
					$rootScope.buscarOption = function(param) {
						switch (typeof param) {
							case 'string':
								var obj = JSON.parse(param);
								break;
							case 'object':
								var obj = param;
								break;
							default:
								break;
						}

						var arr = obj.selectId;

						if (param.panel) {
							var bd = 'nubefaco_nubefapanel';
						} else {
							var bd = JSON.parse($rootScope.d.datos).database;
						}

						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${bd}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
							)
							.then(function(response) {
								var options = response.data.data;
								$scope.units[arr] = [];
								$.each(options, function(i, val) {
									$scope.units[arr].push({
										id: val[obj.mostrar[0]],
										label: val[obj.mostrar[1]]
									});
								});
								return $scope.units[arr];
							});
					};
					$scope.itemListVentas = [];

					$scope.additem = function(item) {
						function validaVacio(valor) {
							valor = valor == undefined ? '' : valor;
							if (!valor || 0 === valor.length) {
								return true;
							} else {
								return false;
							}
						}

						function isNumber(x) {
							if (isNaN(x)) {
								return x;
							}
							return parseInt(x);
						}

						// COMPRUEBA CAMPOS VACIOS
						if (
							validaVacio(item.pro_nom) ||
							isNumber(validaVacio(item.vd_can)) ||
							isNumber(validaVacio(item.vd_pre)) ||
							validaVacio(item.pst_id) ||
							isNumber(validaVacio(item.vd_fac))
						) {
							toaster.pop('error', 'Error', 'Completa todo el Formulario');
						} else {
							$scope.itemListVentas.push(item);
							$rootScope.clearItems();
						}
					};

					$scope.eliminarItem = function(index) {
						$scope.itemListVentas.splice(index, 1);
					};

					$scope.getTotalPeso = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListVentas.length; i < len; i++) {
							total = total + $scope.itemListVentas[i].vd_can * $scope.itemListVentas[i].pro_pes;
						}
						return total;
					};

					$scope.getMontoTotal = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListVentas.length; i < len; i++) {
							total = total + $scope.itemListVentas[i].vd_can * $scope.itemListVentas[i].vd_pre;
						}
						return total;
					};

					$scope.getMontoDescuento = 0;

					$scope.getMontoTotalAfecto = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListVentas.length; i < len; i++) {
							if ($scope.itemListVentas[i].vd_ina == '0') {
								total = total + $scope.itemListVentas[i].vd_can * $scope.itemListVentas[i].vd_pre;
							}
						}
						return total;
					};

					$scope.getMontoTotalInafecto = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListVentas.length; i < len; i++) {
							if ($scope.itemListVentas[i].vd_ina == '1') {
								total = total + $scope.itemListVentas[i].vd_can * $scope.itemListVentas[i].vd_pre;
							}
						}
						return total;
					};
					$scope.getMontoIgv = function(val) {
						var total =
							parseFloat(val / $scope.valorIgvConvertido) *
							(parseFloat($scope.mySessionEmpresa.emp_igv) / 100);
						return total;
					};
					$scope.guardarGuiaRemision = function() {
						var $adver = [];
						let sendObj = JSON.stringify({
							info: [ $scope.infoInputs ],
							items: $scope.itemListVentas
						});
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/insert2TablesVenta/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=venta`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Venta', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancelv = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};

		// ////////////////////VENTAS END//////////////////
		$scope.requerimiento = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/compras/formulario-de-transaccion-requerimiento.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $http) {
					$scope.infoInputs = {};
					$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
					$scope.infoInputs.ane_id = $scope.infoInputs.select_ane_id;
					$scope.infoInputs.to_id = 34;
					$scope.units = {};
					$scope.rr = [];

					$scope.rr.per_id = {
						selectId: 'per_id',
						db: 'getPersonal',
						where: 'per_id',
						key: '',
						mostrar: [ 'per_id', 'personal' ]
					};

					$scope.rr.per_id = {
						selectId: 'per_id',
						db: 'getPersonal',
						where: 'per_id',
						key: '',
						mostrar: [ 'per_id', 'personal' ]
					};
					$scope.rr.are_id = {
						selectId: 'are_id',
						db: 'areas',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'are_des' ]
					};
					$scope.rr.pst_id = {
						selectId: 'pst_id',
						db: 'presentacion',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'pst_nom' ]
					};

					$rootScope.buscarOption = function(param) {
						switch (typeof param) {
							case 'string':
								var obj = JSON.parse(param);
								break;
							case 'object':
								var obj = param;
								break;
							default:
								break;
						}

						/*  if (obj.key === "miEmpresa") {
                                                    obj.key = miEmpresa
                                                } else {
                                                    obj.key = obj.key
                                                } */

						var arr = obj.selectId;

						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse(
									$rootScope.d.datos
								).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
							)
							.then(function(response) {
								var options = response.data.data;
								$scope.units[arr] = [];
								$.each(options, function(i, val) {
									$scope.units[arr].push({
										id: val[obj.mostrar[0]],
										label: val[obj.mostrar[1]]
									});
								});
								return $scope.units[arr];
							});
					};
					$scope.itemListCompras = [];
					$scope.additem = function(item) {
						function validaVacio(valor) {
							valor = valor == undefined ? '' : valor;
							if (!valor || 0 === valor.length) {
								return true;
							} else {
								return false;
							}
						}

						function isNumber(x) {
							if (isNaN(x)) {
								return x;
							}
							return parseInt(x);
						}
						// COMPRUEBA CAMPOS VACIOS
						if (
							validaVacio(item.cd_des) ||
							isNumber(validaVacio(item.cd_can)) ||
							isNumber(validaVacio(item.cd_pre)) ||
							validaVacio(item.pst_id) ||
							isNumber(validaVacio(item.cd_fac))
						) {
							alert('completar');
						} else {
							$scope.itemListCompras.push(item);
							$rootScope.clearItems();
						}
					};
					$scope.eliminarItem = function(index) {
						$scope.itemListCompras.splice(index, 1);
					};
					$scope.guardarFormularioRequerimiento = function() {
						let sendObj = JSON.stringify({
							info: [ $scope.infoInputs ],
							items: $scope.itemListCompras
						});
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/insert2Tables/create.php?getdb=${JSON.parse($rootScope.d.datos)
							.database}&tbnom=requerimiento`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							alert(response);
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.ordenCompra = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/compras/formulario-de-transaccion-orden-compra.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $http, getserialesdecomprobantes) {
					$scope.infoInputs = {};
					$scope.infoInputs.usu_id = JSON.parse($rootScope.d.datos).usu_id;
					$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
					$scope.infoInputs.ane_id = $scope.infoInputs.select_ane_id;
					$scope.infoInputs.are_id = 1;
					$scope.infoInputs.td_id = 'OC';
					$scope.infoInputs.to_id = 35;
					$scope.infoInputs.com_ser = '-';
					$scope.infoInputs.alm_id = null;
					$scope.infoInputs.mnd_id = 'PEN';
					$scope.units = {};
					$scope.rr = [];
					$scope.rr.td_id = {
						selectId: 'td_id',
						db: 'tipo_operacion_td',
						where: 'to_id',
						key: 1,
						mostrar: [ 'td_id', 'td_id' ]
					};
					$scope.rr.mnd_id = {
						selectId: 'mnd_id',
						db: 'moneda',
						where: 'mnd_id',
						key: '',
						mostrar: [ 'mnd_id', 'mnd_id' ]
					};
					$scope.rr.ofi_id = {
						selectId: 'ofi_id',
						db: 'local',
						where: 'emp_id',
						key: '',
						mostrar: [ 'loc_id', 'loc_nom' ]
					};
					$scope.rr.alm_id = {
						selectId: 'alm_id',
						db: 'almacen_info',
						where: 'emp_id',
						key: '',
						mostrar: [ 'alm_id', 'alm_nom' ]
					};

					$scope.rr.tdc_id = {
						selectId: 'tdc_id',
						db: 'tabla_sunat_contabilidad',
						where: 'tsc_cod',
						key: 30,
						mostrar: [ 'tsc_id', 'tsc_des' ]
					};
					$scope.rr.cc_id = {
						selectId: 'cc_id',
						db: 'centro_costo',
						where: 'cc_est',
						key: 1,
						mostrar: [ 'cc_id', 'cc_des' ]
					};
					$scope.rr.are_id = {
						selectId: 'are_id',
						db: 'areas',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'are_des' ]
					};
					$scope.rr.com_est = {
						selectId: 'com_est',
						db: 'tabla_sunat_contabilidad',
						where: 'tsc_cod',
						key: 104,
						mostrar: [ 'id', 'tsc_des' ]
					};
					$scope.rr.pst_id = {
						selectId: 'pst_id',
						db: 'presentacion',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'pst_nom' ]
					};

					$scope.fetchSerializador = function(type) {
						var res = [];
						getserialesdecomprobantes.fetchSerializador(type).then(
							function(d) {
								res.push(d);
							},
							function(errResponse) {
								console.error('Error while fetching Currencies');
							}
						);
						return res;
					};

					$rootScope.buscarOption = function(param) {
						switch (typeof param) {
							case 'string':
								var obj = JSON.parse(param);
								break;
							case 'object':
								var obj = param;
								break;
							default:
								break;
						}

						var arr = obj.selectId;
						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse(
									$rootScope.d.datos
								).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
							)
							.then(function(response) {
								var options = response.data.data;
								$scope.units[arr] = [];
								$.each(options, function(i, val) {
									$scope.units[arr].push({
										id: val[obj.mostrar[0]],
										label: val[obj.mostrar[1]]
									});
								});
								return $scope.units[arr];
							});
					};
					$scope.itemListCompras = [];

					$scope.additem = function(item) {
						function validaVacio(valor) {
							valor = valor == undefined ? '' : valor;
							if (!valor || 0 === valor.length) {
								return true;
							} else {
								return false;
							}
						}

						function isNumber(x) {
							if (isNaN(x)) {
								return x;
							}
							return parseInt(x);
						}
						// COMPRUEBA CAMPOS VACIOS
						if (
							validaVacio(item.cd_des) ||
							isNumber(validaVacio(item.cd_can)) ||
							isNumber(validaVacio(item.cd_preX)) ||
							validaVacio(item.pst_id) ||
							isNumber(validaVacio(item.cd_fac))
						) {
							alert('completar');
						} else {
							item.cd_pre = item.cd_preX;
							$scope.itemListCompras.push(item);
							$rootScope.clearItems();
						}
					};

					$scope.eliminarItem = function(index) {
						$scope.itemListCompras.splice(index, 1);
					};

					$scope.getServiciosTotal = function() {
						var total = 0;
						if ($scope.infoInputs.td_id != 'IV') {
							if ($scope.infoInputs.td_id != 'DN') {
								for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
									if ($scope.itemListCompras[i].pro_pad == '2') {
										total =
											total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
									}
								}
								return total;
							} else {
								return 0;
							}
						} else {
							return 0;
						}
					};

					$scope.getTotalPercepcion = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
							if ($scope.itemListCompras[i].pro_tip == '0') {
								total = total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
							}
						}
						return total;
					};

					$scope.getPrecioBruto = function(val) {
						if (val.cd_ina == '0') {
							let total = 0;
							total = total + parseFloat(val.cd_pre / $scope.valorIgvConvertido);
							return total;
						}
						if (val.cd_ina == '1') {
							let total = 0;
							total = total + parseFloat(val.cd_pre);
							return total;
						}
					};

					$scope.getMontoTotal = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
							total = total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
						}
						return total;
					};

					$scope.getMontoDescuento = 0;

					$scope.getMontoTotalAfecto = function() {
						var total = 0;
						if ($scope.infoInputs.td_id != 'IV') {
							if ($scope.infoInputs.td_id != 'DN') {
								for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
									if ($scope.itemListCompras[i].cd_ina == '0') {
										total =
											total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
									}
								}
							}
						}
						return total;
					};
					$scope.eliminarItem = function(index) {
						$scope.itemListCompras.splice(index, 1);
					};
					$scope.guardarOrdenCompra = function() {
						var $adver = [];
						let sendObj = JSON.stringify({
							info: [ $scope.infoInputs ],
							items: $scope.itemListCompras
						});
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/insert2TablesOrdenCompra/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=compra`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Venta', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.loadBtnFilters();
									$rootScope.chageDatatableCompra();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$rootScope.realizarCobro = function(documentos) {
			// pago de factura individual
			$rootScope.checkOptionsSelected = [ documentos ];
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/compras/formulario-de-transaccion-cobro-facturas.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $rootScope, $http) {
					$scope.rr = [];
					$scope.units = [];
					$scope.infoInputs = {};

					$rootScope.putTotalOperacion = function(i, v, k) {
						function isNumber(x) {
							if (isNaN(x)) {
								return 0;
							}
							return parseInt(x);
						}
						var y = isNumber(parseFloat(i));
						var b = isNumber(parseFloat(v));
						var k = isNumber(parseFloat(k));

						return (y + b - k) * -1;
					};
					$scope.rr.fp_id = {
						selectId: 'fp_id',
						db: 'tipos_pago',
						where: 'tp_est',
						key: '0',
						mostrar: [ 'id_tp', 'tp_nom' ]
					};

					$scope.rr.ban_id = {
						selectId: 'ban_id',
						db: 'getbancoscuenta',
						where: 'ban_id',
						key: '',
						mostrar: [ 'ban_id', 'banco' ]
					};

					$scope.rr.cc_id = {
						selectId: 'cc_id',
						db: 'centro_costo',
						where: 'cc_id',
						key: '',
						mostrar: [ 'cc_id', 'cc_des' ]
					};

					$rootScope.buscarOption = function(param) {
						switch (typeof param) {
							case 'string':
								var obj = JSON.parse(param);
								break;
							case 'object':
								var obj = param;
								break;
							default:
								break;
						}

						/*  if (obj.key === "miEmpresa") {
                                                    obj.key = miEmpresa
                                                } else {
                                                    obj.key = obj.key
                                                } */

						var arr = obj.selectId;

						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse(
									$rootScope.d.datos
								).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
							)
							.then(function(response) {
								var options = response.data.data;
								$scope.units[arr] = [];
								$.each(options, function(i, val) {
									$scope.units[arr].push({
										id: val[obj.mostrar[0]],
										label: val[obj.mostrar[1]]
									});
								});
								return $scope.units[arr];
							});
					};

					$scope.checkOptionsSelected = $rootScope.checkOptionsSelected;
					$scope.ok = function(e, total) {
						for (var i = 0, len = $scope.checkOptionsSelected.length; i < len; i++) {
							var rr = {
								emp_id: JSON.parse($rootScope.d.datos).emp_id,
								to_id: 16,
								pag_fecpag: $scope.infoInputs.pag_fecpag,
								pag_fecreg: new Date(),
								ane_id: 6,
								ban_id: $scope.infoInputs.ban_id,
								pag_numope: $scope.infoInputs.pag_num,
								cc_id: $scope.infoInputs.cc_id,
								pag_tot: $scope.checkOptionsSelected[i].montoCobrar,
								usu_id: JSON.parse($rootScope.d.datos).usu_id,
								pa_com_id: $scope.checkOptionsSelected[i].com_id,
								proveedor: $scope.checkOptionsSelected[i].ane_nom
							};

							let sendObj = JSON.stringify({ info: [ rr ] });

							var xmlhttp = new XMLHttpRequest();
							var theUrl = `../../../../api/insertCobroFactura/create.php?getdb=${JSON.parse(
								$rootScope.d.datos
							).database}&tbnom=cobro`;
							xmlhttp.open('post', theUrl);
							xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
							xmlhttp.withCredentials = true;
							xmlhttp.send(sendObj);
							xmlhttp.onload = (response) => {
								alert(response);
							};
						}
						$uibModalInstance.close();
						e.stopPropagation();
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.realizarPagos = function(checkOptions) {
			$rootScope.checkOptions = checkOptions;
			var onlytrue = [];
			$.each($rootScope.checkOptions, function(i, v) {
				if (v == true) {
					onlytrue.push(parseInt(i));
				}
			});
			$rootScope.checkOptionsSelected = onlytrue;
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/compras/formulario-de-transaccion-pagar-facturas.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $rootScope) {
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$rootScope.realizarPagosIn = function(documentos) {
			// pago de factura individual
			$rootScope.checkOptionsSelected = [ documentos ];
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/compras/formulario-de-transaccion-pagar-facturas.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $rootScope, $http, toaster) {
					$scope.rr = [];
					$scope.units = [];
					$scope.infoInputs = {};
					$scope.rr.fp_id = {
						selectId: 'fp_id',
						db: 'tipos_pago',
						where: 'tp_est',
						key: '0',
						mostrar: [ 'id_tp', 'tp_nom' ]
					};
					$scope.rr.ban_id = {
						selectId: 'ban_id',
						db: 'getbancoscuenta',
						where: 'ban_id',
						key: '',
						mostrar: [ 'ban_id', 'banco' ]
					};
					$scope.rr.cc_id = {
						selectId: 'cc_id',
						db: 'centro_costo',
						where: 'cc_id',
						key: '',
						mostrar: [ 'cc_id', 'cc_des' ]
					};

					$rootScope.buscarOption = function(param) {
						switch (typeof param) {
							case 'string':
								var obj = JSON.parse(param);
								break;
							case 'object':
								var obj = param;
								break;
							default:
								break;
						}

						/*  if (obj.key === "miEmpresa") {
                                                    obj.key = miEmpresa
                                                } else {
                                                    obj.key = obj.key
                                                } */

						var arr = obj.selectId;
						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse(
									$rootScope.d.datos
								).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
							)
							.then(function(response) {
								var options = response.data.data;
								$scope.units[arr] = [];
								$.each(options, function(i, val) {
									$scope.units[arr].push({
										id: val[obj.mostrar[0]],
										label: val[obj.mostrar[1]]
									});
								});
								return $scope.units[arr];
							});
					};
					$scope.checkOptionsSelected = $rootScope.checkOptionsSelected;
					$scope.arrayconvertidordemontosparapagar = [];

					console.log($scope.checkOptionsSelected[0].com_dt);

					if ($scope.checkOptionsSelected[0].com_dt == 0) {
						var nro = 1;
					} else if ($scope.checkOptionsSelected[0].com_dt >= 1) {
						var nro = 2;
					}

					for (let i = 0; i < nro; i++) {
						if (i == 1) {
							var to_id_val = 17;
						} else if (i == 0) {
							var to_id_val = 15;
						}
						var arr = {
							det_com_id: $scope.checkOptionsSelected[0].det_com_id,
							totalcompra: $scope.checkOptionsSelected[0].totalcompra,
							almacenado: $scope.checkOptionsSelected[0].almacenado,
							pa_com_id: $scope.checkOptionsSelected[0].pa_com_id,
							TotalPago: $scope.checkOptionsSelected[0].TotalPago,
							Documentos: $scope.checkOptionsSelected[0].Documentos,
							com_fecdoc: $scope.checkOptionsSelected[0].com_fecdoc,
							com_id: $scope.checkOptionsSelected[0].com_id,
							ane_alias: $scope.checkOptionsSelected[0].ane_alias,
							alm_id: $scope.checkOptionsSelected[0].alm_id,
							alm_nom: $scope.checkOptionsSelected[0].alm_nom,
							to_nom: $scope.checkOptionsSelected[0].to_nom,
							com_dt: $scope.checkOptionsSelected[0].com_dt,
							com_dom_pro: $scope.checkOptionsSelected[0].com_dom_pro,
							td_id: $scope.checkOptionsSelected[0].td_id,
							import_cc: $scope.checkOptionsSelected[0].import_cc,
							cen_com_id: $scope.checkOptionsSelected[0].cen_com_id,
							cantidad: $scope.checkOptionsSelected[0].cantidad,
							detraccion: $scope.checkOptionsSelected[0].detraccion,
							tipo_pago: i,
							to_id: to_id_val
						};
						$scope.arrayconvertidordemontosparapagar.push(arr);
					}

					//tipo_pago 0 pagos normales
					//tipo_pago 1 pago de detraccion

					$scope.ok = function(e, total) {
						for (let i = 0; i < $scope.arrayconvertidordemontosparapagar.length; i++) {
							var rr = {
								emp_id: JSON.parse($rootScope.d.datos).emp_id,
								to_id: $scope.arrayconvertidordemontosparapagar[i].to_id,
								pag_fecpag: $scope.infoInputs.pag_fecpag,
								pag_fecreg: new Date(),
								ane_id: 6,
								ban_id: $scope.infoInputs.ban_id,
								pag_numope: $scope.infoInputs.pag_num,
								cc_id: $scope.infoInputs.pag_num,
								pag_tot: $scope.arrayconvertidordemontosparapagar[i].montoPagar,
								usu_id: JSON.parse($rootScope.d.datos).usu_id,
								pa_com_id: $scope.arrayconvertidordemontosparapagar[i].com_id
							};
							let sendObj = JSON.stringify({ info: [ rr ] });
							var xmlhttp = new XMLHttpRequest();
							var theUrl = `../../../../api/insertPagos/create.php?getdb=${JSON.parse($rootScope.d.datos)
								.database}&tbnom=pago`;
							xmlhttp.open('post', theUrl);
							xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
							xmlhttp.withCredentials = true;
							xmlhttp.send(sendObj);
							xmlhttp.onload = (response) => {
								$rootScope.loadBtnFilters();
								$rootScope.chageDatatableCompra();
								toaster.pop('success', 'Pago', 'Pago Guardado');
							};
						}
						$uibModalInstance.close();
						e.stopPropagation();
					};

					$scope.cancel = function(e) {
						$rootScope.loadBtnFilters();
						$rootScope.chageDatatableCompra();
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.realizarPagosCl = function(identifiquer) {
			$aside.open({
				templateUrl:
					'STANDARD/assets/sistem-views/compras/formulario-de-transaccion-pagar-facturas-por-cliente.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $rootScope) {
					$scope.proveedorId = identifiquer;
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.notadecredito = function(row) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/compras/formulario-de-transaccion-nota-de-credito.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $http) {
					$scope.infoInputs = {};
					$http
						.post(
							`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
								.database}&tbnom=compra&where=com_id&igual=${row.com_id}`
						)
						.then(function(response) {
							$.each(response.data.data, function(i, v) {
								$scope.infoInputs = v;
							});

							$scope.infoInputs.compraAsociada = true;
							$scope.infoInputs.com_clas_bien = row.com_clas_bien;
							$scope.infoInputs.com_dom_pro = row.com_dom_pro;
							$scope.infoInputs.com_doc_aso = row.com_id;
							$scope.infoInputs.td_id = 'NC';
							$scope.infoInputs.mnd_id = 'PEN';
							$scope.infoInputs.to_id = 10;

							$http
								.post(
									`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse(
										$rootScope.d.datos
									).database}&tbnom=anexo&where=ane_id&igual=${$scope.infoInputs.ane_id}`
								)
								.then(function(response) {
									$.each(response.data.data, function(i, v) {
										$scope.infoInputs.ane_alias = v.ane_alias;
									});
								});
						});

					// se verifica si es una documento asociado o un documento unico
					$scope.docOrigin = true;
					if ($scope.infoInputs.com_doc_aso) {
						$scope.docOrigin = false;
					} else {
						$scope.docOrigin = true;
					}

					$scope.infoInputs.usu_id = JSON.parse($rootScope.d.datos).usu_id;
					$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
					$scope.infoInputs.ofi_id = JSON.parse($rootScope.d.datos).ofi_id;
					$scope.infoInputs.ane_id = $scope.infoInputs.select_ane_id;

					$scope.infoInputs.com_per = '0';
					$scope.infoInputs.com_isc = '0';
					$scope.units = {};
					$scope.rr = [];
					$scope.valorIgvConvertido = 1.18;
					$scope.mySessionEmpresa = [];
					$scope.mySessionEmpresa.emp_igv = 18;
					let misDecimales = 2;
					$scope.miDetraccionMonto = 700;

					$scope.rr.td_id = {
						selectId: 'td_id',
						db: 'tipo_operacion_td',
						where: 'to_id',
						key: 1,
						mostrar: [ 'td_id', 'td_id' ]
					};

					$scope.rr.mnd_id = {
						selectId: 'mnd_id',
						db: 'moneda',
						where: 'mnd_id',
						key: '',
						mostrar: [ 'mnd_id', 'mnd_id' ]
					};

					$scope.rr.alm_id = {
						selectId: 'alm_id',
						db: 'almacen_info',
						where: 'emp_id',
						key: '',
						mostrar: [ 'alm_id', 'alm_nom' ]
					};

					$scope.rr.tdc_id = {
						selectId: 'tdc_id',
						db: 'tabla_sunat_contabilidad',
						where: 'tsc_cod',
						key: 30,
						mostrar: [ 'tsc_id', 'tsc_des' ]
					};

					$scope.rr.are_id = {
						selectId: 'are_id',
						db: 'areas',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'are_des' ]
					};

					$rootScope.buscarOption = function(param) {
						switch (typeof param) {
							case 'string':
								var obj = JSON.parse(param);
								break;
							case 'object':
								var obj = param;
								break;
							default:
								break;
						}

						var arr = obj.selectId;
						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse(
									$rootScope.d.datos
								).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
							)
							.then(function(response) {
								var options = response.data.data;
								$scope.units[arr] = [];
								$.each(options, function(i, val) {
									$scope.units[arr].push({
										id: val[obj.mostrar[0]],
										label: val[obj.mostrar[1]]
									});
								});
								return $scope.units[arr];
							});
					};

					$scope.arry = [];
					$scope.itemListCompras = [];
					$http
						.post(
							`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
								.database}&tbnom=detalle_compra_det&where=det_com_id&igual=${row.com_id}`
						)
						.then(function(response) {
							$scope.itemListCompras.push(response.data.data);
						});

					setTimeout(() => {
						$scope.movimientosList = [];
						$scope.itemSolo = [];

						for (let i = 0; i < $scope.itemListCompras[0].length; i++) {
							$scope.itemSolo[i] = [];
							$scope.movimientosList[i] = [];
							$scope.itemSolo[i].push($scope.itemListCompras[0][i]);

							$http
								.post(
									`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse(
										$rootScope.d.datos
									).database}&tbnom=movimiento_almacen_stock&where=com_id&igual=${$scope
										.itemListCompras[0][i].com_id}`
								)
								.then(function(response) {
									$scope.movimientosList[i].push(response.data.data);
								});

							var newArry = [
								{
									head: $scope.itemSolo[i],
									movi: $scope.movimientosList[i]
								}
							];
							$scope.arry.push(newArry);
						}
						console.log($scope.arry);
					}, 250);

					$scope.eliminarItem = function(index) {
						$scope.itemListCompras.splice(index, 1);
					};

					$scope.getServiciosTotal = function() {
						var total = 0;
						if ($scope.infoInputs.td_id != 'IV') {
							if ($scope.infoInputs.td_id != 'DN') {
								for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
									if ($scope.itemListCompras[i].pro_pad == '2') {
										total =
											total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
									}
								}
								return total;
							} else {
								return 0;
							}
						} else {
							return 0;
						}
					};

					$scope.getTotalPercepcion = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
							if ($scope.itemListCompras[i].pro_tip == '0') {
								total = total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
							}
						}
						return total;
					};

					$scope.getPrecioBruto = function(val) {
						if (val.cd_ina == '0') {
							let total = 0;
							total = total + parseFloat(val.cd_pre / $scope.valorIgvConvertido);
							return total;
						}
						if (val.cd_ina == '1') {
							let total = 0;
							total = total + parseFloat(val.cd_pre);
							return total;
						}
					};

					$scope.getMontoTotal = function() {
						var total = 0;
						for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
							total = total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
						}
						return total;
					};

					$scope.getMontoDescuento = 0;

					$scope.getMontoTotalAfecto = function() {
						var total = 0;
						if ($scope.infoInputs.td_id != 'IV') {
							if ($scope.infoInputs.td_id != 'DN') {
								for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
									if ($scope.itemListCompras[i].cd_ina == '0') {
										total =
											total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
									}
								}
							}
						}
						return total;
					};

					$scope.getMontoTotalInafecto = function() {
						var total = 0;
						if ($scope.infoInputs.td_id != 'IV') {
							if ($scope.infoInputs.td_id != 'DN') {
								for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
									if ($scope.itemListCompras[i].cd_ina == '1') {
										total =
											total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
									}
								}
							}
						}
						if ($scope.infoInputs.td_id == 'IV') {
							for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
								total = total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
							}
						}
						if ($scope.infoInputs.td_id == 'DN') {
							for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
								total = total + $scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre;
							}
						}
						return total;
					};

					$scope.getMontoIgv = function(val) {
						if ($scope.infoInputs.td_id != 'IV') {
							if ($scope.infoInputs.td_id != 'DN') {
								var total =
									parseFloat(val / $scope.valorIgvConvertido) *
									(parseFloat($scope.mySessionEmpresa.emp_igv) / 100);
								return total;
							} else {
								return 0;
							}
						} else {
							return 0;
						}
					};
					$scope.getMontoISC = function() {
						var total = 0;
						if ($scope.infoInputs.td_id != 'IV') {
							if ($scope.infoInputs.td_id != 'DN') {
								for (var i = 0, len = $scope.itemListCompras.length; i < len; i++) {
									if ($scope.itemListCompras[i].cd_isc > 0)
										total =
											total +
											parseFloat(
												$scope.itemListCompras[i].cd_can * $scope.itemListCompras[i].cd_pre
											) *
												($scope.itemListCompras[i].cd_isc / 100);
								}
								return total;
							} else {
								return 0;
							}
						} else {
							return 0;
						}
					};

					$scope.guardarNotaCredito = function() {
						var $adver = [];
						let sendObj = JSON.stringify({
							info: [ $scope.infoInputs ],
							items: $scope.arry
						});
						console.log(sendObj);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/insert2TablesNotaCredito/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=compra`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$rootScope.notadecreditoVenta = function(row) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/ventas/registro-formulario-nota-credito-venta.html',
				placement: 'top',
				size: 'lg',
				backdrop: true,
				controller: function(
					$scope,
					$rootScope,
					$uibModalInstance,
					$window,
					getBuscarOptionsSelect,
					getResources,
					getserialesdecomprobantes,
					$http
				) {
					$scope.baserow = row;
					$scope.infoInputs = {};
					$scope.units = {};
					$scope.rr = {};

					$scope.fetchHeader = function(content) {
						let obj = { db: 'venta', where: 'ven_id', key: content.id };
						getResources.fetchResources(obj).then(
							function(d) {
								let row = d.data[0];

								$scope.infoInputs = row;
								$scope.infoInputs.base_td_id = row.td_id;
								$scope.infoInputs.td_id = 'NC';

								$scope.infoInputs.usu_id = JSON.parse($rootScope.d.datos).usu_id;
								$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
								$scope.infoInputs.loc_id = JSON.parse($rootScope.d.datos).ofi_id;

								$scope.infoInputs.docRelacionado = true;
								$scope.infoInputs.estatus_documento = 1;

								$scope.infoInputs.documento_asociado = content.cen_ven_id;
								$scope.infoInputs.ane_id = content.ane_id;
								$scope.infoInputs.ane_alias = content.cliente;
								$scope.infoInputs.NumDocfectado = content.documentosunat;

								$scope.infoInputs.mnd_id = 'PEN';
								$scope.infoInputs.to_id = 9;
								$scope.infoInputs.tipo_ope_sunat = 9;

								$scope.infoInputs.ven_fecreg = fechahoy;
								$scope.infoInputs.ven_fecemi = fechahoy;
								$scope.infoInputs.ven_fecven = sumarDias(fechahoy, 30);

								$scope.infoInputs.notas_sunat = 0;
								let ser =
									$scope.baserow.td_id == 'FA'
										? { id: '4', td_id: 'NC', tds_ser: 'FC01' }
										: { id: '32', td_id: 'NC', tds_ser: 'BB01' };
								$scope.infoInputs.ven_serSel = ser;
							},
							function(Error) {
								console.error(Error);
							}
						);
					};

					$scope.fetchDetalle = function(id) {
						let obj = { db: 'detalle_venta_det', where: 'venta_id', key: id };
						getResources.fetchResources(obj).then(
							function(d) {
								$scope.itemListVentas = d.data;
							},
							function(Error) {
								console.error(Error);
							}
						);
					};

					$scope.serializador = function(serie) {
						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/search3.php?getdb=${JSON.parse(
									$rootScope.d.datos
								).database}&tbnom=tipo_documento_serie&s=NC&key=td_id&where=emp_id&igual=${JSON.parse(
									$rootScope.d.datos
								).emp_id}&where2=ofi_id&igual2=1`
							)
							.then(function(response) {
								setTimeout(() => {
									$scope.infoInputs.ven_serSel = $scope.serialSelector[0];
								}, 150);
								return ($scope.serialSelector = response.data.data);
							});
					};

					$scope.buscarOptionSelect = function(arr) {
						getBuscarOptionsSelect.fetchOptions(arr).then(
							function(respuesta) {
								$scope.units[arr.selectId] = [];
								$.each(respuesta, function(i, val) {
									$scope.units[arr.selectId].push({
										id: val[arr.mostrar[0]],
										label: val[arr.mostrar[1]]
									});
								});
								return $scope.units[arr];
							},
							function(errResponse) {
								console.error('Error Select:' + errResponse);
							}
						);
						return $scope.units[arr];
					};
					let f = new Date();
					let ano = f.getFullYear();
					let mes = f.getMonth();
					let dia = f.getDate();

					let fechahoy = new Date(ano, mes, dia);

					function sumarDias(fecha, dias) {
						fecha = new Date(fecha);
						fecha.setDate(fecha.getDate() + dias);
						return fecha;
					}

					//cabezera de la venta

					$scope.fetchHeader(row);
					$scope.fetchDetalle(row.ven_id);

					$scope.rr.mnd_id = {
						selectId: 'mnd_id',
						db: 'moneda',
						where: 'mnd_id',
						key: '',
						mostrar: [ 'mnd_id', 'mnd_id' ]
					};
					$scope.rr.cd_alm = {
						selectId: 'cd_alm',
						db: 'almacen_info',
						where: 'loc_id',
						key: '',
						mostrar: [ 'alm_id', 'alm_nom' ]
					};
					$scope.rr.lp_id = {
						selectId: 'lp_id',
						db: 'lista_precio_list',
						where: 'lp_id',
						key: '',
						mostrar: [ 'lp_id', 'lp_nom' ]
					};
					$scope.rr.CodMotivo = {
						selectId: 'CodMotivo',
						db: 'sunat_nota_creditoelectronica',
						where: 'cod',
						key: '',
						mostrar: [ 'cod', 'descripcion' ],
						panel: 'nubefaco_nubefapanel'
					};

					$scope.guardarNotaCredito = function() {
						var $adver = [];
						let sendObj = JSON.stringify({
							info: [ $scope.infoInputs ],
							items: $scope.itemListVentas
						});
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/insert2TablesVenta/notaCreditoVenta.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=venta`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);
								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									let ultimoIngreso = JSON.parse($adver[0]);
									toaster.pop('success', 'Nota de Crédito', 'Documento Guardado');
									$uibModalInstance.close();
									$window.open(
										`${$rootScope.miURL}/compass/view/documento-A4.php?emp_id=${JSON.parse(
											$rootScope.d.datos
										).emp_id}&getdb=${JSON.parse($rootScope.d.datos)
											.database}&nro=${ultimoIngreso[0].ultimo}`
									);
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$rootScope.reloadDataVenta();
						};
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
						$rootScope.reloadDataVenta();
					};
				}
			});
		};
		$rootScope.asientoDetalle = function(documentos) {
			$rootScope.cabeceraAsiento = documentos;
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/contabilidad/detalleasiento.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $rootScope, $http) {
					$scope.rr = [];
					$scope.units = [];
					$scope.infoInputs = {};
					$scope.infoInputs.nro_asiento = $rootScope.cabeceraAsiento.Nroasiento;
					$scope.infoInputs.documents = $rootScope.cabeceraAsiento.Documento;
					$scope.infoInputs.mnd = $rootScope.cabeceraAsiento.Moneda;
					$scope.infoInputs.fecha = $rootScope.cabeceraAsiento.Fecha;
					$scope.infoInputs.usu = $rootScope.cabeceraAsiento.ane_razsoc;
					$scope.infoInputs.tdp =
						$rootScope.cabeceraAsiento.tip_asi + ' ' + $rootScope.cabeceraAsiento.to_nom;

					$scope.checkOptionsSelected = $rootScope.checkOptionsSelected;
					$scope.ok = function(e, total) {
						$uibModalInstance.close();
						e.stopPropagation();
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$rootScope.compraDetalle = function(documentos) {
			$rootScope.cabeceraAsiento = documentos;
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/compras/detallecompra.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $rootScope, $http) {
					$scope.rr = [];
					$scope.units = [];
					$scope.infoInputs = {};
					$scope.infoInputs.nro_asiento = $rootScope.cabeceraAsiento.Nroasiento;
					$scope.infoInputs.documents = $rootScope.cabeceraAsiento.Documento;
					$scope.infoInputs.mnd = $rootScope.cabeceraAsiento.Moneda;
					$scope.infoInputs.mnd = $rootScope.cabeceraAsiento.Moneda;
					$scope.infoInputs.fecha = $rootScope.cabeceraAsiento.Fecha;
					$scope.infoInputs.usu = $rootScope.cabeceraAsiento.ane_razsoc;
					$scope.infoInputs.tdp = $rootScope.cabeceraAsiento.to_nom;

					$scope.checkOptionsSelected = $rootScope.checkOptionsSelected;

					$scope.ok = function(e, total) {
						$uibModalInstance.close();
						e.stopPropagation();
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};

		$rootScope.ventaDetalle = function(documentos) {
			$rootScope.cabeceraAsiento = documentos;
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/ventas/venta-detalle.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $rootScope, $http) {
					$scope.rr = [];
					$scope.units = [];
					$scope.infoInputs = {};
					$scope.infoInputs.nro_asiento = $rootScope.cabeceraAsiento.Nroasiento;
					$scope.infoInputs.documents = $rootScope.cabeceraAsiento.Documento;
					$scope.infoInputs.mnd = $rootScope.cabeceraAsiento.Moneda;
					$scope.infoInputs.mnd = $rootScope.cabeceraAsiento.Moneda;
					$scope.infoInputs.fecha = $rootScope.cabeceraAsiento.Fecha;
					$scope.infoInputs.usu = $rootScope.cabeceraAsiento.ane_razsoc;
					$scope.infoInputs.tdp = $rootScope.cabeceraAsiento.to_nom;

					$scope.checkOptionsSelected = $rootScope.checkOptionsSelected;
					$scope.ok = function(e, total) {
						$uibModalInstance.close();
						e.stopPropagation();
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});

			$scope.printDiv = function(divName) {
				var printContents = document.getElementById(divName).innerHTML;
				var popupWin = window.open('', '_blank', 'width=300,height=300');
				popupWin.document.open();
				popupWin.document.write(
					'<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' +
						printContents +
						'</body></html>'
				);
				popupWin.document.close();
			};
		};

		$rootScope.compraDetalle2 = function(documentos) {
			$rootScope.cabeceraCompra = documentos;
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/compras/compradetalle2.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $rootScope, $http) {
					$scope.rr = [];
					$scope.units = [];
					$scope.infoInputs = {};
					// $scope.infoInputs.nro_asiento = $rootScope.cabeceraCompra.Nroasiento;
					// $scope.infoInputs.documents = $rootScope.cabeceraCompra.Documento;
					// $scope.infoInputs.mnd = $rootScope.cabeceraCompra.Moneda;
					// $scope.infoInputs.mnd = $rootScope.cabeceraCompra.Moneda;
					// $scope.infoInputs.fecha = $rootScope.cabeceraCompra.Fecha;
					// $scope.infoInputs.usu = $rootScope.cabeceraCompra.ane_razsoc;
					// $scope.infoInputs.tdp = $rootScope.cabeceraCompra.to_nom;

					$scope.checkOptionsSelected = $rootScope.checkOptionsSelected;
					$scope.ok = function(e, total) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.pagosDetalleCompraPdf = function(e) {
						e.stopPropagation();
						var obj = {
							cabecera: $rootScope.cabeceraCompra.Documento
						};
						$http.post('compass/formatos-pdf/pago.php', obj).then(function(reponse) {
							console.log(response);
						});
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};

		$rootScope.notadecredito = $scope.notadecredito;
		$scope.proveedor = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/compras/formulario-de-registro-proveedor.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $http, $location, toaster, $rootScope, getResources) {
					var dir = $location.$$url;

					$scope.cacheStorage = localStorage.getItem('cache');
					$scope.cache = JSON.parse($scope.cacheStorage);

					//verificar la direccion de redireccion
					if (dir == '/app/compras/proveedores') {
						$scope.cacheStorage = localStorage.removeItem('cache');
						$scope.cache = { redir: '/app/compras/proveedores' };
					}

					$scope.getDocumento = function(typeDocument, nro) {
						var dt = [];
						var DOMINIO = 'compass/peru-consult-api/public/';

						var API = '';
						if (typeDocument == '11') {
							//ruc case
							API = 'dni.php';
						} else if (typeDocument == '23') {
							//dni case
							API = 'ruc2.php';
						}
						var PATH = DOMINIO + API + '?nro=' + nro;
						fetch(PATH)
							.then((response) => {
								return response.json();
							})
							.then(function(data) {
								if (typeDocument == '11') {
									$scope.$apply(function() {
										$scope.infoInputs.ane_razsoc = '';
										$scope.infoInputs.ane_nom = data.nombres;
										$scope.infoInputs.ane_apepat = data.apellidoPaterno;
										$scope.infoInputs.ane_apemat = data.apellidoMaterno;
										$scope.infoInputs.ane_alias = `${data.nombres}`;
									});
								}
								if (typeDocument == '23') {
									$scope.$apply(function() {
										$scope.infoInputs.ane_nom = '';
										$scope.infoInputs.ane_apepat = '';
										$scope.infoInputs.ane_apemat = '';
										$scope.infoInputs.ane_razsoc = data.razonSocial;
										$scope.infoInputs.ane_alias = `${data.razonSocial}`;
										$scope.infoInputs.ane_dir = data.direccion;
										$scope.infoInputs.ubi_id = data.ubi_id;
										$scope.infoInputs.buscarubigeo = `${data.departamento}-${data.provincia}-${data.distrito}`;
									});
								}
							})
							.catch((error) => console.log('Request failed:', error));
						if (typeDocument == '11') {
							//ruc case
							API = 'dni.php';
						} else if (typeDocument == '23') {
							//dni case
							console.log(dt);
						}
					};
					//zona de existencia de una edicion
					if (identifiquer) {
						$scope.fetchResources = function(id) {
							let obj = { db: 'getproveedores', where: 'ane_id', key: id };
							getResources.fetchResources(obj).then(
								function(d) {
									$scope.infoInputs = d.data[0];
									$scope.infoInputs.btnUpdate = false;
								},
								function(errResponse) {
									console.error('Error while fetching Currencies');
								}
							);
						};
						$scope.fetchResources(identifiquer.ane_id);
					} else {
						$scope.infoInputs = {};
						$scope.infoInputs.ane_tipo_cp = 2;
						$scope.infoInputs.btnUpdate = true;
					}

					$scope.units = {};
					$scope.rr = [];
					$scope.rr.ane_tipdoc = {
						selectId: 'ane_tipdoc',
						db: 'tabla_sunat_contabilidad',
						where: 'tsc_cod',
						key: '106',
						mostrar: [ 'id', 'tsc_des' ]
					};
					$scope.rr.ane_banco = {
						selectId: 'ane_banco',
						db: 'bancos',
						where: 'ban_id',
						key: '',
						mostrar: [ 'ban_id', 'ban_des' ]
					};
					$scope.buscarDoc = function(val) {
						switch (val) {
							case '11':
								alert('buscar dni');
								break;

							case '23':
								alert('buscar ruc');
								break;

							default:
								break;
						}
					};
					$scope.buscarOption = function(param) {
						switch (typeof param) {
							case 'string':
								var obj = JSON.parse(param);
								break;
							case 'object':
								var obj = param;
								break;
							default:
								break;
						}
						var arr = obj.selectId;
						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse(
									$rootScope.d.datos
								).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
							)
							.then(function(response) {
								var options = response.data.data;
								$scope.units[arr] = [];
								$.each(options, function(i, val) {
									$scope.units[arr].push({
										id: val[obj.mostrar[0]],
										label: val[obj.mostrar[1]]
									});
								});
								return $scope.units[arr];
							});
					};
					$scope.guardarProveedor = function(e) {
						let sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=anexo`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							$rootScope.reloadDataProveedor();
						};
						$uibModalInstance.dismiss();
						e.stopPropagation();
						toaster.pop('success', 'Proveedor', 'Datos Grabados');
					};
					$scope.actualizarProveedor = function(e) {
						let sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/updateGen.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=anexo&identifiquer=ane_id&identifiquerValue=${$scope.infoInputs.ane_id}`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							$rootScope.reloadDataProveedor();
						};
						$uibModalInstance.dismiss();
						e.stopPropagation();
						toaster.pop('success', 'Proveedor', 'Datos Actualizados');
						/*                                                                                                      $uibModalInstance.close();
                                                                                                                                e.stopPropagation(); */
					};
					//redirecciones de compra con proveedores
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
						$rootScope.reloadDataProveedor();
						if ($scope.cache) {
							if ($scope.cache.redir == '/app/compras/proveedores') {
								$location.path('/app/compras/proveedores');
							} else if ($scope.cache.redir == '/app/compras/lista') {
								$location.path('/app/compras/formulario-compra');
								$rootScope.compra();
							} else if ($scope.cache.redir == '/app/compras/formulario-compra') {
								$location.path('/app/compras/formulario-compra');
								$rootScope.compra();
							}
						} else {
							console.log('continue proveedor');
						}
					};
				}
			});
		};

		$rootScope.nuevoproveedor = function(data) {
			$scope.proveedor(data);
		};

		$rootScope.nuevocliente = function(data) {
			$scope.cliente(data);
		};

		$scope.cliente = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/ventas/registro-formulario-cliente.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $http, $location, getResources, SweetAlert) {
					var dir = $location.$$url;

					$scope.cacheStorage = localStorage.getItem('cache');
					$scope.cache = JSON.parse($scope.cacheStorage);

					//verificar la direccion de redireccion
					if (dir == '/app/ventas/clientes') {
						$scope.cacheStorage = localStorage.removeItem('cache');
						$scope.cache = { redir: '/app/ventas/clientes' };
					}

					if (identifiquer) {
						$scope.fetchResources = function(id) {
							let obj = { db: 'getclientes', where: 'ane_id', key: id };
							getResources.fetchResources(obj).then(
								function(d) {
									$scope.infoInputs = d.data[0];
									$scope.infoInputs.btnUpdate = false;
								},
								function(errResponse) {
									console.error('Error while fetching Currencies');
								}
							);
						};
						$scope.fetchResources(identifiquer.ane_id);
					} else {
						$scope.infoInputs = {};
						$scope.infoInputs.ane_tipo_cp = 1;
						$scope.infoInputs.btnUpdate = true;
					}

					$scope.units = {};
					$scope.rr = [];

					$scope.rr.ane_tipdoc = {
						selectId: 'ane_tipdoc',
						db: 'tabla_sunat_contabilidad',
						where: 'tsc_cod',
						key: '106',
						mostrar: [ 'id', 'tsc_des' ]
					};
					$scope.rr.ane_banco = {
						selectId: 'ane_banco',
						db: 'bancos',
						where: 'ban_id',
						key: '',
						mostrar: [ 'ban_id', 'ban_des' ]
					};
					$scope.buscarDoc = function(val) {
						switch (val) {
							case '11':
								alert('buscar dni');
								break;

							case '23':
								alert('buscar ruc');
								break;

							default:
								break;
						}
					};
					$scope.buscarOption = function(param) {
						switch (typeof param) {
							case 'string':
								var obj = JSON.parse(param);
								break;
							case 'object':
								var obj = param;
								break;
							default:
								break;
						}
						var arr = obj.selectId;
						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse(
									$rootScope.d.datos
								).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
							)
							.then(function(response) {
								var options = response.data.data;
								$scope.units[arr] = [];
								$.each(options, function(i, val) {
									$scope.units[arr].push({
										id: val[obj.mostrar[0]],
										label: val[obj.mostrar[1]]
									});
								});
								return $scope.units[arr];
							});
					};
					$scope.getDocumento = function(typeDocument, nro) {
						var dt = [];
						var DOMINIO = 'compass/peru-consult-api/public/';

						var API = '';
						if (typeDocument == '11') {
							//ruc case
							API = 'dni.php';
						} else if (typeDocument == '23') {
							//dni case
							API = 'ruc2.php';
						}
						var PATH = DOMINIO + API + '?nro=' + nro;
						fetch(PATH)
							.then((response) => {
								return response.json();
							})
							.then(
								function(data) {
									if (typeDocument == '11') {
										$scope.$apply(function() {
											$scope.infoInputs.ane_razsoc = '';
											$scope.infoInputs.ane_nom = data.nombres;
											$scope.infoInputs.ane_apepat = data.apellidoPaterno;
											$scope.infoInputs.ane_apemat = data.apellidoMaterno;
											$scope.infoInputs.ane_alias = `${data.nombres}`;
										});
									}
									if (typeDocument == '23') {
										$scope.$apply(function() {
											$scope.infoInputs.ane_nom = '';
											$scope.infoInputs.ane_apepat = '';
											$scope.infoInputs.ane_apemat = '';
											$scope.infoInputs.ane_razsoc = data.razonSocial;
											$scope.infoInputs.ane_alias = data.razonSocial;
											$scope.infoInputs.ane_dir = data.direccion;
											$scope.infoInputs.ubi_id = data.ubi_id;
											$scope.infoInputs.buscarubigeo = `${data.departamento}-${data.provincia}-${data.distrito}`;
										});
									}
								}
								/* (data) => dt.push({ data }) */
							)
							.catch((error) => console.log('Request failed:', error));
						if (typeDocument == '11') {
							//ruc case
							API = 'dni.php';
						} else if (typeDocument == '23') {
							//dni case
							console.log(dt);
						}
					};
					$scope.guardarCliente = function(e) {
						let sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=anexo`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							$rootScope.reloadDataCliente();
						};
						$uibModalInstance.dismiss();
						e.stopPropagation();
						toaster.pop('success', 'Cliente', 'Cliente Guardado');
					};
					$scope.actualizarCliente = function(e) {
						let sendObj = JSON.stringify($scope.infoInputs);
						let xmlhttp = new XMLHttpRequest();
						let theUrl = `../../../../api/mantenimiento/mantenimiento/updateGen.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=anexo&identifiquer=ane_id&identifiquerValue=${$scope.infoInputs.ane_id}`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							toaster.pop('success', 'Cliente', 'Cliente Actualizado');
						};
						$rootScope.reloadDataCliente();
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
						if ($scope.cache) {
							if ($scope.cache.redir == '/app/ventas/clientes') {
								$location.path('app/ventas/clientes');
								$rootScope.reloadDataCliente();
							} else if ($scope.cache.redir == '/app/ventas/lista-ventas') {
								$location.path('/app/ventas/formulario-ventas');
								$rootScope.compra();
							} else if ($scope.cache.redir == '/app/ventas/formulario-ventas') {
								$location.path('/app/ventas/formulario-ventas');
								$rootScope.compra();
							}
						} else {
							console.log('continue Cliente');
							$rootScope.reloadDataCliente();
						}
					};
					/* 	$scope.cancel = function(e) {
						var cacheStorage = localStorage.getItem('cache');
						var cache = JSON.parse(cacheStorage);
						console.log(cache);
						$uibModalInstance.dismiss();
						e.stopPropagation();
						if (cache.redir == '/app/ventas/lista-ventas') {
							$location.path('/app/ventas/formulario-ventas');
						}
						if (cache.redir == '/app/ventas/formulario-ventas') {
							$location.path('/app/ventas/formulario-ventas');
							$rootScope.venta();
						}
					}; */
				}
			});
		};
		$scope.productoyservicio = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/inventarios/formulario-de-registro-productoyservicio.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.ok = function(e) {
						$uibModalInstance.close();
						$rootScope.newProductCreate();
					};
					$scope.ok1_1 = function(e) {
						$uibModalInstance.close();
						$rootScope.newProductoMedicCreate();
					};
					$scope.ok2 = function(e) {
						$uibModalInstance.close();
						$rootScope.newServiceCreate();
					};
					$scope.ok3 = function(e) {
						$uibModalInstance.close();
						$rootScope.newGastosCreate();
					};
					$scope.ok4 = function(e) {
						$uibModalInstance.close();
						$rootScope.newActivofijoCreate();
					};
					$scope.nuevoProducto = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};

		$scope.nuevolocal = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/empresa/formulario-de-registro-local.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};
					$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
					$scope.guardarLocal = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						console.log(sendObj);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=local`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataLocal();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarLocalycerrar = function(e) {
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=local`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
							e.stopPropagation();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevotpo_doc = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/empresa/formulario-de-registro-tpo_doc.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};
					$scope.guardartpoDoc = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipo_documento`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataTipoDoc();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardartpoDocycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipo_documento`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
						$scope.ok = function(e) {
							$uibModalInstance.close();
							e.stopPropagation();
						};
						$scope.cancel = function(e) {
							$uibModalInstance.dismiss();
							e.stopPropagation();
						};
					};
				}
			});
		};
		$scope.nuevotpo_suj = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/empresa/formulario-de-registro-tpo_suj.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardartpoSuj = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipo_sujeto`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataTipoSujeto();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardartpoSujycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipo_sujeto`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevotpo_soc = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/empresa/formulario-de-registro-tpo_soc.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};
					$scope.guardartpoSoc = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipo_socio`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataTipoSocio();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardartpoSocycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipo_socio`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevoareas = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/empresa/formulario-de-registro-areas.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};
					$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
					$scope.guardarArea = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						console.log(sendObj);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=areas`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataArea();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarAreaycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=areas`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
							e.stopPropagation();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevoalmacen = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/almacen/formulario-de-registro-almacen.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $http) {
					$scope.units = {};
					$scope.rr = [];
					$scope.infoInputs = {};
					$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;

					$scope.rr.loc_id = {
						selectId: 'loc_id',
						db: 'local',
						where: 'loc_id',
						key: '',
						mostrar: [ 'loc_id', 'loc_nom' ]
					};

					$rootScope.buscarOption = function(param) {
						switch (typeof param) {
							case 'string':
								var obj = JSON.parse(param);
								break;
							case 'object':
								var obj = param;
								break;
							default:
								break;
						}

						var arr = obj.selectId;
						$http
							.get(
								`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse(
									$rootScope.d.datos
								).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
							)
							.then(function(response) {
								var options = response.data.data;
								$scope.units[arr] = [];
								$.each(options, function(i, val) {
									$scope.units[arr].push({
										id: val[obj.mostrar[0]],
										label: val[obj.mostrar[1]]
									});
								});
								return $scope.units[arr];
							});
					};
					$scope.guardarAlm = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=almacen_info`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarAlmycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=almacen_info`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
							e.stopPropagation();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevoalinea = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/almacen/formulario-de-registro-linea.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarLinea = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=linea_linea`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarLineaycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=linea_linea`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
							e.stopPropagation();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevocategoria = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/almacen/formulario-de-registro-categoria.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarCategoria = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=categoria`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataCategoria();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarCategoriaycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=categoria`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
							e.stopPropagation();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevosub_categoria = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/almacen/formulario-de-registro-sub_categoria.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};
					$scope.infoInputs.cat_id = JSON.parse($rootScope.d.datos).cat_id;
					$scope.guardarSubcat = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						console.log(sendObj);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=subcategoria`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataSubCatego();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarSubcatycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=subcategoria`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevomarcas = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/almacen/formulario-de-registro-marcas.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarMarcas = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=marca`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataMarca();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarMarcasycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=marca`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.parametro = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/contabilidad/formulario-de-registro-parametro.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};
					$scope.guardarParametro = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=marca`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataMarca();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarParametroycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=marca`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevoaplicaciones = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/almacen/formulario-de-registro-aplicaciones.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarAplica = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=aplicacion`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataAplicacion();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarAplicaycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=aplicacion`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevopresentaciones = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/almacen/formulario-de-registro-presentacion.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarPresent = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=presentacion`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataPresentacion();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarPresentycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=presentacion`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevochoferes = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/almacen/formulario-de-registro-choferes.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};
					$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
					$scope.guardarChofer = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=chofer`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataChofer();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarChoferycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=chofer`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevovehiculos = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/almacen/formulario-de-registro-vehiculos.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};
					$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
					$scope.guardarVehiculo = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=vehiculo`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataVehiculo();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarVehiculoycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=vehiculo`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevobancos = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/finanzas/formulario-de-registro-bancos.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarBanco = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=bancos`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataBanco();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarBancoycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=bancos`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevoAsiento = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/contabilidad/formulario-de-registro-asientos.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevotpo_cambio = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/contabilidad/formulario-de-registro-tpo_cambio.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarTpoCam = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipo_cambio`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataTipoCambio();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarTpoCamycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipo_cambio`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevoctro_costo = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/contabilidad/formulario-de-registro-ctro_costo.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};
					$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
					$scope.guardarCenCos = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=centro_costo`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataCentroCosto();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarCenCosycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=centro_costo`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevocse_cta = function(identifiquer) {
			$aside.open({
				templateUrl:
					'STANDARD/assets/sistem-views/listas/contabilidad/formulario-de-registro-maestro-cse_cta.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevonvl_cta = function(identifiquer) {
			$aside.open({
				templateUrl:
					'STANDARD/assets/sistem-views/listas/contabilidad/formulario-de-registro-maestro-nvl_cta.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevopln_cta = function(identifiquer) {
			$aside.open({
				templateUrl:
					'STANDARD/assets/sistem-views/listas/contabilidad/formulario-de-registro-maestro-pln_cta.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarPlancta = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=plan_cuenta`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataPlanCuenta();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarPlanctaycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=plan_cuenta`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevotpo_asiento = function(identifiquer) {
			$aside.open({
				templateUrl:
					'STANDARD/assets/sistem-views/listas/contabilidad/formulario-de-registro-maestro-tpo_asiento.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarTpoAsien = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipo_asiento`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataTipoAsiento();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarTpoAsienycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipo_asiento`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevocta_bancos = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/finanzas/formulario-de-registro-cta_bancos.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarCtaBan = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=cuenta_banco`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataCtaBanco();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarCtaBanycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=cuenta_banco`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevotpo_cta_bancaria = function(identifiquer) {
			$aside.open({
				templateUrl:
					'STANDARD/assets/sistem-views/listas/finanzas/formulario-de-registro-tpo_cta_bancaria.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarTipCtaBan = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipo_cuenta`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataTipoCtaBan();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarTipCtaBanycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipo_cuenta`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevomtdo_pago = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/finanzas/formulario-de-registro-mtdo_pago.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarMedpago = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=forma_pago`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataMetodoPago();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarMedpagoycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=forma_pago`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevocategorias = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/personal/formulario-de-registro-categorias.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevotpo_hrs = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/personal/formulario-de-registro-tpo_hrs.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarTipoHora = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipo_horario`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataTipoHorario();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarTipoHoraycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipo_horario`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevorgmn_laboral = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/personal/formulario-de-registro-rgmn_laboral.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarRegimenL = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=regimen_laboral`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataRegimenLaboral();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarRegimenLycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=regimen_laboral`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevoconceptos = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/personal/formulario-de-registro-conceptos.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarConcepto = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=concepto_laboral`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataConceptos();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarConceptoycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=concepto_laboral`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevomtvs_baja = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/personal/formulario-de-registro-mtvs_baja.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarMtvB = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarMtvBycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevotpo_trbjadores = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/personal/formulario-de-registro-tpo_trbjadores.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevoctg_ocupacional = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/personal/formulario-de-registro-ctg_ocupacional.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevoocupaciones = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/personal/formulario-de-registro-ocupaciones.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevotpo_pago = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/personal/formulario-de-registro-tpo_pago.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarTpoPgo = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipos_pago`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataTipoPagos();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarTpoPgoycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipos_pago`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevostcion_educ = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/personal/formulario-de-registro-stcion_educ.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevobeneficios = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/personal/formulario-de-registro-beneficios.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarBenefi = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=politicas_beneficios_tipos`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataBeneficios();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarBenefiycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=politicas_beneficios_tipos`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevotpo_contratos = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/personal/formulario-de-registro-tpo_contratos.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarTpoContra = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipo_contrato`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataTipoContrato();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarTpoContraycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=tipo_contrato`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevosist_pensiones = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/personal/formulario-de-registro-sist_pensiones.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarSistPen = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=sistema_pension`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataSistPension();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarSistPenycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=sistema_pension`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevoprcent_aports = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/personal/formulario-de-registro-prcent_aports.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarPerAport = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarPerAportycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevolna_produccion = function(identifiquer) {
			$aside.open({
				templateUrl:
					'STANDARD/assets/sistem-views/listas/produccion/formulario-de-registro-lna_produccion.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};
					$scope.guardarLnapro = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=linea_produccion`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarLnaproycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=linea_produccion`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevolte_produccion = function(identifiquer) {
			$aside.open({
				templateUrl:
					'STANDARD/assets/sistem-views/listas/produccion/formulario-de-registro-lte_produccion.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarLotpro = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=dbo.lote_produccion`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarLotproycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=lote_produccion`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$scope.nuevosist_salud = function(identifiquer) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/personal/formulario-de-registro-sist_salud.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardarSistSal = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=sistema_salud`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataSistSalud();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardarSistSalycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=sistema_salud`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};

		$rootScope.reporteCompras = function(documentos) {
			$rootScope.cabeceraAsiento = documentos;
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/informe/reporte-registro-compra.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $rootScope, $http, getReportesReportes) {
					$scope.infoInputs = {};
					$scope.itemsRegistroCompra = [];
					$scope.buscarReporteCompra = function(desde, hasta) {
						getReportesReportes.fetchReporteCompra(desde, hasta).then(
							function(d) {
								$scope.showtable = true;
								$scope.itemsRegistroCompra = d;
							},
							function(errResponse) {
								$scope.showtable = false;
								console.error('Error while fetching Currencies');
							}
						);
						return this;
					};
					$scope.ok = function(e, total) {
						$uibModalInstance.close();
						e.stopPropagation();
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};

		$rootScope.reporteVentas = function(documentos) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/informe/reporte-registro-venta.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $rootScope, $http, getReportesReportes) {
					$scope.infoInputs = {};
					$scope.itemsRegistroVenta = [];
					$scope.buscarReporteVenta = function(desde, hasta) {
						getReportesReportes.fetchReporteVenta(desde, hasta).then(
							function(d) {
								$scope.showtable = true;
								$scope.itemsRegistroVenta = d;
							},
							function(errResponse) {
								$scope.showtable = false;
								console.error('Error while fetching Currencies');
							}
						);
						return this;
					};
					$scope.ok = function(e, total) {
						$uibModalInstance.close();
						e.stopPropagation();
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$rootScope.reportelibroCompras = function(documentos) {
			$rootScope.cabeceraAsiento = documentos;
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/listas/contabilidad/reporte-libro-electronico-compra.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $rootScope, $http) {
					$scope.ok = function(e, total) {
						$uibModalInstance.close();
						e.stopPropagation();
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$rootScope.reporteUtilidad = function() {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/informe/reporte-utilidad.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $rootScope, $http, getReportesReportes) {
					$scope.showtable = false;
					$scope.itemsRegistroUtilidad = [];
					$scope.buscarReporteUtilidad = function(id, desde, hasta) {
						getReportesReportes.fetchReporteUtilidad(id, desde, hasta).then(
							function(d) {
								$scope.showtable = true;
								$scope.itemsRegistroUtilidad = d;
							},
							function(errResponse) {
								$scope.showtable = false;
								console.error('Error while fetching Currencies');
							}
						);
						return this;
					};

					$scope.mostrarResultados = function() {
						let resultado = 0;
						$scope.itemsRegistroUtilidad.forEach((item) => {
							resultado += parseFloat(item.utilidad_neto);
						});
						return resultado;
					};

					$scope.ok = function(e, total) {
						$uibModalInstance.close();
						e.stopPropagation();
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$rootScope.reporteKardex = function() {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/informe/reporte-kardex.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $rootScope, $http, getReportesReportes) {
					$scope.showtable = false;
					$scope.itemsRegistroUtilidad = [];
					$scope.buscarReporteKardex = function() {
						getReportesReportes.fetchReporteKardex().then(
							function(d) {
								$scope.showtable = true;
								$scope.itemsRegistroUtilidad = d;
							},
							function(errResponse) {
								$scope.showtable = false;
							}
						);
						return this;
					};

					$scope.mostrarResultados = function() {
						let resultado = 0;
						$scope.itemsRegistroUtilidad.forEach((item) => {
							resultado += parseFloat(item.utilidad_neto);
						});
						return resultado;
					};

					$scope.ok = function(e, total) {
						$uibModalInstance.close();
						e.stopPropagation();
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
		$rootScope.reporteCosto = function(documentos) {
			$rootScope.cabeceraAsiento = documentos;
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/informe/reporte-registro-costo.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $rootScope, $http) {
					$scope.ok = function(e, total) {
						$uibModalInstance.close();
						e.stopPropagation();
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};

		$rootScope.reporteGeneralUtilidad = function() {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/informe/reporte-utilidad-general.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $rootScope, $http, getReportesReportes) {
					$scope.showtable = false;
					$scope.itemsRegistroUtilidad = [];
					$scope.buscarReporteUtilidadGeneral = function(desde, hasta) {
						getReportesReportes.fetchReporteUtilidadGeneral(desde, hasta).then(
							function(d) {
								$scope.showtable = true;
								$scope.itemsRegistroUtilidad = d;
							},
							function(errResponse) {
								$scope.showtable = false;
								console.error('Error while fetching Currencies');
							}
						);
						return this;
					};

					$scope.mostrarResultados = function() {
						let resultado = 0;
						$scope.itemsRegistroUtilidad.forEach((item) => {
							resultado += parseFloat(item.utilidad_neto);
						});
						return resultado;
					};

					$scope.ok = function(e, total) {
						$uibModalInstance.close();
						e.stopPropagation();
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};

		$rootScope.cargarAlmacen = function() {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/inventarios/formulario-carga-almacen.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function(
					$scope,
					$uibModalInstance,
					$rootScope,
					$http,
					getserialesdecomprobantes,
					getBuscarOptionsSelect
				) {
					$scope.infoInputs = {};
					$scope.units = {};
					$scope.rr = [];
					$scope.itemListAlmacen = [];
					$scope.infoInputs.usu_tras = JSON.parse($rootScope.d.datos).usu_id;
					$scope.infoInputs.tip_doc = 22;
					$scope.infoInputs.tip_ope = 41;
					/* $scope.infoInputs.td_id = 'UP'; */
					$scope.infoInputs.status_tras = 0;
					$scope.infoInputs.almacen_destino = 0;
					$scope.infoInputs.local_destino = 0;

					$scope.rr.id_almacen = {
						selectId: 'id_almacen',
						db: 'almacen_info',
						where: 'emp_id',
						key: '',
						mostrar: [ 'alm_id', 'alm_nom' ]
					};
					$scope.rr.presentacion = {
						selectId: 'presentacion',
						db: 'presentacion',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'pst_id' ]
					};
					$scope.fetchSerializador = function(type) {
						getserialesdecomprobantes.fetchSerieTipoOperacion(type).then(
							function(d) {
								res.push(d);
							},
							function(errResponse) {
								console.error('Error while fetching Currencies');
							}
						);
					};

					$scope.buscarOptionSelect = function(arr) {
						getBuscarOptionsSelect.fetchOptions(arr).then(
							function(respuesta) {
								$scope.units[arr.selectId] = [];
								$.each(respuesta, function(i, val) {
									$scope.units[arr.selectId].push({
										id: val[arr.mostrar[0]],
										label: val[arr.mostrar[1]]
									});
								});
								return $scope.units[arr];
							},
							function(errResponse) {
								console.error('Error while fetching Currencies');
							}
						);
						return $scope.units[arr];
					};

					$scope.additem = function(item) {
						function validaVacio(valor) {
							valor = valor == undefined ? '' : valor;
							if (!valor || 0 === valor.length) {
								return true;
							} else {
								return false;
							}
						}

						function isNumber(x) {
							if (isNaN(x)) {
								return x;
							}
							return parseInt(x);
						}
						// COMPRUEBA CAMPOS VACIOS
						if (isNumber(validaVacio(item.cantidad))) {
							alert('completar todo el Formulario');
						} else {
							$scope.itemListAlmacen.push(item);
							$rootScope.clearItems();
						}
					};
					$scope.eliminarItem = function(index) {
						$scope.itemListAlmacen.splice(index, 1);
					};

					$scope.guardarCargaAlmacen = function(e) {
						let $adver = [];
						let sendObj = JSON.stringify({
							info: [ $scope.infoInputs ],
							items: $scope.itemListAlmacen
						});
						let xmlhttp = new XMLHttpRequest();
						let theUrl = `../../../../api/almacen/operaciones/cargar.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							let $ff = IsJsonString($adver[0]);

							if ($ff) {
								let $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								let verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Carga', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataMoviminetoAlmacen();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
							}
						};
						$uibModalInstance.close();
						e.stopPropagation();
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
						$rootScope.reloadDataMoviminetoAlmacen();
					};
				}
			});
		};
		$rootScope.descargarAlmacen = function() {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/inventarios/formulario-carga-almacen.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function(
					$scope,
					$uibModalInstance,
					$rootScope,
					$http,
					getserialesdecomprobantes,
					getBuscarOptionsSelect
				) {
					$scope.infoInputs = {};
					$scope.units = {};
					$scope.rr = [];
					$scope.itemListAlmacen = [];
					$scope.infoInputs.usu_tras = JSON.parse($rootScope.d.datos).usu_id;
					$scope.infoInputs.tip_doc = 23;
					$scope.infoInputs.tip_ope = 42;
					$scope.infoInputs.td_id = 'DW';
					$scope.infoInputs.status_tras = 0;
					$scope.infoInputs.almacen_destino = 0;
					$scope.infoInputs.local_destino = 0;

					$scope.rr.id_almacen = {
						selectId: 'id_almacen',
						db: 'almacen_info',
						where: 'emp_id',
						key: '',
						mostrar: [ 'alm_id', 'alm_nom' ]
					};
					$scope.rr.presentacion = {
						selectId: 'presentacion',
						db: 'presentacion',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'pst_id' ]
					};
					$scope.fetchSerializador = function(type) {
						var res = [];
						getserialesdecomprobantes.fetchSerializador(type).then(
							function(d) {
								res.push(d);
							},
							function(errResponse) {
								console.error('Error while fetching Currencies');
							}
						);
						return res;
					};

					$scope.buscarOptionSelect = function(arr) {
						getBuscarOptionsSelect.fetchOptions(arr).then(
							function(respuesta) {
								$scope.units[arr.selectId] = [];
								$.each(respuesta, function(i, val) {
									$scope.units[arr.selectId].push({
										id: val[arr.mostrar[0]],
										label: val[arr.mostrar[1]]
									});
								});
								return $scope.units[arr];
							},
							function(errResponse) {
								console.error('Error while fetching Currencies');
							}
						);
						return $scope.units[arr];
					};

					$scope.additem = function(item) {
						function validaVacio(valor) {
							valor = valor == undefined ? '' : valor;
							if (!valor || 0 === valor.length) {
								return true;
							} else {
								return false;
							}
						}

						function isNumber(x) {
							if (isNaN(x)) {
								return x;
							}
							return parseInt(x);
						}
						// COMPRUEBA CAMPOS VACIOS
						if (isNumber(validaVacio(item.cantidad))) {
							alert('completar todo el Formulario');
						} else {
							$scope.itemListAlmacen.push(item);
							$rootScope.clearItems();
						}
					};
					$scope.eliminarItem = function(index) {
						$scope.itemListAlmacen.splice(index, 1);
					};

					$scope.guardarCargaAlmacen = function(e) {
						let $adver = [];
						let sendObj = JSON.stringify({
							info: [ $scope.infoInputs ],
							items: $scope.itemListAlmacen
						});
						let xmlhttp = new XMLHttpRequest();
						let theUrl = `../../../../api/almacen/operaciones/descargar.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							let $ff = IsJsonString($adver[0]);

							if ($ff) {
								let $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								let verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Descarga', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataMoviminetoAlmacen();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
						$uibModalInstance.close();
						e.stopPropagation();
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
						$rootScope.reloadDataMoviminetoAlmacen();
					};
				}
			});
		};
		$rootScope.SalidaInternaAlmacen = function() {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/inventarios/formulario-salida-interna-almacen.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function(
					$scope,
					$uibModalInstance,
					$rootScope,
					$http,
					getserialesdecomprobantes,
					getBuscarOptionsSelect
				) {
					$scope.infoInputs = {};
					$scope.units = {};
					$scope.rr = [];
					$scope.itemListAlmacen = [];
					$scope.infoInputs.usu_tras = JSON.parse($rootScope.d.datos).usu_id;
					$scope.infoInputs.tip_doc = 24;
					$scope.infoInputs.tip_ope = 40;
					$scope.infoInputs.td_id = 'SI';
					$scope.infoInputs.status_tras = 1;
					$scope.rr.id_almacen = {
						selectId: 'id_almacen',
						db: 'almacen_info',
						where: 'loc_id',
						key: JSON.parse($rootScope.d.datos).ofi_id,
						mostrar: [ 'alm_id', 'alm_nom' ]
					};
					$scope.rr.local_destino = {
						selectId: 'local_destino',
						db: 'local',
						where: 'loc_est',
						key: 1,
						mostrar: [ 'loc_id', 'loc_nom' ]
					};
					$scope.rr.presentacion = {
						selectId: 'presentacion',
						db: 'presentacion',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'pst_id' ]
					};

					$scope.put_almacen_destino = function(id_local) {
						$scope.rr.almacen_destino = {
							selectId: 'almacen_destino',
							db: 'almacen_info',
							where: 'loc_id',
							key: id_local,
							mostrar: [ 'alm_id', 'alm_nom' ]
						};
						let arry = $scope.buscarOptionSelect($scope.rr.almacen_destino);
					};

					$scope.fetchSerializador = function(type) {
						var res = [];
						getserialesdecomprobantes.fetchSerializador(type).then(
							function(d) {
								res.push(d);
							},
							function(errResponse) {
								console.error('Error while fetching Currencies');
							}
						);
						return res;
					};

					$scope.buscarOptionSelect = function(arr) {
						getBuscarOptionsSelect.fetchOptions(arr).then(
							function(respuesta) {
								$scope.units[arr.selectId] = [];
								$.each(respuesta, function(i, val) {
									$scope.units[arr.selectId].push({
										id: val[arr.mostrar[0]],
										label: val[arr.mostrar[1]]
									});
								});
								return $scope.units[arr];
							},
							function(errResponse) {
								console.error('Error while fetching Currencies');
							}
						);
						return $scope.units[arr];
					};

					$scope.additem = function(item) {
						function validaVacio(valor) {
							valor = valor == undefined ? '' : valor;
							if (!valor || 0 === valor.length) {
								return true;
							} else {
								return false;
							}
						}

						function isNumber(x) {
							if (isNaN(x)) {
								return x;
							}
							return parseInt(x);
						}
						// COMPRUEBA CAMPOS VACIOS
						if (isNumber(validaVacio(item.cantidad))) {
							alert('completar todo el Formulario');
						} else {
							$scope.itemListAlmacen.push(item);
							$rootScope.clearItems();
						}
					};
					$scope.eliminarItem = function(index) {
						$scope.itemListAlmacen.splice(index, 1);
					};

					$scope.guardarCargaAlmacen = function(e) {
						let $adver = [];
						let sendObj = JSON.stringify({
							info: [ $scope.infoInputs ],
							items: $scope.itemListAlmacen
						});
						let xmlhttp = new XMLHttpRequest();
						let theUrl = `../../../../api/almacen/operaciones/descargar.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							let $ff = IsJsonString($adver[0]);

							if ($ff) {
								let $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								let verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Descarga', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataMoviminetoAlmacen();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
						$uibModalInstance.close();
						e.stopPropagation();
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
						$rootScope.reloadDataMoviminetoAlmacen();
					};
				}
			});
		};
		$rootScope.registroIngresoTranslado = function(row) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/inventarios/formulario-cargar-ingreso-almacen.html',
				placement: 'top',
				size: 'sm',
				backdrop: true,
				controller: function(
					$scope,
					$uibModalInstance,
					$rootScope,
					$http,
					getserialesdecomprobantes,
					getBuscarOptionsSelect,
					getResources
				) {
					$scope.infoInputs = {};
					$scope.units = {};
					$scope.rr = [];
					$scope.itemListAlmacen = [];

					$scope.fetchResources = function(id) {
						let obj = { db: 'traslado_almacen', where: 'id_tras', key: id };
						getResources.fetchResources(obj).then(
							function(d) {
								$scope.infoInputs = d.data[0];

								$scope.infoInputs.usu_tras = JSON.parse($rootScope.d.datos).usu_id;
								$scope.infoInputs.id_almacen = $scope.infoInputs.almacen_destino;

								$scope.infoInputs.tip_doc = 25;
								$scope.infoInputs.tip_ope = 43;
								$scope.infoInputs.td_id = 'SE';
								$scope.infoInputs.status_tras = 0;
							},
							function(errResponse) {
								console.error('Error while fetching Currencies');
							}
						);
					};
					$scope.fetchResources2 = function(id) {
						let obj = { db: 'producto_com_traslado', where: 'id_tras_c', key: id };
						getResources.fetchResources(obj).then(
							function(d) {
								$scope.itemListAlmacen = d.data;
							},
							function(errResponse) {
								console.error('Error while fetching Currencies');
							}
						);
					};

					$scope.fetchResources(row.id_tras);
					$scope.fetchResources2(row.id_tras);

					$scope.rr.id_almacen = {
						selectId: 'id_almacen',
						db: 'almacen_info',
						where: 'loc_id',
						key: JSON.parse($rootScope.d.datos).ofi_id,
						mostrar: [ 'alm_id', 'alm_nom' ]
					};
					$scope.rr.presentacion = {
						selectId: 'presentacion',
						db: 'presentacion',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'pst_id' ]
					};

					$scope.fetchSerializador = function(type) {
						var res = [];
						getserialesdecomprobantes.fetchSerializador(type).then(
							function(d) {
								res.push(d);
							},
							function(errResponse) {
								console.error('Error while fetching Currencies');
							}
						);
						return res;
					};

					$scope.buscarOptionSelect = function(arr) {
						getBuscarOptionsSelect.fetchOptions(arr).then(
							function(respuesta) {
								$scope.units[arr.selectId] = [];
								$.each(respuesta, function(i, val) {
									$scope.units[arr.selectId].push({
										id: val[arr.mostrar[0]],
										label: val[arr.mostrar[1]]
									});
								});
								return $scope.units[arr];
							},
							function(errResponse) {
								console.error('Error while fetching Currencies');
							}
						);
						return $scope.units[arr];
					};

					$scope.additem = function(item) {
						function validaVacio(valor) {
							valor = valor == undefined ? '' : valor;
							if (!valor || 0 === valor.length) {
								return true;
							} else {
								return false;
							}
						}

						function isNumber(x) {
							if (isNaN(x)) {
								return x;
							}
							return parseInt(x);
						}
						// COMPRUEBA CAMPOS VACIOS
						if (isNumber(validaVacio(item.cantidad))) {
							alert('completar todo el Formulario');
						} else {
							$scope.itemListAlmacen.push(item);
							$rootScope.clearItems();
						}
					};
					$scope.eliminarItem = function(index) {
						$scope.itemListAlmacen.splice(index, 1);
					};

					$scope.guardarCargaAlmacen = function(e) {
						let $adver = [];
						let sendObj = JSON.stringify({
							info: [ $scope.infoInputs ],
							items: $scope.itemListAlmacen
						});
						let xmlhttp = new XMLHttpRequest();
						let theUrl = `../../../../api/almacen/operaciones/insertarTraslado.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							let $ff = IsJsonString($adver[0]);

							if ($ff) {
								let $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								let verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Carga', 'Documento Guardado');
									$uibModalInstance.close();
									$rootScope.reloadDataMoviminetoAlmacen();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
						$uibModalInstance.close();
						e.stopPropagation();
						$rootScope.reloadDataMoviminetoAlmacen();
					};

					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
						$rootScope.reloadDataMoviminetoAlmacen();
					};
				}
			});
		};
		$rootScope.ajustesPredeterminadosPuntoVenta = function(checkOptions) {
			$aside.open({
				templateUrl: 'STANDARD/assets/sistem-views/ventas/formulario-ajustes-punto-venta.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance, $rootScope, getBuscarOptionsSelect, $state) {
					$scope.rr = [];
					$scope.configInputs = {};
					$scope.productos = {};

					$scope.readDefaultSettingsLocalStorage = function() {
						let predet = localStorage.getItem('predeterminados_punto_de_venta');
						$scope.configInputs = JSON.parse(predet);
					};

					$scope.readDefaultSettingsLocalStorage();

					$scope.rr.td_id = {
						selectId: 'td_id',
						db: 'tipo_operacion_td',
						where: 'to_id',
						key: 1,
						mostrar: [ 'td_id', 'td_id' ]
					};
					$scope.rr.mnd_id = {
						selectId: 'mnd_id',
						db: 'moneda',
						where: 'mnd_id',
						key: '',
						mostrar: [ 'mnd_id', 'mnd_id' ]
					};
					$scope.rr.fp_id = {
						selectId: 'fp_id',
						db: 'forma_pago',
						where: 'fp_id',
						key: '',
						mostrar: [ 'fp_id', 'fp_nom' ]
					};
					$scope.rr.lp_id = {
						selectId: 'lp_id',
						db: 'lista_precio_list',
						where: 'lp_id',
						key: '',
						mostrar: [ 'lp_id', 'lp_nom' ]
					};
					$scope.rr.ofi_id = {
						selectId: 'ofi_id',
						db: 'local',
						where: 'emp_id',
						key: '',
						mostrar: [ 'loc_id', 'loc_nom' ]
					};
					$scope.rr.alm_id = {
						selectId: 'alm_id',
						db: 'almacen_info',
						where: 'ofi_id',
						key: JSON.parse($rootScope.d.datos).ofi_id,
						mostrar: [ 'alm_id', 'alm_nom' ]
					};

					$scope.rr.pst_id = {
						selectId: 'pst_id',
						db: 'presentacion',
						where: 'id',
						key: '',
						mostrar: [ 'id', 'pst_nom' ]
					};
					$scope.buscarOptionSelect = function(arr) {
						getBuscarOptionsSelect.fetchOptions(arr).then(
							function(respuesta) {
								$scope.units[arr.selectId] = [];
								$.each(respuesta, function(i, val) {
									$scope.units[arr.selectId].push({
										id: val[arr.mostrar[0]],
										label: val[arr.mostrar[1]]
									});
								});
								return $scope.units[arr];
							},
							function(errResponse) {
								console.error('Error while fetching Currencies');
							}
						);
						return $scope.units[arr];
					};
					$scope.guardarAjustesPredeterminados = function(e, content) {
						let str = JSON.stringify(content);
						localStorage.removeItem('predeterminados_punto_de_venta');
						localStorage.setItem('predeterminados_punto_de_venta', str);
						toaster.pop('success', 'Punto de Venta', 'Ajustes Modificados');
						$uibModalInstance.close();
						e.stopPropagation();
						$state.reload();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
						$state.reload();
					};
				}
			});
		};
		$scope.nuevootras_aportaciones = function(identifiquer) {
			$aside.open({
				templateUrl:
					'STANDARD/assets/sistem-views/listas/personal/formulario-de-registro-otras_aportaciones.html',
				placement: 'right',
				size: 'sm',
				backdrop: true,
				controller: function($scope, $uibModalInstance) {
					$scope.infoInputs = {};

					$scope.guardaroApyDes = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);
						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
						};
					};
					$scope.guardaroApyDesycerrar = function(e) {
						var $adver = [];
						var sendObj = JSON.stringify($scope.infoInputs);

						var xmlhttp = new XMLHttpRequest();
						var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse(
							$rootScope.d.datos
						).database}&tbnom=`;
						xmlhttp.open('post', theUrl);
						xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlhttp.withCredentials = true;
						xmlhttp.send(sendObj);
						xmlhttp.onload = (response) => {
							if (xmlhttp.status == 201) {
								$adver.push(xmlhttp.response);
							} else {
								$adver.push(xmlhttp.response);
							}

							function IsJsonString(str) {
								try {
									JSON.parse(str);
								} catch (e) {
									return false;
								}
								return true;
							}
							var $ff = IsJsonString($adver[0]);

							if ($ff) {
								var $rr = JSON.parse($adver[0]);

								function verif(list) {
									return list.status != 200;
								}
								var verifx = $rr.find(verif);

								if (verifx === undefined) {
									toaster.pop('success', 'Compra', 'Documento Guardado');
									$uibModalInstance.close();
								} else {
									toaster.pop('error', 'Error', 'Su Documento no pudo ser Guardado');
								}
							} else {
								console.log('error');
								alert('Este documento no se pudo guardar');
							}
							$uibModalInstance.close();
						};
					};
					$scope.ok = function(e) {
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function(e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		};
	}
]);

app.factory('Excel', function($window) {
	var uri = 'data:application/vnd.ms-excel;base64,',
		template =
			'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
		base64 = function(s) {
			return $window.btoa(unescape(encodeURIComponent(s)));
		},
		format = function(s, c) {
			return s.replace(/{(\w+)}/g, function(m, p) {
				return c[p];
			});
		};
	return {
		tableToExcel: function(tableId, worksheetName) {
			var table = $(tableId),
				ctx = { worksheet: worksheetName, table: table.html() },
				href = uri + base64(format(template, ctx));
			return href;
		}
	};
});

app.controller('MyCtrl', function(Excel, $timeout, $scope) {
	$scope.exportToExcel = function(tableId) {
		// ex: '#my-table'
		var exportHref = Excel.tableToExcel(tableId, 'WireWorkbenchDataExport');
		$timeout(function() {
			location.href = exportHref;
		}, 100); // trigger download
	};
});

app.controller([ 'pdfjsViewer' ]);
app.controller('AppCtrl', function($scope) {
	$scope.pdf = {
		src: '../../../../compass/formato-pdf/factura.php'
	};
});
