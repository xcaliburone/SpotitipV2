// /app/controllers/signupController.js

const { generateNewID } = require('../utils/utils');
const { checkIfEmailExists, checkIfUsernameExists } = require('../models/user'); // Sesuaikan dengan implementasi Anda

exports.signup = async (req, res) => {
    const { name, email, password, registerAs } = req.body;

    try {
        // Periksa apakah email atau username sudah ada dalam tabel
        const emailExists = await checkIfEmailExists(email);
        const usernameExists = await checkIfUsernameExists(name);

        if (emailExists || usernameExists) {
            // Jika email atau username sudah ada, kirimkan respons ke pengguna
            res.redirect('/signup?error=duplicate');
            return;
        }

        // Jika email dan username belum ada, lanjutkan dengan menambahkan data baru ke database
        const tableName = registerAs === "user" ? "user" : "artist";
        const newId = await generateNewID(tableName, registerAs);
        const sql = `INSERT INTO ${tableName} (id, name, email, password) VALUES (?, ?, ?, ?)`;
        connection.query(sql, [newId, name, email, password], (err, result) => {
            if (err) {
                console.error(`Error during signup ${registerAs}:`, err);
                res.redirect(`/signup?error=${registerAs}`);
            } else {
                console.log(`New ${registerAs} registered:`, newId);
                res.redirect('/main'); // Redirect to main or dashboard page
            }
        });
    } catch (error) {
        console.error("Error during sign up:", error);
        res.redirect('signup');
    }
};