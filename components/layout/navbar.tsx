import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const session = useSession();

  const [onTop, setOnTop] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  function handleScroll() {
    // Your scroll handling here
    if (window.scrollY > 10 && onTop) {
      setOnTop(false);
    } else {
      setOnTop(true);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // console.log(session);
  const routes = [
    {
      path: "/",
      name: "Home",
    },

    ...(session.data?.role === "ADMIN"
      ? [
          {
            path: "/classroom",
            name: "Admin",
          },
        ]
      : [
          {
            path: "/exam",
            name: "Exam",
          },
        ]),

    ...(false && session.data
      ? [
          {
            path: "/profile",
            name: "Profile",
          },
        ]
      : []),
    {
      path: "/about",
      name: "About",
    },
  ];

  return (
    <div
      className={`grid grid-cols-3 fixed top-0 w-full z-10 animate__animated animate__fadeInDown transition-all pt-8 p-3 px-5 text-lg ${
        !onTop && "bg-white pt-3 shadow-md z-50"
      }`}
    >
      <div className="">
        <p>ILS</p>
      </div>
      <div className="hidden grid-cols-2 col-span-2 lg:grid">
        <nav className="flex-1">
          <ul className="flex items-center justify-center w-full gap-8">
            {routes.map((route) => {
              return (
                <li
                  key={route.path}
                  onClick={() => {
                    // console.log("/c");
                    setShowMenu(false);
                  }}
                >
                  <Link href={route.path}>
                    <a className="text-black transition-colors hover:text-orange-600">
                      {route.name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex justify-end flex-1 gap-4">
          {session.data ? (
            <button
              className="text-black transition-colors hover:text-orange-600"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          ) : (
            <button
              className="text-black transition-colors hover:text-orange-600"
              onClick={() => router.push("/auth/signin")}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      <div className="block col-span-2 lg:hidden">
        <div className="flex justify-end">
          <button onClick={() => setShowMenu(!showMenu)}>Menu</button>
        </div>
        <div
          className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen transition-all duration-500 ease-in-out bg-white"
          style={{
            transform: showMenu ? "translateY(0)" : "translateY(-100%)",
          }}
        >
          <ul className="flex flex-col items-center justify-center w-full gap-8">
            {routes.map((route) => {
              return (
                <li
                  key={route.path}
                  onClick={() => {
                    // console.log("/c");
                    setShowMenu(false);
                  }}
                >
                  <Link href={route.path}>
                    <a className="text-black transition-colors hover:text-orange-600">
                      {route.name}
                    </a>
                  </Link>
                </li>
              );
            })}
            {session.data ? (
              <li>
                <button
                  className="text-black transition-colors hover:text-orange-600"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <li>
                <button
                  className="text-black transition-colors hover:text-orange-600"
                  onClick={() => router.push("/auth/signin")}
                >
                  Sign In
                </button>
              </li>
            )}
            <li>
              <button
                className="p-2 bg-orange-500"
                onClick={() => setShowMenu(!showMenu)}
              >
                Close
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
