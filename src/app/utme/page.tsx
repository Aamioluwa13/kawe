'use client';

import { Tab } from '@headlessui/react';
import { BookOpenIcon, ClockIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const departments = [
  {
    name: 'Science',
    subjects: [
      { name: 'Mathematics', topics: ['Algebra', 'Geometry', 'Trigonometry', 'Statistics', 'Calculus'] },
      { name: 'English', topics: ['Comprehension', 'Lexis and Structure', 'Oral English', 'Literature'] },
      { name: 'Physics', topics: ['Mechanics', 'Heat', 'Waves', 'Optics', 'Electricity'] },
      { name: 'Chemistry', topics: ['Physical', 'Organic', 'Inorganic', 'Stoichiometry'] },
      { name: 'Biology', topics: ['Cell Biology', 'Genetics', 'Ecology', 'Evolution'] },
    ],
  },
  {
    name: 'Arts',
    subjects: [
        { name: 'Literature', topics: ['Poetry', 'Prose', 'Drama', 'Literary Devices'] },
        { name: 'Government', topics: ['Political Systems', 'International Relations', 'Public Administration'] },
        { name: 'History', topics: ['Nigerian History', 'African History', 'World History'] },
        { name: 'CRS', topics: ['Old Testament', 'New Testament', 'Church History'] },
    ],
  },
  {
    name: 'Commercial',
    subjects: [
        { name: 'Economics', topics: ['Microeconomics', 'Macroeconomics', 'Development Economics'] },
        { name: 'Commerce', topics: ['Trade', 'Business', 'Finance', 'Marketing'] },
        { name: 'Accounting', topics: ['Bookkeeping', 'Financial Statements', 'Cost Accounting'] },
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function UtmePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            UTME Preparation
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Comprehensive study materials and practice tests for JAMB UTME
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <BookOpenIcon className="h-5 w-5 mr-2 text-blue-500" />
                Total Topics
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">48</dd>
            </div>
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-blue-500" />
                Study Hours
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">120</dd>
            </div>
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <AcademicCapIcon className="h-5 w-5 mr-2 text-blue-500" />
                Practice Tests
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">24</dd>
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
                          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                        >
                          {subject.topics.map((topic) => (
                            <div
                              key={topic}
                              className="relative rounded-lg p-6 bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                              <h3 className="text-lg font-medium text-gray-900">
                                {topic}
                              </h3>
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                2-3 hours
                              </div>
                              <Link
                                href={`/learn/${encodeURIComponent(subject.name)}/${encodeURIComponent(topic)}`}
                                className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                              >
                                Start Learning
                                <span className="ml-1">→</span>
                              </Link>
                            </div>
                          ))}
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
