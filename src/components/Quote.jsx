import React, { useState, useEffect } from 'react';

// 1. Component Imports
import Step0Intro from './steps/Step0Intro';
import Step1PropertyType from './steps/Step1PropertyType';
import DetachedFlow from './flow/DetachedFlow';

// 2. Asset Imports
import detachedImg from '../assets/detached.png';
import semiDetachedImg from '../assets/semi-detached.png';
import terracedImg from '../assets/terraced.png';
import townHouseImg from '../assets/town-house.png';
import bungalowImg from '../assets/bungalow.png';
import flatImg from '../assets/flat.png';

const Quote = () => {
  // Initialize to 'intro' instead of 'entrance'
  const [currentStep, setCurrentStep] = useState('intro');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  const propertyData = {
    'detached': { title: 'Detached', img: detachedImg },
    'semi-detached': { title: 'Semi-Detached', img: semiDetachedImg },
    'terraced': { title: 'Terraced', img: terracedImg },
    'town-house': { title: 'Town House', img: townHouseImg },
    'bungalow': { title: 'Bungalow', img: bungalowImg },
    'flat': { title: 'Flat', img: flatImg },
  };

  useEffect(() => {
    if (selectedProperty) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setCurrentStep(selectedProperty.id);
        setIsExiting(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [selectedProperty]);

  const handleBackToStart = () => {
    setSelectedProperty(null);
    setCurrentStep('entrance');
  };

  return (
    <div className="w-full min-h-[100dvh] flex items-center justify-center p-3 md:p-8 font-sans overflow-x-hidden text-white">

      {/* STEP 0: Intro Screen */}
      {currentStep === 'intro' && (
        <div className="w-full max-w-4xl animate-in fade-in duration-500">
          <Step0Intro onStart={() => setCurrentStep('entrance')} />
        </div>
      )}

      {/* STEP 1: Property Selection Grid */}
      {currentStep === 'entrance' && (
        <div className={`w-full max-w-4xl transition-all duration-500 transform
          ${isExiting ? 'opacity-0 -translate-x-12' : 'opacity-100 translate-x-0'}
          animate-in fade-in slide-in-from-bottom-4`}>

          <div className="mb-6 px-1">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
              Choose Property
            </h1>
            <div className="w-10 h-0.5 bg-yellow-400 mt-2 rounded-full" />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-10">
            <Step1PropertyType
              selected={selectedProperty}
              onSelect={setSelectedProperty}
              onNext={() => {}}
            />
          </div>

          <p className="text-left text-[9px] font-bold text-white/20 mt-4 uppercase tracking-widest px-1">
            Select a type to continue automatically
          </p>
        </div>
      )}

      {/* STEP 2: Individual Flow Transitions */}
      <div className={`w-full max-w-4xl ${currentStep !== 'entrance' && currentStep !== 'intro' ? 'block' : 'hidden'}`}>
        {currentStep === 'detached' && (
          <DetachedFlow
            propertyInfo={propertyData['detached']}
            onBack={handleBackToStart}
          />
        )}

        {/* Fallback for other unfinished flows */}
        {currentStep !== 'entrance' && currentStep !== 'intro' && currentStep !== 'detached' && (
          <div className="p-10 rounded-[2rem] animate-in zoom-in-95">
            <img src={propertyData[currentStep]?.img} className="w-20 h-20 mb-6 opacity-20" alt="" />
            <h2 className="text-sm font-black text-white/30 uppercase tracking-widest mb-6">
              {propertyData[currentStep]?.title} Flow Coming Soon
            </h2>
            <button
              onClick={handleBackToStart}
              className="px-6 py-3 bg-yellow-400 text-[#010191] text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-white transition-colors"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quote;