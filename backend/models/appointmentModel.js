// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/database.js"; // Use named import
// import User from "./userModel.js"; // Import the User model
// import Doctor from "./doctorModel.js"; // Import the Doctor model

// const Appointment = sequelize.define("Appointment", {
//     id: {
//         type: DataTypes.INTEGER,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//     },
//     userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: User,  // Refers to the User model
//             key: 'id',    // Refers to User model's id
//         },
//     },
//     doctorId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: Doctor,  // Refers to the Doctor model
//             key: 'id',      // Refers to Doctor model's id
//         },
//     },
//     slotDate: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     slotTime: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     userData: {
//         type: DataTypes.JSONB,
//         allowNull: false,
//     },
//     doctorData: {
//         type: DataTypes.JSONB,
//         allowNull: false,
//     },
//     amount: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     date: {
//         type: DataTypes.BIGINT,
//         allowNull: false,
//     },
//     cancelled: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
//     payment: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
//     isCompleted: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
// }, {
//     timestamps: false,  // Disabling timestamps since it's not necessary for this model
// });

// export default Appointment;

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import User from "./userModel.js";
import Doctor from "./doctorModel.js";

const Appointment = sequelize.define("Appointment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Doctor,
            key: 'id'
        }
    },
    slotDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slotTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userData: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    doctorData: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    cancelled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    payment: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});

// Define associations
Appointment.belongsTo(User, { foreignKey: 'userId' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });

export default Appointment;