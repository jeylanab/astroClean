import React from 'react';

const bedroomOptions = [
  { id: '1-2', title: '1-2 Bedrooms', key: 'A' },
  { id: '3', title: '3 Bedrooms', key: 'B' },
  { id: '4', title: '4 Bedrooms', key: 'C' },
  { id: '5', title: '5 Bedrooms', key: 'D' },
  { id: '6plus', title: '6+ Bedrooms', key: 'E' },
];

const Step2Bedrooms = ({ selected, onSelect, onNext }) => {
  return (
    <div className="w-full max-w-4xl flex flex-col items-start animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Consistent Header Style */}
      <div className="flex items-center gap-3 mb-10">
        <span className="bg-[#002664] text-white w-7 h-7 flex items-center justify-center rounded-lg text-xs font-black">
          02
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          How many bedrooms does your property have?
        </h2>
      </div>

      {/* Modern Horizontal/Grid Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-12">
        {bedroomOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option)}
            className={`group flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-500 bg-white
              ${selected?.id === option.id 
                ? 'border-[#002664] shadow-xl scale-[1.02] z-10' 
                : 'border-slate-100 hover:border-slate-300 shadow-sm'}`}
          >
            {/* Key Badge */}
            <span className={`w-7 h-7 flex items-center justify-center border rounded-md text-[10px] font-black transition-all
              ${selected?.id === option.id 
                ? 'bg-[#002664] text-white border-[#002664]' 
                : 'bg-slate-50 text-slate-300 border-slate-200 group-hover:bg-slate-100'}`}>
              {option.key}
            </span>

            {/* Title */}
            <span className={`text-lg font-bold ${selected?.id === option.id ? 'text-[#002664]' : 'text-slate-600'}`}>
              {option.title}
            </span>

            {/* Selection Checkmark Indicator (Optional but Professional) */}
            {selected?.id === option.id && (
              <div className="ml-auto animate-in zoom-in duration-300">
                <svg className="w-6 h-6 text-[#002664]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Primary Action Button */}
      <button
        onClick={onNext}
        disabled={!selected}
        className={`group flex items-center gap-3 font-bold py-4 px-12 rounded-2xl text-xl transition-all active:scale-95 shadow-xl
          ${selected 
            ? 'bg-[#002664] text-white hover:bg-slate-900' 
            : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'}`}
      >
        Continue
        <svg className={`w-5 h-5 transition-transform ${selected ? 'group-hover:translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>

    </div>
  );
};

export default Step2Bedrooms;