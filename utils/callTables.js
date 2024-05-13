const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });

async function getAllPlaylists() {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT p.id, p.name, u.name creator_name
            FROM playlist p
            JOIN user_playlist_create upc ON p.id = upc.playlist_id
            JOIN user u ON u.id = upc.user_id
        `;
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function getAllAlbums() {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT a.id, a.name, artist.name artistName
            FROM album_artist_has aa
            JOIN album a ON aa.album_id = a.id
            JOIN artist ON aa.artist_id = artist.id
        `;
        connection.query(sql, (err, results) => {
            if (err) { reject(err);
            } else { resolve(results); }
        });
    });
}

async function getAllArtists() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, name FROM artist ORDER BY followers DESC;';
        // const sql = 'SELECT id, name FROM artist';
        connection.query(sql, (err, results) => {
            if (err) { reject(err);
            } else { resolve(results); }
        });
    });
}

async function getAllSongs() {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT s.id, s.name, artist.name artistName
            FROM song_artist_sing sa
            JOIN song s ON sa.song_id = s.id
            JOIN artist ON sa.artist_id = artist.id
            LIMIT 0, 50;
        `;
        connection.query(sql, (err, results) => {
            if (err) { reject(err);
            } else { resolve(results); }
        });
    });
}

async function getAllUsers() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, name FROM user ORDER BY followers DESC, following DESC';
        connection.query(sql, (err, results) => {
            if (err) { reject(err);
            } else { resolve(results); }
        });
    });
}

module.exports = { getAllPlaylists, getAllAlbums, getAllArtists, getAllSongs, getAllUsers }