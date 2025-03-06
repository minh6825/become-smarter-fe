import axios from "axios"
import axiosConfig from "../axiosConfig"


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

export const logoutApi = async () => {
    return axiosConfig.get('/auth/logout', {
        timeout: 10000,
    })
}