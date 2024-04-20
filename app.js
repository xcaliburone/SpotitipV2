const express = require('express');
const app = express();
const port = 3031;
const mysql = require('mysql');
const session = require('express-session');
app.use(express.static(__dirname + '/public'));

const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });
connection.connect((err) => { if (err) throw err; console.log('Connected to MySQL database'); });

app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const { getAllPlaylists, getAllAlbums, getAllArtists, getAllSongs, getAllUsers } = require('./utils/callTables')
const { getAllMyAlbums, getAllMySongs, getAllMyPlaylists } = require('./utils/callTables2')
const { getAllMyUsers, getAllMyUserArtistFollow, getAllMyUserAlbumFollow, getAllMyUserCreatePlaylist } = require('./utils/UserInfo')
const { generateNewID, generatePlaylistID, generateAlbumID, generateSongID } = require('./utils/generateID')
const { checkCredentials, checkIfEmailExists, checkIfUsernameExists, checkDuplicatePlaylist, checkDuplicateAlbum, checkDuplicateSong } = require('./utils/checkCredentials')

app.get('/', (req, res) => { res.render('index'); });

app.get('/main-user/:userId', (req, res) => {
    const userId = req.params.userId;
    console.log("User ID main :", userId);

    if (!userId) {
        console.error("User ID is undefined");
        return res.status(400).send("User ID is missing");
    }

    try {
        res.render('mainUser', {        
            userId: userId,
            modalName: 'Playlist',
            modalForm: 'createPlaylistForm',
            foridnameTitleModal: 'playlistName',
            modalPlaceholderTitle: 'Playlist title',
            foridnameDescModal: 'playlistDescription',
            modalPlaceholderDesc: 'Playlist description',
            classModalButton: 'addPlaylist',
            modalButton: 'Add Playlist',
            artistHide: '',
            userHide: 'hidden',
            artistButtonleft: 'hidden',
            userButtonleft: '',
            onlyArtistContent: 'hidden',
            onlyUserContent: '',
        });
    } catch (error) {
        console.error("Error rendering data:", error);
        res.redirect('/main-user');
    }
});

app.get('/main-artist/:artistId', (req, res) => {
    const artistId = req.params.artistId;
    console.log("Artist ID:", artistId);

    if (!artistId) {
        console.error("Artist ID is undefined");
        return res.status(400).send("Artist ID is missing");
    }

    res.render('mainArtist', {
        artistId: artistId,
        modalName: 'album',
        modalForm: 'createAlbumForm',
        foridnameTitleModal: 'albumName',
        modalPlaceholderTitle: 'Album title',
        foridnameDescModal: 'albumDescription',
        modalPlaceholderDesc: 'Album description',
        classModalButton: 'addAlbum',
        modalButton: 'Add Album',
        artistHide: 'hidden',
        userHide: '',
        artistButtonleft: '',
        userButtonleft: 'hidden',
        onlyArtistContent: '',
        onlyUserContent: 'hidden',
    });

});

app.get('/login/:userId?', (req, res) => {
    const userId = req.params.userId;
    console.log("User ID:", userId);

    if (userId) { res.render('login', { userId: userId });

        const { error } = req.query;
        let errorMessage = "";
        if (error === "account-not-found") { errorMessage = "Email atau password anda mungkin salah, silahkan ulang."; }
        res.render('index', { errorMessage });
    } else {
        // Tangani permintaan ke /login tanpa parameter userId di sini
        // res.status(400).send("User ID is missing");
        res.redirect('/login/login?error=account-not-found');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userResult = await checkCredentials('user', email, password); // Cek apakah data cocok dengan tabel user
        if (!userResult) { // Jika tidak ada hasil di tabel user, coba mencari di tabel artist
            const artistResult = await checkCredentials('artist', email, password);
            if (artistResult) {
                req.session.artist_id = artistResult.id; // Menyimpan ID artis dalam session
                res.redirect(`/main-artist/${artistResult.id}`); return; // Redirect ke halaman main-artist dengan artist ID
            }
        } else {
            req.session.user_id = userResult.id; // Menyimpan ID pengguna dalam session
            res.redirect(`/main-user/${userResult.id}`); // Redirect ke halaman main-user dengan user ID
            return;            // Jika hasil ditemukan di tabel user, pengguna merupakan seorang user
        }
        
        // Jika tidak ada hasil dalam kedua tabel, kirimkan pesan kesalahan
        res.redirect('login?error=account-not-found');
    } catch (error) {
        console.error("Error during login:", error);
        res.render('index', { errorMessage });
    }
});

