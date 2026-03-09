const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Middleware: Request Logging
app.use((req, res, next) => {
    const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    console.log(logMessage.trim());
    fs.appendFileSync('server.log', logMessage);
    next();
});

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to the Express Server!');
});

// About Route
app.get('/about', (req, res) => {
    res.send('This is the About page.');
});

// Contact Route
app.get('/contact', (req, res) => {
    res.send('Contact us at contact@domain.com');
});

// Dynamic Greeting Route
app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (name) {
        res.send(`Hello, ${name}!`);
    } else {
        res.send('Hello, Stranger!');
    }
});

// POST route for form submission
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).send('Error: Name and Email are required!');
    }
    res.send(`Form submitted! Name: ${name}, Email: ${email}`);
});

// Serve HTML Form
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});