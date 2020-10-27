'use strict';
/**
 * Clip-Two Main Controller
 */
app.controller('AppCtrl', [
	'$rootScope',
	'$scope',
	'$state',
	'$translate',
	'$localStorage',
	'$window',
	'$document',
	'$timeout',
	'cfpLoadingBar',
	'$transitions',
	function(
		$rootScope,
		$scope,
		$state,
		$translate,
		$localStorage,
		$window,
		$document,
		$timeout,
		cfpLoadingBar,
		$transitions
	) {
		$rootScope.d = sessionStorage;
		$rootScope.miURL = 'http://localhost';
		// Loading bar transition
		// -----------------------------------
		var $win = $($window);

		$transitions.onStart({}, function(trans) {
			cfpLoadingBar.start();
			if (typeof CKEDITOR !== 'undefined') {
				for (name in CKEDITOR.instances) {
					CKEDITOR.instances[name].destroy();
				}
			}
		});

		$transitions.onSuccess({}, function(trans) {
			//stop loading bar on stateChangeSuccess
			$scope.$on('$viewContentLoaded', function(event) {
				cfpLoadingBar.complete();
			});

			// scroll top the page on change state
			$('#app .main-content').css({
				position: 'relative',
				top: 'auto'
			});

			$('footer').show();

			window.scrollTo(0, 0);

			if (angular.element('.email-reader').length) {
				angular.element('.email-reader').animate(
					{
						scrollTop: 0
					},
					0
				);
			}

			// Save the route title
			$rootScope.currTitle = $state.current.title;
		});

		$rootScope.pageTitle = function() {
			return $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
		};

		// save settings to local storage
		if (angular.isDefined($localStorage.layout)) {
			$scope.app.layout = $localStorage.layout;
		} else {
			$localStorage.layout = $scope.app.layout;
		}
		$scope.$watch(
			'app.layout',
			function() {
				// save to local storage
				$localStorage.layout = $scope.app.layout;
			},
			true
		);

		//global function to scroll page up
		$scope.toTheTop = function() {
			$document.scrollTopAnimated(0, 600);
		};

		// angular translate
		// ----------------------

		$scope.language = {
			// Handles language dropdown
			listIsOpen: false,
			// list of available languages
			available: {
				en: 'English',
				it_IT: 'Italiano',
				de_DE: 'Deutsch'
			},
			// display always the current ui language
			init: function() {
				var proposedLanguage = $translate.proposedLanguage() || $translate.use();
				var preferredLanguage = $translate.preferredLanguage();
				// we know we have set a preferred one in app.config
				$scope.language.selected = $scope.language.available[proposedLanguage || preferredLanguage];
			},
			set: function(localeId, ev) {
				$translate.use(localeId);
				$scope.language.selected = $scope.language.available[localeId];
				$scope.language.listIsOpen = !$scope.language.listIsOpen;
			}
		};
		$scope.language.init();

		// Function that find the exact height and width of the viewport in a cross-browser way
		var viewport = function() {
			var e = window,
				a = 'inner';
			if (!('innerWidth' in window)) {
				a = 'client';
				e = document.documentElement || document.body;
			}
			return {
				width: e[a + 'Width'],
				height: e[a + 'Height']
			};
		};
		// function that adds information in a scope of the height and width of the page
		$scope.getWindowDimensions = function() {
			return {
				h: viewport().height,
				w: viewport().width
			};
		};
		// Detect when window is resized and set some variables
		$scope.$watch(
			$scope.getWindowDimensions,
			function(newValue, oldValue) {
				$scope.windowHeight = newValue.h;
				$scope.windowWidth = newValue.w;

				if (newValue.w >= 992) {
					$scope.isLargeDevice = true;
				} else {
					$scope.isLargeDevice = false;
				}
				if (newValue.w < 992) {
					$scope.isSmallDevice = true;
				} else {
					$scope.isSmallDevice = false;
				}
				if (newValue.w <= 768) {
					$scope.isMobileDevice = true;
				} else {
					$scope.isMobileDevice = false;
				}
			},
			true
		);
		// Apply on resize
		$win.on('resize', function() {
			$scope.$apply();
			if ($scope.isLargeDevice) {
				$('#app .main-content').css({
					position: 'relative',
					top: 'auto',
					width: 'auto'
				});
				$('footer').show();
			}
		});

		$scope.loginType = 1;
		$scope.loginTypeChange = function(loginType) {
			sessionStorage.clear();
			$scope.loginType = loginType;
		};
		$scope.closeSession = function() {
			sessionStorage.clear();
			$rootScope.d = [];
		};
	}
]);

