CREATE DATABASE amazon2;

USE amazon2;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR (30) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Corn", "Produce", 3, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Hammer", "Tool", 5, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Keyboard", "Electronics", 20, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Pet Monkey", "Pets", 1000, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Gumby Statue", "Collectibles", 120, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Bok Choy", "Produce", 1.5, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Terry Jacks - Seasons in the Sun", "Cassingle", 0.25, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Destiny 2", "Video Games", 60, 145);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Life Size Snoopy Doll", "Toys/Stuffed Animals", 20.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Life Size Ziggy Doll", "Toys/Stuffed Animals", 21.95, 9);
