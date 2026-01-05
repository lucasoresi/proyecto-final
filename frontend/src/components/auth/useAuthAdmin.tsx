import { useContext } from "react";
import { AuthAdminContext } from "./AuthAdminContext";

export const useAuthAdmin = () => {
    const context = useContext(AuthAdminContext);
    if (!context) {
        throw new Error(
            "useAuthAdmin debe usarse dentro de AuthProviderAdmin"
        );
    }
    return context;
};
