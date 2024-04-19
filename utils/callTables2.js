// const mysql = require('mysql');
// const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });

// async function getAllMySongs() {
//     return new Promise((resolve, reject) => {
//         const sql = `
//             SELECT artist.name AS artist_name, song.title AS song_title
//             FROM song_artist_sing
//             INNER JOIN artist ON song_artist_sing.artist_id = artist.id
//             INNER JOIN song ON song_artist_sing.song_id = song.id;
//         `;
//         connection.query(sql, (err, results) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// }

// async function getAllMyAlbums() {
//     return new Promise((resolve, reject) => {
//         //const sql = ``;
//         connection.query(sql, (err, results) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// }
// // SELECT a.id, a.title, a.num_song, a.duration FROM album_artist_has aa JOIN album a ON aa.album_id = a.id WHERE aa.artist_id = ?;

// //              SELECT p.id, p.name, p.num_song, p.duration FROM user_playlist_create upc 
// //             JOIN playlist p ON upc.playlist_id = p.id WHERE upc.user_id = ?

// module.exports = { getAllMySongs, getAllMyAlbums }