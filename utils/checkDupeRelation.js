const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });

async function checkIfUserAlbumFollow(userId, albumId) {
    const sql = 'SELECT COUNT(*) count FROM user_album_follow WHERE user_id = ? AND album_id = ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, [userId, albumId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0].count > 0);
            }
        });
    });
}

async function checkIfUserArtistFollow(userId, artistId) {
    const sql = 'SELECT COUNT(*) count FROM user_artist_follow WHERE user_id = ? AND artist_id = ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, [userId, artistId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0].count > 0);
            }
        });
    });
}

async function checkIfUserPlaylistFollow(userId, playlistId) {
    const sql = 'SELECT COUNT(*) count FROM user_playlist_follow WHERE user_id = ? AND playlist_id = ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, [userId, playlistId], (err, rows) => {
            if (err) {
                reject(err);
            } else {    
                resolve(rows[0].count > 0);
            }
        });
    });
}

async function checkIfUserLikedSong(userId, songId) {
    const sql = 'SELECT COUNT(*) count FROM user_song_liked WHERE user_id = ? AND song_id = ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, [userId, songId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0].count > 0);
            }
        });
    });
}

module.exports = { checkIfUserAlbumFollow, checkIfUserArtistFollow, checkIfUserPlaylistFollow, checkIfUserLikedSong }