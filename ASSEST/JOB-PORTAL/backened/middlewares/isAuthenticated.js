import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Check if the token is present in the cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthenticated entry",
        success: false,
      });
    }

    // Verify the token
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // Attach userId to the request object
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export default isAuthenticated;
