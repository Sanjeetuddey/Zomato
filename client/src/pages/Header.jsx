import { Search,ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const themes = [
  "Light",
  "Dark",
  "Claude",
  "Corporate",
  "Ghibli",
  "Gourmet",
  "Luxury",
  "Mintlify",
  "Pastel",
  "Perplexity",
  "Slack",
  "Soft",
  "Spotify",
  "Valorant",
  "Vscode"
];

const Header = () => {
  const [theme, setTheme] = useState("Light");
  
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    // Apply theme class to <html> or <body>
    document.documentElement.setAttribute("data-theme", selectedTheme.toLowerCase());
  };

  return (
    <header className="flex justify-between items-center px-10 py-5 bg-white shadow-sm">
      {/* Left side Logo */}
      <div className="text-orange-500 font-bold text-4xl">
        <NavLink to="/">🍽 Logo</NavLink>
      </div>

      {/* Center - Home + Search */}
      <div className="flex items-center gap-4 flex-1 justify-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium ${
              isActive
                ? "text-orange-500"
                : "text-gray-700 hover:text-orange-500"
            }`
          }
        >
          <div className="text-4xl font-bold">
            Home
          </div>
          
        </NavLink>

        {/* Search bar */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search for restaurants or dishes"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-full text-sm focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>
        <div className="p-4 items-center ">
         <NavLink
          to="/cart"
          className="p-5 rounded-lg hover:bg-secondary transition-colors"
        >
          <ShoppingCart className="p-5 w-6 h-6 text-primary-content" />
        </NavLink>
         </div>



      {/* Right side - Login + Theme */}
      <div className="flex items-center gap-4">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-medium transition-colors ${
              isActive
                ? "bg-orange-600 text-white"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`
          }
        >
          Login
        </NavLink>
     

        {/* Theme dropdown */}
        <div className="relative">
          <select
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="px-1 py-2 pr-2  border rounded-lg bg-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;