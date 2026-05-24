const { createClient } = require("@libsql/client");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
require("dotenv").config();

async function main() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error("Missing DATABASE_URL or TURSO_AUTH_TOKEN in .env");
    process.exit(1);
  }

  const client = createClient({ url, authToken });

  const email = 'admin@ayamgeprek.com';
  
  // Check if admin exists
  const existing = await client.execute({
    sql: 'SELECT id FROM "User" WHERE email = ?',
    args: [email]
  });

  if (existing.rows.length === 0) {
    const password = bcrypt.hashSync('admin123', 10);
    const userId = crypto.randomUUID();
    
    // Insert User
    await client.execute({
      sql: 'INSERT INTO "User" (id, name, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, datetime(\'now\'), datetime(\'now\'))',
      args: [userId, 'Admin Toko Pusat', email, password, 'VENDOR']
    });
      
    // Insert VendorProfile
    await client.execute({
      sql: 'INSERT INTO "VendorProfile" (id, userId, shopName, isOpen, createdAt, updatedAt) VALUES (?, ?, ?, ?, datetime(\'now\'), datetime(\'now\'))',
      args: [crypto.randomUUID(), userId, 'Ayam Geprek Merakyat Pusat', 1]
    });
      
    console.log('✅ Akun admin berhasil dibuat di Turso: admin@ayamgeprek.com / admin123');
  } else {
    console.log('Akun admin sudah ada di Turso.');
  }
}

main().catch(console.error);
