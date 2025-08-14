'use client';

import React from 'react';
import { Task } from '@/types';
import PriorityIndicator from '@/components/PriorityIndicator';

interface Props {
  task: Task;
  onSelect?: (task: Task) => void;
}

const TaskCard: React.FC<Props> = ({ task, onSelect }) => {
  return (
    <div
      className="glass p-6 transition-transform hover:-translate-y-1 hover:shadow-xl flex flex-col gap-3 text-white cursor-pointer"
      onClick={() => onSelect?.(task)}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <PriorityIndicator score={task.priority_score ?? 0} />
      </div>
      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
          {task.description}
        </p>
      )}
      {task.deadline && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Due: {new Date(task.deadline).toLocaleDateString()}
        </span>
      )}
    </div>
  );
};

export default TaskCard;
