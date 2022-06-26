const mysql = require('mysql');
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

const fn = {
    showAllEmployees() {
        db.query('SELECT * FROM employees', function (err, results) {
            if (err) return console.err(err);
            console.table(results);
            startSearch();
        });
    },

    showAllRoles() {
        db.query('SELECT * FROM role', function (err, results) {
            if (err) return console.err(err);
            console.table(results);
            startSearch();
        });
    },

    showAllDepartments() {
        db.query('SELECT * FROM departments', function (err, results) {
            if (err) return console.err(err);
            console.table(results);
            startSearch();
        });
    },
    exit() {
        process.exit();
    },
};

const init = () => {
    const choices = [
        { name: 'show All Employees', value: 'showAllEmployees' },
        { name: 'show All Roles', value: 'showAllRoles' },
        { name: 'show All Departments', value: 'showAllDepartments' },
        { name: 'Exit', value: 'exit' },

    ];

    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'query',
            message: 'What option would you like to select?',
            choices,
        }
    ]).then((answers) => fn[answers.query]());
};

init();
  


