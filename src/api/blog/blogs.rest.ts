import axiosConfig from "../axiosConfig"

export interface IBlog {
    blog_id: string
    title: string
    content: string
    created_at: Date
    updated_at: Date
    view_count: number
    tags: ITags[]
}

export interface ITags {
    tag_id: string
    name: string
}

export const fetchBlogList = async ({ page = 1, take = 10, tagIds, sortBy }: { page?: number; take?: number; tagIds?: string; sortBy?: string }): Promise< { blogs: IBlog[], total: number } > => {
    const response = await axiosConfig.get(`/blogs/list-blogs/?page=${page}&take=${take}&tagIds=${tagIds || ""}&sortBy=${sortBy || "newest"}`);
    return response.data;
}

export const fetchBlog = async (id: string) => {
    const response = await axiosConfig.get(`/blogs/get-one/${id}`);
    return response.data;
}