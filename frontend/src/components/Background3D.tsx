'use client';

export default function Background3D() {
  // simple array of positions/sizes
  const shapes = [
    { top: '-10%', left: '5%', size: 160, delay: '0s' },
    { top: '20%', right: '-8%', size: 220, delay: '3s' },
    { bottom: '-12%', left: '30%', size: 260, delay: '6s' },
    { bottom: '15%', right: '10%', size: 140, delay: '1s' },
  ];

  return (
    <>
      {shapes.map((s, i) => (
        <div
          key={i}
          className="shape3d absolute -z-20 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 opacity-20"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: s.left,
            right: s.right,
            bottom: s.bottom,
            animationDelay: s.delay,
          }}
        />
      ))}
    </>
  );
}
