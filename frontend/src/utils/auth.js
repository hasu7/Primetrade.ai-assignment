import { jwtDecode } from "jwt-decode";

export const getUserRole = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (err) {
  console.log("JWT decode failed:", err);
  return null;
}
};