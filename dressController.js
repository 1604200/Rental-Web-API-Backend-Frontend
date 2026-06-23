const Dress = require("../models/Dress");

exports.getAllDress = (req, res) => {
    Dress.getAll((err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch dresses",
                error: err
            });
        }

        const dresses = result.map((dress) => ({
            ...dress,
            image: dress.image || ""
        }));

        res.json(dresses);
    });
};

exports.getDressById = (req, res) => {
    Dress.getById(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch dress",
                error: err
            });
        }

        if (!result || result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Dress not found"
            });
        }

        const dress = Array.isArray(result)
            ? { ...result[0], image: result[0].image || "" }
            : { ...result, image: result.image || "" };

        res.json(dress);
    });
};

exports.createDress = (req, res) => {
    Dress.create(req.body, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to create dress",
                error: err
            });
        }

        res.json({
            success: true,
            message: "Dress added successfully"
        });
    });
};

exports.updateDress = (req, res) => {
    Dress.update(req.params.id, req.body, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to update dress",
                error: err
            });
        }

        res.json({
            success: true,
            message: "Dress updated successfully"
        });
    });
};

exports.deleteDress = (req, res) => {
    Dress.delete(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to delete dress",
                error: err
            });
        }

        res.json({
            success: true,
            message: "Dress deleted successfully"
        });
    });
};