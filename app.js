const express = require('express');
const app = express();
const port = 3031;

const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });
connection.connect((err) => { if (err) throw err; console.log('Connected to MySQL database'); });
// const session = require('express-session');

// app.use(session({
//     secret: 'XcaliburOne@2431@138207', // Ganti dengan kunci rahasia yang lebih aman
//     resave: false,
//     saveUninitialized: true
// }));

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => { res.render('index'); });

app.get('/main-user', (req, res) => {
    // const user_id = req.session.user_id;
    res.render('mainUser', {
        modalName: 'Playlist',
        modalForm: 'createPlaylistForm',
        foridnameTitleModal: 'playlistName',
        modalPlaceholderTitle: 'Playlist title',
        foridnameDescModal: 'playlistDescription',
        modalPlaceholderDesc: 'Playlist description',
        classModalButton: 'addPlaylist',
        modalButton: 'Add Playlist',
        artistHide: '',
        // user_id: user_id
    });
});

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

function generateNewID(table, type) {              
    return new Promise((resolve, reject) => {
        const prefix = type === "user" ? "US" : "AR";
        const sql = `SELECT MAX(id) AS maxId FROM ${table} WHERE id LIKE '${prefix}%'`;
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                let maxId = result[0].maxId;
                if (!maxId) {
                    maxId = prefix + '01';
                } else {
                    const prefixLength = prefix.length;
                    const numericPart = parseInt(maxId.slice(prefixLength), 10) + 1;
                    maxId = prefix + (numericPart < 10 ? '0' : '') + numericPart;
                }
                resolve(maxId);
            }
        });
    });
}

function generatePlaylistID() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT MAX(id) AS maxId FROM playlist";
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                let maxId = result[0].maxId;
                if (!maxId) {
                    maxId = 'PL01'; // Mulai dari PL00 jika tidak ada ID sebelumnya
                } else {
                    const numericPart = parseInt(maxId.slice(2), 10) + 1;
                    maxId = 'PL' + (numericPart < 10 ? '0' : '') + numericPart;
                }
                resolve(maxId);
            }
        });
    });
}

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const userResult = await checkCredentials('user', email, password);
//         const artistResult = await checkCredentials('artist', email, password);
//         if (userResult) {
//             // req.session.user_id = newId; // Menyimpan user_id dalam sesi
//             res.redirect('/main-user'); // Jika login sebagai user, arahkan ke halaman /main-user
//         } else if (artistResult) {
//             // req.session.artist_id = newId; // Menyimpan artist_id dalam sesi
//             res.redirect('/main-artist'); // Jika login sebagai artist, arahkan ke halaman /main-artist
//         } else {
//             res.redirect('/login?error=account-not-found');
//         }
//     } catch (error) {
//         console.error("Error during login:", error);
//         res.render('index', { errorMessage });
//     }
// });

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const credentials = await checkCredentials(email, password);
//         if (credentials) {
//             const { type, id } = credentials;
//             req.session[type + '_id'] = id; // Menyimpan user_id atau artist_id dalam sesi
//             if (type === 'user') {
//                 res.redirect('/main-user'); // Jika login sebagai user, arahkan ke halaman /main-user
//             } else {
//                 res.redirect('/main-artist'); // Jika login sebagai artist, arahkan ke halaman /main-artist
//             }
//         } else {
//             res.redirect('/login?error=account-not-found');
//         }
//     } catch (error) {
//         console.error("Error during login:", error);
//         res.render('index', { errorMessage });
//     }
// });

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

function checkCredentials(table, email, password) {     // Fungsi untuk memeriksa apakah email dan password cocok dengan tabel tertentu
    return new Promise((resolve, reject) => {
        const sql = `SELECT COUNT(*) AS count FROM ${table} WHERE email = ? AND password = ?`;
        connection.query(sql, [email, password], (err, result) => { if (err) { reject(err); } else { resolve(result[0].count > 0); } });
    });
}

// function checkCredentials(email, password) {
//     return new Promise((resolve, reject) => {
//         const sql = `
//             SELECT 'user' AS type, id FROM user WHERE email = ? AND password = ? 
//             UNION ALL 
//             SELECT 'artist' AS type, id FROM artist WHERE email = ? AND password = ?`;

