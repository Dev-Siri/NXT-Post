import { sql } from "@vercel/postgres";

export async function up() {
  await sql`
    CREATE TABLE Posts (
      post_id CHAR(36) PRIMARY KEY,
      title VARCHAR(60),
      subtitle VARCHAR(100),
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES Users(user_id)
    );

    CREATE TABLE Likes (
      user_id CHAR(36) REFERENCES Users(user_id),
      post_id CHAR(36) REFERENCES Posts(post_id),
      PRIMARY KEY (user_id, post_id)
    );
  `;
}

export async function down() {
  await sql`
    DROP TABLE IF EXISTS Posts;
    DROP TABLE IF EXISTS Likes;
  `;
}
