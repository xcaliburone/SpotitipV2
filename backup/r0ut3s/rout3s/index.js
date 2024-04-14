const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController'); // Import file signupController.js

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/main', (req, res) => {
    res.render('main');
})

router.post('/signup', signupController.signup); // Tambahkan rute untuk signup dan arahkan ke fungsi signupController.signup

router.get('/login', (req, res) => {
    // Lakukan verifikasi login di sini
    const { email, password } = req.body;
    // Contoh validasi sederhana
    if (email === 'user@example.com' && password === 'password') {
        res.redirect('/login');
    } else {
        res.redirect('/'); // Redirect jika login gagal
    }
})

router.get('/signup', (req, res) => {
    const { error } = req.query;
    let errorMessage = "";

    // Tambahkan kondisi untuk menangani kasus error = duplicate
    if (error === "duplicate") {
        errorMessage = "Email or username already exists.";
    } else if (error === "user") {
        errorMessage = "Failed to sign up as a user. Please try again.";
    } else if (error === "artist") {
        errorMessage = "Failed to sign up as an artist. Please try again.";
    }

    res.render('signup');
})

module.exports = router;