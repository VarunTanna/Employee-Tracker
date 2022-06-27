USE employee_db;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Fiance");
INSERT INTO department (name)
VALUES ("HR");
INSERT INTO department (name)
VALUES ("Accounting");
INSERT INTO department (name)
VALUES ("CEO");

INSERT INTO role (title, salary, department_id)
VALUES ("National Rep", 50000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Local Rep", 40000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Account Broker", 65000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Credit Analyst", 70000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("National Rep", 50000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Employee Relations", 50000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Recruiter", 55000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 75000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Bookkeeper", 85000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 100000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dave", "Portnoy", 5, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Elon", "Musk", 5, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tony", "Stark", 3, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kobe", "Bryant", 3, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "Goggins", 1, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Rogan", 1, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bill", "Gates", 2, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Warren", "Buffet", 2, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Brady", 4, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tiger", "Woods", 4, 0);
