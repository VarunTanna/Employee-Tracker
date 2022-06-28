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
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role  ON employee.role_id = role.id LEFT JOIN department  ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id', function (err, results) {
    
        if (err) return console.error(err);
        // if (err) throw err;
        console.table(results);
        startSearch();
    });
}

const showAllRoles = () => {
    db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id', function (err, results) {
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
            message: 'What is the department name?'
        },

    ]).then(function (answer) {
        db.query("INSERT INTO role (title, salary, role.id, department_id) VALUES (?,?,?,?)", [answer.roleName, answer.salary, answer.deptId, 0], function (err, res) {
            if (err) throw err;
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
    ]).then(function (answer) {
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [answer.eFirstName, answer.eLastName, answer.roleId, answer.managerId], function (err, res) {
            if (err) throw err;
            console.table(res);
            startSearch();
        });
    });
}

// function updateEmployee() {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "empUpdate",
//             message: "What is the id of the employee that you want to update?"
//         },
//         {
//             type: "input",
//             name: "updateRole",
//             message: "What is the role id you want to update the employee to?"
//         },

//     ]).then(function (answer) {
//         db.query('UPDATE employee SET role_id=? WHERE id=?', [answer.updateRole, answer.empUpdate], function (err, res) {
//             if (err) throw err;
//             console.table(res);
//             startSearch();
//         })
//     })
// }


// tutor help
function updateEmployeeRole() {
    showAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(({ id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Which employee's role do you want to update?",
                choices: employeeChoices
            }
        ]).then(res => {
            let employeeId = res.employeeId;
            showAllRoles()
            .then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({ id, title }) => ({
                    name: title, 
                    value: id
                }));

                prompt([
                    {
                        type: "list",
                        name: "roleId",
                        message: "Which role do you want to assign the selected employee?",
                        choices: roleChoices
                    }
                ])
                .then( res => updateEmployeeRole(employeeId, res.roleId))
                .then(() => startSearch());
            })
        })
    })
    
}





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
            "Update Employee",
            "EXIT",
        ],
        name: "choice"
    }).then(answers => {
        console.log(answers.choice);
        switch (answers.choice) {
            case "Show All Employees":
                showAllEmployees();
                break;
            case "Show All Roles":
                showAllRoles();
                break;
            case "Show All Departments":
                showAllDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee":
                updateEmployeeRole();
                break;
            case "EXIT":
                exit();
                break;

        }
    })
}

function exit() {
    process.exit();
}