import express from "express";
import cors from "cors";
import employeeRoutes from './routes/employeeRoutes.js'
import attendanceRoutes from './routes/attendanceRoutes.js'
const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "My hrms is working" })
})

app.use("/api/employees", employeeRoutes)
app.use("/api/attendance", attendanceRoutes)

export default app;