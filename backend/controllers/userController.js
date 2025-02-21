import validator from "validator"
import bcrypt from "bcrypt"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from 'cloudinary';
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Input validation
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Credentials" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" });
        }

        if (password.length < 6) {
            return res.json({
                success: false,
                message: "Please enter strong password and length must be atleast 6 character",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.json({ success: false, message: "Email already registered" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user using Sequelize
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Generate token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.json({ success: false, message: "Invalid Credentials" });
        } else {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.body.userId;
        const userData = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, userData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !dob || !phone || !gender) {
            return res.status(400).json({ success: false, message: "Missing Information" });
        }

        await User.update({
            name,
            phone,
            address: JSON.parse(address),
            gender,
            dob
        }, {
            where: { id: userId }
        });

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image",
            });
            const imageUrl = imageUpload.secure_url;
            await User.update({
                image: imageUrl
            }, {
                where: { id: userId }
            });
        }

        res.json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotTime, slotDate } = req.body;

        // const doctorData = await Doctor.findByPk(docId, {
        const doctorData = await Doctor.findByPk(parseInt(docId), {
            attributes: { exclude: ['password'] }
        });

        if (!doctorData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        if (!doctorData.available) {
            return res.status(400).json({ success: false, message: "Doctor not available" });
        }

        let slots_booked = doctorData.slots_booked || {};

        if (slots_booked[slotDate]?.includes(slotTime)) {
            return res.status(400).json({ success: false, message: "Slot not available" });
        }

        if (!slots_booked[slotDate]) {
            slots_booked[slotDate] = [];
        }
        slots_booked[slotDate].push(slotTime);

        const userData = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });

        const appointmentData = {
            userId,
            doctorId: docId,
            userData: userData.toJSON(),
            doctorData: doctorData.toJSON(),
            amount: doctorData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        };

        const newAppointment = await Appointment.create(appointmentData);
        await Doctor.update(
            { slots_booked },
            { where: { id: docId } }
        );

        res.json({ success: true, message: "Appointment booked" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await Appointment.findAll({
            where: { userId }
        });

        res.json({ success: true, appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const cancelAppointment = async (req, res) => {
    try {
        // const { userId, appointmentId } = req.body;

        // const appointmentData = await Appointment.findByPk(appointmentId);
        const userId = req.body.userId;
        const { appointmentId } = req.body;

        const appointmentData = await Appointment.findByPk(appointmentId);

        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        // if (appointmentData.userId.toString() !== userId) {
        //     return res.status(403).json({ success: false, message: "Unauthorised Access" });
        // }
        // Convert both to same type (number) before comparison
        if (Number(appointmentData.userId) !== Number(userId)) {
            return res.status(403).json({ success: false, message: "Unauthorised Access" });
        }

        await Appointment.update(
            { cancelled: true },
            { where: { id: appointmentId } }
        );

        const { doctorId, slotDate, slotTime } = appointmentData;
        const doctorData = await Doctor.findByPk(doctorId);

        let slots_booked = doctorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await Doctor.update(
            { slots_booked },
            { where: { id: doctorId } }
        );

        return res.json({ success: true, message: "Appointment Cancelled" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment }

// export { registerUser, loginUser, getProfile }
