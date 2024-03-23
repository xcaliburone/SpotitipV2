CREATE DATABASE IF NOT EXISTS 'Spotitip2';
USE 'Spotitip2';

CREATE TABLE IF NOT EXISTS 'Pengguna' (
    `id` varchar(12) NOT NULL,
    `nama` varchar(50) NOT NULL,
    `pengikut` int(8) DEFAULT NULL,
    `mengikuti` int(8) DEFAULT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS 'Artis' (
    `id` varchar(12) NOT NULL,
    `nama` varchar(50) NOT NULL,
    `instagram` varchar(20) DEFAULT NULL,
    `twitter` varchar(20) DEFAULT NULL,
    `facebook` varchar(20) DEFAULT NULL,
    `bio` text(255) DEFAULT NULL
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS 'Lagu' (
    `id` varchar(12) NOT NULL,
    `title` varchar(50) NOT NULL,
    -- `durasi` time DEFAULT NULL,
    FOREIGN KEY (`Album_id`) REFERENCES `Album`(`id`)
);

CREATE TABLE IF NOT EXISTS 'Album' (
    `id` varchar(12) NOT NULL,
    `title` varchar(50) NOT NULL,
    `release` year NOT NULL,
    `image` varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS 'Playlist' (
    `id` varchar(12) NOT NULL,
    `nama` varchar(50) NOT NULL,
    `image` varchar(50),
    `deskripsi` varchar(255),
    FOREIGN KEY (`Kategori_id`) REFERENCES `Kategori`(`id`),
    FOREIGN KEY (`Pengguna_id`) REFERENCES `Pengguna`(`id`) 
);

CREATE TABLE IF NOT EXISTS 'Jiwa dan Pelaksanaan Ruh' (
    
)