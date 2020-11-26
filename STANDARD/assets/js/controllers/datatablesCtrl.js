app.run(initDT);
function initDT(DTDefaultOptions) {
	DTDefaultOptions.setLoadingTemplate(`
	<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
	<lottie-player src="https://assets10.lottiefiles.com/packages/lf20_ho3vw7rh.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px; margin:auto;"  loop autoplay></lottie-player>
	`);
}

app.controller('inventarioListaCtrl', inventarioListaCtrl);

function inventarioListaCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;
	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=vistaproducto&where=pro_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 2, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);

	vm.dtColumns = [
		DTColumnBuilder.newColumn('pro_id').withTitle('ID').notVisible(),
		DTColumnBuilder.newColumn('pro_cod').withTitle('CÓDIGO'),
		DTColumnBuilder.newColumn('pro_nom').withTitle('DESCRIPCIÓN'),
		DTColumnBuilder.newColumn('pro_bar').withTitle('CÓDIGO DE BARRAS / SKU'),
		DTColumnBuilder.newColumn('tip_pro_desc').withTitle('TIPO DE PRODUCTO').withOption('width', '150px'),
		DTColumnBuilder.newColumn('pst_nom').withTitle('PRESENTACIÓN'),
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			options = '';
			options += `
                    <div class="mini ui buttons basic">
                        <a class="ui button action-editar">Editar</a>
                    </div>
              `;

			return options;
		})
	];

	vm.someClickHandlerEdit = someClickHandlerEdit;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerCompras = someClickHandlerCompras;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerEdit(info) {}
	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerStorage(info) {
		$rootScope.asientoDetalle(info);
	}

	function someClickHandlerCompras(info) {
		$rootScope.compraDetalle(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		$('td .action-editar', nRow).unbind('click');
		$('td .action-editar', nRow).bind('click', function() {
			if (aData.pro_tip <= 9) {
				$rootScope.newProductCreate(aData);
			} else {
				$rootScope.newServiceCreate(aData);
			}
		});
		$('td .action-ver-detalles', nRow).unbind('click');
		$('td .action-ver-detalles', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		$('td .action-ver-detalles-compra', nRow).unbind('click');
		$('td .action-ver-detalles-compra', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCompras(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataProductosyServicios = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}

	// vm.dtColumns = [

	//     DTColumnBuilder.newColumn('pro_id').withTitle('ID').notVisible(),
	//     DTColumnBuilder.newColumn('pro_cod').withTitle('Código'),
	//     DTColumnBuilder.newColumn('pro_cod').withTitle('First name'),
	//     DTColumnBuilder.newColumn('pro_nom').withTitle('Descripción')
	// ];
	// vm.reloadData = reloadData;
	// vm.dtInstance = {};

	// function reloadData() {
	//     var resetPaging = false;
	//     vm.dtInstance.reloadData(callback, resetPaging);
	// }
	// $rootScope.reloadDataInventario = function() {
	//     var resetPaging = false;
	//     vm.dtInstance.reloadData(callback, resetPaging);
	// }

	// function callback(json) {
	//     console.log(json);
	// }
}

app.controller('comprasListaCtrl', comprasListaCtrl);

function comprasListaCtrl(
	DTOptionsBuilder,
	DTColumnBuilder,
	$resource,
	$http,
	$q,
	$scope,
	$rootScope,
	$filter,
	$window
) {
	var vm = this;

	vm.statusfiltroPendientesPorPagar = false;

	function loadaaDataCompra() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/r2qE/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&where=id&igual=12&thing=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});

		return defer.promise;
	}

	function loadaaDataCompraFilterPendientesPorPagar() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=getfiltropordetracion&where=id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}

	function loadaaDataCompraFilterComprobantesPorPagar() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=getfiltroporpagar&where=id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaDataCompra())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('det_com_id').withTitle('').notVisible(),
		DTColumnBuilder.newColumn('com_fecdoc').withTitle('FECHA').withOption('width', '90px'),
		DTColumnBuilder.newColumn('to_nom').withTitle('TIPO').withOption('width', '110px').withClass('text-center'),
		DTColumnBuilder.newColumn('Documentos').withTitle('DOCUMENTO').withOption('width', '110px'),
		DTColumnBuilder.newColumn('ane_alias').withTitle('PROVEEDOR'),
		DTColumnBuilder.newColumn(null).withTitle('TOTAL').renderWith(function(data, type, full) {
			var monto = $filter('currency')(data.totalcompra - data.com_dt, 'S/');
			return monto;
		}),
		DTColumnBuilder.newColumn(null).withTitle('SALDO').renderWith(function(data, type, full) {
			if (data.to_nom == 'Compras') {
				//cuando tenga detraccion
				if (data.com_dt > 0) {
					putTotalOperacion = function(i, v, k, c, h) {
						function isNumber(x) {
							if (isNaN(x)) {
								return 0;
							}
							return parseInt(x);
						}
						i = isNumber(parseFloat(i));
						v = isNumber(parseFloat(v));
						k = isNumber(parseFloat(k));
						c = isNumber(parseFloat(c));
						h = isNumber(parseFloat(h));
						return i + v - k - c + h;
					};

					var saldo = putTotalOperacion(
						data.import_cc,
						data.totalcompra,
						data.TotalPago,
						data.com_dt,
						data.detraccion
					);

					var monto = `<a data-tooltip="Detracción: ${$filter('currency')(
						data.com_dt - data.detraccion,
						'S/'
					)}" data-position="top right">${$filter('currency')(saldo, 'S/')}</a>`;

					return monto;
				} else {
					putTotalOperacion = function(i, v, k) {
						function isNumber(x) {
							if (isNaN(x)) {
								return 0;
							}
							return parseInt(x);
						}
						var y = isNumber(parseFloat(i));
						var b = isNumber(parseFloat(v));
						var k = isNumber(parseFloat(k));
						return y + b - k;
					};
					var saldo = putTotalOperacion(data.import_cc, data.totalcompra, data.TotalPago);

					var monto = $filter('currency')(saldo, 'S/');

					return monto;
				}
			} else {
				return $filter('currency')(0, 'S/');
			}
		}),
		/*   DTColumnBuilder.newColumn('alm_nom').withTitle('ALMACEN'),*/
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			options = '';
			if (data.TotalPago < data.totalcompra - data.com_dt) {
				options += '';
				if (data.td_id == 'IV') {
					options += `

					<div class="contenedor">
					<a class="dropbtn action-pago">Pagar</a>
					<div class="dropdown">
	 				<button class="dropbtn"><i class="ti-more-alt"></i></button>
	 				<div class="dropdown-content">
	 				<a class="action-ver-detalles-compra">Ver/Editar</a>
	 				<a class="action-delete">Eliminar</a>
	 				<a class="action-documento-asociado">Documentos Asociados</a>
	 				</div>
					</div>
					</div>                   
              `;
				} else if (data.td_id == 'DN') {
					options += `
					<div class="contenedor">
					<a class="dropbtn action-pago">Pagar</a>
					<div class="dropdown">
	  				<button class="dropbtn"><i class="ti-more-alt"></i></button>
	  				<div class="dropdown-content">
	  				<a class="action-ver-detalles-compra">Ver/Editar</a>
	  				<a class="action-delete">Eliminar</a>
	  				</div>
					</div>
					</div>
              `;
				} else if (data.td_id == 'OC') {
					if (data.estado_proceso == 0) {
						var btnPrincipal = '<a class="dropbtn action-comprar-documento">Comprar</a>';
					} else {
						var btnPrincipal = '<a class="dropbtn action-ver-detalles-compra">Ver Editar</a>';
					}
					options += `
					<div class="contenedor">
				${btnPrincipal}
				<div class="dropdown">
				  <button class="dropbtn"><i class="ti-more-alt"></i></button>
				  <div class="dropdown-content">
				  <a class="action-ver-detalles-compra">Ver/Editar</a>
				  <a class="action-delete">Eliminar</a>
				  </div>
				</div>
				</div>



		  `;
				} else if (data.to_nom == 'Compras') {
					options += `
					<div class="contenedor">
					<a class="dropbtn action-pago">Pagar</a>
					<div class="dropdown">
	  				<button class="dropbtn"><i class="ti-more-alt"></i></button>
	  				<div class="dropdown-content">
	  				<a class="action-ver-detalles-compra">Ver/Editar</a>
	  				<a class="action-delete">Eliminar</a>
	  				<a class="action-nota-de-credito">Nota de Crédito</a>
	  				<a class="action-nota-de-credito">Nota de Debito</a>
	  				</div>
					</div>
					</div>
                  `;
				} else {
					options += '<div class="contenedor"><a class="dropbtn action-cobrar">Ver</a></div>';
				}
			}
			if (data.TotalPago > data.totalcompra - data.com_dt) {
				options += '';
				if (data.to_nom == 'Compras') {
					var saldo = data.totalcompra - data.TotalPago;
					options += `
					<div class="contenedor">
					<a class="dropbtn action-cobrar" data-tooltip="Saldo: ${$filter('currency')(
						saldo,
						'S/'
					)}" data-position="top right">Cobro de exceso</a>		
					<div class="dropdown">
	  				<button class="dropbtn"><i class="ti-more-alt"></i></button>
	  				<div class="dropdown-content">
	  				<a class="action-ver-detalles-compra">Ver/Editar</a>
	  				<a ng-click="">Copiar</a>
	  				<a class="action-delete">Eliminar</a>
	  				</div>
					</div>
					</div>
                  `;
				} else {
					options += '<button>i dont know what to do :(</button>';
				}
			}

			if (data.TotalPago == data.totalcompra - data.com_dt) {
				options += `
				<div class="contenedor">
				<a class="dropbtn action-ver-detalles-compra">Ver Editar</a>
        		<div class="dropdown">
  				<button class="dropbtn"><i class="ti-more-alt"></i></button>
  				<div class="dropdown-content">
  				<a class="action-delete">Eliminar</a>
                <a class="action-ver-detalles-compra">Ver/Editar</a>
                <a class="action-nota-de-credito">Nota de Crédito</a>
                <a class="action-nota-de-credito">Nota de Debito</a>
  				</div>
				</div>
				</div>
          `;
			}

			if (data.td_id == 'GR') {
				if (data.estado_proceso == 0) {
					var btnPrincipal = '<a class="dropbtn action-comprar-documento">Comprar</a>';
				} else {
					var btnPrincipal = '<a class="dropbtn action-ver-detalles-compra">Ver Editar</a>';
				}
				options += `

				<div class="contenedor">
				${btnPrincipal}
				<div class="dropdown">
				  <button class="dropbtn"><i class="ti-more-alt"></i></button>
				  <div class="dropdown-content">
				  <a class="action-ver-detalles-compra">Ver/Editar</a>
				  <a class="action-delete">Eliminar</a>
				  </div>
				</div>
				</div>


		  `;
			}

			return options;
		}),
		DTColumnBuilder.newColumn(null).withTitle('ALMACÉN').renderWith(function(data, type, full) {
			options = '';
			switch (data.td_id) {
				case 'OC':
					var rr = parseInt(data.almacenado * 100) / parseInt(data.cantidad);
					var cal = parseInt(rr);
					var min = 100 - parseInt(cal);
					if (min < 100) {
						options += `
						<div class="c100 p${min} small orange `;
						if (min != 100) {
							options += ` action-registro-almacen`;
						}
						options += `">
							<span>${min}%</span>   
							<div class="slice">
								<div class="bar"></div>
								<div class="fill"></div>
							</div>
						</div>
					  `;
					}
					break;
				case 'GR':
					var rr = parseInt(data.almacenado * 100) / parseInt(data.cantidad);
					var cal = parseInt(rr);
					var min = 100 - parseInt(cal);
					if (min < 100) {
						options += `
						<div class="c100 p${min} small orange `;
						if (min != 100) {
							options += ` action-registro-almacen`;
						}
						options += `">
							<span>${min}%</span>   
							<div class="slice">
								<div class="bar"></div>
								<div class="fill"></div>
							</div>
						</div>
					  `;
					}
					break;
				case 'FA':
					if (data.com_doc_aso == 0) {
						var rr = parseInt(data.almacenado * 100) / parseInt(data.cantidad);
						var cal = parseInt(rr);
						var min = 100 - parseInt(cal);
						if (min < 100) {
							options += `
						<div class="c100 p${min} small orange `;
							if (min != 100) {
								options += ` action-registro-almacen`;
							}
							options += `">
						<span>${min}%</span>   
							<div class="slice">
								<div class="bar"></div>
								<div class="fill"></div>
								</div>
								</div>
								`;
						}
					} else {
						options += '';
					}
					break;

				case 'BO':
					if (data.com_doc_aso == 0) {
						var rr = parseInt(data.almacenado * 100) / parseInt(data.cantidad);
						var cal = parseInt(rr);
						var min = 100 - parseInt(cal);
						if (min < 100) {
							options += `
						<div class="c100 p${min} small orange `;
							if (min != 100) {
								options += ` action-registro-almacen`;
							}
							options += `">
						<span>${min}%</span>   
							<div class="slice">
								<div class="bar"></div>
								<div class="fill"></div>
								</div>
								</div>
								`;
						}
					} else {
						options += '';
					}
					break;
				default:
					break;
			}
			return options;
		})
	];

	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerCompras = someClickHandlerCompras;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.someClickHandlerAsociateDocument = someClickHandlerAsociateDocument;
	vm.someClickHandlerConverterDocumentToBill = someClickHandlerConverterDocumentToBill;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeDataFilter0 = changeDataFilter0;
	vm.changeData = changeData;
	vm.dtInstance = {};

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerCompras(info) {
		$rootScope.compraDetalle2(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function someClickHandlerAsociateDocument(info) {
		$rootScope.compra(info);
	}

	function someClickHandlerConverterDocumentToBill(info) {
		$rootScope.compra(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-comprar-documento', nRow).unbind('click');
		$('td .action-comprar-documento', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerConverterDocumentToBill(aData);
			});
		});
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});

		$('td .action-documento-asociado', nRow).unbind('click');
		$('td .action-documento-asociado', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerAsociateDocument(aData);
			});
		});

		$('td .action-ver-detalles-compra', nRow).unbind('click');
		$('td .action-ver-detalles-compra', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCompras(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaDataCompra(), false);
	}

	function changeData(st) {
		vm.statusfiltroPendientesPorPagar = false;
		vm.dtInstance.changeData(loadaaDataCompra());
	}

	function changeDataFilter1(st) {
		if (st) {
			vm.statusfiltroPendientesPorPagar = false;
			vm.dtInstance.changeData(loadaaDataCompra());
		} else {
			vm.dtInstance.changeData(loadaaDataCompraFilterPendientesPorPagar());
			vm.statusfiltroPendientesPorPagar = true;
		}
	}

	function changeDataFilter0(st) {
		if (st) {
			vm.statusfiltroComprobantesPorPagar = false;
			vm.dtInstance.changeData(loadaaDataCompra());
		} else {
			vm.dtInstance.changeData(loadaaDataCompraFilterComprobantesPorPagar());
			vm.statusfiltroComprobantesPorPagar = true;
		}
	}

	$rootScope.reloadDataCompra = function() {
		var resetPaging = false;
		vm.dtInstance.reloadData(callback, resetPaging);
	};

	$rootScope.chageDatatableCompra = function() {
		vm.statusfiltroPendientesPorPagar = false;
		vm.dtInstance.changeData(loadaaDataCompra());
	};

	function callback(json) {
		console.log(json);
	}
}

