const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });

async function getAllPlaylists2(userId) {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT p.id, p.name, 
        COUNT(spc.song_id) num_song, p.duration, upc.date_created
        FROM playlist p 
        JOIN user_playlist_create upc ON p.id = upc.playlist_id
        LEFT JOIN song_playlist_contains spc ON p.id = spc.playlist_id
        WHERE upc.user_id = ?
        GROUP BY p.id, p.name, p.duration, upc.date_created; 
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

async function getSongsForPlaylist(playlistId) {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT s.id, s.name title, s.genre, s.duration, s.listeners, a.name artist
        FROM song s
        JOIN song_playlist_contains spc ON s.id = spc.song_id
        JOIN song_artist_sing sas ON s.id = sas.song_id
        JOIN artist a ON sas.artist_id = a.id
        WHERE spc.playlist_id = ?;    
        `;
        connection.query(sql, [playlistId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// async function getAllAlbums2(artistId) {
//     return new Promise((resolve, reject) => {
//         const sql = `
//             SELECT a.id, a.name, a.num_song, a.duration, aah.date_created
//             FROM album a JOIN album_artist_has aah ON a.id = aah.album_id
//             WHERE aah.artist_id = ?
//         `;
//         connection.query(sql, [artistId], (err, results) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// }

async function getAllAlbums2(artistId) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT a.id, a.name, 
            COUNT(sac.song_id) num_song, a.duration, aah.date_created
            FROM album a 
            JOIN album_artist_has aah ON a.id = aah.album_id
            JOIN song_album_contains sac ON a.id = sac.album_id
            WHERE aah.artist_id = ?
            -- GROUP BY a.id, a.name, a.duration, aah.date_created;
            GROUP BY 1, 2, 4, 5;
        `;
        connection.query(sql, [artistId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// async function getSongsForAlbum(albumId) {
//     return new Promise((resolve, reject) => {
//         const sql = `
//             SELECT s.id, s.name title, s.genre, s.duration, s.listeners
//             FROM song s JOIN song_album_contains sac ON s.id = sac.song_id
//             WHERE sac.album_id = ?
//         `;
//         connection.query(sql, [albumId], (err, results) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// }

async function getSongsForAlbum(albumId, artistId) {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT s.id, s.name title, s.genre, s.duration, s.listeners, a.name artist
        FROM song s
        JOIN song_artist_sing sas ON s.id = sas.song_id
        JOIN artist a ON sas.artist_id = a.id
        JOIN song_album_contains sac ON s.id = sac.song_id
        WHERE sac.album_id = ? AND sas.artist_id = ?;  
        `;
        connection.query(sql, [albumId, artistId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}


module.exports = { getAllPlaylists2, getSongsForPlaylist, getAllAlbums2, getSongsForAlbum };