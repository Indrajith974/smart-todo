'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createContextEntry } from '@/utils/api';

export default function ContextInputPage() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return setError('Context cannot be empty');
    setLoading(true);
    setError(null);
    try {
      await createContextEntry({ content: text });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 md:p-8 max-w-xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Add Context Entry</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full rounded bg-white/10 p-3 min-h-[140px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What’s on your mind?"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving…' : 'Save'}
        </button>
      </form>
    </main>
  );
}
