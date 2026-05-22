import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type Props = {
    children:
        React.ReactNode
}

export default function AdminRoute({
    children
}: Props) {

    const { user } = useAuth();

    if (user?.role !== "ADMIN") {
        return (
            <Navigate to="/dashboard"/>
        );
    }
    return children;
}