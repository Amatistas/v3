app.factory('getReportesReportes', getReportesReportes);
getReportesReportes.$inject = [ '$http', '$q', '$rootScope' ];
function getReportesReportes($http, $q, $rootScope) {
	return {
		fetchReporteCompra: function(fechainicio,fechafin) {
			return $http
				.post(`../../../api/reportes/reporteCompra.php?getdb=${JSON.parse($rootScope.d.datos).database}`,{"fechainicio":fechainicio,"fechafin":fechafin})
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
        fetchReporteVenta: function(fechainicio,fechafin) {
			return $http
			.post(`../../../api/reportes/reporteVenta.php?getdb=${JSON.parse($rootScope.d.datos).database}`,{"fechainicio":fechainicio,"fechafin":fechafin})
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
        fetchReporteUtilidad: function(id_producto,fechainicio,fechafin) {
			return $http
			.post(`../../../api/reportes/reporteUtilidad.php?getdb=${JSON.parse($rootScope.d.datos).database}`,{"id_producto":id_producto,"fechainicio":fechainicio,"fechafin":fechafin})
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
        fetchReporteUtilidadGeneral: function(fechainicio,fechafin) {
			return $http
			.post(`../../../api/reportes/reporteUtilidadGeneral.php?getdb=${JSON.parse($rootScope.d.datos).database}`,{"fechainicio":fechainicio,"fechafin":fechafin})
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
