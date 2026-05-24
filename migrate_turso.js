const { createClient } = require("@libsql/client");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error("Missing DATABASE_URL or TURSO_AUTH_TOKEN in .env");
    process.exit(1);
  }

  const client = createClient({
    url,
    authToken,
  });

  console.log("Reading migration.sql...");
  let sql = "";
  try {
    sql = fs.readFileSync("./migration.sql", "utf16le");
    if (!sql.includes("CREATE TABLE")) {
       sql = fs.readFileSync("./migration.sql", "utf8");
    }
  } catch (err) {
    console.error("Failed to read migration.sql", err);
    process.exit(1);
  }

  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  console.log(`Found ${statements.length} statements to execute.`);

  for (const stmt of statements) {
    try {
      await client.execute(stmt);
      console.log("Executed successfully:", stmt.substring(0, 50) + "...");
    } catch (e) {
      console.error("Error executing statement:", stmt.substring(0, 50) + "...");
      console.error(e.message);
    }
  }

  console.log("Migration complete!");
}

main();
