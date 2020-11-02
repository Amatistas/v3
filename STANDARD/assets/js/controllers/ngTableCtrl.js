'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

var data = [
	{
		id: 1,
		name: 'Batman',
		alias: 'Bruce Wayne',
		publisher: 'DC Comics',
		gender: 'male',
		power: 37
	},
	{
		id: 2,
		name: 'Superman',
		alias: 'Clark Kent',
		publisher: 'DC Comics',
		gender: 'male',
		power: 94
	},
	{
		id: 3,
		name: 'Catwoman',
		alias: 'Selina Kyle',
		publisher: 'DC Comics',
		gender: 'female',
		power: 24
	},
	{
		id: 4,
		name: 'Spider-Man',
		alias: 'Peter Benjamin Parker',
		publisher: 'Marvel Comics',
		gender: 'male',
		power: 58
	},
	{
		id: 5,
		name: 'Banshee',
		alias: 'Sean Cassidy',
		publisher: 'Marvel Comics',
		gender: 'male',
		power: 60
	},
	{
		id: 6,
		name: 'Black Mamba',
		alias: 'Tanya Sealy',
		publisher: 'Marvel Comics',
		gender: 'female',
		power: 78
	},
	{
		id: 7,
		name: 'Batgirl',
		alias: 'Mary Elizabeth Kane',
		publisher: 'DC Comics',
		gender: 'female',
		power: 12
	},
	{
		id: 8,
		name: 'Blade',
		alias: 'Eric Brooks',
		publisher: 'Marvel Comics',
		gender: 'male',
		power: 33
	},
	{
		id: 9,
		name: 'Captain America',
		alias: 'Steven Grant Rogers',
		publisher: 'Marvel Comics',
		gender: 'male',
		power: 46
	},
	{
		id: 10,
		name: 'Lex Luthor',
		alias: "Alexander 'Lex' Joseph Luthor",
		publisher: 'DC Comics',
		gender: 'male',
		power: 10
	},
	{
		id: 11,
		name: 'Marvel Girl',
		alias: 'Rachel Anne Summers',
		publisher: 'Marvel Comics',
		gender: 'female',
		power: 95
	},
	{
		id: 12,
		name: 'Penguin',
		alias: 'Oswald Chesterfield Cobblepot',
		publisher: 'DC Comics',
		gender: 'male',
		power: 30
	},
	{
		id: 13,
		name: 'Rogue',
		alias: 'Anna Marie',
		publisher: 'Marvel Comics',
		gender: 'female',
		power: 80
	}
];

/* //get datas
function loadXMLDoc(myurl, cb) {
    var xhr = (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (typeof cb === 'function') cb(xhr.responseText);
        }
    }
    xhr.open("POST", myurl, true);
    xhr.send();
}
var d = JSON.parse(sessionStorage.datos)
var datax = []
    loadXMLDoc(`../../../../api/r2qE/read.php?getdb=${d.database}&where=id&igual=10&thing=`, function(responseText) {
        datax.push(JSON.parse(responseText).data)
    });
     */
app.controller('ngTableCtrl', [
	'$scope',
	'NgTableParams',
	function($scope, NgTableParams) {
		$scope.tableParams = new NgTableParams(
			{
				page: 1, // show first page
				count: 5, // count per page
				// initial sort order
				sorting: {
					name: 'asc'
				}
			},
			{
				total: data.length, // length of data
				dataset: data
			}
		);
	}
]);
app.controller('ngTableCtrl2', [
	'$scope',
	'$filter',
	'NgTableParams',
	function($scope, $filter, NgTableParams) {
		$scope.tableParams = new NgTableParams(
			{
				page: 1, // show first page
				count: 5, // count per page
				sorting: {
					name: 'asc' // initial sorting
				}
			},
			{
				total: data.length, // length of data
				dataset: data
			}
		);
	}
]);
app.controller('ngTableCtrl3', [
	'$scope',
	'$filter',
	'NgTableParams',
	function($scope, $filter, NgTableParams) {
		$scope.tableParams = new NgTableParams(
			{
				page: 1, // show first page
				count: 5, // count per page
				filter: {
					name: 'M' // initial filter
				}
			},
			{
				total: data.length, // length of data
				dataset: data
			}
		);
	}
]);
app.controller('ngTableCtrl4', [
	'$scope',
	'$filter',
	'NgTableParams',
	function($scope, $filter, NgTableParams) {
		$scope.tableParams = new NgTableParams(
			{
				page: 1, // show first page
				count: 10 // count per page
			},
			{
				total: data.length, // length of data
				dataset: data
			}
		);
	}
]);

app.controller('ngTableCtrl5', [
	'$scope',
	'$filter',
	'NgTableParams',
	function($scope, $filter, NgTableParams) {
		$scope.tableParams = new NgTableParams(
			{
				page: 1, // show first page
				count: 10 // count per page
			},
			{
				total: data.length, // length of data
				dataset: data
			}
		);
	}
]);

