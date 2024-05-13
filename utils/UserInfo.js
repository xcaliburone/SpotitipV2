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
            SELECT a.name, ar.name artistName
            FROM user_album_follow uaf
            JOIN album a ON uaf.album_id = a.id
            JOIN album_artist_has aah ON a.id = aah.album_id
            JOIN artist ar ON aah.artist_id = ar.id
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
            SELECT p.name, us.name creator_name 
            FROM user_playlist_create upc
            JOIN playlist p ON upc.playlist_id = p.id
            JOIN user us ON upc.user_id = us.id
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
            SELECT p.name, u.name creator_name
            FROM user_playlist_follow upf
            JOIN  user_playlist_create upc ON upf.playlist_id = upc.playlist_id
            JOIN playlist p ON upf.playlist_id = p.id
            JOIN user u ON upc.user_id = u.id
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
            SELECT s.name, ar.name artistName
            FROM user_song_liked usl
            JOIN song s ON usl.song_id = s.id
            JOIN song_artist_sing sas ON s.id = sas.song_id
            JOIN artist ar ON sas.artist_id = ar.id
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