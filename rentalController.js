const Rental = require("../models/Rental");

exports.getAllRental = (req, res) => {

    Rental.getAll((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

exports.createRental = (req, res) => {

    Rental.create(
        req.body,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Rental created successfully"
            });

        }
    );

};

exports.returnRental = (req, res) => {

    Rental.returnRental(
        req.params.id,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Dress returned successfully"
            });

        }
    );

};