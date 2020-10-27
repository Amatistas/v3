'use strict';
/** 
  * controller for v-accordion
  * AngularJS multi-level accordion component.
*/
(function(angular) {
	app.controller('vAccordionCtrl', [
		'$scope',
		function($scope) {
			$scope.firstAccordionControl = {
				onExpand: function(expandedPaneIndex) {
					console.log('expanded:', expandedPaneIndex);
				},
				onCollapse: function(collapsedPaneIndex) {
					console.log('collapsed:', collapsedPaneIndex);
				}
			};
			$scope.panes = [
				{
					header: 'Pane 1',
					content:
						'Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi.'
				},
				{
					header: 'Pane 2',
					content:
						'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies.'
				},
				{
					header: 'Pane 3',
					content:
						'Aliquam erat ac ipsum. Integer aliquam purus. Quisque lorem tortor fringilla sed, vestibulum id, eleifend justo vel bibendum sapien massa ac turpis faucibus orci luctus non.',

					subpanes: [
						{
							header: 'Subpane 1',
							content: 'Lorem ipsum dolor sit amet enim.'
						},
						{
							header: 'Subpane 2',
							content:
								'Curabitur et ligula. Ut molestie a, ultricies porta urna. Quisque lorem tortor fringilla sed, vestibulum id.'
						}
					]
				}
			];
		}
	]);
})(angular);

(function(angular) {
	app.controller('AccordionCriminalCtrl', [
		'$scope',
		'$http',
		'$rootScope',
		function($scope, $http, $rootScope) {
			$scope.infoInputs;
			$scope.firstAccordionControl = {
				onExpand: function(expandedPaneIndex) {
					console.log('expanded:', expandedPaneIndex);
				},
				onCollapse: function(collapsedPaneIndex) {
					console.log('collapsed:', collapsedPaneIndex);
				}
			};
	
					$scope.getinfo2 = function(obj) {
						var datar = $http.post(
							`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
								.database}&tbnom=${obj.tabla}&where=${obj.where}&igual=${obj.igual}`
						);

						return datar;
					};
					$scope.getinfoSearch2 = function(obj, s) {
						var datap = $http.post(
							`../../../../api/mantenimiento/mantenimiento/search2.php?getdb=${JSON.parse(
								$rootScope.d.datos
							).database}&tbnom=${obj.tabla}&s=${s}&key=${obj.key}&where=${obj.where}&igual=${obj.igual}`
						);

						return datap;
					};
					setTimeout(() => {
						$scope.todosLosItems = [];
						let onDetails = {
							tabla: 'detalle_compra_det',
							where: 'det_com_id',
							igual: $scope.infoInputs.com_id
						};
						let onMovimientos = {
							tabla: 'movimiento_almacen_stock',
							key: 'cd_pro_id',
							/* s: v.cd_pro_id*/
							where: 'det_com_id',
							igual: $scope.infoInputs.com_id
						};
						$scope.getinfo2(onDetails).then(function(response) {
							$scope.todosLosItems.push(response.data.data);
						});

						function movimientos(can) {
							if (can == 0) {
								return false;
							} else {
								return true;
							}
						}
						setTimeout(() => {
							$scope.panes = [];
							$.each($scope.todosLosItems[0], function(i, v) {
								let produc;
								if (movimientos(v.cd_alm) == true) {
									$scope.getinfoSearch2(onMovimientos, v.cd_pro_id).then(function(response) {
										$scope.pruductMovimientos = response.data.data;
									});
									produc = {
										header: `${v.cd_des} | Cantidad: ${v.cd_can}`
									};
								} else {
									produc = {
										header: `${v.cd_des} | Cantidad: ${v.cd_can}`,
										content: `No hay Movimiento (este producto no ha sido almacenado)`
									};
								}

								$scope.panes.push(produc);
							});
						}, 500);
					}, 250);

					console.log($scope.panes);
					/*            $scope.panes = [
                {
                    header: 'Pane 1',
                    content: 'Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi.'
                }, {
                    header: 'Pane 2',
                    content: 'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies.'
                }, {
                    header: 'Pane 3',
                    content: 'Aliquam erat ac ipsum. Integer aliquam purus. Quisque lorem tortor fringilla sed, vestibulum id, eleifend justo vel bibendum sapien massa ac turpis faucibus orci luctus non.',

                    subpanes: [
                        {
                            header: 'Subpane 1',
                            content: 'Lorem ipsum dolor sit amet enim.'
                        }, {
                            header: 'Subpane 2',
                            content: 'Curabitur et ligula. Ut molestie a, ultricies porta urna. Quisque lorem tortor fringilla sed, vestibulum id.'
                        }
                    ]
                }
            ]; */
		
		}
	]);
})(angular);
