CREATE DATABASE IF NOT EXISTS `spotitip v2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `spotitip v2`;

CREATE TABLE IF NOT EXISTS `album` (
  `id` varchar(12) NOT NULL,
  `title` varchar(50) NOT NULL,
  `release` date NOT NULL,
  `num_song` int(11) NOT NULL,
  `duration` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `album_artist_has` (
  `album_id` varchar(12) NOT NULL,
  `artist_id` varchar(12) NOT NULL,
  `release` date NOT NULL,
  KEY `album_id_has` (`album_id`),
  KEY `artist_id_has` (`artist_id`),
  CONSTRAINT `album_id_has` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `artist_id_has` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `artist` (
  `id` varchar(12) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `followers` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `playlist` (
  `id` varchar(12) NOT NULL,
  `name` varchar(50) NOT NULL,
  `num_song` int(11) DEFAULT NULL,
  `duration` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `playlist_song_contains` (
  `playlist_id` varchar(12) NOT NULL,
  `song_id` varchar(12) NOT NULL,
  KEY `playlist_id_contains` (`playlist_id`),
  KEY `song_id_contains` (`song_id`),
  CONSTRAINT `playlist_id_contains` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `song_id_contains` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `song` (
  `id` varchar(12) NOT NULL,
  `title` varchar(50) NOT NULL,
  `genre` varchar(50) NOT NULL,
  `duration` time NOT NULL DEFAULT '00:00:00',
  `listeners` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `song_album_contains` (
  `song_id` varchar(12) NOT NULL,
  `album_id` varchar(12) NOT NULL,
  KEY `song_id` (`song_id`),
  KEY `album_id` (`album_id`),
  CONSTRAINT `album_id` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `song_id` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `song_artist_sing` (
  `song_id` varchar(12) NOT NULL,
  `artist_id` varchar(12) NOT NULL,
  KEY `song_id_sing` (`song_id`),
  KEY `artist_id_sing` (`artist_id`),
  CONSTRAINT `artist_id_sing` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `song_id_sing` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(12) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `followers` int(11) DEFAULT 0,
  `following` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `user_artist_follow` (
  `user_id` varchar(12) NOT NULL,
  `artist_id` varchar(12) NOT NULL,
  KEY `user_id` (`user_id`),
  KEY `artist_id` (`artist_id`),
  CONSTRAINT `artist_id` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `user_playlist_create` (
  `user_id` varchar(12) NOT NULL,
  `playlist_id` varchar(12) NOT NULL,
  `date_created` date NOT NULL,
  KEY `user_id_create` (`user_id`),
  KEY `playlist_id_create` (`playlist_id`),
  CONSTRAINT `playlist_id_create` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id_create` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `user_playlist_follow` (
  `user_id` varchar(12) NOT NULL,
  `playlist_id` varchar(12) NOT NULL,
  KEY `playlist_id_follow` (`playlist_id`),
  KEY `user_id_follow` (`user_id`),
  CONSTRAINT `playlist_id_follow` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id_follow` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci; 

CREATE TABLE IF NOT EXISTS `user_song_liked` (
  `user_id` varchar(12) NOT NULL,
  `song_id` varchar(12) NOT NULL,
  KEY `user_id_liked` (`user_id`),
  KEY `song_id_liked` (`song_id`),
  CONSTRAINT `song_id_liked` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id_liked` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;