import { mathematicsQuestions } from './mathematics';
import { englishQuestions } from './english';
import { Question } from './types';

export const questionBank: Record<string, Question[]> = {
  'Mathematics': mathematicsQuestions,
  'English Language': englishQuestions,
};

export type { Question } from './types';
export * from './mathematics';
export * from './english';