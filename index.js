const mysql = require('mysql2');
const inquirer = require('inquirer');

require('console.table');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "employee_db",
});

db.connect(function (err) {
    if (err) throw err;
    startSearch();
});


const showAllEmployees = () => {
    // let query = "SELECT * FROM employee";
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) return console.error(err);
        // if (err) throw err;
        console.table(results);
        startSearch();
    });
}

const showAllRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) return console.error(err);
        // if (err) throw err;
        console.table(results);
        startSearch();
    });
}

const showAllDepartments = () => {
    // let query = "SELECT * FROM department";
    db.query('SELECT * FROM department', function (err, results) {
        if (err) return console.error(err);
        console.table(results);
        startSearch();
    });
}

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'deptName',
        message: 'What is the department name?'
    }).then(function (answer) {
        db.query('INSERT INTO department (name) VALUES (?)', [answer.deptName], function (err, res) {
            if (err) throw err;
            console.log(res)
            startSearch();
        });
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?'
        },
        {
            type: 'input',
            name: 'deptId',
            message: 'What is the department id number?'
        },
       
    ]).then(function(answer){
        db.query("INSERT INTO role (first_name, last_name, role_id, manager_id) VALUES (?,?,?)", [answer.roleName, answer.salary, answer.deptId], function(err, res) {
            if(err) throw err;
            console.table(res);
            startSearch();
        });
    });
}


function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'eFirstName',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'eLastName',
            message: 'What is the employees last name?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the employees role id number?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the manager id number?'
        },
    ]).then(function(answer){
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [answer.eFirstName, answer.eLastName, answer.roleId, answer.managerId], function(err, res) {
            if(err) throw err;
            console.table(res);
            startSearch();
        });
    });
}

// join stuff

function startSearch() {
    inquirer.prompt({
        message: 'What would you like to do?',
        type: 'list',
        choices: [
            "Show All Employees",
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
                showAllEmployees()
                break;
            case "Show All Roles":
                showAllRoles()
                break;
            case "Show All Departments":
                showAllDepartments()
                break;
            case "Add Department":
                addDepartment()
                break;
            case "Add Role":
                addRole()
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "EXIT":
                exit()
                break;

        }
    })
}

function exit() {
    process.exit();
}