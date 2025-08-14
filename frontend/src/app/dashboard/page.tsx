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
