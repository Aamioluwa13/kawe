export interface Question {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
  subject: string;
  examType: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  year?: number; // for past questions
}

export interface QuestionBank {
  [subject: string]: {
    [topic: string]: Question[];
  };
}