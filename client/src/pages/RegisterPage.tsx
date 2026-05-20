import { useState } from "react"

import {
  useNavigate,
  Link,
} from "react-router-dom"

import toast from "react-hot-toast"

import { registerUser } from "../services/authService"

export default function RegisterPage() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      setLoading(true)

      const data = await registerUser(
        username,
        email,
        password
      )

      localStorage.setItem(
        "token",
        data.token
      )

      toast.success("Account created")

      navigate("/dashboard")
    } catch (err) {
      toast.error("Register failed")
      console.error(err)
    } finally {
      setLoading(false)
    }
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
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-widest text-gray-400">
            Flashcards App
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-black">
            Create account
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Start building your study system.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label
              className="
                text-sm
                font-medium
                text-gray-700
              "
            >
              Username
            </label>

            <input
              placeholder="johnsmith"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="
                w-full
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

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              className="
                text-sm
                font-medium
                text-gray-700
              "
            >
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
                w-full
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

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              className="
                text-sm
                font-medium
                text-gray-700
              "
            >
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
                w-full
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

          {/* Submit */}
          <button
            disabled={loading}
            className="
              mt-4
              w-full
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
            {loading
              ? "Creating account..."
              : "Create account"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="
                font-medium
                text-black
                underline-offset-4
                transition
                hover:underline
              "
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}