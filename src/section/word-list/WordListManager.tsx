import React, { useState, useEffect } from "react";
import InputPrimary from "@/components/tags/input/input-primary";
import axiosConfig from "@/api/axiosConfig";

interface WordList {
    word_list_id: number;
  name: string;
  description: string;
}

export interface Word {
    word_id: number;
    word: string;
    language: string;
    description: string;
  }

interface WordListManagerProps {
  onSelectWordList: (id: number) => void;
}

const WordListManager: React.FC<WordListManagerProps> = ({ onSelectWordList }) => {
  const [wordLists, setWordLists] = useState<WordList[]>([]);
  const [newWordList, setNewWordList] = useState({ name: "", description: "" });

  // Fetch WordLists
  const fetchWordLists = async () => {
    const response = await axiosConfig.get("/word-lists/user");
    setWordLists(response.data);
  };

  // Add WordList
  const createWordList = async () => {
    if (!newWordList.name) {
      alert("Word list name is required!");
      return;
    }

    await axiosConfig.post("/word-lists", newWordList);
    setNewWordList({ name: "", description: "" });
    fetchWordLists();
  };

  // Delete WordList
  const deleteWordList = async (id: number) => {
    await axiosConfig.delete(`/word-lists/${id}`);
    fetchWordLists();
  };

  useEffect(() => {
    fetchWordLists();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Manage Word Lists</h1>
      <div className="mb-4 flex  gap-4">
        <InputPrimary
          type="text"
          placeholder="Word List Name"
          value={newWordList.name}
          onChange={(e) =>
            setNewWordList((prev) => ({ ...prev, name: e.target.value }))
          }
          className="border p-2 mr-2"
        />
        <InputPrimary
          type="text"
          placeholder="Description"
          value={newWordList.description}
          onChange={(e) =>
            setNewWordList((prev) => ({ ...prev, description: e.target.value }))
          }
          className="border p-2 mr-2"
        />
        <button onClick={createWordList} className="p-2 bg-blue-500 text-white">
          Add Word List
        </button>
      </div>

      <div className="space-y-4">
        {wordLists.map((list) => (
          <div
            key={list.word_list_id}
            className="border p-4 rounded shadow cursor-pointer "
            onClick={() => onSelectWordList(list.word_list_id)} // Gọi hàm khi người dùng chọn WordList
          >
            <h2 className="font-bold">{list.name}</h2>
            <p>{list.description}</p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Ngăn không gọi onSelectWordList
                deleteWordList(list.word_list_id);
              }}
              className="p-2 bg-red-500 text-white mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordListManager;
