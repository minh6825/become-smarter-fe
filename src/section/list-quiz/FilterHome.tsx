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
import { MdCleaningServices, MdClear, MdClearAll } from "react-icons/md";
import { FaTrash, FaTrashAlt } from "react-icons/fa";

const FilterHome = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    tags: "",
    questionSet: "",
    category: "",
    sortBy: "",
    search: "",
    subCategory: "",
    quizSet: "",
  });
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subcategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [quizSets, setQuizSets] = useState<IQuizSet[]>([]);
  const [isDetailedView, setIsDetailedView] = useState(true);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | any
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
    handleSearch();

    return () => {};
  }, [filters]);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getSubCategories = async () => {
      if (filters.category) {
        const subCategoriesData = await fetchSubCategories({
          categoryId: filters.category,
        });
        setSubCategories(subCategoriesData);
      }
    };
    getSubCategories();
  }, [filters.category]);

  useEffect(() => {
    const getQuizSets = async () => {
      if (filters.subCategory) {
        const data = await fetchQuizSets({
          subCategoryId: filters.subCategory,
        });
        setQuizSets(data);
      }
    };
    getQuizSets();
  }, [filters.subCategory]);

  return (
    <div
      className="p-6 rounded-md shadow-lg mb-4"
      style={{
        backgroundColor: "var(--root-background)",
        color: "var(--root-text)",
        border: "1px solid var(--primary)",
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 items-center">
          <h2
            className="text-xl font-semibold max-md:hidden"
            style={{ color: "var(--primary)" }}
          >
            Filter Options
          </h2>
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md shadow-md bg-red-500 text-white hover:bg-red-600 transition-all duration-150"
            onClick={() =>
              setFilters({
                tags: "",
                questionSet: "",
                category: "",
                sortBy: "",
                search: "",
                subCategory: "",
                quizSet: "",
              })
            }
          >
            <FaTrashAlt className="text-white" />
            Clear
          </button>
        </div>
        <ButtonPrimary
          type="button"
          className="!w-fit px-4 py-2 "
          onClick={() => setIsDetailedView(!isDetailedView)}
        >
          {isDetailedView ? "Show Compact View" : "Show Detailed View"}
        </ButtonPrimary>
      </div>

      {isDetailedView ? (
        <div className="grid grid-cols-5 gap-4 max-md:grid-cols-1">
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
          <InputPrimary
            label="Search"
            type="text"
            name="search"
            placeholder="Search by tags"
            value={filters.search}
            onChange={handleFilterChange}
            className="px-2 border rounded"
          />
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((item) => (
              <button
                key={item.category_id}
                onClick={() =>
                  handleFilterChange({
                    target: { name: "category", value: item.category_id },
                  })
                }
                className={`px-4 py-2 rounded-full border text-sm`}
                style={{
                  backgroundColor:
                    filters.category === item.category_id
                      ? "var(--primary)"
                      : "var(--root-background-table)",
                  color:
                    filters.category === item.category_id
                      ? "var(--primary-foreground)"
                      : "var(--root-text)",
                  border: "1px solid var(--primary)",
                }}
              >
                {item.category_name}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {subcategories.map((item) => (
              <button
                key={item.sub_category_id}
                onClick={() =>
                  handleFilterChange({
                    target: {
                      name: "subCategory",
                      value: item.sub_category_id,
                    },
                  })
                }
                className={`px-4 py-2 rounded-full border text-sm`}
                style={{
                  backgroundColor:
                    filters.subCategory === item.sub_category_id
                      ? "var(--primary)"
                      : "var(--root-background-table)",
                  color:
                    filters.subCategory === item.sub_category_id
                      ? "var(--primary-foreground)"
                      : "var(--root-text)",
                  border: "1px solid var(--primary)",
                }}
              >
                {item.sub_category_name}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {quizSets.map((item) => (
              <button
                key={item.quiz_set_id}
                onClick={() =>
                  handleFilterChange({
                    target: { name: "quizSet", value: item.quiz_set_id },
                  })
                }
                className={`px-4 py-2 rounded-full border text-sm`}
                style={{
                  backgroundColor:
                    filters.quizSet === item.quiz_set_id
                      ? "var(--primary)"
                      : "var(--root-background-table)",
                  color:
                    filters.quizSet === item.quiz_set_id
                      ? "var(--primary-foreground)"
                      : "var(--root-text)",
                  border: "1px solid var(--primary)",
                }}
              >
                {item.quiz_set_name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterHome;
