import { Search, ShoppingCart } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const themes = [
  "light",
  "dark",
  "claude",
  "corporate",
  "ghibli",
  "gourmet",
  "mintlify",
  "perplexity",
  "luxury",
  "pastel",
  "slack",
  "soft",
  "spotify",
  "valorant",
  "vscode",
];

const Header = () => {
  const { user, isLogin } = useAuth();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("BhojanTheme") || "light"
  );

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("BhojanTheme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 bg-base-200 shadow-md">
        {/* Left - Logo */}
        <div className="text-primary text-2xl font-bold">
          <NavLink to="/">🍽️ Bhojan</NavLink>
        </div>

        {/* Home + Search */}
        <div className="flex items-center gap-6 flex-1 justify-center max-md:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-base-content hover:text-primary"
              }`
            }
          >
            Home
          </NavLink>

          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Search for restaurants or dishes"
              aria-label="Search restaurants or dishes"
              className="input input-bordered pl-10 w-full text-sm focus:ring focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Right - Cart, User, Theme */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <NavLink
            to="/cart"
            className="btn btn-ghost btn-circle relative"
            aria-label="View Cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {/* Badge for cart count */}
            <span className="badge badge-sm badge-primary absolute -top-1 -right-1">
              2
            </span>
          </NavLink>

          {/* User / Login */}
          {isLogin && user ? (
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              {/* Avatar */}
              <div className="avatar">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.photo} alt="userPicture" />
                </div>
              </div>

              {/* Name */}
              <span className="text-base font-semibold text-base-content">
                {user.fullName?.split(" ")[0]}
              </span>
            </div>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}

          {/* Theme Selector */}
          <select
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="select select-sm select-primary"
            aria-label="Select Theme"
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </header>
    </>
  );
};

export default Header;