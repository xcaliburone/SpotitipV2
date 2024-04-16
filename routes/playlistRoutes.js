const express = require('express');
const router = express.Router();
const { getAllPlaylists, createPlaylist } = require('../controllers/playlistController');

router.post('/createPlaylist', async (req, res) => {
    const { name, user_id } = req.body;
    try {
        // Periksa apakah nama playlist sudah ada dalam database
        const isDuplicate = await checkDuplicatePlaylist(name);
        if (isDuplicate) {
            // Jika ada duplikat, kirimkan respons dengan parameter error=duplicate
            res.redirect('/createPlaylist?error=duplicate');
            return;
        }
        
        // Jika tidak ada duplikat, tambahkan playlist ke database
        const newPlaylistId = await generatePlaylistID();
        const sql = 'INSERT INTO playlist (id, name) VALUES (?, ?)';
        connection.query(sql, [newPlaylistId, name], async (err, result) => {
            if (err) {
                console.error("Error creating playlist:", err);
                res.redirect('/createPlaylist?error=playlist');
            } else {
                console.log("Playlist create:", newPlaylistId);

                // Tambahkan entri ke tabel user_playlist_create
                const sql2 = 'INSERT INTO user_playlist_create (user_id, playlist_id, date_created) VALUES (?, ?, NOW())';
                connection.query(sql2, [user_id, newPlaylistId], (err, result) => {
                    if (err) {
                        console.error("Error adding playlist to user:", err);
                        // res.redirect('/createPlaylist?error=user_playlist_create');
                    } else {
                        // Redirect to main page after successful creation
                        res.redirect('/main');
                    }
                });
            }
        });
    } catch (error) {
        console.error("Error creating playlist:", error);
        // res.redirect('/createPlaylist'); // Redirect to createPlaylist page if any error occursy
    }
});

router.get('/playlists', async (req, res) => {
    try {
        const playlists = await getAllPlaylists(); // Fungsi ini perlu Anda buat untuk mengambil semua playlist dari database
        res.json({ playlists });
    } catch (error) {
        console.error("Error fetching playlists:", error);
        res.status(500).json({ error: "Internal server error" });
    }

    const { error } = req.query;
    let errorMessage = "";
    if (error === "duplicate") {
        errorMessage = "Playlist name already exists, please choose another name.";
    } else if (error === "playlist") {
        errorMessage = "Failed to create playlist. Please try again.";
    }
    res.render('createPlaylist', { errorMessage });
});