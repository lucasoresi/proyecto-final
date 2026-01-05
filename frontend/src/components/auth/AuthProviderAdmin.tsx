import { ReactNode, useState } from "react";
import { AuthAdminContext, AuthAdminContextValue } from "./AuthAdminContext";

interface Props {
    children: ReactNode;
}

export default function AuthProviderAdmin({ children }: Props) {
    const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(
        localStorage.getItem("isAuthenticatedAdmin") === "true"
    );

    const value: AuthAdminContextValue = {
        isAuthenticatedAdmin,
        setIsAuthenticatedAdmin,
    };

    return (
        <AuthAdminContext.Provider value={value}>
            {children}
        </AuthAdminContext.Provider>
    );
}

