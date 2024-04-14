// /app/models/user.js

const connection = require('../config/db');

// Fungsi untuk memeriksa apakah username sudah ada dalam tabel
exports.checkIfUsernameExists = (username) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT COUNT(*) AS count FROM user WHERE name = ?";
        connection.query(sql, [username], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0].count > 0);
            }
        });
    });
};

// Fungsi untuk memeriksa apakah email sudah ada dalam tabel
exports.checkIfEmailExists = (email) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT COUNT(*) AS count FROM user WHERE email = ?";
        connection.query(sql, [email], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0].count > 0);
            }
        });
    });
};