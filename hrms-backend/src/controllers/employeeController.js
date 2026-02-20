import employee from "../models/Employee.js";
import { isValidGmail, isValidObjectId } from "../utils/validationUtils.js";
export const createEmployee = async (req, res) => {
    try {
        const { employeeId, fullName, email, department } = req.body;

        if (!employeeId || !fullName || !email || !department) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const normalizedEmployeeId = String(employeeId).toUpperCase().trim();

        if (!isValidGmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const existingEmployee = await employee.findOne({
            $or: [{ employeeId: normalizedEmployeeId }, { email }],
        });

        if (existingEmployee) {
            return res.status(409).json({ message: "employee with this record already exists" })
        }

        const Employee = await employee.create({
            employeeId: normalizedEmployeeId,
            fullName,
            email,
            department,
        });

        return res.status(201).json({ message: "employee record created successfully", Employee })

    }
    catch (err) {
        console.log("create employee err : ", err.message);
        return res.status(500).json({ message: "server error" })
    }
};


export const getAllEmployees = async (req, res) => {
    try {
        const employees = await employee.find().sort({ createdAt: -1 });
        if (employees.length === 0) {
            return res.status(200).json({ message: "no employees record found" })
        }
        return res.status(200).json(employees);
    }

    catch (err) {
        console.log("get all employees err : ", err.message)
        return res.status(500).json({ message: "server error" });
    }
};


export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid employeeId format" });
        }
        const emp = await employee.findByIdAndDelete(id);

        if (!emp) {
            return res.status(404).json({ message: "Employee not Found " });
        }

        return res.status(200).json({ message: "Employee deleted Successfully" });
    }
    catch (err) {
        console.log("employee deleting error", err.message);
        return res.status(500).json({ message: "server err" })
    }

}