import { useState } from "react"

type Props = {

    onSubmit: (
        email: string,
        password: string
    ) => Promise<void>
}

export default function LoginForm({
    onSubmit
}: Props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit =
        async (
            e: React.FormEvent<HTMLFormElement>
        ) => {

            e.preventDefault();
            //we pass handleLogin here as a function that will
            //fetch data, login user ect
            //here we only set loading stateW
            try {
                setLoading(true);
                await onSubmit(
                    email,
                    password
                );

            } finally {
                setLoading(false);
            }
        };

    return (

        <form
            onSubmit={handleSubmit}
            className="
                flex
                flex-col
                gap-5
            "
        >

            <div className="flex flex-col gap-2">

                <label
                    htmlFor="email"
                    className="
                        text-sm
                        font-medium
                        text-gray-700
                    "
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
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
                    className="
                        text-sm
                        font-medium
                        text-gray-700
                    "
                >
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
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
                {
                    loading
                        ? "Logging in..."
                        : "Login"
                }
            </button>

        </form>
    )
}