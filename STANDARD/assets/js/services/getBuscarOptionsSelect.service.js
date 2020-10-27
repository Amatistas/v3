app.factory('getBuscarOptionsSelect', getBuscarOptionsSelect);
getBuscarOptionsSelect.$inject = [ '$http', '$q', '$rootScope' ];
function getBuscarOptionsSelect($http, $q, $rootScope) {
	return {
		fetchOptions: function(param) {
            //verificar que tipod e formato es
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
			
			if (obj.panel) {
				obj.bd = 'nubefapanel';
			} else {
				obj.bd = JSON.parse($rootScope.d.datos).database;
			}
            let arr = obj.selectId;
			return $http
				.get(
					`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${obj.bd}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
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
