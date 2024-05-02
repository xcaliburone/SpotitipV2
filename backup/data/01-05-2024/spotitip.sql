-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2024 at 06:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spotitip`
--

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE `album` (
  `id` varchar(12) NOT NULL,
  `name` varchar(50) NOT NULL,
  `num_song` int(11) NOT NULL,
  `duration` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`id`, `name`, `num_song`, `duration`) VALUES
('AL01', 'Mahagita', 4, '00:00:00'),
('AL02', 'Banzai', 4, '00:00:00'),
('AL03', 'Theater No Megami', 1, '00:00:00'),
('AL04', 'Tadaima Renaichuu', 1, '00:00:00'),
('AL05', 'Seishun Girls', 4, '00:00:00'),
('AL06', 'Te Wo Tsunaginagara', 2, '00:00:00'),
('AL07', 'Joy Kick Tears', 1, '00:00:00'),
('AL08', 'Boku No Taiyou', 0, '00:00:00'),
('AL09', 'Dareka No Tame Ni', 2, '00:00:00'),
('AL10', 'Renai Kinshi Jourei', 3, '00:00:00'),
('AL11', 'Pajama Drive', 3, '00:00:00'),
('AL12', 'Aitakatta', 8, '00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `album_artist_has`
--

CREATE TABLE `album_artist_has` (
  `album_id` varchar(12) NOT NULL,
  `artist_id` varchar(12) NOT NULL,
  `date_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `album_artist_has`
--

INSERT INTO `album_artist_has` (`album_id`, `artist_id`, `date_created`) VALUES
('AL01', 'AR01', '2024-05-01'),
('AL02', 'AR01', '2024-05-01'),
('AL03', 'AR01', '2024-05-01'),
('AL04', 'AR01', '2024-05-01'),
('AL05', 'AR03', '2024-05-01'),
('AL06', 'AR03', '2024-05-01'),
('AL07', 'AR03', '2024-05-01'),
('AL08', 'AR03', '2024-05-01'),
('AL09', 'AR02', '2024-05-01'),
('AL10', 'AR02', '2024-05-01'),
('AL11', 'AR02', '2024-05-01'),
('AL12', 'AR02', '2024-05-01');

-- --------------------------------------------------------

--
-- Table structure for table `artist`
--

