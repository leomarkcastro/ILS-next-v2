import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import LayoutNavFoot from "../layout/main";

const NullLayout = ({ children }) => {
  return <>{children}</>;
};

const DefaultLayout = ({ children }) => {
  return <LayoutNavFoot>{children}</LayoutNavFoot>;
};

const layoutList = {
  "/auth/signin": NullLayout,
  "/auth/signup": NullLayout,
};

export default function LayoutWrapper({ children }) {
  const router = useRouter();
  const Layout = useRef(DefaultLayout);

  const [change, setChange] = useState(0);

  useEffect(() => {
    // console.log(router.pathname);
    Layout.current = layoutList[router.pathname] || DefaultLayout;
    setChange((prev) => prev + 1);
  }, [router]);

  return (
    <div className="font-Alegreya relative">
      <Layout.current>{children}</Layout.current>
      <p className="hidden">{change}</p>
    </div>
  );
}
