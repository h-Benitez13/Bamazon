DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL (10,4),
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name, price, stock_quantity )
VALUES ("cliff bars", "snacks", 5.99, 5);

INSERT INTO products (product_name,department_name, price, stock_quantity )
VALUES ("macbook pro", "technology/electronics", 999.99, 5);

INSERT INTO products (product_name,department_name, price, stock_quantity )
VALUES ("socks", "clothes", 2.99, 10);

INSERT INTO products (product_name,department_name, price, stock_quantity )
VALUES ("toothpaste", "toiletries", 8.99, 20);

INSERT INTO products (product_name,department_name, price, stock_quantity )
VALUES ("jean jacket", "clothes", 10.99, 3);

INSERT INTO products (product_name,department_name, price, stock_quantity )
VALUES ("milk", "food", 5.99, 100);

INSERT INTO products (product_name,department_name, price, stock_quantity )
VALUES ("Reese's pieces", "candy", 0.99, 300);

INSERT INTO products (product_name,department_name, price, stock_quantity )
VALUES ("Iphone charger", "technology/electronics", 9.99, 25);

INSERT INTO products (product_name,department_name, price, stock_quantity )
VALUES ("humidifier", "home products", 12.99, 9);

INSERT INTO products (product_name,department_name, price, stock_quantity )
VALUES ("bean bag chair", "home products", 19.99, 10);


