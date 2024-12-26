import { NEXT_PUBLIC_SERVER } from '@/assets/constant';
import axios from 'axios';
import { ICategory } from './category.rest';

export interface ISubCategory {
    sub_category_id: string
    sub_category_name: string
    category: ICategory
}

export const fetchSubCategories = async ({categoryId}: {categoryId: string}) => {
  const response = await axios.get(`${NEXT_PUBLIC_SERVER}/subcategories`, {
    params: {categoryId}
  });
  return response.data;
};