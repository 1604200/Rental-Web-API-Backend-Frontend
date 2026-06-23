const db = require("../config/db");

const Customer = {

    getAll(callback) {
        db.query(
            "SELECT * FROM customers",
            callback
        );
    },

    getById(id, callback) {
        db.query(
            "SELECT * FROM customers WHERE id=?",
            [id],
            callback
        );
    },

    create(data, callback) {
        db.query(
            "INSERT INTO customers SET ?",
            data,
            callback
        );
    },

    update(id, data, callback) {
        db.query(
            "UPDATE customers SET ? WHERE id=?",
            [data, id],
            callback
        );
    },

    delete(id, callback) {
        db.query(
            "DELETE FROM customers WHERE id=?",
            [id],
            callback
        );
    }

};

module.exports = Customer;