import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import { genToken } from "../utils/jsonWebToken.js";
import cloudinary from "../config/cloudinary.js";
import Resturant from "../models/resturantModel.js";

// Admin Login
export const AdminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Email and Password are required");
      error.statusCode = 400;
      return next(error);
    }

    //admin existence check
    const admin = await Admin.findOne({ email });
    if (!admin) {
      const error = new Error("Admin not found");
      error.statusCode = 404;
      return next(error);
    }
    
    //password verification
    const isVerified = await bcrypt.compare(password, admin.password);
    if (!isVerified) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      return next(error);
    }

      //token generation
    if (!genToken(admin._id, res)) {
      const error = new Error("Unable to Login");
      error.statusCode = 403;
      return next(error);
    }

    res.status(200).json({
      message: "Admin Logged In Successfully",
      admin: {
        fullName: admin.fullName,
        email: admin.email,
        photo: admin.photo,
        role: "admin",
      },
    });
  } catch (error) {
    next(error);
  }
};


// Add Resturant
export const AddResturant = async (req, res, next) => {
  try {
    const {
      resturantName,
      address,
      lat,
      lon,
      cuisine,
      foodType,
      managerName,
      managerPhone,
      receptionPhone,
      email,
      status,
      openingTime,
      closingTime,
      averageCostForTwo,
      openingStatus,
      resturantType,
      GSTNo,
      FSSAINo,
      upiId,
      bankAccNumber,
      ifscCode,
    } = req.body;

    if (
      !resturantName ||
      !address ||
      !lat ||
      !lon ||
      !cuisine ||
      !foodType ||
      !managerName ||
      !managerPhone ||
      !receptionPhone ||
      !email ||
      !status ||
      !openingTime ||
      !closingTime ||
      !averageCostForTwo ||
      !openingStatus ||
      !resturantType ||
      !GSTNo ||
      !FSSAINo ||
      !upiId ||
      !bankAccNumber ||
      !ifscCode
    ) {
      const error = new Error("All Fields are Required");
      error.statusCode = 404;
      return next(error);
    }


    // console.log("managerImageFiles:", req.files.managerImage);
    // console.log("restaurantImageFiles:", req.files.restaurantImages);

    const managerImageFile = req.files.managerImage;
    const restaurantImageFiles = req.files.restaurantImages;
    if (!managerImageFile || restaurantImageFiles.length === 0) {
      const error = new Error("All Images are Required");
      error.statusCode = 404;
      return next(error);
    }


    // Upload Manager Image to Cloudinary
    const M_b64 = Buffer.from(managerImageFile[0].buffer).toString("base64");
    const M_dataURI = `data:${managerImageFile[0].mimetype};base64,${M_b64}`;
    const M_result = await cloudinary.uploader.upload(M_dataURI, {
      folder: `BhojanAdmin/Resturants/${resturantName}`,
      width: 500,
      height: 500,
      crop: "fill",
    });
    if (!M_result) {
      const error = new Error("Manager Image Upload Failed");
      error.statusCode = 500;
      return next(error);
    }

    // Define managerImage object
    const managerImage = {
      imageLink: M_result.secure_url,
      imageId: M_result.public_id,
    };

    const restaurantImages = [];

    // Upload Restaurant Images to Cloudinary
    restaurantImageFiles.forEach(async (image) => {
      const R_b64 = Buffer.from(image.buffer).toString("base64");
      const R_dataURI = `data:${image.mimetype};base64,${R_b64}`;
      const R_result = await cloudinary.uploader.upload(R_dataURI, {
        folder: `BhojanAdmin/Resturants/${resturantName}`,
        width: 500,
        height: 500,
        crop: "fill",
      });

      console.log(R_result);

      if (!R_result) {
        const error = new Error("Restaurant Image Upload Failed");
        error.statusCode = 500;
        return next(error);
      }
      restaurantImages.push({
        imageLink: R_result.secure_url,
        imageId: R_result.public_id,
      });
    });


    // Create new Resturant
    const newResturant = await Resturant.create({
      resturantName,
      address,
      lat,
      lon,
      cuisine,
      foodType,
      managerName,
      managerPhone,
      receptionPhone,
      email,
      status,
      openingTime,
      closingTime,
      averageCostForTwo,
      openingStatus,
      resturantType,
      GSTNo,
      FSSAINo,
      upiId,
      bankAccNumber,
      ifscCode,
      managerImage,
      restaurantImages,
    });
    res.status(200).json({
      message: "Add Resturant Route",
      data: newResturant,
    });
  } catch (error) {
    next(error);
  }
};


