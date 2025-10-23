'use client';

import { Tab } from '@headlessui/react';
import { 
  BookOpenIcon, 
  DocumentTextIcon, 
  AcademicCapIcon,
  ClockIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const departments = [
  {
    name: 'Science',
    subjects: [
      { name: 'Mathematics', topics: ['Number and Numeration', 'Algebraic Processes', 'Geometry', 'Trigonometry'], pastPapers: ['2024', '2023', '2022'] },
      { name: 'English Language', topics: ['Essay Writing', 'Comprehension', 'Lexis and Structure', 'Oral English'], pastPapers: ['2024', '2023', '2022'] },
      { name: 'Physics', topics: ['Mechanics', 'Heat', 'Waves', 'Optics', 'Electricity'], pastPapers: ['2024', '2023', '2022'] },
      { name: 'Chemistry', topics: ['Physical', 'Organic', 'Inorganic', 'Stoichiometry'], pastPapers: ['2024', '2023', '2022'] },
      { name: 'Biology', topics: ['Cell Biology', 'Genetics', 'Ecology', 'Evolution'], pastPapers: ['2024', '2023', '2022'] },
    ],
  },
  {
    name: 'Arts',
    subjects: [
      { name: 'Literature in English', topics: ['Poetry', 'Prose', 'Drama', 'Literary Devices'], pastPapers: ['2024', '2023', '2022'] },
      { name: 'Government', topics: ['Political Systems', 'International Relations', 'Public Administration'], pastPapers: ['2024', '2023', '2022'] },
      { name: 'History', topics: ['Nigerian History', 'African History', 'World History'], pastPapers: ['2024', '2023', '2022'] },
      { name: 'Christian Religious Studies', topics: ['Old Testament', 'New Testament', 'Church History'], pastPapers: ['2024', '2023', '2022'] },
    ],
  },
  {
    name: 'Commercial',
    subjects: [
      { name: 'Economics', topics: ['Microeconomics', 'Macroeconomics', 'Development Economics'], pastPapers: ['2024', '2023', '2022'] },
      { name: 'Commerce', topics: ['Trade', 'Business', 'Finance', 'Marketing'], pastPapers: ['2024', '2023', '2022'] },
      { name: 'Financial Accounting', topics: ['Bookkeeping', 'Financial Statements', 'Cost Accounting'], pastPapers: ['2024', '2023', '2022'] },
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function WaecPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            WAEC Examination Preparation
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Comprehensive study materials and past questions for WAEC success
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mt-10">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <BookOpenIcon className="h-5 w-5 mr-2 text-blue-500" />
                Subjects
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">15+</dd>
            </div>
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <DocumentTextIcon className="h-5 w-5 mr-2 text-blue-500" />
                Past Papers
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">5 Years</dd>
            </div>
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <ChartBarIcon className="h-5 w-5 mr-2 text-blue-500" />
                Practice Tests
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">300+</dd>
            </div>
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-blue-500" />
                Study Hours
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">200+</dd>
            </div>
          </dl>
        </div>

        {/* Subject Tabs */}
        <div className="mt-10">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {departments.map((department) => (
                <Tab
                  key={department.name}
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
                  {department.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-6">
              {departments.map((department) => (
                <Tab.Panel key={department.name} className="rounded-xl bg-white p-3">
                  <Tab.Group as="div" className="flex">
                    <Tab.List className="flex flex-col space-y-1 rounded-xl bg-blue-900/20 p-1 w-1/4">
                      {department.subjects.map((subject) => (
                        <Tab
                          key={subject.name}
                          className={({ selected }) =>
                            classNames(
                              'w-full text-left rounded-lg py-2.5 px-4 text-sm font-medium leading-5',
                              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                              selected
                                ? 'bg-white text-blue-700 shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )
                          }
                        >
                          {subject.name}
                        </Tab>
                      ))}
                    </Tab.List>
                    <Tab.Panels className="ml-4 w-3/4">
                      {department.subjects.map((subject) => (
                        <Tab.Panel
                          key={subject.name}
                          className="space-y-8"
                        >
                          {/* Topics Grid */}
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Topics</h3>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                              {subject.topics.map((topic) => (
                                <div
                                  key={topic}
                                  className="relative rounded-lg p-6 bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                  <h4 className="text-lg font-medium text-gray-900">
                                    {topic}
                                  </h4>
                                  <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <ClockIcon className="h-4 w-4 mr-1" />
                                    3-4 hours
                                  </div>
                                  <Link
                                    href={`/learn/${encodeURIComponent(subject.name)}/${encodeURIComponent(topic)}`}
                                    className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                                  >
                                    Study Now
                                    <span className="ml-1">→</span>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Past Papers */}
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Past Papers</h3>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                              {subject.pastPapers.map((year) => (
                                <div
                                  key={year}
                                  className="relative rounded-lg p-4 bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 text-center"
                                >
                                  <h4 className="text-lg font-medium text-gray-900">
                                    {year}
                                  </h4>
                                  <a
                                    href="#"
                                    className="mt-2 inline-flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500"
                                  >
                                    Practice
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
