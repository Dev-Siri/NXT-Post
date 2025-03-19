import Link from "next/link";

import useSession from "@/hooks/useSession";
import { logout } from "@/actions/users";

import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";

export default function Navbar() {
  const user = useSession();

  return (
    <nav className="fixed flex w-screen items-center border-b-2 border-b-gray-600 bg-black p-2">
      <Link
        href="/"
        className="w-fit rounded-md border-2 border-gray-600 bg-black p-4 px-10 text-2xl font-bold"
      >
        NXT Post
      </Link>
      {user ? (
        <>
          <section className="ml-auto mr-2 flex items-center gap-4">
            <p className="flex flex-col items-end">
              <span className="font-bold">{user.username}</span>
              <span className="text-sm text-gray-400">{user.email}</span>
            </p>
            <Link
              href="/create"
              className="flex items-center gap-2 rounded-md bg-blue-500 p-4 px-6"
            >
              <AiOutlinePlus size={22} />
              <p>Create</p>
            </Link>
            <form action={logout}>
              <button type="submit" aria-label="Logout">
                <FiLogOut color="red" size={20} />
              </button>
            </form>
          </section>
        </>
      ) : (
        <Link
          href="/auth"
          className="ml-auto mr-2 flex h-[90%] items-center rounded-md bg-blue-500 px-10 py-4"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
}
