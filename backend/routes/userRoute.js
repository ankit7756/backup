import express from 'express'
import upload from '../middlewares/multer.js'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment } from '../controllers/userController.js'
import { authUser } from '../middlewares/authUser.js'

const userRouter = express.Router()
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointments', authUser, listAppointment)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)

export default userRouter


// import express from 'express'
// import { registerUser, loginUser, getProfile } from '../controllers/userController.js'
// import { authUser } from '../middlewares/authUser.js'
// const userRouter = express.Router()
// userRouter.post('/register', registerUser)
// userRouter.post('/login', loginUser)
// userRouter.get('/get-profile', authUser, getProfile)

// export default userRouter
// userRoutes.get('/get-profile', authUser, getProfile)
// userRoutes.post('/update-profile', upload.single('image'), authUser, updateProfile)
// userRoutes.post('/book-appointment', authUser, bookAppointment)
// userRoutes.get('/appointments', authUser, listAppointment)
// userRoutes.post('/cancel-appointment', authUser, cancelAppointment)
// userRoutes.post('/payment-razorpay', authUser, paymentRazorpay)
// userRoutes.post('/verifyRazorpay', authUser, verifyRazorpay)

// Chatgpt

// const express = require('express');
// const {
//   userRegister, userLogin, getProfile, updateProfile,
//   bookAppointment, listAppointment, cancelAppointment,
//   paymentRazorpay, verifyRazorpay
// } = require('../controllers/userController');
// const upload = require('../middlewares/multer');
// const { authUser } = require('../middlewares/authUser');

// const userRoutes = express.Router();

// userRoutes.post('/register', userRegister);
// userRoutes.post('/login', userLogin);
// userRoutes.get('/get-profile', authUser, getProfile);
// userRoutes.patch('/update-profile', upload.single('image'), authUser, updateProfile);
// userRoutes.post('/book-appointment', authUser, bookAppointment);
// userRoutes.get('/appointments', authUser, listAppointment);
// userRoutes.delete('/cancel-appointment', authUser, cancelAppointment);
// userRoutes.post('/payment-razorpay', authUser, paymentRazorpay);
// userRoutes.post('/verify-razorpay', authUser, verifyRazorpay);

// module.exports = userRoutes;
