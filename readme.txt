APPLICATION DESCRIPTION--------
Backend Application for managing monthly house bill.
User first needs to signup by creating a username and password.
User then needs to login to the account.
User can add products by providing name, price and category to which product belongs.
Application will generate the monthly bill amount, along with a chart which will show the user's,
expenditure based on category.

AUTHENTICATION---
I have manually added authentication using passport.js rather than inbuilt functionality such as firebase.
Password is stored with hash and salt value.

SCHEMA---
We have just 2 schemas here.
Product Schema, User Schema.

DATABASE---
Database used here is Mongodb.

Current Work in Progress...
Todo: Add monthly bill calculated to each user.
