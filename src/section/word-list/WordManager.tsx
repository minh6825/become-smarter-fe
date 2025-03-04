import axiosConfig from "@/api/axiosConfig";
import { useEffect, useState } from "react";
import { Word } from "./WordListManager";
import InputPrimary from "@/components/tags/input/input-primary";
import ButtonPrimary from "@/components/tags/button/button-primary";
import TextareaPrimary from "@/components/tags/textarea/textarea-primary";
import {
  addWordsToListWord,
  deleteWordApi,
  getWordsInListApi,
} from "@/api/quiz/word-list.rest";
import { useRouter } from "next/navigation";
import TiptapSecondary from "@/components/tags/tiptap/tiptap-secondary.tiptap";
import { TiptapPrimary } from "@/components/tags/tiptap/titap-primary";

const WordManager: React.FC<{ wordListId: number }> = ({ wordListId }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [newWord, setNewWord] = useState({
    word: "",
    language: "English",
    description: "",
  });

  // Fetch Words in WordList
  const fetchWords = async () => {
    const response = await getWordsInListApi(wordListId);
    setWords(response.data);
  };

  // Add Word
  const addWord = async () => {
    if (!newWord.word || !newWord.language) {
      alert("Word and language are required!");
      return;
    }

    await addWordsToListWord({ newWord, wordListId });
    setNewWord({ word: "", language: "English", description: "" });
    fetchWords();
  };

  // Delete Word
  const deleteWord = async (id: number) => {
    await deleteWordApi(id);
    fetchWords();
  };

  useEffect(() => {
    fetchWords();
  }, [wordListId]);
  const router = useRouter();
  const handlePractice = () => {
    router.push(`/word-practice/${wordListId}`);
  };

  return (
    <div className="w-full ">
      <h2 className="text-lg font-bold mb-4">Manage Words</h2>
      <div className="w-full gap-4 flex max-md:flex-col"> 
        <div className="mb-4 flex flex-col gap-4 w-2/3 max-md:w-full">
          <div>
            <label htmlFor={"Từ mới"} className="block text-sm font-medium ">
              Từ mới
            </label>
            <TiptapSecondary
              height={100}
              value={newWord.word}
              onchange={(e) => setNewWord((prev) => ({ ...prev, word: e }))}
            />
          </div>

          <InputPrimary
            label="Ngôn ngữ"
            type="text"
            placeholder="Language"
            value={newWord.language}
            onChange={(e) =>
              setNewWord((prev) => ({ ...prev, language: e.target.value }))
            }
            className="border p-2 mr-2"
          />
          <div>
          <label htmlFor={"Từ mới"} className="block text-sm font-medium ">
              Mô tả
            </label>
            <TiptapSecondary
            isShowMenuBar={true}
            height={300}
            value={newWord.description}
            onchange={(e) => {
              setNewWord((prev) => ({ ...prev, description: e }));
            }}
          />
          </div>
          <ButtonPrimary
            type="button"
            onClick={addWord}
            className="p-2 !bg-green-500 text-white"
          >
            Add Word
          </ButtonPrimary>
          <ButtonPrimary
            type="button"
            onClick={handlePractice}
            className="p-2 !bg-primary-blue text-white"
          >
            Practice
          </ButtonPrimary>
        </div>
        <div className="space-y-2 w-1/3 max-h-[calc(100vh-220px)] overflow-y-auto max-md:w-full max-md:flex max-md:flex-wrap
        max-md:gap-2">
          {words.map((word) => (
            <div
              key={word.word_id}
              className="border bg-primary-background p-2 rounded max-md:w-[calc(50%-4px)] "
            >
              <p>
                <strong dangerouslySetInnerHTML={{__html: word.word}}></strong> ({word.language})
              </p>
              <p dangerouslySetInnerHTML={{__html: word.description}}></p>
              <ButtonPrimary
                type="button"
                onClick={() => deleteWord(word.word_id)}
                className="p-2 bg-primary-root-red !w-fit text-white mt-2"
              >
                Delete
              </ButtonPrimary>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordManager;