app.controller('asientoListaCtrl', asientoListaCtrl);

function asientoListaCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=cabeceraasiento&where=id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 2, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('AÑO').renderWith(function(data, type, full) {
			var fecha = data.Fecha;
			var rr = fecha.split('-');
			return rr[0];
		}),
		DTColumnBuilder.newColumn(null).withTitle('TIPO ASIENTO').renderWith(function(data, type, full) {
			var nro = '0' + data.tip_asi + ' ' + data.to_nom;
			return nro;
		}),
		DTColumnBuilder.newColumn(null).withTitle('NRO ASIENTO').renderWith(function(data, type, full) {
			var nro = data.Nroasiento;
			var fecha = data.Fecha;
			var rr = fecha.split('-');
			var tt = rr[1] + nro;
			return tt;
		}),
		DTColumnBuilder.newColumn('ane_alias').withTitle('SUJETO'),
		DTColumnBuilder.newColumn('Documento').withTitle('DOCUMENTO'),
		DTColumnBuilder.newColumn('Fecha').withTitle('FECHA'),
		DTColumnBuilder.newColumn('Moneda').withTitle('MONEDA'),
		DTColumnBuilder.newColumn(null).withTitle('TOTAL').renderWith(function(data, type, full) {
			var monto = $filter('currency')(data.Total, 'S/');
			return monto;
		}),
		/*   DTColumnBuilder.newColumn('alm_nom').withTitle('ALMACEN'),*/
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			options = `
  <div class="mini ui buttons basic">
  <div class="ui button dropdown">
  <button class="dropbtn"><i class="ti-more-alt"></i></button>
  <div class="dropdown-content">
    <a class="action-ver-detalles">Ver Detalle</a>
    <a class="action-ver-detalles-compra">Ver Compra</a>
   </div>
  </div>
</div> 
      `;
			return options;
		})
	];

	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerCompras = someClickHandlerCompras;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerStorage(info) {
		$rootScope.asientoDetalle(info);
	}

	function someClickHandlerCompras(info) {
		$rootScope.compraDetalle(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		$('td .action-ver-detalles', nRow).unbind('click');
		$('td .action-ver-detalles', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		$('td .action-ver-detalles-compra', nRow).unbind('click');
		$('td .action-ver-detalles-compra', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCompras(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataCompra = function() {
		var resetPaging = false;
		vm.dtInstance.reloadData(callback, resetPaging);
	};

	function callback(json) {
		console.log(json);
	}
}

app.controller('ventasListaCtrl', ventasListaCtrl);
function ventasListaCtrl(
	$compile,
	DTOptionsBuilder,
	DTColumnBuilder,
	$resource,
	$http,
	$q,
	$scope,
	$rootScope,
	$filter,
	toaster,
	$location,
	$window,
	SweetAlert
) {
	var vm = this;
	setTimeout(() => {
		$('.dt-buttons .btn').removeClass('dt-button');
	}, 250);

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=getventas&where=ven_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}

	vm.selected = {};
	vm.selectAll = false;
	vm.toggleAll = toggleAll;
	vm.toggleOne = toggleOne;

	let titleHtml =
		'<input type="checkbox" ng-model="showCase.selectAll" ng-click="showCase.toggleAll(showCase.selectAll, showCase.selected)">';

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withOption('createdRow', function(row, data, dataIndex) {
			// Recompiling so we can bind Angular directive to the DT
			$compile(angular.element(row).contents())($scope);
		})
		.withOption('headerCallback', function(header) {
			if (!vm.headerCompiled) {
				// Use this headerCompiled field to only compile header once
				vm.headerCompiled = true;
				$compile(angular.element(header).contents())($scope);
			}
		})
		.withButtons([
            {
                text: 'Seleccionar todos',
                action: function (e, dt, node, config) {
					vm.toggleAll(vm.selectAll, vm.selected)
                }
            }
        ])
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'Btr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		)
		// Add Table tools compatibility
		.withPaginationType('full_numbers')
		.withOption('order', [ 0, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_  Por página',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback);
	vm.dtColumns = [
		DTColumnBuilder.newColumn('ven_id').withTitle('ID').notVisible(),
		DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable().renderWith(function(data, type, full, meta) {
			vm.selected[data.ven_id] = false;
			return `<input type="checkbox" ng-model="showCase.selected['${data.ven_id}']" ng-click="showCase.toggleOne(showCase.selected)">`;
		}),
		DTColumnBuilder.newColumn('ven_fecreg').withTitle('FECHA').withOption('width', '100px'),
		DTColumnBuilder.newColumn('to_nom').withTitle('TIPO DE OPERACIÓN'),
		DTColumnBuilder.newColumn('cliente').withTitle('CLIENTE'),
		DTColumnBuilder.newColumn('documento').withTitle('DOCUMENTO'),
		DTColumnBuilder.newColumn(null).withTitle('TOTAL').renderWith(function(data, type, full) {
			var monto = $filter('currency')(data.total - data.ven_totdscto, 'S/');
			return monto;
		}),
		DTColumnBuilder.newColumn(null).withTitle('SALDO').renderWith(function(data, type, full) {
			if (data.to_nom == 'Ventas') {
				if (data.vd_dt > 0) {
					putTotalOperacion = function(i, v, k, z) {
						function isNumber(x) {
							if (isNaN(x)) {
								return 0;
							}
							return parseInt(x);
						}
						var i = isNumber(parseFloat(i));
						var v = isNumber(parseFloat(v));
						var k = isNumber(parseFloat(k));
						var z = isNumber(parseFloat(z));
						return i - v - k - z;
					};
					var saldo = putTotalOperacion(data.total, data.saldo, data.ven_dt, data.ven_totdscto);
					var monto = `<a data-tooltip="Detracción: ${$filter('currency')(
						data.ven_dt,
						'S/'
					)}" data-position="top right">${$filter('currency')(saldo, 'S/')}</a>`;

					return monto;
				} else {
					putTotalOperacion = function(i, v, z) {
						function isNumber(x) {
							if (isNaN(x)) {
								return 0;
							}
							return parseInt(x);
						}
						var i = isNumber(parseFloat(i));
						var v = isNumber(parseFloat(v));
						var z = isNumber(parseFloat(z));
						return i - v - z;
					};
					var saldo = putTotalOperacion(data.total, data.saldo, data.ven_totdscto);
					var monto = $filter('currency')(saldo, 'S/');
					return monto;
				}
			} else {
				return $filter('currency')(0, 'S/');
			}
		}),
		/*   DTColumnBuilder.newColumn('alm_nom').withTitle('ALMACEN'),*/
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			var options = '';
			if (data.td_id == 'FA') {
				if (data.estatus_documento == 0) {
					var facturar = '<a class="action-nota-credito">Nota de Crédito</a>';
				} else {
					var facturar = '';
				}
				options += `
				<div class="contenedor">
				<div class="dropdown">
  				<button class="dropbtn"><i class="ti-more-alt"></i></button>
				  <div class="dropdown-content">
				  <a class="">Anular Venta</a>
  				${facturar}
  				<a class="action-ver-detalles">Ver Detalle</a>
				<a class="action-guia-remision">Guia de Remisión</a>
  				<a class="">Cobrar Venta</a>
  				</div>
				</div>
				</div>		
					`;
			} else if (data.td_id == 'CT') {
				if (data.estatus_documento == 0) {
					var facturar = '<a class="action-facturar">Facturar</a>';
				} else {
					var facturar = '';
				}
				options += `
				<div class="contenedor">
				<div class="dropdown">
  				<button class="dropbtn"><i class="ti-more-alt"></i></button>
  				<div class="dropdown-content">
				  <a class="">Eliminar</a>
  				<a class="action-guia-remision">Guia de Remisión</a>
  				<a class="action-ver-detalles">Ver Detalle</a>
				${facturar}
  				</div>
				</div>
				</div>		
				`;
			} else if (data.td_id == 'NV') {
				if (data.estatus_documento == 0) {
					var facturar = '<a class="action-nota-credito">Devolucion</a>';
				} else {
					var facturar = '';
				}
				options += `
				<div class="contenedor">
				<div class="dropdown">
  				<button class="dropbtn"><i class="ti-more-alt"></i></button>
  				<div class="dropdown-content">
				  <a class="">Eliminar</a>
  				<a class="action-guia-remision">Guia de Remisión</a>
  				<a class="action-ver-detalles">Ver Detalle</a>
				${facturar}
  				</div>
				</div>
				</div>		
					`;
			} else if (data.td_id == 'GR') {
				if (data.estatus_documento_guia == 0) {
					var facturar = '<a class="action-facturar">Facturar</a>';
				} else {
					var facturar = '';
				}
				options += `
				<div class="contenedor">
				<div class="dropdown">
  				<button class="dropbtn"><i class="ti-more-alt"></i></button>
  				<div class="dropdown-content">
  				<a class="action-facturar">Facturar</a>
				  <a class="">Eliminar</a>
  				<a class="action-ver-detalles">Ver Detalle</a>
				${facturar}
  				</div>
				</div>
				</div>		
					`;
			} else if (data.td_id == 'BO') {
				options += `
				<div class="contenedor">
				<div class="dropdown">
  				<button class="dropbtn"><i class="ti-more-alt"></i></button>
  				<div class="dropdown-content">
				<a class="">Anular Venta</a>
  				<a class="action-nota-credito">Nota de Crédito</a>
  				<a class="action-ver-detalles">Ver Detalle</a>
  				<a class="">Cobrar Venta</a>
  				</div>
				</div>
				</div>		
					`;
			} else if (data.td_id == 'NC') {
				options += `
				<div class="contenedor">
				<div class="dropdown">
  				<button class="dropbtn"><i class="ti-more-alt"></i></button>
  				<div class="dropdown-content">
  				<a class="action-ver-detalles">Ver Detalle</a>
  				<a class="">Pagar</a>
  				</div>
				</div>
				</div>		
					`;
			}

			return options;
		}),
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			options = '';
			if (data.td_id == 'FA' || data.td_id == 'BO' || data.td_id == 'NC') {
				if (data.notas_sunat == '0') {
					options += `				
				<button type="button" class="btn btn-warning btn-xs action-enviar-sunat ld-ext-right">
				Por Enviar <img src="STANDARD/assets/images/spinners.gif" class="ld ld-ring"></button>
		 	 `;
				}
				if (data.notas_sunat.indexOf('RECHAZADA') != -1) {
					options += `
				<button type="button" class="btn btn-danger btn-xs ld-ext-right" ng-click="openAside('right')">
				<span style="font-size:11px">Rechazada</span>
			</button>
				  `;
				}
				if (data.notas_sunat.indexOf('ACEPTADA') != -1) {
					options += `
					
					<span style="padding:5px 8px!important;font-size:11px;border-radius:3px;color:white;" class=" label-success">Aceptado</span>
				
				  `;
				}
			}
			return options;
		})
	];

	vm.someClickHandlerSendSunat = someClickHandlerSendSunat;
	vm.someClickHandlerDetails = someClickHandlerDetails;
	vm.someClickHandlerGenerateBill = someClickHandlerGenerateBill;
	vm.someClickHandlerGenerateGuideRemision = someClickHandlerGenerateGuideRemision;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerCompras = someClickHandlerCompras;
	vm.someClickHandlerEnviarBoletasVarias = someClickHandlerEnviarBoletasVarias;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	vm.enviarBoletasVarias = someClickHandlerEnviarBoletasVarias;
	function someClickHandlerEnviarBoletasVarias(info) {
		alert('Este elemento no se puede eliminar');
	}
	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerGenerateBill(info) {
		$rootScope.venta(info);
	}

	function someClickHandlerGenerateGuideRemision(info) {
		$rootScope.remisionGuia(info);
	}
	function someClickHandlerCreditNote(info) {
		$rootScope.notadecreditoVenta(info);
	}
	function someClickHandlerDetails(info) {}

	function someClickHandlerSendSunat(info) {
		return new Promise(function(resolve, reject) {
			var conf = {
				getdb: JSON.parse($rootScope.d.datos).database,
				emp_id: JSON.parse($rootScope.d.datos).emp_id,
				venta_id: info.venta_id
			};
			var req = new XMLHttpRequest();
			req.open('post', '../../../../compass/factura.php');

			req.onload = function() {
				switch (req.status) {
					case 200:
						resolve(JSON.parse(req.response));
						break;
					case 404:
						reject();
						break;
					case 502:
						reject();
						break;

					default:
						reject();
						break;
				}
			};
			req.send(JSON.stringify(conf));
		});
	}

	function someClickHandlerCompras(info) {
		$rootScope.compraDetalle(info);
	}
	function toggleAll(selectAll, selectedItems) {
		for (var id in selectedItems) {
			if (selectedItems.hasOwnProperty(id)) {
				console.log(id);
				selectedItems[id] = selectAll;
			}
		}
	}
	function toggleOne(selectedItems) {
		for (var id in selectedItems) {
			if (selectedItems.hasOwnProperty(id)) {
				if (!selectedItems[id]) {
					vm.selectAll = false;
					return;
				}
			}
		}
		vm.selectAll = true;
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		$('td .action-enviar-sunat', nRow).unbind('click');
		$('td .action-enviar-sunat', nRow).bind('click', function() {
			$rootScope.buttonEvent = $(this);
			$rootScope.sunatToaster = toaster;
			$rootScope.buttonEvent.addClass('running');
			$rootScope.sunatToaster.pop('info', 'Enviando a Sunat...');

			$scope.$apply(function() {
				vm
					.someClickHandlerSendSunat(aData)
					.then(function(r) {
						$rootScope.buttonEvent.removeClass('running');
						$rootScope.sunatToaster.clear();
						$rootScope.sunatToaster.pop('success', 'Su Factura ha sido aceptada');
					})
					.catch(() => {
						console.log('Algo salió mal');
						toaster.clear();
						toaster.pop('error', 'Su Factura no ha sido aceptada');
					});
			});
		});

		$('td .action-facturar', nRow).unbind('click');
		$('td .action-facturar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerGenerateBill(aData);
			});
		});

		$('td .action-guia-remision', nRow).unbind('click');
		$('td .action-guia-remision', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerGenerateGuideRemision(aData);
			});
		});
		$('td .action-ver-detalles', nRow).unbind('click');
		$('td .action-ver-detalles', nRow).bind('click', function() {
			$scope.$apply(function() {
				$window.open(
					`${$rootScope.miURL}/compass/view/documento-A4.php?emp_id=${JSON.parse($rootScope.d.datos)
						.emp_id}&getdb=${JSON.parse($rootScope.d.datos).database}&nro=${aData.ven_id}`
				);
			});
		});
		$('td .action-ver-detalles-ticket', nRow).unbind('click');
		$('td .action-ver-detalles-ticket', nRow).bind('click', function() {
			$scope.$apply(function() {
				$window.open(
					`${$rootScope.miURL}/compass/view/documento-TICKET.php?emp_id=${JSON.parse($rootScope.d.datos)
						.emp_id}&getdb=${JSON.parse($rootScope.d.datos).database}&nro=${aData.ven_id}`
				);
			});
		});
		$('td .action-nota-credito', nRow).unbind('click');
		$('td .action-nota-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData() {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataVenta = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}

app.controller('trasladoListaCtrl', trasladoListaCtrl);

function trasladoListaCtrl(
	DTOptionsBuilder,
	DTColumnBuilder,
	$resource,
	$http,
	$q,
	$scope,
	$rootScope,
	$filter,
	toaster,
	$location,
	$window
) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=c_traslado&where=id_tras&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}

	const idLocal = JSON.parse($rootScope.d.datos).ofi_id;

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 0, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn('id_tras').withTitle('ID').notVisible(),
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('alm_fecha').withTitle('FECHA').withOption('width', '100px'),
		DTColumnBuilder.newColumn('documento').withTitle('DOCUMENTO').withOption('width', '200px'),
		DTColumnBuilder.newColumn('alm_motivo').withTitle('MOTIVO').withOption('width', '300px'),
		DTColumnBuilder.newColumn('alm_nom').withTitle('ALMACEN'),
		DTColumnBuilder.newColumn('td_nom').withTitle('OPERACIÓN'),

		/*   DTColumnBuilder.newColumn('alm_nom').withTitle('ALMACEN'),*/
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			var options = '';

			if (data.td_nom === 'Carga Almacen') {
				options += `
			<div class="contenedor">
			
			<a class="dropbtn action-ver-detalle">Ver Detalle</a>
		
			</div>		
				`;
			} else if (data.td_nom === 'Entrada Interna') {
				options += `
				<div class="contenedor">
				<a class="dropbtn action-ver-detalle">Ver Detalles</a>
				</div>		
					`;
			} else if (data.td_nom === 'Salida Interna') {
				if (data.status_tras === '1') {
					if (idLocal === data.local_destino) {
						options += `
					<div class="contenedor">
					<a class="dropbtn action-registro-almacen">Ingresar</a>
					<a class="dropbtn action-ver-detalle">Ver Detalle</a>
					</div>		
						`;
					}
				}
			}

			return options;
		})
	];

	vm.someClickHandlerDetails = someClickHandlerDetails;
	vm.someClickHandlerGenerateBill = someClickHandlerGenerateBill;
	vm.someClickHandlerCompras = someClickHandlerCompras;

	vm.someClickHandlerStorage = someClickHandlerStorage;

	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerGenerateBill(info) {
		$rootScope.venta(info);
	}

	function someClickHandlerDetails(info) {}

	function someClickHandlerStorage(info) {
		$rootScope.registroIngresoTranslado(info);
	}

	function someClickHandlerCompras(info) {
		$rootScope.compraDetalle(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});

		$('td .action-ver-detalle', nRow).unbind('click');
		$('td .action-ver-detalle', nRow).bind('click', function() {
			$scope.$apply(function() {
				console.log(aData);
				$window.open(
					`${$rootScope.miURL}/compass/view/constancia-traslado.php?emp_id=${JSON.parse($rootScope.d.datos)
						.emp_id}&getdb=${JSON.parse($rootScope.d.datos)
						.database}&nro=${aData.id_tras}&id_tras=${aData.id_tras}`
				);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData() {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataVenta = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}

app.controller('clienteListaCtrl', clienteListaCtrl);

function clienteListaCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=clientevista&where=ane_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 2, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn('tsc_des').withTitle('DOCUMENTO').withOption('width', '120px'),
		DTColumnBuilder.newColumn('ane_numdoc').withTitle('NUMERO'),
		DTColumnBuilder.newColumn('ane_alias').withTitle('ALIAS'),
		DTColumnBuilder.newColumn('ane_tel').withTitle('TELÉFONO'),
		DTColumnBuilder.newColumn('ane_email').withTitle('EMAIL'),
		/*   DTColumnBuilder.newColumn('alm_nom').withTitle('ALMACEN'),*/
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			options = `

			<div class="contenedor">
			<button class="dropbtn action-editar">Editar</button>
			</div>



      `;
			return options;
		})
	];

	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerCompras = someClickHandlerCompras;
	vm.someClickHandlerEditar = someClickHandlerEditar;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerEditar(info) {
		$rootScope.nuevocliente(info);
	}

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerStorage(info) {
		$rootScope.asientoDetalle(info);
	}

	function someClickHandlerCompras(info) {
		$rootScope.compraDetalle(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		$('td .action-editar', nRow).unbind('click');
		$('td .action-editar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerEditar(aData);
			});
		});
		$('td .action-ver-detalles', nRow).unbind('click');
		$('td .action-ver-detalles', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		$('td .action-ver-detalles-compra', nRow).unbind('click');
		$('td .action-ver-detalles-compra', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCompras(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataCliente = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('cajaMovimientoCtrl', cajaMovimientoCtrl);

function cajaMovimientoCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=puntoventatemporal&where=venta_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 2, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn('to_nom').withTitle('T. OPERACIÓN').withOption('width', '120px'),
		DTColumnBuilder.newColumn('cliente').withTitle('CLIENTE'),
		DTColumnBuilder.newColumn('documento').withTitle('DOCUMENTO'),
		DTColumnBuilder.newColumn('ven_fecreg').withTitle('FECHA').withOption('width', '120px'),
		DTColumnBuilder.newColumn('total').withTitle('TOTAL'),
		/*   DTColumnBuilder.newColumn('alm_nom').withTitle('ALMACEN'),*/
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			options = `
  <div class="mini ui buttons basic">
  <div class="ui button dropdown">
  <button class="dropbtn">Editar</button>
  </div>
</div> 
      `;
			return options;
		})
	];

	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerCompras = someClickHandlerCompras;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerStorage(info) {
		$rootScope.asientoDetalle(info);
	}

	function someClickHandlerCompras(info) {
		$rootScope.compraDetalle(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		$('td .action-ver-detalles', nRow).unbind('click');
		$('td .action-ver-detalles', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		$('td .action-ver-detalles-compra', nRow).unbind('click');
		$('td .action-ver-detalles-compra', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCompras(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataCompra = function() {
		var resetPaging = false;
		vm.dtInstance.reloadData(callback, resetPaging);
	};

	function callback(json) {
		console.log(json);
	}
}
app.controller('almacenMovimientoCtrl', almacenMovimientoCtrl);

function almacenMovimientoCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;
	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=movimiento_almacen&where=id_alm_mov&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 0, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn('id_alm_mov').withTitle('ID').withOption('width', '20px').notVisible(),
		DTColumnBuilder.newColumn('fecha_mov').withTitle('FECHA').withOption('width', '120px'),
		DTColumnBuilder.newColumn('to_nom').withTitle('OPERACIÓN'),
		DTColumnBuilder.newColumn('pro_nom').withTitle('PRODUCTO'),
		DTColumnBuilder.newColumn('cantidad').withTitle('CANTIDAD').withOption('width', '120px'),
		DTColumnBuilder.newColumn('alm_nom').withTitle('ALMACÉN').withOption('width', '120px'),
		/*   DTColumnBuilder.newColumn('alm_nom').withTitle('ALMACEN'),*/
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			switch (data.to_nom) {
				case 'Ventas':
					options = `
				<div class="contenedor">
				<button class="dropbtn">Ver Detalle</button>
				<i style="padding:3px 10px;font-size:19px;color:#FF0000;" class="fa fa-long-arrow-up" aria-hidden="true"></i>
	   			</div>
                    `;
					break;
				case 'Notas de Crédito':
					options = `
				<div class="contenedor">
				<button class="dropbtn">Ver Detalle</button>
				<i style="padding:3px 10px;font-size:19px;color:#FF0000;" class="fa fa-long-arrow-down" aria-hidden="true"></i>
	   			</div>
                    `;
					break;
				case 'Compras':
					options = `
				<div class="contenedor">
				<button class="dropbtn">Ver Detalle</button>
				<i style="padding:3px 10px;font-size:19px;color:#01DF3A;" class="fa fa-long-arrow-down" aria-hidden="true"></i>
	   			</div>
                    `;
					break;
				case 'Carga Almacén':
					options = `
				<div class="contenedor">
				<button class="dropbtn">Ver Detalle</button>
				<i style="padding:3px 10px;font-size:19px;color:#01DF3A;" class="fa fa-long-arrow-down" aria-hidden="true"></i>
	   			</div>
                    `;
					break;
				case 'Descarga Almacén':
					options = `
				<div class="contenedor">
				<button class="dropbtn">Ver Detalle</button>
				<i style="padding:3px 10px;font-size:19px;color:#FF0000;" class="fa fa-long-arrow-up" aria-hidden="true"></i>
	   			</div>
                    `;
					break;
				// case 'Ventas':
				// 	options = `
				// <div class="contenedor">
				// <button class="dropbtn">Ver Detalle</button>
				// <i style="padding:3px 10px;font-size:19px;color:#FF0000;" class="fa fa-long-arrow-up" aria-hidden="true"></i>
				// </div>
				//     `;
				// 	break;

				default:
					options = `
					<div class="contenedor">
					<button class="dropbtn">Ver Detalle</button>
					<i style="padding:3px 5px;font-size:19px;color:#002350;" class="fa fa-arrows-h" aria-hidden="true"></i>
					   </div>
						`;
					break;
			}
			return options;
		})
	];

	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerCompras = someClickHandlerCompras;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerStorage(info) {
		$rootScope.asientoDetalle(info);
	}

	function someClickHandlerCompras(info) {
		$rootScope.compraDetalle(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		$('td .action-ver-detalles', nRow).unbind('click');
		$('td .action-ver-detalles', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});
		$('td .action-ver-detalles-compra', nRow).unbind('click');
		$('td .action-ver-detalles-compra', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCompras(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataMoviminetoAlmacen = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}

app.controller('proveedoresListaCtrl', proveedoresListaCtrl);

function proveedoresListaCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope, $filter) {
	var vm = this;

	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=saldoproveedores&where=ane_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('ane_alias').withTitle('Proveedor'),
		DTColumnBuilder.newColumn('Documento').withTitle('Documento'),
		DTColumnBuilder.newColumn('ane_email').withTitle('Email'),
		DTColumnBuilder.newColumn('ane_tel').withTitle('Teléfono'),
		DTColumnBuilder.newColumn('ane_dir').withTitle('Dirección'),
		DTColumnBuilder.newColumn('pago').withTitle('Saldo'),
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			var options = `
			<div class="contenedor">
			<a class="dropbtn action-pago">Pagar</a>
			<div class="dropdown">
			<button class="dropbtn"><i class="ti-more-alt"></i></button>
			<div class="dropdown-content">
			<a class="action-edit">Ver/Editar</a>
			<a class="action-delete">Eliminar</a>
			</div>
			</div>
			</div>		
`;
			return options;
		})
	];
	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerEdit = someClickHandlerEdit;
	vm.reloadData = reloadData;
	vm.changeData = changeData;

	vm.dtInstance = {};

	function someClickHandlerEdit(info) {
		$rootScope.nuevoproveedor(info);
	}

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-edit', nRow).unbind('click');
		$('td .action-edit', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerEdit(aData);
			});
		});
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});
		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});
		return nRow;
	}

	function changeData(st) {
		vm.dtInstance.changeData(loadaaData());
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData());
	}

	$rootScope.reloadDataProveedor = function() {
		/* var resetPaging = false;
		vm.dtInstance.reloadData(callback, resetPaging); */
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}

