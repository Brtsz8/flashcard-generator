import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function Navbar() {
    const navigate = useNavigate()
    const { user } = useAuth()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
        toast("Goodbye!")
    }

    return (
        <nav
            className="
            border-b
            bg-white"
        >
            <div
                className="
                    max-w-6xl
                    mx-auto
                    px-6
                    h-16
                    flex
                    items-center
                    justify-between
                "
            >
                <Link
                    to="/dashboard"
                    className="
                        text-xl
                        font-bold
                    "
                >
                    Flashcard Generator
                </Link>
                <div
                    className="
                        flex
                        gap-4
                        items-center
                    "
                >
                    <Link
                        to="/dashboard"
                        className="
                            text-sm
                        "
                    >
                        Dashboard
                    </Link>
                    {
                        user?.role === "ADMIN"
                        && (

                            <button
                                onClick={() =>
                                    navigate("/admin")
                                }
                            >
                                Admin
                            </button>
                        )
                    }

                    <button
                        onClick={handleLogout}
                        className="
                            bg-black
                            text-white
                            px-4
                            py-2
                            rounded-lg
                        "
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    )
}