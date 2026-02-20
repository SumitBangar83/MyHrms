import Attendance from "../models/Attendance.js";
import employee from "../models/Employee.js";

export const markAttendance = async (req, res) => {
    try {
        let { employeeId, date, status } = req.body;

        if (!employeeId || !date || !status) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const normalizedStatus = String(status).toLowerCase();

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        if (!["present", "absent"].includes(normalizedStatus)) {
            return res.status(400).json({ message: "Status should be present or absent" });
        }
        const normalizedEmployeeId = String(employeeId).toUpperCase().trim();

        const emp = await employee.findOne({ employeeId: normalizedEmployeeId });
        if (!emp) {
            return res.status(404).json({ message: "employee not found" });
        }

        const attendanceDate = new Date(parsedDate);
        attendanceDate.setUTCHours(0, 0, 0, 0);

        const existing = await Attendance.findOne({
            employeeId: normalizedEmployeeId,
            date: attendanceDate,
        });

        if (existing) {
            return res.status(409).json({ message: "Attendance already marked for this date" });
        }

        const attendance = await Attendance.create({
            employeeId: normalizedEmployeeId,
            date: attendanceDate,
            status: normalizedStatus,
        });

        return res.status(201).json({ message: "attendance marked", attendance });
    } catch (err) {
        console.error("Mark attendance error:", err.message);
        return res.status(500).json({ message: "Server error" });
    }
};


export const getAttendanceByEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        console.log("empid", employeeId);

        if (!employeeId) {
            return res.status(400).json({ message: "employeeId is required" });
        }
        const emp = await employee.findOne({ employeeId });
        if (!emp) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const records = await Attendance.find({ employeeId }).sort({ date: -1 });

        if (records.length === 0) {
            return res.status(404).json({ message: "No attendance records found" });
        }

        return res.status(200).json(records);
    } catch (err) {
        console.error("get attendance error:", err.message);
        return res.status(500).json({ message: "Server error" });
    }
};

