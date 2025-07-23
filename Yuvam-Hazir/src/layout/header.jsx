import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { useHistory } from "react-router-dom";
import AuthToggle from "../components/AuthToggle";
import Navbar from "../components/Navbar";
import MobileMenu from "../components/MobileMenu";

const Header = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (onSearch) {
        onSearch(searchTerm);
      }
      history.push("/Products");
    }
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <header className="bg-white shadow-md w-full">
      {/* Üst Kısım */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.jpeg"
            alt="Logo"
            className="h-20 w-auto object-cover rounded-full "
          />
        </Link>
        {/* Masaüstü Navigasyon */}
        <Navbar />
        {/* Auth Butonları (Masaüstü) */}

      <AuthToggle />

        <button className="bg-white md:hidden" onClick={toggleMenu}>
            {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobil Menü */}
      {isMobileMenuOpen && (<MobileMenu />)}

      {/* Arama Çubuğu */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-2 text-gray-500 hover:text-blue-600">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
