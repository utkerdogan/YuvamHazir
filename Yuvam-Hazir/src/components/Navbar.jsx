import { ChevronDown, ShoppingCart, User, LogOut } from "lucide-react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice"; // çıkış için gerekli

const Navbar = ({ onOpenLogin, onOpenRegister }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => setOpenDropdown((prev) => !prev);

  React.useEffect(() => {
    const closeDropdown = () => setOpenDropdown(false);
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, []);

  const onDropdownClick = (e) => e.stopPropagation();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <nav className="hidden md:flex gap-6 bg-white text-gray-600 font-bold relative items-center px-6 py-4">
      <span onClick={() => history.push("/")} className="cursor-pointer">
        Anasayfa
      </span>

      <div className="relative">
        <span
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
          className="flex cursor-pointer items-center select-none"
        >
          Hayvanlarımız <ChevronDown />
        </span>

        {openDropdown && (
          <div
            onClick={onDropdownClick}
            className="absolute w-64 bg-white mt-2 shadow-lg rounded border border-gray-200 z-50"
          >
            <div className="grid grid-cols-2 p-2">
              <div>
                <ul>
                  <li
                    onClick={() => history.push("/Animals/cats")}
                    className="cursor-pointer hover:text-pink-500 transition pt-2"
                  >
                    Kediler
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <li
                    onClick={() => history.push("/Animals/dogs")}
                    className="cursor-pointer hover:text-pink-500 transition pt-2"
                  >
                    Köpekler
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

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
