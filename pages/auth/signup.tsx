import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function SignIn({ providers }) {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    secretkey: "",
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const submitName = e.nativeEvent["submitter"].name;
    if (!["registerUser", "registerAdmin"].includes(submitName)) return;

    const res = await signIn(
      "credentials",
      {
        email: userInfo.email,
        password: userInfo.password,
        redirect: false,
      },
      {
        submitName,
        secretkey: userInfo.secretkey,
      }
    );
    // console.log(res);
    if (res.ok) {
      if (router.query.returnTo) {
        router.push(router.query.returnTo);
      } else {
        router.push("/");
      }
    } else {
      toast(res.error, {
        type: "error",
      });
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="p-4 min-w-[50vw]">
        <h2 className="text-4xl text-center">Sign Up</h2>
        <h1 className="text-xl text-center">Index of Learning Styles</h1>
        <form
          className="flex flex-col justify-center gap-2 my-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="p-2 text-black border shadow-md border-gray-700"
            placeholder="Email"
            value={userInfo.email}
            onChange={(e) => {
              setUserInfo({
                ...userInfo,
                email: e.target.value,
              });
            }}
          />
          <input
            type="password"
            className="p-2 text-black shadow-md border-gray-700"
            value={userInfo.password}
            placeholder="Password"
            onChange={(e) => {
              setUserInfo({
                ...userInfo,
                password: e.target.value,
              });
            }}
          />
          <input
            type="text"
            className="p-2 text-black shadow-md border-gray-700"
            value={userInfo.secretkey}
            placeholder="Secret Key (Ask Admin for this)"
            onChange={(e) => {
              setUserInfo({
                ...userInfo,
                secretkey: e.target.value,
              });
            }}
          />
          <button
            className="p-2 border shadow-md text-slate-800 border-slate-300 hover:bg-slate-500 hover:text-white"
            name="registerAdmin"
          >
            Sign Up As Admin
          </button>
          <Link href="/auth/signin">
            <a className="mt-6 text-xs text-center text-blue-500">
              Log In Instead
            </a>
          </Link>
        </form>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(context),
    },
  };
}
