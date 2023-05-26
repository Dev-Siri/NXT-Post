import lazy from "next/dynamic";

import type { Metadata } from "next";

import { createPost } from "@/actions/posts";
import LoadingSpinner from "@/components/LoadingSpinner";

const SubmitButton = lazy(() => import("@/components/SubmitButton"));

export const metadata: Metadata = {
  title: "Create Post",
  openGraph: {
    title: "Create Post",
  },
  twitter: {
    title: "Create Post",
  },
};

export default function Create() {
  return (
    <form action={createPost} className="flex flex-col p-10 pt-24">
      <h1 className="text-5xl font-bold leading-relaxed">Create a Post</h1>
      <input
        type="text"
        name="title"
        placeholder="Title"
        maxLength={60}
        className="mt-2 rounded-md border-2 border-gray-600 bg-black p-4 text-4xl outline-none"
        required
      />
      <input
        type="text"
        name="subtitle"
        placeholder="Sub Title"
        maxLength={100}
        className="mt-2 rounded-md border-2 border-gray-600 bg-black p-4 outline-none"
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        className="mt-2 h-96 resize-none rounded-md border-2 border-gray-600 bg-black p-4 pt-4 font-mono outline-none"
        required
      />
      <SubmitButton
        loadingSpinner={<LoadingSpinner height={20} width={20} />}
        className="mt-4 flex items-center justify-center gap-2 rounded-md bg-blue-500 p-4"
      >
        Create Post
      </SubmitButton>
    </form>
  );
}
