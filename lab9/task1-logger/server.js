const express = require("express");
const fs = require("fs");

const app = express();

// Middleware Logger
app.use((req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;

    fs.appendFile("logs.txt", log, (err) => {
        if (err) console.log("Error writing log");
    });

    console.log(log);
    next();
});

// Test route
app.get("/", (req, res) => {
    res.send("Task 1 Running");
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});