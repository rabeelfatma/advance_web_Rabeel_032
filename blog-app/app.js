const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

// --------------------
// MongoDB Connection
// --------------------
mongoose.connect("mongodb://127.0.0.1:27017/blog-app") // Mongoose v9+
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// --------------------
// Middlewares
// --------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(session({
    secret: "secret123",
    resave: false,
    saveUninitialized: false
}));

// --------------------
// Static Folder
// --------------------
app.use(express.static(path.join(__dirname, "public")));

// --------------------
// View Engine
// --------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --------------------
// Routes
// --------------------
// Auth routes: /register, /login, /logout
app.use("/", authRoutes);

// Post routes: /posts/dashboard, /posts/create, /posts/edit/:id, /posts/delete/:id
app.use("/posts", postRoutes);

// --------------------
// Handle Unknown Routes
// --------------------
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// --------------------
// Start Server
// --------------------
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});