app.controller('WizardController', [
	'$scope',
	'$location',
	'$http',
	function($scope, $location, $http) {
		var vm = this;
		$scope.selectEmpresa = [];
		$scope.selectLocal = [];
		//Model
		vm.currentStep = 1;
		vm.steps = [
			{
				step: 1,
				name: 'Email',
				template: 'STANDARD/assets/sistem-views/Auth/step-usuario/step1.html'
			},
			{
				step: 2,
				name: 'select Empresa',
				template: 'STANDARD/assets/sistem-views/Auth/step-usuario/step2.html'
			},
			{
				step: 3,
				name: 'select local',
				template: 'STANDARD/assets/sistem-views/Auth/step-usuario/step3.html'
			}
		];

		vm.user = {};

		//Functions
		vm.gotoStep = function(newStep) {
			if (newStep == 1) {
				sessionStorage.clear();
				$scope.selectEmpresa = [];
				$scope.selectLocal = [];
			}
			vm.currentStep = newStep;
		};

		vm.getStepTemplate = function() {
			for (var i = 0; i < vm.steps.length; i++) {
				if (vm.currentStep == vm.steps[i].step) {
					return vm.steps[i].template;
				}
			}
		};

		vm.validateEmail = function() {
			vm.usr = {
				username: vm.user.email,
				password: vm.user.clave
			};

			let sendObj = JSON.stringify(vm.usr);
			var xmlhttp = new XMLHttpRequest();
			var theUrl = '../../../../api/Auth/Auth.php';
			xmlhttp.open('post', theUrl);
			xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xmlhttp.withCredentials = true;
			xmlhttp.send(sendObj);
			xmlhttp.onload = (response) => {
				if (xmlhttp.status == 200) {
					var dataUsuario = JSON.parse(xmlhttp.responseText);
					$scope.dataUsuario = dataUsuario;
					sessionStorage.setItem('datos', JSON.stringify(dataUsuario));
					if (
						dataUsuario.usu_jer == 1 ||
						dataUsuario.usu_jer == 2 ||
						dataUsuario.usu_jer == 3 ||
						dataUsuario.usu_jer == 4 ||
						dataUsuario.usu_jer == 5 ||
						dataUsuario.usu_jer == 6
					) {
						var qwe = `../../../../api/Auth/dataSession.php`;
						xmlhttp.open('POST', qwe);
						xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
						xmlhttp.withCredentials = true;
						let dax = { emp_id: dataUsuario.emp_id, data: JSON.stringify(dataUsuario) };
						xmlhttp.send(JSON.stringify(dax));
						xmlhttp.onload = () => {
							if (xmlhttp.status == 200) {
								sessionStorage.setItem('idEmpresa', dataUsuario.emp_id);
								window.location.href = '#!/app/dashboard';
							}
						};
					}
					if (
						dataUsuario.usu_jer == 7 ||
						dataUsuario.usu_jer == 8 ||
						dataUsuario.usu_jer == 9 ||
						dataUsuario.usu_jer == 10
					) {
						$scope.$apply(function() {
							vm.currentStep = 2;
						});

						$http
							.post(
								`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${dataUsuario.database}&tbnom=empresa`
							)
							.success(function(response) {
								if (response.data.length == 1) {
								} else {
									$scope.selectEmpresa.push(response.data);
								}
							});
					}
				} else {
					alert('datos incorrectos');
				}
			};
			return true;
		};
		vm.elijeEmpresa = function(emp_id) {
			$http
				.post(
					`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${$scope.dataUsuario
						.database}&tbnom=local&where=emp_id&igual=${emp_id}`
				)
				.success(function(response) {
					if (response.data.length == 1) {
						alert('solo tiene un local seras redireccionado');
					}
					if (response.data.length > 1) {
						vm.currentStep = 3;
						$scope.selectLocal.push(response.data);
					}
				})
				.error(function(response) {
					alert(
						'esta empresa no posee un local comuniquese con un administrador del sistema para asignarte uno' +
							response
					);
				});
		};

		vm.elijeLocal = function(loc_id) {
			alert(loc_id);
		};
	}
]);

