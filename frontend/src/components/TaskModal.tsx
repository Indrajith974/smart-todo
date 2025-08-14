'use client';

import { Task } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import AIInsights from '@/components/AIInsights';
import PriorityIndicator from '@/components/PriorityIndicator';

interface Props {
  task: Task;
  onClose: () => void;
}

export default function TaskModal({ task, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="glass max-w-lg w-full p-6 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 hover:text-red-300"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-semibold mb-1 flex items-center gap-2">
          {task.title}
          <span className="text-xs uppercase px-2 py-0.5 rounded bg-blue-600">
            {task.status.replace('_', ' ')}
          </span>
        </h2>
        {task.category && (
          <p className="text-sm mb-2">
            Category: <span className="font-medium">{task.category.name}</span>
          </p>
        )}
        {task.description && <p className="mb-4 whitespace-pre-wrap">{task.description}</p>}
        <PriorityIndicator score={task.priority_score ?? 0} />
        {task.deadline && (
          <p className="mt-2 text-sm">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
        )}
        {task.ai_enhanced_description && (
          <AIInsights reasoning={task.ai_enhanced_description} />
        )}
      </div>
    </div>
  );
}
