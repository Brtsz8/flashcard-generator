import { captureOwnerStack, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFlashcards } from "../services/flashcardService";
import MainLayout from "../layouts/MainLayout";
import toast from "react-hot-toast";

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
            <div>
                <h2>No flashcards yet</h2>
                <button onClick={() => navigate(`/deck/${deckId}`)}>
                    Go back to your deck
                </button>
            </div>
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
            <h1>Study Mode</h1>
            <hr/>
            <p>Card {currentIndex + 1} / {flashcards.length}</p>
            <hr/>
            <div style={{
                border: "2px solid gray",
                padding: "3rem",
                marginTop: "2rem",
                minHeight: "200px"
            }}
            >
                {!showAnswer ? (
                    <div>
                        <h2>Question</h2>
                        <p>
                            {currentCard.question}
                        </p>
                    </div>
                ) : (
                    <div>
                        <h2>Answer</h2>
                        <p>
                            {currentCard.answer}
                        </p>
                    </div>
                )}
            </div>

            <div 
                style={{
                    marginTop: "2rem"
                }}
            >
                {!showAnswer ? (
                    <button onClick={() => setShowAnswer(true)}>
                        Show Answer
                    </button>
                ) : (
                    <button onClick={handleNext}>Next Card</button>
                )}

            </div>
        </MainLayout>
    )
}