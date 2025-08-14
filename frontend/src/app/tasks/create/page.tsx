'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTask } from '@/utils/api';
import { useCategories } from '@/hooks/useCategories';

export default function TaskCreatePage() {
  const router = useRouter();
  const { categories } = useCategories();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [deadline, setDeadline] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return setError('Title required');
    setError(null);
    setLoading(true);
    try {
      await createTask({
        title,
        description,
        category: categoryId,
        deadline: deadline ? new Date(deadline).toISOString() : null,
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 md:p-8 max-w-xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm">Title</label>
          <input
            className="w-full rounded bg-white/10 p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            className="w-full rounded bg-white/10 p-2 min-h-[80px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Category</label>
          <select
            className="w-full rounded bg-white/10 p-2"
            value={categoryId ?? ''}
            onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">None</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm">Deadline</label>
          <input
            type="date"
            className="w-full rounded bg-white/10 p-2"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving…' : 'Create Task'}
        </button>
      </form>
    </main>
  );
}
