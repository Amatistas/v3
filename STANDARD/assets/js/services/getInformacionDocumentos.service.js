app.factory('getInformacionDocumentos', getInformacionDocumentos);
getInformacionDocumentos.$inject = [ '$http', '$q', '$rootScope' ];
function getInformacionDocumentos($http, $q, $rootScope) {
	return {
		fetchDocumento: function(id,column,tablename) {
			return $http
				.get(
					`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
						.database}&tbnom=${tablename}&where=${column}&igual=${id}`
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
