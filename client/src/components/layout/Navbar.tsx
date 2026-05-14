import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
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