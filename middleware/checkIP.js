export function restrictToLocalhost(req, res, next) {
  // Check if the request originated from localhost (127.0.0.1)
  if (req.ip === "127.0.0.1" || req.ip === "::1") {
    // If it's from localhost, proceed to the next middleware
    next();
  } else {
    // If it's not from localhost, respond with a forbidden error
    res.status(403).json({ error: "Forbidden" });
  }
}
