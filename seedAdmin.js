const { DatabaseSync } = require('node:sqlite');
const bcrypt = require('bcryptjs');

const db = new DatabaseSync('./dev.db');

const email = 'admin@ayamgeprek.com';
const existing = db.prepare('SELECT id FROM User WHERE email = ?').get(email);

if (!existing) {
  const password = bcrypt.hashSync('admin123', 10);
  const userId = crypto.randomUUID();
  
  db.prepare("INSERT INTO User (id, name, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))")
    .run(userId, 'Admin Toko Pusat', email, password, 'VENDOR');
    
  db.prepare("INSERT INTO VendorProfile (id, userId, shopName, isOpen, createdAt, updatedAt) VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))")
    .run(crypto.randomUUID(), userId, 'Ayam Geprek Merakyat Pusat', 1);
    
  console.log('✅ Akun admin berhasil dibuat: admin@ayamgeprek.com / admin123');
} else {
  console.log('Akun admin sudah ada.');
}
