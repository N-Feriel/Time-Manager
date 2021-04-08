const jwt = localStorage.getItem("token");

export const getgMotherList = async () => {
  return await fetch("/api/users/gMotherList", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": `${jwt}`,
    },
  });
};
