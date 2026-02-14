import React, { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import Step0Intro from './components/steps/Step0Intro';
import Step1PropertyType from './components/steps/Step1PropertyType';
import Step2Bedrooms from './components/steps/Step2Bedrooms';
import Step3Access from './components/steps/Step3Access';
import Step4Storey from './components/steps/Step4Storey';
import Step5Frequency from './components/steps/Step5Frequency';
import Step6Contact from './components/steps/Step6Contact';
import Step7Summary from './components/steps/Step7Summary';

function App() {
  const [step, setStep] = useState(0);
  const totalSteps = 7;

  const [selection, setSelection] = useState({
    property: null,
    beds: null,
    access: null,
    storey: null,
    frequency: null,
  });

  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const updateSelection = (key, value) => {
    setSelection(prev => ({ ...prev, [key]: value }));
  };

  return (
    // Changed BG to a professional Slate-50 to make the white cards pop
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-blue-100 font-sans antialiased text-slate-900 transition-colors duration-500">
      
      {/* Our new ultra-thin, no-text progress bar */}
      <ProgressBar currentStep={step} totalSteps={totalSteps} />
      
      {/* pt-40 ensures we never overlap with the progress bar.
         pb-20 gives space for the bottom navigation.
      */}
      <main className="container mx-auto pt-40 pb-20 px-4 flex justify-center">
        <div className="w-full max-w-5xl transition-all duration-700 ease-in-out">
          
          {step === 0 && <Step0Intro onStart={() => setStep(1)} />}

          {step === 1 && (
            <Step1PropertyType 
              selected={selection.property} 
              onSelect={(item) => updateSelection('property', item)} 
              onNext={() => setStep(2)} 
            />
          )}

          {step === 2 && (
            <Step2Bedrooms 
              selected={selection.beds} 
              onSelect={(item) => updateSelection('beds', item)} 
              onNext={() => setStep(3)} 
            />
          )}

          {step === 3 && (
            <Step3Access 
              selected={selection.access} 
              onSelect={(val) => updateSelection('access', val)} 
              onNext={() => setStep(4)} 
            />
          )}

          {step === 4 && (
            <Step4Storey 
              selected={selection.storey} 
              onSelect={(val) => updateSelection('storey', val)} 
              onNext={() => setStep(5)} 
            />
          )}

          {step === 5 && (
            <Step5Frequency 
              selected={selection.frequency} 
              onSelect={(val) => updateSelection('frequency', val)} 
              onNext={() => setStep(6)} 
            />
          )}

          {step === 6 && (
            <Step6Contact 
              data={contactData} 
              updateData={setContactData} 
              onNext={() => setStep(7)} 
            />
          )}

          {step === 7 && (
            <Step7Summary 
              selection={selection} 
              contactData={contactData} 
            />
          )}
        </div>
      </main>

      {/* Modern Minimalist Navigation */}
      {step > 0 && (
        <div className="fixed bottom-8 right-8 flex items-center gap-2 z-[1000]">
          <button 
            onClick={() => setStep(s => Math.max(0, s - 1))}
            className="group bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-[#002664] transition-all active:scale-90"
            title="Previous Step"
          >
            <svg className="w-5 h-5 text-slate-400 group-hover:text-[#002664]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
            </svg>
          </button>
          
          <button 
            onClick={() => setStep(s => Math.min(totalSteps, s + 1))}
            disabled={step === totalSteps}
            className="group bg-[#002664] p-4 rounded-2xl shadow-lg hover:bg-slate-900 transition-all active:scale-90 disabled:opacity-30 disabled:grayscale disabled:pointer-events-none"
            title="Next Step"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;