const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

router.post("/", upload.array("image", 10), (req, res) => {
    try {
        console.log("files:", req.files);

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const files = req.files.map((file) => ({
            fieldname: file.fieldname,
            originalname: file.originalname,
            filename: file.filename,
            path: file.path,
            size: file.size,
            mimetype: file.mimetype,
            url: `http://localhost:5000/uploads/${file.filename}`
        }));

        return res.status(200).json({
            success: true,
            message: "Files uploaded successfully",
            totalFiles: files.length,
            files
        });
    } catch (error) {
        console.error("Upload error:", error);

        return res.status(500).json({
            success: false,
            message: "Upload failed",
            error: error.message
        });
    }
});

module.exports = router;