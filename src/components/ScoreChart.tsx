'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useMemo } from 'react';

interface QuizResult {
  id: string;
  score: number;
  subject: string;
  createdAt: string;
  userId: string;
}

interface ScoreChartProps {
  results: QuizResult[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function ScoreChart({ results }: ScoreChartProps) {
  const chartData = useMemo(() => {
    if (!results || results.length === 0) return [];

    // Group results by date
    const dataByDate = results.reduce((acc, result) => {
      const date = new Date(result.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      if (!acc[date]) {
        acc[date] = { date };
      }
      acc[date][result.subject] = result.score;
      return acc;
    }, {} as Record<string, { date: string; [subject: string]: number | string }>);

    return Object.values(dataByDate);
  }, [results]);

  const subjects = useMemo(() => {
    if (!results) return [];
    return [...new Set(results.map((r) => r.subject))];
  }, [results]);

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No quiz data available to display a chart.
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {subjects.map((subject, i) => (
            <Line
              key={subject}
              type="monotone"
              dataKey={subject}
              stroke={COLORS[i % COLORS.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
