import fs from 'fs/promises';
import pdfParse from 'pdf-parse';
import { Question } from '@/data/questions/types';

type PDFQuestion = {
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
};

type PDFParsingOptions = {
  subject: string;
  topic: string;
  examType: string;
  difficulty?: 'easy' | 'medium' | 'hard';
};

/**
 * Converts PDF text content into structured question format
 * Expected PDF format:
 * 
 * 1. Question text
 * A) Option 1
 * B) Option 2
 * C) Option 3
 * D) Option 4
 * Answer: A
 * Explanation: explanation text (optional)
 * 
 * 2. Next question...
 */
function parseQuestionsFromText(text: string): PDFQuestion[] {
  const questions: PDFQuestion[] = [];
  const questionBlocks = text.split(/\n\s*\d+\.\s+/).filter(Boolean);

  for (const block of questionBlocks) {
    try {
      const lines = block.split('\n').map(line => line.trim()).filter(Boolean);
      const questionText = lines[0];
      
      // Find option lines (A) B) C) D))
      const optionLines = lines.filter(line => /^[A-D]\)/.test(line));
      const options = optionLines.map(line => line.replace(/^[A-D]\)\s*/, ''));
      
      // Find answer line (Answer: X)
      const answerLine = lines.find(line => /^Answer:\s*[A-D]$/i.test(line));
      const correctAnswer = answerLine ? answerLine.replace(/^Answer:\s*/i, '') : '';
      
      // Find explanation if it exists
      const explanationIndex = lines.findIndex(line => line.toLowerCase().startsWith('explanation:'));
      const explanation = explanationIndex !== -1 ? lines[explanationIndex].replace(/^Explanation:\s*/i, '') : undefined;

      if (questionText && options.length === 4 && correctAnswer) {
        questions.push({
          questionText,
          options,
          correctAnswer,
          explanation
        });
      }
    } catch (error) {
      console.error('Error parsing question block:', error);
      continue;
    }
  }

  return questions;
}

/**
 * Converts parsed questions into our app's Question format
 */
function convertToAppFormat(pdfQuestions: PDFQuestion[], options: PDFParsingOptions): Question[] {
  return pdfQuestions.map((q, index) => {
    const correctAnswerIndex = ['A', 'B', 'C', 'D'].indexOf(q.correctAnswer);
    return {
      id: `${options.subject.toLowerCase()}-${options.topic.toLowerCase()}-${index + 1}`,
      subject: options.subject,
      topic: options.topic,
      examType: options.examType,
      difficulty: options.difficulty || 'medium',
      question: q.questionText,
      options: q.options,
      answerIndex: correctAnswerIndex,
      explanation: q.explanation
    };
  });
}

/**
 * Main function to parse questions from a PDF file
 */
export async function parseQuestionsFromPDF(pdfPath: string, options: PDFParsingOptions): Promise<Question[]> {
  try {
    const pdfBuffer = await fs.readFile(pdfPath);
    const pdfData = await pdfParse(pdfBuffer);
    const pdfQuestions = parseQuestionsFromText(pdfData.text);
    return convertToAppFormat(pdfQuestions, options);
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

/**
 * Helper function to save questions to a TypeScript file
 */
export async function saveQuestionsToFile(questions: Question[], outputPath: string): Promise<void> {
  const fileContent = `import { Question } from './types';

export const questions: Question[] = ${JSON.stringify(questions, null, 2)};
`;

  await fs.writeFile(outputPath, fileContent);
}