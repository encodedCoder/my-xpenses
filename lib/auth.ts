import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUserId(): Promise<string> {
  const session = await getSession();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }
  return session.user.email;
}
