import React, { useState } from "react";
import AddResturantModal from "./modals/AddResturantModal";
import { motion } from "framer-motion";
import { Pencil, Trash2, Plus } from "lucide-react";

const restaurants = [
  { id: 1, name: "Spicy Villa", owner: "Amit Sharma", address: "123 Main St, Indore", phone: "9876543210", status: "Active" },
  { id: 2, name: "Green Bowl", owner: "Priya Verma", address: "456 Park Ave, Bhopal", phone: "9123456780", status: "Inactive" },
];

const ManageRestaurants = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [restaurantList, setRestaurantList] = useState(restaurants);

  const handleAddRestaurant = (newRest) => {
    setRestaurantList((prev) => [
      { ...newRest, id: Date.now() },
      ...prev,
    ]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-base-100 rounded-3xl shadow-xl min-h-screen flex flex-col w-full "
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-primary">Manage Restaurants</h2>
        <button
          className="btn btn-primary flex items-center gap-2 rounded-full px-4 py-2 shadow-md hover:scale-105 transition-transform"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="w-5 h-5" /> Add Restaurant
        </button>
      </div>
      <AddResturantModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddRestaurant}
      />

      {/* Table */}
      <div className="flex-1 overflow-auto rounded-2xl w-full shadow-inner">
        <table className="table w-full rounded-2xl overflow-hidden">
          <thead className="bg-base-200">
            <tr>
              <th>Name</th>
              <th>Owner</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurantList.map((rest) => (
              <motion.tr
                key={rest.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-base-200/50 transition-colors rounded-xl"
              >
                <td className="font-semibold">{rest.name}</td>
                <td>{rest.owner}</td>
                <td>{rest.address}</td>
                <td>{rest.phone}</td>
                <td>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className={`px-3 py-1 rounded-full text-xs font-bold cursor-default select-none ${
                      rest.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {rest.status}
                  </motion.span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-sm btn-outline btn-info flex items-center gap-1 rounded-full hover:scale-105 transition-transform">
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                    <button className="btn btn-sm btn-outline btn-error flex items-center gap-1 rounded-full hover:scale-105 transition-transform">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>

    
  );
};

export default ManageRestaurants;