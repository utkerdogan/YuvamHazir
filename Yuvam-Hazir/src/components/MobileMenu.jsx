import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const MobileMenu = () => {
  const history = useHistory();
  const [isAnimalsOpen, setIsAnimalsOpen] = useState(false);

  const toggleAnimalsMenu = (e) => {
    e.stopPropagation(); // Dış tıklama etkisini engelle
    setIsAnimalsOpen(!isAnimalsOpen);
  };

  return (
    <nav className="flex flex-col md:hidden items-center py-2 gap-2 bg-white relative z-50">
      <span className="text-gray-600 cursor-pointer" onClick={() => history.push("/")}>
        Anasayfa
      </span>

      {/* Dropdown Başlık */}
      <div className="w-full">
        <div
          className="flex items-center justify-center px-4 text-gray-600 cursor-pointer select-none"
          onClick={toggleAnimalsMenu}
        >
          <span>Hayvanlarımız</span>
          <ChevronDown className={`transition-transform duration-300 ${isAnimalsOpen ? "rotate-180" : "rotate-0"}`} />
        </div>

        {/* Dropdown İçerik */}
        {isAnimalsOpen && (
          <div className="bg-white border border-gray-200 rounded shadow-md mt-1 px-2 py-1">
            <ul>
              <li
                className="py-1 cursor-pointer hover:text-pink-500"
                onClick={() => history.push("/Animals/cats")}
              >
                Kediler
              </li>
              <li
                className="py-1 cursor-pointer hover:text-pink-500"
                onClick={() => history.push("/Animals/dogs")}
              >
                Köpekler
              </li>
            </ul>
          </div>
        )}
      </div>

      <span className="text-gray-600 cursor-pointer" onClick={() => history.push("/About")}>
        Hakkımızda
      </span>
      <span className="text-gray-600 cursor-pointer" onClick={() => history.push("/Products")}>
        Ürünlerimiz
      </span>
      <span className="text-gray-600 cursor-pointer" onClick={() => history.push("/Team")}>
        Takımımız
      </span>
    </nav>
  );
};

export default MobileMenu;
