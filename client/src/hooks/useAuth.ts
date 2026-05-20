import { useContext } from "react"
import { AuthContext } from "../store/AuthContext"

//Custom hook for easier auth access
//const auth = useAuth()
//is better than
//const context = useContext(AuthContext)
export const useAuth = () => {
    const context = useContext(AuthContext)

    //safety check
    if(!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        )
    }

    return context
}