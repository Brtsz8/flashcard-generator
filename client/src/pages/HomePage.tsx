import { Link } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"

export default function HomePage() {
    return (
        <MainLayout>
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h1 className="mb-6 text-5xl font-bold tracking-tight text-black sm:text-6xl">
                    Generate Flashcards with AI
                </h1>
                <p className="mb-10 max-w-2xl text-lg text-gray-600">
                    Master any subject faster than ever. Upload your notes or just provide a topic, 
                    and our AI will generate optimized flashcards for your study sessions.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/register"
                        className="rounded-lg bg-black px-8 py-3 text-lg font-semibold text-white transition hover:bg-gray-800"
                    >
                        Get Started for Free
                    </Link>
                    <Link
                        to="/login"
                        className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-lg font-semibold text-black transition hover:bg-gray-50"
                    >
                        Log In
                    </Link>
                </div>
            </div>
        </MainLayout>
    )
}
