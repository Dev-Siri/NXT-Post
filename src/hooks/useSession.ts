import { cookies } from "next/headers";
import jwtDecode from "jwt-decode";

import type { User } from "@/types";

export default function useSession() {
  const authToken = cookies().get("auth_token")?.value;

  if (authToken) return jwtDecode<User>(authToken);
}
