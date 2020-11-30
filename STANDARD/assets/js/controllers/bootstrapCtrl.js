'use strict';
/**
 * controllers for UI Bootstrap components
 */
app
	.controller('AlertDemoCtrl', [
		'$scope',
		function($scope) {
			$scope.alerts = [
				{
					type: 'danger',
					msg: 'Oh snap! Change a few things up and try submitting again.'
				},
				{
					type: 'success',
					msg: 'Well done! You successfully read this important alert message.'
				}
			];

			$scope.addAlert = function() {
				$scope.alerts.push({ msg: 'Another alert!' });
			};

			$scope.closeAlert = function(index) {
				$scope.alerts.splice(index, 1);
			};
		}
	])
	.controller('ButtonsCtrl', [
		'$scope',
		function($scope) {
			$scope.singleModel = 1;

			$scope.radioModel = 'Middle';

			$scope.checkModel = {
				left: false,
				middle: true,
				right: false
			};
		}
	])
	.controller('ProgressDemoCtrl', [
		'$scope',
		function($scope) {
			$scope.max = 200;

			$scope.random = function() {
				var value = Math.floor(Math.random() * 100 + 1);
				var type;

				if (value < 25) {
					type = 'success';
				} else if (value < 50) {
					type = 'info';
				} else if (value < 75) {
					type = 'warning';
				} else {
					type = 'danger';
				}
				$scope.showWarning = type === 'danger' || type === 'warning';

				$scope.dynamic = value;
				$scope.type = type;
			};
			$scope.random();

			$scope.randomStacked = function() {
				$scope.stacked = [];
				var types = [ 'success', 'info', 'warning', 'danger' ];

				for (var i = 0, n = Math.floor(Math.random() * 4 + 1); i < n; i++) {
					var index = Math.floor(Math.random() * 4);
					$scope.stacked.push({
						value: Math.floor(Math.random() * 30 + 1),
						type: types[index]
					});
				}
			};
			$scope.randomStacked();
		}
	])
	.controller('TooltipDemoCtrl', [
		'$scope',
		function($scope) {
			$scope.dynamicTooltip = 'I am a dynamic Tooltip text';
			$scope.dynamicTooltipText = 'I am a dynamic Tooltip Popup text';
			$scope.htmlTooltip = "I've been made <b>bold</b>!";
		}
	])
	.controller('PopoverDemoCtrl', [
		'$scope',
		function($scope) {
			$scope.dynamicPopover = 'Hello, World!';
			$scope.dynamicPopoverTitle = 'Title';
			$scope.popoverType = 'bottom';
		}
	])
	.controller('PaginationDemoCtrl', [
		'$scope',
		'$log',
		function($scope, $log) {
			$scope.totalItems = 64;
			$scope.currentPage = 4;

			$scope.setPage = function(pageNo) {
				$scope.currentPage = pageNo;
			};

			$scope.pageChanged = function() {
				$log.log('Page changed to: ' + $scope.currentPage);
			};

			$scope.maxSize = 5;
			$scope.bigTotalItems = 175;
			$scope.bigCurrentPage = 1;
		}
	])
	.controller('RatingDemoCtrl', [
		'$scope',
		function($scope) {
			$scope.rate = 7;
			$scope.max = 10;
			$scope.isReadonly = false;

			$scope.hoveringOver = function(value) {
				$scope.overStar = value;
				$scope.percent = 100 * (value / $scope.max);
			};

			$scope.ratingStates = [
				{
					stateOn: 'glyphicon-ok-sign',
					stateOff: 'glyphicon-ok-circle'
				},
				{
					stateOn: 'glyphicon-star',
					stateOff: 'glyphicon-star-empty'
				},
				{
					stateOn: 'glyphicon-heart',
					stateOff: 'glyphicon-ban-circle'
				},
				{
					stateOn: 'glyphicon-heart'
				},
				{
					stateOff: 'glyphicon-off'
				}
			];
		}
	])
	.controller('DropdownCtrl', [
		'$scope',
		'$log',
		function($scope, $log) {
			$scope.items = [ 'The first choice!', 'And another choice for you.', 'but wait! A third!' ];

			$scope.status = {
				isopen: false
			};

			$scope.toggled = function(open) {
				$log.log('Dropdown is now: ', open);
			};

			$scope.toggleDropdown = function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				$scope.status.isopen = !$scope.status.isopen;
			};
		}
	])
	.controller('TabsDemoCtrl', [
		'$scope',
		'SweetAlert',
		function($scope, SweetAlert) {
			$scope.tabs = [
				{
					title: 'Dynamic Title 1',
					content: 'Dynamic content 1'
				},
				{
					title: 'Dynamic Title 2',
					content: 'Dynamic content 2',
					disabled: false
				}
			];

			$scope.alertMe = function() {
				setTimeout(function() {
					SweetAlert.swal({ title: "You've selected the alert tab!", confirmButtonColor: '#007AFF' });
				});
			};
		}
	])
	.controller('AccordionDemoCtrl', [
		'$scope',
		function($scope) {
			$scope.oneAtATime = true;

			$scope.groups = [
				{
					title: 'Dynamic Group Header - 1',
					content: 'Dynamic Group Body - 1'
				},
				{
					title: 'Dynamic Group Header - 2',
					content: 'Dynamic Group Body - 2'
				}
			];

			$scope.items = [ 'Item 1', 'Item 2', 'Item 3' ];

			$scope.addItem = function() {
				var newItemNo = $scope.items.length + 1;
				$scope.items.push('Item ' + newItemNo);
			};

			$scope.status = {
				isFirstOpen: true,
				isFirstDisabled: false
			};
		}
	])
	.controller('DatepickerDemoCtrl', [
		'$scope',
		'$log',
		function($scope, $log) {
			$scope.today = function() {
				$scope.dt = new Date();
			};
			$scope.today();
			$scope.start = $scope.minDate;
			$scope.end = $scope.maxDate;

			$scope.clear = function() {
				$scope.dt = null;
			};
			$scope.datepickerOptions = {
				showWeeks: false,
				startingDay: 1
			};
			$scope.dateDisabledOptions = {
				dateDisabled: disabled,
				showWeeks: false,
				startingDay: 1
			};
			$scope.startOptions = {
				showWeeks: false,
				startingDay: 1,
				minDate: $scope.minDate,
				maxDate: $scope.maxDate
			};
			$scope.endOptions = {
				showWeeks: false,
				startingDay: 1,
				minDate: $scope.minDate,
				maxDate: $scope.maxDate
			};
			// Disable weekend selection
			function disabled(data) {
				var date = data.date,
					mode = data.mode;
				return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
			}

			$scope.setDate = function(year, month, day) {
				$scope.dt = new Date(year, month, day);
			};
			$scope.toggleMin = function() {
				$scope.datepickerOptions.minDate = $scope.datepickerOptions.minDate ? null : new Date();
				$scope.dateDisabledOptions.minDate = $scope.dateDisabledOptions.minDate ? null : new Date();
			};
			$scope.maxDate = new Date(2020, 5, 22);
			$scope.minDate = new Date(1970, 12, 31);

			$scope.open = function() {
				$scope.opened = !$scope.opened;
			};

			$scope.endOpen = function() {
				$scope.endOptions.minDate = $scope.start;
				$scope.startOpened = false;
				$scope.endOpened = !$scope.endOpened;
			};
			$scope.startOpen = function() {
				$scope.startOptions.maxDate = $scope.end;
				$scope.endOpened = false;
				$scope.startOpened = !$scope.startOpened;
			};

			$scope.dateOptions = {
				formatYear: 'yy',
				startingDay: 1
			};

			$scope.formats = [ 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate' ];
			$scope.format = $scope.formats[0];

			$scope.hstep = 1;
			$scope.mstep = 15;

			// Time Picker
			$scope.options = {
				hstep: [ 1, 2, 3 ],
				mstep: [ 1, 5, 10, 15, 25, 30 ]
			};

			$scope.ismeridian = true;
			$scope.toggleMode = function() {
				$scope.ismeridian = !$scope.ismeridian;
			};

			$scope.update = function() {
				var d = new Date();
				d.setHours(14);
				d.setMinutes(0);
				$scope.dt = d;
			};

			$scope.changed = function() {
				$log.log('Time changed to: ' + $scope.dt);
			};

			$scope.clear = function() {
				$scope.dt = null;
			};
		}
	])
	.controller('DropdownCtrl', [
		'$scope',
		'$log',
		function($scope, $log) {
			$scope.items = [ 'The first choice!', 'And another choice for you.', 'but wait! A third!' ];

			$scope.status = {
				isopen: false
			};

			$scope.toggled = function(open) {
				$log.log('Dropdown is now: ', open);
			};

			$scope.toggleDropdown = function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				$scope.status.isopen = !$scope.status.isopen;
			};
		}
	])
	.controller('ModalDemoCtrl', [
		'$scope',
		'$uibModal',
		'$log',
		'$rootScope',
		function($scope, $uibModal, $log, $rootScope) {
			$scope.items = [ 'item1', 'item2', 'item3' ];

			$scope.open = function(size) {
				var modalInstance = $uibModal.open({
					templateUrl: 'myModalContent.html',
					controller: 'ModalInstanceCtrl',
					size: size,
					resolve: {
						items: function() {
							return $scope.items;
						}
					}
				});
				modalInstance.result.then(
					function(selectedItem) {
						$scope.selected = selectedItem;
					},
					function() {
						$log.info('Modal dismissed at: ' + new Date());
					}
				);
			};

			$rootScope.pagarGuardarPuntoVenta = function() {
				var modalInstance = $uibModal.open({
					templateUrl: 'STANDARD/assets/sistem-views/inventarios/formulario-de-registro-nuevo-producto.html',
					controller: 'ModalNuevoProductoCtrl',
					size: 'lg',
					resolve: {
						items: function() {
							return $scope.items;
						}
					}
				});
				modalInstance.result.then(
					function(selectedItem) {
						$scope.selected = selectedItem;
					},
					function() {
						$log.info('Modal dismissed at: ' + new Date());
					}
				);
			};

			$rootScope.newProductCreate = function(data) {
				$rootScope.tempModel = data;
				var modalInstance = $uibModal.open({
					templateUrl: 'STANDARD/assets/sistem-views/inventarios/formulario-de-registro-nuevo-producto.html',
					controller: 'ModalNuevoProductoCtrl',
					size: 'lg',
					resolve: {
						items: function() {
							return $scope.items;
						}
					}
				});
				modalInstance.result.then(
					function(selectedItem) {
						$scope.selected = selectedItem;
					},
					function() {
						$log.info('Modal dismissed at: ' + new Date());
					}
				);
			};

			$rootScope.newProductoMedicCreate = function(data) {
				$rootScope.tempModel = data;
				var modalInstance = $uibModal.open({
					templateUrl:
						'STANDARD/assets/sistem-views/inventarios/formulario-de-registro-nuevo-producto-medic.html',
					controller: 'ModalNuevoProductoMedicoCtrl',
					size: 'lg',
					resolve: {
						items: function() {
							return $scope.items;
						}
					}
				});

				modalInstance.result.then(
					function(selectedItem) {
						$scope.selected = selectedItem;
					},
					function() {
						$log.info('Modal dismissed at: ' + new Date());
					}
				);
			};

			$rootScope.newSerializadorCreate = function(data) {
				$rootScope.tempModel = data;
				var modalInstance = $uibModal.open({
					templateUrl: 'STANDARD/assets/sistem-views/listas/empresa/formulario-de-registro-serie.html',
					controller: 'ModalSerializadoCtrl',
					size: 'lg',
					resolve: {
						items: function() {
							return $scope.items;
						}
					}
				});
				modalInstance.result.then(
					function(selectedItem) {
						$scope.selected = selectedItem;
					},
					function() {
						$log.info('Modal dismissed at: ' + new Date());
					}
				);
			};
			$rootScope.newAsientos = function() {
				var modalInstance = $uibModal.open({
					templateUrl:
						'STANDARD/assets/sistem-views/listas/contabilidad/formulario-de-registro-asientos.html',
					controller: 'ModalNuevoProductoCtrl',
					size: 'lg',
					resolve: {
						items: function() {
							return $scope.items;
						}
					}
				});
				modalInstance.result.then(
					function(selectedItem) {
						$scope.selected = selectedItem;
					},
					function() {
						$log.info('Modal dismissed at: ' + new Date());
					}
				);
			};
			$rootScope.newServiceCreate = function(data) {
				$rootScope.tempModel = data;
				var modalInstance = $uibModal.open({
					templateUrl: 'STANDARD/assets/sistem-views/inventarios/formulario-de-registro-nuevo-servicio.html',
					controller: 'ModalNuevoServicioCtrl',
					size: 'lg',
					resolve: {
						items: function() {
							return $scope.items;
						}
					}
				});

				modalInstance.result.then(
					function(selectedItem) {
						$scope.selected = selectedItem;
					},
					function() {
						$log.info('Modal dismissed at: ' + new Date());
					}
				);
			};
			$rootScope.newGastosCreate = function() {
				var modalInstance = $uibModal.open({
					templateUrl: 'STANDARD/assets/sistem-views/inventarios/formulario-de-registro-nuevo-gasto.html',
					controller: 'ModalNuevoGastosCtrl',
					size: 'lg',
					resolve: {
						items: function() {
							return $scope.items;
						}
					}
				});

				modalInstance.result.then(
					function(selectedItem) {
						$scope.selected = selectedItem;
					},
					function() {
						$log.info('Modal dismissed at: ' + new Date());
					}
				);
			};
			$rootScope.newActivofijoCreate = function() {
				var modalInstance = $uibModal.open({
					templateUrl:
						'STANDARD/assets/sistem-views/inventarios/formulario-de-registro-nuevo-activofijo.html',
					controller: 'ModalNuevoActivoFijoCtrl',
					size: 'lg',
					resolve: {
						items: function() {
							return $scope.items;
						}
					}
				});
				modalInstance.result.then(
					function(selectedItem) {
						$scope.selected = selectedItem;
					},
					function() {
						$log.info('Modal dismissed at: ' + new Date());
					}
				);
			};
		}
	]);

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

