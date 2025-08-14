import { Task } from '@/types';

interface Props { tasks: Task[] }

export default function UpcomingDeadlines({ tasks }: Props) {
  const upcoming = tasks
    .filter(t => t.deadline)
    .sort((a, b) => (a.deadline! > b.deadline! ? 1 : -1))
    .slice(0, 5);

  if (upcoming.length === 0) return null;

  return (
    <section className="glass p-4 text-white w-full md:w-60">
      <h3 className="font-semibold mb-2">Upcoming</h3>
      <ul className="space-y-2 text-xs">
        {upcoming.map(t => (
          <li key={t.id} className="flex justify-between">
            <span className="truncate max-w-[120px]">{t.title}</span>
            <span>{new Date(t.deadline!).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
