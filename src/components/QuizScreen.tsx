'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  image?: string
  chart?: string
}

interface QuizScreenProps {
  question: QuizQuestion
  onAnswer: (selectedAnswer: number) => void
  showResult?: boolean
  selectedAnswer?: number
}

export function QuizScreen({ question, onAnswer, showResult = false, selectedAnswer }: QuizScreenProps) {
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState<number | null>(selectedAnswer || null)

  // Reset any previous selection when the question changes
  useEffect(() => {
    setLocalSelectedAnswer(null)
  }, [question.id])

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setLocalSelectedAnswer(answerIndex)
      onAnswer(answerIndex)
    }
  }

  const isCorrect = showResult && localSelectedAnswer !== null && localSelectedAnswer === question.correctAnswer

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Question */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-inter text-black dark:text-white mb-8">
            {question.question}
          </h1>
        </div>

        {/* Images/Charts: show only after user answered */}
        {showResult && (question.image || question.chart) && (
          <div className="mb-8 flex justify-center">
            {question.image && (
              <Image
                src={question.image}
                alt="Question illustration"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            )}
            {question.chart && (
              <Image
                src={question.chart}
                alt="Data chart"
                width={400}
                height={300}
                className="rounded-lg shadow-lg ml-4"
              />
            )}
          </div>
        )}

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {question.options.map((option, index) => {
            const isSelected = localSelectedAnswer === index
            const isCorrectOption = showResult && localSelectedAnswer !== null && index === question.correctAnswer
            const isWrongOption = showResult && isSelected && !isCorrectOption

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-300 text-left
                  ${isCorrectOption
                    ? 'border-db-green bg-green-50 dark:bg-green-900'
                    : isWrongOption
                    ? 'border-db-red bg-red-50 dark:bg-red-900'
                    : isSelected
                    ? 'border-db-light-green bg-gray-50 dark:bg-gray-800'
                    : 'border-gray-300 dark:border-gray-600 hover:border-db-light-green'
                  }
                  ${!showResult ? 'hover:shadow-lg' : ''}
                `}
              >
                <span className="font-inter text-lg text-black dark:text-white">
                  {String.fromCharCode(65 + index)}. {option}
                </span>
              </button>
            )
          })}
        </div>

        {/* Result Display */}
        {showResult && (
          <div className="text-center">
            <div className={`
              text-2xl font-bold font-inter mb-4
              ${isCorrect ? 'text-db-green' : 'text-db-red'}
            `}>
              {isCorrect ? 'Yes, your answer is correct.' : 'You chose the incorrect option.'}
            </div>
            <div className="text-lg font-inter text-black dark:text-white max-w-4xl mx-auto">
              {question.explanation}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
