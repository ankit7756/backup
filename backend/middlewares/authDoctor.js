import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Not Authorized, Login again!" });
        }

        // Extract token from "Bearer <token>"
        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add doctor ID to request body
        req.body.doctorId = decoded.id;

        // Optionally store full decoded info
        req.doctor = decoded;

        next();
    } catch (error) {
        console.error(error);
        res.status(403).json({ success: false, message: "Invalid or expired token!" });
    }
};

export default authDoctor;


// const jwt = require("jsonwebtoken");
// module.exports.authDoctor = (req, res, next) => {
//   try {
//     const { doctortoken } = req.headers; // Use lowercase header key
//     // console.log(token)
//     if (!doctortoken) {
//       return res.json({ success: false, message: "Not Authorized ,Login again!" })
//     }
//     const tokenDecode = jwt.verify(doctortoken, process.env.JWT_SECRET)
//     // console.log(tokenDecode)
//     req.body.doctorId = tokenDecode.id
//     next()
//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }