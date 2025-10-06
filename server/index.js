
import cloudinary from "./src/config/cloudinary.js";
import express from "express";
import connectDB from "./src/config/db.js";
import cors from "cors";
import AuthRouter from "./src/routes/authRouter.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/userRouter.js";
import AdminRouter from "./src/routes/adminRouter.js";  
const app = express();
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/admin", AdminRouter);
app.use("/auth", AuthRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server Connected and Working" });
});

app.use((err, req, res, next) => {
  const errorMessage = err.message || "Internal Server Error";
  const errorStatus = err.statusCode || 500;

  res.status(errorStatus).json({ message: errorMessage });
});

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log("Server Started at", port);
  connectDB();
  try {
  const res = await cloudinary.api.ping();
  console.log("Cloudinary Connected", res);
} catch (error) {
  console.error("Cloudinary Connection Error:", error);
}
});