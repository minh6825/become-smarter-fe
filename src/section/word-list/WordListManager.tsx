'use client'
import React, { useState, useEffect } from "react";
import InputPrimary from "@/components/tags/input/input-primary";
import axiosConfig from "@/api/axiosConfig";
import TextareaPrimary from "@/components/tags/textarea/textarea-primary";
import ButtonPrimary from "@/components/tags/button/button-primary";
import PopupWrap from "@/components/common/popup-wrap";
import { createWordListApi, deleteWordListApi, getWordList } from "@/api/quiz/word-list.rest";

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
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedWordListId, setSelectedWordListId] = useState<number | null>(null);

  // Fetch WordLists
  const fetchWordLists = async () => {
    const response = await getWordList()
    setWordLists(response.data);
  };

  // Add WordList
  const createWordList = async () => {
    if (!newWordList.name) {
      alert("Word list name is required!");
      return;
    }

    await createWordListApi(newWordList)
    setNewWordList({ name: "", description: "" });
    fetchWordLists();
  };

  // Delete WordList
  const deleteWordList = async (id: number | null) => {
    if (!id) return;
    await deleteWordListApi(id)
    fetchWordLists();
  };


  useEffect(() => {
    fetchWordLists();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Manage Word Lists</h1>
      <div className="mb-4 flex flex-col gap-4">
        <InputPrimary
          type="text"
          placeholder="Word List Name"
          value={newWordList.name}
          onChange={(e) =>
            setNewWordList((prev) => ({ ...prev, name: e.target.value }))
          }
          className="border p-2 mr-2"
        />
        <TextareaPrimary
          placeholder="Description"
          value={newWordList.description}
          onChange={(e) =>
            setNewWordList((prev) => ({ ...prev, description: e.target.value }))
          }
          className="border p-2 mr-2"
        />
        <ButtonPrimary type="button" onClick={createWordList} className="p-2 !bg-blue-500 ">
          Add Word List
        </ButtonPrimary>
      </div>

      <div className="max-h-[calc(100vh-510px)] flex flex-wrap gap-2 overflow-y-auto">
        {wordLists.map((list) => (
          <div
            key={list.word_list_id}
            className="border p-4 bg-primary-background rounded shadow cursor-pointer h-full"
            onClick={() => onSelectWordList(list.word_list_id)} // Gọi hàm khi người dùng chọn WordList
          >
            <h2 className="font-bold">{list.name}</h2>
            <p>{list.description}</p>
            <ButtonPrimary type="button" 
              onClick={() => {setShowDeletePopup(true); setSelectedWordListId(list.word_list_id);}}
              className="p-2 bg-red-500 !w-fit text-white mt-2"
            >
              Delete
            </ButtonPrimary>
          </div>
        ))}
      </div>
      <PopupWrap isOpen={showDeletePopup} onClose={() => setShowDeletePopup(false)} >
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
          <p>Are you sure you want to delete this word list?</p>
          <div className="flex justify-end mt-4">
            <ButtonPrimary type="button" onClick={() => setShowDeletePopup(false)} className="p-2 mr-2">
              Cancel
            </ButtonPrimary>
            <ButtonPrimary type="button" onClick={() => {
              deleteWordList(selectedWordListId);
              setShowDeletePopup(false);
            }} className="p-2 bg-red-500 text-white">
              Delete
            </ButtonPrimary>
          </div>
        </div>
      </PopupWrap>

    </div>
  );
};

export default WordListManager;
