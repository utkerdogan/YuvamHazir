import React from "react";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();


  return (
    <nav className="hidden md:flex gap-6 bg-white text-gray-600 font-bold relative items-center px-6 py-4">
      <span onClick={() => history.push("/")} className="cursor-pointer">
        Anasayfa
      </span>
      <span className="cursor-pointer" onClick={() => history.push("/Pets")}>
        Hayvanlarımız
      </span>
      <span className="cursor-pointer" onClick={() => history.push("/About")}>
        Hakkımızda
      </span>
      <span className="cursor-pointer" onClick={() => history.push("/Products")}>
        Ürünlerimiz
      </span>
      <span className="cursor-pointer" onClick={() => history.push("/Contact")}>
        İletişim
      </span>
    </nav>
  );
};

export default Navbar;
