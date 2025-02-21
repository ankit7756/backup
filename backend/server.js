import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/database.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";


const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
// app.use(cors());
// app.use(cors({
//   origin: ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
//   credentials: true
// }));

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175",
    "http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://127.0.0.1:5175"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'adminToken'], // remove admintoken if doesnt work like before
  credentials: true
}));

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);


app.get("/", (req, res) => {
  res.send("Hello Anonymous Y'all");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
