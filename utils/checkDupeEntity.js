const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });

function checkCredentials(table, email, password) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id FROM ${table} WHERE email = ? AND password = ?`;
        connection.query(sql, [email, password], (err, results) => {
            if (err) { reject(err);
            } else {
                if (results.length > 0) { resolve(results[0]); } else { resolve(null); }
            }
        });
    });
}

function checkIfEmailExists(email) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT COUNT(*) AS count FROM user WHERE email = ?";
        connection.query(sql, [email], (err, result) => { if (err) { reject(err); } else { resolve(result[0].count > 0); } });
    });
}

function checkIfUsernameExists(username) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT COUNT(*) AS count FROM user WHERE name = ?";
        connection.query(sql, [username], (err, result) => { if (err) { reject(err); } else { resolve(result[0].count > 0); } });
    });
}

async function checkDuplicatePlaylist(name) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COUNT(*) AS count FROM playlist WHERE name = ?';
        connection.query(sql, [name], (err, result) => {
            if (err) { reject(err);
            } else { resolve(result[0].count > 0); }
        });
    });
}

async function checkDuplicateAlbum(name) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COUNT(*) AS count FROM album WHERE name = ?';
        connection.query(sql, [name], (err, result) => {
            if (err) { reject(err);
            } else { resolve(result[0].count > 0); }
        });
    });
}

async function checkDuplicateSong(name) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COUNT(*) AS count FROM song WHERE name = ?';
        connection.query(sql, [name], (err, result) => {
            if (err) { reject(err);
            } else { resolve(result[0].count > 0); }
        });
    });
}

module.exports = { checkCredentials, checkIfEmailExists, checkIfUsernameExists, checkDuplicatePlaylist, checkDuplicateAlbum, checkDuplicateSong }