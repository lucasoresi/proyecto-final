import { createContext } from "react";

export interface AuthAdminContextValue {
    isAuthenticatedAdmin: boolean;
    setIsAuthenticatedAdmin: (value: boolean) => void;
}

export const AuthAdminContext =
    createContext<AuthAdminContextValue | null>(null);
