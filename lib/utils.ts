import { BASE_URL } from "./baseUrl";

export function logout() {
  localStorage.removeItem("tk");
  localStorage.removeItem("refr");
  localStorage.removeItem("user");

  window.location.href = "/";
}

export async function refreshToken(): Promise<boolean> {
  const refresh = localStorage.getItem("refr");

  if (!refresh) return false;

  try {
    const res = await fetch("/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refresh }),
    });

    if (!res.ok) return false;

    const data = await res.json();

    localStorage.setItem("tk", data.access_token);
    localStorage.setItem("refr", data.refresh_token);

    return true;
  } catch {
    return false;
  }
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const reqUrl = `${BASE_URL}/${path}`
  let accessToken = localStorage.getItem("tk");

  const res = await fetch(reqUrl, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    const refreshed = await refreshToken();

    if (!refreshed) {
      logout();
      return;
    }
    accessToken = localStorage.getItem("tk");

    return fetch(reqUrl, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  return res;
}
