const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });

async function getAllDatas(keyword) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT name, 'user' AS type FROM user WHERE name LIKE ?
            UNION SELECT name, 'artist' AS type FROM artist WHERE name LIKE ?
            UNION SELECT name, 'playlist' AS type FROM playlist WHERE name LIKE ?
            UNION SELECT name, 'album' AS type FROM album WHERE name LIKE ?
            UNION SELECT name, 'song' AS type FROM song WHERE name LIKE ?
        `;
        connection.query(sql, [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function formatResults(results) {
    return results.map(result => {
        return {
            name: result.name,
            type: result.type
        };
    });
}

module.exports = { getAllDatas, formatResults };