"use server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";

import type { User } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    !email ||
    !password ||
    email instanceof Blob ||
    password instanceof Blob ||
    email.length > 255 ||
    password.length > 255
  )
    return;

  try {
    const users = await sql<User>`
      SELECT * FROM Users
      WHERE email = ${email}
      LIMIT 1;
    `;

    if (!users.rowCount) throw new Error("User doesn't exist.");

    const user = users.rows[0];

    const passwordsMatch = bcrypt.compareSync(password, user.password);

    if (!passwordsMatch) throw new Error("Passwords don't match.");

    const authToken = jwt.sign(user, process.env.JWT_SECRET_KEY!);

    cookies().set("auth_token", authToken);

    revalidatePath("/auth");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function signup(formData: FormData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    !username ||
    !email ||
    !password ||
    username instanceof Blob ||
    email instanceof Blob ||
    password instanceof Blob ||
    username.length > 30 ||
    email.length > 255 ||
    password.length > 255
  )
    return;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const userID = crypto.randomUUID();

    const user = {
      user_id: userID,
      username,
      email,
      password: hashedPassword,
    };

    await sql`
      INSERT INTO Users(user_id, username, email, password)
      VALUES (
        ${userID},
        ${username},
        ${email},
        ${hashedPassword}
      );
    `;

    const token = jwt.sign(user, process.env.JWT_SECRET_KEY!);
    cookies().set("auth_token", token);

    revalidatePath("/auth");
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

export async function logout() {
  cookies().set("auth_token", "");

  revalidatePath("/auth");
  redirect("/auth");
}
