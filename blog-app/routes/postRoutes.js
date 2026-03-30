const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const auth = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const { body } = require("express-validator");

// Dashboard - list posts for logged-in user
router.get("/dashboard", auth, postController.getDashboard);

// Create Post - form
router.get("/create", auth, postController.showCreatePost);

// Create Post - submit
router.post("/create", auth, uploadMiddleware, [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required")
], postController.createPost);

// Edit Post - form
router.get("/edit/:id", auth, postController.showEditPost);

// Update Post - submit
router.post("/edit/:id", auth, uploadMiddleware, [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required")
], postController.updatePost);

// Delete Post
router.post("/delete/:id", auth, postController.deletePost);

module.exports = router;