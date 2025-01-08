'use client';
import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const shuffleArray = (array: Word[]) => {
    return array.sort(() => Math.random() - 0.5);
};

const WordPracticePage = ({ words }: Props) => {
    const [shuffledWords, setShuffledWords] = useState<Word[]>([]);
    const sliderRef = useRef<Slider | null>(null);

    useEffect(() => {
        if (words.length > 0) {
            // Shuffle words initially
            setShuffledWords(shuffleArray([...words]));
        }
    }, [words]);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowRight') {
            sliderRef.current?.slickNext(); // Move to the next slide
        } else if (event.key === 'ArrowLeft') {
            sliderRef.current?.slickPrev(); // Move to the previous slide
        }
    };

    useEffect(() => {
        // Attach keydown event listener
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            // Cleanup keydown event listener
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        swipeToSlide: true,
        dots: false
    };

    if (shuffledWords.length === 0) {
        return <div className="flex items-center justify-center h-[calc(100vh-150px)] bg-primary-background">Loading...</div>;
    }
    return (
        <div className="flex flex-col items-center  justify-center h-[calc(100vh-150px)] p-4">
            <Slider ref={sliderRef} {...settings} className="w-[500px]" arrows={false} >
                {shuffledWords.map((word) => (
                    <div
                        key={word.word_id}
                        className="bg-primary-text-button shadow-lg rounded-lg min-h-[400px] p-6 flex flex-col justify-center items-center"
                    >
                        <h3 className="text-2xl font-bold text-gray-800 mb-2" dangerouslySetInnerHTML={{__html: word.word}}></h3>
                        <p className="text-gray-600 mb-2" dangerouslySetInnerHTML={{__html: word.description}}>
                            
                        </p>
                        <p className="text-gray-500 text-sm">Status: {word.status}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default WordPracticePage;
