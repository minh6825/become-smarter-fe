import { NEXT_PUBLIC_SERVER } from '@/assets/constant';
import axios from 'axios';

export interface ICategory {
  category_id: string
  category_name: string
  description: string
  created_at?: string
  updated_at?: string
}

export const fetchCategories = async () => {
  const response = await axios.get(`${NEXT_PUBLIC_SERVER}/categories`);
  return response.data;
};

  export const fetchCategory = async (id: string) => {
    const response = await axios.get(`${NEXT_PUBLIC_SERVER}/categories/${id}`);
    return response.data;
  };

  