app.controller('DemoCtrl', function($scope, $filter, $q, NgTableParams) {
	$scope.tamanoPantalla = screen.width;
	//Event to handle resizing facturas
	$(window).resize(function() {
		$scope.$apply(function() {
			$scope.tamanoPantalla = screen.width;
		});
	});

	var data = [
		{
			id: 1,
			fecha: '07/09/2020',
			documento: 'Factura',
			tipo: 'Compra',
			nro: 'FA001-1',
			pro_id: 1,
			proveedor: 'Contabilizado',
			centroCosto: 'Tienda Olivos',
			area: 'Administración',
			total: 500,
			saldo: 0,
			pagoEstatus: 'Pagado'
		}
	];

	$scope.displaySelectAllCheckbox = false; // show hide in header
	$scope.data = data;
	$scope.tableParams = new NgTableParams(
		{
			page: 1, // show first page
			count: 10 // count per page
		},
		{
			total: data.length, // length of data
			getData: function(params) {
				var deferred = $q.defer();
				// use build-in angular filter
				var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
				orderedData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;
				$scope.orderedData = orderedData;

				params.total(orderedData.length); // set total for recalc pagination
				deferred.resolve(
					($scope.users = orderedData.slice(
						(params.page() - 1) * params.count(),
						params.page() * params.count()
					))
				);
				return deferred.promise;
			}
		}
	);

	var inArray = Array.prototype.indexOf
		? function(val, arr) {
				return arr.indexOf(val);
			}
		: function(val, arr) {
				var i = arr.length;
				while (i--) {
					if (arr[i] === val) return i;
				}
				return -1;
			};
	$scope.names = function(column) {
		var def = $q.defer(),
			arr = [],
			names = [];
		angular.forEach(data, function(item) {
			if (inArray(item.name, arr) === -1) {
				arr.push(item.name);
				names.push({
					id: item.name,
					title: item.name
				});
			}
		});
		def.resolve(names);
		return def;
	};

	$scope.checkboxes = { checked: false, items: {} };

	$scope.selectAll = function(bValue) {
		$scope.checkboxes.checked = bValue;
	};

	// watch for check all checkbox
	$scope.$watch('checkboxes.checked', function(value) {
		angular.forEach($scope.orderedData, function(item) {
			if (angular.isDefined(item.id)) {
				$scope.checkboxes.items[item.id] = value;
			}
		});
	});

	// watch for data checkboxes
	$scope.$watch(
		'checkboxes.items',
		function(values) {
			if (!$scope.users) {
				return;
			}
			var checked = 0,
				unchecked = 0,
				total = $scope.users.length;
			angular.forEach($scope.users, function(item) {
				checked += $scope.checkboxes.items[item.id] || 0;
				unchecked += !$scope.checkboxes.items[item.id] || 0;
			});
			if (unchecked == 0 || checked == 0) {
				$scope.checkboxes.checked = checked == total;
			}
			// grayed checkbox
			angular
				.element(document.getElementById('select_all'))
				.prop('indeterminate', checked != 0 && unchecked != 0);
		},
		true
	);
});
app.controller('DemoCtrl2', function($scope, $filter, $q, NgTableParams) {
	$scope.tamanoPantalla = screen.width;
	//Event to handle resizing proveedores
	$(window).resize(function() {
		$scope.$apply(function() {
			$scope.tamanoPantalla = screen.width;
		});
	});

	var data = [
		{
			pro_id: 1,
			proveedor: 'Contabilizado',
			telefono: '5462584',
			pendiente: 28.3,
			email: 'info@plazavea.com',
			estatus: 'xpagar'
		},
		{
			pro_id: 2,
			proveedor: 'Autocon',
			telefono: '998562348',
			pendiente: 25.0,
			email: 'info@metro.com',
			estatus: 'xpagar'
		},
		{
			pro_id: 3,
			proveedor: 'Contabilizado nombre completo empresa',
			telefono: '968547236',
			pendiente: 0,
			email: 'info@megaplaza.com',
			estatus: 'pagado'
		},
		{
			pro_id: 4,
			proveedor: 'Empresa con Nombre Largo',
			telefono: '5452368549',
			pendiente: 30.0,
			email: 'info@bcp.com',
			estatus: 'xpagar'
		},
		{
			pro_id: 5,
			proveedor: 'Lenovo',
			telefono: '1782637123',
			pendiente: 0,
			email: 'info@lenovo.com',
			estatus: 'pagado'
		},
		{
			pro_id: 6,
			proveedor: 'MiCasa Company',
			telefono: '+015558888',
			pendiente: 0,
			email: 'info@micasa.com',
			estatus: 'pagado'
		},
		{
			pro_id: 7,
			proveedor: 'Microsoft INC',
			telefono: '+015558888',
			pendiente: 0,
			email: 'microsoft@gmail.com.com',
			estatus: 'pagado'
		},
		{
			pro_id: 8,
			proveedor: 'Amazon INC',
			telefono: '+015558123232',
			pendiente: 0,
			email: 'Amazon@gmail.com',
			estatus: 'pagado'
		},
		{
			pro_id: 9,
			proveedor: 'Facebook',
			telefono: '+015558123232',
			pendiente: 0,
			email: 'Facebook@gmail.com',
			estatus: 'pagado'
		},
		{
			pro_id: 10,
			proveedor: 'Twitter INC',
			telefono: '+01551232332',
			pendiente: 800,
			email: 'twitter@gmail.com',
			estatus: 'xpagar'
		},
		{
			pro_id: 11,
			proveedor: 'Google LLC',
			telefono: '+0155123232',
			pendiente: 0,
			email: 'google@gmail.com',
			estatus: 'pagado'
		}
	];

	$scope.displaySelectAllCheckbox = false; // show hide in header

	$scope.data = data;
	$scope.tableproveedores = new NgTableParams(
		{
			page: 1, // show first page
			count: 10 // count per page
		},
		{
			total: data.length, // length of data
			getData: function(params) {
				var deferred = $q.defer();
				// use build-in angular filter
				var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
				orderedData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;
				$scope.orderedData = orderedData;

				params.total(orderedData.length); // set total for recalc pagination
				deferred.resolve(
					($scope.users = orderedData.slice(
						(params.page() - 1) * params.count(),
						params.page() * params.count()
					))
				);
				return deferred.promise;
			}
		}
	);

	$scope.filtroPendientesPorPagar = function(boo) {
		$scope.statusfiltroPendientesPorPagar = !$scope.statusfiltroPendientesPorPagar;
		if ($scope.statusfiltroPendientesPorPagar == true) {
			$scope.tableproveedores.filter().estatus = 'xpagar';
		} else {
			$scope.tableproveedores.filter().estatus = '';
		}
	};

	var inArray = Array.prototype.indexOf
		? function(val, arr) {
				return arr.indexOf(val);
			}
		: function(val, arr) {
				var i = arr.length;
				while (i--) {
					if (arr[i] === val) return i;
				}
				return -1;
			};
	$scope.names = function(column) {
		var def = $q.defer(),
			arr = [],
			names = [];
		angular.forEach(data, function(item) {
			if (inArray(item.name, arr) === -1) {
				arr.push(item.name);
				names.push({
					id: item.name,
					title: item.name
				});
			}
		});
		def.resolve(names);
		return def;
	};

	$scope.checkboxes = { checked: false, items: {} };

	$scope.selectAll = function(bValue) {
		$scope.checkboxes.checked = bValue;
	};

	// watch for check all checkbox
	$scope.$watch('checkboxes.checked', function(value) {
		angular.forEach($scope.orderedData, function(item) {
			if (angular.isDefined(item.id)) {
				$scope.checkboxes.items[item.id] = value;
			}
		});
	});

	// watch for data checkboxes
	$scope.$watch(
		'checkboxes.items',
		function(values) {
			if (!$scope.users) {
				return;
			}
			var checked = 0,
				unchecked = 0,
				total = $scope.users.length;
			angular.forEach($scope.users, function(item) {
				checked += $scope.checkboxes.items[item.id] || 0;
				unchecked += !$scope.checkboxes.items[item.id] || 0;
			});
			if (unchecked == 0 || checked == 0) {
				$scope.checkboxes.checked = checked == total;
			}
			// grayed checkbox
			angular
				.element(document.getElementById('select_all'))
				.prop('indeterminate', checked != 0 && unchecked != 0);
		},
		true
	);
});
app.controller('DemoCtrl3', function($scope, $filter, $q, NgTableParams, $rootScope) {
	$scope.tamanoPantalla = screen.width;
	//Event to handle resizing ventas
	$(window).resize(function() {
		$scope.$apply(function() {
			$scope.tamanoPantalla = screen.width;
		});
	});

	var data = [
		{
			id: 1,
			fecha: '07/09/2020',
			fechaVencimiento: '07/10/2020',
			documento: 'Factura',
			tipo: 'Venta',
			nro: 'FA001-1',
			pro_id: 1,
			cliente: 'Amazon',
			total: 500,
			saldo: 0,
			pagoEstatus: 'Cerrado',
			fatElectronica: 'Enviar'
		},
		{
			id: 2,
			fecha: '07/09/2020',
			fechaVencimiento: '07/10/2020',
			documento: 'Factura',
			tipo: 'Venta',
			nro: 'FA001-3',
			pro_id: 1,
			cliente: 'Twitter',
			total: 900,
			saldo: 0,
			pagoEstatus: 'Cerrado',
			fatElectronica: 'Rechazado'
		},
		{
			id: 3,
			fecha: '07/09/2020',
			fechaVencimiento: '07/10/2020',
			documento: 'Factura',
			tipo: 'Venta',
			nro: 'FA001-3',
			pro_id: 1,
			cliente: 'Coca-Cola',
			total: 100,
			saldo: 0,
			pagoEstatus: 'Cerrado',
			fatElectronica: 'Error'
		},
		{
			id: 4,
			fecha: '07/09/2020',
			fechaVencimiento: '07/10/2020',
			documento: 'Factura',
			tipo: 'Venta',
			nro: 'FA001-4',
			pro_id: 1,
			cliente: 'Huawei',
			total: 800,
			saldo: 0,
			pagoEstatus: 'Cerrado',
			fatElectronica: 'Enviado'
		},
		{
			id: 5,
			fecha: '07/09/2020',
			fechaVencimiento: '07/10/2020',
			documento: 'Factura',
			tipo: 'Venta',
			nro: 'FA001-5',
			pro_id: 1,
			cliente: 'Miguel Acosta',
			total: 1500,
			saldo: 0,
			pagoEstatus: 'Abierto',
			fatElectronica: 'Enviado'
		},
		{
			id: 6,
			fecha: '07/09/2020',
			fechaVencimiento: '07/10/2020',
			documento: 'Factura',
			tipo: 'Venta',
			nro: 'FA001-6',
			pro_id: 1,
			cliente: 'Andry Salazar',
			total: 8630,
			saldo: 0,
			pagoEstatus: 'Abierto',
			fatElectronica: 'Enviado'
		},
		{
			id: 7,
			fecha: '07/09/2020',
			fechaVencimiento: '07/10/2020',
			documento: 'Factura',
			tipo: 'Venta',
			nro: 'FA001-7',
			pro_id: 1,
			cliente: 'Adolfo Gabazutt',
			total: 7500,
			saldo: 0,
			pagoEstatus: 'Abierto',
			fatElectronica: 'Enviado'
		}
	];

	$scope.displaySelectAllCheckbox = true; // show hide in header
	$scope.data = data;
	$scope.tableventas = new NgTableParams(
		{
			page: 1, // show first page
			count: 10 // count per page
		},
		{
			total: data.length, // length of data
			getData: function(params) {
				var deferred = $q.defer();
				// use build-in angular filter
				var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
				orderedData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;
				$scope.orderedData = orderedData;
				params.total(orderedData.length); // set total for recalc pagination
				deferred.resolve(
					($scope.users = orderedData.slice(
						(params.page() - 1) * params.count(),
						params.page() * params.count()
					))
				);
				return deferred.promise;
			}
		}
	);

	$scope.filtroPendientesPorCobrar = function(boo) {
		$rootScope.reloadDataVenta();
		$scope.statusfiltroPendientesPorCobrar = !$scope.statusfiltroPendientesPorCobrar;
		if ($scope.statusfiltroPendientesPorCobrar == true) {
			$scope.tableventas.filter().pagoEstatus = 'Abierto';
		} else {
			$scope.tableventas.filter().pagoEstatus = '';
		}
	};

	var inArray = Array.prototype.indexOf
		? function(val, arr) {
				return arr.indexOf(val);
			}
		: function(val, arr) {
				var i = arr.length;
				while (i--) {
					if (arr[i] === val) return i;
				}
				return -1;
			};
	$scope.names = function(column) {
		var def = $q.defer(),
			arr = [],
			names = [];
		angular.forEach(data, function(item) {
			if (inArray(item.name, arr) === -1) {
				arr.push(item.name);
				names.push({
					id: item.name,
					title: item.name
				});
			}
		});
		def.resolve(names);
		return def;
	};

	$scope.checkboxes = { checked: false, items: {} };

	$scope.selectAll = function(bValue) {
		$scope.checkboxes.checked = bValue;
	};

	// watch for check all checkbox
	$scope.$watch('checkboxes.checked', function(value) {
		angular.forEach($scope.orderedData, function(item) {
			if (angular.isDefined(item.id)) {
				$scope.checkboxes.items[item.id] = value;
			}
		});
	});

	// watch for data checkboxes
	$scope.$watch(
		'checkboxes.items',
		function(values) {
			if (!$scope.users) {
				return;
			}
			var checked = 0,
				unchecked = 0,
				total = $scope.users.length;
			angular.forEach($scope.users, function(item) {
				checked += $scope.checkboxes.items[item.id] || 0;
				unchecked += !$scope.checkboxes.items[item.id] || 0;
			});
			if (unchecked == 0 || checked == 0) {
				$scope.checkboxes.checked = checked == total;
			}
			// grayed checkbox
			angular
				.element(document.getElementById('select_all'))
				.prop('indeterminate', checked != 0 && unchecked != 0);
		},
		true
	);
});
app.controller('DemoCtrl4', function($scope, $filter, $q, NgTableParams) {
	$scope.tamanoPantalla = screen.width;
	//Event to handle resizing Clientes
	$(window).resize(function() {
		$scope.$apply(function() {
			$scope.tamanoPantalla = screen.width;
		});
	});

	var data = [
		{
			pro_id: 1,
			proveedor: 'Contabilizado',
			telefono: '5462584',
			pendiente: 28.3,
			email: 'info@plazavea.com',
			estatus: 'xpagar'
		},
		{
			pro_id: 2,
			proveedor: 'Autocon',
			telefono: '998562348',
			pendiente: 25.0,
			email: 'info@metro.com',
			estatus: 'xpagar'
		},
		{
			pro_id: 3,
			proveedor: 'Contabilizado nombre completo empresa',
			telefono: '968547236',
			pendiente: 0,
			email: 'info@megaplaza.com',
			estatus: 'pagado'
		},
		{
			pro_id: 4,
			proveedor: 'Empresa con Nombre Largo',
			telefono: '5452368549',
			pendiente: 30.0,
			email: 'info@bcp.com',
			estatus: 'xpagar'
		},
		{
			pro_id: 5,
			proveedor: 'Lenovo',
			telefono: '1782637123',
			pendiente: 0,
			email: 'info@lenovo.com',
			estatus: 'pagado'
		},
		{
			pro_id: 6,
			proveedor: 'MiCasa Company',
			telefono: '+015558888',
			pendiente: 0,
			email: 'info@micasa.com',
			estatus: 'pagado'
		},
		{
			pro_id: 7,
			proveedor: 'Microsoft INC',
			telefono: '+015558888',
			pendiente: 0,
			email: 'microsoft@gmail.com.com',
			estatus: 'pagado'
		},
		{
			pro_id: 8,
			proveedor: 'Amazon INC',
			telefono: '+015558123232',
			pendiente: 0,
			email: 'Amazon@gmail.com',
			estatus: 'pagado'
		},
		{
			pro_id: 9,
			proveedor: 'Facebook',
			telefono: '+015558123232',
			pendiente: 0,
			email: 'Facebook@gmail.com',
			estatus: 'pagado'
		},
		{
			pro_id: 10,
			proveedor: 'Twitter INC',
			telefono: '+01551232332',
			pendiente: 800,
			email: 'twitter@gmail.com',
			estatus: 'xpagar'
		},
		{
			pro_id: 11,
			proveedor: 'Google LLC',
			telefono: '+0155123232',
			pendiente: 0,
			email: 'google@gmail.com',
			estatus: 'pagado'
		}
	];

	$scope.displaySelectAllCheckbox = false; // show hide in header

	$scope.data = data;
	$scope.tableproveedores = new NgTableParams(
		{
			page: 1, // show first page
			count: 10 // count per page
		},
		{
			total: data.length, // length of data
			getData: function(params) {
				var deferred = $q.defer();
				// use build-in angular filter
				var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
				orderedData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;
				$scope.orderedData = orderedData;

				params.total(orderedData.length); // set total for recalc pagination
				deferred.resolve(
					($scope.users = orderedData.slice(
						(params.page() - 1) * params.count(),
						params.page() * params.count()
					))
				);
				return deferred.promise;
			}
		}
	);

	$scope.filtroPendientesPorPagar = function(boo) {
		$scope.statusfiltroPendientesPorPagar = !$scope.statusfiltroPendientesPorPagar;
		if ($scope.statusfiltroPendientesPorPagar == true) {
			$scope.tableproveedores.filter().estatus = 'xpagar';
		} else {
			$scope.tableproveedores.filter().estatus = '';
		}
	};

	var inArray = Array.prototype.indexOf
		? function(val, arr) {
				return arr.indexOf(val);
			}
		: function(val, arr) {
				var i = arr.length;
				while (i--) {
					if (arr[i] === val) return i;
				}
				return -1;
			};
	$scope.names = function(column) {
		var def = $q.defer(),
			arr = [],
			names = [];
		angular.forEach(data, function(item) {
			if (inArray(item.name, arr) === -1) {
				arr.push(item.name);
				names.push({
					id: item.name,
					title: item.name
				});
			}
		});
		def.resolve(names);
		return def;
	};

	$scope.checkboxes = { checked: false, items: {} };

	$scope.selectAll = function(bValue) {
		$scope.checkboxes.checked = bValue;
	};

	// watch for check all checkbox
	$scope.$watch('checkboxes.checked', function(value) {
		angular.forEach($scope.orderedData, function(item) {
			if (angular.isDefined(item.id)) {
				$scope.checkboxes.items[item.id] = value;
			}
		});
	});

	// watch for data checkboxes
	$scope.$watch(
		'checkboxes.items',
		function(values) {
			if (!$scope.users) {
				return;
			}
			var checked = 0,
				unchecked = 0,
				total = $scope.users.length;
			angular.forEach($scope.users, function(item) {
				checked += $scope.checkboxes.items[item.id] || 0;
				unchecked += !$scope.checkboxes.items[item.id] || 0;
			});
			if (unchecked == 0 || checked == 0) {
				$scope.checkboxes.checked = checked == total;
			}
			// grayed checkbox
			angular
				.element(document.getElementById('select_all'))
				.prop('indeterminate', checked != 0 && unchecked != 0);
		},
		true
	);
});

