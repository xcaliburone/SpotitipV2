const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });

async function countSongsInPlaylist(playlistId) {
    const query = `SELECT COUNT(*) count FROM song_playlist_contains WHERE playlist_id = ?;`;
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(query, [playlistId], (error, results) => {
                if (error) { reject(error);
                } else { resolve(results); }
            });
        });
        const numSongsPlaylist = result[0].count;
        return numSongsPlaylist;
    } catch (error) {
        console.error('Error counting songs in playlist:', error);
        throw error;
    }
}

async function updateNumSongsInPlaylist(playlistId, numSongsPlaylist) {
    const query = `UPDATE playlist SET num_song = ? WHERE id = ?;`;
    try {
        await connection.query(query, [numSongsPlaylist, playlistId]);
    } catch (error) {
        console.error('Error updating num_song in playlist:', error);
        throw error;
    }
}

async function countSongsInAlbum(albumId) {
    const query = 'SELECT COUNT(*) count FROM song_album_contains WHERE album_id = ?';
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(query, [albumId], (error, results) => {
                if (error) { reject(error); }
                else { resolve(results); }
            });
        });
        const numSongsAlbum = result[0].count;
        return numSongsAlbum;
    } catch (error) {
        console.error('Error counting songs in album:', error);
        throw error;
    }
}

async function updateNumSongsInAlbum(albumId, numSongsAlbum) {
    const query = 'UPDATE album SET num_song = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [numSongsAlbum, albumId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

module.exports = { countSongsInPlaylist, updateNumSongsInPlaylist, countSongsInAlbum, updateNumSongsInAlbum }