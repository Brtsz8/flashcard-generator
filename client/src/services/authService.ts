import api from "../api/axios"

export const loginUser = async (
    email: string,
    password: string
) => {
    const response = await api.post(
        "/auth/login",
        {
            email,
            password
        }
    )

    return response.data
}

export const registerUser = async (
    username: string,
    email: string,
    password: string,
) => {
    const response = await api.post(
        "/auth/register",
        {
            username,
            email,
            password
        }
    )

    return response.data
}

export const getMe = async () => {
    const response = await api.get("/auth/me")

    return response.data
}

export const googleLogin = async (
    credential: string
) => {
    const response = await api.post(
        "/auth/google",
        { credential }
    )

    return response.data
}

<<<<<<< HEAD
export const githubLogin = async (
    code: string
) => {
    const response = await api.post(
        "/auth/github",
        { code }
    )

=======
export const facebookLogin = async (
    accessToken: string
) => {
    const response = await api.post(
        "/auth/facebook",
        {accessToken}
    )
>>>>>>> feat/facebook-auth
    return response.data
}