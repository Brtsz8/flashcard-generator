import { useAuth } from "../../hooks/useAuth";
import ForbiddenPage from "../../pages/ForbiddenPage";

type Props = {
    children:
        React.ReactNode
}

export default function AdminRoute({
    children
}: Props) {

    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user?.role !== "ADMIN") {
        return <ForbiddenPage />;
    }
    return children;
}