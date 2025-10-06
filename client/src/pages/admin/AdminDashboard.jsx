import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/adminDashboard/Sidebar";
import ManageResturants from "../../components/adminDashboard/ManageResturants";
import ManageRiders from "../../components/adminDashboard/ManageRiders";
import ManageCustomers from "../../components/adminDashboard/ManageCustomers";
import ManageFeedback from "../../components/adminDashboard/ManageFeedback";
import { useNavigate } from "react-router-dom";
import Overview from "../../components/userDashboard/Overview";

const AdminDashboard = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("Overview");

  useEffect(() => {
    !isLogin && navigate("/");
  }, [isLogin]);
  return (
    <>
      {isLogin && (
        <div className="flex min-h-full bg-base-200">
          {/* Sidebar */}
          <Sidebar active={active} setActive={setActive} />

          {/* Main Content */}
          <div className="flex-1 h-full w-full">
            {active === "Overview" && <Overview />}
            {active === "Manage Restaurants" && <ManageResturants />}
            {active === "Manage Riders" && <ManageRiders />}
            {active === "Manage Customers" && <ManageCustomers />}
            {active === "Manage Feedback" && <ManageFeedback />}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;