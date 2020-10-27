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
        }
	};
}
