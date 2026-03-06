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
import bifold from '../../assets/bifold.png';

// ─── EmailJS Config ────────────────────────────────────────────────────────────
// Replace these three values with yours from emailjs.com → Account → API Keys
const EMAILJS_PUBLIC_KEY  = 'YF35tqFeJ15hQbeTr';   // e.g. 'user_Abc123XYZ'
const EMAILJS_SERVICE_ID  = 'service_9nixqxq';   // e.g. 'service_xxxxxxx'
const EMAILJS_TEMPLATE_ID = 'template_c7tuctb';  // e.g. 'template_xxxxxxx'
// ──────────────────────────────────────────────────────────────────────────────

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

const TerracedFlow = ({ propertyInfo, onBack }) => {
  const [step, setStep] = useState(2);
  const [formData, setFormData] = useState({
    propertyType: 'terraced',
    bedrooms: '',
    hasExtension: null,
    extensionTypes: [],
    hasSkylantern: null,
    skylanternCount: '',
    hasConservatory: null,
    conservatoryPanels: '',
    hasVelux: null,
    veluxCount: '',
    hasBifold: null,
    bifoldCount: '',
    rearAccess: null,
  });

  const [errors, setErrors]     = useState({});
  const [shakeKey, setShakeKey] = useState(0);
  const [sending, setSending]   = useState(false);

  const triggerShake = () => setShakeKey(k => k + 1);

  const validateAndNext = (fields) => {
    const newErrors = {};
    fields.forEach(({ key, label, value }) => {
      if (value === '' || value === null || value === undefined) {
        newErrors[key] = `${label} is required`;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerShake();
      return false;
    }
    setErrors({});
    next();
    return true;
  };

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  const toggleExtension = (id) => {
    const current = formData.extensionTypes;
    setFormData({
      ...formData,
      extensionTypes: current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id],
    });
  };

  // ── Pricing ──────────────────────────────────────────────────────────────────
  const price2Monthly = calculateTotal(formData);
  const priceMonthly  = price2Monthly - (pricingConfig.frequency?.monthlyDiscount || 4);

  // ── Email Sender ─────────────────────────────────────────────────────────────
  const sendBookingEmail = async ({ firstName, phone, address1, address2, postcode }) => {
    // Load EmailJS SDK on demand (avoids adding a <script> to index.html)
    if (!window.emailjs) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.onload  = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
      window.emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    const extensionSummary = formData.hasExtension
      ? `Yes — ${formData.extensionTypes.join(', ')}`
      : 'No';

    const message = `
═══════════════════════════════════
   NEW BUNGALOW BOOKING — ASTRO CLEAN
═══════════════════════════════════

👤 CUSTOMER DETAILS
───────────────────
Name        : ${firstName}
Phone       : ${phone}
Address     : ${address1}${address2 ? ', ' + address2 : ''}
Postcode    : ${postcode}

🏠 PROPERTY DETAILS
────────────────────
Property Type  : Bungalow
Bedrooms       : ${formData.bedrooms}
Extension      : ${extensionSummary}
Skylantern     : ${formData.hasSkylantern ? `Yes — ${formData.skylanternCount}` : 'No'}
Conservatory   : ${formData.hasConservatory ? `Yes — ${formData.conservatoryPanels} panels` : 'No'}
Velux Windows  : ${formData.hasVelux ? `Yes — ${formData.veluxCount}` : 'No'}
Bifold Doors   : ${formData.hasBifold ? `Yes — ${formData.bifoldCount} panels` : 'No'}
Rear Access    : ${formData.rearAccess ? 'Yes (via gate)' : 'No access'}

💷 QUOTE
────────
Selected Plan   : ${formData.frequency === 'monthly' ? 'Monthly (save £4)' : '2-Monthly'}
Price Per Clean : £${formData.frequency === 'monthly' ? priceMonthly : price2Monthly}

═══════════════════════════════════
    `.trim();

    await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_name:   'Astro Clean',
        from_name: firstName,
        message,
      }
    );
  };

  // ── Shared Styles ────────────────────────────────────────────────────────────
  const cardBase    = "flex items-center gap-4 p-4 rounded-xl border border-blue/10 bg-blue/5 hover:border-blue-700 hover:bg-blue-700/10 transition-all font-bold text-left group cursor-pointer";
  const letterBadge = "w-7 h-7 flex-shrink-0 flex items-center justify-center rounded text-[10px] font-black transition-colors bg-blue/20 text-blue group-hover:bg-blue-700 group-hover:text-[#010191]";
  const yesNoBtn    = "flex items-center gap-4 p-4 rounded-xl border border-blue-700/30 bg-blue-700/10 hover:bg-blue-700/20 hover:border-blue-700 active:scale-95 transition-all font-bold text-left group cursor-pointer w-full";
  const yesNoBadge  = "w-7 h-7 flex-shrink-0 flex items-center justify-center rounded text-[10px] font-black bg-blue-700/20 text-blue-700 group-hover:bg-blue-700 group-hover:text-[#010191] transition-colors";
  const yesNoLabel  = "text-base font-black uppercase tracking-wide text-blue-700 group-hover:text-blue-700 transition-colors";
  const inputBase   = "bg-transparent border-b-2 border-blue/20 focus:border-blue-700 p-2 text-blue font-bold outline-none transition-colors placeholder:text-blue/20 w-full";
  const inputError  = "bg-transparent border-b-2 border-red-400 focus:border-red-400 p-2 text-blue font-bold outline-none transition-colors placeholder:text-blue/20 w-full";
  const confirmBtn  = "bg-blue-700 text-[#010191] py-4 px-12 rounded-xl font-black self-start uppercase text-xs tracking-widest hover:bg-blue transition-colors";
  const errMsg      = "text-red-400 text-[10px] font-black uppercase tracking-wide mt-1";

  return (
    <div className="w-full max-w-4xl mx-auto px-4 text-blue">
      <style>{animStyles}</style>

      {/* Step 2: Bedrooms */}
      {step === 2 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-6 leading-tight text-blue">Number of bedrooms?*</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl w-full">
            {['1-2', '3', '4', '5', '6+'].map((opt, i) => (
              <button key={opt}
                onClick={() => {
                  setFormData({ ...formData, bedrooms: opt });
                  opt === '6+' ? setStep(2.5) : next();
                }}
                className={`${cardBase} drop-in drop-in-${i + 2}`}>
                <span className={letterBadge}>{String.fromCharCode(65 + i)}</span>
                <span className="text-base text-blue/80 group-hover:text-blue-700 transition-colors">{opt} Bedrooms</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2.5: Large Property Bridge */}
      {step === 2.5 && (
        <div className="flex flex-col h-full">
          <div className="mb-8">
            <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-4 leading-tight text-blue">
              Because your property has 5+ rooms, we'll just need a tad longer to finalise your quote.
            </h2>
            <h4 className="drop-in drop-in-2 text-sm font-bold text-blue/50 leading-relaxed tracking-tight italic">
              Click below and we'll contact you shortly to confirm your price!
            </h4>
          </div>
          <div className="flex flex-col gap-3 max-w-md">
            <button
              onClick={() => setStep(15)}
              className="drop-in drop-in-3 w-full p-5 rounded-2xl border-2 border-blue-700 bg-blue-700/10 hover:bg-blue-700 group transition-all text-left flex gap-4 items-center"
            >
              <span className="bg-blue-700 text-[#010191] group-hover:bg-[#010191] group-hover:text-blue-700 w-7 h-7 flex-shrink-0 flex items-center justify-center rounded font-black text-[10px]">A</span>
              <span className="font-black uppercase text-[11px] tracking-tight text-blue-700 group-hover:text-[#010191] transition-colors">
                Yes, get in touch to confirm my price!
              </span>
            </button>
            <button
              onClick={onBack}
              className="drop-in drop-in-4 w-full p-5 rounded-2xl border-2 border-blue/10 bg-blue/5 hover:border-red-400 transition-all text-left group flex gap-4 items-center"
            >
              <span className="bg-blue/10 text-blue/40 group-hover:bg-red-500 group-hover:text-blue w-7 h-7 flex-shrink-0 flex items-center justify-center rounded font-black text-[10px]">B</span>
              <span className="font-black uppercase text-[11px] tracking-tight text-blue/40 group-hover:text-red-400 transition-colors">
                No, thank you!
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Extension Check */}
      {step === 3 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-6 text-blue leading-tight">Does your property have an extension?*</h2>
          <div className="drop-in drop-in-2 flex items-start w-full py-4 mb-4">
            <img src={extentionImg} className="w-40 md:w-56 h-auto drop-shadow-2xl" alt="" />
          </div>
          <div className="flex flex-col gap-2 w-full max-w-sm">
            <button onClick={() => { setFormData({ ...formData, hasExtension: true }); next(); }} className={`${yesNoBtn} drop-in drop-in-3`}>
              <span className={yesNoBadge}>Y</span>
              <span className={yesNoLabel}>Yes</span>
            </button>
            <button onClick={() => { setFormData({ ...formData, hasExtension: false }); setStep(5); }} className={`${yesNoBtn} drop-in drop-in-4`}>
              <span className={yesNoBadge}>N</span>
              <span className={yesNoLabel}>No Extension</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Extension Types */}
      {step === 4 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-1 text-blue">What type of extension does your property have?*</h2>
          <p className="drop-in drop-in-2 text-[10px] font-bold text-blue-700 uppercase mb-6 tracking-widest">Select multiple if needed</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full flex-1">
            {[{ id: 'loft', title: 'Loft', img: loftImg }, { id: 'side', title: 'Side', img: sideImg }, { id: 'rear', title: 'Rear', img: rearImg }].map((item, i) => (
              <button key={item.id} onClick={() => { toggleExtension(item.id); setErrors(e => ({ ...e, extensionTypes: '' })); }}
                className={`drop-in drop-in-${i + 3} p-4 rounded-2xl border transition-all flex flex-col items-center justify-center ${formData.extensionTypes.includes(item.id) ? 'border-blue-700 bg-blue-700/10 shadow-lg shadow-blue-700/10' : 'border-blue/10 bg-blue/5'}`}>
                <img src={item.img} alt="" className="h-16 md:h-24 object-contain mb-3" />
                <span className={`font-black uppercase text-[10px] tracking-tighter ${formData.extensionTypes.includes(item.id) ? 'text-blue-700' : 'text-blue/60'}`}>{item.title}</span>
              </button>
            ))}
          </div>
          {errors.extensionTypes && <p key={shakeKey} className={`${errMsg} shake mt-3`}>{errors.extensionTypes}</p>}
          <button onClick={() => {
            if (formData.extensionTypes.length === 0) {
              setErrors({ extensionTypes: 'Please select at least one extension type' });
              triggerShake();
            } else {
              setErrors({});
              next();
            }
          }} className={`${confirmBtn} drop-in drop-in-6 mt-6`}>Continue</button>
        </div>
      )}

      {/* Step 5: Skylantern Check */}
      {step === 5 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-6 text-blue leading-tight">Does your property have a skylantern?*</h2>
          <div className="drop-in drop-in-2 flex items-start w-full py-4 mb-4">
            <img src={skylanternImg} className="w-40 md:w-56 h-auto drop-shadow-2xl" alt="" />
          </div>
          <div className="flex flex-col gap-2 w-full max-w-sm">
            <button onClick={() => { setFormData({ ...formData, hasSkylantern: true }); next(); }} className={`${yesNoBtn} drop-in drop-in-3`}>
              <span className={yesNoBadge}>Y</span>
              <span className={yesNoLabel}>Yes</span>
            </button>
            <button onClick={() => { setFormData({ ...formData, hasSkylantern: false }); setStep(7); }} className={`${yesNoBtn} drop-in drop-in-4`}>
              <span className={yesNoBadge}>N</span>
              <span className={yesNoLabel}>No</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Skylantern Count */}
      {step === 6 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-6 leading-tight text-blue">How many skylanterns does your property have?*</h2>
          <div className="grid grid-cols-2 gap-2 max-w-md w-full">
            {['1', '2', '3', '4+'].map((opt, i) => (
              <button key={opt} onClick={() => { setFormData({ ...formData, skylanternCount: opt }); next(); }}
                className={`drop-in drop-in-${i + 2} p-4 rounded-xl border border-blue/10 bg-blue/5 hover:border-blue-700 hover:bg-blue-700/10 transition-all font-bold text-center group`}>
                <span className="text-lg text-blue group-hover:text-blue-700 transition-colors">{opt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 7: Conservatory Check */}
      {step === 7 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-6 text-blue leading-tight">Does your property have a conservatory?*</h2>
          <div className="drop-in drop-in-2 flex items-start w-full py-4 mb-4">
            <img src={conservatoryImg} className="w-40 md:w-56 h-auto drop-shadow-2xl" alt="" />
          </div>
          <div className="flex flex-col gap-2 w-full max-w-sm">
            <button onClick={() => { setFormData({ ...formData, hasConservatory: true }); next(); }} className={`${yesNoBtn} drop-in drop-in-3`}>
              <span className={yesNoBadge}>Y</span>
              <span className={yesNoLabel}>Yes</span>
            </button>
            <button onClick={() => { setFormData({ ...formData, hasConservatory: false }); setStep(9); }} className={`${yesNoBtn} drop-in drop-in-4`}>
              <span className={yesNoBadge}>N</span>
              <span className={yesNoLabel}>No</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 8: Conservatory Panels */}
      {step === 8 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-2 text-blue">How many glass panels does your conservatory have?*</h2>
          <p className="drop-in drop-in-2 text-[10px] font-bold text-blue mb-8 max-w-xs">Count the whole panel from floor to ceiling as one panel. Please don't include your roof panels as we don't offer roof cleaning as a service.</p>
          <div className="drop-in drop-in-3">
            <input
              type="number"
              placeholder="Type here"
              className={`${errors.conservatoryPanels ? inputError : inputBase} max-w-[120px] mb-1`}
              onChange={(e) => { setFormData({ ...formData, conservatoryPanels: e.target.value }); setErrors(err => ({ ...err, conservatoryPanels: '' })); }}
            />
            {errors.conservatoryPanels && <p key={shakeKey} className={`${errMsg} shake`}>{errors.conservatoryPanels}</p>}
          </div>
          <div className="mb-8" />
          <button onClick={() => validateAndNext([{ key: 'conservatoryPanels', label: 'Number of panels', value: formData.conservatoryPanels }])} className={`${confirmBtn} drop-in drop-in-4`}>Confirm</button>
        </div>
      )}

      {/* Step 9: Velux Check */}
      {step === 9 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-6 text-blue leading-tight">Does your property have any velux windows?*</h2>
          <div className="drop-in drop-in-2 flex items-start w-full py-4 mb-4">
            <img src={veluxImg} className="w-40 md:w-56 h-auto drop-shadow-2xl" alt="" />
          </div>
          <div className="flex flex-col gap-2 w-full max-w-sm">
            <button onClick={() => { setFormData({ ...formData, hasVelux: true }); next(); }} className={`${yesNoBtn} drop-in drop-in-3`}>
              <span className={yesNoBadge}>Y</span>
              <span className={yesNoLabel}>Yes</span>
            </button>
            <button onClick={() => { setFormData({ ...formData, hasVelux: false }); setStep(11); }} className={`${yesNoBtn} drop-in drop-in-4`}>
              <span className={yesNoBadge}>N</span>
              <span className={yesNoLabel}>No</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 10: Velux Count */}
      {step === 10 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-2 text-blue">How many velux windows does your property have?*</h2>
          <p className="drop-in drop-in-2 text-[10px] font-bold text-blue mb-8">Please only include velux windows we can reach from ground level.</p>
          <div className="drop-in drop-in-3">
            <input
              type="number"
              placeholder="Type here"
              className={`${errors.veluxCount ? inputError : inputBase} max-w-[120px] mb-1`}
              onChange={(e) => { setFormData({ ...formData, veluxCount: e.target.value }); setErrors(err => ({ ...err, veluxCount: '' })); }}
            />
            {errors.veluxCount && <p key={shakeKey} className={`${errMsg} shake`}>{errors.veluxCount}</p>}
          </div>
          <div className="mb-8" />
          <button onClick={() => validateAndNext([{ key: 'veluxCount', label: 'Number of velux windows', value: formData.veluxCount }])} className={`${confirmBtn} drop-in drop-in-4`}>Confirm</button>
        </div>
      )}

      {/* Step 11: Bifold Check */}
      {step === 11 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-6 text-blue leading-tight">Do you have any bifold / patio doors?*</h2>
          <div className="drop-in drop-in-2 flex items-start w-full py-4 mb-4">
            <img src={bifold} className="w-40 md:w-56 h-auto drop-shadow-2xl" alt="Bifold doors" />
          </div>
          <div className="flex flex-col gap-2 w-full max-w-sm">
            <button onClick={() => { setFormData({ ...formData, hasBifold: true }); next(); }} className={`${yesNoBtn} drop-in drop-in-3`}>
              <span className={yesNoBadge}>Y</span>
              <span className={yesNoLabel}>Yes</span>
            </button>
            <button onClick={() => { setFormData({ ...formData, hasBifold: false, bifoldCount: '' }); setStep(13); }} className={`${yesNoBtn} drop-in drop-in-4`}>
              <span className={yesNoBadge}>N</span>
              <span className={yesNoLabel}>No</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 12: Bifold Panel Count */}
      {step === 12 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-2 text-blue">How many glass panels of bifold / patio door do you have?*</h2>
          <p className="drop-in drop-in-2 text-[10px] font-bold text-blue mb-8 max-w-xs">Count each individual glass panel across all your bifold doors. A standard bifold door typically has 3–6 panels.</p>
          <div className="drop-in drop-in-3">
            <input
              type="number"
              placeholder="Type here"
              className={`${errors.bifoldCount ? inputError : inputBase} max-w-[120px] mb-1`}
              onChange={(e) => { setFormData({ ...formData, bifoldCount: e.target.value }); setErrors(err => ({ ...err, bifoldCount: '' })); }}
            />
            {errors.bifoldCount && <p key={shakeKey} className={`${errMsg} shake`}>{errors.bifoldCount}</p>}
          </div>
          <div className="mb-8" />
          <button onClick={() => validateAndNext([{ key: 'bifoldCount', label: 'Number of bifold panels', value: formData.bifoldCount }])} className={`${confirmBtn} drop-in drop-in-4`}>Confirm</button>
        </div>
      )}

      {/* Step 13: Rear Access */}
      {step === 13 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-8 leading-tight text-blue">Can we access the rear windows without coming through your property, i.e. through a back gate?*</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full flex-1">
            <button onClick={() => { setFormData({ ...formData, rearAccess: true }); next(); }}
              className="drop-in drop-in-2 p-6 rounded-2xl border border-blue/10 bg-blue/5 hover:border-blue-700 hover:bg-blue-700/10 transition-all flex flex-col items-center group">
              <img src={gate1Img} alt="" className="h-24 md:h-32 object-contain mb-4 group-hover:scale-105 transition-transform" />
              <span className="font-black uppercase text-sm text-blue/70 group-hover:text-blue-700 transition-colors">Yes, via gate</span>
            </button>
            <button onClick={() => { setFormData({ ...formData, rearAccess: false }); next(); }}
              className="drop-in drop-in-3 p-6 rounded-2xl border border-blue/10 bg-blue/5 hover:border-blue-700 hover:bg-blue-700/10 transition-all flex flex-col items-center group">
              <img src={gate0Img} alt="" className="h-24 md:h-32 object-contain mb-4 group-hover:scale-105 transition-transform" />
              <span className="font-black uppercase text-sm text-blue/70 group-hover:text-blue-700 transition-colors">No Access</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 14: Final Price */}
      {step === 14 && (
<div className="flex flex-col h-full">
  <h2 className="drop-in drop-in-1 text-3xl md:text-4xl font-black uppercase mb-1 text-blue-800">
    Instant Quote
  </h2>

  <p className="drop-in drop-in-2 text-[10px] font-bold text-green-700/40 mb-8 uppercase tracking-widest">
    Select Frequency
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">

    {/* Monthly */}
    <div
      onClick={() => { setFormData(prev => ({ ...prev, frequency: 'monthly' })); next(); }}
      className="drop-in drop-in-3 bg-green-50 p-6 rounded-3xl border-2 border-green-400 cursor-pointer hover:shadow-2xl hover:shadow-green-400/30 relative group transition-all"
    >
      <div className="absolute -top-3 left-6 bg-green-500 text-white px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest">
        Popular
      </div>

      <p className="uppercase font-black text-[10px] mb-2 text-green-700/70">
        Monthly
      </p>

      <h3 className="text-4xl font-black mb-1 text-green-600">
        £{priceMonthly}
      </h3>

      <p className="text-[10px] font-black text-green-700/50 uppercase">
        Save £4
      </p>

      <div className="mt-4 bg-green-500 text-white py-2 rounded-lg font-black uppercase text-xs text-center tracking-widest group-hover:bg-green-600 transition-colors">
        Select
      </div>
    </div>

    {/* 2-Monthly */}
    <div
      onClick={() => { setFormData(prev => ({ ...prev, frequency: '2-monthly' })); next(); }}
      className="drop-in drop-in-4 bg-green-50 p-6 rounded-3xl border border-green-300 cursor-pointer hover:border-green-500 transition-all group"
    >
      <p className="uppercase font-black text-[10px] mb-2 text-green-700">
        2-Monthly
      </p>

      <h3 className="text-4xl font-black mb-1 text-green-600">
        £{price2Monthly}
      </h3>

      <div className="mt-4 border border-green-300 py-2 rounded-lg font-black uppercase text-xs text-green-600 text-center group-hover:bg-green-500 group-hover:text-white transition-all">
        Select
      </div>
    </div>

  </div>
</div>
      )}

      {/* Step 15: Contact Details */}
      {step === 15 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-8 leading-tight text-blue">Your Details*</h2>
          <div className="grid gap-6 max-w-sm w-full">
            <div className="drop-in drop-in-2">
              <input
                type="text"
                placeholder="First Name*"
                className={`${errors.firstName ? inputError : inputBase} text-xl`}
                onChange={(e) => { setErrors(err => ({ ...err, firstName: '' })); }}
                id="input-firstName"
              />
              {errors.firstName && <p key={shakeKey} className={`${errMsg} shake`}>{errors.firstName}</p>}
            </div>
            <div className="drop-in drop-in-3">
              <input
                type="tel"
                placeholder="Phone Number*"
                defaultValue="+44 "
                id="input-phone"
                className={`${errors.phone ? inputError : inputBase} text-xl pl-16`}
                style={{ backgroundImage: 'url("https://flagcdn.com/w20/gb.png")', backgroundRepeat: 'no-repeat', backgroundPosition: '16px center' }}
                onChange={(e) => { setErrors(err => ({ ...err, phone: '' })); }}
              />
              {errors.phone && <p key={shakeKey} className={`${errMsg} shake`}>{errors.phone}</p>}
            </div>
            <button
              onClick={() => {
                const firstName = document.getElementById('input-firstName')?.value?.trim();
                const phone = document.getElementById('input-phone')?.value?.trim();
                const newErrors = {};
                if (!firstName) newErrors.firstName = 'First name is required';
                if (!phone || phone === '+44' || phone === '+44 ') newErrors.phone = 'Phone number is required';
                if (Object.keys(newErrors).length > 0) {
                  setErrors(newErrors);
                  triggerShake();
                } else {
                  setErrors({});
                  // ✅ Save to formData so step 16 can access after unmount
                  setFormData(prev => ({ ...prev, firstName, phone }));
                  next();
                }
              }}
              className="drop-in drop-in-5 bg-blue-700 text-[#010191] py-4 rounded-xl font-black text-lg mt-4 hover:bg-blue transition-all uppercase tracking-wide"
            >Next</button>
          </div>
        </div>
      )}

      {/* Step 16: Address + sends email */}
      {step === 16 && (
        <div className="flex flex-col h-full">
          <h2 className="drop-in drop-in-1 text-2xl md:text-3xl font-black uppercase mb-8 leading-tight text-blue">Address*</h2>
          <div className="grid gap-6 max-w-sm w-full">
            <div className="drop-in drop-in-2">
              <input type="text" placeholder="Address line 1*" id="input-address1" className={`${errors.address1 ? inputError : inputBase} text-lg`}
                onChange={() => setErrors(err => ({ ...err, address1: '' }))} />
              {errors.address1 && <p key={shakeKey} className={`${errMsg} shake`}>{errors.address1}</p>}
            </div>
            <input type="text" placeholder="Address line 2" id="input-address2" className={`${inputBase} drop-in drop-in-2 text-lg`} />
            <div className="drop-in drop-in-3">
              <input type="text" placeholder="Postcode*" id="input-postcode" className={`${errors.postcode ? inputError : inputBase} text-lg`}
                onChange={() => setErrors(err => ({ ...err, postcode: '' }))} />
              {errors.postcode && <p key={shakeKey} className={`${errMsg} shake`}>{errors.postcode}</p>}
            </div>
            <button
              disabled={sending}
              onClick={async () => {
                const address1 = document.getElementById('input-address1')?.value?.trim();
                const address2 = document.getElementById('input-address2')?.value?.trim();
                const postcode  = document.getElementById('input-postcode')?.value?.trim();
                // ✅ Read from formData — DOM elements from step 15 are unmounted
                const firstName = formData.firstName;
                const phone     = formData.phone;

                const newErrors = {};
                if (!address1) newErrors.address1 = 'Address line 1 is required';
                if (!postcode)  newErrors.postcode  = 'Postcode is required';
                if (Object.keys(newErrors).length > 0) {
                  setErrors(newErrors);
                  triggerShake();
                  return;
                }

                setErrors({});
                setSending(true);
                try {
                  await sendBookingEmail({ firstName, phone, address1, address2, postcode });
                } catch (err) {
                  console.error('EmailJS error:', err);
                  // Still advance — don't block the user on email failure
                } finally {
                  setSending(false);
                  next();
                }
              }}
              className="drop-in drop-in-4 bg-blue-700 text-[#010191] py-4 rounded-xl font-black text-lg mt-6 uppercase hover:bg-blue transition-all tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending…' : 'Book Now'}
            </button>
          </div>
        </div>
      )}

      {/* Final Step: Success */}
      {step === 17 && (
        <div className="flex flex-col items-start justify-center py-8 space-y-4">
          <div className="drop-in drop-in-1 w-16 h-16 bg-blue-700 text-[#010191] rounded-full flex items-center justify-center text-2xl shadow-lg shadow-blue-700/30 animate-bounce font-black">✓</div>
          <h2 className="drop-in drop-in-2 text-2xl md:text-4xl font-black uppercase leading-none max-w-sm text-blue">Confirmed!</h2>
          <p className="drop-in drop-in-3 text-sm font-bold text-blue/40 uppercase">Thank you!</p>
          <p className="drop-in drop-in-3 text-sm font-bold text-blue/40 uppercase">We'll be in touch shortly to offer you a date for the first clean.</p>
        </div>
      )}

      {/* Navigation Arrows */}
      {step >= 2 && step < 16 && (
        <div className="absolute bottom-6 right-6 flex gap-2">
          <button onClick={step === 2 ? onBack : prev} className="bg-blue/10 text-blue/50 p-3 rounded-xl hover:bg-blue hover:text-[#010191] transition-all shadow-sm active:scale-90">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          </button>
          <button onClick={next} className="bg-blue-700 text-[#010191] p-3 rounded-xl hover:bg-blue transition-all shadow-md active:scale-90">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
      )}

    </div>
  );
};

export default TerracedFlow;
