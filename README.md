# E-Commerce API

A RESTful E-Commerce API built with Node.js, Express.js, and MongoDB. The project provides APIs to manage products, categories, users, carts, and orders.

---

# Features

- Products CRUD Operations
- Categories CRUD Operations
- User Management
- Shopping Cart Management
- Order Management
- MongoDB Database Integration
- RESTful API Architecture
- Environment Variables Support

---

# Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemon
- Postman

---

# Prerequisites

Before running the project, make sure you have installed:

- Node.js
- npm
- MongoDB

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Go to the project folder

```bash
cd L4-project
```

Install dependencies

```bash
npm install
```

Create a `.env` file and add your environment variables.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Run the project

Development Mode

```bash
npm run dev
```

Production Mode

```bash
npm start
```

---

# Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Application Port |
| MONGO_URI | MongoDB Connection String |

---

# API Endpoints

## Products

| Method | Endpoint |
|--------|----------|
| GET | /api/products |
| GET | /api/products/:id |
| POST | /api/products |
| PUT | /api/products/:id |
| DELETE | /api/products/:id |

## Categories

| Method | Endpoint |
|--------|----------|
| GET | /api/categories |
| GET | /api/categories/:id |
| POST | /api/categories |
| PUT | /api/categories/:id |
| DELETE | /api/categories/:id |

## Users

| Method | Endpoint |
|--------|----------|
| GET | /api/users |
| POST | /api/users |
| PUT | /api/users/:id |
| DELETE | /api/users/:id |

## Cart

| Method | Endpoint |
|--------|----------|
| GET | /api/cart |
| POST | /api/cart |
| PUT | /api/cart/:id |
| DELETE | /api/cart/:id |

## Orders

| Method | Endpoint |
|--------|----------|
| GET | /api/orders |
| POST | /api/orders |
| PUT | /api/orders/:id |
| DELETE | /api/orders/:id |

---

# Project Structure

```
project/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── views/
├── app.js
├── package.json
├── .env
└── README.md
```

---

# Available Scripts

Start the application:

```bash
npm start
```

Run in development mode:

```bash
npm run dev
```

---

# API Testing

The API endpoints were tested using **Postman**. All CRUD operations for the available resources were successfully verified.

---

# Author

L4 Project – Node.js & Express REST API
