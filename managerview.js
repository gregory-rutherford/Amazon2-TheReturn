var colors = require('colors');


console.log("Welcome to Amazon part 2, The Return!".black.bgCyan.underline);

var mysql = require("mysql");
var inquirer = require("inquirer");

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

function displayDB() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        afterConnection();
    })
}

function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        console.table(res);
    })
}


function addToInv() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the item id number of the product you would like to add",
            name: "item",
        },
        {
            type: "input",
            message: "Please enter the quantity that you would like to add",
            name: "quantity",
        }
    ]).then(function (user2) {
        var item = user2.item;
        var quant = user2.quantity;
        connection.query("SELECT * FROM products WHERE item_id = ?", [item], function (err, res) {
            if (err)
                throw err;
            else {
                var number = parseInt(quant);
                var storage = (res[0].stock_quantity + number);
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [storage, item], function (err, res) {
                    if (err)
                        throw err;
                    displayDB();
                    connection.end();
                });
            }
        });
    });
}

connection.connect(function (err) {
    if (err) throw err;
    displayDB();
})


function afterConnection() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
            name: "input"
        }
    ])
        .then(function (user) {

            switch (user.input) {
                case ("Exit"):
                    connection.end();
                    break
                case ("View Products for Sale"):
                    displayDB();
                    afterConnection();
                    break
                case ("View Low Inventory"):
                    viewLow();
                    afterConnection();
                    break
                case ("Add to Inventory"): 
                    
                    addToInv();
                    break
                }
        })
};

                