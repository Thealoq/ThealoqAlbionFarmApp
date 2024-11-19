import React from 'react';

export const WaterEffect: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 opacity-30">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 bg-[#4AA3FF] rounded-full animate-wave"
            style={{
              width: `${Math.random() * 60 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}
      </div>
      
      <div className="fixed inset-0 bg-gradient-to-br from-transparent via-white to-transparent opacity-5" />
    </>
  );
};