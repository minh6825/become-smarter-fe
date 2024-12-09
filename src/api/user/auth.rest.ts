import axios from "axios"


export const loginGoogleApi = async () => {
    return axios.get('http://localhost:8000/api/v1/auth/google-login', {
        timeout: 10000,
    })
}

export const googleRedirectApi = async () => {
    return axios.get('http://localhost:8000/api/v1/auth/google-redirect', {
          timeout: 10000,
    })
}