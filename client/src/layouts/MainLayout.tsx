import type { ReactNode } from "react"
import Navbar from "../components/layout/Navbar"

interface Props {
    children: ReactNode
}

export default function MainLayout({
    children
}: Props) {
    return (
        <div
            className="
                min-h-screen
                bg-gray-50
            "
        >
            <Navbar/>

            <main
                className="
                    max-w-6xl
                    mx-auto
                    px-6
                    py-8
                "
            >
                {children}
            </main>

        </div>
    )
}