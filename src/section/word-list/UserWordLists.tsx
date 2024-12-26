import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from '@/api/axiosConfig';

interface WordList {
word_list_id: number;
  name: string;
  wordCount: number;
}

const UserWordLists = () => {
  const [wordLists, setWordLists] = useState<WordList[]>([]);

  useEffect(() => {
    const fetchWordLists = async () => {
      const response = await axiosConfig.get(`/word-lists/user/word-counts`);
      setWordLists(response.data);
    };

    fetchWordLists();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Your Word Lists</h1>
      <ul>
        {wordLists.map((list, index) => (
          <li key={list.word_list_id || index} className="border p-4 mb-2 rounded">
            <h2 className="font-bold">{list.name}</h2>
            <p>{list.wordCount} words</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserWordLists;
