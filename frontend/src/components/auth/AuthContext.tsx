import { createContext } from "react";

export interface AuthContextValue {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    logout: () => Promise<void>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    logout: async () => {},
    loading: true,
});
