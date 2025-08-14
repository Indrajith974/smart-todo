'use client';

import { useState } from 'react';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import { Task } from '@/types';
import HeroGreeting from '@/components/HeroGreeting';
import StatsBar from '@/components/StatsBar';
import QuickAddForm from '@/components/QuickAddForm';
import UpcomingDeadlines from '@/components/UpcomingDeadlines';
import { useTasks } from '@/hooks/useTasks';

export default function Dashboard() {
  const { tasks, loading, error, refresh } = useTasks();
  const [selected, setSelected] = useState<Task | null>(null);

  if (loading) return <p className="p-4">Loading…</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 md:p-8 flex flex-col gap-8 md:flex-row md:items-start">
      <div className="flex-1 space-y-6">
          <HeroGreeting />
          <StatsBar tasks={tasks} />
          <QuickAddForm onCreated={refresh} />

          {/* Export / Import */}
          <div className="flex gap-4">
            <button
              onClick={async () => {
                const res = await (await import('@/utils/api')).exportTasks();
                const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'tasks_export.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="glass px-4 py-2 text-sm hover:bg-white/10"
            >
              Export JSON
            </button>

            <label className="glass px-4 py-2 text-sm cursor-pointer hover:bg-white/10">
              Import JSON
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const text = await file.text();
                  try {
                    const json = JSON.parse(text);
                    await (await import('@/utils/api')).importTasks(json);
                    alert('Imported successfully');
                    refresh();
                  } catch (err) {
                    alert('Invalid JSON');
                  }
                }}
              />
            </label>
          </div>
          {tasks.length === 0 && (
            <p className="text-white/70">You have no tasks yet. Try adding one!</p>
          )}
      <button
        onClick={refresh}
        className="self-start mb-2 text-sm text-blue-600 hover:underline"
      >
        Reload
      </button>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} onSelect={setSelected} />
        ))}
      </div>
      </div>
      {/* Sidebar */}
      <UpcomingDeadlines tasks={tasks} />
    {selected && <TaskModal task={selected} onClose={() => setSelected(null)} />
      }
    </div>
  );
}
