import axiosConfig from "../axiosConfig";


export const getUserInfoApi = async () => (await axiosConfig.get('auth/user-info')).data