CREATE TABLE `artist` (
  `id` varchar(12) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `followers` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artist`
--

INSERT INTO `artist` (`id`, `name`, `email`, `password`, `followers`) VALUES
('AR01', 'Indira Putri Seruni', 'indiraputriseruni@gmail.com', 'seruni2604', 0),
('AR02', 'Azizi Shafaa Asadel', 'zeeshafa@gmail.com', 'zee1605', 0),
('AR03', 'Shani Indira Natio', 'shaniindiranatio@gmail.com', 'shani0510', 0),
('AR04', 'Mutiara Azzahra', 'muthe@gmail.com', 'muthe1234', 0),
('AR05', 'Marsha Lenathea', 'maeng@gmail.com', 'marsha1234', 0),
('AR06', 'Grace Octaviani', 'gracie@gmail.com', 'gracie1234', 0),
('AR07', 'Gita Sekar A', 'gita@gmail.com', 'gita1234', 0),
('AR08', 'Gabriela Abigail Mewengkang', 'ellaMewengkang@gmail.com', 'ella1234', 0),
('AR09', 'Flora Shafiq', 'duniaflora@gmail.com', 'flora1234', 0),
('AR10', 'Febriola Sinambela', 'olla@gmail.com', 'olla1234', 0),
('AR11', 'Cornelia Vanisa', 'oniel@gmail.com', 'oniel1234', 0),
('AR12', 'Jessica Chandra', 'jessinessi@gmail.com', 'jessi1234', 0),
('AR13', 'Amanda Sukma', 'amanda@gmail.com', 'amanda1234', 0),
('AR14', 'Yessica Tamara Siallagan', 'chika@gmail.com', 'chika1234', 0);

-- --------------------------------------------------------

--
-- Table structure for table `playlist`
--

CREATE TABLE `playlist` (
  `id` varchar(12) NOT NULL,
  `name` varchar(50) NOT NULL,
  `num_song` int(11) DEFAULT NULL,
  `duration` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playlist`
--

INSERT INTO `playlist` (`id`, `name`, `num_song`, `duration`) VALUES
('PL01', '2lit2quit', NULL, NULL),
('PL02', 'maybe im the problem', NULL, NULL),
('PL03', 'all too well', NULL, NULL),
('PL04', 'what for', NULL, NULL),
('PL05', 'adrenaline rush', NULL, NULL),
('PL06', 'the day that i met you', NULL, NULL),
('PL07', 'i sleep so that we can meet', NULL, NULL),
('PL08', 'im scared this is all i will be', NULL, NULL),
('PL09', 'its okay to feel sad', NULL, NULL),
('PL10', 'its not good enough for me', NULL, NULL),
('PL11', 'skripsian sambil nangis', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `song`
--

CREATE TABLE `song` (
  `id` varchar(12) NOT NULL,
  `name` varchar(50) NOT NULL,
  `genre` varchar(50) NOT NULL,
  `duration` time NOT NULL,
  `listeners` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `song`
--

INSERT INTO `song` (`id`, `name`, `genre`, `duration`, `listeners`) VALUES
('SO01', 'Eureka Milik Kita', 'pop', '00:04:00', 0),
('SO02', 'Seventeen', 'pop', '00:04:00', 0),
('SO03', 'New Ship', 'rock', '00:04:00', 0),
('SO04', 'Better', 'jazz', '00:04:00', 0),
('SO05', 'Nagiichi', 'rock', '00:04:00', 0),
('SO06', 'Musim yang Selanjutnya', 'pop', '00:04:00', 0),
('SO07', 'So long', 'pop', '00:04:00', 0),
('SO08', 'Pareo adalah Emerald', 'pop', '00:04:00', 0),
('SO09', 'Dewi Theater', 'pop', '00:04:00', 0),
('SO10', 'Love Chase', 'pop', '00:04:00', 0),
('SO11', 'Beach Sandal', 'pop', '00:04:00', 0),
('SO12', 'Ame No Doubutsuen', 'jazz', '00:04:00', 0),
('SO13', 'Yakusoku Yo', 'pop', '00:04:00', 0),
('SO14', 'Kinjirareta Futari', 'pop', '00:04:00', 0),
('SO15', 'Arah Sang Cinta & Balasannya', 'pop', '00:04:00', 0),
('SO16', 'Glory Days', 'pop', '00:04:00', 0),
('SO17', 'Seifuku No Me', 'pop', '00:04:00', 0),
('SO18', 'Tsukimisou', 'pop', '00:04:00', 0),
('SO19', 'Demi Seseorang', 'pop', '00:04:00', 0),
('SO20', 'Mawar Natal Musim Panas', 'pop', '00:04:00', 0),
('SO21', 'Sneaker Waktu Itu', 'pop', '00:04:00', 0),
('SO22', 'JKT Sanjou', 'pop', '00:04:00', 0),
('SO23', 'Shonichi', 'pop', '00:04:00', 0),
('SO24', 'Jurus Rahasia Teleport', 'pop', '00:04:00', 0),
('SO25', 'Bersepeda Berdua', 'pop', '00:04:00', 0),
('SO26', 'Namida no Shounan', 'pop', '00:04:00', 0),
('SO27', 'Ingin bertemu', 'pop', '00:04:00', 0),
('SO28', 'Cherry Tepi Pantai', 'pop', '00:04:00', 0),
('SO29', 'Peluklah Aku dari Belakang', 'pop', '00:04:00', 0),
('SO30', 'Revolusi Rio', 'pop', '00:04:00', 0),
('SO31', 'Dakedo', 'pop', '00:04:00', 0),
('SO32', 'Pintu Masa Depan', 'pop', '00:04:00', 0),
('SO33', 'Jakarta 48', 'pop', '00:04:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `song_album_contains`
--

CREATE TABLE `song_album_contains` (
  `song_id` varchar(12) NOT NULL,
  `album_id` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `song_album_contains`
--

INSERT INTO `song_album_contains` (`song_id`, `album_id`) VALUES
('SO01', 'AL01'),
('SO02', 'AL01'),
('SO03', 'AL01'),
('SO04', 'AL01'),
('SO05', 'AL02'),
('SO06', 'AL02'),
('SO07', 'AL02'),
('SO08', 'AL02'),
('SO09', 'AL03'),
('SO10', 'AL04'),
('SO11', 'AL05'),
('SO12', 'AL05'),
('SO13', 'AL05'),
('SO14', 'AL05'),
('SO15', 'AL06'),
('SO16', 'AL06'),
('SO17', 'AL07'),
('SO18', 'AL09'),
('SO19', 'AL09'),
('SO20', 'AL10'),
('SO21', 'AL10'),
('SO22', 'AL10'),
('SO23', 'AL11'),
('SO24', 'AL11'),
('SO25', 'AL11'),
('SO26', 'AL12'),
('SO27', 'AL12'),
('SO28', 'AL12'),
('SO29', 'AL12'),
('SO30', 'AL12'),
('SO31', 'AL12'),
('SO32', 'AL12'),
('SO33', 'AL12');

-- --------------------------------------------------------

--
-- Table structure for table `song_artist_sing`
--

CREATE TABLE `song_artist_sing` (
  `song_id` varchar(12) NOT NULL,
  `artist_id` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `song_artist_sing`
--

INSERT INTO `song_artist_sing` (`song_id`, `artist_id`) VALUES
('SO01', 'AR01'),
('SO02', 'AR01'),
('SO03', 'AR01'),
('SO04', 'AR01'),
('SO05', 'AR01'),
('SO06', 'AR01'),
('SO07', 'AR01'),
('SO08', 'AR01'),
('SO09', 'AR01'),
('SO10', 'AR01'),
('SO11', 'AR03'),
('SO12', 'AR03'),
('SO13', 'AR03'),
('SO14', 'AR03'),
('SO15', 'AR03'),
('SO16', 'AR03'),
('SO17', 'AR03'),
('SO18', 'AR02'),
('SO19', 'AR02'),
('SO20', 'AR02'),
('SO21', 'AR02'),
('SO22', 'AR02'),
('SO23', 'AR02'),
('SO24', 'AR02'),
('SO25', 'AR02'),
('SO26', 'AR02'),
('SO27', 'AR02'),
('SO28', 'AR02'),
('SO29', 'AR02'),
('SO30', 'AR02'),
('SO31', 'AR02'),
('SO32', 'AR02'),
('SO33', 'AR02');

-- --------------------------------------------------------

--
-- Table structure for table `song_playlist_contains`
--

CREATE TABLE `song_playlist_contains` (
  `playlist_id` varchar(12) NOT NULL,
  `song_id` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(12) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `followers` int(11) DEFAULT 0,
  `following` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `followers`, `following`) VALUES
('US01', 'adhim rahman', 'adhimrahaman@gmail.com', 'xcaliburone24', 0, 0),
('US02', 'mirsa bintang', 'mirsa@gmail.com', 'mirsa1234', 0, 0),
('US03', 'zaky haffizany', 'zaky@gmail.com', 'zaky1234', 0, 0),
('US04', 'dika arif', 'dikaarifrahman@gmail.com', 'dika1234', 0, 0),
('US05', 'dhiva arie', 'dededhiva@gmail.com', 'dede1234', 0, 0),
('US06', 'aditya pratama', 'adityapratama@gmail.com', 'adit1234', 0, 0),
('US07', 'yasid reza', 'yasid@gmail.com', 'yasid1234', 0, 0),
('US08', 'falih knalpot', 'falih@gmail.com', 'falih1234', 0, 0),
('US09', 'rifqi sentul', 'rifqijago@gmail.com', 'rifqi1234', 0, 0),
('US10', 'reza habibie', 'jabieb@gmail.com', 'jabieb1234', 0, 0),
('US11', 'Jasmine Raia Arindra', 'jasmneraia@gmail.com', 'neisrha3110', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_album_follow`
--

CREATE TABLE `user_album_follow` (
  `user_id` varchar(12) NOT NULL,
  `album_id` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_album_follow`
--

INSERT INTO `user_album_follow` (`user_id`, `album_id`) VALUES
('US01', 'AL01'),
('US01', 'AL02'),
('US01', 'AL05'),
('US01', 'AL08'),
('US01', 'AL11'),
('US01', 'AL12'),
('US11', 'AL03'),
('US11', 'AL04'),
('US11', 'AL06'),
('US11', 'AL07'),
('US11', 'AL09'),
('US11', 'AL10');

-- --------------------------------------------------------

--
-- Table structure for table `user_artist_follow`
--

CREATE TABLE `user_artist_follow` (
  `user_id` varchar(12) NOT NULL,
  `artist_id` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_artist_follow`
--

INSERT INTO `user_artist_follow` (`user_id`, `artist_id`) VALUES
('US01', 'AR02'),
('US01', 'AR07'),
('US01', 'AR08'),
('US01', 'AR09'),
('US01', 'AR10'),
('US01', 'AR11'),
('US01', 'AR13'),
('US11', 'AR01'),
('US11', 'AR03'),
('US11', 'AR04'),
('US11', 'AR05'),
('US11', 'AR06'),
('US11', 'AR12'),
('US11', 'AR14');

-- --------------------------------------------------------

--
-- Table structure for table `user_playlist_create`
--

CREATE TABLE `user_playlist_create` (
  `user_id` varchar(12) NOT NULL,
  `playlist_id` varchar(12) NOT NULL,
  `date_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_playlist_create`
--

INSERT INTO `user_playlist_create` (`user_id`, `playlist_id`, `date_created`) VALUES
('US01', 'PL01', '2024-05-01'),
('US01', 'PL02', '2024-05-01'),
('US01', 'PL03', '2024-05-01'),
('US01', 'PL04', '2024-05-01'),
('US01', 'PL05', '2024-05-01'),
('US10', 'PL10', '2024-05-01'),
('US10', 'PL11', '2024-05-01'),
('US11', 'PL06', '2024-05-01'),
('US11', 'PL07', '2024-05-01'),
('US11', 'PL08', '2024-05-01'),
('US11', 'PL09', '2024-05-01');

-- --------------------------------------------------------

--
-- Table structure for table `user_playlist_follow`
--

CREATE TABLE `user_playlist_follow` (
  `user_id` varchar(12) NOT NULL,
  `playlist_id` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_playlist_follow`
--

INSERT INTO `user_playlist_follow` (`user_id`, `playlist_id`) VALUES
('US01', 'PL06'),
('US01', 'PL07'),
('US01', 'PL08'),
('US01', 'PL09'),
('US01', 'PL10'),
('US01', 'PL11'),
('US11', 'PL01'),
('US11', 'PL02'),
('US11', 'PL03'),
('US11', 'PL04'),
('US11', 'PL05'),
('US11', 'PL07'),
('US11', 'PL10'),
('US11', 'PL11');

-- --------------------------------------------------------

--
-- Table structure for table `user_song_liked`
--

CREATE TABLE `user_song_liked` (
  `user_id` varchar(12) NOT NULL,
  `song_id` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_album_name` (`name`);

--
-- Indexes for table `album_artist_has`
--
ALTER TABLE `album_artist_has`
  ADD UNIQUE KEY `unique_album_artist_has` (`album_id`,`artist_id`),
  ADD KEY `album_id_has` (`album_id`),
  ADD KEY `artist_id_has` (`artist_id`);

--
-- Indexes for table `artist`
--
ALTER TABLE `artist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_artist_name` (`name`);

--
-- Indexes for table `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_playlist_name` (`name`);

--
-- Indexes for table `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_song_name` (`name`),
  ADD KEY `idx_song_genre` (`genre`);

--
-- Indexes for table `song_album_contains`
--
ALTER TABLE `song_album_contains`
  ADD UNIQUE KEY `unique_song_album_contains` (`song_id`,`album_id`),
  ADD KEY `song_id_contains_album` (`song_id`),
  ADD KEY `album_id_contains` (`album_id`);

--
-- Indexes for table `song_artist_sing`
--
ALTER TABLE `song_artist_sing`
  ADD UNIQUE KEY `unique_song_artist_sing` (`song_id`,`artist_id`),
  ADD KEY `song_id_sing` (`song_id`),
  ADD KEY `artist_id_sing` (`artist_id`);

--
-- Indexes for table `song_playlist_contains`
--
ALTER TABLE `song_playlist_contains`
  ADD UNIQUE KEY `unique_song_playlist_contains` (`playlist_id`,`song_id`),
  ADD KEY `playlist_id_contains` (`playlist_id`),
  ADD KEY `song_id_contains_playlist` (`song_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_name` (`name`);

--
-- Indexes for table `user_album_follow`
--
ALTER TABLE `user_album_follow`
  ADD UNIQUE KEY `unique_user_album_follow` (`user_id`,`album_id`),
  ADD KEY `user_id_follow_playlist` (`user_id`),
  ADD KEY `album_id_follow` (`album_id`);

--
-- Indexes for table `user_artist_follow`
--
ALTER TABLE `user_artist_follow`
  ADD UNIQUE KEY `unique_user_artist_follow` (`user_id`,`artist_id`),
  ADD KEY `user_id_follow_artist` (`user_id`),
  ADD KEY `artist_id_follow` (`artist_id`);

--
-- Indexes for table `user_playlist_create`
--
ALTER TABLE `user_playlist_create`
  ADD UNIQUE KEY `unique_user_playlist_create` (`user_id`,`playlist_id`),
  ADD KEY `user_id_create` (`user_id`),
  ADD KEY `playlist_id_create` (`playlist_id`);

--
-- Indexes for table `user_playlist_follow`
--
ALTER TABLE `user_playlist_follow`
  ADD UNIQUE KEY `unique_user_playlist_follow` (`user_id`,`playlist_id`),
  ADD KEY `user_id_follow_playlist` (`user_id`),
  ADD KEY `playlist_id_follow` (`playlist_id`);

--
-- Indexes for table `user_song_liked`
--
ALTER TABLE `user_song_liked`
  ADD UNIQUE KEY `unique_user_song_liked` (`user_id`,`song_id`),
  ADD KEY `user_id_liked` (`user_id`),
  ADD KEY `song_id_liked` (`song_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `album_artist_has`
--
ALTER TABLE `album_artist_has`
  ADD CONSTRAINT `album_id_has` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `artist_id_has` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `song_album_contains`
--
ALTER TABLE `song_album_contains`
  ADD CONSTRAINT `album_id_contains` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `song_id_contains_album` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `song_artist_sing`
--
ALTER TABLE `song_artist_sing`
  ADD CONSTRAINT `artist_id_sing` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `song_id_sing` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `song_playlist_contains`
--
ALTER TABLE `song_playlist_contains`
  ADD CONSTRAINT `playlist_id_contains` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `song_id_contains_playlist` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_album_follow`
--
ALTER TABLE `user_album_follow`
  ADD CONSTRAINT `album_id_follow` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_id_follow_album` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_artist_follow`
--
ALTER TABLE `user_artist_follow`
  ADD CONSTRAINT `artist_id_follow` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_id_follow_artist` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_playlist_create`
--
ALTER TABLE `user_playlist_create`
  ADD CONSTRAINT `playlist_id_create` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_id_create` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_playlist_follow`
--
ALTER TABLE `user_playlist_follow`
  ADD CONSTRAINT `playlist_id_follow` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_id_follow_playlist` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_song_liked`
--
ALTER TABLE `user_song_liked`
  ADD CONSTRAINT `song_id_liked` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_id_liked` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
