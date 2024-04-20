const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });

async function getAllMyUsers() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT name, email, password, followers, following FROM user';
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function getAllMyUserArtistFollow() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT name, email, password, followers, following FROM user';
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function getAllMyUserAlbumFollow() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT name, email, password, followers, following FROM user';
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function getAllMyUserCreatePlaylist(userId) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT p.name
            FROM user_playlist_create upc
            JOIN playlist p ON upc.playlist_id = p.id
            WHERE upc.user_id = ?
        `;
        connection.query(sql, [userId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = { getAllMyUsers, getAllMyUserArtistFollow, getAllMyUserAlbumFollow, getAllMyUserCreatePlaylist }