/* app.controller("inventarioCtrl", [
    "$scope",
    "NgTableParams",
    "$http",
    function($scope, NgTableParams,$http) {
        $scope.groups = [];
    	$scope.loadGroups = function() {
		return $scope.groups.length ? null : $http.get(`../../../../api/r2qE/read.php?getdb=nubefa.nubefa&where=id&igual=10&thing=`).then(function(returnGet) {			
			$scope.groups.push(returnGet.data.data);
        });
        };

        $scope.loadGroups()
        $scope.tableParams = new NgTableParams({
            page: 1, // show first page
            count: 10, // count per page
            // initial sort order
            sorting: {
                name: "pro_id",
            },
        }, {
            total: $scope.groups[0].length, // length of data
            dataset: $scope.groups[0],
        });
    }
s
]); */

app.controller('puntoVentaCtrl', function(
	$scope,
	$http,
	$uibModal,
	$filter,
	NgTableParams,
	$rootScope,
	SweetAlert,
	toaster,
	$state
) {
	$scope.infoInputs = {};

	$scope.readDefaultSettingsLocalStorage = function() {
		let predet = localStorage.getItem('predeterminados_punto_de_venta');
		if (predet != null) {
			$scope.infoInputs = JSON.parse(predet);
		} else {
			toaster.pop('error', 'Impresión', 'Configure el formato de Impresión');
			$scope.infoInputs.formato_impresion = 'A4';
		}
	};
	$scope.readDefaultSettingsLocalStorage();

	$scope.infoInputs.usu_id = JSON.parse($rootScope.d.datos).usu_id;
	$scope.infoInputs.emp_id = JSON.parse($rootScope.d.datos).emp_id;
	$scope.infoInputs.loc_id = JSON.parse($rootScope.d.datos).ofi_id;

	$scope.infoInputs.ane_id = $scope.infoInputs.select_ane_id;

	$scope.infoInputs.to_id = 1;

	var f = new Date();
	var ano = f.getFullYear();
	var mes = f.getMonth();
	var dia = f.getDate();

	var fechahoy = new Date(ano, mes, dia);

	$scope.infoInputs.fechahoy = fechahoy;
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
	let misDecimales = 2;

	$scope.productos = {};

	//traer ajustes predeterminados:

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
		where: 'loc_id',
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

	$rootScope.ReloadPuntoDeVenta = function() {
		$state.reload();
	};

	$scope.serializador = function(serie) {
		$http
			.get(
				`../../../../api/mantenimiento/mantenimiento/search3.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=tipo_documento_serie&s=${serie}&key=td_id&where=emp_id&igual=${JSON.parse(
					$rootScope.d.datos
				).emp_id}&where2=ofi_id&igual2=${JSON.parse($rootScope.d.datos)
					.ofi_id}`
			)
			.then(function(response) {
				setTimeout(() => {
					$scope.infoInputs.ven_serSel = $scope.serialSelector[0];
				}, 150);
				return ($scope.serialSelector = response.data.data);
			});
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
	$scope.itemListVentas = [];
	$scope.additem = function(item, stock) {
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
		if (isNumber(validaVacio(item.vd_can))) {
			toaster.pop('error', 'Alerta', 'Complete la Cantidad del Producto');
		} else if (item.vd_can > stock) {
			toaster.pop('error', 'Alerta', 'Completa todo el Formulario');
		} else {
			$scope.itemListVentas.push(item);
			$scope.productos.selected = undefined;
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
		var total = parseFloat(val / $scope.valorIgvConvertido) * (parseFloat($scope.mySessionEmpresa.emp_igv) / 100);
		return total;
	};

	$scope.guardarPuntoVenta = function(data, items) {
		$rootScope.formularioModalPagoNuevoPuntoVenta = data;
		$rootScope.formularioModalPagoNuevoPuntoVentaItems = items;
		var modalInstance = $uibModal.open({
			templateUrl: 'STANDARD/assets/sistem-views/ventas/formulario-modal-pago-nuevo-punto-venta.html',
			controller: 'ModalGrabarPuntoVentaCtrl',
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
				console.log.info('Modal dismissed at: ' + new Date());
			}
		);
	};

	$scope.guardarVenta = function() {
		let sendObj = JSON.stringify({
			info: [ $scope.infoInputs ],
			items: $scope.itemListVentas
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
});

app.controller('inventarioCtrl', function($scope, $http, $filter, NgTableParams) {
	$http
		.get(`../../../../api/r2qE/read.php?getdb=nubefa.nubefa&where=id&igual=10&thing=`)
		.then(function(data, status) {
			$scope.datax = data.data.data;
			$scope.tableParams = new NgTableParams(
				{
					page: 1, // show first page
					count: 10, // count per page
					sorting: {
						pro_id: 'asc' // initial sorting
					}
				},
				{
					total: $scope.datax.length // length of data
				}
			);
		});
});
app.controller('asientoTablaDetalleCtrl', function($scope, $http, $filter, $rootScope) {
	$http
		.get(
			`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=detalleasiento&where=idcabecera&igual=${$rootScope.cabeceraAsiento.id}`
		)
		.then(function(data, status) {
			$scope.datax = data.data.data;
		});
	$scope.getTotalDebe = function() {
		var total = 0;
		for (var i = 0, len = $scope.datax.length; i < len; i++) {
			if ($scope.datax[i].d_h == 'D') {
				total = total + parseFloat($scope.datax[i].monto);
			}
		}
		return total;
	};
	$scope.getTotalHaber = function() {
		var total = 0;
		for (var i = 0, len = $scope.datax.length; i < len; i++) {
			if ($scope.datax[i].d_h == 'H') {
				total = total + parseFloat($scope.datax[i].monto);
			}
		}
		return total;
	};
	$scope.getTotalDebedolar = function() {
		var total = 0;
		for (var i = 0, len = $scope.datax.length; i < len; i++) {
			if ($scope.datax[i].d_h == 'D') {
				total = total + parseFloat($scope.datax[i].monto) / 3.6;
			}
		}
		return total;
	};
	$scope.getTotalHaberdolar = function() {
		var total = 0;
		for (var i = 0, len = $scope.datax.length; i < len; i++) {
			if ($scope.datax[i].d_h == 'H') {
				total = total + parseFloat($scope.datax[i].monto) / 3.6;
			}
		}
		return total;
	};
});
app.controller('compraDetalleCtrl', function($scope, $http, $filter, $rootScope) {
	/* informacion de la cabezera */
	$http
		.get(
			`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=vista_compra_det&where=com_id&igual=${$rootScope.cabeceraAsiento.re_com_id}`
		)
		.then(function(data, status) {
			$scope.arry = data.data.data[0];
			// $scope.arry.push(data.data.data[0]);
		});
	console.log($rootScope.cabeceraAsiento);
	console.log($scope.arry);
	$http
		.get(
			`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=vistapagos&where=id&igual=${$rootScope.cabeceraAsiento.re_com_id}`
		)
		.then(function(data, status) {
			$scope.pagoPago = data.data.data;
		});
	console.log($scope.pagoPago);
	$http
		.get(
			`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=detalle_compra_det&where=det_com_id&igual=${$rootScope.cabeceraAsiento.re_com_id}`
		)
		.then(function(data, status) {
			$scope.arryItem = data.data.data;
		});

	$scope.arryItemtotal = function() {
		var total = 0;
		for (var i = 0; i < $scope.arryItem.length; i++) {
			total = total + parseFloat($scope.arryItem[i].cd_pre) * parseFloat($scope.arryItem[i].cd_can);
		}
		return total;
	};
});

app.controller('ventaDetalleCtrl', function($scope, $http, $rootScope, $state) {
	$rootScope.ventaDetalle = { venta_id: $state.params.idventa };
	/* informacion de la cabezera */
	$http
		.get(
			`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=venta_vista_detalle&where=ven_id&igual=${$rootScope.ventaDetalle.venta_id}`
		)
		.then(function(data, status) {
			$scope.arry = data.data.data[0];
			// $scope.arry.push(data.data.data[0]);
		});

	$http
		.get(
			`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=vistacobroventa&where=id&igual=${$rootScope.ventaDetalle.venta_id}`
		)
		.then(function(data, status) {
			$scope.pagoPago = data.data.data;
		});

	$http
		.get(
			`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=detalle_venta_det&where=venta_id&igual=${$rootScope.ventaDetalle.venta_id}`
		)
		.then(function(data, status) {
			$scope.arryItem = data.data.data;
		});

	/*$scope.arryItemtotal = function() {
        var total = 0;
        for (var i = 0; i < $scope.arryItem.length; i++) {
            total = total + (parseFloat($scope.arryItem[i].cd_pre) * parseFloat($scope.arryItem[i].cd_can));
        }
        return total
    }; */

	/////////////PANTALLA PARA IMPRIMIR
	$scope.printDiv = function(nombreDiv) {
		var contenido = document.getElementById(nombreDiv).innerHTML;
		var contenidoOriginal = document.body.innerHTML;

		document.body.innerHTML = contenido;

		// window.print(contenidoOriginal);
		console.log(window.print(contenidoOriginal));
		document.body.innerHTML = contenidoOriginal;
	};
});

app.controller('compraDetalleCtrl2', function($scope, $http, $filter, $rootScope) {
	/* informacion de la cabezera */
	$http
		.get(
			`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=vista_compra_det&where=com_id&igual=${$rootScope.cabeceraCompra.det_com_id}`
		)
		.then(function(data, status) {
			$scope.arry = data.data.data[0];
			// $scope.arry.push(data.data.data[0]);
		});
	console.log($rootScope.cabeceraCompra);
	console.log($scope.arry);
	$http
		.get(
			`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=vistapagos&where=id&igual=${$rootScope.cabeceraCompra.com_id}`
		)
		.then(function(data, status) {
			$scope.pagoPago = data.data.data;
		});
	console.log($scope.pagoPago);
	$http
		.get(
			`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=detalle_compra_det&where=det_com_id&igual=${$rootScope.cabeceraCompra.det_com_id}`
		)
		.then(function(data, status) {
			$scope.arryItem = data.data.data;
		});

	$scope.arryItemtotal = function() {
		var total = 0;
		for (var i = 0; i < $scope.arryItem.length; i++) {
			total = total + parseFloat($scope.arryItem[i].cd_pre) * parseFloat($scope.arryItem[i].cd_can);
		}
		return total;
	};
});
/*
app.controller("localCtrl", function($scope, $filter, $q, NgTableParams) {
    $scope.tamanoPantalla = screen.width;
    //Event to handle resizing Clientes
    $(window).resize(function() {
        $scope.$apply(function() {
            $scope.tamanoPantalla = screen.width;
        });
    });
    var data = [{
            loc_id: 1,
            emp_id: 2,
            loc_nom: "Local Principal",
            loc_cod: 1,
            loc_dir: "calle principal",
            ubi_id: 80306,
            loc_ema: "adolfo@gmail.com",
            loc_tel: 123456,
            loc_cel: 123456,
            loc_est: 1,
            thema: null,
        },
        {
            loc_id: 2,
            emp_id: 1,
            loc_nom: "SEDE PRINCIPAL LA VAQUERITA",
            loc_cod: 2,
            loc_dir: "casdas",
            ubi_id: 30,
            loc_ema: "adolfo@gmail.com",
            loc_tel: 5879787,
            loc_cel: 7878454,
            loc_est: 1,
            thema: null,
        },
        {
            loc_id: 5,
            emp_id: 1,
            loc_nom: "STORE",
            loc_cod: 5,
            loc_dir: "calle principal",
            ubi_id: 150101,
            loc_ema: "adolfo@gmail.com",
            loc_tel: 1212,
            loc_cel: 1212,
            loc_est: 1,
            thema: null,
        }, {
            loc_id: 7,
            emp_id: 2,
            loc_nom: "Local Segundario",
            loc_cod: 1,
            loc_dir: "AV BETHANCOUR",
            ubi_id: 30,
            loc_ema: "adolfo@gmail.com",
            loc_tel: 123123,
            loc_cel: 123123,
            loc_est: 1,
            thema: null,
        }
    ];

    $scope.displaySelectAllCheckbox = false; // show hide in header

    $scope.data = data;
    $scope.tableproveedores = new NgTableParams({
        page: 1, // show first page
        count: 10, // count per page
    }, {
        total: data.length, // length of data
        getData: function(params) {
            var deferred = $q.defer();
            // use build-in angular filter
            var orderedData = params.sorting() ?
                $filter("orderBy")(data, params.orderBy()) :
                data;
            orderedData = params.filter() ?
                $filter("filter")(orderedData, params.filter()) :
                orderedData;
            $scope.orderedData = orderedData;

            params.total(orderedData.length); // set total for recalc pagination
            deferred.resolve(
                ($scope.users = orderedData.slice(
                    (params.page() - 1) * params.count(),
                    params.page() * params.count()
                ))
            );
            return deferred.promise;
        },
    });

    $scope.filtroPendientesPorPagar = function(boo) {
        $scope.statusfiltroPendientesPorPagar = !$scope.statusfiltroPendientesPorPagar;
        if ($scope.statusfiltroPendientesPorPagar == true) {
            $scope.tableproveedores.filter().estatus = "xpagar";
        } else {
            $scope.tableproveedores.filter().estatus = "";
        }
    };

    var inArray = Array.prototype.indexOf ?

        function(val, arr) {
            return arr.indexOf(val);
        } :
        function(val, arr) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === val) return i;
            }
            return -1;
        };
    $scope.names = function(column) {
        var def = $q.defer(),
            arr = [],
            names = [];
        angular.forEach(data, function(item) {
            if (inArray(item.name, arr) === -1) {
                arr.push(item.name);
                names.push({
                    id: item.name,
                    title: item.name,
                });
            }
        });
        def.resolve(names);
        return def;
    };

    $scope.checkboxes = { checked: false, items: {} };

    $scope.selectAll = function(bValue) {
        $scope.checkboxes.checked = bValue;
    };

    // watch for check all checkbox
    $scope.$watch("checkboxes.checked", function(value) {
        angular.forEach($scope.orderedData, function(item) {
            if (angular.isDefined(item.id)) {
                $scope.checkboxes.items[item.id] = value;
            }
        });
    });

    // watch for data checkboxes
    $scope.$watch(
        "checkboxes.items",
        function(values) {
            if (!$scope.users) {
                return;
            }
            var checked = 0,
                unchecked = 0,
                total = $scope.users.length;
            angular.forEach($scope.users, function(item) {
                checked += $scope.checkboxes.items[item.id] || 0;
                unchecked += !$scope.checkboxes.items[item.id] || 0;
            });
            if (unchecked == 0 || checked == 0) {
                $scope.checkboxes.checked = checked == total;
            }
            // grayed checkbox
            angular
                .element(document.getElementById("select_all"))
                .prop("indeterminate", checked != 0 && unchecked != 0);
        },
        true
    );
});
*/

app.controller('localCtrl', localCtrl);

function localCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;
	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=local&where=emp_id&igual=${JSON.parse($rootScope.d.datos).emp_id}`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('loc_id').withTitle('CÓDIGO'),
		DTColumnBuilder.newColumn('loc_nom').withTitle('DESCRIPCIÓN'),
		DTColumnBuilder.newColumn('loc_dir').withTitle('DIRECCIÓN'),
		DTColumnBuilder.newColumn('loc_ema').withTitle('EMAIL'),
		DTColumnBuilder.newColumn(null).withTitle().renderWith(function(data, type, full) {
			return `<div class="contenedor">
            <button class="dropbtn action-ver-editar">Ver / Editar</button>
            </div>
               `;
		})
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerSeeOrEdit = someClickHandlerSeeOrEdit;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerSeeOrEdit(info) {
		alert('prepare to see');
		$rootScope.nuevolocal(info);
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-ver-editar', nRow).unbind('click');
		$('td .action-ver-editar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerSeeOrEdit(aData);
			});
		});
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataLocal = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}

app.controller('SerializadoresCtrl', SerializadoresCtrl);
function SerializadoresCtrl($http, $q, $scope, $rootScope, $filter, getResources, SweetAlert,toaster) {
	$scope.fetchData = function() {
		let obj = { db: 'tipo_documento_serie', where: 'ofi_id', key: JSON.parse($rootScope.d.datos).ofi_id };
		getResources.fetchResourcesDoubleSearch(obj).then(
			function(d) {
				$scope.itemslistaSerializador = d.data;
			},
			function(errResponse) {
				console.error('Error while fetching Currencies');
			}
		);
	};
	$scope.fetchData();

	$scope.nuevaSerie = function (){
		$rootScope.newSerializadorCreate()

	}

	$scope.editar = function (item){
		$rootScope.newSerializadorCreate(item)

	}

	$scope.remove = function(id,index) {
		SweetAlert.swal(
			{
				title: 'Estas seguro?',
				text: 'Esta acción es irreversible',
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#DD6B55',
				confirmButtonText: 'Aceptar',
				cancelButtonText: 'Cancelar',
				closeOnConfirm: false,
				closeOnCancel: false
			},
			function(isConfirm) {
				if (isConfirm) {
					let obj = {
						tb: 'tipo_documento_serie',
						col: 'id',
						ident: id
					};

					let sendObj = JSON.stringify(obj);
					var xmlhttp = new XMLHttpRequest();
					var theUrl = `../../../../api/mantenimiento/mantenimiento/delete.php?getdb=${JSON.parse($rootScope.d.datos)
						.database}&tbnom=tipo_documento_serie`;
					xmlhttp.open('post', theUrl);
					xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
					xmlhttp.withCredentials = true;
					xmlhttp.send(sendObj);
					xmlhttp.onload = (response) => {
						if (xmlhttp.status == 200) {
							$scope.itemslistaSerializador.splice(index, 1);
							SweetAlert.swal({
								title: 'Eliminado!',
								text: 'La Serie se Elimino',
								type: 'success',
								confirmButtonColor: '#007AFF'
							});
						} else {
							
						}
					};
				} else {
					SweetAlert.swal({
						title: 'Cancelado',
						text: 'la Operacion se a cancelado',
						type: 'error',
						confirmButtonColor: '#007AFF'
					});
				}
			}
		);
	};
}

app.controller('tpo_docCtrl', tpo_docCtrl);

function tpo_docCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=tipo_documento&where=id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('td_id').withTitle('CÓDIGO'),
		DTColumnBuilder.newColumn('td_nom').withTitle('NOMBRE'),
		DTColumnBuilder.newColumn('td_snt').withTitle('CODIGO SUNAT'),
		DTColumnBuilder.newColumn('td_sntnom').withTitle('NOMBRE SGN.SUNAT')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataTipoDoc = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('tpo_sujCtrl', tpo_sujCtrl);

function tpo_sujCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=tipo_sujeto&where=tsid&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('tsid').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('ts_id').withTitle('CÓDIGO'),
		DTColumnBuilder.newColumn('ts_des').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataTipoSujeto = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('tpo_socCtrl', tpo_socCtrl);

function tpo_socCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=tipo_socio&where=id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('tdso_id').withTitle('CÓDIGO NOMBRE'),
		DTColumnBuilder.newColumn('tdso_desc').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataTipoSocio = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('areasCtrl', areasCtrl);

function areasCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=areas&where=emp_id&igual=${JSON.parse($rootScope.d.datos).emp_id}`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('are_id').withTitle('CÓDIGO NOMBRE'),
		DTColumnBuilder.newColumn('are_des').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataArea = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('loteProducCtrl', loteProducCtrl);

function loteProducCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=dbo.lote_produccion&where=lotpro_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('lotpro_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('lotpro_cod').withTitle('CÓDIGO'),
		DTColumnBuilder.newColumn('lotpro_nom').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataLoteProduc = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('lineaProducCtrl', lineaProducCtrl);

function lineaProducCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=linea_produccion&where=linpro_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('linpro_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('linpro_nom').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataLineaProduc = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('almacenCtrl', almacenCtrl);

function almacenCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=almacen_info&where=emp_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('alm_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('loc_id').withTitle('CÓDIGO DE LOCAL'),
		DTColumnBuilder.newColumn('alm_cod').withTitle('CÓDIGO DE ALMACÉN'),
		DTColumnBuilder.newColumn('alm_nom').withTitle('DESCRIPCIÓN'),
		DTColumnBuilder.newColumn('alm_dir').withTitle('DIRECCIÓN'),
		DTColumnBuilder.newColumn('ubi_id').withTitle('UBICACIÓN'),
		DTColumnBuilder.newColumn('alm_tel').withTitle('TELÉFONO')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataAlmacen = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('lineaLineaCtrl', lineaLineaCtrl);

function lineaLineaCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=linea_linea&where=emp_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('lin_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('lin_cod').withTitle('CÓDIGO LINEA'),
		DTColumnBuilder.newColumn('lin_nom').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataLineaLinea = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('categoriaCtrl', categoriaCtrl);

function categoriaCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=categoria&where=emp_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('cat_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('cat_nom').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataCategoria = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('subCategoriaCtrl', subCategoriaCtrl);

function subCategoriaCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=subcategoria&where=cat_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('scat_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('scat_nom').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataSubCatego = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('marcaCtrl', marcaCtrl);

function marcaCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=marca&where=mar_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('mar_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('mar_nom').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataMarca = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('aplicacionesCtrl', aplicacionesCtrl);

function aplicacionesCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=aplicacion&where=id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('apl_cod').withTitle('CÓDIGO'),
		DTColumnBuilder.newColumn('apl_des').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataAplicacion = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('presentacionCtrl', presentacionCtrl);

function presentacionCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=presentacion&where=id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('pst_id').withTitle('CÓDIGO'),
		DTColumnBuilder.newColumn('pst_nom').withTitle('DESCRIPCIÓN'),
		DTColumnBuilder.newColumn('pst_snt').withTitle('CÓDIGO SUNAT')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataPresentacion = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('choferesCtrl', choferesCtrl);

function choferesCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=chofer&where=emp_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('ch_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('ch_tipdoc').withTitle('TIPO DE DOCUMENTO'),
		DTColumnBuilder.newColumn('ch_numdoc').withTitle('CÓDIGO'),
		DTColumnBuilder.newColumn('ch_razsoc').withTitle('DESCRIPCIÓN'),
		DTColumnBuilder.newColumn('ch_nom').withTitle('NOMBRE'),
		DTColumnBuilder.newColumn('ch_apepat').withTitle('APELLIDO PATERNO'),
		DTColumnBuilder.newColumn('ch_apemat').withTitle('APELLIDO MATERNO'),
		DTColumnBuilder.newColumn('ch_bre').withTitle('BREVETE')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataChofer = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('vehiculoCtrl', vehiculoCtrl);

function vehiculoCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=vehiculo&where=emp_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('vh_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('vh_cod').withTitle('CÓDIGO VEHÍCULO'),
		DTColumnBuilder.newColumn('ch_id').withTitle('CHOFER'),
		DTColumnBuilder.newColumn('vh_mar').withTitle('MARCA'),
		DTColumnBuilder.newColumn('vh_pla').withTitle('PLACA'),
		DTColumnBuilder.newColumn('vh_des').withTitle('DESCRIPCIÓN'),
		DTColumnBuilder.newColumn('vh_mod').withTitle('MODELO')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataVehiculo = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('bancosCtrl', bancosCtrl);

function bancosCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=bancos&where=ban_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('ban_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('ban_des').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataBanco = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('cuentaBancosCtrl', cuentaBancosCtrl);

function cuentaBancosCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=cuenta_banco&where=emp_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('ctaban_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('tipcta_id').withTitle('TIPO DE CUENTA'),
		DTColumnBuilder.newColumn('ctaban_num').withTitle('NUMERO DE CUENTA'),
		DTColumnBuilder.newColumn('ban_id').withTitle('BANCO'),
		DTColumnBuilder.newColumn('mnd_id').withTitle('MONEDA'),
		DTColumnBuilder.newColumn('cta_id').withTitle('CUENTA')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataCtaBanco = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('tpoCtaBanCtrl', tpoCtaBanCtrl);

function tpoCtaBanCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=tipo_cuenta&where=tipcta_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('tipcta_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('tipcta_desc').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataTipoCtaBan = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('metoPagoCtrl', metoPagoCtrl);

function metoPagoCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=forma_pago&where=fp_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('fp_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('fp_nom').withTitle('DESCRIPCIÓN'),
		DTColumnBuilder.newColumn('fp_diacre').withTitle('DÍA CREDITO')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataMetodoPago = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('ptillaAsientosCtrl', function($scope, $filter, $q, NgTableParams) {
	$scope.tamanoPantalla = screen.width;
	//Event to handle resizing Clientes
	$(window).resize(function() {
		$scope.$apply(function() {
			$scope.tamanoPantalla = screen.width;
		});
	});
	var data = [
		{
			plaasi_id: 1,
			pad_num: 1,
			to_id: 0,
			cta_id: 1212111,
			pad_dh: 'D',
			prm_id: 7,
			mnd_id: '',
			cc_id: '',
			pad_glo: '',
			pad_ord: 1
		},
		{
			plaasi_id: 1,
			pad_num: 2,
			to_id: 0,
			cta_id: 4011111,
			pad_dh: 'H',
			prm_id: 3,
			mnd_id: '',
			cc_id: '',
			pad_glo: '',
			pad_ord: 2
		},
		{
			plaasi_id: 1,
			pad_num: 3,
			to_id: 0,
			cta_id: 4011311,
			pad_dh: 'H',
			prm_id: 6,
			mnd_id: '',
			cc_id: '',
			pad_glo: '',
			pad_ord: 3
		},
		{
			plaasi_id: 1,
			pad_num: 4,
			to_id: 0,
			cta_id: 4012111,
			pad_dh: 'H',
			prm_id: 2,
			mnd_id: '',
			cc_id: '',
			pad_glo: '',
			pad_ord: 4
		},
		{
			plaasi_id: 1,
			pad_num: 5,
			to_id: 0,
			cta_id: 7011111,
			pad_dh: 'H',
			prm_id: 1,
			mnd_id: '',
			cc_id: '',
			pad_glo: '',
			pad_ord: 5
		},
		{
			plaasi_id: 1,
			pad_num: 6,
			to_id: 0,
			cta_id: 6911111,
			pad_dh: 'D',
			prm_id: 10,
			mnd_id: '',
			cc_id: '',
			pad_glo: '',
			pad_ord: 6
		},
		{
			plaasi_id: 1,
			pad_num: 7,
			to_id: 0,
			cta_id: 2011111,
			pad_dh: 'H',
			prm_id: 10,
			mnd_id: '',
			cc_id: '',
			pad_glo: '',
			pad_ord: 7
		}
	];

	$scope.displaySelectAllCheckbox = false; // show hide in header

	$scope.data = data;
	$scope.tableproveedores = new NgTableParams(
		{
			page: 1, // show first page
			count: 10 // count per page
		},
		{
			total: data.length, // length of data
			getData: function(params) {
				var deferred = $q.defer();
				// use build-in angular filter
				var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
				orderedData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;
				$scope.orderedData = orderedData;

				params.total(orderedData.length); // set total for recalc pagination
				deferred.resolve(
					($scope.users = orderedData.slice(
						(params.page() - 1) * params.count(),
						params.page() * params.count()
					))
				);
				return deferred.promise;
			}
		}
	);

	$scope.filtroPendientesPorPagar = function(boo) {
		$scope.statusfiltroPendientesPorPagar = !$scope.statusfiltroPendientesPorPagar;
		if ($scope.statusfiltroPendientesPorPagar == true) {
			$scope.tableproveedores.filter().estatus = 'xpagar';
		} else {
			$scope.tableproveedores.filter().estatus = '';
		}
	};

	var inArray = Array.prototype.indexOf
		? function(val, arr) {
				return arr.indexOf(val);
			}
		: function(val, arr) {
				var i = arr.length;
				while (i--) {
					if (arr[i] === val) return i;
				}
				return -1;
			};
	$scope.names = function(column) {
		var def = $q.defer(),
			arr = [],
			names = [];
		angular.forEach(data, function(item) {
			if (inArray(item.name, arr) === -1) {
				arr.push(item.name);
				names.push({
					id: item.name,
					title: item.name
				});
			}
		});
		def.resolve(names);
		return def;
	};

	$scope.checkboxes = { checked: false, items: {} };

	$scope.selectAll = function(bValue) {
		$scope.checkboxes.checked = bValue;
	};

	// watch for check all checkbox
	$scope.$watch('checkboxes.checked', function(value) {
		angular.forEach($scope.orderedData, function(item) {
			if (angular.isDefined(item.id)) {
				$scope.checkboxes.items[item.id] = value;
			}
		});
	});

	// watch for data checkboxes
	$scope.$watch(
		'checkboxes.items',
		function(values) {
			if (!$scope.users) {
				return;
			}
			var checked = 0,
				unchecked = 0,
				total = $scope.users.length;
			angular.forEach($scope.users, function(item) {
				checked += $scope.checkboxes.items[item.id] || 0;
				unchecked += !$scope.checkboxes.items[item.id] || 0;
			});
			if (unchecked == 0 || checked == 0) {
				$scope.checkboxes.checked = checked == total;
			}
			// grayed checkbox
			angular
				.element(document.getElementById('select_all'))
				.prop('indeterminate', checked != 0 && unchecked != 0);
		},
		true
	);
});
app.controller('parametrosCtrl', function($scope, $filter, $q, NgTableParams) {
	$scope.tamanoPantalla = screen.width;
	//Event to handle resizing Clientes
	$(window).resize(function() {
		$scope.$apply(function() {
			$scope.tamanoPantalla = screen.width;
		});
	});
	var data = [
		{
			id: 1,
			parametros: 'Saldo Inicial Accionistas Préstamo'
		},
		{
			id: 2,
			parametros: 'Saldo Inicial Clientes'
		},
		{
			id: 3,
			parametros: 'Saldo Inicial Cobro Diversos Dividendos'
		},
		{
			id: 4,
			parametros: 'Saldo Inicial Cobro Diversos Intereses'
		},
		{
			id: 5,
			parametros: 'Saldo Inicial Cobro Diversos Préstamo'
		},
		{
			id: 6,
			parametros: 'Saldo Inicial Cobro Diversos Reclamacion Aseguradora'
		},
		{
			id: 7,
			parametros: 'Saldo Inicial Cobro Diversos Reclamacion Serv. Público'
		},
		{
			id: 8,
			parametros: 'Saldo Inicial Cobro Diversos Reclamacion Tributos'
		},
		{
			id: 9,
			parametros: 'Saldo Inicial Cobro Diversos Reglias'
		},
		{
			id: 10,
			parametros: 'Saldo Inicial Personal a Rendir Cuenta'
		},
		{
			id: 11,
			parametros: 'Saldo Inicial Personal Adelanto Remuneración'
		},
		{
			id: 12,
			parametros: 'Saldo Inicial Personal Adelanto Vacaciones'
		},
		{
			id: 13,
			parametros: 'Saldo Inicial Personal Préstamo'
		},
		{
			id: 14,
			parametros: 'Servicios'
		}
	];

	$scope.displaySelectAllCheckbox = false; // show hide in header

	$scope.data = data;
	$scope.tableproveedores = new NgTableParams(
		{
			page: 1, // show first page
			count: 10 // count per page
		},
		{
			total: data.length, // length of data
			getData: function(params) {
				var deferred = $q.defer();
				// use build-in angular filter
				var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
				orderedData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;
				$scope.orderedData = orderedData;

				params.total(orderedData.length); // set total for recalc pagination
				deferred.resolve(
					($scope.users = orderedData.slice(
						(params.page() - 1) * params.count(),
						params.page() * params.count()
					))
				);
				return deferred.promise;
			}
		}
	);

	$scope.filtroPendientesPorPagar = function(boo) {
		$scope.statusfiltroPendientesPorPagar = !$scope.statusfiltroPendientesPorPagar;
		if ($scope.statusfiltroPendientesPorPagar == true) {
			$scope.tableproveedores.filter().estatus = 'xpagar';
		} else {
			$scope.tableproveedores.filter().estatus = '';
		}
	};

	var inArray = Array.prototype.indexOf
		? function(val, arr) {
				return arr.indexOf(val);
			}
		: function(val, arr) {
				var i = arr.length;
				while (i--) {
					if (arr[i] === val) return i;
				}
				return -1;
			};
	$scope.names = function(column) {
		var def = $q.defer(),
			arr = [],
			names = [];
		angular.forEach(data, function(item) {
			if (inArray(item.name, arr) === -1) {
				arr.push(item.name);
				names.push({
					id: item.name,
					title: item.name
				});
			}
		});
		def.resolve(names);
		return def;
	};

	$scope.checkboxes = { checked: false, items: {} };

	$scope.selectAll = function(bValue) {
		$scope.checkboxes.checked = bValue;
	};

	// watch for check all checkbox
	$scope.$watch('checkboxes.checked', function(value) {
		angular.forEach($scope.orderedData, function(item) {
			if (angular.isDefined(item.id)) {
				$scope.checkboxes.items[item.id] = value;
			}
		});
	});

	// watch for data checkboxes
	$scope.$watch(
		'checkboxes.items',
		function(values) {
			if (!$scope.users) {
				return;
			}
			var checked = 0,
				unchecked = 0,
				total = $scope.users.length;
			angular.forEach($scope.users, function(item) {
				checked += $scope.checkboxes.items[item.id] || 0;
				unchecked += !$scope.checkboxes.items[item.id] || 0;
			});
			if (unchecked == 0 || checked == 0) {
				$scope.checkboxes.checked = checked == total;
			}
			// grayed checkbox
			angular
				.element(document.getElementById('select_all'))
				.prop('indeterminate', checked != 0 && unchecked != 0);
		},
		true
	);
});
app.controller('tpoCambioCtrl', tpoCambioCtrl);

function tpoCambioCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=tipo_cambio&where=tipcam_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('tipcam_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('tipcam_fec').withTitle('FECHA'),
		DTColumnBuilder.newColumn('tipcam_imp').withTitle('IMPORTE')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataTipoCambio = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('centroCostoCtrl', centroCostoCtrl);

function centroCostoCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=centro_costo&where=emp_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('id_papu').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('cc_des').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataCentroCosto = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('claseCuentaCtrl', function($scope, $filter, $q, NgTableParams) {
	$scope.tamanoPantalla = screen.width;
	//Event to handle resizing Clientes
	$(window).resize(function() {
		$scope.$apply(function() {
			$scope.tamanoPantalla = screen.width;
		});
	});
	var data = [
		{
			cls_id: 1,
			cls_nom: 'Activo'
		},
		{
			cls_id: 2,
			cls_nom: 'Pasivo'
		},
		{
			cls_id: 3,
			cls_nom: 'Resultado'
		},
		{
			cls_id: 4,
			cls_nom: 'Naturaleza'
		}
	];

	$scope.displaySelectAllCheckbox = false; // show hide in header

	$scope.data = data;
	$scope.tableproveedores = new NgTableParams(
		{
			page: 1, // show first page
			count: 10 // count per page
		},
		{
			total: data.length, // length of data
			getData: function(params) {
				var deferred = $q.defer();
				// use build-in angular filter
				var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
				orderedData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;
				$scope.orderedData = orderedData;

				params.total(orderedData.length); // set total for recalc pagination
				deferred.resolve(
					($scope.users = orderedData.slice(
						(params.page() - 1) * params.count(),
						params.page() * params.count()
					))
				);
				return deferred.promise;
			}
		}
	);

	$scope.filtroPendientesPorPagar = function(boo) {
		$scope.statusfiltroPendientesPorPagar = !$scope.statusfiltroPendientesPorPagar;
		if ($scope.statusfiltroPendientesPorPagar == true) {
			$scope.tableproveedores.filter().estatus = 'xpagar';
		} else {
			$scope.tableproveedores.filter().estatus = '';
		}
	};

	var inArray = Array.prototype.indexOf
		? function(val, arr) {
				return arr.indexOf(val);
			}
		: function(val, arr) {
				var i = arr.length;
				while (i--) {
					if (arr[i] === val) return i;
				}
				return -1;
			};
	$scope.names = function(column) {
		var def = $q.defer(),
			arr = [],
			names = [];
		angular.forEach(data, function(item) {
			if (inArray(item.name, arr) === -1) {
				arr.push(item.name);
				names.push({
					id: item.name,
					title: item.name
				});
			}
		});
		def.resolve(names);
		return def;
	};

	$scope.checkboxes = { checked: false, items: {} };

	$scope.selectAll = function(bValue) {
		$scope.checkboxes.checked = bValue;
	};

	// watch for check all checkbox
	$scope.$watch('checkboxes.checked', function(value) {
		angular.forEach($scope.orderedData, function(item) {
			if (angular.isDefined(item.id)) {
				$scope.checkboxes.items[item.id] = value;
			}
		});
	});

	// watch for data checkboxes
	$scope.$watch(
		'checkboxes.items',
		function(values) {
			if (!$scope.users) {
				return;
			}
			var checked = 0,
				unchecked = 0,
				total = $scope.users.length;
			angular.forEach($scope.users, function(item) {
				checked += $scope.checkboxes.items[item.id] || 0;
				unchecked += !$scope.checkboxes.items[item.id] || 0;
			});
			if (unchecked == 0 || checked == 0) {
				$scope.checkboxes.checked = checked == total;
			}
			// grayed checkbox
			angular
				.element(document.getElementById('select_all'))
				.prop('indeterminate', checked != 0 && unchecked != 0);
		},
		true
	);
});
app.controller('nivelCuentaCtrl', function($scope, $filter, $q, NgTableParams) {
	$scope.tamanoPantalla = screen.width;
	//Event to handle resizing Clientes
	$(window).resize(function() {
		$scope.$apply(function() {
			$scope.tamanoPantalla = screen.width;
		});
	});
	var data = [
		{
			nvl_id: 1,
			nvl_nom: 'Elemento'
		},
		{
			nvl_id: 2,
			nvl_nom: 'Cuenta'
		},
		{
			nvl_id: 3,
			nvl_nom: 'Sub Cuenta'
		},
		{
			nvl_id: 4,
			nvl_nom: 'Divisionaria'
		}
	];

	$scope.displaySelectAllCheckbox = false; // show hide in header

	$scope.data = data;
	$scope.tableproveedores = new NgTableParams(
		{
			page: 1, // show first page
			count: 10 // count per page
		},
		{
			total: data.length, // length of data
			getData: function(params) {
				var deferred = $q.defer();
				// use build-in angular filter
				var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
				orderedData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;
				$scope.orderedData = orderedData;

				params.total(orderedData.length); // set total for recalc pagination
				deferred.resolve(
					($scope.users = orderedData.slice(
						(params.page() - 1) * params.count(),
						params.page() * params.count()
					))
				);
				return deferred.promise;
			}
		}
	);

	$scope.filtroPendientesPorPagar = function(boo) {
		$scope.statusfiltroPendientesPorPagar = !$scope.statusfiltroPendientesPorPagar;
		if ($scope.statusfiltroPendientesPorPagar == true) {
			$scope.tableproveedores.filter().estatus = 'xpagar';
		} else {
			$scope.tableproveedores.filter().estatus = '';
		}
	};

	var inArray = Array.prototype.indexOf
		? function(val, arr) {
				return arr.indexOf(val);
			}
		: function(val, arr) {
				var i = arr.length;
				while (i--) {
					if (arr[i] === val) return i;
				}
				return -1;
			};
	$scope.names = function(column) {
		var def = $q.defer(),
			arr = [],
			names = [];
		angular.forEach(data, function(item) {
			if (inArray(item.name, arr) === -1) {
				arr.push(item.name);
				names.push({
					id: item.name,
					title: item.name
				});
			}
		});
		def.resolve(names);
		return def;
	};

	$scope.checkboxes = { checked: false, items: {} };

	$scope.selectAll = function(bValue) {
		$scope.checkboxes.checked = bValue;
	};

	// watch for check all checkbox
	$scope.$watch('checkboxes.checked', function(value) {
		angular.forEach($scope.orderedData, function(item) {
			if (angular.isDefined(item.id)) {
				$scope.checkboxes.items[item.id] = value;
			}
		});
	});

	// watch for data checkboxes
	$scope.$watch(
		'checkboxes.items',
		function(values) {
			if (!$scope.users) {
				return;
			}
			var checked = 0,
				unchecked = 0,
				total = $scope.users.length;
			angular.forEach($scope.users, function(item) {
				checked += $scope.checkboxes.items[item.id] || 0;
				unchecked += !$scope.checkboxes.items[item.id] || 0;
			});
			if (unchecked == 0 || checked == 0) {
				$scope.checkboxes.checked = checked == total;
			}
			// grayed checkbox
			angular
				.element(document.getElementById('select_all'))
				.prop('indeterminate', checked != 0 && unchecked != 0);
		},
		true
	);
});
app.controller('planCuentaCtrl', planCuentaCtrl);

function planCuentaCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=plan_cuenta&where=id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('cta_id').withTitle('NÚMERO DE CUENTA'),
		DTColumnBuilder.newColumn('cta_nom').withTitle('NOMBRE DE CUENTA'),
		DTColumnBuilder.newColumn('clacta_id').withTitle('CLASE CUENTA'),
		DTColumnBuilder.newColumn('nivcta_id').withTitle('NIVEL CUENTA'),
		DTColumnBuilder.newColumn('mnd_id').withTitle('MONEDA'),
		DTColumnBuilder.newColumn('cta_tipcamcie').withTitle('TIPO CAMBIO DE CIERRE'),
		DTColumnBuilder.newColumn('cta_tipaju').withTitle('TIPOS AJUSTE')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataPlanCuenta = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('tipoAsientoCtrl', tipoAsientoCtrl);

function tipoAsientoCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=tipo_asiento&where=tdasi_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('tdasi_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('codigo').withTitle('CÓDIGO'),
		DTColumnBuilder.newColumn('tdasi_nom').withTitle('DESCIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataTipoAsiento = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('tpoHorariosCtrl', tpoHorariosCtrl);

function tpoHorariosCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=tipo_horario&where=tiphor_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('tiphor_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('tiphor_nom').withTitle('CÓDIGO'),
		DTColumnBuilder.newColumn('tiphor_horini').withTitle('HORA DE INICIO'),
		DTColumnBuilder.newColumn('tiphor_horfin').withTitle('HORA DE FIN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}
	$rootScope.reloadDataTipoHorario = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('regiLaboCtrl', regiLaboCtrl);

function regiLaboCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=regimen_laboral&where=reglab_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('reglab_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('reglab_nom').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataRegimenLaboral = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('conceptosCtrl', conceptosCtrl);

function conceptosCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=concepto_laboral&where=conlab_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('conlab_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('conlab_cod').withTitle('CÓDIGO'),
		DTColumnBuilder.newColumn('conlab_nom').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataConceptos = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('tipoPagoCtrl', tipoPagoCtrl);

function tipoPagoCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=tipos_pago&where=id_tp&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('id_tp').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('tp_nom').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataTipoPagos = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('beneficiosCtrl', beneficiosCtrl);

function beneficiosCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=politicas_beneficios_tipos&where=polben_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('polben_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('polben_des').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataBeneficios = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('tipoContratoCtrl', tipoContratoCtrl);

function tipoContratoCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=tipo_contrato&where=tipcon_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('tipcon_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('tipcon_nom').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataTipoContrato = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('sisPensiCtrl', sisPensiCtrl);

function sisPensiCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=sistema_pension&where=sispen_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('sispen_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('sispen_nom').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataSistPension = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('sisSaludCtrl', sisSaludCtrl);

function sisSaludCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=sistema_salud&where=sissal_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('sissal_id').withTitle('ORDEN'),
		DTColumnBuilder.newColumn('sissal_nom').withTitle('DESCRIPCIÓN')
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataSistSalud = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
