<?php

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        // Ambil data yang dikirim dari form
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Lakukan koneksi ke database
        $servername = "localhost"; // Ganti dengan nama server Anda jika tidak menggunakan localhost
        $username = "root"; // Ganti dengan nama pengguna database Anda
        $password_db = ""; // Ganti dengan kata sandi database Anda
        $database = "spotitip"; // Ganti dengan nama database Anda

        // Buat koneksi
        $con = new mysqli($servername, $username, $password_db, $database);

        // Periksa koneksi
        if ($con->connect_error) {
            die("Koneksi gagal: " . $con->connect_error);
        }

        // Query untuk mencari user berdasarkan email dan password
        $sql = "SELECT * FROM user WHERE email='$email' AND password='$password'";
        $result = $con->query($sql);

        if ($result->num_rows > 0) {
            // Jika ditemukan, arahkan ke halaman utama
            header("Location: ./src/html/index.html");
            exit;
        } else {
            echo "Email atau password salah";
        }

        $con->close();
    }
?>
