import React from "react";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children, onSearch }) => {
  return (
    <div className="app">
      <Header onSearch={onSearch} />
      <main className="mx-auto flex flex-col min-h-screen justify-center text-center">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;