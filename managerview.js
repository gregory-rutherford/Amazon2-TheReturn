//colors for terminal
var colors = require("colors");
//setting up cli tables
var Table = require("cli-table");
var table = new Table({
    head: ["item_ID", "Name", "Department", "Cost", "Quantity"],
    colWidths: [10, 35, 12, 14, 14]
});
//welcome message
console.log("Welcome to Amazon part 2, The Return!".black.bgCyan.underline);
//setting up dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
//empty array for cli tables to push into
var displayArr = [];
//setting up connection
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "yourRootPassword",
    database: "amazon2"
});
//connection to DB and displaying table of product info
function displayDB() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ["item_ID", "Name", "Department", "Cost", "Quantity"],
            colWidths: [10, 35, 12, 14, 14]
        });
        for (i = 0; i < res.length; i++) {
            table.push([
                res[i].item_id,
                res[i].product_name,
                res[i].department_name,
                res[i].price,
                res[i].stock_quantity
            ]);
        }
        console.log(table.toString());
        mainMenu();
    });
}

connection.connect(function (err) {
    if (err) {
        throw err;
    }
    mainMenu();
});
//main screen in which user can access commands
function mainMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product",
                    "Exit"
                ],
                name: "input"
            }
        ])
        .then(function (user) {
            switch (user.input) {
                case "Exit":
                    connection.end();
                    break;
                case "View Products for Sale":
                    displayDB();
                    break;
                case "View Low Inventory":
                    viewLow();
                    break;
                case "Add to Inventory":
                    addToInv();
                    break;
                case "Add New Product":
                    addNew();
                    break;
                default:
                    mainMenu();
            }
        });
}
//view items with quantity lower than 5
function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (
        err,
        res
    ) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            table.push([
                res[i].item_id,
                res[i].product_name,
                res[i].department_name,
                res[i].price,
                res[i].stock_quantity
            ]);
        }
        console.log(table.toString());
        mainMenu();
    });
}
//add to the inventory of the database for specific products
function addToInv() {
    inquirer
        .prompt([
            {
                type: "input",
                message:
                    "Please enter the item id number of the product you would like to add",
                name: "item"
            },
            {
                type: "input",
                message: "Please enter the quantity that you would like to add",
                name: "quantity"
            }
        ])
        .then(function (user2) {
            var item = user2.item;
            var quant = user2.quantity;
            connection.query(
                "SELECT * FROM products WHERE item_id = ?",
                [item],
                function (err, res) {
                    if (err) throw err;
                    else {
                        var number = parseInt(quant);
                        var storage = res[0].stock_quantity + number;
                        connection.query(
                            "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
                            [storage, item],
                            function (err, res) {
                                if (err) throw err;
                                mainMenu();
                            }
                        );
                    }
                }
            );
        });
}
// add a new product into the db
function addNew() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter the name of the product you would like to add",
                name: "item"
            },
            {
                type: "input",
                message: "Please enter the items category",
                name: "category"
            },
            {
                type: "input",
                message: "Please enter the items cost",
                name: "cost"
            },
            {
                type: "input",
                message: "Please enter the amount of product",
                name: "amount"
            }
        ])
        .then(function (user) {
            var newItem = user.item;
            var newCat = user.category;
            var newCost = user.cost;
            var newAmount = user.amount;
            var query =
                "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)";
            connection.query(query, [newItem, newCat, newCost, newAmount], function (
                err,
                res
            ) {
                if (err) throw err;
                console.log("Your item has been added.");
                mainMenu();
            });
        });
}
