import { Client } from "pg";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Fix typo in env var name
const dbURL = process.env.POSTGRES_URL;

const pgClient = new Client({
  connectionString: dbURL,
});

async function main() {
  try {
    await pgClient.connect();
    console.log("Connected to Postgres ✅");
  } catch (err) {
    console.error("Error connecting to Postgres:", err);
    process.exit(1);
  }
}

main();

// ✅ Safer signup route
app.post("/signup", async (req, res) => {
  const { id, username, password, age } = req.body;

  try {
    const query = `
      INSERT INTO users (id, username, password, age)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [id, username, password, age];
    const response = await pgClient.query(query, values);

    return res.status(201).json({
      msg: "User added successfully",
      user: response.rows[0],
    });
  } catch (err) {
    console.error("Error inserting user:", err);
    return res.status(500).json({ error: "Database error" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server started on http://localhost:3000");
});
