
// Map to store request counts for each IP address
const requestCounts = {};

// Middleware function to implement rate limiting
const rateLimitMiddleware = (req, res, next) => {
    const ipAddress = req.ip; // Extract IP address from request
    const maxRequests = 20; // Maximum allowed requests per time window
    const windowMs = 60000; // Time window in milliseconds (1 minute)
    // Initialize request count for IP address if not present
    if (!requestCounts[ipAddress]) {
        requestCounts[ipAddress] = {
            count: 0,
            timestamp: Date.now()
        };
    }

    const now = Date.now();
    const lastTimestamp = requestCounts[ipAddress].timestamp;

    // If time window has elapsed, reset request count and timestamp
    if (now - lastTimestamp > windowMs) {
        requestCounts[ipAddress] = {
            count: 1,
            timestamp: now
        };
    } else {
            // Check if request count exceeds the maximum limit
    if (requestCounts[ipAddress].count > maxRequests) {
        return res.status(429).send('<script>alert("Too Many Requests! Please try after some time.");</script>');
    }
        // Increment request count within time window
        requestCounts[ipAddress].count++;
    }
    console.log(requestCounts);
    // Allow the request to proceed
    next();
}

// Apply rate limiting middleware to all routes
module.exports={rateLimitMiddleware};