app.controller('almacenStockCtrl', almacenStockCtrl);

function almacenStockCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope) {
	var vm = this;
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/r2qE/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&where=id&igual=13&thing=`
			)
			.then(function(result) {
				if (result.status == 200) {
				}
				defer.resolve(result.data.data);
			});
		return defer.promise;
	}).withPaginationType('full_numbers');
	vm.dtColumns = [
		DTColumnBuilder.newColumn('pro_nom').withTitle('Producto Descripción'),
		DTColumnBuilder.newColumn('alm_nom').withTitle('Almacen Ubicación'),
		DTColumnBuilder.newColumn('stock').withTitle('Stock'),
		DTColumnBuilder.newColumn('pst_id').withTitle('Presentacion')
	];
	vm.reloadData = reloadData;
	vm.dtInstance = {};

	function reloadData() {
		var resetPaging = false;
		vm.dtInstance.reloadData(callback, resetPaging);
	}
	$rootScope.reloadDataAlmacenStock = function() {
		var resetPaging = false;
		vm.dtInstance.reloadData(callback, resetPaging);
	};

	function callback(json) {
		console.log(json);
	}
}

app.controller('almacenInfoCtrl', almacenInfoCtrl);

function almacenInfoCtrl(DTOptionsBuilder, DTColumnBuilder, $resource, $http, $q, $scope, $rootScope) {
	var vm = this;
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=getAlmacen&where=id=''`
			)
			.then(function(result) {
				if (result.status == 200) {
				}
				defer.resolve(result.data.data);
			});
		return defer.promise;
	}).withPaginationType('full_numbers');
	vm.dtColumns = [
		DTColumnBuilder.newColumn('pro_nom').withTitle('Producto Descripción'),
		DTColumnBuilder.newColumn('alm_nom').withTitle('Almacen Ubicación'),
		DTColumnBuilder.newColumn('stock').withTitle('Stock'),
		DTColumnBuilder.newColumn('pst_id').withTitle('Presentacion')
	];
	vm.reloadData = reloadData;
	vm.dtInstance = {};

	function reloadData() {
		var resetPaging = false;
		vm.dtInstance.reloadData(callback, resetPaging);
	}
	$rootScope.reloadDataAlmacenStock = function() {
		var resetPaging = false;
		vm.dtInstance.reloadData(callback, resetPaging);
	};

	function callback(json) {
		console.log(json);
	}
}

