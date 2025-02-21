import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";
import User from "../models/userModel.js";

// Helper function for validation
const validateDoctorData = ({ name, email, password, experience, about, fees, speciality, degree, address }) => {
  if (!name || !email || !password || !experience || !about || !speciality || !degree || !fees || !address) {
    return "Missing required fields.";
  }
  if (!validator.isEmail(email)) {
    return "Invalid email format.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  return null;
};

// Add Doctor
export const addDoctor = async (req, res) => {
  try {
    const doctorData = req.body;
    const imageFile = req.file;

    // Validate input data
    const validationError = validateDoctorData(doctorData);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(doctorData.password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    // Create new doctor record
    const newDoctor = await Doctor.create({
      ...doctorData,
      password: hashedPassword,
      image: imageUrl
    });

    return res.status(201).json({ success: true, message: "Doctor added successfully", doctor: newDoctor });
  } catch (error) {
    console.error("Error adding doctor:", error);
    return res.status(500).json({ success: false, message: "Error adding Doctor." });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify admin credentials
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
      return res.json({ success: true, token });
    }

    return res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ success: false, message: "Error login Admin Dashboard." });
  }
};

export const allDoctors = async (req, res) => {
  try {
    // Using findAll instead of find since we're using Sequelize
    const doctors = await Doctor.findAll({
      attributes: {
        exclude: ['password'] // Excluding password from the results
      }
    });

    return res.status(200).json({
      success: true,
      doctors: doctors
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error fetching doctors"
    });
  }
};


// export const appointmentsAdmin = async (req, res) => {
//   try {
//     // Using Sequelize findAll with associations
//     const appointments = await Appointment.findAll({
//       include: [
//         { model: User, as: 'user' },
//         { model: Doctor, as: 'doctor' }
//       ],
//       order: [['createdAt', 'DESC']]
//     });

//     res.json({ success: true, appointments });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// Get all appointments
export const appointmentsAdmin = async (req, res) => {
  try {
    // Using Sequelize findAll without specifying aliases
    const appointments = await Appointment.findAll({
      include: [User, Doctor],
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Cancel appointment
export const appointmentCancelled = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // Find the appointment
    const appointmentData = await Appointment.findByPk(appointmentId);
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Update appointment status
    await Appointment.update(
      { cancelled: true },
      { where: { id: appointmentId } }
    );

    // Release doctor slot
    const { doctorId, slotDate, slotTime } = appointmentData;
    const doctorData = await Doctor.findByPk(doctorId);

    // Handle slots_booked (assuming it's stored as JSON in PostgreSQL)
    let slots_booked = doctorData.slots_booked || {};
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

      await Doctor.update(
        { slots_booked },
        { where: { id: doctorId } }
      );
    }

    return res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// // Admin dashboard data
// export const adminDashboard = async (req, res) => {
//   try {
//     // Count doctors, users, and appointments
//     const doctors = await Doctor.findAll();
//     const users = await User.findAll();
//     const appointments = await Appointment.findAll({
//       include: [
//         { model: Doctor, as: 'doctor' },
//         { model: User, as: 'user' }
//       ],
//       order: [['createdAt', 'DESC']]
//     });

//     const dashData = {
//       doctors: doctors.length,
//       appointments: appointments.length,
//       patients: users.length,
//       latestAppointment: appointments.slice(0, 5)
//     };

//     res.json({ success: true, dashData });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };


// Admin dashboard data
export const adminDashboard = async (req, res) => {
  try {
    // Count doctors, users, and appointments
    const doctors = await Doctor.findAll();
    const users = await User.findAll();
    const appointments = await Appointment.findAll({
      include: [Doctor, User],
      order: [['createdAt', 'DESC']]
    });

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointment: appointments.slice(0, 5)
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};