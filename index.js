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
    .then(function(answer) {
        console.log(answer);

        if(answer.start === "All Employees") {
            getAll();
        }

        else if(answer.start === "Departments") {
            getDepts();
        }

        else if(answer.start === "Roles") {
            getRoles();
        }

        else if(answer.start === "Add Employee") {
            addEmployee();
        }

        else if(answer.start === "Add Department") {
            addDept();
        }

        else if(answer.start === "Add Role") {
            addRole();
        }

        else if(answer.start === "Update Role") {
            updateRole();
        } else {
            connection.end();
        }

    })
}




// connection.query('SELECT * FROM employees', function(err, results) {
//     console.log(results)
// });