app.controller('ModalInstanceCtrl', [
	'$scope',
	'$uibModalInstance',
	'items',
	'$rootScope',
	function($scope, $uibModalInstance, items, $rootScope) {
		$scope.items = items;
		$scope.selected = {
			item: $scope.items[0]
		};

		$scope.ok = function() {
			$uibModalInstance.close($scope.selected.item);
			$rootScope.reloadDataInventario();
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}
]);

app.controller('ModalSerializadoCtrl', [
	'$scope',
	'$uibModalInstance',
	'$rootScope',
	'$http',
	'getResources',
	'$state',
	'toaster',
	function($scope, $uibModalInstance, $rootScope, $http, getResources, $state, toaster) {
		$scope.rr = [];
		$scope.units = [];
		if ($rootScope.tempModel) {
			$scope.fetchResources = function(id) {
				let obj = { db: 'tipo_documento_serie', where: 'id', key: id };
				getResources.fetchResources(obj).then(
					function(d) {
						$scope.infoInputs = d.data[0];
						$scope.infoInputs.btnUpdate = false;
						$scope.infoInputs.ofi_id = JSON.parse($rootScope.d.datos).ofi_id;
						$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
					},
					function(errResponse) {
						console.error('Error while fetching Currencies');
					}
				);
			};
			$scope.fetchResources($rootScope.tempModel.id);
		} else {
			$scope.rr = [];
			$scope.infoInputs = {};
			$scope.infoInputs.ofi_id = JSON.parse($rootScope.d.datos).ofi_id;
			$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
			$scope.infoInputs.pro_ina = '0';
			$scope.infoInputs.pro_detraccion = false;
			$scope.infoInputs.btnUpdate = true;
		}

		$scope.guardarSerie = function(val) {
			var $adver = [];
			data = JSON.stringify(val);
			var xml = new XMLHttpRequest();
			var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=tipo_documento_serie`;
			xml.open('POST', theUrl);
			xml.send(data);
			xml.onload = () => {
				if (xml.status == 201) {
					$adver.push(xml.response);
				} else {
					$adver.push(xml.response);
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
						toaster.pop('success', 'Serie', 'Item Guardado');
						$uibModalInstance.close();
						$uibModalInstance.dismiss('cancel');
					} else {
						toaster.pop('error', 'Error', 'Su Serie no pudo ser Guardado');
					}
				} else {
					console.log('error');
					alert('Este documento no se pudo guardar');
				}
			};
			$state.reload();
		};
		$scope.editarSerie = function(val) {
			var $adver = [];
			data = JSON.stringify(val);
			var xml = new XMLHttpRequest();
			var theUrl = `../../../../api/mantenimiento/mantenimiento/updateGen.php?getdb=${JSON.parse(
				$rootScope.d.datos
			).database}&tbnom=tipo_documento_serie&identifiquer=id&identifiquerValue=${val.id}`;
			xml.open('POST', theUrl);
			xml.send(data);
			xml.onload = () => {
				if (xml.status == 201) {
					try {
						$adver.push(xml.response);
						toaster.pop('success', 'Serie', 'Serie actulizada');
						$uibModalInstance.close();
						$uibModalInstance.dismiss('cancel');
						$state.reload();
					} catch (error) {
						alert('not fund');
					}
				} else {
					toaster.pop('error', 'Serie', 'Serie no actulizada');
					$adver.push(xml.response);
				}
			};
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}
]);

app.controller('ModalNuevoProductoCtrl', [
	'$scope',
	'$uibModalInstance',
	'items',
	'$rootScope',
	'$http',
	'getResources',
	function($scope, $uibModalInstance, items, $rootScope, $http, getResources) {
		$scope.rr = [];
		$scope.units = [];

		if ($rootScope.tempModel) {
			$scope.fetchResources = function(id) {
				let obj = { db: 'getproductos', where: 'pro_id', key: id };
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
			$scope.fetchResources($rootScope.tempModel.pro_id);
		} else {
			$scope.infoInputs = {};
			$scope.infoInputs.pro_ina = '0';
			$scope.infoInputs.pro_detraccion = false;
			$scope.infoInputs.btnUpdate = true;
		}

		$scope.rr.pro_tip = {
			selectId: 'pro_tip',
			db: 'tipo_producto',
			where: 'tip_pro_id',
			key: '',
			mostrar: [ 'tip_pro_id', 'tip_pro_desc' ]
		};

		$scope.rr.pst_id = {
			selectId: 'pst_id',
			db: 'presentacion',
			where: 'pst_id',
			key: '',
			mostrar: [ 'id', 'pst_nom' ]
		};
		$scope.rr.cat_id = {
			selectId: 'cat_id',
			db: 'categoria',
			where: 'cat_id',
			key: '',
			mostrar: [ 'cat_id', 'cat_nom' ]
		};
		$scope.rr.scat_id = {
			selectId: 'scat_id',
			db: 'subcategoria',
			where: 'scat_id',
			key: '',
			mostrar: [ 'scat_id', 'scat_nom' ]
		};
		$scope.rr.mar_id = {
			selectId: 'mar_id',
			db: 'marca',
			where: 'mar_id',
			key: '',
			mostrar: [ 'mar_id', 'mar_nom' ]
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
					`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
						.database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
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

		$scope.items = items;
		$scope.selected = {
			item: $scope.items[0]
		};

		$scope.popoverGuardarCategorias = function(val) {
			var xml = new XMLHttpRequest();
			var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=categoria`;
			xml.open('POST', theUrl);
			xml.send(JSON.stringify({ cat_nom: val }));
			xml.onload = () => {
				if (xml.status == 201) {
				} else {
				}
			};
		};
		$scope.guardarProductoyServicio = function(val) {
			var $adver = [];
			data = JSON.stringify(val);
			var xml = new XMLHttpRequest();
			var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=producto_pro`;
			xml.open('POST', theUrl);
			xml.send(data);
			xml.onload = () => {
				if (xml.status == 201) {
					$adver.push(xml.response);
				} else {
					$adver.push(xml.response);
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
						toaster.pop('success', 'Producto', 'Item Guardado');
						$uibModalInstance.close();
						$uibModalInstance.dismiss('cancel');
					} else {
						toaster.pop('error', 'Error', 'Su Producto no pudo ser Guardado');
					}
				} else {
					console.log('error');
					alert('Este documento no se pudo guardar');
				}
			};
			$uibModalInstance.close($scope.selected.item);
			$rootScope.reloadDataProductosyServicios();
		};
		$scope.updateProductoyServicio = function(val) {
			var $adver = [];
			data = JSON.stringify(val);
			var xml = new XMLHttpRequest();
			var theUrl = `../../../../api/mantenimiento/mantenimiento/updateGen.php?getdb=${JSON.parse(
				$rootScope.d.datos
			).database}&tbnom=producto_pro&identifiquer=pro_id&identifiquerValue=${val.pro_id}`;
			xml.open('POST', theUrl);
			xml.send(data);
			xml.onload = () => {
				if (xml.status == 201) {
					$adver.push(xml.response);
				} else {
					$adver.push(xml.response);
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
						toaster.pop('success', 'Producto', 'Item Guardado');
						$uibModalInstance.close();
						$uibModalInstance.dismiss('cancel');
					} else {
						toaster.pop('error', 'Error', 'Su Producto no pudo ser Guardado');
					}
				} else {
					console.log('error');
					alert('Este documento no se pudo guardar');
				}
			};
			$uibModalInstance.close($scope.selected.item);
			$rootScope.reloadDataProductosyServicios();
		};

		$scope.cancel = function() {
			$rootScope.reloadDataProductosyServicios();
			$uibModalInstance.dismiss('cancel');
		};
	}
]);

