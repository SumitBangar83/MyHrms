const API_BASE = process.env.NEXT_PUBLIC_BASE_URL;

async function request(endpoint, options = {}) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    });

    const text = await res.text();
    let data;
    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }

    if (!res.ok) {
        throw new Error(data?.message || "Request failed");
    }

    return data;
}

export const api = {
    getEmployees: () => request("/employees"),

    createEmployee: (payload) =>
        request("/employees", {
            method: "POST",
            body: JSON.stringify(payload),
        }),

    deleteEmployee: (id) =>
        request(`/employees/${id}`, {
            method: "DELETE",
        }),

    getAttendance: (employeeId) =>
        request(`/attendance/${employeeId}`),

    markAttendance: (payload) =>
        request("/attendance", {
            method: "POST",
            body: JSON.stringify(payload),
        }),
};