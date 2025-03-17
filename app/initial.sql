DROP DATABASE IF EXISTS `foodtrack`;
CREATE DATABASE `foodtrack`;
USE `foodtrack`;

CREATE TABLE items (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    price REAL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS orders (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    client TEXT,
    subtotal REAL,
    tax REAL,
    total REAL,
    items TEXT,
    notes TEXT,
    status TEXT,
    creation_datetime DATETIME,
    completed_datetime DATETIME
);

CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username TEXT,
    password TEXT,
    admin BOOLEAN
);

INSERT INTO items VALUES (1, "test item", 100.00, "test description");
INSERT INTO accounts VALUES (1, "Test account", "Test password", 1);
