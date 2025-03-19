import Link from "next/link";
import { sql } from "@vercel/postgres";

import type { Post, User } from "@/types";

import PostCard from "@/components/PostCard";

interface Props {
  searchParams: {
    page: number;
  };
}

export default async function Home({ searchParams: { page = 1 } }: Props) {
  const postLimit = 8;
  const pageNumber = Number(page);
  const offset = (pageNumber - 1) * postLimit;

  const posts = await sql<
    Pick<Post, "title" | "subtitle" | "created_at" | "post_id"> & User
  >`SELECT p.title, p.subtitle, p.created_at, p.post_id, u.username, u.user_id
    FROM Posts p
    LEFT JOIN Users u ON u.user_id = p.user_id
    ORDER BY p.created_at DESC
    LIMIT ${postLimit} OFFSET ${offset}
  ;`;

  return (
    <section className="flex flex-col gap-10 p-10 pt-32">
      {posts.rows.map((post) => (
        <PostCard key={post.post_id} {...post} />
      ))}
      <div className="flex justify-between">
        <Link
          className="rounded-md bg-purple-600 p-4"
          href={`/?page=${pageNumber === 1 ? 1 : pageNumber - 1}`}
        >
          Previous Page
        </Link>
        <Link
          className="rounded-md bg-blue-600 p-4"
          href={`/?page=${pageNumber + 1}`}
        >
          Next Page
        </Link>
      </div>
    </section>
  );
}
