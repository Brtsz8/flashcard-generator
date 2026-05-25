import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { GoogleLogin } from "@react-oauth/google";
import { Login, type LoginResponse } from "react-facebook"
import { FaGithub } from "react-icons/fa"

import { googleLogin, loginUser, facebookLogin } from "../services/authService"
//import { useAuth } from "../store/AuthContext"
import { useAuth } from "../hooks/useAuth"

//components
import AuthHeader from "../components/auth/AuthHeader"
import AuthFooter from "../components/auth/AuthFooter";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
    const navigate = useNavigate()
    const { login } = useAuth()

    //this function will be passed into LoginForm component
    const handleLogin = async (
        email: string,
        password: string
    ) => {
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
        }
    }

    const handleGithubLogin = () => {
        const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID
        const redirectUri = "http://localhost:5173/auth/github/callback"
        const scope = "read:user user:email"

        window.location.href =
            `https://github.com/login/oauth/authorize` +
            `?client_id=${clientId}` +
            `&redirect_uri=${redirectUri}` +
            `&scope=${scope}` +
            `&prompt=login`

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
                <AuthHeader
                    title="Welcome back"
                    subtitle="Log in to continue studying!"
                />
                {/*Form*/}
                <LoginForm onSubmit={handleLogin}/>

                <div className="flex flex-col gap-2 py-2">
                    {/*Google Auth*/}
                    <GoogleLogin

                        onSuccess={async (
                            credentialResponse
                        ) => {
                            try {
                                const data = await googleLogin(
                                    credentialResponse.credential!)

                                //localStorage.setItem("token", data.token)
                                //this caused problems - state not updating fast enough, fix:
                                await login(data.token)

                                toast.success("Logged in with Google")
                                navigate("/dashboard")
                            } catch (err) {
                                toast.error("Google login failed")
                            }
                        }}

                        onError={() => {

                            toast.error(
                                "Google login failed"
                            );
                        }}
                    /> 
                    {/*Facebook Auth*/}
                    <Login
                        scope="email,public_profile"
                        onSuccess={async (response: LoginResponse) => {
                            try {
                                const data = await facebookLogin(response.authResponse.accessToken)
                                console.log('data: ', data)
                                await login(data.token)
                                toast.success("Logged in with Facebook")
                                navigate("/dashboard")
                            } catch {
                                toast.error("Facebook login failed")
                            }
                            finally {
                                console.log("response: ", response)
                            }
                        }}
                        onError={() => toast.error("Facebook login failed")}
                        className="
                            relative
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-md
                            bg-[#1877F2]
                            px-4
                            py-3
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-[#166FE5]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="absolute left-3 h-5 w-5"
                            aria-hidden="true"
                        >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Continue with Facebook
                    </Login>

                    {/*GitHub auth*/}
                    <button
                        onClick={handleGithubLogin}
                        className="
                            mt-2
                            flex
                            h-10
                            w-full
                            items-center
                            rounded
                            border
                            border-[#d1d5db]
                            bg-white
                            px-4
                            text-sm
                            font-medium
                            text-[#3c4043]
                            hover:bg-[#f8f9fa]
                        "
                    >
                        <div className="w-6">
                            <FaGithub className="text-[18px]" />
                        </div>

                        <div className="flex-1 text-center">
                            Zaloguj się przez GitHub
                        </div>
                    </button>

                </div>
                
                {/* Footer */}
                <AuthFooter
                    text="Don't have an account?"
                    linkText="Sign up"
                    onClick={() => navigate('/register')}
                />
            </div>   

        </div>

    )
}