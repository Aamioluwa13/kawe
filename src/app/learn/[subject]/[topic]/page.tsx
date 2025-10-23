'use client';

import { useParams } from 'next/navigation';
import AiTutor from '@/components/AiTutor';
import { BookOpenIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

// This would ideally be fetched from a database or a shared module
const allResources = [
    {
        title: 'UTME Mathematics Complete Study Guide',
        description: 'Comprehensive study material covering all UTME Mathematics topics with practice questions.',
        type: 'pdf',
        subject: 'Mathematics',
        downloadUrl: '/resources/utme-math-guide.pdf'
    },
    {
        title: 'New School Chemistry Textbook',
        description: 'A comprehensive chemistry textbook for senior secondary schools by Osei Yaw Ababio.',
        type: 'pdf',
        subject: 'Chemistry',
        downloadUrl: '/resources/new-school-chemistry.pdf'
    },
    {
        title: 'Lamlad\'s Physics for SSCE',
        description: 'A complete guide for Physics students preparing for WAEC and UTME.',
        type: 'pdf',
        subject: 'Physics',
        downloadUrl: '/resources/lamlad-physics.pdf'
    },
    {
        title: 'Khan Academy: Algebra Basics',
        description: 'A full video course on the fundamentals of Algebra, from equations to functions.',
        type: 'video',
        subject: 'Mathematics',
        videoUrl: 'https://www.youtube.com/playlist?list=PL7AF1C14AF1B05894'
    },
    {
        title: 'Organic Chemistry Tutor: Stoichiometry',
        description: 'A detailed video tutorial on stoichiometry, mole-to-mole ratios, and limiting reactants.',
        type: 'video',
        subject: 'Chemistry',
        videoUrl: 'https://www.youtube.com/watch?v=75m6iF9_23c'
    },
    {
        title: 'Essential Government for Senior Secondary Schools',
        description: 'A detailed textbook covering the Nigerian constitution and political systems.',
        type: 'pdf',
        subject: 'Government',
        downloadUrl: '/resources/essential-government.pdf'
    },
    {
        title: 'A-Z of Literature',
        description: 'A guide to literary terms, devices, and analysis for literature students.',
        type: 'pdf',
        subject: 'Literature',
        downloadUrl: '/resources/a-z-literature.pdf'
    },
    {
        title: 'Crash Course: World History',
        description: 'Engaging video series covering major events and themes in world history.',
        type: 'video',
        subject: 'History',
        videoUrl: 'https://www.youtube.com/playlist?list=PLBDA2E52FB1EF80C9'
    },
    {
        title: 'Principles of Economics',
        description: 'A foundational textbook on microeconomics and macroeconomics.',
        type: 'pdf',
        subject: 'Economics',
        downloadUrl: '/resources/principles-of-economics.pdf'
    },
    {
        title: 'Financial Accounting Explained',
        description: 'Video tutorials on bookkeeping, financial statements, and accounting principles.',
        type: 'video',
        subject: 'Accounting',
        videoUrl: 'https://www.youtube.com/playlist?list=PL_K2t4-a9_1_E_gev1i8vS-yIeU9Y-vG'
    },
];


export default function LearnPage() {
    const params = useParams();
    const subject = decodeURIComponent(params.subject as string);
    const topic = decodeURIComponent(params.topic as string);

    const relatedResources = allResources.filter(
        (resource) => resource.subject.toLowerCase() === subject.toLowerCase()
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-base text-blue-600 font-semibold tracking-wide uppercase">{subject}</p>
                    <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                        {topic}
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Use the AI Tutor and related resources to master this topic.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Tutor</h2>
                        <AiTutor />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Resources</h2>
                        <div className="space-y-4">
                            {relatedResources.length > 0 ? (
                                relatedResources.map((resource, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                                        <div className="flex items-center">
                                            {resource.type === 'pdf' ? (
                                                <BookOpenIcon className="h-6 w-6 text-blue-500 mr-3" />
                                            ) : (
                                                <VideoCameraIcon className="h-6 w-6 text-red-500 mr-3" />
                                            )}
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{resource.title}</h3>
                                                <a
                                                    href={resource.downloadUrl || resource.videoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    {resource.type === 'pdf' ? 'Download PDF' : 'Watch Video'}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No specific resources found for {subject}.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
