app.factory('getProductos', getSeriales);
getSeriales.$inject = [ '$http', '$q', '$rootScope' ];
function getSeriales($http, $q, $rootScope) {
	return {
		fetchProductosCompras: function(id_compra) {
			return $http
				.get(
					`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
						.database}&tbnom=compra_det_especifico&where=det_com_id&igual=${id_compra}`
				)
				.then(
					function(response) {
						return response.data.data;
					},
					function(errResponse) {
						console.error('Error while fetching users');
						return $q.reject(errResponse);
					}
				);
		},
		fetchProductosTraslados: function(id_traslado) {
			return $http
				.get(
					`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
						.database}&tbnom=producto_com_traslado&where=id_tras_c&igual=${id_traslado}`
				)
				.then(
					function(response) {
						return response.data.data;
					},
					function(errResponse) {
						console.error('Error while fetching users');
						return $q.reject(errResponse);
					}
				);
		}
	};
}
