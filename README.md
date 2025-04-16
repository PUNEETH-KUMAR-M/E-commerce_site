🌟 TasknTrade E-Commerce Website
📌 Table of Contents
- Introduction
- 🚀 Demo
- 🛠️ Run
- ⚙️ Technology
- 🌟 Features
- 🗄️ Database Models
- 🎨 Color Palette
- 📜 License


📖 Introduction
TasknTrade is a virtual e-commerce website built using Node.js, Express.js, and Mongoose. It allows users to browse products, add them to their cart, and complete purchases using Razorpay for payment processing. An admin panel is available for managing users, products, orders, and categories.
🔹 Note: Please read the Run section before opening an issue.

🎥 Demo
The website simulates a real store experience, allowing users to:
✔️ Browse products
✔️ Add items to the cart
✔️ Proceed to checkout
✔️ Payments processed via Razorpay
⚠️ Important: Do not provide real payment information during testing.
🔐 To access the admin panel (/admin), you need to provide the admin email and password.

🛠️ Run
⚡ Environment Variables
Before running the application, you must set up your own .env file at the root of the project. Below are the required variables:
🔹 MONGO_URI → MongoDB Atlas connection string
🔹 SESSION_SECRET → Secret string for session management
🔹 RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET → Razorpay API keys
🔹 GMAIL_EMAIL & GMAIL_PASSWORD → Credentials for Nodemailer
🔹 ADMIN_EMAIL & ADMIN_PASSWORD → Admin login credentials
🔹 ADMIN_COOKIE_NAME & ADMIN_COOKIE_PASSWORD → AdminJS authentication
🔧 Steps to Run
1️⃣ Clone the repository
2️⃣ Navigate to the project directory
3️⃣ Set up the .env file with the variables above
4️⃣ Seed the database
- Go to the seedDB folder
- Run: node seed.js
5️⃣ Start the application

npm install
npm start



⚙️ Technology
This project is powered by:
✔️ Node.js → Backend runtime environment
✔️ MongoDB → NoSQL database
✔️ Express.js → Web framework
✔️ Bootstrap → Styling framework
✔️ FontAwesome → Icon library
✔️ Razorpay API → Payment gateway
✔️ Mapbox API → Map display
✔️ AdminJS → Admin panel
✔️ Nodemailer → Email service
✔️ Passport.js → Authentication
✔️ Express Validator → Form validation

🌟 Features
👥 User Features
✔️ Create an account, log in, or log out
✔️ Browse available products
✔️ Add products to shopping cart
✔️ View and manage cart
✔️ Checkout (requires login)
✔️ View order history
🔑 Admin Features
✔️ Log in or log out of the admin panel
✔️ Manage database records
✔️ View, add, edit, or delete users, products, orders, and categories
🚨 Note: Admins cannot modify the cart model.

🗄️ Database Models
The app uses Mongoose schemas for structured data management:
🔹 User Schema → username, email, password
🔹 Category Schema → title, slug
🔹 Product Schema → productCode, title, imagePath, description, price, category, manufacturer, available, createdAt
🔹 Cart Schema → items, totalQty, totalCost, user
🔹 Order Schema → user, cart, address, paymentId, createdAt, delivered

🎨 Color Palette
The website uses a sleek color scheme:
🔵 Dark Blue: #1a237e
🔷 Light Blue: #478ba2
🟠 Dark Orange: #e9765b
🟢 Green: #b6e3d4
🟡 Ivory: #f8f1e9
⚫ Black: #1a1a1a

📜 License
📝 This project is licensed under the MIT License. See the LICENSE file for details.

✨ Hope this colorful README enhances the understanding and usability of your TasknTrade project! 🚀 Let me know if you need any refinements! 🎨
