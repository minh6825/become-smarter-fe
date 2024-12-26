import axiosConfig from "@/api/axiosConfig";
import { useEffect, useState } from "react";
import { Word } from "./WordListManager";
import InputPrimary from "@/components/tags/input/input-primary";

const WordManager: React.FC<{ wordListId: number }> = ({ wordListId }) => {
    const [words, setWords] = useState<Word[]>([]);
    const [newWord, setNewWord] = useState({ word: "", language: "", description: "" });
  
    // Fetch Words in WordList
    const fetchWords = async () => {
      const response = await axiosConfig.get(`/word-lists/list/${wordListId}/word`);
      setWords(response.data);
    };
  
    // Add Word
    const addWord = async () => {
      if (!newWord.word || !newWord.language) {
        alert("Word and language are required!");
        return;
      }
  
      await axiosConfig.post(`/word-lists/${wordListId}/words`, newWord);
      setNewWord({ word: "", language: "", description: "" });
      fetchWords();
    };
  
    // Delete Word
    const deleteWord = async (id: number) => {
      await axiosConfig.delete(`/word-lists/words/${id}`);
      fetchWords();
    };
  
    useEffect(() => {
      fetchWords();
    }, [wordListId]);
  
    return (
      <div>
        <h2 className="text-lg font-bold mb-4">Manage Words</h2>
        <div className="mb-4">
          <InputPrimary
            type="text"
            placeholder="Word"
            value={newWord.word}
            onChange={(e) => setNewWord((prev) => ({ ...prev, word: e.target.value }))}
            className="border p-2 mr-2"
          />
          <InputPrimary
            type="text"
            placeholder="Language"
            value={newWord.language}
            onChange={(e) => setNewWord((prev) => ({ ...prev, language: e.target.value }))}
            className="border p-2 mr-2"
          />
          <InputPrimary
            type="text"
            placeholder="Description"
            value={newWord.description}
            onChange={(e) => setNewWord((prev) => ({ ...prev, description: e.target.value }))}
            className="border p-2 mr-2"
          />
          <button onClick={addWord} className="p-2 bg-green-500 text-white">
            Add Word
          </button>
        </div>
  
        <div className="space-y-2">
          {words.map((word) => (
            <div key={word.word_id} className="border p-2 rounded">
              <p>
                <strong>{word.word}</strong> ({word.language})
              </p>
              <p>{word.description}</p>
              <button
                onClick={() => deleteWord(word.word_id)}
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
  
  export default WordManager;
  