const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });

async function getAllMyArtists(artistId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT name, email, password, followers FROM artist WHERE id = ?';
        connection.query(sql, [artistId], (err, results) => {
            if (err) { reject(err);
            } else { resolve(results); }
        });
    });
}

module.exports = { getAllMyArtists }