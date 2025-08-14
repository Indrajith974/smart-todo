'use client';

import { useEffect, useState } from 'react';

export default function HeroGreeting() {
  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const [today, setToday] = useState<string>('');

  useEffect(() => {
    const formatted = new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
    setToday(formatted);
  }, []);

  return (
    <header className="mb-6 text-white">
      <h1 className="text-3xl font-bold mb-1 animate-fade-in">
        {greeting}, welcome back!
      </h1>
      {today && <p className="text-sm opacity-80">{today}</p>}
    </header>
  );
}
