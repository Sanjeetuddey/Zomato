import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/userDashboard/Sidebar";
import Profile from "../components/userDashboard/Profile";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");

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
          
         <Profile />
          

          {/* {active === "overview" && <Overview />}
          
          {active === "orders" && <Orders />}
          {active === "address" && <Address />}
          {active === "contact" && <ContactUs />} */}
        </div>
      )}
    </>
  );
};

export default Dashboard;