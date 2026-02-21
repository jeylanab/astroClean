import React, { useState } from 'react';
import { calculateTotal, pricingConfig } from '../../data/pricingConfig';

// Asset Imports
import extentionImg from '../../assets/extention.png';
import gate0Img from '../../assets/gate0.png';
import gate1Img from '../../assets/gate1.png';
import loftImg from '../../assets/loft.png';
import rearImg from '../../assets/rear.png';
import sideImg from '../../assets/side.png';
import skylanternImg from '../../assets/skylantern.png';
import veluxImg from '../../assets/velux.png';
import conservatoryImg from '../../assets/conservatory.png';

// Inject keyframe animation styles once
const animStyles = `
  @keyframes dropIn {
    0%   { opacity: 0; transform: translateY(-22px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .drop-in {
    opacity: 0;
    animation: dropIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .drop-in-1  { animation-delay: 0ms; }
  .drop-in-2  { animation-delay: 70ms; }
  .drop-in-3  { animation-delay: 140ms; }
  .drop-in-4  { animation-delay: 210ms; }
  .drop-in-5  { animation-delay: 280ms; }
  .drop-in-6  { animation-delay: 350ms; }
  .drop-in-7  { animation-delay: 420ms; }
`;

const DetachedFlow = ({ propertyInfo, onBack }) => {
  const [step, setStep] = useState(2);
  const [formData, setFormData] = useState({
    propertyType: 'detached',
    bedrooms: '',
    hasExtension: null,
    extensionTypes: [],
    hasSkylantern: null,
    skylanternCount: '',
    hasConservatory: null,
    conservatoryPanels: '',
    hasVelux: null,
    veluxCount: '',
    rearAccess: null,
  });

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  const toggleExtension = (id) => {
    const current = formData.extensionTypes;
    setFormData({
      ...formData,
      extensionTypes: current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    });
  };

  // Pricing Logic
  const price2Monthly = calculateTotal(formData);
  const priceMonthly = price2Monthly - (pricingConfig.frequency?.monthlyDiscount || 4);

  // Shared class strings for the theme
  const cardBase = "flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all font-bold text-left group cursor-pointer";
  const letterBadge = "w-7 h-7 flex-shrink-0 flex items-center justify-center rounded text-[10px] font-black transition-colors bg-white/20 text-white group-hover:bg-yellow-400 group-hover:text-[#010191]";
  const btnPrimary = "bg-yellow-400 text-[#010191] p-4 rounded-xl font-black uppercase hover:bg-white active:scale-95 transition-all text-sm tracking-wide";
  const btnSecondary = "bg-white/5 border border-white/10 p-4 rounded-xl font-bold uppercase text-white/40 hover:bg-white/10 hover:text-white/70 active:scale-95 transition-all text-sm";
  const inputBase = "bg-transparent border-b-2 border-white/20 focus:border-yellow-400 p-2 text-white font-bold outline-none transition-colors placeholder:text-white/20 w-full";
  const confirmBtn = "bg-yellow-400 text-[#010191] py-4 px-12 rounded-xl font-black self-start uppercase text-xs tracking-widest hover:bg-white transition-colors";

  return (
    <div className="w-full max-w-4xl mx-auto px-4 text-white">
      <style>{animStyles}</style>

      {/* Step 2: Bedrooms */}
      {step === 2 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-6 leading-tight text-white">Number of bedrooms?*</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl w-full">
            {['1-2', '3', '4', '5', '6+'].map((opt, i) => (
              <button key={opt}
                onClick={() => {
                  setFormData({ ...formData, bedrooms: opt });
                  opt === '6+' ? setStep(2.5) : next();
                }}
                className={`${cardBase} drop-in drop-in-${i + 2}`}>
                <span className={letterBadge}>{String.fromCharCode(65 + i)}</span>
                <span className="text-base text-white/80 group-hover:text-yellow-400 transition-colors">{opt} Bedrooms</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2.5: Large Property Bridge */}
      {step === 2.5 && (
        <div className="flex flex-col h-full">
          <div className="mb-8">
            <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-4 leading-tight text-white">
              Because your property has 5+ rooms, we'll just need a tad longer to finalise your quote.
            </h2>
            <h4 className="drop-in drop-in-2 text-sm font-bold text-white/50 leading-relaxed tracking-tight italic">
              Click below and we'll contact you shortly to confirm your price!
            </h4>
          </div>
          <div className="flex flex-col gap-3 max-w-md">
            <button
              onClick={() => setStep(13)}
              className="drop-in drop-in-3 w-full p-5 rounded-2xl border-2 border-yellow-400 bg-yellow-400/10 hover:bg-yellow-400 group transition-all text-left flex gap-4 items-center"
            >
              <span className="bg-yellow-400 text-[#010191] group-hover:bg-[#010191] group-hover:text-yellow-400 w-7 h-7 flex-shrink-0 flex items-center justify-center rounded font-black text-[10px]">A</span>
              <span className="font-black uppercase text-[11px] tracking-tight text-yellow-400 group-hover:text-[#010191] transition-colors">
                Yes, get in touch to confirm my price!
              </span>
            </button>
            <button
              onClick={onBack}
              className="drop-in drop-in-4 w-full p-5 rounded-2xl border-2 border-white/10 bg-white/5 hover:border-red-400 transition-all text-left group flex gap-4 items-center"
            >
              <span className="bg-white/10 text-white/40 group-hover:bg-red-500 group-hover:text-white w-7 h-7 flex-shrink-0 flex items-center justify-center rounded font-black text-[10px]">B</span>
              <span className="font-black uppercase text-[11px] tracking-tight text-white/40 group-hover:text-red-400 transition-colors">
                No, thank you!
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Extension Check */}
      {step === 3 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-6 text-white leading-tight">Does your property have an extension?*</h2>
          <div className="drop-in drop-in-2 flex items-start w-full py-4 mb-4">
            <img src={extentionImg} className="w-40 md:w-56 h-auto drop-shadow-2xl" alt="" />
          </div>
          <div className="flex flex-col gap-2 w-full max-w-sm">
            <button onClick={() => { setFormData({ ...formData, hasExtension: true }); next(); }} className={`${btnPrimary} drop-in drop-in-3`}>Yes, I have one</button>
            <button onClick={() => { setFormData({ ...formData, hasExtension: false }); setStep(5); }} className={`${btnSecondary} drop-in drop-in-4`}>No extension</button>
          </div>
        </div>
      )}

      {/* Step 4: Extension Types */}
      {step === 4 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-1 text-white">What type of extension does your property have?*</h2>
          <p className="drop-in drop-in-2 text-[10px] font-bold text-yellow-400 uppercase mb-6 tracking-widest">Select multiple if needed</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full flex-1">
            {[{ id: 'loft', title: 'Loft', img: loftImg }, { id: 'side', title: 'Side', img: sideImg }, { id: 'rear', title: 'Rear', img: rearImg }].map((item, i) => (
              <button key={item.id} onClick={() => toggleExtension(item.id)}
                className={`drop-in drop-in-${i + 3} p-4 rounded-2xl border transition-all flex flex-col items-center justify-center ${formData.extensionTypes.includes(item.id) ? 'border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/10' : 'border-white/10 bg-white/5'}`}>
                <img src={item.img} alt="" className="h-16 md:h-24 object-contain mb-3" />
                <span className={`font-black uppercase text-[10px] tracking-tighter ${formData.extensionTypes.includes(item.id) ? 'text-yellow-400' : 'text-white/60'}`}>{item.title}</span>
              </button>
            ))}
          </div>
          <button onClick={next} className={`${confirmBtn} drop-in drop-in-6 mt-6`}>Continue</button>
        </div>
      )}

      {/* Step 5: Skylantern Check */}
      {step === 5 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-6 text-white leading-tight">Does your property have a skylantern?*</h2>
          <div className="drop-in drop-in-2 flex items-start w-full py-4 mb-4">
            <img src={skylanternImg} className="w-40 md:w-56 h-auto drop-shadow-2xl" alt="" />
          </div>
          <div className="flex flex-col gap-2 w-full max-w-sm">
            <button onClick={() => { setFormData({ ...formData, hasSkylantern: true }); next(); }} className={`${btnPrimary} drop-in drop-in-3`}>Yes</button>
            <button onClick={() => { setFormData({ ...formData, hasSkylantern: false }); setStep(7); }} className={`${btnSecondary} drop-in drop-in-4`}>No</button>
          </div>
        </div>
      )}

      {/* Step 6: Skylantern Count */}
      {step === 6 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-6 leading-tight text-white">How many skylanterns does your property have?*</h2>
          <div className="grid grid-cols-2 gap-2 max-w-md w-full">
            {['1', '2', '3', '4+'].map((opt, i) => (
              <button key={opt} onClick={() => { setFormData({ ...formData, skylanternCount: opt }); next(); }}
                className={`drop-in drop-in-${i + 2} p-4 rounded-xl border border-white/10 bg-white/5 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all font-bold text-center group`}>
                <span className="text-lg text-white group-hover:text-yellow-400 transition-colors">{opt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 7: Conservatory Check */}
      {step === 7 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-6 text-white leading-tight">Does your property have a conservatory?*
</h2>
          <div className="drop-in drop-in-2 flex items-start w-full py-4 mb-4">
            <img src={conservatoryImg} className="w-40 md:w-56 h-auto drop-shadow-2xl" alt="" />
          </div>
          <div className="flex flex-col gap-2 w-full max-w-sm">
            <button onClick={() => { setFormData({ ...formData, hasConservatory: true }); next(); }} className={`${btnPrimary} drop-in drop-in-3`}>Yes</button>
            <button onClick={() => { setFormData({ ...formData, hasConservatory: false }); setStep(9); }} className={`${btnSecondary} drop-in drop-in-4`}>No</button>
          </div>
        </div>
      )}

      {/* Step 8: Conservatory Panels */}
      {step === 8 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-2 text-white">How many glass panels does your conservatory have?*</h2>
          <p className="drop-in drop-in-2 text-[10px] font-bold text-white mb-8 max-w-xs ">Count the whole panel from floor to ceiling as one panel. Please don't include your roof panels as we don't offer roof cleaning as a service.</p>
          <input
            type="number"
            placeholder="Type here"
            className={`${inputBase} drop-in drop-in-3  max-w-[120px] mb-8`}
            onChange={(e) => setFormData({ ...formData, conservatoryPanels: e.target.value })}
          />
          <button onClick={next} className={`${confirmBtn} drop-in drop-in-4`}>Confirm</button>
        </div>
      )}

      {/* Step 9: Velux Check */}
      {step === 9 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-6 text-white leading-tight">Does your property have any velux windows?*</h2>
          <div className="drop-in drop-in-2 flex items-start w-full py-4 mb-4">
            <img src={veluxImg} className="w-40 md:w-56 h-auto drop-shadow-2xl" alt="" />
          </div>
          <div className="flex flex-col gap-2 w-full max-w-sm">
            <button onClick={() => { setFormData({ ...formData, hasVelux: true }); next(); }} className={`${btnPrimary} drop-in drop-in-3`}>Yes</button>
            <button onClick={() => { setFormData({ ...formData, hasVelux: false }); setStep(11); }} className={`${btnSecondary} drop-in drop-in-4`}>No</button>
          </div>
        </div>
      )}

      {/* Step 10: Velux Count */}
      {step === 10 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-2 text-white">How many velux windows does your property have?*</h2>
          <p className="drop-in drop-in-2 text-[10px] font-bold text-white mb-8 ">Please only include velux windows we can reach from ground level.</p>
          <input
            type="number"
            placeholder="Type here"
            className={`${inputBase} drop-in drop-in-3 max-w-[120px] mb-8`}
            onChange={(e) => setFormData({ ...formData, veluxCount: e.target.value })}
          />
          <button onClick={next} className={`${confirmBtn} drop-in drop-in-4`}>Confirm</button>
        </div>
      )}

      {/* Step 11: Rear Access */}
      {step === 11 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-8 leading-tight text-white">Can we access the rear windows without coming through your property, i.e. through a back gate?*</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full flex-1">
            <button onClick={() => { setFormData({ ...formData, rearAccess: true }); next(); }}
              className="drop-in drop-in-2 p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all flex flex-col items-center group">
              <img src={gate1Img} alt="" className="h-24 md:h-32 object-contain mb-4 group-hover:scale-105 transition-transform" />
              <span className="font-black uppercase text-sm text-white/70 group-hover:text-yellow-400 transition-colors">Yes, via gate</span>
            </button>
            <button onClick={() => { setFormData({ ...formData, rearAccess: false }); next(); }}
              className="drop-in drop-in-3 p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all flex flex-col items-center group">
              <img src={gate0Img} alt="" className="h-24 md:h-32 object-contain mb-4 group-hover:scale-105 transition-transform" />
              <span className="font-black uppercase text-sm text-white/70 group-hover:text-yellow-400 transition-colors">No Access</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 12: Final Price */}
      {step === 12 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-3xl md:text-4xl font-black uppercase mb-1 text-white">Instant Quote</h2>
          <p className="drop-in drop-in-2 text-[10px] font-bold text-white/40 mb-8 uppercase tracking-widest">Select Frequency</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Monthly */}
            <div onClick={next} className="drop-in drop-in-3 bg-yellow-400 p-6 rounded-3xl border-2 border-yellow-400 cursor-pointer hover:shadow-2xl hover:shadow-yellow-400/20 relative group transition-all">
              <div className="absolute -top-3 left-6 bg-[#010191] text-yellow-400 border border-yellow-400 px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest">Popular</div>
              <p className="uppercase font-black text-[10px] mb-2 text-[#010191]/60">Monthly</p>
              <h3 className="text-4xl font-black mb-1 text-[#010191]">£{priceMonthly}</h3>
              <p className="text-[10px] font-black text-[#010191]/60 uppercase">Save £4</p>
              <div className="mt-4 bg-[#010191] text-yellow-400 py-2 rounded-lg font-black uppercase text-xs text-center tracking-widest group-hover:bg-white group-hover:text-[#010191] transition-colors">Select</div>
            </div>
            {/* 2-Monthly */}
            <div onClick={next} className="drop-in drop-in-4 bg-white/5 p-6 rounded-3xl border border-white/10 cursor-pointer hover:border-white/30 transition-all group">
              <p className="uppercase font-black text-[10px] mb-2 text-white/40">2-Monthly</p>
              <h3 className="text-4xl font-black mb-1 text-white">£{price2Monthly}</h3>
              <div className="mt-4 border border-white/20 py-2 rounded-lg font-black uppercase text-xs text-white/50 text-center group-hover:bg-white group-hover:text-[#010191] transition-all">Select</div>
            </div>
          </div>
        </div>
      )}

      {/* Step 13: Contact Details */}
      {step === 13 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-8 leading-tight text-white">Your Details*</h2>
          <div className="grid gap-6 max-w-sm w-full">
            <input type="text" placeholder="First Name*" className={`${inputBase} drop-in drop-in-2 text-xl`} />
            <input type="tel" placeholder="Phone Number*" className={`${inputBase} drop-in drop-in-3 text-xl`} />
            <input type="email" placeholder="Email Address" className={`${inputBase} drop-in drop-in-4 text-xl`} />
            <button onClick={next} className="drop-in drop-in-5 bg-yellow-400 text-[#010191] py-4 rounded-xl font-black text-lg mt-4 hover:bg-white transition-all uppercase tracking-wide">Next</button>
          </div>
        </div>
      )}

      {/* Step 14: Address */}
      {step === 14 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-8 leading-tight text-white">Address*</h2>
          <div className="grid gap-6 max-w-sm w-full">
            <input type="text" placeholder="Address line 1*" className={`${inputBase} drop-in drop-in-2 text-lg`} />
            <input type="text" placeholder="Postcode*" className={`${inputBase} drop-in drop-in-3 text-lg`} />
            <button onClick={next} className="drop-in drop-in-4 bg-yellow-400 text-[#010191] py-4 rounded-xl font-black text-lg mt-6 uppercase hover:bg-white transition-all tracking-wide">Book Now</button>
          </div>
        </div>
      )}

      {/* Final Step: Success */}
      {step === 15 && (
        <div className="flex flex-col items-start justify-center py-8 space-y-4">
          <div className="drop-in drop-in-1 w-16 h-16 bg-yellow-400 text-[#010191] rounded-full flex items-center justify-center text-2xl shadow-lg shadow-yellow-400/30 animate-bounce font-black">✓</div>
          <h2 className="drop-in drop-in-2 text-2xl md:text-4xl font-black uppercase leading-none max-w-sm text-white">Confirmed!</h2>
          <p className="drop-in drop-in-3 text-sm font-bold text-white/40 uppercase">We'll contact you within 24 hours.</p>
        </div>
      )}

      {/* Navigation Arrows */}
      {step > 2 && step < 12 && (
        <div className="absolute bottom-6 right-6 flex gap-2">
          <button onClick={prev} className="bg-white/10 text-white/50 p-3 rounded-xl hover:bg-white hover:text-[#010191] transition-all shadow-sm active:scale-90">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          </button>
          <button onClick={next} className="bg-yellow-400 text-[#010191] p-3 rounded-xl hover:bg-white transition-all shadow-md active:scale-90">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
      )}

    </div>
  );
};

export default DetachedFlow;
