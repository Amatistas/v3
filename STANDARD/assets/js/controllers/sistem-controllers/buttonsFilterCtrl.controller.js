// vm.fetchDataBtn(n) ver "n" en api/dataTableFilterBtn/FIltrosBtn.php

app.controller('buttonsFilterCtrl', function($scope, $http, $rootScope, filtrosBotones) {
	var vm = this;

	vm.fetchDataBtn = function(type) {
		var res = [];
		filtrosBotones.fetchDataBtn(type).then(
			function(d) {
				res.push(d);
			},
			function(errResponse) {
				console.error('Error while fetching Currencies');
			}
		);
		return res;
	};
	
	$rootScope.loadBtnFilters = function() {
		console.log('loadData');
		vm.btn1 = vm.fetchDataBtn(1);
		vm.btn2 = vm.fetchDataBtn(2);
		vm.btn3 = vm.fetchDataBtn(3);
	};
});

app.controller('buttonsFilterProveedoresCtrl', function($scope, $http, $rootScope, filtrosBotones) {
	var vm = this;

	vm.fetchDataBtn = function(type) {
		var res = [];
		filtrosBotones.fetchDataBtn(type).then(
			function(d) {
				res.push(d);
			},
			function(errResponse) {
				console.error('Error while fetching Currencies');
			}
		);
		return res;
	};
	vm.btn1 = vm.fetchDataBtn(4);
	vm.btn2 = vm.fetchDataBtn(5);
	vm.btn3 = vm.fetchDataBtn(6);
});
