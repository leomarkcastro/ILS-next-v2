import { useSession } from "next-auth/react";

export default function GhostOnly({ children }) {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return children;
  } else {
    return null;
  }
}
