'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import ScoreChart from '@/components/ScoreChart';

type QuizResult = {
  id: string;
  subject: string;
  examType: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  createdAt: string;
};

type SubjectStats = {
  subject: string;
  attempts: number;
  averageScore: number;
  bestScore: number;
  totalQuestions: number;
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [subjectStats, setSubjectStats] = useState<SubjectStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const response = await fetch('/api/quiz-results');
        if (response.ok) {
          const data = await response.json();
          setQuizResults(data.quizResults);
          
          // Calculate subject statistics
          const statsBySubject: { [key: string]: SubjectStats } = {};
          data.quizResults.forEach((result: QuizResult) => {
            if (!statsBySubject[result.subject]) {
              statsBySubject[result.subject] = {
                subject: result.subject,
                attempts: 0,
                averageScore: 0,
                bestScore: 0,
                totalQuestions: 0
              };
            }
            
            const stats = statsBySubject[result.subject];
            stats.attempts++;
            stats.totalQuestions += result.totalQuestions;
            const scorePercentage = (result.score / result.totalQuestions) * 100;
            stats.averageScore = 
              ((stats.averageScore * (stats.attempts - 1)) + scorePercentage) / stats.attempts;
            stats.bestScore = Math.max(stats.bestScore, scorePercentage);
          });
          
          setSubjectStats(Object.values(statsBySubject));
        }
      } catch (error) {
        console.error('Error fetching quiz results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchQuizResults();
    }
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Please sign in to view your dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Your Learning Dashboard</h1>
          <p className="mt-2 text-gray-600">Track your progress and performance across subjects</p>
        </div>

        {/* Score Chart */}
        <div className="mb-12 bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-6">Performance Over Time</h2>
          <ScoreChart results={quizResults} />
        </div>

        {/* Subject Statistics */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Subject Performance</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subjectStats.map((stats) => (
              <div
                key={stats.subject}
                className="bg-white p-6 rounded-lg shadow-sm border"
              >
                <h3 className="font-semibold text-lg mb-4">{stats.subject}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Attempts:</span>
                    <span className="font-medium">{stats.attempts}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Average Score:</span>
                    <span className="font-medium">
                      {Math.round(stats.averageScore)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Best Score:</span>
                    <span className="font-medium">{Math.round(stats.bestScore)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Questions Answered:</span>
                    <span className="font-medium">{stats.totalQuestions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Quiz Results */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Recent Quiz Results</h2>
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Taken
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quizResults.slice(0, 10).map((result) => {
                  const score = (result.score / result.totalQuestions) * 100;
                  const isGoodScore = score >= 70;

                  return (
                    <tr key={result.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {result.subject}
                        </div>
                        <div className="text-sm text-gray-500">
                          {result.examType}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span
                            className={`text-sm font-medium ${
                              isGoodScore ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {Math.round(score)}%
                          </span>
                          {isGoodScore ? (
                            <ArrowUpIcon className="w-4 h-4 text-green-600 ml-1" />
                          ) : (
                            <ArrowDownIcon className="w-4 h-4 text-red-600 ml-1" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatTime(result.timeSpent)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(result.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}