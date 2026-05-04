const http = require("http");
const { Client } = require("pg");

const client = new Client({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client.connect()
  .then(() => console.log("DB connected"))
  .catch(err => console.log("DB error:", err));

const server = http.createServer(async (req, res) => {
  try {
    const result = await client.query("SELECT NOW()");
    res.end("DB Time: " + result.rows[0].now);
  } catch (err) {
    res.end("DB ERROR: " + err.message);
  }
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running");
});
