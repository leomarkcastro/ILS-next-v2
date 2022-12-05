import { useSession } from "next-auth/react";

export default function AdminOnly({ children }) {
  const { data: session } = useSession();

  if (session?.role === "ADMIN") {
    return children;
  } else {
    return null;
  }
}
