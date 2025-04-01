
import React, { createContext, useContext } from "react";

// Create a simplified AuthContext that doesn't require authentication
const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  // Always return as authenticated=false since we're removing authentication
  const authValue = {
    isAuthenticated: false,
    token: null,
    login: () => {},
    logout: () => {}
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
