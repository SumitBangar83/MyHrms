"use client";

import { useEffect, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

const API_BASE = "http://localhost:5000/api";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-gray-900 text-white px-6 py-4">
        <h1 className="text-xl font-semibold">HRMS Lite</h1>
      </div>


      <div className="max-w-5xl mx-auto p-6">
        <EmployeesPage />
      </div>
    </div>
  );
}

function EmployeesPage() {
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }


  async function fetchEmployees() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE}/employees`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch employees");
      }

      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);


  async function handleDelete(id) {
    const ok = confirm("Are you sure you want to delete this employee?");
    if (!ok) return;

    try {
      const res = await fetch(`${API_BASE}/employees/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete employee");
      }

      fetchEmployees();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create employee");
      }

      setForm({
        employeeId: "",
        fullName: "",
        email: "",
        department: "",
      });

      fetchEmployees();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="space-y-8">
      <EmployeeForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <EmployeeTable
        employees={employees}
        loading={loading}
        error={error}
        onDelete={handleDelete}
      />
    </div>
  );
}