const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // Lakukan verifikasi login di sini
    const { email, password } = req.body;
    // Contoh validasi sederhana
    if (email === 'user@example.com' && password === 'password') {
        res.redirect('/login');
    } else {
        res.redirect('/'); // Redirect jika login gagal
    }
});

module.exports = router;
