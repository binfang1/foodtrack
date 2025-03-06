CREATE TABLE IF NOT EXISTS items (
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

INSERT INTO items VALUES (1, "test item", 100.00, "test description");
INSERT INTO orders VALUES (1, "test client", 100.00, 1.00, 101.00, "test items",
"test notes", "test status", NOW(), NOW()
);
