import { useEffect } from "react";
import { useAuth } from "./useAuth";

export const useSession = () => {
    const { setIsAuthenticated } = useAuth();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/auth/me", {
                    credentials: "include", // importante para enviar la cookie
                });

                if (!res.ok) {
                    setIsAuthenticated(false);
                    return;
                }

                const { user } = await res.json();
                if (user) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error("Error verificando sesión:", err);
                setIsAuthenticated(false);
            }
        };

        checkSession();
    }, [setIsAuthenticated]);
};