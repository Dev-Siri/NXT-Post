import Link from "next/link";
import { login, signup } from "@/actions/users";
import { redirect } from "next/navigation";

import type { Metadata } from "next";

import useSession from "@/hooks/useSession";

import SubmitButton from "@/components/SubmitButton";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Props {
  searchParams: {
    type: "login" | "signup";
  };
}

export const metadata: Metadata = {
  title: "Login | Signup",
  openGraph: {
    title: "Login | Signup",
  },
  twitter: {
    title: "Login | Signup",
  },
};

export default function Auth({ searchParams: { type = "login" } }: Props) {
  const user = useSession();

  if (user) redirect("/");

  const inputStyles =
    "rounded-md border-2 border-gray-600 bg-dark-gray p-4 outline-none";
  const capitalizedType = `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
  const toggleType = type === "login" ? "signup" : "login";

  return (
    <article className="grid place-items-center">
      <form
        action={type === "login" ? login : signup}
        className="mt-40 flex w-11/12 flex-col gap-2 rounded-md border-2 border-gray-600 bg-black p-6"
      >
        <h1 className="text-4xl font-bold leading-loose">{capitalizedType}</h1>
        {type === "signup" && (
          <input
            className={inputStyles}
            type="text"
            name="username"
            placeholder="Username"
            maxLength={30}
            required
          />
        )}
        <input
          className={inputStyles}
          type="email"
          name="email"
          placeholder="Email"
          maxLength={255}
          required
        />
        <input
          className={inputStyles}
          type="password"
          name="password"
          placeholder="Password"
          maxLength={255}
          required
        />
        <SubmitButton
          loadingSpinner={<LoadingSpinner height={20} width={20} />}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-500 p-3.5 font-bold"
        >
          {capitalizedType}
        </SubmitButton>
        <Link
          href={`/auth?type=${toggleType}`}
          className="mt-4 w-fit text-gray-200"
        >
          {type === "login"
            ? "Already have an account?"
            : "Don't have an account?"}
          <span className="ml-1 font-bold text-white">{capitalizedType}</span>
        </Link>
      </form>
    </article>
  );
}
