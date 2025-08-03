import jwt from 'jsonwebtoken';

async function tokenAuthentication(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "User not logged in",
        error: true,
        success: false
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded?._id;

    next();
  } catch (err) {
    console.error("Authentication Failed:", err.message);
    return res.status(401).json({
      message: "Invalid token",
      error: true,
      success: false
    });
  }
}

export default tokenAuthentication;
