const express = require("express");

const router = express.Router();

const rentalController =
require("../controllers/rentalController");

router.get(
    "/",
    rentalController.getAllRental
);

router.post(
    "/",
    rentalController.createRental
);

router.put(
    "/:id/return",
    rentalController.returnRental
);

module.exports = router;