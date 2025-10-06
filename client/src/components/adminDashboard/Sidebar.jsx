import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import api from "../../config/api";
import {Menu, Grid, ChefHat, Truck, Users, MessageCircle,LogOut } from "lucide-react";

const Sidebar = ({ active, setActive }) => {
  const { user, setUser, setIsLogin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await api.get("/auth/logOut");
      setUser("");
      setIsLogin(false);
      sessionStorage.removeItem("BhojanUser");
      toast.success("Logout Successful");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.status + " | " + error?.response?.data?.message ||
          "Unknown Error From Server"
      );
    }
  };

  const menuItems = [
    { name: "Overview", icon: <Grid className="w-5 h-5" /> },
    { name: "Manage Restaurants", icon: <ChefHat className="w-5 h-5" /> },
    { name: "Manage Riders", icon: <Truck className="w-5 h-5" /> },
    { name: "Manage Customers", icon:<Users className="w-5 h-5" /> },
    { name: "Manage Feedback", icon: <MessageCircle className="w-5 h-5" /> },
  ];

  return (
    <motion.aside
      animate={{ width: sidebarOpen ? 240 : 80 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="backdrop-blur-md bg-base-100/80 shadow-xl flex flex-col overflow-hidden h-[90vh] rounded-2xl border border-base-300"
    >
      {/* Top Toggle */}
      <div className="flex justify p-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="btn btn-ghost btn-circle hover:bg-base-200 transition"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="w-full flex flex-col items-center text-center px-4 py-6 border-b border-base-300 relative group">
        <motion.img
          src={user?.photo || "/default-avatar.png"}
          alt={user?.fullName || "Guest User"}
          className="rounded-full shadow-md border border-base-300 cursor-pointer "
          animate={{
            width: sidebarOpen ? 80 : 40,
            height: sidebarOpen ? 80 : 40,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />

        {/* Name & Email */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="mt-3 w-full "
            >
              <span className="block font-semibold text-sm truncate">{user?.fullName || "Guest User"}</span>
              <span className="block text-xs text-base-content/70 truncate">{user?.email || "guest@example.com"}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip for collapsed sidebar */}
        {!sidebarOpen && (
          <div className="absolute left-full ml-3 px-3 py-2 text-xs rounded-md bg-base-300 text-base-content opacity-0 group-hover:opacity-100 transition-shadow shadow-lg whitespace-nowrap">
            <span className="block font-semibold">{user?.fullName}</span>
            <span className="block text-xs">{user?.email}</span>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col gap-2 p-4">
        {menuItems.map((item, idx) => {
          const isActive = active === item.name;
          return (
            <motion.div key={idx} whileHover={{ scale: 1.03 }} className="relative group">
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute left-0 top-1 bottom-1 w-1 rounded-r-lg bg-primary"
                />
              )}

              <button
                onClick={() => setActive(item.name)}
                className={`flex items-center gap-3 px-3 py-2 w-full rounded-xl transition-all duration-200 relative
                  ${isActive ? "bg-primary text-primary-content shadow-md" : "hover:bg-base-200 text-base-content"}`}
              >
                {item.icon}
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Tooltip when collapsed */}
              {!sidebarOpen && (
                <span className="absolute left-full ml-3 px-2 py-1 text-xs rounded-md bg-base-300 text-base-content opacity-0 group-hover:opacity-100 transition shadow-md whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </motion.div>
          );
        })}
      </nav>

      {/* Logout */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-error m-4 flex items-center gap-2 rounded-xl"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5" />
        <AnimatePresence>
          {sidebarOpen && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-medium">
              Logout
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.aside>
  );
};

export default Sidebar;