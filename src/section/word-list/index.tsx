'use client'
import { useState } from "react";
import WordListManager from "./WordListManager";
import WordManager from "./WordManager";
import UserWordLists from "./UserWordLists";

const WordPage: React.FC = () => {
    const [selectedWordListId, setSelectedWordListId] = useState<number | null>(null);
  
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-6">Word List Manager</h1>
        <div className="flex gap-6">
          <div className="w-1/3">
            <WordListManager onSelectWordList={(id) => setSelectedWordListId(id)} />
          </div>
          <div className="w-2/3">
            {selectedWordListId && <WordManager wordListId={selectedWordListId} />}
          </div>
        </div>
      </div>
    );
  };
  
  export default WordPage;
  