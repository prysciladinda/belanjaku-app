import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ScrollToTop } from "../../components/ui/ScrollToTop";

export default function RootLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">{<Outlet />}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export { RootLayout };
