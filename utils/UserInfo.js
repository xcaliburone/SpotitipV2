const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });

async function getAllMyUsers(userId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT name, email, password, followers, following FROM user WHERE id = ?';
        connection.query(sql, [userId], (err, results) => {
            if (err) { reject(err);
            } else { resolve(results);
            }
        });
    });
}

async function getAllMyUserArtistFollow(userId) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT a.name FROM user_artist_follow uaf
            JOIN artist a ON uaf.artist_id = a.id
            WHERE uaf.user_id = ?
        `;
        connection.query(sql, [userId], (err, results) => {
            if (err) { reject(err);
            } else { resolve(results); }
        });
    });
}

async function getAllMyUserAlbumFollow(userId) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT a.name FROM user_album_follow uaf
            JOIN album a ON uaf.album_id = a.id
            WHERE uaf.user_id = ?
        `;
        connection.query(sql, [userId], (err, results) => {
            if (err) { reject(err);
            } else { resolve(results); }
        });
    });
}

async function getAllMyUserCreatePlaylist(userId) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT p.name FROM user_playlist_create upc
            JOIN playlist p ON upc.playlist_id = p.id
            WHERE upc.user_id = ?
        `;
        connection.query(sql, [userId], (err, results) => {
            if (err) { reject(err);
            } else { resolve(results); }
        });
    });
}

async function getAllMyUserFollowPlaylist(userId) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT p.name FROM user_playlist_follow upf
            JOIN playlist p ON upf.playlist_id = p.id
            WHERE upf.user_id = ?
        `;
        connection.query(sql, [userId], (err, results) => {
            if (err) { reject(err);
            } else { resolve(results); }
        });
    });
}

async function getAllMyUserLikedSong(userId) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT s.name FROM user_song_liked usl
            JOIN song s ON usl.song_id = s.id
            WHERE usl.user_id = ?
        `;
        connection.query(sql, [userId], (err, results) => {
            if (err) { reject(err);
            } else { resolve(results); }
        });
    });
}

module.exports = {
    getAllMyUsers,
    getAllMyUserArtistFollow, 
    getAllMyUserAlbumFollow, 
    getAllMyUserCreatePlaylist, 
    getAllMyUserFollowPlaylist, 
    getAllMyUserLikedSong
}