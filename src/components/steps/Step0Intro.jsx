import React from 'react';

const Step0Intro = ({ onStart, onBack }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-700 px-6">
      
      {/* Simple Centered Message */}
      <p className="text-lg md:text-xl text-white font-black mb-10 max-w-lg uppercase tracking-tight leading-tight">
        ANSWER A FEW QUICK QUESTIONS ABOUT YOUR PROPERTY TO CALCULATE AN INSTANT WINDOW CLEANING PRICE !
      </p>
      
      {/* Start Button */}
      <button 
        onClick={onStart}
        className="group flex items-center justify-center gap-4 bg-[#009933] hover:bg-white text-black font-black py-5 px-16 rounded-xl text-sm transition-all shadow-xl active:scale-95 uppercase tracking-widest border-2 border-black/5"
      >
        Start
        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>

      {/* Navigation Arrows — absolute bottom-6 right-6, matches BungalowFlow */}
      <div className="absolute bottom-6 right-6 flex gap-2">
        <button
          onClick={onBack}
          className="bg-white/10 text-white/50 p-3 rounded-xl hover:bg-white hover:text-[#010191] transition-all shadow-sm active:scale-90"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
        <button
          onClick={onStart}
          className="bg-green-400 text-[#010191] p-3 rounded-xl hover:bg-white transition-all shadow-md active:scale-90"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      </div>

    </div>
  );
};

export default Step0Intro;
