import React from 'react';
import Quote from './components/Quote';

function App() {
  return (
    <div className="min-h-screen bg-[#010191]">
      
      {/* 1. FLOWING BAR CONTAINER */}
      <div className="flex flex-col items-center pt-12">
        {/* The thin, flowing filament */}
        <div className="w-24 h-1 rounded-full animate-flow shadow-[0_0_15px_rgba(250,204,21,0.4)]" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-flow {
          background: linear-gradient(90deg, #facc15, #fef08a, #facc15);
          background-size: 200% 200%;
          animation: flow 3s ease-in-out infinite;
        }
      `}} />

      {/* Main Entry Point */}
      <main className="min-h-[80vh] flex items-center justify-center py-6 px-6">
        <Quote/>
      </main>

    </div>
  );
}

export default App;