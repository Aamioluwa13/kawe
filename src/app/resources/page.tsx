'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import {
  DocumentTextIcon,
  DocumentArrowDownIcon,
  VideoCameraIcon,
  BookOpenIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

type Resource = {
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'practice' | 'notes';
  subject: string;
  downloadUrl?: string;
  videoUrl?: string;
};

const resources: Resource[] = [
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
  {
    title: 'UTME Past Questions (2010-2020)',
    description: 'A decade of official UTME past questions and answers for all subjects.',
    type: 'practice',
    subject: 'General',
    downloadUrl: '/resources/utme-past-questions-2010-2020.pdf'
  },
  {
    title: 'WAEC Physics Past Questions (2015-2021)',
    description: 'Practice with 7 years of WAEC Physics past questions and detailed solutions.',
    type: 'practice',
    subject: 'Physics',
    downloadUrl: '/resources/waec-physics-pq.pdf'
  },
  {
    title: 'WAEC Government Past Questions Pack',
    description: 'A comprehensive pack of past questions for Government, compiled from 2012 to 2022.',
    type: 'practice',
    subject: 'Government',
    downloadUrl: '/resources/waec-government-pq.pdf'
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const categories = ['All Resources', 'Study Guides', 'Past Questions', 'Video Tutorials'];

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.subject.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'All Resources') return matchesSearch;
    if (selectedCategory === 'Study Guides') return resource.type === 'pdf' && matchesSearch;
    if (selectedCategory === 'Video Tutorials') return resource.type === 'video' && matchesSearch;
    if (selectedCategory === 'Past Questions') return resource.type === 'practice' && matchesSearch;
    return matchesSearch;
  });

  const getIconForResource = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return DocumentTextIcon;
      case 'video':
        return VideoCameraIcon;
      case 'practice':
        return AcademicCapIcon;
      case 'notes':
        return BookOpenIcon;
      default:
        return DocumentTextIcon;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Study Resources
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Download study materials, watch video tutorials, and access past questions
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mt-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Tab.Group onChange={(index) => setSelectedCategory(categories[index])}>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                {categories.map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-white text-blue-700 shadow'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource, index) => {
              const Icon = getIconForResource(resource.type);
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {resource.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {resource.description}
                      </p>
                      <div className="mt-4">
                        {resource.downloadUrl && (
                          <a
                            href={resource.downloadUrl}
                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                          >
                            <DocumentArrowDownIcon className="h-5 w-5 mr-1" />
                            Download PDF
                          </a>
                        )}
                        {resource.videoUrl && (
                          <a
                            href={resource.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                          >
                            <VideoCameraIcon className="h-5 w-5 mr-1" />
                            Watch Video
                          </a>
                        )}
                      </div>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {resource.subject}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center mt-10">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No resources found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}