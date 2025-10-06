import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import api from "../../../config/api";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Basic Info", "Manager", "Location", "Images"];

const AddRestaurantModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);

  const [resturantData, setResturantData] = useState({
    resturantName: "",
    address: "",
    lat: "",
    lon: "",
    cuisine: "",
    foodType: "veg",
    managerName: "",
    managerPhone: "",
    receptionPhone: "",
    email: "",
    status: "active",
    openingTime: "",
    closingTime: "",
    averageCostForTwo: 0,
    openingStatus: "open",
    resturantType: "all",
    GSTNo: "",
    FSSAINo: "",
    upiId: "",
    bankAccNumber: "",
    ifscCode: "",
  });

  const [managerImagePreview, setManagerImagePreview] = useState(null);
  const [restaurantImagesPreview, setRestaurantImagesPreview] = useState([]);
  const [managerImageFiles, setManagerImageFiles] = useState("");
  const [restaurantImageFiles, setRestaurantImageFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setResturantData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleRestaurantImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const FileUrl = URL.createObjectURL(file);
      setRestaurantImagesPreview((prev) => [...prev, FileUrl]);
    });
    setRestaurantImageFiles(files);
  };

  const handleManagerImageChange = (e) => {
    const files = e.target.files;
    setManagerImagePreview(URL.createObjectURL(files[0]));
    setManagerImageFiles(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerFromData = new FormData();
      Object.keys(resturantData).forEach((key) =>
        registerFromData.append(key, resturantData[key])
      );
      registerFromData.append("managerImage", managerImageFiles);
      restaurantImageFiles.forEach((file) =>
        registerFromData.append("restaurantImages", file)
      );

      const res = await api.post("/admin/addResturant", registerFromData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.status + " | " + error?.response?.data?.message ||
          "Unknown Error From Server"
      );
    }
  };

  const nextStep = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, y: -30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: -30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="bg-white rounded-2xl shadow-lg w-full max-w-4xl h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-primary text-primary-content rounded-t-2xl">
              <h2 className="text-lg font-semibold">Add New Restaurant</h2>
              <button onClick={onClose} className="hover:opacity-80">
                <RxCrossCircled className="text-2xl" />
              </button>
            </div>

            {/* Stepper */}
            <div className="flex justify-between items-center px-6 py-3 border-b">
              {steps.map((s, i) => (
                <div key={i} className="flex-1 text-center">
                  <div
                    className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-sm font-bold ${
                      i === step
                        ? "bg-primary text-white"
                        : i < step
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <p
                    className={`mt-1 text-xs ${
                      i <= step ? "text-primary font-medium" : "text-gray-400"
                    }`}
                  >
                    {s}
                  </p>
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <form className="h-full flex flex-col" onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Basic Info */}
                  {step === 0 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Restaurant Name
                          </span>
                        </label>
                        <input
                          name="resturantName"
                          className="input input-bordered w-full"
                          value={resturantData.resturantName}
                          onChange={handleChange}
                          placeholder="Enter restaurant name"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Cuisine
                          </span>
                        </label>
                        <input
                          name="cuisine"
                          className="input input-bordered w-full"
                          value={resturantData.cuisine}
                          onChange={handleChange}
                          placeholder="E.g. Indian, Italian"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Food Type
                          </span>
                        </label>
                        <select
                          name="foodType"
                          className="select select-bordered w-full"
                          value={resturantData.foodType}
                          onChange={handleChange}
                        >
                          <option value="veg">Veg</option>
                          <option value="non-veg">Non-Veg</option>
                          <option value="eggetarian">Eggetarian</option>
                          <option value="jain">Jain</option>
                          <option value="vegan">Vegan</option>
                          <option value="any">Any</option>
                        </select>
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Average Cost For Two
                          </span>
                        </label>
                        <input
                          name="averageCostForTwo"
                          type="number"
                          className="input input-bordered w-full"
                          value={resturantData.averageCostForTwo}
                          onChange={handleChange}
                          placeholder="₹500"
                        />
                      </div>
                      {/* Opening Time */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Opening Time
                          </span>
                        </label>
                        <input
                          name="openingTime"
                          type="time"
                          className="input input-bordered w-full"
                          value={resturantData.openingTime}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Closing Time */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Closing Time
                          </span>
                        </label>
                        <input
                          name="closingTime"
                          type="time"
                          className="input input-bordered w-full"
                          value={resturantData.closingTime}
                          onChange={handleChange}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Manager */}
                  {step === 1 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Manager Name
                          </span>
                        </label>
                        <input
                          name="managerName"
                          className="input input-bordered w-full"
                          value={resturantData.managerName}
                          onChange={handleChange}
                          placeholder="Enter manager name"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Manager Phone
                          </span>
                        </label>
                        <input
                          name="managerPhone"
                          className="input input-bordered w-full"
                          value={resturantData.managerPhone}
                          onChange={handleChange}
                          placeholder="+91 9876543210"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Reception Phone
                          </span>
                        </label>
                        <input
                          name="receptionPhone"
                          className="input input-bordered w-full"
                          value={resturantData.receptionPhone}
                          onChange={handleChange}
                          placeholder="+91 9876543210"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Email</span>
                        </label>
                        <input
                          name="email"
                          type="email"
                          className="input input-bordered w-full"
                          value={resturantData.email}
                          onChange={handleChange}
                          placeholder="example@email.com"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Location */}
                  {step === 2 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div className="form-control md:col-span-2">
                        <label className="label">
                          <span className="label-text font-medium">
                            Address
                          </span>
                        </label>
                        <textarea
                          name="address"
                          className="textarea textarea-bordered w-full"
                          value={resturantData.address}
                          onChange={handleChange}
                          placeholder="Enter complete address"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Latitude
                          </span>
                        </label>
                        <input
                          name="lat"
                          className="input input-bordered w-full"
                          value={resturantData.lat}
                          onChange={handleChange}
                          placeholder="23.2599"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Longitude
                          </span>
                        </label>
                        <input
                          name="lon"
                          className="input input-bordered w-full"
                          value={resturantData.lon}
                          onChange={handleChange}
                          placeholder="77.4126"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">GST No</span>
                        </label>
                        <input
                          name="GSTNo"
                          className="input input-bordered w-full"
                          value={resturantData.GSTNo}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            FSSAI No
                          </span>
                        </label>
                        <input
                          name="FSSAINo"
                          className="input input-bordered w-full"
                          value={resturantData.FSSAINo}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">UPI ID</span>
                        </label>
                        <input
                          name="upiId"
                          className="input input-bordered w-full"
                          value={resturantData.upiId}
                          onChange={handleChange}
                          placeholder="example@upi"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Bank Account Number
                          </span>
                        </label>
                        <input
                          name="bankAccNumber"
                          className="input input-bordered w-full"
                          value={resturantData.bankAccNumber}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            IFSC Code
                          </span>
                        </label>
                        <input
                          name="ifscCode"
                          className="input input-bordered w-full"
                          value={resturantData.ifscCode}
                          onChange={handleChange}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Images */}
                  {step === 3 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                      className="grid gap-6"
                    >
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Manager Image
                          </span>
                        </label>
                        <input
                          type="file"
                          className="file-input file-input-bordered w-full"
                          onChange={handleManagerImageChange}
                        />
                        {managerImagePreview && (
                          <img
                            src={managerImagePreview}
                            alt="Manager Preview"
                            className="mt-3 w-32 h-32 object-cover rounded-lg shadow"
                          />
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Restaurant Images
                          </span>
                        </label>
                        <input
                          type="file"
                          multiple
                          className="file-input file-input-bordered w-full"
                          onChange={handleRestaurantImageChange}
                        />
                        <div className="flex flex-wrap gap-3 mt-3">
                          {restaurantImagesPreview.map((src, idx) => (
                            <img
                              key={idx}
                              src={src}
                              className="w-24 h-24 object-cover rounded-lg shadow"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step Controls */}
                <div
                  className={`mt-auto flex items-center pt-6 ${
                    step === step.length - 1
                      ? "justify-evenly"
                      : "justify-between"
                  }  `}
                >
                  {step > 0 ? (
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={prevStep}
                    >
                      Back
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={nextStep}
                    >
                      Next
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-success ">
                      Save Restaurant
                    </button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddRestaurantModal;