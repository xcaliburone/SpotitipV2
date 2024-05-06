const express = require('express');
const app = express();
const port = 3031;
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}); connection.connect((err) => { if (err) throw err; console.log('Connected to MySQL database'); });

app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const { getAllPlaylists, getAllAlbums, getAllArtists, getAllSongs, getAllUsers } = require('./utils/callTables')
const { getAllMyAlbums, getAllMySongs, getAllMyPlaylists } = require('./utils/callTables2')
const {
    getAllMyUsers, getAllMyUserArtistFollow, getAllMyUserAlbumFollow, getAllMyUserCreatePlaylist,
    getAllMyUserFollowPlaylist, getAllMyUserLikedSong
} = require('./utils/UserInfo')
const { getAllMyArtists } = require('./utils/ArtistInfo')
const { generateNewID, generatePlaylistID, generateAlbumID, generateSongID } = require('./utils/generateID')
const {
    checkCredentials, checkIfEmailExists, checkIfUsernameExists, checkDuplicatePlaylist, checkDuplicateAlbum, checkDuplicateSong
} = require('./utils/checkDupeEntity')
const { getAllDatas, formatResults } = require('./utils/searchDatas')
const { getAllPlaylists2, getSongsForPlaylist, getAllAlbums2, getSongsForAlbum } = require('./utils/songContains')
const { countSongsInPlaylist, updateNumSongsInPlaylist, countSongsInAlbum, updateNumSongsInAlbum } = require('./utils/colsUpdate')
const { checkIfUserAlbumFollow, checkIfUserArtistFollow, checkIfUserPlaylistFollow, checkIfUserLikedSong } = require('./utils/checkDupeRelation')

app.get('/', (req, res) => { res.render('index'); });

app.get('/login/:userId?', (req, res) => {
    const userId = req.params.userId;
    console.log("User ID:", userId);

    if (userId) {
        res.render('login', { userId: userId });
        const { error } = req.query;
        let errorMessage = "";
        if (error === "account-not-found") { errorMessage = "Incorrect Email or Password."; }
        res.render('index', { errorMessage });
    } else { res.redirect('/login/login?error=account-not-found'); }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userResult = await checkCredentials('user', email, password);
        if (!userResult) {
            const artistResult = await checkCredentials('artist', email, password);
            if (artistResult) {
                req.session.artist_id = artistResult.id;
                res.redirect(`/main-artist/${artistResult.id}`); return;
            }
        } else {
            req.session.user_id = userResult.id;
            res.redirect(`/main-user/${userResult.id}`);
            return;
        }
        res.redirect('/login/login?error=account-not-found');
    } catch (error) {
        console.error("Error during login:", error);
        res.render('index', { errorMessage });
    }
});

app.get('/signup', (req, res) => {
    const { error } = req.query;
    let errorMessage = "";
    if (error === "duplicate") { errorMessage = "Email or username already exists.";
    } else if (error === "user") { errorMessage = "Failed to sign up as a user. Please try again.";
    } else if (error === "artist") { errorMessage = "Failed to sign up as an artist. Please try again."; }
    res.render('signup', { errorMessage });
});

app.post('/signup', async (req, res) => {
    const { name, email, password, registerAs } = req.body;
    try {
        const emailExists = await checkIfEmailExists(email);
        const usernameExists = await checkIfUsernameExists(name);
        if (emailExists || usernameExists) {
            res.redirect('/signup?error=duplicate'); return;
        }
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
                    req.session.user_id = newId
                    res.redirect(`/main-user/${newId}`);
                } else {
                    req.session.artist_id = newId;
                    res.redirect(`/main-artist/${newId}`);
                }
            }
        });
    } catch (error) { 
        console.error("Error during sign up:", error); 
        res.redirect('/signup');
    }
});

