import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getFlashcards } from "../services/flashcardService";
import MainLayout from "../layouts/MainLayout";
import StudyHeader from "../components/study/StudyHeader";

interface Flashcard {
    id: string
    question: string
    answer: string
}

export default function StudyPage() {
    const {id} = useParams()
    const deckId = id as string

    const navigate = useNavigate()

    const [flashcards, setFlashcards] = useState<Flashcard[]>([])
    const [loading, setLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showAnswer, setShowAnswer] = useState(false)

    
    
    //fetch flashcards
    useEffect(() => {
        const fetchFlashcards = async () => {
            try{
                const data = await getFlashcards(
                    deckId
                )

                setFlashcards(data)
            }
            catch(err){
                console.error(err)
            }
            finally{
                setLoading(false)
            }
        }

        fetchFlashcards()
    }, [deckId])

    if (loading) {
        return <div>Loading...</div>
    }

    // if empty
    if(flashcards.length === 0){
        return(
            <MainLayout>
                <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6">
                <h2 className="text-3xl font-semibold text-black">
                    No flashcards yet
                </h2>

                <button
                    onClick={() => navigate(`/deck/${deckId}`)}
                    className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium transition hover:bg-gray-100"
                >
                    Back to Deck
                </button>
                </div>
            </MainLayout>
        )
    }
    
    //CARDS
    //current
    const currentCard = flashcards[currentIndex]
    
    //next
    const handleNext = () => {
        // last card case
        if(currentIndex === flashcards.length - 1) {
            toast.success("Study session complete!")
            navigate(`/deck/${deckId}`)
            return
        }

        setCurrentIndex((prev) => prev + 1)
        setShowAnswer(false)
    }    

    return(
    <MainLayout>
        <div className="mx-auto flex min-h-[80vh] max-w-3xl flex-col px-6 py-12">
        
        {/* Header */}
        <StudyHeader currentIndex={currentIndex} length={flashcards.length}/>

        {/* Flashcard */}
        <div
            className="
            flex flex-1 flex-col justify-between
            rounded-3xl border border-gray-300
            bg-white p-10 shadow-sm
            "
        >
            <div>
            <p className="mb-3 text-sm uppercase tracking-widest text-gray-400">
                {!showAnswer ? "Question" : "Answer"}
            </p>

            <div className="min-h-[220px] flex items-center">
                <p className="text-2xl leading-relaxed text-black">
                {!showAnswer
                    ? currentCard.question
                    : currentCard.answer}
                </p>
            </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex justify-end">
            {!showAnswer ? (
                <button
                onClick={() => setShowAnswer(true)}
                className="
                    rounded-2xl bg-black px-6 py-3
                    text-sm font-medium text-white
                    transition hover:opacity-90
                "
                >
                Show Answer
                </button>
            ) : (
                <button
                onClick={handleNext}
                className="
                    rounded-2xl border border-black
                    px-6 py-3 text-sm font-medium
                    transition hover:bg-gray-100
                "
                >
                Next Card
                </button>
            )}
            </div>
        </div>
        </div>
    </MainLayout>
    )
}