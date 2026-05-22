type Props = {
    username? : string
}

export default function DashboardHeader({
    username
}: Props) {
    return (
        <section className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p className="mb-2 text-sm uppercase tracking-widest text-gray-400">
                Dashboard
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-black">
                Welcome back, {username}
                </h1>

                <p className="mt-3 text-gray-500">
                Continue studying or create a new deck.
                </p>
            </div>
        </section>
    )
}