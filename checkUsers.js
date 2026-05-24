const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./dev.db');
const users = db.prepare('SELECT id, email, password, role FROM User').all();
console.log(users);
