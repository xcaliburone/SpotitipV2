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

USE tugas;

INSERT IGNORE INTO `pemesanan` (`no_resi`, `nama_pemesan`, `pesanan`) VALUES
	(311001, 'Rifqi', 'Boneka'),
	(481048, 'Dean', 'Meja Belajar'),
	(678912, 'Dika', 'Laptop Gaming');

CREATE INDEX noresi_idx ON pemesanan (no_resi);

SELECT * FROM pemesanan;

SHOW INDEX FROM pemesanan;

EXPLAIN SELECT * FROM pengguna;

CREATE INDEX user_idx ON pengguna (nama_akun);