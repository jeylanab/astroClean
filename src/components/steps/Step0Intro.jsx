import React from 'react';

const Step0Intro = ({ onStart }) => {
  return (
    <div className="w-full max-w-2xl flex flex-col items-start animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Decorative Brand Element */}
      <div className="w-12 h-1 bg-[#002664] mb-8 rounded-full" />

      <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
        Get your instant <br />
        <span className="text-[#002664]">window cleaning</span> quote.
      </h1>

      <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-lg">
        Answer a few quick questions about your property and we'll calculate a bespoke price for you instantly.
      </p>
      
      <button 
        onClick={onStart}
        className="group flex items-center gap-3 bg-[#002664] hover:bg-slate-900 text-white font-bold py-4 px-10 rounded-2xl text-xl transition-all shadow-xl active:scale-95"
      >
        Get Started
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>

      <div className="mt-12 flex items-center gap-4 text-slate-400">
        <div className="flex -space-x-2">
          {[1,2,3].map(i => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#F8FAFC] bg-slate-200" />
          ))}
        </div>
        <span className="text-sm font-medium italic">Joined by 500+ local homeowners</span>
      </div>
    </div>
  );
};

export default Step0Intro;