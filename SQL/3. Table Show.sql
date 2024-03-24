-- SHOW TABLES;

-- entitas
select * from user;
select * from artist;
select * from song;
select * from album;
select * from playlist;

-- relasi
select * from user_artist_follow;
select * from user_playlist_create;
select * from user_playlist_follow;
select * from user_song_liked;
select * from song_album_contains;
select * from song_artist_sing;
select * from album_artist_has;
select * from playlist_song_contains;