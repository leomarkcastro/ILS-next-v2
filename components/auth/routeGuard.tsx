import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ALLOWED_ROUTES = [/^\/auth/, /^\/exam$/, /^\/$/, /^\/about$/];
// const ALLOWED_ROUTES = ["/auth/signin", "/"];

const USER_PERSISTENCE_ROUTES = [/^\/exam/, /^\/profile/, /^\/auth/];

export function RouteGuard({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // console.log(router.asPath);
    // console.log(session);
    if (
      session?.role == "USER" &&
      status === "authenticated" &&
      !USER_PERSISTENCE_ROUTES.some((route) => route.test(router.asPath))
    ) {
      signOut({
        // callbackUrl: "/",
        redirect: false,
      });

      // router.replace("/");
    }
    // console.log(
    //   status === "authenticated" &&
    //     !USER_PERSISTENCE_ROUTES.some((route) => route.test(router.asPath))
    // );

    if (
      status === "unauthenticated" &&
      !ALLOWED_ROUTES.some((route) => route.test(router.asPath))
    ) {
      router.replace("/auth/signin");
    }
  }, [status, router, session]);

  if (status === "loading") {
    return <p></p>;
  }

  if (
    status === "unauthenticated" &&
    !ALLOWED_ROUTES.some((route) => route.test(router.asPath))
  ) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center">
        <p>Access Denied</p>
        <Link href="/auth/signin">
          <a className="text-blue-500">Log In</a>
        </Link>
      </div>
    );
  }

  return children;
}