//         connection.query(sql, [email, password, email, password], (err, result) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 if (result.length > 0) {
//                     const { type, id } = result[0];
//                     resolve({ type, id });
//                 } else {
//                     resolve(null);
//                 }
//             }
//         });
//     });
// }

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
                    // req.session.user_id = newId; // Menyimpan user_id dalam sesi
                    res.redirect('/main-user'); // Redirect to main user page
                } else {
                    // req.session.artist_id = newId;
                    res.redirect('/main-artist'); // Redirect to main artist page
                }
            }
        });
    } catch (error) { console.error("Error during sign up:", error); res.redirect('/signup'); }
});

function checkIfEmailExists(email) {        // Fungsi untuk memeriksa apakah email sudah ada dalam tabel
    return new Promise((resolve, reject) => {
        const sql = "SELECT COUNT(*) AS count FROM user WHERE email = ?";
        connection.query(sql, [email], (err, result) => { if (err) { reject(err); } else { resolve(result[0].count > 0); } });
    });
}

function checkIfUsernameExists(username) {      // Fungsi untuk memeriksa apakah username sudah ada dalam tabel
    return new Promise((resolve, reject) => {
        const sql = "SELECT COUNT(*) AS count FROM user WHERE name = ?";
        connection.query(sql, [username], (err, result) => { if (err) { reject(err); } else { resolve(result[0].count > 0); } });
    });
}

app.get('/signup', (req, res) => {
    const { error } = req.query;
    let errorMessage = "";      // Tambahkan kondisi untuk menangani kasus error = duplicate
    if (error === "duplicate") { errorMessage = "Email or username already exists.";
    } else if (error === "user") { errorMessage = "Failed to sign up as a user. Please try again.";
    } else if (error === "artist") { errorMessage = "Failed to sign up as an artist. Please try again."; }
    res.render('signup', { errorMessage });
});

// Fungsi untuk mendapatkan user_id atau artist_id dari sesi
// function getUserIdFromSessionOrToken(req, type) {
//     // Contoh menggunakan sesi
//     if (type === 'user') {
//         return req.session.user_id;
//     } else if (type === 'artist') {
//         return req.session.artist_id;
//     }
//     return null;
// }

// Middleware autentikasi untuk pengguna biasa
// function authenticateUser() {
//     return(req, res, next) => {
//         // Lakukan logika autentikasi untuk pengguna biasa di sini
//         const user_id = getUserIdFromSessionOrToken(req, 'user');
    
//         if (!user_id) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }
    
//         req.user_id = user_id; // Tambahkan user_id ke objek req untuk digunakan di endpoint selanjutnya
//         next();
//     };
// }

// Middleware autentikasi untuk artis
// function authenticateArtist() {
//     return(req, res, next) => {
//         // Lakukan logika autentikasi untuk artis di sini
//         const artist_id = getUserIdFromSessionOrToken(req, 'artist');

//         if (!artist_id) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         req.artist_id = artist_id; // Tambahkan artist_id ke objek req untuk digunakan di endpoint selanjutnya
//         next();
//     };
// }

app.post('/createPlaylist', async (req, res) => {
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
        res.redirect('/createPlaylist'); // Redirect to createPlaylist page if any error occurs
    }
});

app.get('/createPlaylist', (req, res) => {
    const { error } = req.query;
    let errorMessage = "";
    if (error === "duplicate") {
        errorMessage = "Playlist name already exists, please choose another name.";
    } else if (error === "playlist") {
        errorMessage = "Failed to create playlist. Please try again.";
    }
    res.render('createPlaylist', { errorMessage });
});

async function checkDuplicatePlaylist(name) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COUNT(*) AS count FROM playlist WHERE name = ?';
        connection.query(sql, [name], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0].count > 0);
            }
        });
    });
}

app.get('/main/profile', (req, res) => {
    res.render('profile');
})

app.use('/', (req, res) => { res.status(404); res.send('<h1>404 Page not Found!</h1>') });
app.listen(port, () => { console.log(`Server is running at http://localhost:${port}`); });