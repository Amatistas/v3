'use strict';
var dbConn = require('./../../config-express/db.config');

const fetch = require('node-fetch');


//Employee object create
var Employee = function(employee) {
	this.first_name = employee.first_name;
	this.last_name = employee.last_name;
	this.email = employee.email;
	this.phone = employee.phone;
	this.organization = employee.organization;
	this.designation = employee.designation;
	this.salary = employee.salary;
	this.status = employee.status ? employee.status : 1;
	this.created_at = new Date();
	this.updated_at = new Date();
};
Employee.create = function(newEmp, result) {
	dbConn.query('INSERT INTO employees set ?', newEmp, function(err, res) {
		if (err) {
			console.log('error: ', err);
			result(err, null);
		} else {
			console.log(res.insertId);
			result(null, res.insertId);
		}
	});
};
Employee.findById = function(id, result) {
	dbConn.query('Select * from employees where id = ? ', id, function(err, res) {
		if (err) {
			console.log('error: ', err);
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Employee.verificarExistenciaOnNubefaPanel = function(data, result) {
	dbConn.query(
		'Select * from `nubefapanel`.usuario where usu_usu like %' + data.username + '% and usu_est = 1',
		function(err, res) {
			if (err) {
				console.log('error: ', err);
				result(err, null);
			} else {
				result(null, res);
			}
		}
	);
};

Employee.auth = function(datax, result) {
	/* 
	var pago = datax.body;  //object to send
	*/
	console.log(datax.body)
	fetch(dbConn.server+'/api/Auth/Auth2.php', {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(datax)
	})
		.then(function(res) {
			return res.json();
		})
		.then(function(json) {
			result(json);
		})
		.catch(function(err) {
			result(err);
		});
};

Employee.auth2 = function(data, result) {
	let bd = 'nubefa.nubefa';
	console.log(data);
	dbConn.query(
		'SELECT * FROM ' +
			'bd' +
			'.personal, nubefapanel.categoriaempresa WHERE ' +
			bd +
			".personal.per_ema = 'adolfo.gbztt@gmail.com" +
			'AND ' +
			'bd' +
			".'personal'.per_est = 1" +
			'AND ' +
			'bd' +
			'.personal.emp_id = nubefapanel.categoriaempresa.id',
		function(err, res) {
			if (err) {
				console.log('error: ', err);
				result(err, null);
			} else {
				result(null, res);
			}
		}
	);
};

Employee.findAll = function(result) {
	dbConn.query('Select * from `nubefa.nubefa`.personal', function(err, res) {
		if (err) {
			console.log('error: ', err);
			result(null, err);
		} else {
			console.log('employees : ', res);
			result(null, res);
		}
	});
};
Employee.update = function(id, employee, result) {
	dbConn.query(
		'UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?',
		[
			employee.first_name,
			employee.last_name,
			employee.email,
			employee.phone,
			employee.organization,
			employee.designation,
			employee.salary,
			id
		],
		function(err, res) {
			if (err) {
				console.log('error: ', err);
				result(null, err);
			} else {
				result(null, res);
			}
		}
	);
};
Employee.delete = function(id, result) {
	dbConn.query('DELETE FROM employees WHERE id = ?', [ id ], function(err, res) {
		if (err) {
			console.log('error: ', err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};
module.exports = Employee;
