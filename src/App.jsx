import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Plus, Trash2, Coins, CircleDashed } from 'lucide-react';
import Wheel from './components/Wheel';
import Coin from './components/Coin';
import './App.css';

function App() {
  const [mode, setMode] = useState('wheel');
  const [options, setOptions] = useState(['Pizza', 'Sharwama', 'rice', 'noodles', 'swallow']);
  const [inputValue, setInputValue] = useState('');

  const [isAnimating, setIsAnimating] = useState(false);

  const [rotation, setRotation] = useState(0);
  const [coinResult, setCoinResult] = useState('Heads');

  const [winner, setWinner] = useState(null);

  const addOption = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !options.includes(inputValue.trim())) {
      setOptions([...options, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const spinWheel = () => {
    if (isAnimating || options.length === 0) return;
    setIsAnimating(true);
    setWinner(null);

    const extraSpins = (Math.floor(Math.random() * 5) + 5) * 360;
    const sliceAngle = 360 / options.length;

    const randomStop = Math.random() * 360;
    const totalRotation = rotation + extraSpins + randomStop;

    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedRot = totalRotation % 360;
      const adjustedRot = (360 - normalizedRot) % 360;
      const indexObj = Math.floor(adjustedRot / sliceAngle);
      const wonItem = options[indexObj % options.length];

      setWinner(wonItem || "A Win!");
      setIsAnimating(false);
      triggerConfetti();
    }, 4000);
  };

  const flipCoin = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setWinner(null);

    const isHeads = Math.random() > 0.5;
    const result = isHeads ? 'Heads' : 'Tails';
    setCoinResult(result);

    setTimeout(() => {
      setWinner(result);
      setIsAnimating(false);
      triggerConfetti();
    }, 3000); 
  };

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">

      <header className="pt-12 pb-6 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-purple-400 drop-shadow-sm mb-4">
          Spin the wheel
        </h1>
        <p className="text-slate-400 md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
          Can't decide? Let fate take the wheel... or flip the coin.
        </p>

        <div className="inline-flex items-center p-1 bg-slate-800/80 rounded-2xl border border-slate-700 backdrop-blur-md shadow-xl mb-6">
          <button
            onClick={() => setMode('wheel')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${mode === 'wheel' ? 'bg-purple-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
          >
            <CircleDashed className="w-5 h-5" />
            Wheel
          </button>
          <button
            onClick={() => setMode('coin')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${mode === 'coin' ? 'bg-purple-500 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
          >
            <Coins className="w-5 h-5" />
            Coin
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[400px]">
          <div className={`absolute -top-12 z-30 transition-all duration-500 transform ${winner ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 -translate-y-4 opacity-0 pointer-events-none'}`}>
            <div className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-widest mb-1">Winner!</span>
              <span className="text-3xl font-black text-white">{winner}</span>
            </div>
          </div>

          {mode === 'wheel' ? (
            <div className="w-full relative py-8">
              <Wheel options={options} rotation={rotation} />
            </div>
          ) : (
            <div className="w-full relative py-8">
              <Coin result={coinResult} isFlipping={isAnimating} />
            </div>
          )}

          <button
            onClick={mode === 'wheel' ? spinWheel : flipCoin}
            disabled={isAnimating || (mode === 'wheel' && options.length === 0)}
            className="mt-12 group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white  bg-purple-500 border border-white/20 rounded-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
          >
            <div className="absolute inset-0 bg-purple-500 opacity-90" />
            <span className="relative text-xl uppercase tracking-wider drop-shadow-md">
              {isAnimating ? 'Deciding...' : mode === 'wheel' ? 'Spin the Wheel' : 'Flip the Coin'}
            </span>
          </button>
        </div>


        {mode === 'wheel' && (
          <div className="lg:col-span-5 bg-slate-800/40 border border-slate-700/50 backdrop-blur-md rounded-3xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-200">
              <div className="w-2 h-6 bg-purple-500 rounded-full" />
              Your Choices
            </h2>

            <form onSubmit={addOption} className="relative mb-6 group">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new choice..."
                disabled={isAnimating}
                maxLength={20}
                className="w-full py-4 pl-5 pr-14 bg-slate-900/50 border border-slate-700 rounded-2xl outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all font-medium placeholder:text-slate-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isAnimating}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
              </button>
            </form>

            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
              {options.length === 0 && (
                <div className="p-8 text-center text-slate-500 border-2 border-dashed border-slate-700 rounded-2xl">
                  Add some choices to spin!
                </div>
              )}
              {options.map((opt, i) => (
                <div
                  key={i}
                  className="group flex items-center justify-between p-4 bg-slate-900/30 hover:bg-slate-800/80 border border-transparent hover:border-slate-700/80 rounded-2xl transition-all"
                >
                  <span className="font-semibold text-slate-300 break-all pr-4">{opt}</span>
                  <button
                    onClick={() => removeOption(i)}
                    disabled={isAnimating}
                    className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors disabled:opacity-50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

export default App
