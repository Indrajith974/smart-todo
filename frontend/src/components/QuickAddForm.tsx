'use client';
import { useState } from 'react';
import { createTask } from '@/utils/api';

interface Props { onCreated: () => void }

export default function QuickAddForm({ onCreated }: Props) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await createTask({ title, status: 'pending' });
      setTitle('');
      onCreated();
    } catch (err) {
      console.error(err);
      alert('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="glass p-4 flex gap-2 items-center text-white mb-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Quick add a task..."
        className="flex-1 bg-transparent outline-none placeholder-white/60"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
      >
        Add
      </button>
    </form>
  );
}