app.controller('comprasporpagarListaCtrl', comprasporpagarListaCtrl);

function comprasporpagarListaCtrl(
	DTOptionsBuilder,
	DTColumnBuilder,
	$resource,
	$http,
	$q,
	$scope,
	$rootScope,
	$filter,
	$window
) {
	var vm = this;

	vm.statusfiltroPendientesPorPagar = false;

	function loadaaDataCompra() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=getfiltroporpagar&where=com_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});

		return defer.promise;
	}

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaDataCompra())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 1, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('det_com_id').withTitle('').notVisible(),
		DTColumnBuilder.newColumn('com_fecdoc').withTitle('FECHA').withOption('width', '90px'),
		DTColumnBuilder.newColumn('to_nom').withTitle('TIPO').withOption('width', '110px').withClass('text-center'),
		DTColumnBuilder.newColumn('Documentos').withTitle('DOCUMENTO').withOption('width', '110px'),
		DTColumnBuilder.newColumn('ane_alias').withTitle('PROVEEDOR'),
		DTColumnBuilder.newColumn(null).withTitle('TOTAL').renderWith(function(data, type, full) {
			var monto = $filter('currency')(data.totalcompra - data.com_dt, 'S/');
			return monto;
		}),
		DTColumnBuilder.newColumn(null).withTitle('SALDO').renderWith(function(data, type, full) {
			if (data.to_nom == 'Compras') {
				//cuando tenga detraccion
				if (data.com_dt > 0) {
					putTotalOperacion = function(i, v, k, c, h) {
						function isNumber(x) {
							if (isNaN(x)) {
								return 0;
							}
							return parseInt(x);
						}
						i = isNumber(parseFloat(i));
						v = isNumber(parseFloat(v));
						k = isNumber(parseFloat(k));
						c = isNumber(parseFloat(c));
						h = isNumber(parseFloat(h));
						return i + v - k - c + h;
					};

					var saldo = putTotalOperacion(
						data.import_cc,
						data.totalcompra,
						data.TotalPago,
						data.com_dt,
						data.detraccion
					);

					var monto = `<a data-tooltip="Detracción: ${$filter('currency')(
						data.com_dt - data.detraccion,
						'S/'
					)}" data-position="top right">${$filter('currency')(saldo, 'S/')}</a>`;

					return monto;
				} else {
					putTotalOperacion = function(i, v, k) {
						function isNumber(x) {
							if (isNaN(x)) {
								return 0;
							}
							return parseInt(x);
						}
						var y = isNumber(parseFloat(i));
						var b = isNumber(parseFloat(v));
						var k = isNumber(parseFloat(k));
						return y + b - k;
					};
					var saldo = putTotalOperacion(data.import_cc, data.totalcompra, data.TotalPago);

					var monto = $filter('currency')(saldo, 'S/');

					return monto;
				}
			} else {
				return $filter('currency')(0, 'S/');
			}
		}),
		/*   DTColumnBuilder.newColumn('alm_nom').withTitle('ALMACEN'),*/
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			options = '';
			if (data.TotalPago < data.totalcompra - data.com_dt) {
				options += '';
				if (data.td_id == 'IV') {
					options += `

					<div class="contenedor">
					<a class="dropbtn action-pago">Pagar</a>
					<div class="dropdown">
	 				<button class="dropbtn"><i class="ti-more-alt"></i></button>
	 				<div class="dropdown-content">
	 				<a class="action-ver-detalles-compra">Ver/Editar</a>
	 				<a class="action-delete">Eliminar</a>
	 				<a class="action-documento-asociado">Documentos Asociados</a>
	 				</div>
					</div>
					</div>                   
              `;
				} else if (data.td_id == 'DN') {
					options += `
					<div class="contenedor">
					<a class="dropbtn action-pago">Pagar</a>
					<div class="dropdown">
	  				<button class="dropbtn"><i class="ti-more-alt"></i></button>
	  				<div class="dropdown-content">
	  				<a class="action-ver-detalles-compra">Ver/Editar</a>
	  				<a class="action-delete">Eliminar</a>
	  				</div>
					</div>
					</div>
              `;
				} else if (data.to_nom == 'Compras') {
					options += `
					<div class="contenedor">
					<a class="dropbtn action-pago">Pagar</a>
					<div class="dropdown">
	  				<button class="dropbtn"><i class="ti-more-alt"></i></button>
	  				<div class="dropdown-content">
	  				<a class="action-ver-detalles-compra">Ver/Editar</a>
	  				<a class="action-delete">Eliminar</a>
	  				<a class="action-nota-de-credito">Nota de Crédito</a>
	  				<a class="action-nota-de-credito">Nota de Debito</a>
	  				</div>
					</div>
					</div>
                  `;
				} else {
					options += '<div class="contenedor"><a class="dropbtn action-cobrar">Ver</a></div>';
				}
			}

			return options;
		})
	];

	vm.someClickHandlerDelete = someClickHandlerDelete;
	vm.someClickHandlerMakePay = someClickHandlerMakePay;
	vm.someClickHandlerCreditNote = someClickHandlerCreditNote;
	vm.someClickHandlerStorage = someClickHandlerStorage;
	vm.someClickHandlerCompras = someClickHandlerCompras;
	vm.someClickHandlerMakeRecovery = someClickHandlerMakeRecovery;
	vm.someClickHandlerAsociateDocument = someClickHandlerAsociateDocument;
	vm.someClickHandlerConverterDocumentToBill = someClickHandlerConverterDocumentToBill;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeDataFilter0 = changeDataFilter0;
	vm.changeData = changeData;
	vm.dtInstance = {};

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerCreditNote(info) {
		$rootScope.notadecredito(info);
	}

	function someClickHandlerCompras(info) {
		$rootScope.compraDetalle2(info);
	}

	function someClickHandlerStorage(info) {
		$rootScope.registroAlmacen(info);
	}

	function someClickHandlerMakePay(info) {
		$rootScope.realizarPagosIn(info);
	}

	function someClickHandlerMakeRecovery(info) {
		$rootScope.realizarCobro(info);
	}

	function someClickHandlerAsociateDocument(info) {
		$rootScope.compra(info);
	}

	function someClickHandlerConverterDocumentToBill(info) {
		$rootScope.compra(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// on remove on delete
		$('td .action-comprar-documento', nRow).unbind('click');
		$('td .action-comprar-documento', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerConverterDocumentToBill(aData);
			});
		});
		$('td .action-delete', nRow).unbind('click');
		$('td .action-delete', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerDelete(aData);
			});
		});

		$('td .action-pago', nRow).unbind('click');
		$('td .action-pago', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakePay(aData);
			});
		});

		$('td .action-cobrar', nRow).unbind('click');
		$('td .action-cobrar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerMakeRecovery(aData);
			});
		});

		$('td .action-nota-de-credito', nRow).unbind('click');
		$('td .action-nota-de-credito', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCreditNote(aData);
			});
		});

		$('td .action-registro-almacen', nRow).unbind('click');
		$('td .action-registro-almacen', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerStorage(aData);
			});
		});

		$('td .action-documento-asociado', nRow).unbind('click');
		$('td .action-documento-asociado', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerAsociateDocument(aData);
			});
		});

		$('td .action-ver-detalles-compra', nRow).unbind('click');
		$('td .action-ver-detalles-compra', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerCompras(aData);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaDataCompra(), false);
	}

	function changeData(st) {
		vm.statusfiltroPendientesPorPagar = false;
		vm.dtInstance.changeData(loadaaDataCompra());
	}

	function changeDataFilter1(st) {
		if (st) {
			vm.statusfiltroPendientesPorPagar = false;
			vm.dtInstance.changeData(loadaaDataCompra());
		} else {
			vm.dtInstance.changeData(loadaaDataCompraFilterPendientesPorPagar());
			vm.statusfiltroPendientesPorPagar = true;
		}
	}

	function changeDataFilter0(st) {
		if (st) {
			vm.statusfiltroComprobantesPorPagar = false;
			vm.dtInstance.changeData(loadaaDataCompra());
		} else {
			vm.dtInstance.changeData(loadaaDataCompraFilterComprobantesPorPagar());
			vm.statusfiltroComprobantesPorPagar = true;
		}
	}

	$rootScope.reloadDataCompra = function() {
		var resetPaging = false;
		vm.dtInstance.reloadData(callback, resetPaging);
	};

	$rootScope.chageDatatableCompra = function() {
		vm.statusfiltroPendientesPorPagar = false;
		vm.dtInstance.changeData(loadaaDataCompra());
	};

	function callback(json) {
		console.log(json);
	}
}

