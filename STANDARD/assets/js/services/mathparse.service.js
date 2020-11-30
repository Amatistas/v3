(function() {
	'use strict';

	app.factory('mathParse', mathParse);

	mathParse.$inject = [];

	function mathParse() {
		return {
			decimalAdjust: function(type, value, exp) {
				// Si el exp es indefinido o cero...
				if (typeof exp === 'undefined' || +exp === 0) {
					return Math[type](value);
				}
				value = +value;
				exp = +exp;
				// Si el valor no es un número o el exp no es un entero...
				if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
					return NaN;
				}
				// Cambio
				value = value.toString().split('e');
				value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
				// Volver a cambiar
				value = value.toString().split('e');

				return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
			}
		};
	}
})();
