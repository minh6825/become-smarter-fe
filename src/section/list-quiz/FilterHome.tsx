"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputPrimary from "@/components/tags/input/input-primary";
import ButtonPrimary from "@/components/tags/button/button-primary";
import { fetchCategories, ICategory } from "@/api/quiz/category.rest";
import { fetchSubCategories, ISubCategory } from "@/api/quiz/subcategory.rest";
import { fetchQuizSets, IQuizSet } from "@/api/quiz/quiz-set.rest";
import SelectPrimary from "@/components/tags/select/select-primary";

const FilterHome = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    tags: "",
    questionSet: "",
    category: "",
    sortBy: "",
    search: "",
    subCategory: "",
    quizSet: ""
  });
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subcategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [quizSets, setQuizSets] = useState<IQuizSet[]>([]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    const query = new URLSearchParams({
      ...filters,
      page: "1", // Reset to page 1 on new search
    }).toString();
    router.push(`/list-quiz/?${query}`);
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getSubCategories = async () => {
      const subCategoriesData = await fetchSubCategories({ categoryId: filters.category });
      setSubCategories(subCategoriesData);
    };
    getSubCategories();
  }, [filters.category]);

  useEffect(() => {
    const getQuizSets = async () => {
      const data = await fetchQuizSets({ subCategoryId: filters.subCategory });
      setQuizSets(data);
    };
    getQuizSets();
  }, [filters.subCategory]);

  return (
    <div className="p-4 rounded-md shadow mb-4 bg-primary-background">
      <div className="grid grid-cols-6 items-center gap-4 max-md:grid-cols-2">
        <InputPrimary
          label="Search"
          type="text"
          name="search"
          placeholder="Search by tags"
          value={filters.search}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <SelectPrimary
          label="Các nhóm đề"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          options={categories.map((category) => ({
            value: category.category_id,
            label: category.category_name,
          }))}
        />
        <SelectPrimary
          label="Các nhóm đề phụ"
          name="subCategory"
          value={filters.subCategory}
          onChange={handleFilterChange}
          options={subcategories.map((subCategory) => ({
            value: subCategory.sub_category_id,
            label: subCategory.sub_category_name,
          }))}
        />
        <SelectPrimary
          label="Các bộ đề"
          name="quizSet"
          value={filters.quizSet}
          onChange={handleFilterChange}
          options={quizSets.map((quizSet) => ({
            value: quizSet.quiz_set_id,
            label: quizSet.quiz_set_name,
          }))}
        />
        <SelectPrimary
          label="Sort by"
          name="sortBy"
          value={filters.sortBy}
          onChange={handleFilterChange}
          options={[
            { value: "", label: "Sort By" },
            { value: "latest", label: "Latest" },
            { value: "popular", label: "Popular" },
          ]}
        />
        <ButtonPrimary type="button" className="self-end" onClick={handleSearch}>
          Search
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default FilterHome;