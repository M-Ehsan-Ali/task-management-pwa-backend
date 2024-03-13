// middleware/authMiddleware.js

const requireAuth = (req, res, next) => {
  // Get the user ID from the request body
  const userId = req.query.user;

  // Check if the user ID exists
  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User ID missing in request" });
  }

  try {
    // Attach the user ID to the request object
    req.user = { userId };

    // Call the next middleware function
    next();
  } catch (err) {
    // If an error occurs, return an unauthorized error
    return res.status(401).json({ message: "Unauthorized: Invalid user ID" });
  }
};

module.exports = { requireAuth };
