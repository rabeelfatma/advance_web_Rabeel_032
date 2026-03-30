const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { body } = require("express-validator");

router.get("/register", authController.showRegister);

router.post("/register", [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6+ characters")
], authController.registerUser);

router.get("/login", authController.showLogin);

router.post("/login", [
    body("email").isEmail().withMessage("Enter valid email"),
    body("password").notEmpty().withMessage("Password required")
], authController.loginUser);

router.get("/logout", authController.logout);

module.exports = router;