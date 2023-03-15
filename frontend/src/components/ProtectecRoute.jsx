import { Outlet,Navigate } from "react-router-dom";

export default function ProtectedRoute({
    isAllowed,
    redirectTo = '/',
    children,
}){
    if(!isAllowed){
        return <Navigate to={redirectTo} replace />;
    }
    return children ? children : <Outlet />;
};