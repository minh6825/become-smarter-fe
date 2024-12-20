"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputPrimary from "@/components/tags/input/input-primary";
import ButtonPrimary from "@/components/tags/button/button-primary";

const FilterHome = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    tags: "",
    questionSet: "",
    quizSkill: "",
    sortBy: "",
    search: "",
  });

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
    router.push(`/?${query}`);
  };

  return (
    <div className="p-4 rounded-md shadow mb-4">
      <div className="grid grid-cols-6 items-center gap-4">
        <InputPrimary
          label="Search"
          type="text"
          name="search"
          placeholder="Search by tags"
          value={filters.search}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <InputPrimary
          label="Search tags"
          type="text"
          name="tags"
          placeholder="Search by tags"
          value={filters.tags}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <InputPrimary
          label="Question set"
          type="text"
          name="questionSet"
          placeholder="Search by question set"
          value={filters.questionSet}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <div>
          <label className="block text-sm font-medium ">Quiz skill</label>
          <select
            name="quizSkill"
            value={filters.quizSkill}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 border rounded h-[42px] bg-primary-background"
          >
            <option value="">All Skills</option>
            <option value="READING">Reading</option>
            <option value="LISTENING">Listening</option>
            <option value="SPEAKING">Speaking</option>
            <option value="WRITING">Writing</option>
            <option value="DICTATION">Dictation</option>
            <option value="THPT">THPT</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium ">Sort by</label>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="p-2 w-full border rounded h-[42px] bg-primary-background"
          >
            <option value="">Sort By</option>
            <option value="latest">Latest</option>
            <option value="popular">Popular</option>
          </select>
        </div>
        <ButtonPrimary
          type="button"
          className="self-end"
          onClick={handleSearch}
        >
          Search
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default FilterHome;