app.get('/main-user/:userId', (req, res) => {
    const userId = req.params.userId;
    const artistId = req.query.artistId;
    console.log("User ID main :", userId);

    if (!userId) { console.error("User ID is undefined"); return res.status(400).send("User ID is missing"); }

    try {
        res.render('mainUser', {        
            userId: userId,
            artistId: artistId,
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
    } catch (error) { console.error("Error rendering data:", error); res.redirect('/main-user'); }
});

app.get('/main-artist/:artistId', (req, res) => {
    const artistId = req.params.artistId;
    const userId = req.query.artistId;
    console.log("Artist ID:", artistId);

    if (!artistId) { console.error("Artist ID is undefined"); return res.status(400).send("Artist ID is missing"); }

    try {
        res.render('mainArtist', {
            userId: userId,
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
    } catch (error) { console.error("Error rendering data:", error); res.redirect('/main-artist'); }
});

app.get('/profileUser/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log("User profile id:", userId);

    if (userId) {
        res.render('profileUser', { userId: userId });
    } else {
        res.status(400).send('Invalid userId');
    }
});

app.get('/profileArtist/:artistId', async (req, res) => {
    const artistId = req.params.artistId;
    console.log("Artist profile id:", artistId);

    if (artistId) {
        res.render('profileArtist', { artistId: artistId });
    } else {
        res.status(400).send('Invalid artistId');
    }
});

app.get('/albums', async (req, res) => {
    try {
        const albums = await getAllAlbums();
        res.json({ albums });
    } catch (error) {
        console.error("Error fetching albums:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/artists', async (req, res) => {
    try {
        const artists = await getAllArtists();
        res.json({ artists });
    } catch (error) {
        console.error("Error fetching artists:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/songs', async (req, res) => {
    try {
        const songs = await getAllSongs();
        res.json({ songs });
    } catch (error) {
        console.error("Error fetching songs:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/playlists', async (req, res) => {
    try {
        const playlists = await getAllPlaylists();
        res.json({ playlists })
    } catch (error) {
        console.error("Error fetching playlists:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/myalbums', async (req, res) => {
    try {
        const artistId = req.query.artistId;
        if (!artistId) { return res.status(400).json({ error: "Artist ID is missing" }); }
        const albums = await getAllMyAlbums(artistId);
        res.json({ albums });
    } catch (error) {
        console.error("Error fetching my albums:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/mysongs', async (req, res) => {
    try {
        const artistId = req.query.artistId;
        if (!artistId) { return res.status(400).json({ error: "Artist ID is missing" }); }
        const songs = await getAllMySongs(artistId);
        res.json({ songs });
    } catch (error) {
        console.error("Error fetching my songs:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/myplaylists', async (req, res) => {
    try {
        const myplaylists = await getAllMyPlaylists();
        res.json({ myplaylists })
    } catch (error) {
        console.error("Error fetching my playlists:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/myusers', async (req, res) => {
    const userId = req.query.userId;
    try {
        const users = await getAllMyUsers(userId);
        res.json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/myUserArtistFollows', async (req, res) => {
    const userId = req.query.userId
    try {
        const userArtistFollows = await getAllMyUserArtistFollow(userId);
        res.json({ userArtistFollows });
    } catch (error) {
        console.error("Error fetching user artist follow:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/myUserAlbumFollows', async (req, res) => {
    const userId = req.query.userId
    try {
        const userAlbumFollows = await getAllMyUserAlbumFollow(userId);
        res.json({ userAlbumFollows });
    } catch (error) {
        console.error("Error fetching user album follow:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/myUserPlaylistCreates', async (req, res) => {
    const userId = req.query.userId
    try {
        const userPlaylistCreates = await getAllMyUserCreatePlaylist(userId);
        res.json({ userPlaylistCreates });
    } catch (error) {
        console.error("Error fetching user playlist create:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/myUserPlaylistFollows', async (req, res) => {
    const userId = req.query.userId
    try {
        const userPlaylistFollows = await getAllMyUserFollowPlaylist(userId);
        res.json({ userPlaylistFollows });
    } catch (error) {
        console.error("Error fetching user playlist follow:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/myUserSongLikeds', async (req, res) => {
    const userId = req.query.userId
    try {
        const userSongLikeds = await getAllMyUserLikedSong(userId);
        res.json({ userSongLikeds });
    } catch (error) {
        console.error("Error fetching user liked songs:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/myartists', async (req, res) => {
    const artistId = req.query.artistId;
    try {
        const artists = await getAllMyArtists(artistId);
        res.json({ artists });
    } catch (error) {
        console.error("Error fetching artists:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.post('/createSong', async (req, res) => {
    const { name, genre, duration } = req.body;
    const artistId = req.query.artistId;

    if (artistId) { console.log("artist id for song is : ", artistId);
    } else { console.log("artist id for song is missing : ", artistId); }

    try {
        const isDuplicate = await checkDuplicateSong(name);
        if (isDuplicate) { return res.redirect('/createSong?error=duplicate'); }
        
        const songId = await generateSongID();
        const insertSongQuery = 'INSERT INTO song (id, name, genre, duration) VALUES (?, ?, ?, ?)';
        connection.query(insertSongQuery, [songId, name, genre, duration], async (err, result) => {
            if (err) {
                console.error("Error creating song:", err);
                res.redirect('/createSong?error=song');
                return res.status(500).send("Failed to create song: " + err.message);
            }

            // const currentArtistId = req.session.artist_id;
            const insertArtistAlbumQuery = 'INSERT INTO song_artist_sing (song_id, artist_id) VALUES (?, ?)';
            connection.query(insertArtistAlbumQuery, [songId, artistId], (err, result) => {
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
    const { name } = req.body;
    const userId = req.query.userId;

    if (userId) { console.log("user id for playlist is : ", userId);
    } else { console.log("user id for playlist is missing : ", userId); }

    try {
        const isDuplicate = await checkDuplicatePlaylist(name);
        if (isDuplicate) { return res.redirect('/createPlaylist?error=duplicate'); }
        
        const playlistId = await generatePlaylistID();
        const insertPlaylistQuery = 'INSERT INTO playlist (id, name) VALUES (?, ?)';
        connection.query(insertPlaylistQuery, [playlistId, name], async (err, result) => {
            if (err) {
                console.error("Error creating playlist:", err);
                res.redirect('/createPlaylist?error=playlist');
                return res.status(500).send("Failed to create playlist: " + err.message);
            }
            // const currentUserId = req.session.user_id;
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

app.post('/createAlbum', async (req, res) => {
    const { name } = req.body;
    const artistId = req.query.artistId;

    if (artistId) { console.log("artist id for album is : ", artistId);
    } else { console.log("artist id for playlist is missing : ", artistId); }

    try {
        const isDuplicate = await checkDuplicateAlbum(name);

        if (isDuplicate) { return res.redirect('/createAlbum?error=duplicate'); }
        
        const albumId = await generateAlbumID();
        const insertAlbumQuery = 'INSERT INTO album (id, name) VALUES (?, ?)';
        connection.query(insertAlbumQuery, [albumId, name], async (err, result) => {
            if (err) {
                console.error("Error creating album:", err);
                res.redirect('/createAlbum?error=album');
                return res.status(500).send("Failed to create album: " + err.message);
            }

            // const currentArtistId = req.session.artist_id;
            const date_created = new Date().toISOString().slice(0, 10);
            const insertArtistAlbumQuery = 'INSERT INTO album_artist_has (artist_id, album_id, date_created) VALUES (?, ?, ?)';
            connection.query(insertArtistAlbumQuery, [artistId, albumId, date_created], (err, result) => {
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

app.post('/userAlbumFollow', async (req, res) => {
    const { albumId } = req.body;
    const userId = req.query.userId;
    
    try {
        const isAlreadyFollowing = await checkIfUserAlbumFollow(userId, albumId);
        if (isAlreadyFollowing) {
            return res.status(400).json({ error: 'You are already following this album' });
        }

        const sql = 'INSERT INTO user_album_follow (user_id, album_id) VALUES (?, ?)';
        await new Promise((resolve, reject) => {
            connection.query(sql, [userId, albumId], (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return reject(new Error('Duplicate entry'));
                    }
                    return reject(err);
                }
                resolve(result);
            });
        });
        res.status(200).json({ message: 'You are now following this album' });
    } catch (error) {
        console.error('Error following album:', error);
        if (error.message === 'Duplicate entry') {
            return res.status(400).json({ error: 'You are already following this album' });
        }
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/userArtistFollow', async (req, res) => {
    const { artistId } = req.body;
    const userId = req.query.userId;

    try {
        const isAlreadyFollowing = await checkIfUserArtistFollow(userId, artistId);
        if (isAlreadyFollowing) {
            return res.status(400).json({ error: 'You are already following this artist' });
        }

        const sql = 'INSERT INTO user_artist_follow (user_id, artist_id) VALUES (?, ?)';
        await new Promise((resolve, reject) => {
            connection.query(sql, [userId, artistId], (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return reject(new Error('Duplicate entry'));
                    }
                    return reject(err);
                }
                resolve(result);
            });
        });
        return res.status(200).send("You are now following this artist")
    } catch (error) {
        console.error('Error following artist:', error);
        if (error.message === 'Duplicate entry') {
            return res.status(500).send("You are already following this artist");
        }
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/userPlaylistFollow', async (req, res) => {
    const { playlistId } = req.body;
    const userId = req.query.userId;

    try {
        const isAlreadyFollowing = await checkIfUserPlaylistFollow(userId, playlistId);
        if (isAlreadyFollowing) {
            return res.status(400).json({ error: 'You are already following this playlist' });
        }

        const sql = 'INSERT INTO user_playlist_follow (user_id, playlist_id) VALUES (?, ?)';
        await new Promise((resolve, reject) => {
            connection.query(sql, [userId, playlistId], (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return reject(new Error('Duplicate entry'));
                    }
                    return reject(err);
                }
                resolve(result);
            });
        });
        res.status(200).json({ message: 'You are now following this playlist' });
    } catch (error) {
        console.error('Error following playlist:', error);
        if (error.message === 'Duplicate entry') {
            return res.status(400).json({ error: 'You are already following this playlist' });
        }
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/userSongLiked', async (req, res) => {
    const { songId } = req.body;
    const userId = req.query.userId;

    try {
        const isAlreadyLiked = await checkIfUserLikedSong(userId, songId);
        if (isAlreadyLiked) {
            return res.status(400).json({ error: 'You have already liked this song' });
        }

        const sql = 'INSERT INTO user_song_liked (user_id, song_id) VALUES (?, ?)';
        await new Promise((resolve, reject) => {
            connection.query(sql, [userId, songId], (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return reject(new Error('Duplicate entry'));
                    }
                    return reject(err);
                }
                resolve(result);
            });
        });
        res.status(200).json({ message: 'You have liked this song' });
    } catch (error) {
        console.error('Error liking song:', error);
        if (error.message === 'Duplicate entry') {
            return res.status(400).json({ error: 'You have already liked this song' });
        }
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/search', async (req, res) => {
    try {
        const { keyword } = req.query;
        const results = await getAllDatas(keyword);
        const formattedResults = formatResults(results);
        res.json({ results: formattedResults });
    } catch (error) {
        console.error("Error searching:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/findPlaylistId', async (req, res) => {
    try {
        const { playlistNameDua } = req.query;
        const playlistIdQuery = 'SELECT id FROM playlist WHERE name = ?';
        connection.query(playlistIdQuery, [playlistNameDua], (error, results) => {
            if (error) { throw error; }
            if (results.length > 0) {
                const playlistId = results[0].id;
                res.json({ id: playlistId });
            } else { res.status(404).json({ error: 'Playlist not found' }); }
        });
    } catch (error) {
        console.error('Error finding playlist ID:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/findSongId', async (req, res) => {
    try {
        const { songName } = req.query;
        const songIdQuery = 'SELECT id FROM song WHERE name = ?';
        connection.query(songIdQuery, [songName], (error, results) => {
            if (error) { throw error; }
            if (results.length > 0) {
                const songId = results[0].id;
                res.json({ id: songId });
            } else { res.status(404).json({ error: 'Song not found' }); }
        });
    } catch (error) {
        console.error('Error finding song ID:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/addSongToPlaylist', async (req, res) => {
    try {
        const { playlistId, songId } = req.body;
        const insertQuery = 'INSERT INTO song_playlist_contains (playlist_id, song_id) VALUES (?, ?)';
        await new Promise((resolve, reject) => {
            connection.query(insertQuery, [playlistId, songId], (error, results) => {
                if (error) {
                    if (error.code === 'ER_DUP_ENTRY') {
                        return reject(new Error('Duplicate entry'));
                    }
                    return reject(error);
                }
                resolve(results);
            });
        });

        const numSongsPlaylist = await countSongsInPlaylist(playlistId);
        await updateNumSongsInPlaylist(playlistId, numSongsPlaylist);
        
        res.sendStatus(200);
    } catch (error) {
        if (error.message === 'Duplicate entry') {
            return res.status(400).json({ error: 'Song is already in the playlist' });
        }
        console.error('Error adding song to playlist:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

app.get('/findAlbumId', async (req, res) => {
    try {
        const { albumNameDua } = req.query;
        const albumIdQuery = 'SELECT id FROM album WHERE name = ?';
        connection.query(albumIdQuery, [albumNameDua], (error, results) => {
            if (error) { throw error; }
            if (results.length > 0) {
                const albumId = results[0].id;
                res.json({ id: albumId });
            } else { res.status(404).json({ error: 'Album not found' }) }
        });
    } catch (error) {
        console.error('Error adding album ID:', error);
        res.status(500).json({ error: 'Server error' })
    }
})

app.get('/findDuaSongId', async (req, res) => {
    try {
        const { songNameDua } = req.query;
        const songIdQuery = 'SELECT id FROM song WHERE name = ?';
        connection.query(songIdQuery, [songNameDua], (error, results) => {
            if (error) { throw error; }
            if (results.length > 0) {
                const songId = results[0].id;
                res.json({ id: songId });
            } else { res.status(404).json({ error: 'Song not found' }); }
        });
    } catch (error) {
        console.error('Error finding song ID:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/addSongToAlbum', async (req, res) => {
    try {
        const { albumId, songId, artistId } = req.body;

        const artistSongQuery = 'SELECT * FROM song_artist_sing WHERE artist_id = ? AND song_id = ?';
        connection.query(artistSongQuery, [artistId, songId], async (error1, songResults) => {
            if (error1) { throw error1; }

            const artistAlbumQuery = 'SELECT * FROM album_artist_has WHERE artist_id = ? AND album_id = ?';
            connection.query(artistAlbumQuery, [artistId, albumId], async (error2, albumResults) => {
                if (error2) { throw error2; }

                if (songResults.length > 0 && albumResults.length > 0) {
                    try {
                        const insertQuery = 'INSERT INTO song_album_contains (album_id, song_id) VALUES (?, ?)';
                        await new Promise((resolve, reject) => {
                            connection.query(insertQuery, [albumId, songId], async (error3, results) => {
                                if (error3) {
                                    if (error3.code === 'ER_DUP_ENTRY') {
                                        return reject(new Error('Duplicate entry'));
                                    }
                                    return reject(error3);
                                }
                                resolve(results);
                            });
                        });

                        const numSongsAlbum = await countSongsInAlbum(albumId);
                        await updateNumSongsInAlbum(albumId, numSongsAlbum);

                        res.sendStatus(200);
                    } catch (error3) {
                        if (error3.message === 'Duplicate entry') {
                            return res.status(400).json({ error: 'Song is already in the album' });
                        }
                        throw error3;
                    }
                } else { 
                    res.status(403).json({ error: 'Artist is not authorized to add this song to the album' }); 
                }
            });
        });
    } catch (error) {
        console.error('Error Adding song to albums:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/songPlaylist', async (req, res) => {
    try {
        const userId = req.query.userId;
        console.log('woi apasih : ', userId)
        const playlists = await getAllPlaylists2(userId);
        const playlistsWithSongs = await Promise.all(playlists.map(async (playlist) => {
            const songs = await getSongsForPlaylist(playlist.id);
            return { ...playlist, songs };
        }));
        res.json({ playlists: playlistsWithSongs });
    } catch (error) {
        console.error("Error fetching playlists:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/songAlbum', async (req, res) => {
    try {
        const artistId = req.query.artistId;
        console.log("apasih kamu ini", artistId);
        const albums = await getAllAlbums2(artistId);
        const albumsWithSongs = await Promise.all(albums.map(async (album) => {
            const songs = await getSongsForAlbum(album.id, artistId)
            return { ...album, songs };
        }));
        res.json({ albums: albumsWithSongs });
    } catch (error) {
        console.error("Error fetching albums:", error);
        res.status(500).json({ error: "Server error" });
    }
})

app.use('/', (req, res) => { res.status(404).render('./partials/404')});
app.listen(port, () => { console.log(`Server is running at http://localhost:${port}`); });