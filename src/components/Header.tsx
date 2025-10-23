'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Popover } from '@headlessui/react';
import { 
  AcademicCapIcon, 
  BookOpenIcon,
  DocumentTextIcon,
  BeakerIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { useSession, signIn, signOut } from 'next-auth/react';

const navigation = [
  {
    name: 'UTME',
    href: '/utme',
    icon: AcademicCapIcon,
    description: 'Prepare for JAMB UTME examination'
  },
  {
    name: 'WAEC',
    href: '/waec',
    icon: BookOpenIcon,
    description: 'Study for WAEC examination'
  },
  {
    name: 'Practice',
    href: '/practice',
    icon: BeakerIcon,
    description: 'Take practice tests and quizzes'
  },
  {
    name: 'Resources',
    href: '/resources',
    icon: DocumentTextIcon,
    description: 'Access study materials and guides'
  }
];

export default function Header() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll);
      // initialize state
      onScroll();
    }
    return () => {
      if (typeof window !== 'undefined') window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-200 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between p-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/next.svg" alt="Kawe" width={36} height={36} priority />
            <span className="font-semibold text-xl text-gray-900">Kawe</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                <item.icon className="h-5 w-5 mr-1" />
                {item.name}
              </Link>
            ))}
            <Link
              href="/#ai-tutor"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5 mr-1" />
              AI Tutor
            </Link>

            {status === 'authenticated' ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  {session.user.image ? (
                    <Image src={session.user.image} alt={session.user.name || 'User avatar'} width={28} height={28} className="rounded-full" />
                  ) : (
                    <UserCircleIcon className="h-7 w-7 text-gray-500" />
                  )}
                  <span className="hidden sm:inline">{session.user.name || 'Dashboard'}</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 sm:mr-1" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('github')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 transition-colors"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                Sign In
              </button>
            )}
          </nav>

          {/* Mobile Navigation */}
          <Popover className="md:hidden">
            <Popover.Button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Popover.Button>

            <Popover.Panel className="absolute top-full left-0 right-0 bg-white shadow-lg border-t">
              <div className="p-4 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    <item.icon className="h-6 w-6 mr-3 text-gray-600" />
                    <div>
                      <div>{item.name}</div>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </Link>
                ))}
                <Link
                  href="/#ai-tutor"
                  className="flex items-center p-2 text-base font-medium text-blue-600 rounded-lg hover:bg-blue-50"
                >
                  <ChatBubbleLeftRightIcon className="h-6 w-6 mr-3" />
                  <div>
                    <div>AI Tutor</div>
                    <p className="text-sm text-blue-500">Get personalized help</p>
                  </div>
                </Link>
                <div className="border-t my-4"></div>
                {status === 'authenticated' ? (
                  <>
                    <Link href="/dashboard" className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-50">
                      <UserCircleIcon className="h-6 w-6 mr-3 text-gray-600" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center p-2 text-base font-medium text-red-600 rounded-lg hover:bg-red-50"
                    >
                      <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => signIn('github')}
                    className="w-full flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3 text-gray-600" />
                    Sign In with GitHub
                  </button>
                )}
              </div>
            </Popover.Panel>
          </Popover>
        </div>
      </div>
    </header>
  );
}
