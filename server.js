require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// Database
require("./config/db");

// Routes
const dressRoutes = require("./routes/dressRoutes");
const customerRoutes = require("./routes/customerRoutes");
const rentalRoutes = require("./routes/rentalRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

// Static folder for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        app: "Lavender Palace Rental API",
        version: "1.0.0",
        status: "Running"
    });
});

// API Routes
app.use("/api/dresses", dressRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/upload", uploadRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error("Server error:", err);

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});