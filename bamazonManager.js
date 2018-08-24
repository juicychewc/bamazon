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
    manageStuff();
});

function manageStuff() {
    inquirer.prompt([
        {
            name: "manageWhat",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
            message: "What would you like to do?"
        }
    ]).then(function (answer) {
        if (answer.manageWhat === "View Products for Sale") {
            viewAll();
        }

        else if (answer.manageWhat === "View Low Inventory") {
            viewLow();
        }

        else if (answer.manageWhat === "Add to Inventory") {
            addStock();
        }

        else if (answer.manageWhat === "Add New Product") {
            addProduct();
        }

        else {
            connection.end();
        }
    })
}

function viewAll() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        connection.end();
    })
}

function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 100", function (err, results) {
        if (err) throw err;
        console.table(results);
        connection.end();
    })
}

function addStock() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        inquirer.prompt([
            {
                name: "addWhat",
                type: "list",
                choices: function () {
                    var itemArray = [];
                    for (var i = 0; i < results.length; i++) {
                        itemArray.push(results[i].product_name);
                    }
                    return itemArray;
                },
                message: "What item would you like to add more inventory to?"
            },
            {
                name: "addHowMany",
                type: "input",
                message: "How many would you like to add?"
            }
        ]).then(function (addition) {
            connection.query("SELECT * FROM products WHERE product_name = '" + addition.addWhat + "'", function (err, results) {
                if (err) throw err;
                if (parseInt(addition.addHowMany) > 0) {
                    var newStock = (parseInt(addition.addHowMany) + parseInt(results[0].stock_quantity));
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newStock
                            },
                            {
                                item_id: results[0].item_id
                            }
                        ],
                        function (error) {
                            if (error) throw error;
                            console.log("Inventory added");
                            connection.end();
                        }
                    )
                }
                else {
                    console.log("That is an invalid amount, try again");
                    addStock();
                }
            })
        })
    })
}

function addProduct() {
    inquirer.prompt([
        {
            name: "productName",
            type: "input",
            message: "What is the product you would like to add?"
        },
        {
            name: "productCategory",
            type: "list",
            choices: ["electronics", "camping", "pets", "special imports"],
            message: "Which department would you like to add this product to?"
        },
        {
            name: "productRetail",
            type: "input",
            message: "How much would you like to sell each of this product for?"
        },
        {
            name: "productQuantity",
            type: "input",
            message: "How many would you like to add to warehouse stock?"
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO products SET ?",
            {
                product_name: answer.productName,
                department_name: answer.productCategory,
                price: answer.productRetail,
                stock_quantity: answer.productQuantity
            },
            function (err) {
                if (err) throw err;
                console.log("Item successfully added");
                connection.end();
            }
        )
    })
}