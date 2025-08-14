import React from 'react';

interface Props {
  score: number; // 0 – 1
}

const getColor = (score: number) => {
  if (score >= 0.8) return 'bg-red-500';
  if (score >= 0.5) return 'bg-yellow-500';
  return 'bg-green-500';
};

const PriorityIndicator: React.FC<Props> = ({ score }) => {
  const pct = Math.round(score * 100);
  return (
    <div className="flex items-center gap-1">
      <div className={`h-2 w-16 rounded ${getColor(score)}`} style={{ width: `${pct}%` }} />
      <span className="text-xs text-gray-600 dark:text-gray-300">{pct}%</span>
    </div>
  );
};

export default PriorityIndicator;
