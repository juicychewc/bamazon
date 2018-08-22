var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "CouseK09",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    chooseCategory();
});

function chooseCategory() {
    inquirer.prompt([
        {
            name: "whatCategory",
            type: "rawlist",
            choices: ["electronics", "camping", "pets", "special imports"],
            message: "What department would you like to shop in?",
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE department_name = '" + answer.whatCategory + "'", function (err, results) {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: "whatItem",
                    type: "rawlist",
                    choices: function () {
                        var productArray = [];
                        for (var i = 0; i < results.length; i++) {
                            productArray.push(results[i].product_name);
                        }
                        return productArray;
                    },
                    message: "Which product would you like to purchase?"
                }
            ]).then(function (selection) {
                connection.query("SELECT * FROM products WHERE product_name = '" + selection.whatItem + "'", function (err, results) {
                    if (err) throw err;
                    var chosenItem = results[0];
                    console.table(results);
                    console.log(results[0].product_name + " are " + results[0].price + " each");
                    inquirer.prompt([
                        {
                            name: "howMany",
                            type: "input",
                            message: "How many would you like to purchase?"
                        }
                    ]).then(function (purchase) {
                        connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE product_name = '" + chosenItem.product_name + "'", function (err, results) {
                            if (err) throw err;
                            if (parseInt(purchase.howMany) <= parseInt(results[0].stock_quantity)) {
                                var remainingStock = (parseInt(results[0].stock_quantity) - parseInt(purchase.howMany));
                                var yourTotal = (parseInt(purchase.howMany) * parseFloat(results[0].price));
                                connection.query("UPDATE products SET ? WHERE ?",
                                    [
                                        {
                                            stock_quantity: remainingStock
                                        },
                                        {
                                            item_id: chosenItem.item_id
                                        }
                                    ],
                                    function (error) {
                                        if (error) throw err;
                                        console.log("Thank you for your purchase!  Your total for your purchase of " + parseInt(purchase.howMany) + " " + chosenItem.product_name + " comes to " + yourTotal + "!")
                                        chooseCategory();
                                    }
                                )
                            }
                            else {
                                console.log("Sorry, we're currently sold out of " + chosenItem.product_name + "!")
                                chooseCategory();
                            }
                        })
                    })
                })
            })
        })
    })
}