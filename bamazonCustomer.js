var mysql = require("mysql");
// var inquirer = require("inquirer");

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

function start(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("\n---------- Bamazon Products ---------\n");
        for(var i=0; i< res.length; i++){
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + "$" + res[i].price + "\n");
        

        }
        connection.end();
        
      });
}

