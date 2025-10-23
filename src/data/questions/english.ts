import { Question } from './types';

export const englishQuestions: Question[] = [
  {
    id: 'eng-comp-1',
    subject: 'English Language',
    topic: 'Comprehension',
    examType: 'UTME',
    difficulty: 'medium',
    question: "Read the passage and answer the question:\n\nThe old man walked slowly down the dusty road, his ancient bicycle creaking with each step. The setting sun cast long shadows across his path, a daily reminder of another day's end. Despite his age, he had never missed a day of work at the village school where he had taught for over four decades.\n\nWhat does the passage suggest about the old man's character?",
    options: [
      "He is dedicated and consistent",
      "He is tired and frustrated",
      "He is wealthy and successful",
      "He is looking for a new job"
    ],
    answerIndex: 0,
    explanation: "The passage shows his dedication through phrases like 'never missed a day of work' and mentions his long service of 'over four decades'"
  },
  {
    id: 'eng-vocab-1',
    subject: 'English Language',
    topic: 'Vocabulary',
    examType: 'UTME',
    difficulty: 'easy',
    question: "Choose the word that is closest in meaning to 'BENEVOLENT'",
    options: ["Kind", "Strict", "Angry", "Tired"],
    answerIndex: 0,
    explanation: "'Benevolent' means kind and generous"
  },
  {
    id: 'eng-gram-1',
    subject: 'English Language',
    topic: 'Grammar',
    examType: 'UTME',
    difficulty: 'medium',
    question: "Choose the correct form of the verb to complete the sentence:\n\nIf I _____ earlier, I would have caught the bus.",
    options: ["had left", "have left", "would leave", "leaving"],
    answerIndex: 0,
    explanation: "This is a past conditional sentence (type 3). We use 'had + past participle' in the if-clause"
  },
  // Add more questions here
];