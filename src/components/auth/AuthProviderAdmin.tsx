import { useContext, createContext, useState, useEffect } from "react";

interface AuthContextType {
    children: React.ReactNode;
}

const AuthContext = createContext(
    {isAuthenticatedAdmin: false,}
);
export function AuthProvider({ children }: AuthContextType) {
    const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);

    return <AuthContext.Provider value={{ isAuthenticatedAdmin }}>
            {children}
        </AuthContext.Provider>;
}

export const useAuthAdmin = () => useContext(AuthContext);