-- semua syntax sampah

-- SHOW VARIABLES LIKE "secure_file_priv";

-- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

CREATE INDEX emailuser_idx ON pengguna (email_user);

CREATE INDEX namaakun_idx ON pengguna (nama_akun);

SHOW INDEX FROM pengguna;

drop index namaakun_idx on pengguna;

SET profiling=1;

SHOW PROFILES;

EXPLAIN SELECT * FROM pengguna WHERE nama_akun = 'adhimrahmann';

-- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

INSERT INTO `user` (`id`, `name`, `email`, `password`, `followers`, `following`) VALUES
('US1', 'adhim', 'adhim@gmail.com', 'asadsa211', '211', '111'),
('US2', 'adhi', 'adhi@gmail.com', 'asadsasss211', '111', '211');

INSERT INTO `artist` (`id`, `name`, `email`, `password`, `followers`) VALUES
('AR1', 'ipat', 'ipat@gmail.com', 'ipattt1223', '311'),
('AR2', 'jacob', 'jacob@gmail.com', 'asadasffefeas211', '333');

INSERT IGNORE INTO `user_artist_follow` (`user_id`, `artist_id`) VALUES
('US1', 'AR1'),
('US1', 'AR2'),
('US2', 'AR1'),
('US2', 'AR2');

CREATE INDEX noresi_idx ON pemesanan (no_resi);

SELECT * FROM pemesanan;

SHOW INDEX FROM pemesanan;

EXPLAIN SELECT * FROM pengguna;

CREATE INDEX user_idx ON pengguna (nama_akun);

SHOW `spotitip v2`;

CREATE TABLE IF NOT EXISTS `album_artist_has` (
  `album_id` varchar(12) NOT NULL,
  `artist_id` varchar(12) NOT NULL,
  `release` date NOT NULL,
  KEY `album_id_has` (`album_id`),
  KEY `artist_id_has` (`artist_id`),
  CONSTRAINT `album_id_has` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `artist_id_has` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `user_artist_follow` (
  `user_id` varchar(12) NOT NULL,
  `artist_id` varchar(12) NOT NULL,
  KEY `user_id_follow_ar` (`user_id`),
  KEY `artist_id_follow` (`artist_id`),
  CONSTRAINT `artist_id_follow` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id_follow_ar` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `user_artist_follow` (
  `user_id` varchar(12) NOT NULL,
  `artist_id` varchar(12) NOT NULL,
  UNIQUE KEY `unique_follow` (`user_id`, `artist_id`),
  KEY `user_id_follow_ar` (`user_id`),
  KEY `artist_id_follow` (`artist_id`),
  CONSTRAINT `artist_id_follow` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id_follow_ar` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

test trashs