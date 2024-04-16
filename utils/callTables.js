const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'spotitip' });

async function getAllPlaylists() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT name FROM playlist';
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function getAllAlbums() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT title FROM album';
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function getAllArtists() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT name FROM artist';
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function getAllSongs() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT title FROM song';
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function getAllUsers() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT name FROM user';
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = { getAllPlaylists, getAllAlbums, getAllArtists, getAllSongs, getAllUsers }