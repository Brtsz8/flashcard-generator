type Props = {
    text: string
    linkText: string
    onClick: () => void
}

export default function AuthFooter({
    text,
    linkText,
    onClick
}: Props) {
    return(
        <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
            {text}{" "}
            <button
            onClick={onClick}
            className="
                font-medium
                text-black
                underline-offset-4
                transition
                hover:underline
            "
            >
                {linkText}
            </button>
        </p>
        </div>   
    )
}