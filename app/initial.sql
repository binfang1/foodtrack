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

INSERT INTO items VALUES (1, "Almond Chicken", 10.00, "test description");
INSERT INTO items VALUES (2, "Hot Pot", 50.00, "test description");
INSERT INTO items VALUES (3, "Fried Rice", 10.00, "test description");
INSERT INTO items VALUES (4, "Dumplings", 5.00, "test description");
INSERT INTO items VALUES (5, "Orange Chicken", 12.00, "test description");
INSERT INTO accounts VALUES (1, "Admin", "Admin", 1);
