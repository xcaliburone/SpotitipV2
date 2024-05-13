const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });

async function getAllDatas(keyword) {
    return new Promise((resolve, reject) => {
        // const sql = `
        // SELECT name, 'user' AS type 
        //     FROM user 
        //     WHERE name LIKE ?
        // UNION SELECT p.name AS name, 'playlist' AS type 
        //     FROM playlist p 
        //     JOIN user_playlist_create upc ON p.id = upc.playlist_id 
        //     JOIN user u ON upc.user_id = u.id 
        //     WHERE p.name LIKE ? AND u.name LIKE ?
        // UNION SELECT a.name AS name, 'album' AS type 
        //     FROM album a 
        //     JOIN album_artist_has aah ON a.id = aah.album_id 
        //     JOIN artist ar ON aah.artist_id = ar.id 
        //     WHERE a.name LIKE ? AND ar.name LIKE ?
        // UNION SELECT s.name AS name, 'song' AS type 
        //     FROM song s 
        //     JOIN song_artist_sing sas ON s.id = sas.song_id 
        //     JOIN artist ar ON sas.artist_id = ar.id 
        //     WHERE s.name LIKE ? AND ar.name LIKE ? 
        // `;
        const sql = `
            SELECT name, 'user' AS type, NULL AS creator_name
                FROM user
                WHERE name LIKE ?
            UNION
            SELECT name, 'artist' AS type, NULL AS creator_name
                FROM artist
                WHERE name LIKE ?
            UNION 
            SELECT p.name AS name, 'playlist' AS type, u.name AS creator_name 
                FROM playlist p 
                JOIN user_playlist_create upc ON p.id = upc.playlist_id 
                JOIN user u ON upc.user_id = u.id 
                WHERE p.name LIKE ?
            UNION 
            SELECT a.name AS name, 'album' AS type, ar.name AS creator_name 
                FROM album a
                JOIN album_artist_has aah ON a.id = aah.album_id
                JOIN artist ar ON aah.artist_id = ar.id
                WHERE a.name LIKE ?
            UNION
            SELECT s.name AS name, 'song' AS type, ar.name AS creator_name 
                FROM song s
                JOIN song_artist_sing sas ON s.id = sas.song_id
                JOIN artist ar ON sas.artist_id = ar.id
                WHERE s.name LIKE ?
        `;
        const searchString = `%${keyword}%`;
        connection.query(sql, [searchString, searchString, searchString, searchString, searchString], (err, results) => {
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
            type: result.type,
            creator_name: result.creator_name
        };
    });
}

module.exports = { getAllDatas, formatResults };