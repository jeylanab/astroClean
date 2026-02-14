import React from 'react';
import teamImg from '../../assets/team.png';

const frequencyOptions = [
  { id: 'monthly', title: 'Yes, I want sparkling windows!', key: 'A', sub: 'Every Month (Save £4)' },
  { id: '2-monthly', title: 'No, thank you!', key: 'B', sub: 'Every 2 Months' },
];

const Step5Frequency = ({ selected, onSelect, onNext, selection }) => {
  // SAFE PRICING LOGIC: Uses optional chaining to prevent white screen if property isn't set yet
  const getPrice = () => {
    const propertyId = selection?.property?.id;
    if (propertyId === 'detached') return '32';
    if (propertyId === 'town-house') return '28';
    return '22'; // Default price
  };

  const estimatedPrice = getPrice();

  return (
    <div className="w-full max-w-4xl flex flex-col items-start animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* 1. Header with Pricing Reveal */}
      <div className="flex items-center gap-4 mb-8">
        <span className="bg-[#002664] text-white w-8 h-8 flex items-center justify-center rounded-xl text-xs font-black shadow-lg">
          05
        </span>
        <div className="flex flex-col">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Price: <span className="text-[#002664]">£{estimatedPrice}</span> <span className="text-slate-400 font-medium text-xl">/clean</span>
          </h2>
          <p className="text-green-600 font-bold flex items-center gap-2">
            <span className="bg-green-100 px-2 py-0.5 rounded text-sm">PROMO</span>
            50% OFF your first clean!
          </p>
        </div>
      </div>

      {/* 2. Professional Team Card */}
      <div className="mb-10 group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#002664] to-indigo-500 rounded-[2.1rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <div className="relative bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100">
          <img 
            src={teamImg} 
            alt="Astroclean Team" 
            className="w-full max-w-[260px] h-auto object-contain rounded-2xl"
          />
          <p className="text-[10px] text-slate-400 font-black uppercase mt-3 tracking-[0.2em] text-center">
            Verified Astroclean Crew
          </p>
        </div>
      </div>

      <p className="text-xl text-slate-600 mb-8 font-medium italic">
        "Sparkling windows are just one click away..."
      </p>

      {/* 3. Selection Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-xl mb-12">
        {frequencyOptions.map((option) => {
          // Check if this option is currently selected
          const isSelected = selected?.id === option.id;

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option)} // Passes the WHOLE object to App.jsx
              className={`group flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-500 bg-white
                ${isSelected 
                  ? 'border-[#002664] shadow-[0_20px_50px_rgba(0,38,100,0.1)] scale-[1.02] z-10' 
                  : 'border-slate-100 hover:border-slate-300 shadow-sm'}`}
            >
              <div className="flex items-center gap-5">
                <span className={`w-10 h-10 flex items-center justify-center border-2 rounded-xl text-sm font-black transition-all
                  ${isSelected 
                    ? 'bg-[#002664] text-white border-[#002664]' 
                    : 'bg-slate-50 text-slate-300 border-slate-100 group-hover:border-slate-200'}`}>
                  {option.key}
                </span>

                <div className="flex flex-col items-start text-left">
                  <span className={`text-lg font-bold transition-colors ${isSelected ? 'text-[#002664]' : 'text-slate-700'}`}>
                    {option.title}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold tracking-wide uppercase">
                    {option.sub}
                  </span>
                </div>
              </div>

              {/* Radio-style indicator */}
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500
                ${isSelected ? 'border-[#002664] bg-[#002664] rotate-[360deg]' : 'border-slate-200'}`}>
                {isSelected && <div className="w-2 h-2 bg-white rounded-full shadow-sm" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. Action Button */}
      <button
        onClick={onNext}
        disabled={!selected}
        className={`group relative flex items-center gap-4 font-black py-5 px-16 rounded-2xl text-xl transition-all active:scale-95
          ${selected 
            ? 'bg-[#002664] text-white shadow-[0_20px_40px_rgba(0,38,100,0.3)] hover:bg-slate-900' 
            : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'}`}
      >
        <span>Confirm Booking</span>
        <svg className={`w-6 h-6 transition-transform duration-500 ${selected ? 'group-hover:translate-x-2' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>

    </div>
  );
};

export default Step5Frequency;