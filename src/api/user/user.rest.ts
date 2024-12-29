import axiosConfig from "../axiosConfig";

export interface IUserInfo {
    id: number
    email: string
    name: string
    avatar_url: string
    role: string
}

export const getUserInfoApi = async () => (await axiosConfig.get('auth/user-info')).data

export const getUserInfoApiSsr = async (token?: string) => (await axiosConfig.get('auth/user-info', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})).data