// /app/utils/utils.js

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'spotitip'
});
connection.connect();

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

module.exports = { generateNewID };
