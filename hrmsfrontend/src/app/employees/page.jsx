"use client";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import Loader from "../../components/Loader";
import ErrorBox from "../../components/ErrorBox";
import EmployeeForm from "../../components/EmployeeForm";
import EmployeeTable from "../../components/EmployeeTable";

export default function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadEmployees() {
        try {
            setLoading(true);
            setError("");
            const data = await api.getEmployees();
            setEmployees(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadEmployees();
    }, []);

    async function handleAdd(form) {
        try {
            await api.createEmployee(form);
            loadEmployees();
        } catch (err) {
            alert(err.message);
        }
    }

    async function handleDelete(id) {
        if (!confirm("Are you sure you want to delete this employee?")) return;
        try {
            await api.deleteEmployee(id);
            loadEmployees();
        } catch (err) {
            alert(err.message);
        }
    }

    if (loading) return <Loader />;
    if (error) return <ErrorBox message={error} />;

    return (
        <div className="space-y-6">
            <EmployeeForm onSubmit={handleAdd} />
            {employees.length === 0 ? (
                <div className="text-gray-500">No employees found.</div>
            ) : (
                <EmployeeTable data={employees} onDelete={handleDelete} />
            )}
        </div>
    );
}