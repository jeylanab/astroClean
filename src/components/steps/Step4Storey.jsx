import React from 'react';
import storeyImg from '../../assets/storey.png';

const Step4Storey = ({ selected, onSelect, onNext }) => {
  const options = [
    { id: 'yes', title: 'Yes', key: 'Y' },
    { id: 'no', title: 'No', key: 'N' },
  ];

  return (
    <div className="w-full max-w-4xl flex flex-col items-start animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Consistent Header Style */}
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-[#002664] text-white w-7 h-7 flex items-center justify-center rounded-lg text-xs font-black">
          04
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
          Are your windows on the third storey or below?
        </h2>
      </div>

      {/* Subtext */}
      <p className="text-lg text-slate-500 mb-8 max-w-lg">
        Please note: For safety, we cannot clean windows above the third storey.
      </p>

      {/* Illustration Card */}
      <div className="mb-10 w-full max-w-[280px] bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex justify-center">
        <img 
          src={storeyImg} 
          alt="Storey height illustration" 
          className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Yes/No Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mb-12">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`group flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-500 bg-white
              ${selected === option.id 
                ? 'border-[#002664] shadow-xl scale-[1.02] z-10' 
                : 'border-slate-100 hover:border-slate-300 shadow-sm'}`}
          >
            {/* Key Badge */}
            <span className={`w-7 h-7 flex items-center justify-center border rounded-md text-[10px] font-black transition-all
              ${selected === option.id 
                ? 'bg-[#002664] text-white border-[#002664]' 
                : 'bg-slate-50 text-slate-300 border-slate-200 group-hover:bg-slate-100'}`}>
              {option.key}
            </span>

            {/* Title */}
            <span className={`text-lg font-bold ${selected === option.id ? 'text-[#002664]' : 'text-slate-600'}`}>
              {option.title}
            </span>
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

export default Step4Storey;