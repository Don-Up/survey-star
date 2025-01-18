

const TOKEN = "token"
const EMAIL = "email"

export function getToken() {
    return localStorage.getItem(TOKEN)
}

export function setToken(token?: string) {
    localStorage.setItem(TOKEN, token || "")
}

export function removeToken() {
    localStorage.removeItem(TOKEN)
}

export function getEmail() {
    return localStorage.getItem(EMAIL)
}

export function setEmail(email?: string) {
    localStorage.setItem(EMAIL, email || "")
}