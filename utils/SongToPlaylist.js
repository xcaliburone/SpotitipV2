const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });

// Fungsi untuk mencari ID playlist berdasarkan nama playlist
async function findPlaylistId(playlistName) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id FROM playlist WHERE name = ?";
        connection.query(sql, [playlistName], (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results.length > 0) {
                    resolve(results[0].id);
                } else {
                    resolve(null); // Jika playlist tidak ditemukan, kembalikan null
                }
            }
        });
    });
}

// Fungsi untuk mencari ID lagu berdasarkan nama lagu
async function findSongId(songName) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id FROM song WHERE name = ?";
        connection.query(sql, [songName], (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results.length > 0) {
                    resolve(results[0].id);
                } else {
                    resolve(null); // Jika lagu tidak ditemukan, kembalikan null
                }
            }
        });
    });
}

// Fungsi untuk menambahkan lagu ke dalam playlist
async function addSongToPlaylist(playlistId, songId) {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO song_playlist_contains (playlist_id, song_id) VALUES (?, ?)";
        connection.query(sql, [playlistId, songId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = { findPlaylistId, findSongId, addSongToPlaylist }