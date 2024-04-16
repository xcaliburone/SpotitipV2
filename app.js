const express = require('express');
const app = express();
const port = 3031;

const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });
connection.connect((err) => { if (err) throw err; console.log('Connected to MySQL database'); });

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const { getAllPlaylists, getAllAlbums, getAllArtists, getAllSongs, getAllUsers } = require('./utils/callTables')
const { generateNewID, generatePlaylistID } = require('./utils/generateID')
const { checkCredentials, checkIfEmailExists, checkIfUsernameExists, checkDuplicatePlaylist } = require('./utils/checkCredentials')

app.get('/', (req, res) => { res.render('index'); });

app.get('/main-user', async (req, res) => {
    try {
        const keyword = req.query.key; // Ambil kata kunci pencarian dari query parameter
        const searchResults = await searchAllTables(keyword); // Panggil fungsi pencarian untuk semua tabel
        res.render('mainUser', {        // Render halaman main-user dengan hasil pencarian
            searchResults: searchResults,
            modalName: 'Playlist',
            modalForm: 'createPlaylistForm',
            foridnameTitleModal: 'playlistName',
            modalPlaceholderTitle: 'Playlist title',
            foridnameDescModal: 'playlistDescription',
            modalPlaceholderDesc: 'Playlist description',
            classModalButton: 'addPlaylist',
            modalButton: 'Add Playlist',
            artistHide: ''
        });
    } catch (error) {
        console.error("Error searching data:", error);
        res.redirect('/main-user');
    }
});

function searchAllTables(keyword) {
    return new Promise((resolve, reject) => {
        // Lakukan pencarian di semua tabel entitas di database
        const sql = `
            SELECT title FROM song WHERE title LIKE '%undefined%'
            UNION
            SELECT name FROM playlist WHERE name LIKE '%undefined%'
            UNION
            SELECT title FROM album WHERE title LIKE '%undefined%'
            UNION
            SELECT name FROM artist WHERE name LIKE '%undefined%'
        `;
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

app.get('/main-artist', (req, res) =>{
    res.render('mainArtist', {
        modalName: 'Album',
        modalForm: 'createAlbumForm',
        foridnameTitleModal: 'albumName',
        modalPlaceholderTitle: 'Album title',
        foridnameDescModal: 'albumDescription',
        modalPlaceholderDesc: 'Album description',
        classModalButton: 'addAlbum',
        modalButton: 'Add Album',
        artistHide: 'hidden',
    });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userResult = await checkCredentials('user', email, password);
        const artistResult = await checkCredentials('artist', email, password);
        if (userResult) {
            res.redirect('/main-user'); // Jika login sebagai user, arahkan ke halaman /main-user
        } else if (artistResult) {
            res.redirect('/main-artist'); // Jika login sebagai artist, arahkan ke halaman /main-artist
        } else {
            res.redirect('/login?error=account-not-found');
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.render('index', { errorMessage });
    }
});

app.get('/login', (req, res) => {       // Di halaman login, tampilkan pesan kesalahan jika ada
    const { error } = req.query;
    let errorMessage = "";
    if (error === "account-not-found") { errorMessage = "Email atau password anda mungkin salah, silahkan ulang."; }
    res.render('index', { errorMessage });
});

app.post('/signup', async (req, res) => {           // Middleware untuk menangani rute sign up
    const { name, email, password, registerAs } = req.body;
    try {   // Periksa apakah email atau username sudah ada dalam tabel
        const emailExists = await checkIfEmailExists(email);
        const usernameExists = await checkIfUsernameExists(name);
        if (emailExists || usernameExists) {    // Jika email atau username sudah ada, kirimkan respons ke pengguna
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
                    // req.session.user_id = newId; // Menyimpan user_id dalam session
                    res.redirect('/main-user');
                } else {
                    // req.session.artist_id = newId;
                    res.redirect('/main-artist');
                }
            }
        });
    } catch (error) { console.error("Error during sign up:", error); res.redirect('/signup'); }
});

app.get('/signup', (req, res) => {
    const { error } = req.query;
    let errorMessage = "";      // kondisi untuk menangani kasus error = duplicate
    if (error === "duplicate") { errorMessage = "Email or username already exists.";
    } else if (error === "user") { errorMessage = "Failed to sign up as a user. Please try again.";
    } else if (error === "artist") { errorMessage = "Failed to sign up as an artist. Please try again."; }
    res.render('signup', { errorMessage });
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
        // res.redirect('/createPlaylist');
    }
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

app.get('/albums', async (req, res) => {
    try {
        const albums = await getAllAlbums(); // Fungsi untuk mengambil semua album dari database
        res.json({ albums });
    } catch (error) {
        console.error("Error fetching albums:", error);
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

app.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers(); // Fungsi untuk mengambil semua lagu dari database
        res.json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/main/profile', (req, res) => {
    res.render('profile');
})

app.use('/', (req, res) => { res.status(404); res.send('<h1>404 Page not Found!</h1>') });
app.listen(port, () => { console.log(`Server is running at http://localhost:${port}`); });