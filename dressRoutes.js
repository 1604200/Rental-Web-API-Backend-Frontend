const express = require("express");

const router = express.Router();

const dressController =
require("../controllers/dressController");

router.get(
    "/",
    dressController.getAllDress
);

router.get(
    "/:id",
    dressController.getDressById
);

router.post(
    "/",
    dressController.createDress
);

router.put(
    "/:id",
    dressController.updateDress
);

router.delete(
    "/:id",
    dressController.deleteDress
);

module.exports = router;