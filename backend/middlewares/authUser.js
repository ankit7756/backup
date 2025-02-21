import jwt from 'jsonwebtoken'

export const authUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Get token from Bearer header

        if (!token) {
            return res.json({ success: false, message: "Not Authorized, Login again!" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = decoded.id
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}