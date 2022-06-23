USE employees_db;

INSERT INTO department (name)
VALUES 
    ('Fiance'),
    ('Insurance');

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Accounts", 72000, 1),
    ("Banker", 65000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ("Varun", "Tanna", 1, NULL),
    ("Elon", "Musk", 2, 1);
