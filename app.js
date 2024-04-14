const express = require('express');
const app = express();
const port = 3031;

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'spotitip'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

// app.get('/signup', (req, res) => {
//     res.render('signup');
// });

app.get('/main', (req, res) => {
    res.render('main');
});

// Middleware untuk menangani rute login
app.post('/login', (req, res) => {
    // Lakukan verifikasi login di sini
    const { email, password } = req.body;
    // Contoh validasi sederhana
    if (email === 'user@example.com' && password === 'password') {
        res.redirect('main');
    } else {
        res.redirect('/'); // Redirect jika login gagal
    }
});

// Fungsi untuk menghasilkan ID baru sesuai pola yang diberikan
function generateNewID(table, type) {
    return new Promise((resolve, reject) => {
        const prefix = type === "user" ? "US" : "AR";
        const sql = `SELECT MAX(id) AS maxId FROM ${table} WHERE id LIKE '${prefix}%'`;
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                let maxId = result[0].maxId;
                if (!maxId) {
                    maxId = prefix + '0';
                }
                const prefixLength = prefix.length;
                const numericPart = parseInt(maxId.slice(prefixLength), 10);
                const newId = prefix + (numericPart + 1);
                resolve(newId);
            }
        });
    });
}

// Middleware untuk menangani rute sign up
app.post('/signup', async (req, res) => {
    const { name, email, password, registerAs } = req.body;

    if (registerAs === "user" || registerAs === "artist") {
        try {
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
            console.error("Error generating new ID:", error);
            res.redirect('/signup');
        }
    } else {
        res.redirect('/signup');
    }
});

app.get('/signup', (req, res) => {
    const { error } = req.query;
    let errorMessage = "";
    if (error === "user") {
        errorMessage = "Failed to sign up as a user. Please try again.";
    } else if (error === "artist") {
        errorMessage = "Failed to sign up as an artist. Please try again.";
    }
    res.render('signup', { errorMessage });
});


app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1>404</h1>')
});

// Server listening
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
