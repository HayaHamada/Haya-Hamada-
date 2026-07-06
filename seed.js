const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("dns");

dotenv.config();

// Fix DNS issue
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const Category = require("./src/models/Category");
const Product = require("./src/models/Product");

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // Delete old data
        await Product.deleteMany();
        await Category.deleteMany();

        console.log("Old data deleted");

        // Add Categories
        const categories = await Category.insertMany([
            {
                name: "Electronics",
                description: "Electronic devices"
            },
            {
                name: "Furniture",
                description: "Home furniture"
            },
            {
                name: "Accessories",
                description: "Fashion accessories"
            }
        ]);

        console.log("Categories Added");

        // Add Products
        await Product.insertMany([
            {
                name: "Laptop",
                price: 25000,
                quantity: 10,
                category: categories[0]._id
            },
            {
                name: "Phone",
                price: 15000,
                quantity: 20,
                category: categories[0]._id
            },
            {
                name: "Chair",
                price: 1200,
                quantity: 15,
                category: categories[1]._id
            },
            {
                name: "Table",
                price: 3000,
                quantity: 8,
                category: categories[1]._id
            },
            {
                name: "Watch",
                price: 800,
                quantity: 30,
                category: categories[2]._id
            }
        ]);

        console.log("Products Added");

        console.log("Database Seeded Successfully");

        await mongoose.connection.close();
        console.log("Connection Closed");

    } catch (err) {
        console.error(err);
    }
}

seedDatabase();