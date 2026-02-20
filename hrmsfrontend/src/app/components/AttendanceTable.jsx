"use client";

export default function AttendanceTable({
    records,
    loading,
    error,
}) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Attendance Records</h2>

            {loading && <div className="text-gray-500">Loading...</div>}
            {error && <div className="text-red-600">{error}</div>}

            {!loading && !error && records.length === 0 && (
                <div className="text-gray-500">No attendance records found.</div>
            )}

            {!loading && !error && records.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border text-left">Date</th>
                                <th className="p-2 border text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((rec) => (
                                <tr key={rec._id} className="border-t hover:bg-gray-50">
                                    <td className="p-2 border">
                                        {new Date(rec.date).toDateString()}
                                    </td>
                                    <td className="p-2 border capitalize">{rec.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}