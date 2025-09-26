import { useState } from "react";
import { Menu, Home, Utensils, Heart, Wallet, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Home", icon: <Home className="w-5 h-5" /> },
    { name: "Orders", icon: <Utensils className="w-5 h-5" /> },
    { name: "Favorites", icon: <Heart className="w-5 h-5" /> },
    { name: "Wallet", icon: <Wallet className="w-5 h-5" /> },
    { name: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
        <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 80 }}
        className="bg-base-100 shadow-lg p-4 flex flex-col transition-all duration-300 overflow-hidden"
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="btn btn-ghost btn-circle mb-6"
        >
          <Menu />
        </button>
        <nav className="flex-1 flex flex-col gap-2">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className="flex items-center gap-3 btn btn-ghost justify-start"
            >
              {item.icon}
              {sidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>
        <button className="btn btn-error btn-outline mt-auto flex items-center gap-2">
          <LogOut className="w-5 h-5" />
          {sidebarOpen && "Logout"}
        </button>
      </motion.aside>


      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Foodie Dashboard</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search food..."
              className="input input-bordered w-64"
            />
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://i.pravatar.cc/100" alt="User" />
              </div>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Active Orders</h2>
              <p className="text-3xl font-bold">3</p>
            </div>
          </div>

          <div className="card bg-secondary text-secondary-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Total Spent</h2>
              <p className="text-3xl font-bold">₹4,520</p>
            </div>
          </div>

          <div className="card bg-accent text-accent-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Reward Points</h2>
              <p className="text-3xl font-bold">250</p>
            </div>
          </div>
        </section>

        {/* Recent Orders */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Dish</th>
                  <th>Restaurant</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Margherita Pizza</td>
                  <td>Pizza Hut</td>
                  <td>19 Sep 2025</td>
                  <td><span className="badge badge-success">Delivered</span></td>
                </tr>
                <tr>
                  <td>Paneer Butter Masala</td>
                  <td>Biryani House</td>
                  <td>18 Sep 2025</td>
                  <td><span className="badge badge-warning">On the way</span></td>
                </tr>
                <tr>
                  <td>Burger Combo</td>
                  <td>McDonald's</td>
                  <td>17 Sep 2025</td>
                  <td><span className="badge badge-info">Preparing</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Recommended Food */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img src="https://source.unsplash.com/400x300/?pizza" alt="Pizza" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Cheese Pizza</h2>
                <p>Only ₹299</p>
                <button className="btn btn-primary">Order Now</button>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img src="https://source.unsplash.com/400x300/?burger" alt="Burger" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Double Burger</h2>
                <p>Only ₹199</p>
                <button className="btn btn-primary">Order Now</button>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img src="https://source.unsplash.com/400x300/?biryani" alt="Biryani" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Chicken Biryani</h2>
                <p>Only ₹349</p>
                <button className="btn btn-primary">Order Now</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
 
    </>
 );
};

export default Dashboard;