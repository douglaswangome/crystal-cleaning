const { Pool } = require("pg");
require("dotenv").config({ path: "../.env" });

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "postgres",
	username: "postgres",
	port: 5432,
	password: process.env.PSQL_PASSWORD,
});

module.exports = { pool };
