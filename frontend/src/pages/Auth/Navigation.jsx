import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();


  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
  style={{ zIndex: 9999 }}
  className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-400 to-gray-600 text-white h-[60px] fixed w-full shadow-lg"
  id="navigation-container"
>
  <div className="flex justify-center space-x-10 flex-1">
    <Link
      to="/"
      className="flex items-center transition-all duration-300 hover:bg-white hover:text-gray-800 rounded-lg p-2"
    >
      <AiOutlineHome className="mr-2" size={26} />
      <span className="nav-item-name">Главная</span>
    </Link>

    <Link
      to="/shop"
      className="flex items-center transition-all duration-300 hover:bg-white hover:text-gray-800 rounded-lg p-2"
    >
      <AiOutlineShopping className="mr-2" size={26} />
      <span className="nav-item-name">Покупка</span>
    </Link>

    <Link to="/cart" className="flex items-center relative transition-all duration-300 hover:bg-white hover:text-gray-800 rounded-lg p-2">
      <AiOutlineShoppingCart className="mr-2" size={26} />
      <span className="nav-item-name">Корзина</span>

      <div className="absolute top-9 right-0">
        {cartItems.length > 0 && (
          <span>
            <span className="px-1 py-0 text-sm text-white bg-pink-600 rounded-full">
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          </span>
        )}
      </div>
    </Link>

    <Link to="/favorite" className="flex items-center transition-all duration-300 hover:bg-white hover:text-gray-800 rounded-lg p-2">
      <FaHeart className="mr-2" size={20} />
      <span className="nav-item-name">Избранное</span>
      <FavoritesCount />
    </Link>
  </div>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo && <span className="text-white">{userInfo.username}</span>}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className="absolute right-0 mt-2 bg-white text-gray-600" >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Товары
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Категории
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Заказы
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Ползователи
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Профиль
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Выйти
              </button>
            </li>
          </ul>
        )}
        {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2" size={26} />
                <span className="nav-item-name">ВОЙТИ</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className="nav-item-name">РЕГИСТРАЦИЯ</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;