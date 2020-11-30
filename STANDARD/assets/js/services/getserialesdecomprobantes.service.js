app.factory('getserialesdecomprobantes', getSeriales);

getSeriales.$inject = [ '$http', '$q', '$rootScope' ];

function getSeriales($http, $q, $rootScope) {
	return {
		fetchSerieTipoOperacion: function(serie) {
			//serie es to_id
			return $http
				.get(
					`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
						.database}&tbnom=tipo_operacion_td&where=to_id&igual=${serie}`
				)
				.then(
					function(response) {
						console.log(response.data)
						return response.data;
					},
					function(errResponse) {
						console.error('Error while fetching users');
						return $q.reject(errResponse);
					}
				);
		},
		fetchSerializador: function(serie,base=false) {
			return $http
				.get(
					`../../../../api/mantenimiento/mantenimiento/search3.php?getdb=${JSON.parse($rootScope.d.datos)
						.database}&tbnom=tipo_documento_serie&s=${serie}&key=td_id&where=emp_id&igual=${JSON.parse(
						$rootScope.d.datos).emp_id}&where2=ofi_id&igual2=${JSON.parse($rootScope.d.datos).ofi_id}`
				)
				.then(
					function(response) {
						return response.data;
					},
					function(errResponse) {
						console.error('Error while fetching users');
						return $q.reject(errResponse);
					}
				);
		}, 
		fetchSerialesNumeracion: function(type) {
			return $http
				.get(
					`../../../api/dataTableFilterBtn/read.php?getdb=${JSON.parse($rootScope.d.datos)
						.database}&type=${type}`
				)
				.then(
					function(response) {
						return response.data;
					},
					function(errResponse) {
						console.error('Error while fetching users');
						return $q.reject(errResponse);
					}
				);
		}
	};
}
