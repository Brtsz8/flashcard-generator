import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { GoogleLogin } from "@react-oauth/google";

import { loginUser } from "../services/authService"
import { useAuth } from "../store/AuthContext"

export default function LoginPage() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        try {
            const data = await loginUser(
                email,
                password
            )

            await login(data.token)
            toast.success("Logged In")
            navigate("/dashboard")

        } catch (err) {
            toast.error("Wrong email or password!")
            console.error(err)
        }
    }

    return(
        <div className="flex min-h-screen
            items-center justify-center
            bg-gray-50 px-6">
            <div className="w-full max-w-md rounded-3xl
                border border-gray-200 bg-white
                p-10 shadow-sm"
            >
                {/*Header*/}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold tracking-tight text-black">
                        Welcome back
                    </h1>
                    <p className="mt-3 text-sm text-gray-500">
                        Log in to continue studying
                    </p>
                </div>
                {/*Form*/}
                <form onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >
                     <div className="flex flex-col gap-2">
                        <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                        >
                        Email
                        </label>

                        <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="
                            rounded-2xl
                            border
                            border-gray-300
                            bg-white
                            px-4
                            py-3
                            text-black
                            outline-none
                            transition
                            placeholder:text-gray-400
                            focus:border-black
                        "
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                        >
                        Password
                        </label>

                        <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="
                            rounded-2xl
                            border
                            border-gray-300
                            bg-white
                            px-4
                            py-3
                            text-black
                            outline-none
                            transition
                            placeholder:text-gray-400
                            focus:border-black
                        "
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                        mt-4
                        rounded-2xl
                        bg-black
                        px-4
                        py-3
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:opacity-90
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        "
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form> 
                {/*Google Auth*/}
                <GoogleLogin

                    onSuccess={async (
                        credentialResponse
                    ) => {

                        console.log(
                            credentialResponse
                        );
                    }}

                    onError={() => {

                        toast.error(
                            "Google login failed"
                        );
                    }}
                /> 
                {/* Footer */}
                <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    Don’t have an account?{" "}
                    <button
                    onClick={() => navigate("/register")}
                    className="
                        font-medium
                        text-black
                        underline-offset-4
                        transition
                        hover:underline
                    "
                    >
                    Sign up
                    </button>
                </p>
                </div>              
            </div>   

        </div>

    )
}