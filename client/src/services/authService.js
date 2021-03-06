import jwtDecode from "jwt-decode";

const { REACT_APP_API_URL } = process.env;
const apiEndPoint = `${REACT_APP_API_URL}/api/auth/login`;
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
    console.log(error, "in getCurrentUser");
    return null;
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
}
