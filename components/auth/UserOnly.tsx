import { useSession } from "next-auth/react";

export default function UserOnly({ children }) {
  const { data: session } = useSession();

  if (session?.role === "USER") {
    return children;
  } else {
    return null;
  }
}
