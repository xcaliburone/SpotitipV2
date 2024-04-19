app.get('/playlist/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `SELECT playlist.id, playlist.name 
                   FROM playlist 
                   INNER JOIN user_playlist_create ON playlist.id = user_playlist_create.playlist_id 
                   WHERE user_playlist_create.user_id = ?`;
  
    connection.query(query, [userId], (err, results) => {
      if (err) throw err;
      res.render('playlist', { playlists: results });
    });
});

app.get('/playlists', async (req, res) => {
    try {
        const playlists = await getAllPlaylists(); // Fungsi untuk mengambil semua playlist dari database
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

app.post('/createPlaylist', async (req, res) => {
    const { name, user_id } = req.body;
    try {
        const isDuplicate = await checkDuplicatePlaylist(name); // Periksa apakah nama playlist sudah ada dalam database
        if (isDuplicate) {  // Jika ada duplikat, kirimkan respons dengan parameter error=duplicate
            res.redirect('/createPlaylist?error=duplicate');
            return;
        }   // Jika tidak ada duplikat, tambahkan playlist ke database
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
                        res.redirect('/main');
                    }
                });
            }
        });
    } catch (error) {
        console.error("Error creating playlist:", error);
        res.redirect('/createPlaylist');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userResult = await checkCredentials('user', email, password);
        if (userResult) {
            req.session.user_id = userResult.id; // Atur userId ke dalam sesi
            res.redirect(`/main-user/${userResult.id}`);
            return;
        }

        const artistResult = await checkCredentials('artist', email, password);
        if (artistResult) {
            req.session.artist_id = artistResult.id; // Atur artistId ke dalam sesi
            res.redirect(`/main-artist/${artistResult.id}`);
            return;
        }

        // Jika tidak ada hasil dalam kedua tabel, kirimkan pesan kesalahan
        res.redirect('/login?error=account-not-found');
    } catch (error) {
        console.error("Error during login:", error);
        res.render('index', { errorMessage });
    }
});

app.post('/createPlaylist', async (req, res) => {
    const { name } = req.body;
    let userId;

    // Cek apakah pengguna sedang masuk atau artis
    if (req.session.user_id) {
        userId = req.session.user_id; // Jika pengguna masuk, ambil user_id dari sesi
    } else if (req.session.artist_id) {
        userId = req.session.artist_id; // Jika artis masuk, ambil artist_id dari sesi
    } else {
        console.error("User ID is undefined");
        return res.status(400).send("User ID is missing");
    }

    try {
        const isDuplicate = await checkDuplicatePlaylist(name); // Periksa apakah judul playlist sudah ada

        if (isDuplicate) {
            res.redirect('/createPlaylist?error=duplicate');
            return;
        }

        // Generate ID untuk playlist
        const playlistId = await generatePlaylistID();

        // Simpan data playlist baru ke dalam tabel playlist
        const insertPlaylistQuery = 'INSERT INTO playlist (id, name) VALUES (?, ?)';
        connection.query(insertPlaylistQuery, [playlistId, name], async (err, result) => {
            if (err) {
                console.error("Error creating playlist:", err);
                res.redirect('/createPlaylist?error=playlist');
                return;
            }

            // Simpan entri baru dalam tabel user_playlist_create
            const dateCreated = new Date().toISOString().slice(0, 10);
            const insertUserPlaylistQuery = 'INSERT INTO user_playlist_create (user_id, playlist_id, date_created) VALUES (?, ?, ?)';
            connection.query(insertUserPlaylistQuery, [userId, playlistId, dateCreated], (err, result) => {
                if (err) {
                    console.error("Error creating user playlist entry:", err);
                    return res.status(500).send("Failed to create playlist.");
                }
                return res.status(200).send("Playlist created successfully.");
            });
        });
    } catch (error) {
        console.error("Error creating playlist:", error);
        return res.status(500).send("Failed to create playlist.");
    }
});

async function addPlaylistToUI() {
    const playlistContainer = document.querySelector(".list-items");
    
    try {
        const response = await fetch("/userPlaylists");
        if (!response.ok) {
            throw new Error("Failed to retrieve user playlists");
        }
        const playlists = await response.json();

        playlists.forEach(playlist => {
            const playlistItem = document.createElement("div");
            playlistItem.classList.add("item-playlist", "bg-neutral-800", "w-full", "h-[55px]", "list-none", "rounded-md", "overflow-hidden", "flex", "items-center", "hover:opacity-60", "transition", "hover:cursor-pointer");
            playlistItem.innerHTML = `
                <img src="../images/liked.png" alt="liked songs" class="w-[55px]">
                <p class="text-neutral-300 ml-3 font-medium">${playlist.name}</p>
            `;
            playlistContainer.appendChild(playlistItem);
        });
    } catch (error) {
        console.error("Error adding playlists to UI:", error);
    }
}

app.post('/createAlbum', async (req, res) => {
    const { artistId, name } = req.body;

    console.log("Arist ID yahaha:", artistId);
    if (artistId) { console.log("user id untuk playlist adalah:", artistId);
    } else { console.log("user id untuk playlist tidak ada:", artistId); }

    try {
        const isDuplicate = await checkDuplicateAlbum(name); // Periksa apakah nama album sudah ada

        if (isDuplicate) {
            return res.redirect('/createAlbum?error=duplicate');
        }
        
        const albumId = await generateAlbumID(); // Generate ID untuk album

        const insertAlbumQuery = 'INSERT INTO album (id, name) VALUES (?, ?)'; // Tambahkan artist_id
        connection.query(insertAlbumQuery, [albumId, name], async (err, result) => {
            if (err) {
                console.error("Error creating album:", err);
                res.redirect('/createAlbum?error=album');
                return res.status(500).send("Failed to create album: " + err.message);
            }

            const currentArtistId = req.session.artist_id;

            const dateCreated = new Date().toISOString().slice(0, 10);
            const insertArtistAlbumQuery = 'INSERT INTO artist_album_create (artist_id, album_id, date_created) VALUES (?, ?, ?)';
            connection.query(insertArtistAlbumQuery, [currentArtistId, albumId, dateCreated], (err, result) => {
                if (err) {
                    console.error("Error creating artist album entry:", err);
                    return res.status(500).send("Failed to create album.");
                }
                return res.status(200).send("Album created successfully.");
            });
        });
    } catch (error) {
        console.error("Error creating album:", error);
        return res.status(500).send("Failed to create album.");
    }
});

