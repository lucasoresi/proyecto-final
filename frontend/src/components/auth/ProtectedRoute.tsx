import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/components/auth/useAuth";

// export default function ProtectedRoute() {
//     const { isAuthenticated } = useAuth();

    // return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace/>;
// }

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
    return null; 
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;