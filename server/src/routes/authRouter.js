import express from "express";
import { signup, login ,logOut,ResetPassword,SendOTP ,verifyOTP,ForgetPassword} from "../controller/authController.js";
import { Protect ,ProtectFp } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/logOut", logOut);

router.patch("/resetpassword", Protect, ResetPassword);

router.post("/sendOtp",SendOTP);

router.post("/verifyOtp", verifyOTP);

router.post("/forgetpassword", ProtectFp, ForgetPassword);

export default router;