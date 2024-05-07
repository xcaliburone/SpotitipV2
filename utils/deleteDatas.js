const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });

async function deleteMyUser(userId) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM user WHERE id= ?';
        connection.query(sql, [userId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function deleteMyArtist(artistId) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM artist WHERE id= ?';
        connection.query(sql, [artistId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = { deleteMyUser, deleteMyArtist }