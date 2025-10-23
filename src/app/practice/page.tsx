'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Tab } from '@headlessui/react';
import { 
  AcademicCapIcon,
  ClockIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const Quiz = dynamic(() => import("@/components/Quiz"), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-gray-500">Loading quiz...</div>
    </div>
  ),
});

const exams = [
  {
    name: 'UTME',
    departments: [
      { name: 'Science', subjects: ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology'] },
      { name: 'Arts', subjects: ['Literature', 'Government', 'History', 'CRS'] },
      { name: 'Commercial', subjects: ['Economics', 'Commerce', 'Accounting'] },
    ],
  },
  {
    name: 'WAEC',
    departments: [
      { name: 'Science', subjects: ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology'] },
      { name: 'Arts', subjects: ['Literature in English', 'Government', 'History', 'Christian Religious Studies'] },
      { name: 'Commercial', subjects: ['Economics', 'Commerce', 'Financial Accounting'] },
    ],
  }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const mockProgress = {
  completedQuizzes: 12,
  totalQuestions: 150,
  correctAnswers: 120,
  streakDays: 5,
};

export default function PracticePage() {
  const [selectedExamIndex, setSelectedExamIndex] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['English']);
  const [questionCount, setQuestionCount] = useState(15);
  const [timeLimit, setTimeLimit] = useState(15); // time in minutes
  const [quizStarted, setQuizStarted] = useState(false);

  const selectedExam = exams[selectedExamIndex];

  const handleExamChange = (index: number) => {
    setSelectedExamIndex(index);
    // Reset subjects when exam type changes, keeping English as default for UTME
    const defaultSubject = exams[index].name === 'UTME' ? 'English' : exams[index].departments[0].subjects[0];
    setSelectedSubjects([defaultSubject]);
    setQuizStarted(false);
  };

  const handleSubjectChange = (subject: string) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subject)) {
        // Prevent unselecting English for UTME
        if (selectedExam.name === 'UTME' && subject === 'English') return prev;
        return prev.filter(s => s !== subject);
      } else {
        // For UTME, limit to 4 subjects
        if (selectedExam.name === 'UTME' && prev.length >= 4) {
          alert('You can only select up to 4 subjects for UTME.');
          return prev;
        }
        return [...prev, subject];
      }
    });
  };

  if (quizStarted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Quiz
              subjects={selectedSubjects}
              questionCount={questionCount}
              examType={selectedExam.name}
              timeLimit={timeLimit * 60} // Convert minutes to seconds
            />
            <button
              onClick={() => setQuizStarted(false)}
              className="mt-8 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Settings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Practice Tests
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Test your knowledge with interactive quizzes and track your progress
          </p>
        </div>

        {/* Progress Stats */}
        <div className="mt-10">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
                Completed Quizzes
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {mockProgress.completedQuizzes}
              </dd>
            </div>
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <ChartBarIcon className="h-5 w-5 mr-2 text-blue-500" />
                Success Rate
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {Math.round((mockProgress.correctAnswers / mockProgress.totalQuestions) * 100)}%
              </dd>
            </div>
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <AcademicCapIcon className="h-5 w-5 mr-2 text-purple-500" />
                Total Questions
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {mockProgress.totalQuestions}
              </dd>
            </div>
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <ArrowPathIcon className="h-5 w-5 mr-2 text-orange-500" />
                Day Streak
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {mockProgress.streakDays}
              </dd>
            </div>
          </dl>
        </div>

        {/* Quiz Selection */}
        <div className="mt-10">
          <Tab.Group onChange={handleExamChange}>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {exams.map((exam) => (
                <Tab
                  key={exam.name}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  {exam.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-6">
              {exams.map((exam) => (
                <Tab.Panel key={exam.name}>
                  {/* Subject Selection */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      Select Subjects {exam.name === 'UTME' && `(${selectedSubjects.length}/4)`}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {exam.departments.flatMap(d => d.subjects).map(subject => (
                        <button
                          key={subject}
                          onClick={() => handleSubjectChange(subject)}
                          disabled={exam.name === 'UTME' && subject === 'English'}
                          className={classNames(
                            'p-3 rounded-lg text-sm font-medium transition-colors border',
                            selectedSubjects.includes(subject)
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 hover:bg-gray-50',
                            exam.name === 'UTME' && subject === 'English' ? 'cursor-not-allowed opacity-70' : ''
                          )}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                    {exam.name === 'UTME' && <p className="text-xs text-gray-500 mt-2">English is compulsory for UTME.</p>}
                  </div>

                  {/* Question Count Selection */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Number of Questions</h3>
                    <div className="flex space-x-3">
                      {[15, 30, 60, 180].map(count => (
                        <button
                          key={count}
                          onClick={() => setQuestionCount(count)}
                          className={classNames(
                            'px-4 py-2 rounded-lg text-sm font-medium transition-colors border',
                            questionCount === count
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          )}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Limit Selection */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Time Limit (minutes)</h3>
                    <div className="flex space-x-3">
                      {[15, 30, 45, 60, 120].map(mins => (
                        <button
                          key={mins}
                          onClick={() => setTimeLimit(mins)}
                          className={classNames(
                            'px-4 py-2 rounded-lg text-sm font-medium transition-colors border',
                            timeLimit === mins
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          )}
                        >
                          {mins}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Recommended: {Math.round(questionCount * 1.5)} minutes for {questionCount} questions
                    </p>
                  </div>

                  {/* Start Quiz Button */}
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setQuizStarted(true)}
                      disabled={selectedSubjects.length === 0}
                      className="w-full max-w-xs px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Start Quiz
                    </button>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
