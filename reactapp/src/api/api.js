const API_URL = "http://127.0.0.1:8000/api";
export const api = async (
endpoint,
method = "GET",
data = null,
token = null
) => {
const headers = {
"Content-Type": "application/json",
Accept: "application/json",
};
if (token) headers["Authorization"] = `Bearer ${token}`;
const response = await fetch(`${API_URL}${endpoint}`, {
method,
headers,
body: data ? JSON.stringify(data) : null,
});
return response.json();
};