import Navbar from "./navbar";
import Footer from "./footer";

export default function LayoutNavFoot({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
