-- drop data
-- DELETE FROM `user`;
-- DELETE FROM `artist`;
-- DELETE FROM `song`;
-- DELETE FROM `album`;
-- DELETE FROM `playlist`;
-- DELETE FROM `user_artist_follow`;
-- DELETE FROM `user_playlist_create`;
-- DELETE FROM `user_playlist_follow`;
-- DELETE FROM `user_song_liked`;
-- DELETE FROM `song_artist_sing`;
-- DELETE FROM `song_album_contains`;
-- DELETE FROM `album_artist_has`;
-- DELETE FROM `playlist_song_contains`;

-- drop table
DROP TABLE IF EXISTS `user_artist_follow`;
DROP TABLE IF EXISTS `user_playlist_create`;
DROP TABLE IF EXISTS `user_playlist_follow`;
DROP TABLE IF EXISTS `user_song_liked`;
DROP TABLE IF EXISTS `song_artist_sing`;
DROP TABLE IF EXISTS `song_album_contains`;
DROP TABLE IF EXISTS `album_artist_has`;
DROP TABLE IF EXISTS `playlist_song_contains`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `artist`;
DROP TABLE IF EXISTS `song`;
DROP TABLE IF EXISTS `album`;
DROP TABLE IF EXISTS `playlist`;