import React, { useState } from 'react';
import { calculateTotal, pricingConfig } from '../../data/pricingConfig';

// Asset Imports
import accessImg from '../../assets/access.png';
import storeyImg from '../../assets/storey.png';

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

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-6px); }
    40%       { transform: translateX(6px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }
  .shake { animation: shake 0.4s ease; }
`;

const FlatFlow = ({ propertyInfo, onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: 'flat',
    bedrooms: '',
    groundAccess: null,
    thirdStoreyOrBelow: null,
  });

  const [errors, setErrors] = useState({});
  const [shakeKey, setShakeKey] = useState(0);

  const triggerShake = () => setShakeKey(k => k + 1);

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  // Pricing Logic — same as DetachedFlow
  const price2Monthly = calculateTotal(formData);
  const priceMonthly = price2Monthly - (pricingConfig.frequency?.monthlyDiscount || 4);

  // Shared class strings — identical to DetachedFlow theme
  const cardBase = "flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-green-400 hover:bg-green-400/10 transition-all font-bold text-left group cursor-pointer";
  const letterBadge = "w-7 h-7 flex-shrink-0 flex items-center justify-center rounded text-[10px] font-black transition-colors bg-white/20 text-white group-hover:bg-green-400 group-hover:text-[#010191]";

  // Yes/No card button style — both same green card style
  const yesNoBtn = "flex items-center gap-4 p-4 rounded-xl border border-green-400/30 bg-green-400/10 hover:bg-green-400/20 hover:border-green-400 active:scale-95 transition-all font-bold text-left group cursor-pointer w-full";
  const yesNoBadge = "w-7 h-7 flex-shrink-0 flex items-center justify-center rounded text-[10px] font-black bg-green-400/20 text-green-400 group-hover:bg-green-400 group-hover:text-[#010191] transition-colors";
  const yesNoLabel = "text-base font-black uppercase tracking-wide text-green-400 group-hover:text-green-300 transition-colors";

  const inputBase = "bg-transparent border-b-2 border-white/20 focus:border-green-400 p-2 text-white font-bold outline-none transition-colors placeholder:text-white/20 w-full";
  const inputError = "bg-transparent border-b-2 border-red-400 focus:border-red-400 p-2 text-white font-bold outline-none transition-colors placeholder:text-white/20 w-full";
  const errMsg = "text-red-400 text-[10px] font-black uppercase tracking-wide mt-1";

  // Dead-end screen — no access / above third storey
  const DeadEnd = ({ message }) => (
    <div className="flex flex-col items-start justify-center py-8 space-y-4">
      <div className="drop-in drop-in-1 w-16 h-16 bg-white/10 border border-white/20 text-white/50 rounded-full flex items-center justify-center text-2xl font-black">✕</div>
      <h2 className="drop-in drop-in-2 text-2xl md:text-3xl font-black uppercase leading-tight text-white max-w-sm">{message}</h2>
      <p className="drop-in drop-in-3 text-sm font-bold text-white/40 uppercase">Thank you for taking the time to reach out to us!</p>
      <button
        onClick={onBack}
        className="drop-in drop-in-4 mt-4 bg-white/10 border border-white/10 text-white/60 py-3 px-8 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-green-400 hover:text-[#010191] hover:border-green-400 transition-all"
      >
        Go Back
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 text-white">
      <style>{animStyles}</style>

      {/* ── Step 1: Bedrooms ── */}
      {step === 1 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-6 leading-tight text-white">Number of bedrooms?*</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl w-full">
            {['1-2', '3', '4', '5', '6+'].map((opt, i) => (
              <button
                key={opt}
                onClick={() => {
                  setFormData({ ...formData, bedrooms: opt });
                  opt === '6+' ? setStep(1.5) : next();
                }}
                className={`${cardBase} drop-in drop-in-${i + 2}`}
              >
                <span className={letterBadge}>{String.fromCharCode(65 + i)}</span>
                <span className="text-base text-white/80 group-hover:text-green-400 transition-colors">{opt} Bedrooms</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 1.5: 6+ Bedrooms Bridge ── */}
      {step === 1.5 && (
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
              onClick={() => setStep(5)}
              className="drop-in drop-in-3 w-full p-5 rounded-2xl border-2 border-green-400 bg-green-400/10 hover:bg-green-400 group transition-all text-left flex gap-4 items-center"
            >
              <span className="bg-green-400 text-[#010191] group-hover:bg-[#010191] group-hover:text-green-400 w-7 h-7 flex-shrink-0 flex items-center justify-center rounded font-black text-[10px]">A</span>
              <span className="font-black uppercase text-[11px] tracking-tight text-green-400 group-hover:text-[#010191] transition-colors">
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

      {/* ── Step 2: Ground Access ── */}
      {step === 2 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-2 leading-tight text-white">
            Are we able to reach your windows from ground level without obstruction?*
          </h2>
          <p className="drop-in drop-in-2 text-sm font-bold text-white/40 mb-4 italic">For example, there is no balcony in the way.</p>
          <div className="drop-in drop-in-3 flex items-start w-full py-4 mb-4">
            <img src={accessImg} className="w-40 md:w-56 h-auto drop-shadow-2xl" alt="" />
          </div>
          <div className="flex flex-col gap-2 w-full max-w-sm">
            <button
              onClick={() => { setFormData({ ...formData, groundAccess: true }); next(); }}
              className={`${yesNoBtn} drop-in drop-in-4`}
            >
              <span className={yesNoBadge}>Y</span>
              <span className={yesNoLabel}>Yes</span>
            </button>
            <button
              onClick={() => { setFormData({ ...formData, groundAccess: false }); setStep(2.5); }}
              className={`${yesNoBtn} drop-in drop-in-5`}
            >
              <span className={yesNoBadge}>N</span>
              <span className={yesNoLabel}>No</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2.5: No Ground Access Dead-End ── */}
      {step === 2.5 && (
        <DeadEnd message="Sorry! We can only clean windows we can access from ground level without obstruction." />
      )}

      {/* ── Step 3: Third Storey or Below ── */}
      {step === 3 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-2 leading-tight text-white">
            Are your windows on the third storey or below?*
          </h2>
          <div className="drop-in drop-in-2 flex items-start w-full py-4 mb-4">
            <img src={storeyImg} className="w-40 md:w-56 h-auto drop-shadow-2xl" alt="" />
          </div>
          <div className="flex flex-col gap-2 w-full max-w-sm">
            <button
              onClick={() => { setFormData({ ...formData, thirdStoreyOrBelow: true }); next(); }}
              className={`${yesNoBtn} drop-in drop-in-3`}
            >
              <span className={yesNoBadge}>Y</span>
              <span className={yesNoLabel}>Yes</span>
            </button>
            <button
              onClick={() => { setFormData({ ...formData, thirdStoreyOrBelow: false }); setStep(3.5); }}
              className={`${yesNoBtn} drop-in drop-in-4`}
            >
              <span className={yesNoBadge}>N</span>
              <span className={yesNoLabel}>No</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3.5: Above Third Storey Dead-End ── */}
      {step === 3.5 && (
        <DeadEnd message="Sorry! We can only clean windows on the third storey or below." />
      )}

      {/* ── Step 4: Final Price ── */}
      {step === 4 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-3xl md:text-4xl font-black uppercase mb-1 text-white">Instant Quote</h2>
          <p className="drop-in drop-in-2 text-[10px] font-bold text-white/40 mb-8 uppercase tracking-widest">Select Frequency</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Monthly */}
            <div onClick={next} className="drop-in drop-in-3 bg-green-400 p-6 rounded-3xl border-2 border-green-400 cursor-pointer hover:shadow-2xl hover:shadow-green-400/20 relative group transition-all">
              <div className="absolute -top-3 left-6 bg-[#010191] text-green-400 border border-green-400 px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest">Popular</div>
              <p className="uppercase font-black text-[10px] mb-2 text-[#010191]/60">Monthly</p>
              <h3 className="text-4xl font-black mb-1 text-[#010191]">£{priceMonthly}</h3>
              <p className="text-[10px] font-black text-[#010191]/60 uppercase">Save £4</p>
              <div className="mt-4 bg-[#010191] text-green-400 py-2 rounded-lg font-black uppercase text-xs text-center tracking-widest group-hover:bg-white group-hover:text-[#010191] transition-colors">Select</div>
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

      {/* ── Step 5: Contact Details ── */}
      {step === 5 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-8 leading-tight text-white">Your Details*</h2>
          <div className="grid gap-6 max-w-sm w-full">
            <div className="drop-in drop-in-2">
              <input
                type="text"
                placeholder="First Name*"
                id="flat-input-firstName"
                className={`${errors.firstName ? inputError : inputBase} text-xl`}
                onChange={() => setErrors(err => ({ ...err, firstName: '' }))}
              />
              {errors.firstName && <p key={shakeKey} className={`${errMsg} shake`}>{errors.firstName}</p>}
            </div>
            <div className="drop-in drop-in-3">
              <input
                type="tel"
                placeholder="Phone Number*"
                defaultValue="+44 "
                id="flat-input-phone"
                className={`${errors.phone ? inputError : inputBase} text-xl pl-16`}
                style={{ backgroundImage: 'url("https://flagcdn.com/w20/gb.png")', backgroundRepeat: 'no-repeat', backgroundPosition: '16px center' }}
                onChange={() => setErrors(err => ({ ...err, phone: '' }))}
              />
              {errors.phone && <p key={shakeKey} className={`${errMsg} shake`}>{errors.phone}</p>}
            </div>
            <button
              onClick={() => {
                const firstName = document.getElementById('flat-input-firstName')?.value?.trim();
                const phone = document.getElementById('flat-input-phone')?.value?.trim();
                const newErrors = {};
                if (!firstName) newErrors.firstName = 'First name is required';
                if (!phone || phone === '+44' || phone === '+44 ') newErrors.phone = 'Phone number is required';
                if (Object.keys(newErrors).length > 0) {
                  setErrors(newErrors);
                  triggerShake();
                } else {
                  setErrors({});
                  next();
                }
              }}
              className="drop-in drop-in-5 bg-green-400 text-[#010191] py-4 rounded-xl font-black text-lg mt-4 hover:bg-white transition-all uppercase tracking-wide"
            >Next</button>
          </div>
        </div>
      )}

      {/* ── Step 6: Address ── */}
      {step === 6 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-8 leading-tight text-white">Address*</h2>
          <div className="grid gap-6 max-w-sm w-full">
            <div className="drop-in drop-in-2">
              <input
                type="text"
                placeholder="Address line 1*"
                id="flat-input-address1"
                className={`${errors.address1 ? inputError : inputBase} text-lg`}
                onChange={() => setErrors(err => ({ ...err, address1: '' }))}
              />
              {errors.address1 && <p key={shakeKey} className={`${errMsg} shake`}>{errors.address1}</p>}
            </div>
            <input type="text" placeholder="Address line 2" className={`${inputBase} drop-in drop-in-2 text-lg`} />
            <div className="drop-in drop-in-3">
              <input
                type="text"
                placeholder="Postcode*"
                id="flat-input-postcode"
                className={`${errors.postcode ? inputError : inputBase} text-lg`}
                onChange={() => setErrors(err => ({ ...err, postcode: '' }))}
              />
              {errors.postcode && <p key={shakeKey} className={`${errMsg} shake`}>{errors.postcode}</p>}
            </div>
            <button
              onClick={() => {
                const address1 = document.getElementById('flat-input-address1')?.value?.trim();
                const postcode = document.getElementById('flat-input-postcode')?.value?.trim();
                const newErrors = {};
                if (!address1) newErrors.address1 = 'Address line 1 is required';
                if (!postcode) newErrors.postcode = 'Postcode is required';
                if (Object.keys(newErrors).length > 0) {
                  setErrors(newErrors);
                  triggerShake();
                } else {
                  setErrors({});
                  next();
                }
              }}
              className="drop-in drop-in-4 bg-green-400 text-[#010191] py-4 rounded-xl font-black text-lg mt-6 uppercase hover:bg-white transition-all tracking-wide"
            >Book Now</button>
          </div>
        </div>
      )}

      {/* ── Step 7: Success ── */}
      {step === 7 && (
        <div className="flex flex-col items-start justify-center py-8 space-y-4">
          <div className="drop-in drop-in-1 w-16 h-16 bg-green-400 text-[#010191] rounded-full flex items-center justify-center text-2xl shadow-lg shadow-green-400/30 animate-bounce font-black">✓</div>
          <h2 className="drop-in drop-in-2 text-2xl md:text-4xl font-black uppercase leading-none max-w-sm text-white">Confirmed!</h2>
          <p className="drop-in drop-in-3 text-sm font-bold text-white/40 uppercase">Thank you for joining the Window Brothers family!</p>
          <p className="drop-in drop-in-4 text-sm font-bold text-white/40 uppercase">We'll be in touch within 24 hours with the date of your first clean.</p>
        </div>
      )}

      {/* ── Navigation Arrows (steps 2–3 only, not dead-ends or price+) ── */}
      {(step === 2 || step === 3) && (
        <div className="absolute bottom-6 right-6 flex gap-2">
          <button onClick={prev} className="bg-white/10 text-white/50 p-3 rounded-xl hover:bg-white hover:text-[#010191] transition-all shadow-sm active:scale-90">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          </button>
          <button onClick={next} className="bg-green-400 text-[#010191] p-3 rounded-xl hover:bg-white transition-all shadow-md active:scale-90">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
      )}

    </div>
  );
};

export default FlatFlow;
