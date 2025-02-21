// import jwt from "jsonwebtoken";

// const authAdmin = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization; // Standard header key

//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({ success: false, message: "Not Authorized, Login again!" });
//         }

//         // Extract token from "Bearer <token>"
//         const token = authHeader.split(" ")[1];

//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Ensure token contains the correct admin email
//         if (decoded.email !== process.env.ADMIN_EMAIL) {
//             return res.status(403).json({ success: false, message: "Not Authorized, Login again!" });
//         }

//         req.admin = decoded; // Store admin data in request
//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(403).json({ success: false, message: "Invalid or expired token!" });
//     }
// };

// export default authAdmin;
import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {
        // Try to get token from headers.authorization
        let token = null;
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            // Extract token from "Bearer <token>"
            token = authHeader.split(" ")[1];
        } else if (req.headers.admintoken) {
            // Also check for admintoken header
            token = req.headers.admintoken;
        }

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized, Login again!" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure token contains the correct admin email
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Not Authorized, Login again!" });
        }

        req.admin = decoded; // Store admin data in request
        next();
    } catch (error) {
        console.error(error);
        res.status(403).json({ success: false, message: "Invalid or expired token!" });
    }
};

export default authAdmin;

