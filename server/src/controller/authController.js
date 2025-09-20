import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import genToken from "../utils/genAuthToken.js";

export const signup = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      const error = new Error("All Feilds Required");
      error.statusCode = 401;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const fullNameP = fullName?.charAt(0)?.toUpperCase() || "U";
    console.log(fullNameP);

    const photo = `https://placehold.co/600x400/EEE/31343C?font=poppins&text=${fullNameP}`;

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      photo,
    });
    await newUser.save();

    res.status(200).json({
      message: `🙏 Namaste ${fullName}, Apke liye 56 bhog tyar hai 😊`,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All Feilds Required");
      error.statusCode = 401;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("User Not Found, Please Signup");
      error.statusCode = 404;
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      return next(error);
    }

    if (!genToken(existingUser._id, res)) {
      const error = new Error("Unable to Login");
      error.statusCode = 403;
      return next(error);
    }

    res.status(200).json({
      message: `Welcome back, ${existingUser.fullName}`,
      data: {
        fullName: existingUser.fullName,
        email: existingUser.email,
        photo: existingUser.photo,
      },
    });
  } catch (err) {
    next(err);
  }
};