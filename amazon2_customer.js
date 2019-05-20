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

connection.connect(function (err) {
    if (err) {
        throw err;
    }
    displayDB();

})


function afterConnection() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Shop", "Exit"],
            name: "input"
        }
    ])
        .then(function (user) {
            if (user.input === "Exit") {
                connection.end();
            } else {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "choice",
                        message: "Enter the item ID of the prodcut you would like to purchase",
                    },
                    {
                        type: "input",
                        name: "choice2",
                        message: "How many would you like to buy?"
                    }
                ])
                    .then(function (user) {
                        connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [user.choice], function (err, res) {
                            if (err) {
                                throw err
                            }
                            else if (user.choice2 > res[0].stock_quantity) {
                                console.log("Insufficient quantity!");
                                afterConnection();
                            }
                            else {
                                var storage = (res[0].stock_quantity - user.choice2);
                                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [storage, user.choice], function (err) {
                                    if (err) throw err;
                                });
                                console.log("Wow very cool, your order is on the way!".cyan);
                                displayDB();
                            }
                        }
                        )
                    })
            }
        })

}