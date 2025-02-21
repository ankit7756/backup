// import express from 'express'
// import { doctorList } from '../controllers/doctorController.js'
// // const { authDoctor } = require('../middlewares/authDoctor')
// const doctorRouter = express.Router()
// doctorRouter.get('/list', doctorList)
// // doctorRoutes.post('/login', loginDoctor)
// // doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)
// // doctorRoutes.post('/complete-appointment', authDoctor, appointmentComplete)
// // doctorRoutes.post('/cancel-appointment', authDoctor, appointmentCancel)
// // doctorRoutes.get('/dashboard', authDoctor, doctorDashboard)
// // doctorRoutes.get('/profile', authDoctor, doctorProfile)
// // doctorRoutes.post('/update-profile', authDoctor, updateDoctorProfile)

// export default doctorRouter;

import express from 'express'
import { doctorList, getDoctorById } from '../controllers/doctorController.js'

const doctorRouter = express.Router()
doctorRouter.get('/list', doctorList)
doctorRouter.get('/:id', getDoctorById)

export default doctorRouter;

// const express = require('express')
// const { doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile } = require('../controllers/doctorController')
// const { authDoctor } = require('../middlewares/authDoctor')
// const doctorRoutes = express.Router()
// doctorRoutes.post('/list', doctorList)
// doctorRoutes.post('/login', loginDoctor)
// doctorRoutes.get('/appointments', authDoctor, appointmentsDoctor)
// doctorRoutes.post('/complete-appointment', authDoctor, appointmentComplete)
// doctorRoutes.post('/cancel-appointment', authDoctor, appointmentCancel)
// doctorRoutes.get('/dashboard', authDoctor, doctorDashboard)
// doctorRoutes.get('/profile', authDoctor, doctorProfile)
// doctorRoutes.post('/update-profile', authDoctor, updateDoctorProfile)
// module.exports = doctorRoutes


// Chatgpt

// const express = require('express');
// const {
//   doctorList,
//   loginDoctor,
//   appointmentsDoctor,
//   appointmentComplete,
//   appointmentCancel,
//   doctorDashboard,
//   doctorProfile,
//   updateDoctorProfile,
// } = require('../controllers/doctorController');
// const { authDoctor } = require('../middlewares/authDoctor');

// const doctorRoutes = express.Router();

// doctorRoutes.post('/login', loginDoctor);
// doctorRoutes.get('/doctors', doctorList); // Changed from `/list`
// doctorRoutes.get('/appointments', authDoctor, appointmentsDoctor);
// doctorRoutes.patch('/appointments/:id/complete', authDoctor, appointmentComplete); // Changed to `PATCH`
// doctorRoutes.delete('/appointments/:id', authDoctor, appointmentCancel); // Changed to `DELETE`
// doctorRoutes.get('/dashboard', authDoctor, doctorDashboard);
// doctorRoutes.get('/profile', authDoctor, doctorProfile);
// doctorRoutes.patch('/profile', authDoctor, updateDoctorProfile); // Changed from `POST` to `PATCH`

// module.exports = doctorRoutes;
