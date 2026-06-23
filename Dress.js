const db = require("../config/db");

const Dress = {
    getAll: (callback) => {
        const query = `
            SELECT id, name, price, size, stock, image
            FROM dresses
            ORDER BY id DESC
        `;

        db.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            }

            const formattedResult = result.map((dress) => ({
                ...dress,
                image: dress.image
                    ? dress.image.startsWith("http://") || dress.image.startsWith("https://")
                        ? dress.image
                        : dress.image.startsWith("/uploads/")
                            ? dress.image
                            : `/uploads/${dress.image}`
                    : ""
            }));

            callback(null, formattedResult);
        });
    },

    getById: (id, callback) => {
        const query = `
            SELECT id, name, price, size, stock, image
            FROM dresses
            WHERE id = ?
        `;

        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }

            const formattedResult = result.map((dress) => ({
                ...dress,
                image: dress.image
                    ? dress.image.startsWith("http://") || dress.image.startsWith("https://")
                        ? dress.image
                        : dress.image.startsWith("/uploads/")
                            ? dress.image
                            : `/uploads/${dress.image}`
                    : ""
            }));

            callback(null, formattedResult);
        });
    },

    create: (data, callback) => {
        const query = `
            INSERT INTO dresses (name, price, size, stock, image)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            query,
            [
                data.name,
                data.price,
                data.size,
                data.stock,
                data.image || ""
            ],
            (err, result) => {
                if (err) {
                    return callback(err, null);
                }

                callback(null, result);
            }
        );
    },

    update: (id, data, callback) => {
        const query = `
            UPDATE dresses
            SET name = ?, price = ?, size = ?, stock = ?, image = ?
            WHERE id = ?
        `;

        db.query(
            query,
            [
                data.name,
                data.price,
                data.size,
                data.stock,
                data.image || "",
                id
            ],
            (err, result) => {
                if (err) {
                    return callback(err, null);
                }

                callback(null, result);
            }
        );
    },

    delete: (id, callback) => {
        const query = `DELETE FROM dresses WHERE id = ?`;

        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }

            callback(null, result);
        });
    }
};

module.exports = Dress;