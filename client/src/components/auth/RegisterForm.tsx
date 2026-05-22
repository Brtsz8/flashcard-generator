import { useState } from "react"

type Props = {
    onSubmit: (
        username: string,
        email: string,
        password: string
    ) => Promise<void>
}

export default function RegisterForm({
    onSubmit
}: Props) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    
    const handleSubmit =
        async (
            e: React.FormEvent<HTMLFormElement>
        ) => {

            e.preventDefault()
            try {
                setLoading(true)
                await onSubmit(
                    username,
                    email,
                    password
                )

            } finally {
                setLoading(false)
            }
        }
    return (
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
    )
}