// src/components/QuizScreen.tsx

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
  onAnswer: (selectedAnswer: number) => void // Function passed from Controller
  // REMOVED: onNext prop, as there is no button to advance the quiz
  showResult?: boolean
  selectedAnswer?: number
}

export function QuizScreen({ question, onAnswer, showResult = false, selectedAnswer }: QuizScreenProps) {
  // We rely on the parent (Controller) component to update selectedAnswer and showResult
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState<number | null>(selectedAnswer || null)

  // Reset any previous selection when the question changes
  useEffect(() => {
    if (!showResult) {
      setLocalSelectedAnswer(null)
    }
  }, [question.id, showResult])

  // MODIFIED: This function handles selection and instant submission.
  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setLocalSelectedAnswer(answerIndex)
      // INSTANT SUBMISSION: Calls the parent controller's answer function immediately.
      onAnswer(answerIndex) 
    }
  }
  
  // All explicit button actions are removed.

  const isCorrect = showResult && localSelectedAnswer !== null && localSelectedAnswer === question.correctAnswer

  return (
    <div className="min-h-screen bg-db-gray/20 dark:bg-db-dark-gray/90 flex items-start justify-center p-8 transition-colors duration-500">
      <div className="max-w-6xl w-full">
        
        {/* Question */}
        <div className="text-center mb-8 bg-white dark:bg-db-dark-gray p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold font-inter text-db-dark-gray dark:text-db-gray">
            {question.question}
          </h1>
        </div>

        {/* Answer Options - Now triggers submission on click */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {question.options.map((option, index) => {
            const isSelected = localSelectedAnswer === index
            const isCorrectOption = showResult && index === question.correctAnswer
            const isWrongOption = showResult && isSelected && index !== question.correctAnswer

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)} // Submission logic is here
                disabled={showResult}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-300 text-left font-roboto shadow
                  ${isCorrectOption
                    ? 'border-db-dark-green bg-db-light-green/40 dark:bg-db-dark-green/70 text-db-dark-gray dark:text-white font-bold' // Correct
                    : isWrongOption
                    ? 'border-db-red bg-db-red/30 dark:bg-db-red/70 text-db-dark-gray dark:text-white' // Wrong selection
                    : isSelected
                    ? 'border-db-light-green bg-db-gray dark:bg-db-dark-gray/70 text-db-dark-gray dark:text-db-gray' // Selected/Awaiting result
                    : 'border-db-gray dark:border-db-dark-gray/50 bg-white dark:bg-db-dark-gray text-db-dark-gray dark:text-db-gray hover:border-db-light-green'
                  }
                  ${!showResult ? 'hover:shadow-xl' : ''}
                `}
              >
                <span className="font-inter text-lg">
                  {String.fromCharCode(65 + index)}. {option}
                </span>
              </button>
            )
          })}
        </div>

        {/* The Action Button JSX block for NEXT QUESTION is REMOVED */}


        {/* Result Display / Explanation (Visible after submission) */}
        {showResult && (
          <div className="text-center mt-10 bg-white dark:bg-db-dark-gray p-6 rounded-xl shadow-lg border-l-4 border-db-red transition-all duration-500">
            <div className={`
              text-2xl font-bold font-inter mb-4
              ${isCorrect ? 'text-db-green' : 'text-db-red'}
            `}>
              {isCorrect ? '✅ Yes, your answer is correct.' : '❌ You chose the incorrect option.'}
            </div>
            <div className="text-lg font-roboto text-db-dark-gray dark:text-db-gray max-w-4xl mx-auto">
              {question.explanation}
            </div>
  
          </div>
        )}
        
        {/* Images/Charts Section (Visual Data Storytelling) */}
        {showResult && (question.image || question.chart) && (
          <div className="mt-10 pt-4 border-t border-db-gray dark:border-db-dark-gray/50">
            <h3 className="text-xl font-inter font-bold text-center text-db-dark-gray dark:text-db-gray mb-6">
                Visual Data Storytelling
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-items-center">
                {question.image && (
                  <div className="w-full">
                    <Image
                      src={question.image}
                      alt="Question illustration"
                      width={600}
                      height={400}
                      className="rounded-lg shadow-2xl w-full h-auto object-cover"
                    />
                  </div>
                )}
                {question.chart && (
                  <div className="w-full">
                    <Image
                      src={question.chart}
                      alt="Data chart"
                      width={600}
                      height={400}
                      className="rounded-lg shadow-2xl w-full h-auto object-contain"
                    />
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}