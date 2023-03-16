import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import credentialsContext from "../context";

export default function ProtectedRoute({
    redirectTo = '/',
    children,
}){
    const { user } = useContext(credentialsContext)
    const isAllowed = user

    if(!isAllowed){
        return <Navigate to={redirectTo} replace />;
    }
    return children ? children : <Outlet />;
};