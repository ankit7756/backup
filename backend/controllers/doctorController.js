import Doctor from "../models/doctorModel.js";

const changeAvailability = async (req, res) => {
    try {
        const { doctorId } = req.body;
        const doctorData = await Doctor.findByPk(doctorId);
        if (!doctorData) {
            return res.json({ success: false, message: "Doctor not found" });
        }
        await Doctor.update(
            { available: !doctorData.available },
            { where: { id: doctorId } }
        );
        res.json({ success: true, message: "Availability Changed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


const doctorList = async (req, res) => {
    try {
        const doctors = await Doctor.findAll({
            attributes: {
                exclude: ['password', 'email']
            },
            raw: true
        });

        res.json({ success: true, doctors });
    } catch (error) {
        console.log("Error fetching doctors:", error);
        res.json({ success: false, message: error.message });
    }
};

const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(parseInt(req.params.id), {
            attributes: {
                exclude: ['password', 'email']
            }
        });

        if (!doctor) {
            return res.json({
                success: false,
                message: "Doctor not found"
            });
        }

        res.json({
            success: true,
            doctor: doctor.toJSON()
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

export { changeAvailability, doctorList, getDoctorById };


