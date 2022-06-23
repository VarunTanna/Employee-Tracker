const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        port: 3001,
        user: 'root',
        password: "",
        database: 'employee_db',
    },
    console.log('Connected to the employees_db')
);

connection.query('SELECT * FROM employees', function(err, results) {
    console.log(results)
});
