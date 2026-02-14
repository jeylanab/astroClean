import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <div className="fixed top-12 left-0 w-full px-6 md:px-20 z-[1000] flex justify-center">
      <div className="w-full max-w-6xl relative h-[2px] bg-slate-100 rounded-full overflow-hidden">
        
        {/* Animated Progress Fill */}
        <div 
          className="absolute top-0 left-0 h-full bg-[#002664] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)]" 
          style={{ width: `${progress}%` }}
        >
          {/* High-Velocity Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-full h-full animate-progress-fast" />
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress-fast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress-fast {
          animation: progress-fast 1.5s infinite ease-out;
        }
      `}} />
    </div>
  );
};

export default ProgressBar;