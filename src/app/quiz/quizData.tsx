'use client';

import React, { useState } from 'react';
import { QuizScreen } from '@/components/QuizScreen'; 
import { QuizQuestion } from '@/components/QuizScreen'; // Import the interface


// --- Quiz Data Definition (Matching README.md) ---
const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: "How much did DB pay in compensation for delays in 2024?",
        options: ["€50 million", "€197 million", "€100 million"],
        correctAnswer: 1, // Index 1 is "€197 million"
        explanation: "DB paid €197 million in compensation for delays in 2024, representing a 50% increase from the previous year. This staggering figure highlights the scale of the punctuality crisis.",
        image: "/images/compensation_graphic.png", // Example asset path
    },
    {
        id: 2,
        question: "What's the most common cause of train delays?",
        options: ["Personnel shortages", "Infrastructure bottlenecks", "Rolling stock defects"],
        correctAnswer: 1, // Index 1 is "Infrastructure bottlenecks"
        explanation: "Infrastructure bottlenecks are the most common cause, responsible for 80% of all train delays. This confirms a systemic issue with the German network's capacity.",
        chart: "/images/delay_cause_chart.png", // Example asset path
    },
    {
        id: 3,
        question: "What's the average delay time per train?",
        options: ["7.0 minutes", "5.1 minutes", "10.3 minutes"],
        correctAnswer: 2, // Index 2 is "10.3 minutes"
        explanation: "The average delay time per train is 10.3 minutes, which is officially recognized as 'failing the network's minimum standard.'",
        image: "/images/delay_time_metric.png", // Example asset path
    },
];

export default function HomePage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const isQuizFinished = currentQuestionIndex >= quizQuestions.length;
    
    // Safely access the current question only if the quiz is not finished
    const currentQuestion = quizQuestions[currentQuestionIndex];

    const handleAnswerSubmission = (selectedAnswer: number) => {
        if (showResult) return;

        // 1. Record the answer
        setUserAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[currentQuestionIndex] = selectedAnswer;
            return newAnswers;
        });

        // 2. Calculate score
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
        }

        // 3. Show feedback
        setShowResult(true);
    };

    const handleNextQuestion = () => {
        setShowResult(false);
        setCurrentQuestionIndex(prev => prev + 1);
    };

    if (isQuizFinished) {
        // --- Quiz Completion Screen ---
        return (
            <div className="p-8 min-h-screen bg-db-gray/20 dark:bg-db-dark-gray/90 flex items-center justify-center">
                <div className="text-center bg-white dark:bg-db-dark-gray p-12 rounded-xl shadow-2xl max-w-lg">
                    <h1 className="text-4xl font-inter font-extrabold text-db-dark-green dark:text-db-light-green mb-4">
                        Quiz Completed!
                    </h1>
                    <p className="text-xl font-roboto text-db-dark-gray dark:text-db-gray mb-6">
                        You scored {score} out of {quizQuestions.length}.
                    </p>
                    <button
                        onClick={() => {
                            setCurrentQuestionIndex(0);
                            setUserAnswers([]);
                            setScore(0);
                        }}
                        className="bg-db-red text-white py-2 px-6 rounded-lg font-bold hover:bg-db-dark-green transition"
                    >
                        Restart Quiz
                    </button>
                </div>
            </div>
        );
    }

    // --- Active Quiz Question ---
    return (
        <QuizScreen 
            question={currentQuestion} // <<< The line is now safe because we check ifQuizFinished first
            onAnswer={handleAnswerSubmission} 
            onNext={handleNextQuestion} 
            showResult={showResult}
            selectedAnswer={userAnswers[currentQuestionIndex]}
        />
    );
}