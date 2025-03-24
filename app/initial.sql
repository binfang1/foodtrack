    DROP DATABASE IF EXISTS `foodtrack`;
    CREATE DATABASE `foodtrack`;
    USE `foodtrack`;

    CREATE TABLE items (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name TEXT,
        price REAL,
        category TEXT,
        stock INT
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
        completed_datetime DATETIME,
        payment_status TEXT,
        pickup_datetime DATETIME,
        payment_method TEXT
    );

    CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        username varchar(255),
        password TEXT,
        type TEXT,
        UNIQUE (username)
    );

    INSERT INTO items VALUES (1, "Almond Chicken", 10.00, "Chicken", 200);
    INSERT INTO items VALUES (2, "Hot Pot", 50.00, "Misc" , 300);
    INSERT INTO items VALUES (3, "Fried Rice", 10.00, "Rice" , 10);
    INSERT INTO items VALUES (4, "Dumplings", 5.00, "Side" , 50);
    INSERT INTO items VALUES (5, "Orange Chicken", 12.00, "Chicken" , 70);
    INSERT INTO accounts VALUES (1, "Admin", "Admin", "Admin");
    INSERT INTO accounts VALUES (2, "User", "User", "Server");
    INSERT INTO accounts VALUES(3, "Chef", "Chef", "Chef");
