const BASE_URL = "http://localhost:8080/api";

export async function registerUser(data) {
  return await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export async function loginUser(data) {
  return await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export async function getAllBugs(token) {
  return await fetch(`${BASE_URL}/bugs/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export async function getReportedBugs(userId, token) {
  return await fetch(`${BASE_URL}/bugs/reported?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export async function getAssignedBugs(userId, token) {
  return await fetch(`${BASE_URL}/bugs/assigned?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}
export async function assignBug(bugId, userId) {
  const token = localStorage.getItem("token");
  return await fetch(`${BASE_URL}/bugs/assign?bugId=${bugId}&userId=${userId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());
}

export async function updateStatus(bugId, status) {
  const token = localStorage.getItem("token");
  return await fetch(`${BASE_URL}/bugs/status?bugId=${bugId}&status=${status}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());
}
export async function getUsersByRole(role) {
  const token = localStorage.getItem("token");
  return await fetch(`http://localhost:8080/api/users/role?role=${role}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());
}

export async function getAllNonManagers() {
  const token = localStorage.getItem("token");
  return await fetch(`http://localhost:8080/api/users/all-nonmanagers`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());
}

export async function getAISuggestion(title, description) {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:8080/api/ai/suggest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, description })
  });
  if (!res.ok) throw new Error("AI suggestion failed");
  const data = await res.json();
  return data.suggestion;
}