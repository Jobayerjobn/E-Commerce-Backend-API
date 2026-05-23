# My E-Commerce Backend Project

This is a complete backend application for an e-commerce platform that I built using **Node.js**, **Express.js**, and **Mongoose**. To keep my codebase clean, organized, and easy to maintain, I followed the **MVC (Model-View-Controller) Architecture**.

## Project Features

- **User Signup & Login**: Customers can easily create a new account and log in. For security, passwords are encrypted using `bcryptjs` before saving to the database, and users receive a secure JWT token upon logging in.
- **Product Management & Filters**: New products can be successfully added to the database. Customers can also search for items by filtering through specific categories, brands, or price ranges.
- **Add to Cart Logic**: Users can dynamically add items to their shopping cart. If they add the same product multiple times, the cart automatically calculates and updates the quantity and total price.
- **Checkout & Order Processing**: Users can successfully convert their cart items into a finalized order during checkout.
- **Global Error Handling Middleware**: If something goes wrong (like typing a duplicate email or missing an input), the application will not crash. Instead, it catches the issue and sends back a clean error message.
- **Custom Logger Middleware**: Calculates exact execution times in milliseconds (`ms`) for every single request and tracks network traffic data directly in the terminal console.

---

##  Project Directory

I have structured my project files like this:
- `app.js` — Initializes the Express application and manages core middleware sequencing.
- `server.js` — Sets up the main database connection hook and starts up the server on port 3000.
- `router.js` — Holds all the API routes and path definitions for the application.
- `controller.js` — Contains the main business logic (Signup, Login, Cart, and Orders).
- `userSchemaModel.js` — Mongoose schema template and model for Users.
- `productSchema.js` — Mongoose schema template and model for Products.
- `cartModel.js` — Mongoose schema template and model for Carts.
- `orderSchema.js` — Mongoose schema template and model for Orders.
- `customErrorHandler.js` — Blueprint class used to format operational app errors.
- `middleware.js` — Contains helper utilities like response formatting and the traffic logger.

---

## How to Run the Project Locally

1. Open your terminal inside the project root folder and install all the required package dependencies:
   ```bash
   npm install express mongoose bcryptjs jsonwebtoken
   ```
2. Make sure your local **MongoDB Server / MongoDB Compass** instance is running in the background (`mongodb://127.0.0.1:27017`).
3. Boot up the local development server:
   ```bash
   node server.js
   ```

---

## Available API Routes List

I have tested the following routes inside Postman to ensure they work smoothly:

### 1. Authentication (Auth)
- **POST** `/api/v1/signup` — For registering a new customer account.
- **POST** `/api/v1/login` — For user login verification.

### 2. Product Catalog
- **GET** `/api/v1/user` — Creates a new product profile. *(Note: I plan to switch this to a POST route later)*
- **GET** `/api/v1/filter` — Searches and filters products by matching fields.

### 3. Cart & Orders
- **POST** `/api/v1/users/find` — Adds a product item into the user's cart (Add to Cart).
- **GET** `/api/v1/cart` — Fetches the active cart contents for the user.
- **POST** `/api/v1/wow` — Submits a checkout payload to generate a finalized purchase invoice.


