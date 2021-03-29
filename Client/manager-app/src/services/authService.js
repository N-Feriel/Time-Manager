import jwtDecode from "jwt-decode";

const apiEndPoint = "/api/auth/login";
const tokenKey = "token";

export async function login(email, password) {
  return fetch(apiEndPoint, {
    method: "POST",
    body: JSON.stringify(email, password),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  //localStorage.setItem(tokenKey, jwt)
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    console.log(error, "in getCurrentUseer");
    return null;
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
}
