import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { subject, examType, score, totalQuestions, timeSpent, questions } = data;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const quizResult = await prisma.quizResult.create({
      data: {
        userId: user.id,
        subject,
        examType,
        score,
        totalQuestions,
        timeSpent,
        questions: {
          create: questions.map((q: any) => ({
            questionId: q.id,
            question: q.question,
            selectedAnswer: q.selectedAnswer,
            correctAnswer: q.correctAnswer,
            isCorrect: q.isCorrect,
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    return NextResponse.json(quizResult);
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return NextResponse.json(
      { error: 'Failed to save quiz result' },
      { status: 500 }
    );
  }
}