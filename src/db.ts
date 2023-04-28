import pg from "pg";

const pgClient = new pg.Client({
  user: "user1",
  password: "password",
  host: "localhost",
  database: "checklists_app",
  port: 5432,
});

export { pgClient };
