"use server";
import { sql } from "@vercel/postgres";

import useSession from "@/hooks/useSession";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const subtitle = formData.get("subtitle");
  const content = formData.get("content");

  const user = useSession();

  if (
    !title ||
    !subtitle ||
    !content ||
    !user ||
    title instanceof Blob ||
    subtitle instanceof Blob ||
    content instanceof Blob ||
    title.length > 60 ||
    subtitle.length > 100
  )
    return;

  const postID = crypto.randomUUID();

  try {
    await sql`INSERT INTO Posts(post_id, title, subtitle, content, user_id)
      VALUES (
        ${postID},
        ${title},
        ${subtitle},
        ${content},
        ${user.user_id}
      );`;

    redirect("/");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function likePost(formData: FormData) {
  const postId = formData.get("postId");
  const user = useSession();

  if (!postId || !user || postId instanceof Blob || postId.length !== 36)
    return;

  try {
    await sql`INSERT INTO Likes(user_id, post_id)
        VALUES (
          ${user.user_id},
          ${postId}
        );`;

    revalidatePath(`/post/${postId}`);
  } catch (error) {
    console.error(error);
  }
}
