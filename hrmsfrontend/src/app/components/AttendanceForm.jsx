"use client";

export default function AttendanceForm({
    employeeId,
    date,
    status,
    onDateChange,
    onStatusChange,
    onSubmit,
}) {

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Mark Attendance</h2>

            <div className="text-sm text-gray-500 mb-4">
                Employee ID: <span className="font-mono">{employeeId}</span>
            </div>

            <form
                onSubmit={onSubmit}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={date}
                    onChange={(e) => onDateChange(e.target.value)}
                    required
                />

                <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={status}
                    onChange={(e) => onStatusChange(e.target.value)}
                >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                </select>

                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md border border-green-600 bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                >
                    Save
                </button>
            </form>
        </div>
    );
}