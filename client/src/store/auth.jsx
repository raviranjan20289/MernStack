import { createContext, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  return (
    <AuthContext.Provider value={{ storeTokenInLS }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};

export default { AuthContext, AuthProvider, useAuth };
