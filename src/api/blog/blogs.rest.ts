import axiosConfig from "../axiosConfig"

export interface IBlog {
    blog_id: string
    title: string
    content: string
    created_at: Date
    updated_at: Date
    tags: ITags[]
}

export interface ITags {
    tag_id: string
    name: string
}

export const fetchBlogList = async ({ page = 1, limit = 10, tag, sortBy }: { page?: number; limit?: number; tag?: string; sortBy?: string }): Promise< { blogs: IBlog[], total: number } > => {
    const response = await axiosConfig.get(`/blogs/list-blogs/?page=${page}&limit=${limit}&tag=${tag || ""}&sortBy=${sortBy || "newest"}`);
    return response.data;
}

export const fetchBlog = async (id: string) => {
    const response = await axiosConfig.get(`/blogs/get-one/${id}`);
    return response.data;
}