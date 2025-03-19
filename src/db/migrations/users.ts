import { sql } from "@vercel/postgres";

export async function up() {
  await sql`
    CREATE TABLE Users (
      user_id CHAR(36) PRIMARY KEY,
      username VARCHAR(30),
      email VARCHAR(255) UNIQUE NOT NULL,
      password CHAR(60)
    );
  `;
}

export async function down() {
  await sql`
    DROP TABLE IF EXISTS Users;
  `;
}
