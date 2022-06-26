const mysql = require('mysql2');
const inquirer = require('inquirer');

require('console.table');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "employees_db",
});

db.connect(function (err) {
    if (err) throw err;
    startSearch();
});

function startSearch() {
    inquirer.prompt({
        message: 'What would you like to do?',
        type: 'list',
        choices: [
            "Show All Emplyoees",
            "Show All Roles",
            "Show All Departments",
            "Add Employee",
            "Add Role",
            "Add Department",
            "EXIT",
        ],
        name: "choice"
    }).then(answers => {
        console.log(answers.choice);
        switch (answers.choice) {
            case "Show All Employees":
                showAllDepartments()
                break;
            case "Show All Roles":
                showAllRoles()
                break;
            case "Show All Departments":
                showAllEmployees()
                break;
            case "Add Employee":
                addEmployee()
                break;
            case "Add Role":
                addRole()
                break;
            case "Add Department":
                addDepartment();
            case "EXIT":
                exit()
                break;

        }
    })
}


function showAllEmployees() {
    // let query = "SELECT * FROM employee";
    db.query('SELECT * FROM employee', function (err, results) {
        // if (err) return console.err(err);
        if (err) throw err;
        console.table(results);
        startSearch();
    });
}

function showAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        // if (err) return console.err(err);
        if (err) throw err;
        console.table(results);
        startSearch();
    });
}

function showAllDepartments() {
    // let query = "SELECT * FROM department";
    db.query('SELECT * FROM department', function (err, results) {
        if (err) throw err;
        console.table(results);
        startSearch();
    });
}

//     funtion addEmployee() {
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'firstName',
//             message: 'What is the employees first name?'
//         },
//         {
//             type: 'input',
//             name: 'lastName',
//             message: 'What is the employees last name?'
//         },
//         {
//             type: 'number',
//             name: 'roleId',
//             message: 'What is the employees role ID??'
//         },
//         {
//             type: 'number',
//             name: 'managerId',
//             message: 'What is the employees manger ID?'
//         },

//     ]).then(function (res) {
//         connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [res.firstName, res.lastName, res.roleId, res.managerId], function (err, data) {
//             if (err) throw err;
//             console.table("Employee Added!");
//             startSearch();
//         })
//     })
// }
// exit() {
//     process.exit();
// }
// }

// const init = () => {
//     const choices = [
//         { name: 'show All Employees', value: 'showAllEmployees' },
//         { name: 'show All Roles', value: 'showAllRoles' },
//         { name: 'show All Departments', value: 'showAllDepartments' },
//         { name: 'Exit', value: 'exit' },

//     ];

//     inquirer.prompt([
//         {
//             type: 'rawlist',
//             name: 'query',
//             message: 'What option would you like to select?',
//             choices,
//         }
//     ]).then((answers) => fn[answers.query]());
// };

// init();



