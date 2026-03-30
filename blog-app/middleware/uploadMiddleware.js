const path = require("path");

module.exports = function(req, res, next) {

    if (!req.files || !req.files.image) {
        return next();
    }

    const file = req.files.image;

    const allowedTypes = /jpeg|jpg|png|gif/;
    const extName = allowedTypes.test(path.extname(file.name).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (!extName || !mimeType) {
        return res.status(400).send("Only images allowed (jpeg, jpg, png, gif)");
    }

    if (file.size > 2 * 1024 * 1024) {
        return res.status(400).send("Image must be less than 2MB");
    }

    const imageName = Date.now() + "-" + file.name;

    file.mv("./public/uploads/" + imageName, (err) => {
        if (err) {
            return res.status(500).send("Image upload failed");
        }

        req.body.image = imageName;
        next();
    });
};