import express from "express";
import { GetAllResturants } from "../controller/pubicController.js";

const router = express.Router();

// Public route to get all restaurants
router.get("/getAllResturant", GetAllResturants);

export default router;