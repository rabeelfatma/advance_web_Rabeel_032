const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    image: {
        type: String, // store file name like "image.jpg"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // har post ka owner zaruri hai
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);