TasknTrade E-Commerce Website
Table of Contents
Introduction
Demo
Run
Technology
Features
Database Models
Color Palette
License
Introduction
TasknTrade is a virtual e-commerce website built using Node.js, Express.js, and Mongoose. It allows users to browse products, add them to their cart, and complete purchases using Razorpay for payment processing. The application also includes an admin panel for managing users, products, orders, and categories.

Note: Please read the Run section before opening an issue.

Demo
The website simulates a real store where users can add products to their cart and proceed to checkout. Payments are processed using Razorpay.
Important: Please do not provide real payment information during testing.

To access the admin panel (/admin), you need to provide the admin email and password.

Run
To run this application, you need to set up your own environment variables. These variables are stored in a .env file at the root of the project. Below are the required variables:

MONGO_URI: Connection string for your MongoDB Atlas database.
SESSION_SECRET: A secret string for session management.
RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET: Razorpay API keys for payment processing.
GMAIL_EMAIL and GMAIL_PASSWORD: Email credentials for Nodemailer to send/receive emails.
ADMIN_EMAIL and ADMIN_PASSWORD: Credentials for accessing the admin panel.
ADMIN_COOKIE_NAME and ADMIN_COOKIE_PASSWORD: Cookie name and password for AdminJS authentication.
Steps to Run:
Clone the repository and navigate to the project directory.
Set up the .env file with the above variables.
Seed the database:
Navigate to the seedDB folder.
Run:
Start the application:
Technology
The application is built with the following technologies:

Node.js: Backend runtime environment.
MongoDB: NoSQL database for storing application data.
Express.js: Web framework for building the application.
Bootstrap: Frontend framework for styling.
FontAwesome: Icon library for UI elements.
Razorpay API: Payment gateway for checkout.
Mapbox API: Displays a map on the "About Us" page.
AdminJS: Admin panel for managing the application.
Nodemailer: Sends emails from the "Contact Us" form.
Passport.js: Authentication middleware.
Express Validator: Validates form inputs.
Features
User Features:
Create an account, log in, or log out.
Browse available products.
Add products to the shopping cart.
View and delete items from the cart.
Checkout (requires login).
View order history in the user profile.
Admin Features:
Log in or log out of the admin panel.
Manage database records:
View, add, edit, or delete users, products, orders, and categories.
Note: The cart model is not modifiable by admins.
Database Models
The application uses the following Mongoose schemas:

User Schema:
username (String)
email (String)
password (String)
Category Schema:
title (String)
slug (String)
Product Schema:
productCode (String)
title (String)
imagePath (String)
description (String)
price (Number)
category (ObjectId - references the Category schema)
manufacturer (String)
available (Boolean)
createdAt (Date)
Cart Schema:
items (Array of items)
totalQty (Number)
totalCost (Number)
user (ObjectId - references the User schema)
Order Schema:
user (ObjectId - references the User schema)
cart (Object containing items, totalQty, and totalCost)
address (String)
paymentId (String)
createdAt (Date)
delivered (Boolean)
Color Palette
The application uses the following color palette:

Dark Blue: #1a237e
Light Blue: #478ba2
Dark Orange: #e9765b
Green: #b6e3d4
Ivory: #f8f1e9
Black: #1a1a1a
License
This project is licensed under the MIT License. See the LICENSE file for details.

