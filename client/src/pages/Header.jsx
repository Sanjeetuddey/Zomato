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

  console.log(user);
  

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-base-200 shadow-md">
      {/* Left - Logo */}
      <div className="text-primary text-2xl font-bold">
        <NavLink to="/">🍽️ Bhojan</NavLink>
      </div>

      {/* Center - Nav + Search */}
      <div className="flex items-center gap-6 flex-1 justify-center max-md:hidden">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium transition-colors ${
              isActive ? "text-primary" : "text-base-content hover:text-primary"
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
          className="p-2 rounded-lg text-base-content hover:bg-base-300"
          aria-label="View Cart"
        >
          <ShoppingCart className="w-6 h-6 text-base-content" />
        </NavLink>

        {/* User / Login */}
        {isLogin && user ? (
          <div
            className="flex gap-3 items-center cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <div className="h-12 w-12 rounded-full border overflow-hidden">
              <img
                src={user.photo} // fallback
                alt="userPicture"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <span className="text-primary-content text-lg font-semibold">
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
  );
};

export default Header;