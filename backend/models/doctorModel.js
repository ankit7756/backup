import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js"; // Use named import

const Doctor = sequelize.define("Doctor", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  speciality: { type: DataTypes.STRING, allowNull: false },
  degree: { type: DataTypes.STRING, allowNull: false },
  experience: { type: DataTypes.STRING, allowNull: false },
  about: { type: DataTypes.TEXT, allowNull: false },
  available: { type: DataTypes.BOOLEAN, defaultValue: true },
  fees: { type: DataTypes.FLOAT, allowNull: false },
  address: { type: DataTypes.JSONB, allowNull: false },
  date: { type: DataTypes.BIGINT, allowNull: true },
  slots_booked: { type: DataTypes.JSONB, defaultValue: {} }
}, {
  timestamps: false,
});

export default Doctor;