app.get('/signup', (req, res) => {
    const { error } = req.query;
    let errorMessage = "";      // kondisi untuk menangani kasus error = duplicate
    if (error === "duplicate") { errorMessage = "Email or username already exists.";
    } else if (error === "user") { errorMessage = "Failed to sign up as a user. Please try again.";
    } else if (error === "artist") { errorMessage = "Failed to sign up as an artist. Please try again."; }
    res.render('signup', { errorMessage });
});

app.post('/signup', async (req, res) => {           
    const { name, email, password, registerAs } = req.body;
    try {
        // Periksa apakah email atau username sudah ada dalam tabel
        const emailExists = await checkIfEmailExists(email);
        const usernameExists = await checkIfUsernameExists(name);
        if (emailExists || usernameExists) {    
            res.redirect('/signup?error=duplicate'); return;
        }
        // Jika email dan username belum ada, lanjutkan dengan menambahkan data baru ke database
        const tableName = registerAs === "user" ? "user" : "artist";
        const newId = await generateNewID(tableName, registerAs);
        const sql = `INSERT INTO ${tableName} (id, name, email, password) VALUES (?, ?, ?, ?)`;
        connection.query(sql, [newId, name, email, password], (err, result) => {
            if (err) {
                console.error(`Error during signup ${registerAs}:`, err);
                res.redirect(`/signup?error=${registerAs}`);
            } else {
                console.log(`New ${registerAs} registered:`, newId);
                if (registerAs === "user") {
                    req.session.user_id = newId; // Menyimpan ID pengguna dalam session
                    res.redirect(`/main-user/${newId}`);
                } else {
                    req.session.artist_id = newId; // Menyimpan ID artis dalam session
                    res.redirect(`/main-artist/${newId}`);
                }
            }
        });
    } catch (error) { 
        console.error("Error during sign up:", error); 
        res.redirect('/signup'); 
    }
});

app.post('/createSong', async (req, res) => {
    const { artistId, name, genre, duration } = req.body;

    console.log("Request body:", req.body);

    console.log("Arist ID yahaha:", artistId);
    if (artistId) { console.log("artist id untuk song adalah:", artistId);
    } else { console.log("artist id untuk song tidak ada:", artistId); }

    try {
        const isDuplicate = await checkDuplicateSong(name); // Periksa apakah nama album sudah ada

        if (isDuplicate) {
            return res.redirect('/createSong?error=duplicate');
        }
        
        const songId = await generateSongID(); // Generate ID untuk album

        const insertSongQuery = 'INSERT INTO song (id, name, genre, duration) VALUES (?, ?, ?, ?)';
        connection.query(insertSongQuery, [songId, name, genre, duration], async (err, result) => {
            if (err) {
                console.error("Error creating song:", err);
                res.redirect('/createSong?error=song');
                return res.status(500).send("Failed to create song: " + err.message);
            }

            const currentArtistId = req.session.artist_id;

            const insertArtistAlbumQuery = 'INSERT INTO song_artist_sing (song_id, artist_id) VALUES (?, ?)';
            connection.query(insertArtistAlbumQuery, [songId, currentArtistId], (err, result) => {
                if (err) {
                    console.error("Error creating artist song entry:", err);
                    return res.status(500).send("Failed to create song.");
                }
                return res.status(200).send("Song Uploaded successfully.");
            });
        });
    } catch (error) {
        console.error("Error uploading song:", error);
        return res.status(500).send("Failed to upload song.");
    }
});

