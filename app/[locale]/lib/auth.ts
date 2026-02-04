import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  email: string;
  is_admin: boolean;
  exp: number;
};

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function getUser() {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getToken() && getUser());
}

export function isAdmin() {
  const user = getUser();
  return Boolean(user?.is_admin);
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
}
