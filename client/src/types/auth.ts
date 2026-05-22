export interface User {
    id: string
    email: string
    username: string
    role: "USER" | "ADMIN"
}