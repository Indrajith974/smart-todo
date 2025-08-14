import React from 'react';

interface Props {
  reasoning?: string;
  confidence?: number; // 0-1
}

const AIInsights: React.FC<Props> = ({ reasoning, confidence }) => {
  if (!reasoning) return null;
  return (
    <div className="p-2 rounded border text-xs bg-gray-50 dark:bg-gray-900 dark:border-gray-700 mt-2">
      <p className="mb-1 text-gray-800 dark:text-gray-200 font-medium">AI Insight</p>
      <p className="text-gray-600 dark:text-gray-400">{reasoning}</p>
      {confidence !== undefined && (
        <p className="mt-1 text-right text-gray-400">Confidence: {Math.round(confidence * 100)}%</p>
      )}
    </div>
  );
};

export default AIInsights;