app.controller('cuentaAjusteCtrl', [
	'$scope',
	'$location',
	'$http',
	'$rootScope',
	function($scope, $location, $http, $rootScope) {
		$scope.infoInputs = {};
		$scope.units = {};
		$scope.rr = [];
		$http
			.get(
				`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
					.database}&tbnom=empresa&where=emp_id&igual=${JSON.parse($rootScope.d.datos).emp_id}`
			)
			.then(function(response) {
				var info = response.data.data[0];
				$.each(info, function(i, v) {
					$scope.infoInputs[i] = [];
					$scope.infoInputs[i].push(v);
				});
				console.log($scope.infoInputs);
			});
		$scope.rr.to_id = {
			selectId: 'to_id',
			db: 'tipo_operacion',
			where: 'to_id',
			key: '',
			mostrar: [ 'to_id', 'to_nom' ]
		};
		$scope.rr.id = {
			selectId: 'id',
			db: 'tipo_documento',
			where: 'id',
			key: '',
			mostrar: [ 'id', 'td_nom' ]
		};
		$scope.rr.id_doc = {
			selectId: 'id_doc',
			db: 'tipo_documento',
			where: 'id',
			key: '',
			mostrar: [ 'id', 'td_nom' ]
		};
		$scope.rr.alm_id = {
			selectId: 'alm_id',
			db: 'almacen_info',
			where: 'alm_id',
			key: '',
			mostrar: [ 'alm_id', 'alm_nom' ]
		};
		$scope.rr.id_moneda = {
			selectId: 'id_moneda',
			db: 'moneda',
			where: 'id',
			key: '',
			mostrar: [ 'id', 'mnd_desc' ]
		};
		$scope.rr.id_sunat = {
			selectId: 'id_sunat',
			db: 'tabla_sunat_contabilidad',
			where: 'tsc_cod',
			key: '30',
			mostrar: [ 'id', 'tsc_des' ]
		};
		$scope.rr.id_costo = {
			selectId: 'id_costo',
			db: 'centro_costo',
			where: 'id',
			key: '',
			mostrar: [ 'id', 'cc_des' ]
		};
		$scope.rr.id_area = {
			selectId: 'id_area',
			db: 'areas',
			where: 'id',
			key: '',
			mostrar: [ 'id', 'are_des' ]
		};
		$scope.rr.ip_id = {
			selectId: 'ip_id',
			db: 'lista_precio_list',
			where: 'lp_id',
			key: '',
			mostrar: [ 'lp_id', 'lp_nom' ]
		};
		$scope.rr.fp_id = {
			selectId: 'fp_id',
			db: 'forma_pago',
			where: 'fp_id',
			key: '',
			mostrar: [ 'fp_id', 'fp_nom' ]
		};
		$rootScope.buscarOption = function(param) {
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
			var arr = obj.selectId;
			$http
				.get(
					`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
						.database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
				)
				.then(function(response) {
					var options = response.data.data;
					$scope.units[arr] = [];
					$.each(options, function(i, val) {
						$scope.units[arr].push({
							id: val[obj.mostrar[0]],
							label: val[obj.mostrar[1]]
						});
					});
					return $scope.units[arr];
				});
		};
	}
]);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////PRECIO PRODUCTOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller('listaPrecioController', [
	'$rootScope',
	'$scope',
	'$http',
	function($rootScope, $scope, $http) {
		$rootScope.infoInputs = {};

		//datos de los select normales selectTo
		$scope.units = [];
		$scope.add = {};
		$scope.opt = [];
		$scope.info = {};
		$scope.rr = [];
		$scope.items = [];

		$scope.person = {};
		$scope.person.selected = {};

		var misDecimales = 2;

		$scope.mySessionEmpresa = JSON.parse($rootScope.d.datos).emp_id;

		var porImpuesto = 18;

		$scope.valorIgvConvertido = 1.18; // aqui se convierte el igv a 1.18

		$scope.add.codigo = '';
		$scope.add.descripcion = '';
		$scope.add.factor = '';
		$scope.add.pro_cod = '';
		$scope.add.lpd_com = '';
		$scope.add.lpd_porcentaje_igv = 18;
		$scope.add.lpd_valor_igv = 18;
		$scope.add.lp_id = '';
		$scope.add.lpd_uti = '';
		$scope.add.lpd_vpre = '';
		$scope.add.lpd_pre = '';

		$scope.opt.infoInputs = [];

		$scope.info.usu_id = JSON.parse($rootScope.d.datos).usu_id;

		$scope.miEmpresa = JSON.parse($rootScope.d.datos).emp_id;

		$scope.rr.pst_id = {
			selectId: 'pst_id',
			db: 'presentacion',
			where: 'id',
			key: '',
			mostrar: [ 'id', 'pst_nom' ]
		};

		$scope.rr.lp_id = {
			selectId: 'lp_id',
			db: 'lista_precio_list',
			where: 'lp_id',
			key: '',
			mostrar: [ 'lp_id', 'lp_nom' ]
		};

		$rootScope.buscarOption = function(param) {
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
			var arr = obj.selectId;
			$http
				.get(
					`../../../../api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos)
						.database}&tbnom=${obj.db}&where=${obj.where}&igual=${obj.key}`
				)
				.then(function(response) {
					var options = response.data.data;
					$scope.units[arr] = [];
					$.each(options, function(i, val) {
						$scope.units[arr].push({
							id: val[obj.mostrar[0]],
							label: val[obj.mostrar[1]]
						});
					});
					return $scope.units[arr];
				});
		};

		//funciones on change

		$scope.resultados = function(pro) {
			$http
				.get(
					`../../../../api/mantenimiento/mantenimiento/search2.php?getdb=${JSON.parse($rootScope.d.datos)
						.database}
				&tbnom=lista_precio_det&s=${pro.pro_id}&key=pro_id&where=lp_id&igual=${pro.lp_id}`
				)
				.then(function(response) {
					$scope.itemslista = response.data.data;
				});
		};

		$scope.modffactorCompra = function(v) {
			var newVal = parseFloat(v.lpd_com) * parseFloat(v.lpd_fac);
			var tot = newVal * (v.lpd_uti / 100 + 1);
			var valorigv = tot * 0.18;
			var pv = tot * 1.18;

			var d = {
				pro_tip: v.pro_tip,
				pro_pad: v.pro_pad,
				det_com_id: v.det_com_id,
				pro_cod: v.pro_cod,
				cd_des: v.cd_des,
				cd_can: v.cd_can,

				cd_igv: v.cd_igv,
				cd_ina: v.cd_ina,
				cd_isc: v.cd_isc,
				cd_isc: v.cd_isc,

				//////////////importantes

				//////////////id lista de precio

				pro_id: v.pro_id,
				lp_id: v.lp_id,
				pst_id: v.pst_id,

				lpd_fac: v.lpd_fac, //factor
				lpd_com: v.lpd_com, //precio del producto

				falso_monto: newVal,
				lpd_uti: v.lpd_uti, //porcentaje de utlidad
				lpd_vpre: tot, //valor de venta sin igv
				lpd_porcentaje_igv: v.lpd_porcentaje_igv, //impuesto igv
				lpd_valor_igv: valorigv, //impuesto igv
				lpd_pre: pv //precio de venta total
			};

			return d;
		};

		$scope.modfUtilidadCompra = function(v) {
			var tot = v.falso_monto * (v.lpd_uti / 100 + 1);
			var valorigv = tot * 0.18;
			var pv = tot * 1.18;

			var d = {
				pro_tip: v.pro_tip,
				pro_pad: v.pro_pad,
				det_com_id: v.det_com_id,
				pro_cod: v.pro_cod,
				cd_des: v.cd_des,
				cd_can: v.cd_can,

				cd_igv: v.cd_igv,
				cd_ina: v.cd_ina,
				cd_isc: v.cd_isc,
				cd_isc: v.cd_isc,

				//////////////importantes

				lpd_com: v.lpd_com, //precio del producto

				//////////////id lista de precio

				pro_id: v.pro_id,
				lp_id: v.lp_id,
				pst_id: v.pst_id,

				lpd_fac: v.lpd_fac, //factor

				falso_monto: v.falso_monto,
				lpd_uti: v.lpd_uti, //porcentaje de utlidad
				lpd_vpre: tot, //valor de venta sin igv
				lpd_porcentaje_igv: v.lpd_porcentaje_igv, //impuesto igv
				lpd_valor_igv: valorigv, //impuesto igv
				lpd_pre: pv //precio de venta total
			};

			return d;
		};
		$scope.modfValorVentaCompra = function(v) {
			var utilidad = parseFloat(v.lpd_vpre / v.falso_monto * 100 - 100);
			var valorigv = v.lpd_vpre * 0.18;
			var pv = v.lpd_vpre * 1.18;

			var d = {
				pro_tip: v.pro_tip,
				pro_pad: v.pro_pad,
				det_com_id: v.det_com_id,
				pro_cod: v.pro_cod,
				cd_des: v.cd_des,
				cd_can: v.cd_can,

				cd_igv: v.cd_igv,
				cd_ina: v.cd_ina,
				cd_isc: v.cd_isc,
				cd_isc: v.cd_isc,

				//////////////importantes

				lpd_com: v.lpd_com, //precio del producto

				//////////////id lista de precio

				pro_id: v.pro_id,
				lp_id: v.lp_id,
				pst_id: v.pst_id,

				lpd_fac: v.lpd_fac, //factor

				falso_monto: v.falso_monto,
				lpd_uti: utilidad, //porcentaje de utlidad
				lpd_vpre: v.lpd_vpre, //valor de venta sin igv
				lpd_porcentaje_igv: v.lpd_porcentaje_igv, //impuesto igv
				lpd_valor_igv: valorigv, //impuesto igv
				lpd_pre: pv //precio de venta total
			};

			return d;
		};

		$scope.modfPrecioVentaCompra = function(v) {
			var operacion = parseFloat(v.lpd_pre / (porImpuesto / 100 + 1));
			var valorigv = parseFloat(v.lpd_pre * 0.18);
			var operacion2 = parseFloat(operacion / v.falso_monto * 100 - 100);

			var d = {
				pro_tip: v.pro_tip,
				pro_pad: v.pro_pad,
				det_com_id: v.det_com_id,
				pro_cod: v.pro_cod,
				cd_des: v.cd_des,
				cd_can: v.cd_can,

				cd_igv: v.cd_igv,
				cd_ina: v.cd_ina,
				cd_isc: v.cd_isc,
				cd_isc: v.cd_isc,

				//////////////importantes

				lpd_com: v.lpd_com, //precio del producto

				//////////////id lista de precio

				pro_id: v.pro_id,
				lp_id: v.lp_id,
				pst_id: v.pst_id,

				lpd_fac: v.lpd_fac, //factor

				falso_monto: v.falso_monto,
				lpd_uti: operacion2, //porcentaje de utlidad
				lpd_vpre: operacion, //valor de venta sin igv
				lpd_porcentaje_igv: v.lpd_porcentaje_igv, //impuesto igv
				lpd_valor_igv: valorigv,
				lpd_pre: v.lpd_pre //precio de venta total
			};

			return d;
		};

		$scope.remove = function(index) {
			$scope.items.splice(index, 1);
		};

		//guardar datos de las compras
		$scope.guardarFormularioListaPrecio = function(pro) {
			let sendObj = JSON.stringify(pro);
			var xmlhttp = new XMLHttpRequest();
			var theUrl = `../../../../api/mantenimiento/mantenimiento/create.php?getdb=${JSON.parse($rootScope.d.datos)
				.database}&tbnom=lista_precio_det`;
			xmlhttp.open('post', theUrl);
			xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xmlhttp.withCredentials = true;
			xmlhttp.send(sendObj);
			xmlhttp.onload = (response) => {
				if (xmlhttp.status == 201) {
					$scope.resultados($scope.person.selected);
				}
			};
		};
	}
]);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////PRECIO PRODUCTOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////// configuracin certificados sunat////////////////

app.controller('configSunatUploadCtrl', [
	'$rootScope',
	'$scope',
	'toaster',
	'SweetAlert',
	'getResources',
	'$state',
	'$http',
	function($rootScope, $scope, toaster, SweetAlert, getResources, $state, $http) {
		$scope.datos = {};
		$scope.datos.djqw231asd = '';

		$scope.enviarFormulario = function(e) {
			e.preventDefault();

			var f = $(this);

			var formData = new FormData(document.getElementById('formularioCargaCertificado'));

			$.ajax({
				url: `/api/upload/upload.php?folder=${JSON.parse($rootScope.d.datos).database}&djqw231asd=${$scope.datos
					.djqw231asd}&emp_id=${JSON.parse($rootScope.d.datos).emp_id}`,
				type: 'post',
				dataType: 'html',
				data: formData,
				cache: false,
				contentType: false,
				processData: false
			}).done(function(res) {
				try {
					let respuesta = JSON.parse(res);
					SweetAlert.swal('Certificado', respuesta.message, respuesta.status);
					$state.reload();
				} catch (e) {
					if (e instanceof SyntaxError) {
						SweetAlert.swal('Certificado', 'Clave del Certificado Incorrecto', 'error');
					} else {
						SweetAlert.swal('Certificado', 'Clave del Certificado Incorrecto', 'error');
					}
				}
			});
		};
		$scope.guardarFormularioUsuarioSunat = function(e) {
			e.preventDefault();
			var obj = {
				d_id: JSON.parse($rootScope.d.datos).emp_id,
				bd: JSON.parse($rootScope.d.datos).database,
				user: $scope.datos.usuario_sunat,
				ruc: $scope.datos.ruc_sunat,
				pas: $scope.datos.password_sunat
			};
			$http.post('/api/upload/update_usuario_sunat.php?update_user=true', obj).then(function(response) {
				$state.reload();
				SweetAlert.swal('Usuario Sunat', 'Datos de Usuario Actualizado', 'success');
			});
		};
		///traer informacion de l certificado antiguo
		$scope.fetchResources = function(id) {
			let obj = { db: 'empresa', where: 'emp_id', key: id };
			getResources.fetchResources(obj).then(
				function(d) {
					let respuesta = d.data[0];
					if (respuesta.fe_cerrut.length > 1) {
						$scope.certificado_val = true;
					} else {
						$scope._certificado_val = false;
					}

					$scope.datos.usuario_sunat = respuesta.fe_sntusu;
					$scope.datos.ruc_sunat = parseInt(respuesta.fe_sntruc);
					$scope.datos.password_sunat = respuesta.fe_sntcla;
				},
				function(errResponse) {
					console.error('Error while fetching Currencies');
				}
			);
		};
		$scope.fetchResources(JSON.parse($rootScope.d.datos).emp_id);
	}
]);
