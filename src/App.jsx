import React from 'react';
import Quote from './components/Quote';

function App() {
  return (
    <div className="min-h-screen">
      
      {/* Main Entry Point */}
      <main className="min-h-screen flex items-center justify-center py-12 px-6">
    
        <Quote/>

      </main>

      {/* Global Decorative Elements */}
      <div className="fixed bottom-0 left-0 w-full p-6 pointer-events-none opacity-40">
        <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-400">
          Astroclean Professional Network // Secure Terminal
        </p>
      </div>

    </div>
  );
}

export default App;