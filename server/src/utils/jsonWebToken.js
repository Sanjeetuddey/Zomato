import jwt from "jsonwebtoken";

export const genToken = (userId, res) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("LoginKey", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const genTokenFp = (email, res) => {
  try {
    const token = jwt.sign({ key: email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });

    res.cookie("BhojanFp", token, {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
    return true;
  } catch (error) {
    return false;
  }
};