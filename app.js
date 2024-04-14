const express = require('express');
const app = express();
const port = 3000; // Port yang akan digunakan

// Middleware untuk meng-handle body dalam format JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk menyajikan file statis seperti HTML, CSS, dan JavaScript
app.use(express.static('public'));

// Middleware untuk menangani rute login
app.post('/login', (req, res) => {
    // Lakukan verifikasi login di sini
    const { email, password } = req.body;
    // Contoh validasi sederhana
    if (email === 'user@example.com' && password === 'password') {
        res.redirect('/main.html');
    } else {
        res.redirect('/index.html'); // Redirect jika login gagal
    }
});

// Middleware untuk menangani rute sign up
app.post('/signup', (req, res) => {
    // Lakukan proses sign up di sini
    const { name, email, password, registerAs } = req.body;
    // Contoh penyimpanan data sederhana
    console.log(`New user: ${name}, ${email}, ${password}, ${registerAs}`);
    res.redirect('/index.html'); // Redirect setelah sign up
});

// Server listening
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
