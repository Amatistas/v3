app.factory('getResources', getResources);

getResources.$inject = [ '$http', '$q', '$rootScope' ];

function getResources($http, $q, $rootScope) {
	return {
		fetchReporteCompra: function(obj) {
			return $http
				.post(`../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`)
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
		fetchResources: function(obj) {
			return $http
				.post(`../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`)
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
		fetchResourcesDoubleSearch: function(obj) {
			return $http
				/* .post(`../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`)
				 */.post(`../../../../api/mantenimiento/mantenimiento/search3.php?getdb=${JSON.parse($rootScope.d.datos).database}&tbnom=${obj.db}&s=${obj.key}&key=${obj.where}&where=emp_id&igual=${JSON.parse($rootScope.d.datos).emp_id}&where2=ofi_id&igual2=${JSON.parse($rootScope.d.datos).ofi_id}`)
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
		fetchResourcesFromAPI: function(obj) {
			return $http
				/* .post(`../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos).database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`)
				 */.post(`../../../../api/${obj.route}.php?getdb=${JSON.parse($rootScope.d.datos).database}&pro_id=${obj.pro_id}&emp_id=${JSON.parse($rootScope.d.datos).emp_id}`)
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
