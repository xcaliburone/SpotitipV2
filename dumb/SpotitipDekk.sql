CREATE DATABASE IF NOT EXISTS 'SpotitipV2';
USE 'SpotitipV2';

CREATE TABLE IF NOT EXISTS `Artist` (
    `id` VARCHAR(12) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `instagram` VARCHAR(50) DEFAULT NULL,
    `facebook` VARCHAR(50) DEFAULT NULL,
    `twitter` VARCHAR(50) DEFAULT NULL,
    `wikipedia` VARCHAR(50) DEFAULT NULL,
    `bio` TEXT(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Album` (
    `id` VARCHAR(12) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `release` YEAR NOT NULL,
    `image` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Song` (
    `id` VARCHAR(12) NOT NULL,
    `album_id` VARCHAR(50) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `duration` INT(50) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`album_id`) REFERENCES `Album`(`id`)
);

CREATE TABLE IF NOT EXISTS `Playlist` (
    `id` VARCHAR(12) NOT NULL,
    `name` VARCHAR NOT NULL,
    `description` TEXT,
    `image` VARCHAR(50),
    `category_id` VARCHAR(50),
    `user_id` VARCHAR(12),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`category_id`) REFERENCES `PlaylistCategory`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `User`(`id`)
);

CREATE TABLE IF NOT EXISTS `User` (
    `id` VARCHAR PRIMARY KEY,
    `email` VARCHAR NOT NULL,
    `name` VARCHAR NOT NULL,
    `birthday` DATE
);

CREATE TABLE IF NOT EXISTS `User_Artist_Follow` (
    `user_id` VARCHAR,
    `artist_id` VARCHAR,
    PRIMARY KEY (user_id, artist_id),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (artist_id) REFERENCES Artist(id)
);

CREATE TABLE IF NOT EXISTS `User_Song_Liked` (
    `user_id` VARCHAR,
    `song_id` VARCHAR,
    PRIMARY KEY (user_id, song_id),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (song_id) REFERENCES Song(id)
);

CREATE TABLE IF NOT EXISTS `User_Playlist_Follow` (
    `user_id` VARCHAR,
    `playlist_id` VARCHAR,
    PRIMARY KEY (user_id, playlist_id),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (playlist_id) REFERENCES Playlist(id)
);

CREATE TABLE IF NOT EXISTS `User_Playlist_Create` (
    `user_id` VARCHAR,
    `playlist_id` VARCHAR,
    PRIMARY KEY (user_id, playlist_id),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (playlist_id) REFERENCES Playlist(id)
);

CREATE TABLE IF NOT EXISTS `Playlist_Song_Contains` (
    `playlist_id` VARCHAR,
    `song_id` VARCHAR,
    PRIMARY KEY (playlist_id, song_id),
    FOREIGN KEY (playlist_id) REFERENCES Playlist(id),
    FOREIGN KEY (song_id) REFERENCES Song(id)
);
