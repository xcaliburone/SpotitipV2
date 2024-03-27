SHOW TABLES;

-- describe
DESC user;
DESC artist;
DESC song;
DESC album;
DESC playlist;
DESC user_artist_follow;
DESC user_playlist_create;
DESC user_playlist_follow;
DESC user_song_liked;
DESC song_album_contains;
DESC song_playlist_contains;
DESC song_artist_sing;
DESC album_artist_has;

-- entitas
SELECT * FROM user;
SELECT * FROM artist;
SELECT * FROM song;
SELECT * FROM album;
SELECT * FROM playlist;

-- relasi
SELECT * FROM user_artist_follow;
SELECT * FROM user_playlist_create;
SELECT * FROM user_playlist_follow;
SELECT * FROM user_song_liked;
SELECT * FROM song_album_contains;
SELECT * FROM song_artist_sing;
SELECT * FROM album_artist_has;
SELECT * FROM playlist_song_contains;