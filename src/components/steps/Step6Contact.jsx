import React from 'react';

const Step6Contact = ({ data, updateData, onNext }) => {
  // Enhanced validation: First name, Last name, Email, and basic UK Phone check
  // UK phone numbers are typically 10 or 11 digits
  const isPhoneValid = data.phone?.replace(/\s/g, '').length >= 10;
  const isFormValid = data.firstName && data.lastName && data.email && isPhoneValid;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If it's the phone field, we can prevent letters from being typed
    if (name === 'phone') {
      const cleanedValue = value.replace(/[^0-9+\s]/g, '');
      updateData({ ...data, [name]: cleanedValue });
    } else {
      updateData({ ...data, [name]: value });
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-start animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* 1. Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-[#002664] text-white w-7 h-7 flex items-center justify-center rounded-lg text-xs font-black shadow-lg">
          06
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
          Great! Who should we send the quote to?
        </h2>
      </div>

      <p className="text-lg text-slate-500 mb-10 max-w-lg">
        We'll send your instant price to these details.
      </p>

      {/* 2. Form Fields */}
      <div className="flex flex-col gap-6 w-full max-w-2xl mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-[#002664] tracking-widest ml-1">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Jane"
              value={data.firstName || ''}
              onChange={handleChange}
              className="bg-white border-2 border-slate-100 focus:border-[#002664] focus:ring-4 focus:ring-blue-50 p-4 rounded-2xl text-lg outline-none transition-all shadow-sm"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-[#002664] tracking-widest ml-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Smith"
              value={data.lastName || ''}
              onChange={handleChange}
              className="bg-white border-2 border-slate-100 focus:border-[#002664] focus:ring-4 focus:ring-blue-50 p-4 rounded-2xl text-lg outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* UK PHONE FIELD */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase text-[#002664] tracking-widest ml-1">
            UK Phone Number
          </label>
          <div className="relative flex items-center">
            {/* UK Flag Decor */}
            <div className="absolute left-4 flex items-center pointer-events-none border-r border-slate-200 pr-3">
              <span className="text-lg mr-2">🇬🇧</span>
              <span className="text-slate-400 font-bold">+44</span>
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="7123 456789"
              value={data.phone || ''}
              onChange={handleChange}
              className="w-full bg-white border-2 border-slate-100 focus:border-[#002664] focus:ring-4 focus:ring-blue-50 p-4 pl-24 rounded-2xl text-lg outline-none transition-all shadow-sm"
            />
          </div>
          {!isPhoneValid && data.phone && (
            <p className="text-red-500 text-xs font-bold ml-1">Please enter a valid UK mobile or landline</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase text-[#002664] tracking-widest ml-1">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="jane@example.com"
            value={data.email || ''}
            onChange={handleChange}
            className="bg-white border-2 border-slate-100 focus:border-[#002664] focus:ring-4 focus:ring-blue-50 p-4 rounded-2xl text-lg outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* 3. Action Button */}
      <button
        onClick={onNext}
        disabled={!isFormValid}
        className={`group flex items-center gap-3 font-bold py-5 px-14 rounded-2xl text-xl transition-all active:scale-95 shadow-2xl
          ${isFormValid 
            ? 'bg-[#002664] text-white hover:bg-slate-900' 
            : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'}`}
      >
        View My Quote
        <svg className={`w-6 h-6 transition-transform ${isFormValid ? 'group-hover:translate-x-2' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

      <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        Astroclean Professional — Trusted across the UK
      </p>
    </div>
  );
};

export default Step6Contact;