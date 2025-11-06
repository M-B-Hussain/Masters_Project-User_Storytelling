'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { QuizScreen } from '@/components/QuizScreen'

const quizData = [
  {
    id: 1,
    question: "How much do you think Deutsche Bahn has paid in compensation to customers for train delays (2024)?",
    options: [
      "€100 million",
      "€197 million", 
      "€50 million",
      "€150 million"
    ],
    correctAnswer: 1,
    explanation: "In 2024, the bill for German train delays soared to a record €197 million in passenger compensation—a nearly 50% jump from the previous year.",
    image: "/images/hero-image.png",
    chart: "/images/chart-1.png"
  },
  {
    id: 2,
    question: "Which is the most common cause of train delays in Germany?",
    options: [
      "Weather disruptions",
      "Staff shortages", 
      "Passenger volume",
      "Infrastructure bottlenecks"
    ],
    correctAnswer: 3,
    explanation: "Record-high compensation and decades-low punctuality are driven by the fact that 80% of long-distance delays are directly caused by Germany's outdated, fault-prone infrastructure. DB is now committing a massive overhaul, initiating a multi-billion Euro renovation plan across 41 key corridors to stabilize the network and target 75-80% punctuality by 2027.",
    image: "/images/train-image.png",
    chart: "/images/pie-chart.png"
  },
  {
    id: 3,
    question: "What is the average delay time per passenger train in Germany (2024)?",
    options: [
      "2 minutes",
      "5 minutes",
      "12 minutes", 
      "7 minutes"
    ],
    correctAnswer: 2,
    explanation: "For every passenger journey, four extra minutes of delay have been added beyond the 'on-time' limit, making the average train nearly 10.3 minutes late and officially failing the network.",
    image: "/images/delay-image.png",
    chart: "/images/punctuality-chart.png"
  }
]

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  
  // Load persisted completion state on mount so the button reflects prior completion
  useEffect(() => {
    try {
      const v = localStorage.getItem('quizCompleted')
      if (v === 'true') setQuizCompleted(true)
    } catch {}
  }, [])

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowResult(false)
      setSelectedAnswer(undefined)
    } else {
      // Quiz completed
      setQuizStarted(false)
      setQuizCompleted(true)
      try { localStorage.setItem('quizCompleted', 'true') } catch {}
      setCurrentQuestion(0)
      setShowResult(false)
      setSelectedAnswer(undefined)
    }
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center">
          {/* Hero image removed as requested */}

          {/* Title removed as requested */}

          {/* CTA removed as requested */}

          <div className="mb-8">
            <Image
              src="/images/DBHeadline.jpg"
              alt="Deutsche Bahn Background"
              width={1200}
              height={600}
              className="rounded-lg shadow-2xl mx-auto"
            />
          </div>

          {/* Added headline */}
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-black dark:text-white mb-6">
            Do you wanna know more about the Transportation System across Germany?
          </h2>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setQuizStarted(true)}
              className="px-8 py-4 bg-db-light-green text-white font-bold text-lg rounded-lg hover:bg-db-dark-green transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Start Interactive Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <QuizScreen
        question={quizData[currentQuestion]}
        onAnswer={handleAnswer}
        showResult={showResult}
        selectedAnswer={selectedAnswer}
      />
      
      {/* Floating controls after answering */}
      {showResult && currentQuestion < quizData.length - 1 && (
        <button
          onClick={nextQuestion}
          aria-label="Next question"
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-db-light-green text-white shadow-lg hover:bg-db-dark-green transition-colors duration-300 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M13.23 5.23a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L17.94 12l-4.71-4.69a.75.75 0 010-1.08z" />
            <path d="M5.25 12a.75.75 0 01.75-.75h11.19a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z" />
          </svg>
        </button>
      )}

      {showResult && currentQuestion === quizData.length - 1 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <Link
            href="/dashboard"
            onClick={() => {
              try { localStorage.setItem('quizCompleted', 'true') } catch {}
              setQuizCompleted(true)
            }}
            className="px-6 py-3 bg-db-dark-green text-white font-bold rounded-lg hover:bg-db-light-green transition-colors duration-300 shadow-lg"
          >
            View Dashboard
          </Link>
        </div>
      )}
    </div>
  )
}
