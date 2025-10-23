import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthAdmin } from "./AuthProviderAdmin";

export default function ProtectedAdmin() {
    const auth = useAuthAdmin();

    return auth.isAuthenticatedAdmin ? <Outlet /> : <Navigate to="/" />;
}