// Get All Resturants
export const GetAllResturants = async (req, res, next) => {
  try {
    const resturants = await Resturant.find().sort({ createdAt: -1 });
    if (!resturants || resturants.length === 0) {
      const error = new Error("No Resturants Found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      message: "All Restaurants Fetched Successfully",
      data: resturants,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateResturant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      resturantName,
      address,
      lat,
      lon,
      cuisine,
      foodType,
      managerName,
      managerPhone,
      receptionPhone,
      email,
      status,
      openingTime,
      closingTime,
      averageCostForTwo,
      openingStatus,
      resturantType,
      GSTNo,
      FSSAINo,
      upiId,
      bankAccNumber,
      ifscCode,
    } = req.body;
    if (
      !resturantName ||
      !address ||
      !lat ||
      !lon ||
      !cuisine ||
      !foodType ||
      !managerName ||
      !managerPhone ||
      !receptionPhone ||
      !email ||
      !status ||
      !openingTime ||
      !closingTime ||
      !averageCostForTwo ||
      !openingStatus ||
      !resturantType ||
      !GSTNo ||
      !FSSAINo ||
      !upiId ||
      !bankAccNumber ||
      !ifscCode
    ) {
      const error = new Error("All Fields are Required");
      error.statusCode = 404;
      return next(error);
    }
    const resturant = await Resturant.findById(id);
    if (!resturant) {
      const error = new Error("Resturant Not Found");
      error.statusCode = 404;
      return next(error);
    }
    let managerImage = resturant.managerImage;
    let restaurantImages = resturant.restaurantImages;
    const managerImageFile = req.files?.managerImage;
    const restaurantImageFiles = req.files?.restaurantImages;
    if (managerImageFile) {

      // Delete old image from Cloudinary
      if (managerImage.imageId) {
        await cloudinary.uploader.destroy(managerImage.imageId);
      }

      // Upload new Manager Image to Cloudinary
      const M_b64 = Buffer.from(managerImageFile[0].buffer).toString("base64");
      const M_dataURI = `data:${managerImageFile[0].mimetype};base64,${M_b64}`;
      const M_result = await cloudinary.uploader.upload(M_dataURI, {
        folder: `BhojanAdmin/Resturants/${resturantName}`,
        width: 500,
        height: 500,
        crop: "fill",
      });
      if (!M_result) {
        const error = new Error("Manager Image Upload Failed");
        error.statusCode = 500;
        return next(error);
      }
      managerImage = {
        imageLink: M_result.secure_url,
        imageId: M_result.public_id,
      };
    }
    if (restaurantImageFiles && restaurantImageFiles.length > 0) {
// Delete old images from Cloudinary
            if (restaurantImages && restaurantImages.length > 0) {
        for (const img of restaurantImages) {
          if (img.imageId) {
            await cloudinary.uploader.destroy(img.imageId);
          }
        }
      }
      restaurantImages = [];

      // Upload new Restaurant Images to Cloudinary
      for (const image of restaurantImageFiles) {
        const R_b64 = Buffer.from(image.buffer).toString("base64");
        const R_dataURI = `data:${image.mimetype};base64,${R_b64}`;
        const R_result = await cloudinary.uploader.upload(R_dataURI, {
          folder: `BhojanAdmin/Resturants/${resturantName}`,
          width: 500,
          height: 500,
          crop: "fill",
        });
        if (!R_result) {
          const error = new Error("Restaurant Image Upload Failed");
          error.statusCode = 500;
          return next(error);
        }
        restaurantImages.push({
          imageLink: R_result.secure_url,
          imageId: R_result.public_id,
        });
      }
    }
    // Update Resturant
    resturant.resturantName = resturantName;
    resturant.address = address;
    resturant.lat = lat;
    resturant.lon = lon;
    resturant.cuisine = cuisine;
    resturant.foodType = foodType;
    resturant.managerName = managerName;
    resturant.managerPhone = managerPhone;
    resturant.receptionPhone = receptionPhone;
    resturant.email = email;
    resturant.status = status;
    resturant.openingTime = openingTime;
    resturant.closingTime = closingTime;
    resturant.averageCostForTwo = averageCostForTwo;
    resturant.openingStatus = openingStatus;
    resturant.resturantType = resturantType;
    resturant.GSTNo = GSTNo;
    resturant.FSSAINo = FSSAINo;
    resturant.upiId = upiId;
    resturant.bankAccNumber = bankAccNumber;
    resturant.ifscCode = ifscCode;
    resturant.managerImage = managerImage;
    resturant.restaurantImages = restaurantImages;
    await resturant.save();
    res.status(200).json({
      message: "Resturant Updated Successfully",
      data: resturant,
    });
  } catch (error) {
    next(error);
  }
};

export const GetResturantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resturant = await Resturant.findById(id);

    if (!resturant) {
      const error = new Error("Resturant Not Found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      message: "Resturant Fetched Successfully",
      data: resturant,
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteResturant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resturant = await Resturant.findById(id);
    if (!resturant) {
      const error = new Error("Resturant Not Found");
      error.statusCode = 404;
      return next(error);
    }
    resturant.status = "inactive";
    await resturant.save();
    res.status(200).json({
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};