const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: "",
    database: 'employee_db',
});
connection.connect((err) => {
    if (err) throw err;

    startSearch();
});

function startSearch() {
    inquirer.prompt({
        name: 'start',
        type: 'list',
        message: 'What would you like to choose?',
        choices: [
            "All Employees",
            "Departments",
            "Roles",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Role",
        ]
    })
}




// connection.query('SELECT * FROM employees', function(err, results) {
//     console.log(results)
// });


