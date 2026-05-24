const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./dev.db');
const users = db.prepare('SELECT id, name, email, role, createdAt FROM User').all();
console.log(JSON.stringify(users, null, 2));
