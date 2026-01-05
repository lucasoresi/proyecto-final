import { Navigate, Outlet } from "react-router-dom";
import { useAuthAdmin } from "./useAuthAdmin";

export default function ProtectedAdmin() {
    const auth = useAuthAdmin();

    return auth.isAuthenticatedAdmin ? <Outlet /> : <Navigate to="/login" replace />;
}

