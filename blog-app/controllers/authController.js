const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

// Show Register
exports.showRegister = (req, res) => {
    if (req.session.userId) {
        return res.redirect("/posts/dashboard");
    }
    res.render("auth/register", { errors: [], oldInput: {} });
};

// Show Login
exports.showLogin = (req, res) => {
    if (req.session.userId) {
        return res.redirect("/posts/dashboard");
    }
    res.render("auth/login", { errors: [], oldInput: {} });
};

// Register
exports.registerUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("auth/register", {
            errors: errors.array(),
            oldInput: req.body
        });
    }

    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render("auth/register", {
                errors: [{ msg: "Email already exists" }],
                oldInput: req.body
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hash
        });

        await user.save();
        res.redirect("/login");

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

// Login
exports.loginUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("auth/login", {
            errors: errors.array(),
            oldInput: req.body
        });
    }

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.render("auth/login", {
                errors: [{ msg: "User not found" }],
                oldInput: req.body
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.render("auth/login", {
                errors: [{ msg: "Wrong Password" }],
                oldInput: req.body
            });
        }

        req.session.userId = user._id;
        res.redirect("/posts/dashboard");

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

// Logout
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};