CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL (10, 2) NOT NULL,
    stock_quantity INT(11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('laptop', 'electronics', 999.99, 2000), ('crypto mining rig', 'electronics', 4999.99, 250), ('tent', 'camping', 449.99, 800), ('mountain bike', 'camping', 849.99, 300), ('backpack', 'camping', 149.99, 2500), ('sleeping bag', 'camping', 199.99, 1500), ('puppy', 'pets', 249.99, 20), ('used panties', 'special imports', 499.99, 0), ('dakimakura pillow', 'special imports', 124.99, 3000), ('loli', 'special imports', 9000.01, 0);
