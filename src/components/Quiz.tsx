'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

import { Question } from '@/data/questions';

type QuizProps = {
  subjects?: string[];
  questionCount?: number;
  examType?: string;
  timeLimit?: number; // time in seconds
};

import { questionBank } from '@/data/questions';

export default function Quiz({ subjects = ['Mathematics'], questionCount = 15, examType = 'UTME', timeLimit = 900 }: QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Function to get a specified number of questions from selected subjects
    const getQuizQuestions = (subjects: string[], count: number): Question[] => {
      const allQuestions: Question[] = [];
      subjects.forEach(subject => {
        if (questionBank[subject]) {
          allQuestions.push(...questionBank[subject]);
        }
      });

      // Shuffle and slice questions
      return allQuestions.sort(() => 0.5 - Math.random()).slice(0, count);
    };

    // Reset quiz when settings change
    setQuestions(getQuizQuestions(subjects, questionCount));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setIsFinished(false);
    setTimeLeft(timeLimit);
  }, [subjects, questionCount]);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isFinished) {
      setIsFinished(true);
    }
  }, [timeLeft, isFinished]);

  // Save results when quiz is finished
  useEffect(() => {
    const saveQuizResult = async () => {
      const questionResults = questions.map((q, index) => ({
        questionId: q.id,
        question: q.question,
        selectedAnswer: selectedAnswer ?? -1,
        correctAnswer: q.answerIndex,
        isCorrect: selectedAnswer === q.answerIndex
      }));

      try {
        const response = await fetch('/api/quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subjects,
            examType,
            score,
            totalQuestions: questions.length,
            timeSpent: 900 - timeLeft,
            questions: questionResults
          })
        });

        if (!response.ok) {
          throw new Error('Failed to save quiz result');
        }
      } catch (error) {
        console.error('Error saving quiz result:', error);
      }
    };

    if (isFinished) {
      saveQuizResult();
    }
  }, [isFinished, subjects, examType, score, timeLeft, questions, selectedAnswer, questionCount]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || isFinished) return;
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === questions[currentQuestionIndex].answerIndex) {
      setScore(score => score + 1);
    }

    // Auto-advance to next question after 3 seconds
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(index => index + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setIsFinished(true);
      }
    }, 3000);
  };

  const restartQuiz = () => {
    // The useEffect hook will handle resetting the state
    // when the key of the parent component changes, or we could
    // trigger it by changing a prop. For now, a page reload is simplest
    // A better implementation would involve a 'retake' state prop.
    window.location.reload();
  };
  if (!questions.length) {
    return <div>Loading questions...</div>;
  }
  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center p-6">
        <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
        <div className="mb-6">
          <div className="text-5xl font-bold text-blue-600 mb-2">{percentage}%</div>
          <p className="text-gray-600">You scored {score} out of {questions.length}</p>
        </div>
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Performance Summary</h4>
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-medium">Total Questions</div>
              <div className="text-gray-600">{questions.length}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-medium">Time Taken</div>
              <div className="text-gray-600">{formatTime(900 - timeLeft)}</div>
            </div>
          </div>
        </div>
        <div className="space-x-4">
          <button
            onClick={restartQuiz}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/dashboard"
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors inline-block"
          >
            View Progress
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress and Timer */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="flex items-center text-sm font-medium">
          <ClockIcon className="h-5 w-5 mr-1 text-blue-600" />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {currentQuestion.question}
        </h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedAnswer === null
                  ? 'hover:bg-gray-50 hover:border-gray-300'
                  : selectedAnswer === index
                  ? index === currentQuestion.answerIndex
                    ? 'bg-green-50 border-green-500'
                    : 'bg-red-50 border-red-500'
                  : index === currentQuestion.answerIndex
                  ? 'bg-green-50 border-green-500'
                  : 'opacity-50'
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                <span>{option}</span>
                {selectedAnswer !== null && index === currentQuestion.answerIndex && (
                  <CheckCircleIcon className="h-5 w-5 text-green-500 ml-auto" />
                )}
                {selectedAnswer === index && index !== currentQuestion.answerIndex && (
                  <XCircleIcon className="h-5 w-5 text-red-500 ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && currentQuestion.explanation && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
          <p className="text-blue-800">{currentQuestion.explanation}</p>
        </div>
      )}
    </div>
  );
}