app.post('/createPlaylist', async (req, res) => {
    const { userId, name } = req.body;

    console.log("User ID yahaha:", userId);
    if (userId) { console.log("user id untuk playlist adalah:", userId);
    } else { console.log("user id untuk playlist tidak ada:", userId); }

    try {
        const isDuplicate = await checkDuplicatePlaylist(name); // Periksa apakah judul playlist sudah ada

        if (isDuplicate) {
            return res.redirect('/createPlaylist?error=duplicate');
        }
        
        const playlistId = await generatePlaylistID();  // Generate ID untuk playlist

        const insertPlaylistQuery = 'INSERT INTO playlist (id, name) VALUES (?, ?)';
        connection.query(insertPlaylistQuery, [playlistId, name], async (err, result) => {
            if (err) {
                console.error("Error creating playlist:", err);
                res.redirect('/createPlaylist?error=playlist');
                return res.status(500).send("Failed to create playlist: " + err.message);
            }

            const currentUserId = req.session.user_id;  // Dapatkan ID pengguna dari sesi

            // Simpan entri baru dalam tabel user_playlist_create
            const dateCreated = new Date().toISOString().slice(0, 10);
            const insertUserPlaylistQuery = 'INSERT INTO user_playlist_create (user_id, playlist_id, date_created) VALUES (?, ?, ?)';
            connection.query(insertUserPlaylistQuery, [currentUserId, playlistId, dateCreated], (err, result) => {
                if (err) {
                    console.error("Error creating user playlist entry:", err);
                    return res.status(500).send("Failed to create playlist.");
                }
                // return res.redirect('/createPlaylist?success=true'); 
                return res.status(200).send("Playlist created successfully.");
            });
        });
    } catch (error) {
        console.error("Error creating playlist:", error);
        return res.status(500).send("Failed to create playlist.");
    }
});

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

        const insertAlbumQuery = 'INSERT INTO album (id, name) VALUES (?, ?)';
        connection.query(insertAlbumQuery, [albumId, name], async (err, result) => {
            if (err) {
                console.error("Error creating album:", err);
                res.redirect('/createAlbum?error=album');
                return res.status(500).send("Failed to create album: " + err.message);
            }

            const currentArtistId = req.session.artist_id;

            const date_created = new Date().toISOString().slice(0, 10);
            const insertArtistAlbumQuery = 'INSERT INTO album_artist_has (artist_id, album_id, date_created) VALUES (?, ?, ?)';
            connection.query(insertArtistAlbumQuery, [currentArtistId, albumId, date_created], (err, result) => {
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

app.get('/albums', async (req, res) => {
    try {
        const albums = await getAllAlbums(); // Fungsi untuk mengambil semua album dari database
        res.json({ albums });
    } catch (error) {
        console.error("Error fetching albums:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/myalbums', async (req, res) => {
    try {
        const artistId = req.session.artist_id;

        if (!artistId) { return res.status(400).json({ error: "Artist ID is missing in session" }); }

        const albums = await getAllMyAlbums(artistId);
        res.json({ albums });

    } catch (error) {
        console.error("Error fetching my albums:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/artists', async (req, res) => {
    try {
        const artists = await getAllArtists(); // Fungsi untuk mengambil semua artist dari database
        res.json({ artists });
    } catch (error) {
        console.error("Error fetching artists:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/songs', async (req, res) => {
    try {
        const songs = await getAllSongs(); // Fungsi untuk mengambil semua lagu dari database
        res.json({ songs });
    } catch (error) {
        console.error("Error fetching songs:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/mysongs', async (req, res) => {
    try {
        const artistId = req.session.artist_id;

        if (!artistId) { return res.status(400).json({ error: "Artist ID is missing in session" }); }

        const songs = await getAllMySongs(artistId);
        res.json({ songs });
        
    } catch (error) {
        console.error("Error fetching my songs:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers(); // Fungsi untuk mengambil semua lagu dari database
        res.json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/playlists', async (req, res) => {
    try {
        const playlists = await getAllPlaylists();
        res.json({ playlists })
    } catch (error) {
        console.error("Error fetching playlists:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/myplaylists', async (req, res) => {
    try {
        const myplaylists = await getAllMyPlaylists();
        res.json({ myplaylists })
    } catch (error) {
        console.error("Error fetching playlists:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/main-user/:userId/profileUser', async (req, res) => {
    const userId = req.params.userId; // Mendapatkan userId dari parameter URL
    console.log("user profile id : ", userId);
    if (userId === req.session.user_id) { // Membandingkan dengan userId yang disimpan dalam session
        // Jika userId cocok, lakukan apa yang diperlukan, misalnya, ambil data profil pengguna dari database
        // dan kemudian tampilkan halaman profil pengguna.
        res.render('profileUser', { userId: userId }); // Menggunakan userId dalam pemanggilan res.render
    } else {
        // Jika userId tidak cocok dengan yang disimpan dalam session, mungkin ada upaya akses yang tidak sah,
        // Anda dapat mengarahkan pengguna kembali ke halaman login atau melakukan tindakan yang sesuai.
        res.redirect('/main-user/' + req.session.user_id + '/profileUser');
    }
});

app.get('/myusers', async (req, res) => {
    try {
        const users = await getAllMyUsers(); // Fungsi untuk mengambil semua lagu dari database
        res.json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/myUserArtistFollows', async (req, res) => {
    try {
        const userArtistFollows = await getAllMyUserArtistFollow(); // Fungsi untuk mengambil semua lagu dari database
        res.json({ userArtistFollows });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/myUserAlbumFollows', async (req, res) => {
    try {
        const userAlbumFollows = await getAllMyUserAlbumFollow(); // Fungsi untuk mengambil semua lagu dari database
        res.json({ userAlbumFollows });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/myUserPlaylistCreates', async (req, res) => {
    // const userId = req.params.userId
    const userId = req.query.userId
    try {
        const userPlaylistCreates = await getAllMyUserCreatePlaylist(userId); // Fungsi untuk mengambil semua lagu dari database
        res.json({ userPlaylistCreates });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/main-artist/:artistId/profile', async (req, res) => {
    const artistId = req.params.artistId; // Mendapatkan userId dari parameter URL
    console.log("artist profile id : ", artistId);
    if (artistId === req.session.artist_id) { // Membandingkan dengan userId yang disimpan dalam session
        // Jika userId cocok, lakukan apa yang diperlukan, misalnya, ambil data profil pengguna dari database
        // dan kemudian tampilkan halaman profil pengguna.
        res.render('profileArtist', { artistId: artistId }); // Menggunakan userId dalam pemanggilan res.render
    } else {
        // Jika userId tidak cocok dengan yang disimpan dalam session, mungkin ada upaya akses yang tidak sah,
        // Anda dapat mengarahkan pengguna kembali ke halaman login atau melakukan tindakan yang sesuai.
        res.redirect('/main-user/' + req.session.artist_id + '/profileArtist');
    }
});

// app.post('/addSongToAlbum', async (req, res) => {
//     const { songId, albumId } = req.body;

//     try {
//         // Lakukan validasi data jika diperlukan

//         // Tambahkan lagu ke dalam album di database
//         const insertQuery = 'INSERT INTO song_album_contains (song_id, album_id) VALUES (?, ?)';
//         connection.query(insertQuery, [songId, albumId], (err, result) => {
//             if (err) {
//                 console.error("Error adding song to album:", err);
//                 return res.status(500).send("Failed to add song to album.");
//             }
//             return res.status(200).send("Song added to album successfully.");
//         });
//     } catch (error) {
//         console.error("Error adding song to album:", error);
//         return res.status(500).send("Failed to add song to album.");
//     }
// });

app.use('/', (req, res) => { res.status(404); res.send('<h1>404 Page not Found!</h1>') });
app.listen(port, () => { console.log(`Server is running at http://localhost:${port}`); });