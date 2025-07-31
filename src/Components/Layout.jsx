import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="mt-16 px-4 mb-16">
        <Outlet /> {/* This renders the nested route content */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
