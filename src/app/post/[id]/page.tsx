import { notFound } from "next/navigation";
import { sql } from "@vercel/postgres";
import hljs from "highlight.js";
import { lazy } from "react";
import { Remarkable } from "remarkable";

import type { Post, User } from "@/types";
import type { Metadata } from "next";

import { likePost } from "@/actions/posts";

import { FcLike } from "@react-icons/all-files/fc/FcLike";
import LoadingSpinner from "@/components/LoadingSpinner";

const SubmitButton = lazy(() => import("@/components/SubmitButton"));

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: Props) {
  const posts = await sql<
    Omit<Post, "post_id"> & Pick<User, "email" | "password">
  >`SELECT p.title, p.subtitle FROM Posts p
    WHERE p.post_id = ${id}
    LIMIT 1
  ;`;

  if (!posts.rowCount) notFound();

  const [{ title, subtitle }] = posts.rows;

  return {
    title,
    description: subtitle,
    openGraph: {
      title,
      description: subtitle,
    },
    twitter: {
      title,
      description: subtitle,
    },
  } satisfies Metadata;
}

export default async function Post({ params: { id } }: Props) {
  const posts = await sql<
    Omit<Post, "post_id"> & Pick<User, "email" | "password">
  >`
    SELECT
      p.title,
      p.subtitle,
      p.created_at,
      p.content,
      (SELECT COUNT(*) FROM Likes WHERE post_id = p.post_id) AS likes,
      u.username,
      u.user_id
    FROM Posts p
    LEFT JOIN Users u ON u.user_id = p.user_id
    WHERE p.post_id = ${id}
    LIMIT 1
  ;`;

  if (!posts.rowCount) notFound();

  const [{ title, subtitle, content, likes }] = posts.rows;

  const md = new Remarkable({
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang))
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (error) {
          console.error(error);
        }

      try {
        return hljs.highlightAuto(str).value;
      } catch (error) {
        console.error(error);
      }

      return "";
    },
  });
  const processedContent = md.render(content);

  return (
    <section className="flex flex-col p-10 pt-24">
      <h1 className="text-5xl font-bold leading-loose">{title}</h1>
      <h2 className="ml-1 text-2xl">{subtitle}</h2>
      <div
        className="mt-4 rounded-md border-2 border-gray-600 p-4"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
      <form action={likePost}>
        <input name="postId" value={id} type="hidden" />
        <SubmitButton
          loadingSpinner={<LoadingSpinner height={20} width={20} />}
          className="mt-4 flex items-center gap-2 rounded-md border-2 border-gray-600 bg-black p-4 font-bold"
          type="submit"
        >
          <FcLike />
          {likes} Likes
        </SubmitButton>
      </form>
    </section>
  );
}
