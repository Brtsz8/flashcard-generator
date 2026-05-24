import { useState } from "react"

import { useNavigate } from "react-router-dom"

import toast from "react-hot-toast"
import { GoogleLogin } from "@react-oauth/google";

import { googleLogin} from "../services/authService"

import { registerUser } from "../services/authService"
import AuthFooter from "../components/auth/AuthFooter"
import AuthHeader from "../components/auth/AuthHeader"
import { useAuth } from "../hooks/useAuth"
import RegisterForm from "../components/auth/RegisterForm"

import { FaGithub } from "react-icons/fa"

export default function RegisterPage() {
  const navigate = useNavigate()

  const { login } = useAuth()

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {

    try {
      const data = await registerUser(
        username,
        email,
        password
      )

      await login(data.token)

      toast.success("Account created")

      navigate("/dashboard")
    } catch (err) {
      toast.error("Register failed")
      console.error(err)
    }
  }

  const handleGithubLogin = () => {
      const clientId =
          import.meta.env.VITE_GITHUB_CLIENT_ID

      const redirectUri =
          "http://localhost:5173/auth/github/callback"

      const scope =
          "read:user user:email"

      window.location.href =
          `https://github.com/login/oauth/authorize` +
          `?client_id=${clientId}` +
          `&redirect_uri=${redirectUri}` +
          `&scope=${scope}` +
          `&prompt=login`
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-gray-200
          bg-white
          p-10
          shadow-sm
        "
      >
        {/* Header */}
        <AuthHeader
          title="Create account"
          subtitle="Start building your study system"
        />

        {/* Form */}
        <RegisterForm onSubmit={handleRegister}/>

        <div className="flex flex-col gap-2 py-2">
            {/*Google Auth*/}
            <GoogleLogin

                onSuccess={async (
                    credentialResponse
                ) => {
                    try {
                        const data = await googleLogin(
                            credentialResponse.credential!)

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
          text="Already have an account?"
          linkText="Login"
          onClick={() => navigate("/login")}
        />
      </div>
    </div>
  )
}