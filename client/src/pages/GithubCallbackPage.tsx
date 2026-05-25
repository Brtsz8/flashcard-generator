import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { githubLogin } from "../services/authService"
import { useAuth } from "../hooks/useAuth"

export default function GithubCallbackPage() {
    const navigate = useNavigate()
    const { login } = useAuth()

    useEffect(() => {
        const handleGithubCallback = async () => {
            const params =
                new URLSearchParams(
                    window.location.search
                )

            const code = params.get("code")

            if(!code) {
                navigate("/login")
                return
            }

            try {
                const data = await githubLogin(code)

                await login(data.token)


                toast.success("Logged in with GitHub")
                navigate("/dashboard")

            } catch(err) {
                console.error(err)
                navigate("/login")
            }
        }

        handleGithubCallback()
    }, [])

    return (
        <div>
            Logging in with GitHub...
        </div>
    )
}