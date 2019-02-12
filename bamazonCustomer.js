var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Maimai0513",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("\n---------- Bamazon Products ---------\n");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + "$" + res[i].price + " | " + 
            "# in stock: " + res[i].stock_quantity )
        }

        welcomeID();

    });
}

// function which prompts the user for what action they should take
function welcomeID() {
    inquirer
        .prompt(
            {
                name: "welcome",
                type: "input",
                message: "Welcome to Bamazon! What's your name shopper?"
            }
        )
        .then(function (answer) {
            console.log("\n" + answer.welcome + ", " + "I hope you are ready to shop till you drop!\n");
            idQuantity();

        });
}

function idQuantity() {
    // query the database for all items being purchased
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to buy
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "What item would you like to buy?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How much would you like to buy?(in terms of quantity)"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }
                var chosenItem;
                

                console.log(
                    "\n'You chose " + answer.quantity + " " + answer.choice + "s" + "\n");
                // determine if quantity is too high and over stock quantity
                if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
                    // quantity was low enough, so update db, let the user know, and start over
                    var totalPrice = chosenItem.price * answer.quantity ;
                    
                    // if (error) throw err;
                    console.log("YOU ARE IN LUCK, WE HAVE JUST THE RIGHT AMOUNT\n"
                   + "\n Comes down to a total of " + "$" + totalPrice  +
                    "\n if you would like to continue shopping please do!" 
                 
                    );

                    productList();
                    


                }
                else {
                    // quantity was TOO much, so apologize and start over
                    console.log("Sorry my guy, pero like, we aint got it like that. Try again...");
                    productList();
                    
                }
            });

    });
}

function productList() {
    inquirer
    .prompt(
        {
            name: "checkout",
            type: "confirm",
            default: false,
            message: "You can checkout whenever you want, would you like to continue shopping?"
           
        }
    )
    .then(function (answer) {
        if (answer.checkout === false){
            console.log(
                "\n We want to thank and hope you had a wonderful time shopping at BAMAZON!" +
            "\nHope to see you soon!"
            )
           
            

        } else{
            console.log("lets keep shopping!\n");
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                console.log("\n---------- Bamazon Products ---------\n");
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].item_id + " | " + res[i].product_name + " | " + "$" + res[i].price + " | " + 
                    "# in stock: " + res[i].stock_quantity )
                }
                idQuantity();
        
            });
        }

    });
   
}
