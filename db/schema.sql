DROP DATABASE IF EXIST employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY, 
    department_name VARCHAR(30) NOT NULL,
);

CREATE TABLE employees (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
);

CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    salary DECIMAL(10, 0) NOT NULL,
    department_id INT NOT NULL,
);