import Link from "next/link";

import type { Post, User } from "@/types";

import { getRelativeTime } from "@/utils";

type Props = Pick<Post, "title" | "subtitle" | "created_at" | "post_id"> & User;

export default function PostCard({
  title,
  subtitle,
  created_at,
  post_id,
  username,
}: Props) {
  const relativeTime = getRelativeTime(created_at);

  return (
    <Link
      href={`/post/${post_id}`}
      role="listitem"
      className="w-full rounded-md border-2 border-gray-600 bg-black p-10"
    >
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="my-4 text-gray-300">{subtitle}</p>
      <time className="text-gray-400" dateTime={created_at.toString()}>
        {relativeTime}
      </time>
      <p className="mt-4 flex w-full items-center justify-end gap-2 text-base">
        By <span className="font-bold">{username}</span>
      </p>
    </Link>
  );
}
