const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });

function generateNewID(table, type) {              
    return new Promise((resolve, reject) => {
        const prefix = type === "user" ? "US" : "AR";
        const sql = `SELECT MAX(id) AS maxId FROM ${table} WHERE id LIKE '${prefix}%'`;
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                let maxId = result[0].maxId;
                if (!maxId) {
                    maxId = prefix + '01';
                } else {
                    const prefixLength = prefix.length;
                    const numericPart = parseInt(maxId.slice(prefixLength), 10) + 1;
                    maxId = prefix + (numericPart < 10 ? '0' : '') + numericPart;
                }
                resolve(maxId);
            }
        });
    });
}

function generatePlaylistID() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT MAX(id) AS maxId FROM playlist";
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                let maxId = result[0].maxId;
                if (!maxId) {
                    maxId = 'PL01'; // Mulai dari PL01 jika tidak ada ID sebelumnya
                } else {
                    const numericPart = parseInt(maxId.slice(2), 10) + 1;
                    maxId = 'PL' + (numericPart < 10 ? '0' : '') + numericPart;
                }
                resolve(maxId);
            }
        });
    });
}

function generateAlbumID() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT MAX(id) AS maxId FROM album";
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                let maxId = result[0].maxId;
                if (!maxId) {
                    maxId = 'AL01'; // Mulai dari PL01 jika tidak ada ID sebelumnya
                } else {
                    const numericPart = parseInt(maxId.slice(2), 10) + 1;
                    maxId = 'AL' + (numericPart < 10 ? '0' : '') + numericPart;
                }
                resolve(maxId);
            }
        });
    });
}

function generateSongID() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT MAX(id) AS maxId FROM song";
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                let maxId = result[0].maxId;
                if (!maxId) {
                    maxId = 'SO01'; // Mulai dari PL01 jika tidak ada ID sebelumnya
                } else {
                    const numericPart = parseInt(maxId.slice(2), 10) + 1;
                    maxId = 'SO' + (numericPart < 10 ? '0' : '') + numericPart;
                }
                resolve(maxId);
            }
        });
    });
}

module.exports = { generateNewID, generatePlaylistID, generateAlbumID, generateSongID }