CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL (10, 2) NOT NULL,
    stock_quantity INT(11) NOT NULL,
    over_head_costs DECIMAL (10, 2) NOT NULL,
    product_sales DECIMAL (10, 2) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, over_head_costs, product_sales)
VALUES ('laptop', 'electronics', 999.99, 2000, 400000, 0), ('crypto mining rig', 'electronics', 4999.99, 250, 200000, 0), ('tent', 'camping', 449.99, 800, 10000, 0), ('mountain bike', 'camping', 849.99, 300, 150000, 0), ('backpack', 'camping', 149.99, 2500, 5000, 0), ('sleeping bag', 'camping', 199.99, 1500, 20000, 0), ('puppy', 'pets', 249.99, 20, 4000, 0), ('used panties', 'special imports', 499.99, 20000, 1000, 0), ('dakimakura pillow', 'special imports', 124.99, 3000, 1500, 0), ('loli waifu', 'special imports', 9000.01, 0, 1000, 0);

CREATE TABLE departments AS SELECT * FROM products(
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs DECIMAL (10, 2) NOT NULL,
    product_sales DECIMAL (10, 2) NOT NULL,
    total_profit DECIMAL (10, 2) NOT NULL,
    PRIMARY KEY (department_id)
);