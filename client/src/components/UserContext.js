import React, { useState, useEffect } from "react";

import { getCurrentUser } from "../services/authService";

export const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      setUser(getCurrentUser());
    } catch (error) {}
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
