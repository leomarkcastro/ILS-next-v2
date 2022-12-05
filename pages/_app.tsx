import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
// import "survey-core/modern.css";
// import "survey-core/defaultV2.css";
import "@/styles/globals.css";
import { RouteGuard } from "@/components/auth/routeGuard";
import LayoutWrapper from "@/components/layoutWrapper/main";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const router = useRouter();

  const [route, setRoute] = useState(router.pathname);

  useEffect(() => {
    const handleRouteChange = (url) => {
      setRoute(url);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  return (
    <SessionProvider session={session}>
      <RouteGuard>
        <LayoutWrapper>
          <motion.div key={route}>
            <Head>
              <title>Learning Styles</title>
            </Head>
            <Component {...pageProps} />
            <ToastContainer />
          </motion.div>
        </LayoutWrapper>
      </RouteGuard>
    </SessionProvider>
  );
};

export default App;
