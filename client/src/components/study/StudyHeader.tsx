type Props = {
    currentIndex : number
    length: number
}
        
export default function StudyHeader({
    currentIndex,
    length
} : Props){
    return (
        <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-black">
            Study Mode
            </h1>

            <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
                Card {currentIndex + 1} of {length}
            </p>

            <div className="h-2 w-40 overflow-hidden rounded-full bg-gray-200">
                <div
                className="h-full bg-black transition-all duration-300"
                style={{
                    width: `${
                    ((currentIndex + 1) / length) * 100
                    }%`,
                }}
                />
            </div>
            </div>
        </div> 
    )

}   
