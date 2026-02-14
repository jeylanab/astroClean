import React, { useState } from 'react';

const Step7Final = ({ contactData, onComplete }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [addressData, setAddressData] = useState({
    line1: '',
    city: '',
    postcode: ''
  });

  const isFormValid = addressData.line1 && addressData.postcode;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prev => ({ ...prev, [name]: value }));
  };

  const handleBooking = () => {
    // Here you would typically send data to your database/email
    setIsSubmitted(true);
    if (onComplete) onComplete(addressData);
  };

  // --- SUCCESS VIEW ---
  if (isSubmitted) {
    return (
      <div className="w-full max-w-2xl text-center py-16 px-6 animate-in zoom-in fade-in duration-1000">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner animate-bounce">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black text-[#002664] mb-4 tracking-tighter">
          Booking Received!
        </h2>
        
        <p className="text-xl text-slate-600 mb-10 leading-relaxed">
          Thanks, <strong>{contactData.firstName}</strong>. Our crew is ready. 
          We'll be in touch shortly to confirm your slot!
        </p>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl inline-block">
          <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-2">Next Steps</p>
          <p className="text-slate-700 font-medium">Keep an eye on your email for confirmation.</p>
        </div>

        <button 
            onClick={() => window.location.href = 'https://astro-clean.co.uk/'}
          className="mt-12 block w-full text-slate-400 hover:text-[#002664] font-bold transition-all text-sm uppercase tracking-widest"
        >
          Return to Website
        </button>
      </div>
    );
  }

  // --- ADDRESS FORM VIEW ---
  return (
    <div className="w-full max-w-4xl flex flex-col items-start animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-[#002664] text-white w-7 h-7 flex items-center justify-center rounded-lg text-xs font-black shadow-lg">
          07
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
          Where should we send the crew?
        </h2>
      </div>

      <p className="text-lg text-slate-500 mb-10 max-w-lg">
        Almost there, {contactData.firstName}! Provide your UK address to finalize your booking.
      </p>

      {/* Address Form Card */}
      <div className="flex flex-col gap-6 w-full max-w-2xl mb-12 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        
        {/* Street Address */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase text-[#002664] tracking-widest ml-1">Street Address*</label>
          <input
            type="text"
            name="line1"
            placeholder="e.g. 12 High Street"
            value={addressData.line1}
            onChange={handleChange}
            className="bg-slate-50 border-2 border-transparent focus:bg-white focus:border-[#002664] focus:ring-4 focus:ring-blue-50 p-4 rounded-2xl text-lg outline-none transition-all shadow-inner"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Town / City */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-[#002664] tracking-widest ml-1">Town / City</label>
            <input
              type="text"
              name="city"
              placeholder="e.g. London"
              value={addressData.city}
              onChange={handleChange}
              className="bg-slate-50 border-2 border-transparent focus:bg-white focus:border-[#002664] focus:ring-4 focus:ring-blue-50 p-4 rounded-2xl text-lg outline-none transition-all shadow-inner"
            />
          </div>
          
          {/* Postcode */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-[#002664] tracking-widest ml-1">UK Postcode*</label>
            <input
              type="text"
              name="postcode"
              placeholder="e.g. SW1A 1AA"
              value={addressData.postcode}
              onChange={handleChange}
              className="bg-slate-50 border-2 border-transparent focus:bg-white focus:border-[#002664] focus:ring-4 focus:ring-blue-50 p-4 rounded-2xl text-lg outline-none transition-all shadow-inner uppercase font-bold"
            />
          </div>
        </div>
      </div>

      {/* Final Action Button */}
      <button
        onClick={handleBooking}
        disabled={!isFormValid}
        className={`group relative flex items-center justify-center gap-4 font-black py-6 px-16 rounded-[2rem] text-2xl transition-all active:scale-95 w-full max-w-2xl
          ${isFormValid 
            ? 'bg-[#002664] text-white shadow-[0_20px_40px_rgba(0,38,100,0.3)] hover:bg-slate-900' 
            : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'}`}
      >
        <span>Complete My Booking</span>
        <svg className={`w-6 h-6 transition-transform duration-500 ${isFormValid ? 'group-hover:translate-x-2' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>

      <p className="w-full max-w-2xl text-center mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
        🛡️ Secure Booking — No Upfront Payment
      </p>
    </div>
  );
};

export default Step7Final;