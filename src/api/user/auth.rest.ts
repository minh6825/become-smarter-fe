import axios from "axios"


export const loginGoogleApi = async () => {
    return axios.get('http://localhost:8000/api/v1/auth/google-login')
}

export const googleRedirectApi = async () => {
    return axios.get('http://localhost:8000/api/v1/auth/google-redirect')
}