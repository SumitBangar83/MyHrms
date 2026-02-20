"use client";

export default function EmployeeForm({
    form,
    onChange,
    onSubmit,
}) {

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Add Employee</h2>

            <form
                onSubmit={onSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <input
                    name="employeeId"
                    placeholder="Employee ID"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.employeeId}
                    onChange={onChange}
                />
                <input
                    name="fullName"
                    placeholder="Full Name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.fullName}
                    onChange={onChange}
                />
                <input
                    name="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.email}
                    onChange={onChange}
                />
                <input
                    name="department"
                    placeholder="Department"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.department}
                    onChange={onChange}
                />

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        Add Employee
                    </button>
                </div>
            </form>
        </div>
    );
}