import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";
import { useHistory } from "react-router-dom";

const Footer = () => {
  const history = useHistory();

  return (
  <footer className="bg-gray-200 py-4 text-center flex flex-col md:flex-row items-center justify-between"> 

    <div className="flex flex-col md:flex-row items-center p-3 md:gap-4">
        <h2 className="text-xl font-bold flex">Yuvam Hazır</h2>
        <div className="flex gap-4 text-blue-500 ">
        <Facebook />
        <Instagram />
        <Twitter />
        </div>
    </div>
    <div className="flex md:flex-row justify-center mb-2 items-center space-y-2 md:space-y-0 md:space-x-4">
      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"  onClick={ () => history.push("/Contact")}>
        <span className="cursor-pointer text-center">İletişim</span>
      </button>
    </div>
    <div className="md:flex text-gray-600 font-semibold text-sm flex items-center justify-center">
        &copy; {new Date().getFullYear()} Yuvam Hazır! All rights reserved. 
    </div>
  </footer>
)};

export default Footer;