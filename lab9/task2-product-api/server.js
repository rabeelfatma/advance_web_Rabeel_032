const express = require("express");
const app = express();

app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Product Data
let products = [
    { id: 1, name: "Laptop", price: 800, category: "electronics", inStock: true },
    { id: 2, name: "Phone", price: 500, category: "electronics", inStock: false },
    { id: 3, name: "Shoes", price: 100, category: "fashion", inStock: true }
];

// GET all products
app.get("/products", (req, res) => {
    let result = products;

    const { category, maxPrice, inStock } = req.query;

    if (category) {
        result = result.filter(p => p.category === category);
    }

    if (maxPrice) {
        result = result.filter(p => p.price <= Number(maxPrice));
    }

    if (inStock) {
        result = result.filter(p => p.inStock === (inStock === "true"));
    }

    res.json(result);
});

// GET by ID
app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
});

// POST product
app.post("/products", (req, res) => {
    const { id, name, price, category, inStock } = req.body;

    if (
        typeof id !== "number" ||
        typeof name !== "string" ||
        typeof price !== "number" ||
        typeof category !== "string" ||
        typeof inStock !== "boolean"
    ) {
        return res.status(400).json({ error: "Invalid data" });
    }

    const exists = products.find(p => p.id === id);
    if (exists) {
        return res.status(400).json({ error: "ID already exists" });
    }

    const newProduct = { id, name, price, category, inStock };
    products.push(newProduct);

    res.status(201).json(newProduct);
});

// Invalid route
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(3000, () => {
    console.log("Task 2 running on port 3000");
});