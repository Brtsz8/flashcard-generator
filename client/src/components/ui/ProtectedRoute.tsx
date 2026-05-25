import { useAuth } from "../../hooks/useAuth"
import ForbiddenPage from "../../pages/ForbiddenPage"

export default function ProtectedRoute({
    children
}: {
    children: React.ReactNode
}) {
    const { user, loading } = useAuth()

    if(loading) {
        return <div>Loading...</div>
    }

    if(!user) {
        return <ForbiddenPage />
    }

    return children
}