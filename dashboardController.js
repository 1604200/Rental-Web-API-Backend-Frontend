const db = require("../config/db");

exports.getDashboardStats = (req, res) => {

    const stats = {};

    db.query(
        "SELECT COUNT(*) AS totalDress FROM dresses",
        (err, dressResult) => {

            if (err) {
                return res.status(500).json(err);
            }

            stats.totalDress =
                dressResult[0].totalDress;

            db.query(
                "SELECT COUNT(*) AS totalCustomer FROM customers",
                (err, customerResult) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    stats.totalCustomer =
                        customerResult[0].totalCustomer;

                    db.query(
                        "SELECT COUNT(*) AS activeRental FROM rentals WHERE status='Rented'",
                        (err, rentalResult) => {

                            if (err) {
                                return res.status(500).json(err);
                            }

                            stats.activeRental =
                                rentalResult[0].activeRental;

                            db.query(
                                "SELECT COUNT(*) AS returnedRental FROM rentals WHERE status='Returned'",
                                (err, returnedResult) => {

                                    if (err) {
                                        return res.status(500).json(err);
                                    }

                                    stats.returnedRental =
                                        returnedResult[0].returnedRental;

                                    db.query(
                                        `
                                        SELECT
                                            IFNULL(
                                                SUM(total_price),
                                                0
                                            ) AS revenue
                                        FROM rentals
                                        `,
                                        (err, revenueResult) => {

                                            if (err) {
                                                return res.status(500).json(err);
                                            }

                                            stats.revenue =
                                                revenueResult[0].revenue;

                                            db.query(
                                                `
                                                SELECT
                                                    dresses.name,
                                                    COUNT(*) AS total_rented
                                                FROM rentals
                                                JOIN dresses
                                                    ON rentals.dress_id = dresses.id
                                                GROUP BY dresses.id
                                                ORDER BY total_rented DESC
                                                LIMIT 1
                                                `,
                                                (err, topDressResult) => {

                                                    if (err) {
                                                        return res.status(500).json(err);
                                                    }

                                                    stats.topDress =
                                                        topDressResult[0] || null;

                                                    res.json(stats);

                                                }
                                            );

                                        }
                                    );

                                }
                            );

                        }
                    );

                }
            );

        }
    );

};

exports.getRentalChart = (req, res) => {

    const sql = `
        SELECT
            MONTH(rent_date) AS month,
            COUNT(*) AS total
        FROM rentals
        GROUP BY MONTH(rent_date)
        ORDER BY MONTH(rent_date)
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};