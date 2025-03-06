'use client'
import { useState } from "react";
import WordListManager from "./WordListManager";
import WordManager from "./WordManager";

const WordPage: React.FC = () => {
    const [selectedWordListId, setSelectedWordListId] = useState<number | null>(null);
  
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-6">Word List Manager</h1>
        <div className="flex gap-6 max-md:flex-col">
          <div className="w-1/5 max-md:w-full">
            <WordListManager onSelectWordList={(id) => setSelectedWordListId(id)} />
          </div>
          <div className="w-4/5 max-md:w-full">
            {selectedWordListId && <WordManager wordListId={selectedWordListId} />}
          </div>
        </div>
      </div>
    );
  };
  
  export default WordPage;
  