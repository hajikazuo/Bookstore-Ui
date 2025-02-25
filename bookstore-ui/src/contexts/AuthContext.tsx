import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getAuthToken, isAuthenticated, getUserEmail, getUserRoles  } from "../api/endpoints/AuthApi"; 

interface AuthContextType {
  isAuthenticated: boolean;
  email: string | null;
  roles: string[];
  token: string | null;
  updateAuthState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthContextType>({
    isAuthenticated: isAuthenticated(),
    email: getUserEmail(),
    roles: getUserRoles(),
    token: getAuthToken(),
    updateAuthState: () => {},
  });

  const updateAuthState = useCallback(() => {
    setAuthState({
      isAuthenticated: isAuthenticated(),
      email: getUserEmail(),
      roles: getUserRoles(),
      token: getAuthToken(),
      updateAuthState,
    });
  }, []);

  useEffect(() => {
    updateAuthState();
  }, [updateAuthState]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        updateAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
