const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        const safeName = file.originalname
            .replace(/\s+/g, "-")
            .replace(/[^a-zA-Z0-9.\-_]/g, "");

        cb(null, `${Date.now()}-${safeName}`);
    }
});

const fileFilter = function (req, file, cb) {
    const allowedTypes = /jpg|jpeg|png|webp/;
    const extName = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimeType =
        file.mimetype.startsWith("image/") &&
        allowedTypes.test(file.mimetype.toLowerCase());

    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }
};

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});