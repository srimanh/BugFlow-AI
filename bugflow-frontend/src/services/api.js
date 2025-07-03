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
