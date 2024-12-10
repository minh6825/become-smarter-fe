import axiosConfig from "../axiosConfig"


export const getAllGroupTypeApi = async () => {
    return await axiosConfig.get('group-questions/get-list')
}