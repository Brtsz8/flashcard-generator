type Props = {
    title: string
    subtitle: string
}

export default function AuthHeader({
    title,
    subtitle
}: Props) {
    return (
        <div className="mb-10">
            <h1
                className="
                    text-4xl
                    font-bold
                    tracking-tight
                    text-black
                "
            >
                {title}
            </h1>
            <p
                className="
                    mt-3
                    text-sm
                    text-gray-500
                "
            >
                {subtitle}
            </p>
        </div>
    )
}