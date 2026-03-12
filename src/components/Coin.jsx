import React from 'react';

export default function Coin({ result, isFlipping }) {
  // If result is 'Heads', we stop at 0deg. If 'Tails', stop at 180deg.
  // A flip will do 1800deg for heads (5 full spins), 1980deg for tails.
  const finalTransform = isFlipping ? `rotateY(${result === 'Heads' ? 1800 : 1980}deg)` : `rotateY(${result === 'Heads' ? 0 : 180}deg)`;

  return (
    <div className="relative w-48 h-48 mx-auto perspective-1000 mt-10 mb-16">
      <div 
        className={`w-full h-full preserve-3d relative transition-transform duration-1000 ${isFlipping ? 'coin-spin' : ''}`}
        style={{ '--final-transform': finalTransform, transform: isFlipping ? '' : finalTransform }}
      >
        {/* Heads - Front */}
        <div className="absolute w-full h-full rounded-full backface-hidden bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 flex items-center justify-center border-[6px] border-yellow-200 shadow-[inset_0_0_20px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.3)]">
          <div className="w-[85%] h-[85%] rounded-full border-[3px] border-yellow-100/60 flex flex-col items-center justify-center">
            <span className="text-yellow-50 font-black text-3xl uppercase tracking-wider drop-shadow-md">Heads</span>
            <span className="text-yellow-800/60 text-xs font-bold uppercase mt-1 tracking-widest">Decision Coin</span>
          </div>
        </div>
        
        {/* Tails - Back */}
        <div className="absolute w-full h-full rounded-full backface-hidden bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 flex items-center justify-center border-[6px] border-slate-100 shadow-[inset_0_0_20px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.3)]" style={{ transform: 'rotateY(180deg)' }}>
          <div className="w-[85%] h-[85%] rounded-full border-[3px] border-slate-100/60 flex flex-col items-center justify-center">
            <span className="text-slate-50 font-black text-3xl uppercase tracking-wider drop-shadow-md">Tails</span>
            <span className="text-slate-800/60 text-xs font-bold uppercase mt-1 tracking-widest">Decision Coin</span>
          </div>
        </div>

      </div>
      
      {/* Dynamic floor shadow */}
      <div className={`absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-32 h-6 bg-black/40 rounded-[100%] blur-md transition-all duration-[1.5s] ${isFlipping ? 'scale-50 opacity-20' : 'scale-100 opacity-60'}`} />
    </div>
  );
}
