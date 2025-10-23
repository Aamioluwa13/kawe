import { Question } from './types';

export const mathematicsQuestions: Question[] = [
  {
    id: 'math-alg-1',
    subject: 'Mathematics',
    topic: 'Algebra',
    examType: 'UTME',
    difficulty: 'medium',
    question: "If x² + 5x + 6 = 0, what are the values of x?",
    options: ["x = -2, -3", "x = 2, 3", "x = -1, -6", "x = 1, 6"],
    answerIndex: 0,
    explanation: "Using factorization: x² + 5x + 6 = (x + 2)(x + 3) = 0\nTherefore, x = -2 or x = -3"
  },
  {
    id: 'math-geo-1',
    subject: 'Mathematics',
    topic: 'Geometry',
    examType: 'UTME',
    difficulty: 'easy',
    question: "What is the area of a circle with radius 5 units?",
    options: ["25π square units", "10π square units", "15π square units", "20π square units"],
    answerIndex: 0,
    explanation: "Area of a circle = πr²\nWhere r = 5\nTherefore, Area = π(5)² = 25π square units"
  },
  {
    id: 'math-trig-1',
    subject: 'Mathematics',
    topic: 'Trigonometry',
    examType: 'UTME',
    difficulty: 'medium',
    question: "What is the value of sin²θ + cos²θ?",
    options: ["0", "1", "2", "Depends on θ"],
    answerIndex: 1,
    explanation: "This is a fundamental trigonometric identity: sin²θ + cos²θ = 1"
  },
  // Add more questions here
];