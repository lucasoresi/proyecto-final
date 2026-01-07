import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const loadMe = async () => {
            try {
                const resp = await fetch("http://localhost:4000/api/auth/me", {
                    credentials: "include",
                });

                if (!mounted) return;

                if (resp.ok) {
                    const { user } = await resp.json();
                    setIsAuthenticated(true);
                    localStorage.setItem("userName", user?.email ?? user?.email ?? "");
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem("userName");
                }
            } catch {
                setIsAuthenticated(false);
                localStorage.removeItem("userName");
            } finally {
                if (mounted) setLoading(false);
            }
        };

        loadMe();

        return () => {
            mounted = false;
        };
    }, []);

    const logout = async () => {
        try {
            await fetch('http://localhost:4000/api/auth/logout', { method: 'POST', credentials: 'include' });
        } catch (e) {
            // ignore
        }
        localStorage.removeItem('isAuthenticatedAdmin');
        localStorage.removeItem('userName');
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    if (loading) {
        return <div>Cargando...</div>; 
    }


    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            setIsAuthenticated, 
            logout, 
            loading 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
