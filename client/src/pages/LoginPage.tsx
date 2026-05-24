import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { GoogleLogin } from "@react-oauth/google";
import {Login, type LoginResponse} from 'react-facebook'

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
                    >
                        Continue with Facebook

                    </Login>
                    
                    {/*Discord auth*/}
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