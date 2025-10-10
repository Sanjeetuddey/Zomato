import express from "express";
import {
  AdminLogin,
  AddResturant,
  GetAllResturants,
  UpdateResturant,
  DeleteResturant,
} from "../controller/adminController.js";
import { AdminProtect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();

const upload = multer();
router.post("/login", AdminLogin);
router.get("/getallrestaurants", AdminProtect, GetAllResturants);
router.post(
  "/addResturant",
  AdminProtect,
  upload.fields([{ name: "managerImage" }, { name: "restaurantImages" }]),
  AddResturant
);

router.put(
  "/updateResturant/:id",
  AdminProtect,
  upload.fields([{ name: "managerImage" }, { name: "restaurantImages" }]),
  UpdateResturant
);

router.delete("/deleteRestaurant/:id", AdminProtect, DeleteResturant);

export default router;