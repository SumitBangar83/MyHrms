"use client";

export default function EmployeeTable({
    employees,
    loading,
    error,
    onDelete,
}) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Employees List</h2>

            {loading && <div className="text-gray-500">Loading...</div>}
            {error && <div className="text-red-600">{error}</div>}

            {!loading && !error && employees.length === 0 && (
                <div className="text-gray-500">No data yet</div>
            )}

            {!loading && !error && employees.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border text-left">Employee ID</th>
                                <th className="p-2 border text-left">Name</th>
                                <th className="p-2 border text-left">Email</th>
                                <th className="p-2 border text-left">Department</th>
                                <th className="p-2 border text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp._id} className="border-t hover:bg-gray-50">
                                    <td className="p-2 border">{emp.employeeId}</td>
                                    <td className="p-2 border">{emp.fullName}</td>
                                    <td className="p-2 border">{emp.email}</td>
                                    <td className="p-2 border">{emp.department}</td>
                                    <td className="p-2 border">
                                        <div className="flex gap-2">
                                            <a
                                                href={`/attendance/${emp.employeeId}`}
                                                className="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-1.5 text-sm transition hover:bg-gray-100"
                                            >
                                                Attendance
                                            </a>

                                            <button
                                                onClick={() => onDelete(emp._id)}
                                                className="inline-flex items-center justify-center rounded-md border border-red-600 bg-red-600 px-3 py-1.5 text-sm text-white transition hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}