/** 
 * 
 */

app.controller('comprasCtrl', [
	'$scope',
    '$rootScope',
    '$aside',
	function($scope, $rootScope,$aside) {
        $rootScope.compra();
    }
]);

app.controller('ventasCtrl', [
	'$scope',
    '$rootScope',
    '$aside',
	function($scope, $rootScope,$aside) {
        $rootScope.venta();
    }
]);
