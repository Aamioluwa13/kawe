import AiTutor from '@/components/AiTutor';
import { 
  BookOpenIcon, 
  AcademicCapIcon, 
  ChatBubbleLeftRightIcon,
  DocumentTextIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const features = [
  {
    name: 'UTME Preparation',
    description: 'Comprehensive study materials and practice tests for JAMB UTME',
    icon: AcademicCapIcon,
    href: '/utme'
  },
  {
    name: 'WAEC Resources',
    description: 'Complete preparation guide and past questions for WAEC exams',
    icon: BookOpenIcon,
    href: '/waec'
  },
  {
    name: 'Practice Tests',
    description: 'Take subject-specific practice tests to assess your knowledge',
    icon: DocumentTextIcon,
    href: '/practice'
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Your Path to Academic Excellence
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-blue-100 sm:text-xl md:mt-5 md:max-w-3xl">
              Comprehensive preparation for UTME and WAEC examinations with personalized AI tutoring.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.name}
              href={feature.href}
              className="relative group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <feature.icon className="h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </p>
              </div>
              <div className="mt-4 text-blue-600 group-hover:text-blue-700">
                Learn more →
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* AI Tutor Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            AI Study Assistant
          </h2>
          <p className="mt-2 text-lg text-gray-500">
            Get instant help with your studies from our AI tutor
          </p>
        </div>
        <AiTutor />
      </div>
    </div>
  );
}
