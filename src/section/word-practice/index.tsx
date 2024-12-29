'use client';
import React from 'react';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

type Word = {
    word_id: number;
    word: string;
    language: string;
    description: string;
    status: string;
    public: boolean;
    audioFile: string | null;
};

type Props = {
    words: Word[];
};

const WordPracticePage = ({ words }: Props) => {
    console.log(words);
    return (
        <div className="flex items-center justify-center h-[calc(100vh-200px)] bg-primary-background p-4">
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                className="w-[100vw] overflow-x-hidden max-w-md flex items-center max-md:w-[80vw]"
                modules={[EffectCards]}
                effect={'cards'}
            >
                {words.map((word) => (
                    <SwiperSlide key={word.word_id} className="flex justify-center rounded-lg  items-center">
                        <div className="card bg-white rounded-lg shadow-lg h-[200px] p-6 hover:scale-105 transition-transform overflow-hidden duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{word.word}</h3>
                            <p className="text-gray-600 mb-2">{word.description}</p>
                            <p className="text-gray-500 text-sm">Status: {word.status}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default WordPracticePage;
