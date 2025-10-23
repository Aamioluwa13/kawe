'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { PaperAirplaneIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

type Message = { role: 'user' | 'assistant' | 'system'; content: string };

const subjectDepartments = [
  {
    name: 'General',
    subjects: ['General'],
  },
  {
    name: 'Science',
    subjects: ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology'],
  },
  {
    name: 'Arts',
    subjects: ['Literature', 'Government', 'History', 'CRS'],
  },
  {
    name: 'Commercial',
    subjects: ['Economics', 'Commerce', 'Accounting'],
  },
];

export default function AiTutor() {
  const [subject, setSubject] = useState('General');
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: `Hi! I'm your AI tutor for General. Ask me a question about ${subject} or any other topic.`
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // keep chat scrolled to bottom
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const userMsg: Message = { role: 'user', content: messageContent.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, messages: updated }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Chat API error');
      }

      const data = await res.json();
      const assistantMsg: Message = { role: 'assistant', content: data.reply };
      setMessages((m) => [...m, assistantMsg]);
    } catch (err: any) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry — I could not reach the AI service. ' + (err?.message || '') }]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const generateQuestions = () => {
    const prompt = `Generate 5 multiple-choice practice questions on the topic of ${subject}. Provide the correct answer for each question.`;
    handleSendMessage(prompt);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="sr-only">Subject</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          {subjectDepartments.map((department) => (
            <optgroup key={department.name} label={department.name}>
              {department.subjects.map((subjectName) => (
                <option key={subjectName} value={subjectName}>
                  {subjectName}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div ref={scrollRef} className="h-[420px] overflow-y-auto mb-4 p-4 border rounded-lg">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`mb-4 ${message.role === 'assistant' ? 'bg-blue-50 p-3 rounded-lg' : 'bg-gray-50 p-3 rounded-lg'}`}
          >
            <div className="prose">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && <div className="text-sm text-gray-500">Thinking...</div>}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your question..."
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          type="button"
          onClick={generateQuestions}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 flex items-center"
        >
          <AcademicCapIcon className="h-5 w-5 mr-2" />
          Generate Questions
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}