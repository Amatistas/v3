/* sessionStorage.clear() */
/* window.onload = function() {
    setTimeout(function() {
        document.getElementById("loading").style.display = "none"
    }, 500)
}
 */

app.controller('WizardController', [
	'$scope',
	'$location',
	'$http',
	function($scope, $location, $http) {

		sessionStorage.clear();

		var vm = this;

		vm.outsession = function() {};

		$scope.selectEmpresa = [];
		$scope.selectLocal = [];
		//Model
		vm.currentStep = 1;
		vm.steps = [
			{
				step: 1,
				name: 'Email',
				template: 'STANDARD/assets/sistem-views/Auth/step-usuario/step1.html'
			},
			{
				step: 2,
				name: 'select Empresa',
				template: 'STANDARD/assets/sistem-views/Auth/step-usuario/step2.html'
			},
			{
				step: 3,
				name: 'select local',
				template: 'STANDARD/assets/sistem-views/Auth/step-usuario/step3.html'
			}
		];

		vm.user = {};

		//Functions
		vm.gotoStep = function(newStep) {
			if (newStep == 1) {
				sessionStorage.clear();
				$scope.selectEmpresa = [];
				$scope.selectLocal = [];
			}
			vm.currentStep = newStep;
		};

		vm.getStepTemplate = function() {
			for (var i = 0; i < vm.steps.length; i++) {
				if (vm.currentStep == vm.steps[i].step) {
					return vm.steps[i].template;
				}
			}
		};

		vm.validateEmail = function() {
			vm.usr = {
				username: vm.user.email,
				password: vm.user.clave
			};

			$http.post(`https://www.app.nubefa.com/api/Auth/Auth2.php`, vm.usr).then(function(response) {
				var dataUsuario = response.data;
				console.log(dataUsuario);
				sessionStorage.setItem('datos', JSON.stringify(response.data));
				sessionStorage.setItem('idEmpresa', dataUsuario.emp_id);
				if (
					dataUsuario.usu_jer == 1 ||
					dataUsuario.usu_jer == 2 ||
					dataUsuario.usu_jer == 3 ||
					dataUsuario.usu_jer == 4 ||
					dataUsuario.usu_jer == 5 ||
					dataUsuario.usu_jer == 6
				) {
					window.location.href = '../../../';
				}
			});
		};

		vm.elijeEmpresa = function(emp_id) {
			$http
				.post(
					`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${$scope.dataUsuario
						.database}&tbnom=local&where=emp_id&igual=${emp_id}`
				)
				.success(function(response) {
					if (response.data.length == 1) {
						alert('solo tiene un local seras redireccionado');
					}
					if (response.data.length > 1) {
						vm.currentStep = 3;
						$scope.selectLocal.push(response.data);
					}
				})
				.error(function(response) {
					alert(
						'esta empresa no posee un local comuniquese con un administrador del sistema para asignarte uno' +
							response
					);
				});
		};
		vm.elijeLocal = function(loc_id) {
			alert(loc_id);
		};
	}
]);
