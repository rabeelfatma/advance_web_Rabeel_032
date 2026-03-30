const Post = require("../models/Post");
const { validationResult } = require("express-validator");

// Show Create Post Page
exports.showCreatePost = (req, res) => {
    res.render("posts/create", { errors: [], oldInput: {} });
};

// Create Post
exports.createPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("posts/create", { errors: errors.array(), oldInput: req.body });
    }

    try {
        const { title, content } = req.body;
        let imageName = "";

        if (req.files && req.files.image) {
            const image = req.files.image;
            imageName = Date.now() + "-" + image.name;
            image.mv("./public/uploads/" + imageName);
        }

        const post = new Post({
            title,
            content,
            image: imageName,
            user: req.session.userId
        });

        await post.save();
        res.redirect("/posts/dashboard");

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

// Dashboard / List Posts
exports.getDashboard = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.session.userId }).populate("user");
        res.render("posts/dashboard", { posts });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

// Show Edit Post Page
exports.showEditPost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render("posts/edit", { post, errors: [], oldInput: post });
};

// Update Post
exports.updatePost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const post = await Post.findById(req.params.id);
        return res.render("posts/edit", { post, errors: errors.array(), oldInput: req.body });
    }

    try {
        const { title, content } = req.body;
        const post = await Post.findById(req.params.id);

        post.title = title;
        post.content = content;

        if (req.files && req.files.image) {
            const image = req.files.image;
            const imageName = Date.now() + "-" + image.name;
            image.mv("./public/uploads/" + imageName);
            post.image = imageName;
        }

        await post.save();
        res.redirect("/posts/dashboard");

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

// Delete Post
exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect("/posts/dashboard");
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};