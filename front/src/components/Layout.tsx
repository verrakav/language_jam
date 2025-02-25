// components
import {ReactNode} from "react";
// components
import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <div className="w-full flex justify-end">
        <NavBar />
      </div>
      <Header />
      {/* main tells React Router what content to show */}
      <main className="flex-grow p-4">{children}</main>
      <Footer />
    </div>
  );
}