app.controller('ModalNuevoProductoMedicoCtrl', [
	'$scope',
	'$uibModalInstance',
	'items',
	'$rootScope',
	'$http',
	'getResources',
	function($scope, $uibModalInstance, items, $rootScope, $http, getResources) {
		$scope.rr = [];
		$scope.units = [];

		if ($rootScope.tempModel) {
			$scope.fetchResources = function(id) {
				let obj = { db: 'getproductos', where: 'pro_id', key: id };
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
			$scope.fetchResources($rootScope.tempModel.pro_id);
		} else {
			$scope.infoInputs = {};
			$scope.infoInputs.pro_ina = '0';
			$scope.infoInputs.pro_detraccion = false;
			$scope.infoInputs.btnUpdate = true;
		}

		$scope.rr.pro_tip = {
			selectId: 'pro_tip',
			db: 'tipo_producto',
			where: 'tip_pro_id',
			key: '',
			mostrar: [ 'tip_pro_id', 'tip_pro_desc' ]
		};
		
		$scope.rr.apl_id = {
			selectId: 'apl_id',
			db: 'aplicacion',
			where: 'apl_cod',
			key: '',
			mostrar: [ 'id', 'apl_des' ]
		};

		$scope.rr.pst_id = {
			selectId: 'pst_id',
			db: 'presentacion',
			where: 'pst_id',
			key: '',
			mostrar: [ 'id', 'pst_nom' ]
		};
		$scope.rr.cat_id = {
			selectId: 'cat_id',
			db: 'categoria',
			where: 'cat_id',
			key: '',
			mostrar: [ 'cat_id', 'cat_nom' ]
		};
		$scope.rr.scat_id = {
			selectId: 'scat_id',
			db: 'subcategoria',
			where: 'scat_id',
			key: '',
			mostrar: [ 'scat_id', 'scat_nom' ]
		}; //funcion médica

		$scope.rr.mar_id = {
			selectId: 'mar_id',
			db: 'marca',
			where: 'mar_id',
			key: '',
			mostrar: [ 'mar_id', 'mar_nom' ]
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
					`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
						.database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
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

		$scope.items = items;
		$scope.selected = {
			item: $scope.items[0]
		};

		$scope.popoverGuardarCategorias = function(val) {
			var xml = new XMLHttpRequest();
			var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=categoria`;
			xml.open('POST', theUrl);
			xml.send(JSON.stringify({ cat_nom: val }));
			xml.onload = () => {
				if (xml.status == 201) {
				} else {
				}
			};
		};
		$scope.guardarProductoyServicio = function(val) {
			var $adver = [];
			data = JSON.stringify(val);
			var xml = new XMLHttpRequest();
			var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=producto_pro`;
			xml.open('POST', theUrl);
			xml.send(data);
			xml.onload = () => {
				if (xml.status == 201) {
					$adver.push(xml.response);
				} else {
					$adver.push(xml.response);
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
						toaster.pop('success', 'Producto', 'Item Guardado');
						$uibModalInstance.close();
						$uibModalInstance.dismiss('cancel');
					} else {
						toaster.pop('error', 'Error', 'Su Producto no pudo ser Guardado');
					}
				} else {
					console.log('error');
					alert('Este documento no se pudo guardar');
				}
			};
			$uibModalInstance.close($scope.selected.item);
			$rootScope.reloadDataProductosyServicios();
		};
		$scope.updateProductoyServicio = function(val) {
			var $adver = [];
			data = JSON.stringify(val);
			var xml = new XMLHttpRequest();
			var theUrl = `../../../../api/mantenimiento/mantenimiento/updateGen.php?getdb=${JSON.parse(
				$rootScope.d.datos
			).database}&tbnom=producto_pro&identifiquer=pro_id&identifiquerValue=${val.pro_id}`;
			xml.open('POST', theUrl);
			xml.send(data);
			xml.onload = () => {
				if (xml.status == 201) {
					$adver.push(xml.response);
				} else {
					$adver.push(xml.response);
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
						toaster.pop('success', 'Producto', 'Item Guardado');
						$uibModalInstance.close();
						$uibModalInstance.dismiss('cancel');
					} else {
						toaster.pop('error', 'Error', 'Su Producto no pudo ser Guardado');
					}
				} else {
					console.log('error');
					alert('Este documento no se pudo guardar');
				}
			};
			$uibModalInstance.close($scope.selected.item);
			$rootScope.reloadDataProductosyServicios();
		};

		$scope.cancel = function() {
			$rootScope.reloadDataProductosyServicios();
			$uibModalInstance.dismiss('cancel');
		};
	}
]);

app.controller('ModalNuevoServicioCtrl', [
	'$scope',
	'$uibModalInstance',
	'items',
	'$rootScope',
	'$http',
	'getResources',
	'toaster',
	function($scope, $uibModalInstance, items, $rootScope, $http, getResources, toaster) {
		$scope.rr = [];
		$scope.units = [];

		if ($rootScope.tempModel) {
			$scope.fetchResources = function(id) {
				let obj = { db: 'getproductos', where: 'pro_id', key: id };
				getResources.fetchResources(obj).then(
					function(d) {
						$scope.infoInputs = d.data[0];
						$scope.infoInputs.cuentacontable = {
							idt: $scope.infoInputs.cuenta_contable,
							nom: $scope.infoInputs.tip_pro_desc
						};
						$scope.infoInputs.btnUpdate = false;
					},
					function(errResponse) {
						console.error('Error while fetching Currencies');
					}
				);
			};

			$scope.fetchResources($rootScope.tempModel.pro_id);
		} else {
			$scope.infoInputs = {};
			$scope.infoInputs.pro_ina = '0';
			$scope.infoInputs.pro_detraccion = false;
			$scope.infoInputs.btnUpdate = true;
		}
		$scope.emp_id = JSON.parse($rootScope.d.datos).database;

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
					`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
						.database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
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
		$scope.items = items;
		$scope.selected = {
			item: $scope.items[0]
		};

		$scope.ok = function(val) {
			data = JSON.stringify(val);
			var xml = new XMLHttpRequest();
			var theUrl = `../../../../api/createNewService/create.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=producto_pro`;
			xml.open('POST', theUrl);
			xml.send(data);
			xml.onload = () => {
				if (xml.status == 201) {
					toaster.pop('success', 'Producto', 'Item Guardado');
					$rootScope.reloadDataProductosyServicios();
				} else {
					toaster.pop('error', 'Producto', 'Producto error');
				}
			};
			$uibModalInstance.dismiss('cancel');
		};

		$scope.updateProductoyServicio = function(val) {
			var $adver = [];
			data = JSON.stringify(val);
			var xml = new XMLHttpRequest();
			var theUrl = `../../../../api/createNewService/update.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=producto_pro&identifiquer=pro_id&identifiquerValue=${val.pro_id}`;
			xml.open('POST', theUrl);
			xml.send(data);
			xml.onload = () => {
				if (xml.status == 201) {
					try {
						$adver.push(xml.response);
						toaster.pop('success', 'Servicio', 'Servicio Actualizado');
						$uibModalInstance.dismiss('cancel');
						$rootScope.reloadDataProductosyServicios();
					} catch (error) {
						toaster.pop('error', 'Error', 'Su Servicio no pudo ser Actualizado');
					}
				} else {
					toaster.pop('error', 'Error', 'Su Servicio no pudo ser Actualizado');
				}
			};
			$uibModalInstance.close();
		};
		$scope.cancel = function() {
			toaster.pop('success', 'Producto', 'Producto Guardado');
			reloadDataProductosyServicios();
			$uibModalInstance.close();
			$uibModalInstance.dismiss('cancel');
		};
	}
]);

app.controller('ModalNuevoGastosCtrl', [
	'$scope',
	'$uibModalInstance',
	'items',
	'$rootScope',
	'$http',
	function($scope, $uibModalInstance, items, $rootScope, $http) {
		$scope.rr = [];
		$scope.units = [];
		$scope.infoInputs = {};
		$scope.rr.pst_id = {
			selectId: 'pst_id',
			db: 'presentacion',
			where: 'pst_id',
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
			/*     if (obj.key === "miEmpresa") {
                    obj.key = miEmpresa
                } else {
                    obj.key = obj.key
                } */

			var arr = obj.selectId;
			$http
				.get(
					`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
						.database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
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
		$scope.items = items;
		$scope.selected = {
			item: $scope.items[0]
		};
		$scope.ok = function() {
			$uibModalInstance.close($scope.selected.item);
			$rootScope.reloadDataInventario();
		};
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}
]);

app.controller('ModalNuevoActivoFijoCtrl', [
	'$scope',
	'$uibModalInstance',
	'items',
	'$rootScope',
	'$http',
	function($scope, $uibModalInstance, items, $rootScope, $http) {
		$scope.rr = [];
		$scope.units = [];
		$scope.infoInputs = {};
		$scope.infoInputs.emp_id = 2;

		$scope.rr.act_fijo_id = {
			selectId: 'act_fijo_id',
			db: 'activo_fijo_tabla',
			where: 'id_padre',
			key: '1',
			mostrar: [ 'id', 'descripcion' ]
		};
		$scope.rr.mar_id = {
			selectId: 'mar_id',
			db: 'marca',
			where: 'mar_id',
			key: '',
			mostrar: [ 'mar_id', 'mar_nom' ]
		};
		$scope.rr.pro_centro_cos = {
			selectId: 'pro_centro_cos',
			db: 'centro_costo',
			where: 'cc_id',
			key: '',
			mostrar: [ 'cc_id', 'cc_des' ]
		};
		$scope.rr.pro_area = {
			selectId: 'pro_area',
			db: 'areas',
			where: 'id',
			key: '',
			mostrar: [ 'id', 'are_des' ]
		};
		$scope.rr.pro_grup_af = {
			selectId: 'pro_grup_af',
			db: 'grupo_activo',
			where: 'id_padre',
			key: '1',
			mostrar: [ 'id', 'descripcion' ]
		};
		$scope.rr.pro_grup_dep = {
			selectId: 'pro_grup_dep',
			db: 'grupo_activo',
			where: 'id_padre',
			key: '2',
			mostrar: [ 'id', 'descripcion' ]
		};
		$scope.rr.pro_met_dep = {
			selectId: 'pro_met_dep',
			db: 'activo_fijo_tipos_de_depreciacion',
			where: 'id',
			key: '',
			mostrar: [ 'id', 'descripcion' ]
		};
		$scope.rr.pro_met_amor = {
			selectId: 'pro_met_amor',
			db: 'activo_fijo_tipos_amortizacion',
			where: 'id',
			key: '',
			mostrar: [ 'id', 'descripcion' ]
		};
		$scope.rr.pro_user = {
			selectId: 'pro_user',
			db: 'personal',
			where: 'per_id',
			key: '',
			mostrar: [ 'per_id', 'per_nom  ' ]
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
			/*
             if (obj.key === "miEmpresa") {
                    obj.key = miEmpresa
                } else {
                    obj.key = obj.key
                }
            */

			var arr = obj.selectId;
			$http
				.get(
					`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
						.database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
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
		$scope.items = items;
		$scope.selected = {
			item: $scope.items[0]
		};
		$scope.ok = function(val) {
			data = JSON.stringify(val);
			var xml = new XMLHttpRequest();
			var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=producto_pro`;
			xml.open('POST', theUrl);
			xml.send(data);
			xml.onload = () => {
				if (xml.status == 201) {
					$rootScope.reloadDataInventario();
					$uibModalInstance.close($scope.selected.item);
				} else {
					alert('hubo un error');
				}
			};
		};
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}
]);

app.controller('ModalGrabarPuntoVentaCtrl', [
	'$scope',
	'$uibModalInstance',
	'items',
	'$rootScope',
	'$http',
	'toaster',
	'$window',
	'SweetAlert',
	function($scope, $uibModalInstance, items, $rootScope, $http, toaster, $window, SweetAlert) {
		$scope.infoInputs = {};
		$scope.pagos = {};
		$scope.btn = {};

		// buttons

		$scope.btnChange = function(scope) {
			let status;
			if (scope == true) {
				status = false;
			} else {
				status = true;
			}
			return status;
		};

		$scope.button5 = true;

		/* 
		$scope.button = function() {
			$scope.btn_button = true;
			$scope.pagos.debito = {};
		};
		$scope.button2 = function() {
			$scope.btn_button2 = true;
			$scope.pagos.cheque = {};
		};
		$scope.button3 = function() {
			$scope.btn_button3 = true;
			$scope.pagos.transferencia = {};
		};
		$scope.button4 = function() {
			$scope.btn_button4 = true;
			$scope.pagos.credito = {};
		};
		$scope.button5 = function() {
			$scope.btn_button5 = true;
			$scope.pagos.efectivo = {};
		};
		// */

		$scope.infoInputs = $rootScope.formularioModalPagoNuevoPuntoVenta;
		$scope.items = $rootScope.formularioModalPagoNuevoPuntoVentaItems;

		//automatic zone
		//

		$scope.detectarEfectivo = function() {
			if ($scope.pagos.efectivo.get_efectivo >= 1) {
				$scope.pagos.efectivo.tipo_pagos = 1;
				$scope.pagos.efectivo.co_empre_id = JSON.parse($rootScope.d.datos).emp_id;
				$scope.pagos.efectivo.co_empre_id = 16;
				$scope.pagos.efectivo.co_usu_id = JSON.parse($rootScope.d.datos).usu_id;
				$scope.pagos.efectivo.fech_reg = $scope.infoInputs.fechahoy;
				$scope.pagos.efectivo.fech_ven = $scope.infoInputs.fechahoy;
				$scope.pagos.efectivo.ane_id = $scope.infoInputs.ane_id;
				$scope.pagos.efectivo.tipo_doc_cc = 0;
				$scope.pagos.efectivo.serie_cc = 0;
				$scope.pagos.efectivo.number_cc = 0;
			} else {
				$scope.pagos.efectivo = {};
			}
			return $scope.pagos.efectivo;
		};

		$scope.detectarTargeta = function() {
			if ($scope.pagos.tarjeta.import_cc >= 1) {
				$scope.pagos.tarjeta.tipo_pagos = 7;
				$scope.pagos.tarjeta.co_empre_id = JSON.parse($rootScope.d.datos).emp_id;
				$scope.pagos.tarjeta.co_empre_id = 16;
				$scope.pagos.tarjeta.co_usu_id = JSON.parse($rootScope.d.datos).usu_id;
				$scope.pagos.tarjeta.fech_reg = $scope.infoInputs.fechahoy;
				$scope.pagos.tarjeta.fech_ven = $scope.infoInputs.fechahoy;
				$scope.pagos.tarjeta.ane_id = $scope.infoInputs.ane_id;
				$scope.pagos.tarjeta.tipo_doc_cc = 0;
				$scope.pagos.tarjeta.serie_cc = 0;
				$scope.pagos.tarjeta.number_cc = 0;
			} else {
				$scope.pagos.tarjeta = {};
			}
			return $scope.pagos.tarjeta;
		};

		$scope.detectarTransferencia = function() {
			if ($scope.pagos.transferencia.import_cc >= 1) {
				$scope.pagos.transferencia.tipo_pagos = 4;
				$scope.pagos.transferencia.co_empre_id = JSON.parse($rootScope.d.datos).emp_id;
				$scope.pagos.transferencia.co_empre_id = 16;
				$scope.pagos.transferencia.co_usu_id = JSON.parse($rootScope.d.datos).usu_id;
				$scope.pagos.transferencia.fech_reg = $scope.infoInputs.fechahoy;
				$scope.pagos.transferencia.fech_ven = $scope.infoInputs.fechahoy;
				$scope.pagos.transferencia.ane_id = $scope.infoInputs.ane_id;
				$scope.pagos.transferencia.tipo_doc_cc = 0;
				$scope.pagos.transferencia.serie_cc = 0;
				$scope.pagos.transferencia.number_cc = 0;
			} else {
				$scope.pagos.transferencia = {};
			}
			return $scope.pagos.transferencia;
		};

		$scope.GuardarVentaPunto = function() {
			let $adver = [];
			let sendObj = JSON.stringify({
				info: [ $scope.infoInputs ],
				items: $scope.items,
				pagos: $scope.pagos
			});
			let xmlhttp = new XMLHttpRequest();
			let theUrl = `../../../../api/insert2TablesVenta/puntoDeVenta.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=venta`;
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

					if ($rr.find(verif) === undefined) {
						let ultimoIngreso = JSON.parse($adver[0]);
						$uibModalInstance.dismiss('cancel');
						$window.open(
							`${$rootScope.miURL}/compass/view/documento-${$scope.infoInputs
								.formato_impresion}.php?emp_id=${JSON.parse($rootScope.d.datos)
								.emp_id}&getdb=${JSON.parse($rootScope.d.datos).database}&nro=${ultimoIngreso[0]
								.ultimo}`
						);
					} else {
						SweetAlert.swal('Venta', `error: ${JSON.stringify($rr.find(verif))}`, 'error');
					}
				} else {
					console.log('error');
				}
				/* $rootScope.loadBtnFilters(); */
				$rootScope.ReloadPuntoDeVenta();
			};
		};
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}
]);
