import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react"

import type { User } from "../types/auth"
import { getMe } from "../services/authService"


interface AuthContextType {
    user: User | null
    loading: boolean
    login: (
        token: string
    ) => Promise<void>

    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

// AuthProvider wraps the application and provides globla auth state
export const AuthProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    //login function, stores token, fetches user data
    const login = async (
        token: string
    ) => {
        localStorage.setItem("token", token)

        const me = await getMe()

        setUser(me)

    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    //Runs once when the app starts
    //to restore auth session from localStorage
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem("token")

            if(!token) {
                setLoading(false)
                return
            }

            try {
                const me = await getMe()
                setUser(me)
            } 
            catch {
                //token is peobably invalid - remove invalid token
                localStorage.removeItem("token")
            }
            finally {
                //always stop loading
                setLoading(false)
            }
        }

        // execute async initalization
        initializeAuth()
    }, [])


    //Provide global auth state to all children components
    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout
            }}>
            
            {children}
        </AuthContext.Provider>
    )
}

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
