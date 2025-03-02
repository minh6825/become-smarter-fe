import axiosConfig from "../axiosConfig";
import { IBlog } from "../blog/blogs.rest";

export interface IBlogTag {
    tag_id: string
    name: string
    blogs: IBlog[]
}


export const fetchBlogTagsList = async ({ page = 1, limit = 10, tag, sortBy }: { page?: number; limit?: number; tag?: string; sortBy?: string }): 
    Promise< { blogTag: IBlogTag[], total: number } > => {
    const response = await axiosConfig.get(`/blog-tags/list-tags/?page=${page}&limit=${limit}&tag=${tag || ""}&sortBy=${sortBy || "newest"}`);
    return response.data;
}