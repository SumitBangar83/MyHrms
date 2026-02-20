"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AttendanceForm from "../../components/AttendanceForm";
import AttendanceTable from "../../components/AttendanceTable";

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL;

export default function AttendancePage() {
    const params = useParams();
    const employeeId = params.id;

    const [date, setDate] = useState("");
    const [status, setStatus] = useState("present");

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchAttendance() {
        try {
            setLoading(true);
            setError("");

            const res = await fetch(`${API_BASE}/attendance/${employeeId}`);
            const data = await res.json();

            if (!res.ok) {
                if (res.status === 404) {
                    setRecords([]);
                    setLoading(false);
                    return;
                }
                throw new Error(data.message || "Failed to fetch attendance");
            }

            setRecords(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (employeeId) {
            fetchAttendance();
        }
    }, [employeeId]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch(`${API_BASE}/attendance`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    employeeId: employeeId,
                    date,
                    status,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to mark attendance");
            }

            setDate("");

            fetchAttendance();
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gray-900 text-white px-6 py-4">
                <h1 className="text-xl font-semibold">Attendance</h1>
            </div>

            <div className="max-w-5xl mx-auto p-6 space-y-8">
                <AttendanceForm
                    employeeId={employeeId}
                    date={date}
                    status={status}
                    onDateChange={setDate}
                    onStatusChange={setStatus}
                    onSubmit={handleSubmit}
                />

                <AttendanceTable
                    records={records}
                    loading={loading}
                    error={error}
                />
            </div>
        </div>
    );
}