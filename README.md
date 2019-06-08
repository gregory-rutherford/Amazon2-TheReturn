# Amazon2-TheReturn

### A mock Amazon store made with Node.js, Inquirer and Mysql

##### To begin, clone this repository onto your machine and using your terminal `cd` into the folder of "Amazon2_TheReturn" and run `npm install`

#### Initializing the server
* Copy the code from "amazon2.sql" and paste it into your workbench. 
* Run the query.

##### After running `npm install` and initializing the mysql database run the command `node amazon2_customer.js` to access the customer view, and for the manager view run `node managerview.js`

_You will need to change the password in the `var connection = mysql.connection` section to access the database_ 

## Customer View

* You will have an option to shop or an option to exit.
* If you select shop you can enter the item id of the desired product.
* You will need to enter a quantity of the item you would like to buy.
* If enough of the item is in stock your order will go through

## Manager View
_This contains the bulk of the application_
* "Exit" -- leave the app.
* "View Products for Sale" -- this will display the database with all relevant item information.
* "View Low Inventory" -- this will display items that only have a quantity of 5 or lower.
* "Add To Inventory" -- this will allow you to enter a products id and add to the quantity.
* "Add New Product" -- this will allow you to add a new product.

_Video Link_
https://www.youtube.com/watch?v=GhCbBWmt7HU&feature=youtu.be
