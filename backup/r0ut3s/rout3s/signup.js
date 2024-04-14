// /app/routes/signup.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
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

    res.render('signup', { errorMessage });
});

module.exports = router;
