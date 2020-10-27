app.factory('filtrosBotones', filtrosBotones);

filtrosBotones.$inject = [ '$http', '$q', '$rootScope' ];

function filtrosBotones($http, $q, $rootScope) {
	return {
		fetchDataBtn: function(type) {
			return $http
				.get(`../../../api/dataTableFilterBtn/read.php?getdb=${JSON.parse($rootScope.d.datos).database}&type=${type}`)
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
