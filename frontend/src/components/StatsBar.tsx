import { Task } from '@/types';

interface Props { tasks: Task[] }

export default function StatsBar({ tasks }: Props) {
  const pending = tasks.filter(t => t.status === 'pending').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const completed = tasks.filter(t => t.status === 'completed').length;

  const Chip = ({ label, count, color }: { label: string; count: number; color: string }) => (
    <div className={`glass px-4 py-2 text-sm text-white flex gap-1 items-center ${color}`}> {label}
      <span className="font-bold">{count}</span>
    </div>
  );

  return (
    <div className="flex gap-4 mb-6">
      <Chip label="Pending" count={pending} color="" />
      <Chip label="In Progress" count={inProgress} color="" />
      <Chip label="Completed" count={completed} color="" />
    </div>
  );
}