app.controller('ventasporcobrarListaCtrl', ventasporcobrarListaCtrl);

function ventasporcobrarListaCtrl(
	DTOptionsBuilder,
	DTColumnBuilder,
	$resource,
	$http,
	$q,
	$scope,
	$rootScope,
	$filter,
	toaster,
	$location,
	$window
) {
	var vm = this;

	function loadaaData() {
		var defer = $q.defer();
		$http
			.post(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=filtroventascobrar&where=ven_id&igual=`
			)
			.then(function(result) {
				var data = result.data.data;
				defer.resolve(data);
			});
		return defer.promise;
	}

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(loadaaData())
		.withPaginationType('full_numbers')
		.withOption('bInfo', false)
		.withPaginationType('full_numbers')
		.withOption('order', [ 0, 'desc' ])
		.withOption('lengthMenu', [ [ 10, 50, 200, 1000 ], [ 10, 50, 200, 1000 ] ])
		.withLanguage({
			sEmptyTable: 'No hay datos validos en la tabla',
			sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
			sInfoEmpty: 'Showing 0 to 0 of 0 entries',
			sInfoFiltered: '(filtered from _MAX_ total entries)',
			sInfoPostFix: '',
			sInfoThousands: ',',
			sLengthMenu: '_MENU_ ',
			sLoadingRecords: 'Cargando...',
			sProcessing: 'Procesando',
			sSearch: 'Buscar: ',
			sZeroRecords: 'No hay resultados',
			oPaginate: {
				sFirst: 'Primero',
				sLast: 'Ultimo',
				sNext: 'Siguiente',
				sPrevious: 'Anterior'
			},
			oAria: {
				sSortAscending: ': activate to sort column ascending',
				sSortDescending: ': activate to sort column descending'
			}
		})
		.withOption('rowCallback', rowCallback)
		.withDOM(
			"<'ui grid'" +
				"<'row'" +
				"<'eight wide column'l>" +
				"<'right aligned eight wide column'f>" +
				'>' +
				"<'row dt-table'" +
				"<'sixteen wide column'tr>" +
				'>' +
				"<'row'" +
				"<'seven wide column'i>" +
				"<'right aligned nine wide column'p>" +
				'>' +
				'>'
		);
	vm.dtColumns = [
		DTColumnBuilder.newColumn('ven_id').withTitle('ID').notVisible(),
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			return (
				'<input type="checkbox" ng-model="showCase.selected[' +
				data.com_id +
				']" ng-click="showCase.toggleOne(showCase.selected)">'
			);
		}),
		DTColumnBuilder.newColumn('ven_fecreg').withTitle('FECHA').withOption('width', '100px'),
		DTColumnBuilder.newColumn('to_nom').withTitle('TIPO DE OPERACIÓN'),
		DTColumnBuilder.newColumn('cliente').withTitle('CLIENTE'),
		DTColumnBuilder.newColumn('documento').withTitle('DOCUMENTO'),
		DTColumnBuilder.newColumn(null).withTitle('TOTAL').renderWith(function(data, type, full) {
			var monto = $filter('currency')(data.total, 'S/');
			return monto;
		}),
		DTColumnBuilder.newColumn(null).withTitle('SALDO').renderWith(function(data, type, full) {
			if (data.to_nom == 'Ventas') {
				if (data.vd_dt > 0) {
					putTotalOperacion = function(i, v, k) {
						function isNumber(x) {
							if (isNaN(x)) {
								return 0;
							}
							return parseInt(x);
						}
						var i = isNumber(parseFloat(i));
						var v = isNumber(parseFloat(v));
						var k = isNumber(parseFloat(k));
						return i - v - k;
					};
					var saldo = putTotalOperacion(data.total, data.saldo, data.ven_dt);
					var monto = `<a data-tooltip="Detracción: ${$filter('currency')(
						data.ven_dt,
						'S/'
					)}" data-position="top right">${$filter('currency')(saldo, 'S/')}</a>`;

					return monto;
				} else {
					putTotalOperacion = function(i, v) {
						function isNumber(x) {
							if (isNaN(x)) {
								return 0;
							}
							return parseInt(x);
						}
						var i = isNumber(parseFloat(i));
						var v = isNumber(parseFloat(v));
						return i - v;
					};
					var saldo = putTotalOperacion(data.total, data.saldo);

					var monto = $filter('currency')(saldo, 'S/');

					return monto;
				}
			} else {
				return $filter('currency')(0, 'S/');
			}
		}),
		/*   DTColumnBuilder.newColumn('alm_nom').withTitle('ALMACEN'),*/
		DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data, type, full) {
			var options = '';
			if (data.td_id == 'FA') {
				options += `
				<div class="contenedor">
				<a class="dropbtn">Cobrar Venta</a>
				<div class="dropdown">
  				<button class="dropbtn"><i class="ti-more-alt"></i></button>
  				<div class="dropdown-content">
  				<a class="">Anular Venta</a>
  				<a class="">Nota de Crédito</a>
  				<a class="action-ver-detalles">Ver Detalle</a>
  				</div>
				</div>
				</div>		
					`;
			} else if (data.td_id == 'BO') {
				options += `
				<div class="contenedor">
				<a class="dropbtn">Cobrar Venta</a>
				<div class="dropdown">
  				<button class="dropbtn"><i class="ti-more-alt"></i></button>
  				<div class="dropdown-content">
				  <a class="">Anular Venta</a>
				  <a class="">Nota de Crédito</a>
  				<a class="action-ver-detalles">Ver Detalle</a>
  				</div>
				</div>
				</div>		
					`;
			}

			return options;
		})
	];

	vm.someClickHandlerSendSunat = someClickHandlerSendSunat;
	vm.someClickHandlerDetails = someClickHandlerDetails;
	vm.someClickHandlerGenerateBill = someClickHandlerGenerateBill;
	vm.someClickHandlerCompras = someClickHandlerCompras;
	vm.reloadData = reloadData;
	vm.changeDataFilter1 = changeDataFilter1;
	vm.changeData = changeData;
	vm.dtInstance = {};
	console.log(vm.dtInstance);

	function someClickHandlerDelete(info) {
		alert('Este elemento no se puede eliminar');
	}

	function someClickHandlerGenerateBill(info) {
		$rootScope.venta(info);
	}
	function someClickHandlerDetails(info) {}

	function someClickHandlerSendSunat(info) {
		return new Promise(function(resolve, reject) {
			var conf = {
				getdb: JSON.parse($rootScope.d.datos).database,
				emp_id: JSON.parse($rootScope.d.datos).emp_id,
				venta_id: info.venta_id
			};
			var req = new XMLHttpRequest();
			req.open('post', '../../../../compass/factura.php');

			req.onload = function() {
				switch (req.status) {
					case 200:
						resolve(JSON.parse(req.response));
						break;
					case 404:
						reject();
						break;
					case 502:
						reject();
						break;

					default:
						reject();
						break;
				}
			};
			req.send(JSON.stringify(conf));
		});
	}

	function someClickHandlerCompras(info) {
		$rootScope.compraDetalle(info);
	}

	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		$('td .action-enviar-sunat', nRow).unbind('click');
		$('td .action-enviar-sunat', nRow).bind('click', function() {
			$rootScope.buttonEvent = $(this);
			$rootScope.sunatToaster = toaster;
			$rootScope.buttonEvent.addClass('running');
			$rootScope.sunatToaster.pop('info', 'Enviando a Sunat...');

			$scope.$apply(function() {
				vm
					.someClickHandlerSendSunat(aData)
					.then(function(r) {
						console.log(r);
						$rootScope.buttonEvent.removeClass('running');
						$rootScope.sunatToaster.clear();
						$rootScope.sunatToaster.pop('success', 'Su Factura ha sido aceptada');
					})
					.catch(() => {
						console.log('Algo salió mal');
						toaster.clear();
						toaster.pop('error', 'Su Factura no ha sido aceptada');
					});
			});
		});

		$('td .action-facturar', nRow).unbind('click');
		$('td .action-facturar', nRow).bind('click', function() {
			$scope.$apply(function() {
				vm.someClickHandlerGenerateBill(aData);
			});
		});
		$('td .action-ver-detalles', nRow).unbind('click');
		$('td .action-ver-detalles', nRow).bind('click', function() {
			$scope.$apply(function() {
				$window.open(
					`${$rootScope.miURL}/compass/view/documento.php?getdb=${JSON.parse($rootScope.d.datos)
						.database}&nro=${aData.ven_id}`
				);
			});
		});
		return nRow;
	}

	function reloadData() {
		vm.dtInstance.reloadData(loadaaData(), false);
	}

	function changeData() {
		vm.dtInstance.changeData(loadaaData());
	}

	function changeDataFilter1(st) {
		console.log(st);
		vm.dtInstance.changeData(loadaaData());
	}

	$rootScope.reloadDataVenta = function() {
		vm.dtInstance.changeData(loadaaData());
	};

	function callback(json) {
		console.log(json);
	}
}
