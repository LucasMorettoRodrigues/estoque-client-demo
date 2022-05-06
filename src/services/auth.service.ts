import { api } from './api.service'

export const getUser = () => {
    const userStr = localStorage.getItem("user")
    if (userStr) return JSON.parse(userStr)
    return null
}

export const login = async (user: string, password: string) => {
    const data = await api.post("/auth", { user, password })

    if (data.data.token) {
        localStorage.setItem("user", JSON.stringify(data.data))
    }
}

export const logout = () => {
    localStorage.removeItem("user")
}