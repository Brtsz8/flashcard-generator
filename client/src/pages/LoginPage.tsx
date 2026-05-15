import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"
import { useAuth } from "../store/AuthContext"
import toast from "react-hot-toast"

export default function LoginPage() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => 
                    setEmail(e.target.value)
                }
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => 
                    setPassword(e.target.value)
                }
            />
            <button type="submit">
                Login
            </button>
        </form>
    )
}