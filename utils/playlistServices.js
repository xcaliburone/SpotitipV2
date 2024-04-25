const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });

// function getPlaylistsAndSongs(userId, callback) {
//   const playlistsQuery = `SELECT p.playlist_id, p.name AS playlist_name, p.date_created, COUNT(sp.song_id) AS num_songs
//                          FROM user_playlist_create AS p
//                          LEFT JOIN song_playlist_contains AS sp ON p.playlist_id = sp.playlist_id
//                          WHERE p.user_id = ?
//                          GROUP BY p.playlist_id`;

//   connection.query(playlistsQuery, [userId], function(error, playlistsResults, fields) {
//     if (error) throw error;

//     const playlistsWithSongs = [];

//     playlistsResults.forEach(function(playlist) {
//       const songsQuery = `SELECT s.song_id, s.name AS song_name, s.genre, s.duration, s.listeners
//                           FROM songs AS s
//                           INNER JOIN song_playlist_contains AS sp ON s.song_id = sp.song_id
//                           WHERE sp.playlist_id = ?`;

//       connection.query(songsQuery, [playlist.playlist_id], function(error, songsResults, fields) {
//         if (error) throw error;

//         playlist.songs = songsResults;
//         playlistsWithSongs.push(playlist);

//         if (playlistsWithSongs.length === playlistsResults.length) {
//           callback(playlistsWithSongs);
//         }
//       });
//     });
//   });
// }

function getPlaylistsAndSongs(userId, callback) {
  const playlistsQuery = `SELECT p.playlist_id, p.name AS playlist_name, p.date_created, COUNT(sp.song_id) AS num_songs
                         FROM user_playlist_create AS p
                         LEFT JOIN song_playlist_contains AS sp ON p.playlist_id = sp.playlist_id
                         WHERE p.user_id = ?
                         GROUP BY p.playlist_id`;

  connection.query(playlistsQuery, [userId], function(error, playlistsResults, fields) {
    if (error) {
      callback(error, null);
      return;
    }

    const playlistsWithSongs = [];

    playlistsResults.forEach(function(playlist) {
      const songsQuery = `SELECT s.song_id, s.name AS song_name, s.genre, s.duration, s.listeners
                          FROM songs AS s
                          INNER JOIN song_playlist_contains AS sp ON s.song_id = sp.song_id
                          WHERE sp.playlist_id = ?`;

      connection.query(songsQuery, [playlist.playlist_id], function(error, songsResults, fields) {
        if (error) {
          callback(error, null);
          return;
        }

        playlist.songs = songsResults;
        playlistsWithSongs.push(playlist);

        if (playlistsWithSongs.length === playlistsResults.length) {
          callback(null, playlistsWithSongs);
        }
      });
    });
  });
}

module.exports = { getPlaylistsAndSongs };