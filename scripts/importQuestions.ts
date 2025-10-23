import path from 'path';
import { parseQuestionsFromPDF, saveQuestionsToFile } from '../utils/pdfQuestionParser';

async function importQuestions() {
  try {
    // Example usage - you would modify these paths and options for each PDF
    const pdfPath = path.join(process.cwd(), 'question-pdfs', 'mathematics.pdf');
    const outputPath = path.join(process.cwd(), 'src/data/questions/mathematics.ts');

    const questions = await parseQuestionsFromPDF(pdfPath, {
      subject: 'Mathematics',
      topic: 'Algebra', // You might want to detect this from PDF content or filename
      examType: 'UTME',
      difficulty: 'medium'
    });

    await saveQuestionsToFile(questions, outputPath);
    console.log(`Successfully imported ${questions.length} questions to ${outputPath}`);
  } catch (error) {
    console.error('Error importing questions:', error);
    process.exit(1);
  }
}

importQuestions();