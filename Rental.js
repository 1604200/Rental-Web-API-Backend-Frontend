const db = require("../config/db");

const Rental = {

    getAll(callback) {

        const sql = `
        SELECT
            rentals.id,
            customers.fullname,
            dresses.name AS dress_name,
            rentals.dress_id,
            rentals.rent_date,
            rentals.return_date,
            rentals.total_price,
            rentals.status
        FROM rentals
        JOIN customers
            ON rentals.customer_id = customers.id
        JOIN dresses
            ON rentals.dress_id = dresses.id
        ORDER BY rentals.id DESC
        `;

        db.query(sql, callback);
    },

    create(data, callback) {

        const rentalSql =
            "INSERT INTO rentals SET ?";

        db.query(
            rentalSql,
            data,
            (err, result) => {

                if (err) {
                    return callback(err);
                }

                db.query(
                    "UPDATE dresses SET stock = stock - 1 WHERE id=?",
                    [data.dress_id],
                    callback
                );

            }
        );

    },

    returnRental(rentalId, callback) {

        db.query(
            "SELECT dress_id FROM rentals WHERE id=?",
            [rentalId],
            (err, result) => {

                if (err) {
                    return callback(err);
                }

                if (result.length === 0) {
                    return callback({
                        message: "Rental not found"
                    });
                }

                const dressId = result[0].dress_id;

                db.query(
                    "UPDATE rentals SET status='Returned' WHERE id=?",
                    [rentalId],
                    (err) => {

                        if (err) {
                            return callback(err);
                        }

                        db.query(
                            "UPDATE dresses SET stock = stock + 1 WHERE id=?",
                            [dressId],
                            callback
                        );

                    }
                );

            }
        );

    }

};

module.exports = Rental;