const jwt = localStorage.getItem("token");

export const getgMotherList = async () => {
  const { REACT_APP_API_URL } = process.env;

  return await fetch(`${REACT_APP_API_URL}/api/users/gMotherList`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": `${jwt}`,
    },
  });
};
