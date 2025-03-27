    DROP DATABASE IF EXISTS `foodtrack`;
    CREATE DATABASE `foodtrack`;
    USE `foodtrack`;

    CREATE TABLE items (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name TEXT,
        price REAL,
        category TEXT,
        ingredients TEXT,
        ingredient_num TEXT
    );

    CREATE TABLE raw (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name TEXT,
        price REAL,
        threshold REAL,
        stock REAL,
        buy_amount INT,
        automatic BOOLEAN
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
        payment_method TEXT,
        amount REAL
    );

    CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        username varchar(255),
        password TEXT,
        type TEXT,
        UNIQUE (username)
    );

    INSERT INTO items VALUES (1, "Almond Chicken", 10.00, "Chicken", "[\"soy sauce\", \"chicken\", \"salt\", \"almonds\"]", "[0.2, 0.3, 0.5, 0.1]");
    INSERT INTO items VALUES (2, "Beef Chow Mein", 50.00, "Misc" , "[\"soy sauce\", \"beef\", \"salt\", \"noodles\"]", "[0.2, 0.3, 0.5, 0.1]");
    INSERT INTO items VALUES (3, "Fried Rice", 10.00, "Rice" , "[\"soy sauce\", \"rice\", \"salt\"]", "[0.2, 0.3, 0.5, 0.1]");
    INSERT INTO items VALUES (4, "Dumplings", 5.00, "Side" , "[\"soy sauce\", \"pork\", \"salt\", \"dumpling wraps\"]", "[0.2, 0.3, 0.5, 0.1]");
    INSERT INTO items VALUES (5, "S&S Chicken", 12.00, "Chicken" , "[\"sugar\", \"chicken\", \"salt\", \"flour\"]", "[0.2, 0.3, 0.5, 0.1]");
    INSERT INTO raw VALUES (1, "chicken", 2.00, 10, 25, 15, true);
    INSERT INTO raw VALUES (2, "soy sauce", 2.00, 10, 25, 15, true);
    INSERT INTO raw VALUES (3, "salt", 2.00, 10, 25, 15, true);
    INSERT INTO raw VALUES (4, "almonds", 2.00,10, 25, 15, false);
    INSERT INTO raw VALUES (5, "beef", 2.00, 10, 25, 15, true);
    INSERT INTO raw VALUES (6, "noodles", 2.00, 10, 25, 15, true);
    INSERT INTO raw VALUES (7, "sugar", 2.00, 10, 25, 15, true);
    INSERT INTO raw VALUES (8, "pork", 2.00,10, 25, 15, true);
    INSERT INTO raw VALUES (9, "dumplings wraps", 2.00, 10, 25, 15, false);
    INSERT INTO raw VALUEs (10, "flour", 1.00, 12, 20, 10, false);
    INSERT INTO accounts VALUES (1, "Admin", "Admin", "Admin");
    INSERT INTO accounts VALUES (2, "User", "User", "Server");
    INSERT INTO accounts VALUES(3, "Chef", "Chef", "Chef");
