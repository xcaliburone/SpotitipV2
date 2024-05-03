CREATE DATABASE IF NOT EXISTS `spotitip v2`;
USE `spotitip v2`;

CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(12) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `followers` int(11) DEFAULT 0,
  `following` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX idx_user_name (`name`)
);

CREATE TABLE IF NOT EXISTS `artist` (
  `id` varchar(12) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `followers` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX idx_artist_name (`name`)
);

CREATE TABLE IF NOT EXISTS `song` (
  `id` varchar(12) NOT NULL,
  `name` varchar(50) NOT NULL,
  `genre` varchar(50) NOT NULL,
  `duration` TIME NOT NULL,
  `listeners` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX idx_song_name (`name`),
  INDEX idx_song_genre (`genre`)
);

CREATE TABLE IF NOT EXISTS `album` (
  `id` varchar(12) NOT NULL,
  `name` varchar(50) NOT NULL,
  `num_song` int(11) NOT NULL,
  `duration` TIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX idx_album_name (`name`)
);

CREATE TABLE IF NOT EXISTS `playlist` (
  `id` varchar(12) NOT NULL,
  `name` varchar(50) NOT NULL,
  `num_song` int(11) DEFAULT NULL,
  `duration` TIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX idx_playlist_name (`name`)
);

CREATE TABLE IF NOT EXISTS `user_artist_follow` (
  `user_id` varchar(12) NOT NULL,
  `artist_id` varchar(12) NOT NULL,
  UNIQUE KEY `unique_user_artist_follow` (`user_id`, `artist_id`),
  KEY `user_id_follow_artist` (`user_id`),
  KEY `artist_id_follow` (`artist_id`),
  CONSTRAINT `user_id_follow_artist` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `artist_id_follow` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `user_playlist_create` (
  `user_id` varchar(12) NOT NULL,
  `playlist_id` varchar(12) NOT NULL,
  `date_created` date NOT NULL,
  UNIQUE KEY `unique_user_playlist_create` (`user_id`, `playlist_id`),
  KEY `user_id_create` (`user_id`),
  KEY `playlist_id_create` (`playlist_id`),
  CONSTRAINT `user_id_create` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `playlist_id_create` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `user_playlist_follow` (
  `user_id` varchar(12) NOT NULL,
  `playlist_id` varchar(12) NOT NULL,
  UNIQUE KEY `unique_user_playlist_follow` (`user_id`, `playlist_id`),
  KEY `user_id_follow_playlist` (`user_id`),
  KEY `playlist_id_follow` (`playlist_id`),
  CONSTRAINT `user_id_follow_playlist` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `playlist_id_follow` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `user_album_follow` (
  `user_id` varchar(12) NOT NULL,
  `album_id` varchar(12) NOT NULL,
  UNIQUE KEY `unique_user_album_follow` (`user_id`, `album_id`),
  KEY `user_id_follow_playlist` (`user_id`),
  KEY `album_id_follow` (`album_id`),
  CONSTRAINT `user_id_follow_album` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `album_id_follow` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `user_song_liked` (
  `user_id` varchar(12) NOT NULL,
  `song_id` varchar(12) NOT NULL,
  UNIQUE KEY `unique_user_song_liked` (`user_id`, `song_id`),
  KEY `user_id_liked` (`user_id`),
  KEY `song_id_liked` (`song_id`),
  CONSTRAINT `user_id_liked` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `song_id_liked` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `song_playlist_contains` (
  `playlist_id` varchar(12) NOT NULL,
  `song_id` varchar(12) NOT NULL,
  UNIQUE KEY `unique_song_playlist_contains` (`playlist_id`, `song_id`),
  KEY `playlist_id_contains` (`playlist_id`),
  KEY `song_id_contains_playlist` (`song_id`),
  CONSTRAINT `playlist_id_contains` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `song_id_contains_playlist` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `song_album_contains` (
  `song_id` varchar(12) NOT NULL,
  `album_id` varchar(12) NOT NULL,
  UNIQUE KEY `unique_song_album_contains` (`song_id`, `album_id`),
  KEY `song_id_contains_album` (`song_id`),
  KEY `album_id_contains` (`album_id`),
  CONSTRAINT `song_id_contains_album` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `album_id_contains` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `song_artist_sing` (
  `song_id` varchar(12) NOT NULL,
  `artist_id` varchar(12) NOT NULL,
  UNIQUE KEY `unique_song_artist_sing` (`song_id`, `artist_id`),
  KEY `song_id_sing` (`song_id`),
  KEY `artist_id_sing` (`artist_id`),
  CONSTRAINT `song_id_sing` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `artist_id_sing` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `album_artist_has` (
  `album_id` varchar(12) NOT NULL,
  `artist_id` varchar(12) NOT NULL,
  `date_created` date NOT NULL,
  UNIQUE KEY `unique_album_artist_has` (`album_id`, `artist_id`),
  KEY `album_id_has` (`album_id`),
  KEY `artist_id_has` (`artist_id`),
  CONSTRAINT `album_id_has` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `artist_id_has` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);