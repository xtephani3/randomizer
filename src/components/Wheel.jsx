import React from 'react';

const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4'];

export default function Wheel({ options, rotation }) {
  const sliceSize = 360 / Math.max(options.length, 1);

  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-full border-4 border-white/30 shadow-[0_0_30px_rgba(168,85,247,0.5)] overflow-hidden">
      <div 
        className="w-full h-full rounded-full wheel-spin"
        style={{ 
          transform: `rotate(${rotation}deg)`,
          background: options.length <= 1 ? colors[0] : `conic-gradient(${
            options.map((opt, i) => {
              const currentAngle = i * sliceSize;
              const nextAngle = (i + 1) * sliceSize;
              return `${colors[i % colors.length]} ${currentAngle}deg ${nextAngle}deg`;
            }).join(', ')
          })`
        }}
      >
        {options.map((opt, i) => {
          const angle = i * sliceSize + (sliceSize / 2);
          return (
            <div 
              key={i} 
              className="absolute w-full h-full flex items-center justify-center top-0 left-0"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <span className="translate-x-[4rem] sm:translate-x-16 text-white font-bold text-sm sm:text-base drop-shadow-md whitespace-nowrap overflow-hidden max-w-[70px] sm:max-w-[90px] text-right truncate">
                {opt}
              </span>
            </div>
          );
        })}
      </div>
      {/* Pointer Container to add drop shadow effectively */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center drop-shadow-xl">
         <div className="w-6 h-6 bg-white rounded-full border-4 border-gray-800 mb-[-12px] z-10" />
         <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-white" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-800 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] z-10 border-[3px] border-zinc-500 flex items-center justify-center">
        <div className="w-3 h-3 bg-zinc-300 rounded-full shadow-inner" />
      </div>
    </div>
  );
}
